export const COOKIE_CONSENT_KEY = "sks-cookie-consent-v3";
export const COOKIE_CONSENT_UPDATED_EVENT = "sks-cookie-consent-updated";
export const OPEN_COOKIE_PREFERENCES_EVENT = "sks-open-cookie-preferences";

export type CookieConsentState = "accepted" | "essential";

export function getStoredCookieConsent(): CookieConsentState | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  return value === "accepted" || value === "essential" ? value : null;
}

export function setStoredCookieConsent(value: CookieConsentState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_UPDATED_EVENT, { detail: value }));
}

export function hasAnalyticsConsent() {
  return getStoredCookieConsent() === "accepted";
}
