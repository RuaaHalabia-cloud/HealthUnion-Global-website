import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const KEY = "hu_cookie_consent";

export default function CookieConsent() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const [visible, setVisible] = useState(false);

  // Show only if no prior choice; reveal after a short delay.
  useEffect(() => {
    let choice = null;
    try {
      choice = localStorage.getItem(KEY);
    } catch (e) {
      choice = null;
    }
    if (!choice) {
      const id = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(id);
    }
  }, []);

  // Footer "Cookies" link reopens the banner via a custom event.
  useEffect(() => {
    const reopen = () => setVisible(true);
    window.addEventListener("hu:open-cookie", reopen);
    return () => window.removeEventListener("hu:open-cookie", reopen);
  }, []);

  const decide = (value) => {
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {
      // ignore storage errors (private mode, etc.)
    }
    // Future analytics can gate on this flag before initialising.
    window.__huConsent = value;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      data-testid="cookie-consent"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-[#0A2240] text-white shadow-[0_18px_60px_rgba(10,34,64,0.45)]">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#5eead4]">
              <Cookie className="h-5 w-5" />
            </span>
            <p className="text-sm leading-relaxed text-white/80">
              {t("cookie.text")}{" "}
              <Link
                to={`/${lang}/privacy`}
                className="font-medium text-[#5eead4] underline underline-offset-2 hover:text-white"
              >
                {t("cookie.privacy")}
              </Link>
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              data-testid="cookie-decline"
              variant="ghost"
              onClick={() => decide("declined")}
              className="text-white/80 hover:bg-white/10 hover:text-white"
            >
              {t("cookie.decline")}
            </Button>
            <Button
              data-testid="cookie-accept"
              onClick={() => decide("accepted")}
              className="bg-[#0D9488] font-semibold text-white hover:bg-[#10B981]"
            >
              {t("cookie.accept")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
