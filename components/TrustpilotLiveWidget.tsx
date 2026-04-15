"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement?: (element: HTMLElement | null, forceReload?: boolean) => void;
    };
  }
}

type Props = {
  businessUnitId: string;
  templateId: string;
  reviewUrl: string;
  title?: string;
};

const scriptId = "trustpilot-widget-script";

export default function TrustpilotLiveWidget({
  businessUnitId,
  templateId,
  reviewUrl,
  title = "Trustpilot"
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadWidget = () => {
      window.Trustpilot?.loadFromElement?.(containerRef.current, true);
    };

    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing) {
      loadWidget();
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
    script.onload = loadWidget;
    document.body.appendChild(script);
  }, [businessUnitId, templateId]);

  return (
    <div className="card-surface p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">{title}</p>
      <div
        ref={containerRef}
        className="trustpilot-widget mt-4"
        data-locale="fr-FR"
        data-template-id={templateId}
        data-businessunit-id={businessUnitId}
        data-style-height="240px"
        data-style-width="100%"
        data-theme="light"
        data-stars="4,5"
        data-review-languages="fr"
      >
        <a href={reviewUrl} target="_blank" rel="noreferrer noopener">
          Voir les avis Trustpilot
        </a>
      </div>
    </div>
  );
}
