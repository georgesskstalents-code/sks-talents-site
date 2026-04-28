"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_UPDATED_EVENT,
  hasAnalyticsConsent
} from "@/lib/cookieConsent";
import { trackSiteTelemetry } from "@/lib/siteTelemetryClient";

export default function PageViewTracker() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(hasAnalyticsConsent());

    const handleUpdated = () => setEnabled(hasAnalyticsConsent());
    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, handleUpdated);

    return () => window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, handleUpdated);
  }, []);

  useEffect(() => {
    if (!enabled || !pathname) {
      return;
    }

    trackSiteTelemetry({
      type: "pageview",
      path: pathname,
      title: document.title
    });
  }, [enabled, pathname]);

  return null;
}
