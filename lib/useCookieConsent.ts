"use client";

import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_UPDATED_EVENT,
  type CookieConsentState,
  getStoredCookieConsent
} from "@/lib/cookieConsent";

/**
 * Returns the current consent state, syncing automatically when it changes
 * (banner accept, manual toggle from footer, multi-tab updates).
 * `null` means no choice has been made yet - floating widgets should hide
 * to avoid overlapping the consent banner on mobile.
 */
export function useCookieConsent(): CookieConsentState | null {
  const [consent, setConsent] = useState<CookieConsentState | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setConsent(getStoredCookieConsent());

    const onUpdate = () => setConsent(getStoredCookieConsent());
    const onStorage = (event: StorageEvent) => {
      if (event.key && event.key.includes("cookie-consent")) {
        setConsent(getStoredCookieConsent());
      }
    };

    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, onUpdate);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return consent;
}
