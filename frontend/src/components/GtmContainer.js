import { useEffect } from "react";

const GTM_ID = String(process.env.REACT_APP_GTM_ID || "").trim();
const isValidContainerId = /^GTM-[A-Z0-9]+$/i.test(GTM_ID);

function loadContainerAfterConsent() {
  const hasAcceptedConsent = (() => {
    try {
      return (
        localStorage.getItem("hu_cookie_consent_v2") === "accepted" ||
        localStorage.getItem("hu_cookie_consent") === "accepted"
      );
    } catch (e) {
      return false;
    }
  })();

  if (!isValidContainerId || !hasAcceptedConsent || document.getElementById("hu-gtm-container")) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  const script = document.createElement("script");
  script.id = "hu-gtm-container";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
  document.head.appendChild(script);
}

// Google Tag Manager remains disabled unless a valid build-time container ID
// is configured and the visitor has accepted optional measurement cookies.
export default function GtmContainer() {
  useEffect(() => {
    loadContainerAfterConsent();
    window.addEventListener("hu:analytics-consent", loadContainerAfterConsent);
    // The first live release used hu_cookie_consent and has no event bridge.
    // Poll briefly so an accepted legacy consent choice still enables GTM.
    const consentWatcher = window.setInterval(loadContainerAfterConsent, 400);
    return () => {
      window.removeEventListener("hu:analytics-consent", loadContainerAfterConsent);
      window.clearInterval(consentWatcher);
    };
  }, []);

  return null;
}
