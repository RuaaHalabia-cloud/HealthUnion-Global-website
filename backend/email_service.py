"""
Email notification service for new lead submissions.

Provider-agnostic. Reads config from env:
  EMAIL_PROVIDER = "smtp" | "brevo" | "resend" | "" (empty disables sending)
  EMAIL_FROM     = sender address, e.g. info@healthunionglobal.com
  EMAIL_TO       = destination inbox for lead notifications
  EMAIL_BCC      = optional, comma separated technical copy

SMTP provider (recommended, no third party service):
  SMTP_HOST      = mail server host
  SMTP_PORT      = 587 (STARTTLS) or 465 (implicit TLS)
  SMTP_USER      = mailbox login, usually the full address
  SMTP_PASSWORD  = mailbox password or app password

API providers (optional, kept for later):
  EMAIL_API_KEY  = provider API key

When the provider is not configured this module is a NO-OP: it logs the lead
and returns gracefully, so nothing is ever lost and it can be enabled by
setting environment variables only.
"""
import os
import ssl
import smtplib
import logging
from email.message import EmailMessage

import requests

logger = logging.getLogger(__name__)


def _config():
    return {
        "provider": (os.environ.get("EMAIL_PROVIDER") or "").strip().lower(),
        "api_key": (os.environ.get("EMAIL_API_KEY") or "").strip(),
        "from_email": (os.environ.get("EMAIL_FROM") or "").strip(),
        "to_email": (os.environ.get("EMAIL_TO") or "").strip(),
        "bcc": [x.strip() for x in (os.environ.get("EMAIL_BCC") or "").split(",") if x.strip()],
        "smtp_host": (os.environ.get("SMTP_HOST") or "").strip(),
        "smtp_port": int(os.environ.get("SMTP_PORT") or 587),
        "smtp_user": (os.environ.get("SMTP_USER") or "").strip(),
        "smtp_password": os.environ.get("SMTP_PASSWORD") or "",
    }


def is_enabled() -> bool:
    c = _config()
    if not (c["provider"] and c["from_email"] and c["to_email"]):
        return False
    if c["provider"] == "smtp":
        return bool(c["smtp_host"] and c["smtp_user"] and c["smtp_password"])
    return bool(c["api_key"])


