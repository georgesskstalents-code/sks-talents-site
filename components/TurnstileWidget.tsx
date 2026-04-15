"use client";

import { useEffect, useId, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId?: string) => void;
    };
  }
}

type Props = {
  onVerify: (token: string) => void;
  theme?: "light" | "dark" | "auto";
  className?: string;
};

const scriptId = "cf-turnstile-script";

export default function TurnstileWidget({
  onVerify,
  theme = "light",
  className = ""
}: Props) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const widgetIdRef = useRef<string | null>(null);
  const reactId = useId();
  const containerId = `turnstile-${reactId.replace(/[:]/g, "")}`;

  useEffect(() => {
    if (!siteKey) {
      onVerify("");
      return;
    }

    let isMounted = true;

    const renderWidget = () => {
      if (!isMounted || !window.turnstile || widgetIdRef.current) {
        return;
      }

      widgetIdRef.current = window.turnstile.render(`#${containerId}`, {
        sitekey: siteKey,
        theme,
        callback: (token) => onVerify(token),
        "expired-callback": () => onVerify(""),
        "error-callback": () => onVerify("")
      });
    };

    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (window.turnstile) {
      renderWidget();
    } else if (existingScript) {
      existingScript.addEventListener("load", renderWidget, { once: true });
    } else {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    }

    return () => {
      isMounted = false;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [containerId, onVerify, siteKey, theme]);

  if (!siteKey) {
    return null;
  }

  return (
    <div className={className}>
      <div id={containerId} />
      <p className="mt-2 text-xs leading-6 text-brand-stone">
        Vérification anti-bot activée pour protéger vos formulaires.
      </p>
    </div>
  );
}
