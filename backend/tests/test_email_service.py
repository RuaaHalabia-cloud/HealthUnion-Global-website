import base64
import os
import sys
import types
import unittest
from unittest.mock import Mock, patch

# The production image installs requests from backend/requirements.txt. The
# bundled local test runtime may not, so provide the smallest import stub.
try:
    import requests  # noqa: F401
except ModuleNotFoundError:
    requests_stub = types.ModuleType("requests")
    requests_stub.post = Mock()
    sys.modules["requests"] = requests_stub

from backend import email_service


class ResendEmailServiceTests(unittest.TestCase):
    def _environment(self):
        return {
            "EMAIL_PROVIDER": "resend",
            "EMAIL_FROM": "HealthUnion Global <website@notifications.healthunionglobal.com>",
            "EMAIL_TO": "info@healthunionglobal.com",
            "EMAIL_BCC": "audit@example.com",
            "RESEND_API_KEY": "test-resend-key",
        }

    @patch.dict(os.environ, {}, clear=True)
    def test_resend_requires_complete_configuration(self):
        self.assertFalse(email_service.is_enabled())

        os.environ.update(self._environment())
        self.assertTrue(email_service.is_enabled())

        os.environ["EMAIL_PROVIDER"] = "unknown"
        self.assertFalse(email_service.is_enabled())

    @patch.dict(os.environ, {}, clear=True)
    @patch("backend.email_service.requests.post")
    def test_resend_sends_reply_to_bcc_text_and_attachment(self, post):
        os.environ.update(self._environment())
        response = Mock()
        post.return_value = response
        submission = {
            "id": "lead-123",
            "company_name": "Example Medical",
            "contact_email": "client@example.com",
            "contact_phone": "+1 555 0100",
            "product_category": "Medical device",
            "device_classification": "Class II",
            "target_markets": ["USA", "Saudi Arabia"],
            "message": "Please contact us.",
            "locale": "en",
            "created_at": "2026-08-09T12:00:00Z",
        }

        sent = email_service.notify_new_lead(
            submission,
            attachment=("dossier.pdf", b"sample pdf bytes"),
        )

        self.assertTrue(sent)
        response.raise_for_status.assert_called_once_with()
        request = post.call_args
        self.assertEqual(request.args[0], "https://api.resend.com/emails")
        self.assertEqual(request.kwargs["timeout"], 20)
        self.assertEqual(
            request.kwargs["headers"]["Authorization"],
            "Bearer test-resend-key",
        )

        payload = request.kwargs["json"]
        self.assertEqual(payload["to"], ["info@healthunionglobal.com"])
        self.assertEqual(payload["reply_to"], "client@example.com")
        self.assertEqual(payload["bcc"], ["audit@example.com"])
        self.assertIn("Example Medical", payload["html"])
        self.assertIn("Example Medical", payload["text"])
        self.assertEqual(payload["attachments"][0]["filename"], "dossier.pdf")
        self.assertEqual(
            payload["attachments"][0]["content"],
            base64.b64encode(b"sample pdf bytes").decode("ascii"),
        )

    @patch.dict(os.environ, {}, clear=True)
    def test_legacy_email_api_key_remains_supported(self):
        environment = self._environment()
        environment.pop("RESEND_API_KEY")
        environment["EMAIL_API_KEY"] = "legacy-key"
        os.environ.update(environment)

        self.assertTrue(email_service.is_enabled())
        self.assertEqual(email_service._config()["api_key"], "legacy-key")


if __name__ == "__main__":
    unittest.main()
