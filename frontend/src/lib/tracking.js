// Event bridge for the consent-aware analytics container. Event parameters must
// never include names, email addresses, phone numbers, messages, or documents.
// This version deliberately does not reuse the old essential-cookies choice.
// Visitors must make a fresh choice before optional Google measurement starts.
export const CONSENT_STORAGE_KEY = "hu_cookie_consent_v2";

export function hasTrackingConsent() {
  if (typeof window === "undefined") return false;

  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY) === "accepted";
  } catch (e) {
    return window.__huConsent === "accepted";
  }
}

export function trackEvent(event, parameters = {}) {
  if (typeof window === "undefined" || !hasTrackingConsent() || !Array.isArray(window.dataLayer)) return;
  window.dataLayer.push({ event, ...parameters });
}
