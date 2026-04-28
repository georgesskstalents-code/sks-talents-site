import { hasAnalyticsConsent } from "@/lib/cookieConsent";

type SiteTelemetryEvent = {
  type:
    | "pageview"
    | "agent_query"
    | "agent_click"
    | "cta_click"
    | "form_submit"
    | "form_success"
    | "form_error"
    | "frontend_error";
  path: string;
  title?: string;
  query?: string;
  target?: string;
  message?: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function getSessionId() {
  if (typeof window === "undefined") {
    return "";
  }

  const key = "sks-session-id";
  const existing = window.sessionStorage.getItem(key);
  if (existing) {
    return existing;
  }

  const created = crypto.randomUUID();
  window.sessionStorage.setItem(key, created);
  return created;
}

function isConsentDrivenEvent(type: SiteTelemetryEvent["type"]) {
  return type === "pageview" || type === "agent_query" || type === "agent_click" || type === "cta_click";
}

export function trackSiteTelemetry(event: SiteTelemetryEvent) {
  if (typeof window === "undefined" || !event.path) {
    return;
  }

  const canSend = isConsentDrivenEvent(event.type) ? hasAnalyticsConsent() : true;
  if (!canSend) {
    return;
  }

  const payload = {
    ...event,
    title: event.title ?? document.title,
    sessionId: getSessionId()
  };

  if (hasAnalyticsConsent() && typeof window.gtag === "function") {
    window.gtag("event", event.type, {
      event_category: "site",
      event_label: event.target ?? event.path,
      page_path: event.path
    });
  }

  void fetch("/api/site-analytics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
    keepalive: true
  }).catch(() => undefined);
}
