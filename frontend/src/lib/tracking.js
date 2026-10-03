// Event bridge for an approved analytics container. It intentionally has no
// effect until a consent-aware tag manager is configured on the deployed site.
export function trackEvent(event, parameters = {}) {
  if (typeof window === "undefined" || !Array.isArray(window.dataLayer)) return;
  window.dataLayer.push({ event, ...parameters });
}
