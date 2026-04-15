"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    SenjaWidget?: {
      init?: () => void;
    };
  }
}

type Props = {
  widgetId: string;
  className?: string;
};

const scriptId = "senja-platform-script";

export default function SenjaTestimonials({ widgetId, className }: Props) {
  useEffect(() => {
    const initialize = () => {
      window.SenjaWidget?.init?.();
    };

    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing) {
      initialize();
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = "https://static.senja.io/dist/platform.js";
    script.onload = initialize;
    document.body.appendChild(script);
  }, [widgetId]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: `<div class="senja-embed" data-id="${widgetId}" data-mode="shadow" data-lazyload="true"></div>`
      }}
    />
  );
}
