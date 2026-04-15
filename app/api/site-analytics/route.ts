import { appendSiteAnalyticsLog } from "@/lib/siteIntelligence";
import {
  applyRateLimit,
  getClientIp,
  noStoreJson,
  parseJsonBody,
  validateSameOriginRequest
} from "@/lib/requestSecurity";

type SiteAnalyticsBody = {
  type?: "pageview" | "agent_query" | "agent_click" | "cta_click";
  path?: string;
  title?: string;
  query?: string;
  target?: string;
  sessionId?: string;
};

function normalizeText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  const originCheck = await validateSameOriginRequest();
  if (!originCheck.ok) {
    return originCheck.response;
  }

  const ip = getClientIp(originCheck.requestHeaders);
  const allowed = await applyRateLimit(ip, {
    key: "site-analytics",
    windowMs: 10 * 60 * 1000,
    maxRequests: 120
  });

  if (!allowed) {
    return noStoreJson({ ok: false, message: "Trop d'événements." }, 429);
  }

  const parsedBody = await parseJsonBody<SiteAnalyticsBody>(request, 8_000);
  if (!parsedBody.ok) {
    return parsedBody.response;
  }

  const body = parsedBody.body;
  const type: "pageview" | "agent_query" | "agent_click" | "cta_click" =
    body.type === "agent_query" || body.type === "agent_click" || body.type === "cta_click"
      ? body.type
      : "pageview";

  const payload = {
    type,
    path: normalizeText(body.path, 180),
    title: normalizeText(body.title, 180),
    query: normalizeText(body.query, 240),
    target: normalizeText(body.target, 240),
    sessionId: normalizeText(body.sessionId, 80),
    createdAt: new Date().toISOString()
  };

  if (!payload.path) {
    return noStoreJson({ ok: false, message: "Page manquante." }, 422);
  }

  try {
    await appendSiteAnalyticsLog(payload);
  } catch (error) {
    console.error("Site analytics log error", error);
  }

  return noStoreJson({ ok: true });
}