def _esc(value) -> str:
    """Minimal HTML escaping so user input cannot break the email markup."""
    return (
        str(value if value is not None else "")
        .replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def _build_email_html(submission: dict, has_attachment: bool = False) -> str:
    markets = ", ".join(submission.get("target_markets", [])) or "n/a"
    attached = "Yes, attached to this email" if has_attachment else "No"
    message = _esc(submission.get("message", "")).replace("\n", "<br>")
    return f"""
    <h2>New Pre-diagnostic Intake, HealthUnion Global</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      <tr><td><b>Company</b></td><td>{_esc(submission.get('company_name'))}</td></tr>
      <tr><td><b>Email</b></td><td><a href="mailto:{_esc(submission.get('contact_email'))}">{_esc(submission.get('contact_email'))}</a></td></tr>
      <tr><td><b>Phone</b></td><td>{_esc(submission.get('contact_phone')) or 'not provided'}</td></tr>
      <tr><td><b>Product Category</b></td><td>{_esc(submission.get('product_category'))}</td></tr>
      <tr><td><b>Device Classification</b></td><td>{_esc(submission.get('device_classification')) or 'n/a'}</td></tr>
      <tr><td><b>Target Markets</b></td><td>{_esc(markets)}</td></tr>
      <tr><td><b>PDF document</b></td><td>{attached}</td></tr>
      <tr><td><b>Language</b></td><td>{_esc(submission.get('locale', 'en'))}</td></tr>
      <tr><td><b>Received</b></td><td>{_esc(submission.get('created_at'))}</td></tr>
      <tr><td valign="top"><b>Message</b></td><td>{message}</td></tr>
    </table>
    """


def _build_text(submission: dict) -> str:
    markets = ", ".join(submission.get("target_markets", [])) or "n/a"
    return (
        "New Pre-diagnostic Intake, HealthUnion Global\n\n"
        f"Company: {submission.get('company_name','')}\n"
        f"Email: {submission.get('contact_email','')}\n"
        f"Phone: {submission.get('contact_phone','') or 'not provided'}\n"
        f"Product Category: {submission.get('product_category','')}\n"
        f"Device Classification: {submission.get('device_classification','') or 'n/a'}\n"
        f"Target Markets: {markets}\n"
        f"Language: {submission.get('locale','en')}\n"
        f"Received: {submission.get('created_at','')}\n\n"
        f"Message:\n{submission.get('message','')}\n"
    )


def _send_smtp(c: dict, subject: str, html: str, text: str, attachment=None, submission=None) -> bool:
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = c["from_email"]
    msg["To"] = c["to_email"]
    reply_to = (submission or {}).get("contact_email") if submission else None
    if reply_to:
        msg["Reply-To"] = reply_to
    if c["bcc"]:
        msg["Bcc"] = ", ".join(c["bcc"])
    msg.set_content(text)
    msg.add_alternative(html, subtype="html")

    if attachment:
        filename, data = attachment
        msg.add_attachment(
            data, maintype="application", subtype="pdf", filename=filename
        )

    context = ssl.create_default_context()
    if c["smtp_port"] == 465:
        with smtplib.SMTP_SSL(c["smtp_host"], c["smtp_port"], context=context, timeout=30) as s:
            s.login(c["smtp_user"], c["smtp_password"])
            s.send_message(msg)
    else:
        with smtplib.SMTP(c["smtp_host"], c["smtp_port"], timeout=30) as s:
            s.ehlo()
            s.starttls(context=context)
            s.ehlo()
            s.login(c["smtp_user"], c["smtp_password"])
            s.send_message(msg)
    return True


def notify_new_lead(submission: dict, attachment=None) -> bool:
    """
    Send the lead notification.

    attachment: optional tuple (filename, bytes) for the uploaded PDF.
    Returns False and never raises if sending is not configured or fails.
    """
    c = _config()
    if not is_enabled():
        logger.info(
            "[email] Notification skipped, provider not configured. Company=%s",
            submission.get("company_name"),
        )
        return False

    subject = f"New Lead: {submission.get('company_name', 'Unknown')}, HealthUnion Global"
    html = _build_email_html(submission, has_attachment=bool(attachment))
    text = _build_text(submission)

    try:
        if c["provider"] == "smtp":
            _send_smtp(c, subject, html, text, attachment, submission)
            logger.info("[email] SMTP notification sent for %s", submission.get("company_name"))
            return True

        if c["provider"] == "brevo":
            resp = requests.post(
                "https://api.brevo.com/v3/smtp/email",
                headers={"api-key": c["api_key"], "Content-Type": "application/json"},
                json={
                    "sender": {"email": c["from_email"], "name": "HealthUnion Global"},
                    "to": [{"email": c["to_email"]}],
                    "subject": subject,
                    "htmlContent": html,
                },
                timeout=20,
            )
            resp.raise_for_status()
            logger.info("[email] Brevo notification sent for %s", submission.get("company_name"))
            return True

        if c["provider"] == "resend":
            resp = requests.post(
                "https://api.resend.com/emails",
                headers={"Authorization": f"Bearer {c['api_key']}", "Content-Type": "application/json"},
                json={
                    "from": c["from_email"],
                    "to": [c["to_email"]],
                    "subject": subject,
                    "html": html,
                },
                timeout=20,
            )
            resp.raise_for_status()
            logger.info("[email] Resend notification sent for %s", submission.get("company_name"))
            return True

        logger.warning("[email] Unknown provider '%s', skipping send", c["provider"])
        return False
    except Exception as e:
        logger.error("[email] Failed to send notification: %s", e)
        return False
