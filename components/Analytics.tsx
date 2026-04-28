"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import {
  COOKIE_CONSENT_UPDATED_EVENT,
  hasAnalyticsConsent
} from "@/lib/cookieConsent";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(hasAnalyticsConsent());

    const handleUpdated = () => setEnabled(hasAnalyticsConsent());
    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, handleUpdated);

    return () => window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, handleUpdated);
  }, []);

  useEffect(() => {
    if (!enabled || !measurementId || typeof window.gtag !== "function") {
      return;
    }

    const query = searchParams?.toString() ?? "";
    const pagePath = query ? `${pathname}?${query}` : pathname;

    window.gtag("config", measurementId, {
      page_path: pagePath
    });
  }, [enabled, measurementId, pathname, searchParams]);

  if (!measurementId || !enabled) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-base" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            anonymize_ip: true,
            transport_type: 'beacon'
          });
        `}
      </Script>
    </>
  );
}
