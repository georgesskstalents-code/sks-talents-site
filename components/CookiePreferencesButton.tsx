"use client";

import { OPEN_COOKIE_PREFERENCES_EVENT } from "@/lib/cookieConsent";

type CookiePreferencesButtonProps = {
  className?: string;
};

export default function CookiePreferencesButton({
  className = ""
}: CookiePreferencesButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT))}
      className={className}
    >
      Préférences cookies
    </button>
  );
}
