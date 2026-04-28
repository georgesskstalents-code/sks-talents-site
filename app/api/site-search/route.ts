import { appendSiteSearchLog } from "@/lib/siteSearchInsights";
import {
  applyRateLimit,
  getClientIp,
  noStoreJson,
  parseJsonBody,
  validateSameOriginRequest
} from "@/lib/requestSecurity";

type SiteSearchBody = {
  query?: string;
  resultCount?: number;
  topResults?: unknown;
};

function normalizeQuery(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export async function POST(request: Request) {
  const originCheck = await validateSameOriginRequest();
  if (!originCheck.ok) {
    return originCheck.response;
  }

  const ip = getClientIp(originCheck.requestHeaders);
  const allowed = await applyRateLimit(ip, {
    key: "site-search",
    windowMs: 10 * 60 * 1000,
    maxRequests: 80
  });

  if (!allowed) {
    return noStoreJson({ ok: false, message: "Trop de recherches." }, 429);
  }

  const parsedBody = await parseJsonBody<SiteSearchBody>(request, 8_000);
  if (!parsedBody.ok) {
    return parsedBody.response;
  }

  const query = typeof parsedBody.body.query === "string" ? parsedBody.body.query.trim().slice(0, 180) : "";
  if (!query) {
    return noStoreJson({ ok: false, message: "Recherche vide." }, 422);
  }

  const resultCount =
    typeof parsedBody.body.resultCount === "number" && Number.isFinite(parsedBody.body.resultCount)
      ? Math.max(0, Math.min(parsedBody.body.resultCount, 100))
      : 0;

  const topResults = Array.isArray(parsedBody.body.topResults)
    ? parsedBody.body.topResults
        .filter((value): value is string => typeof value === "string" && value.startsWith("/"))
        .slice(0, 5)
    : [];

  await appendSiteSearchLog({
    query,
    normalizedQuery: normalizeQuery(query),
    resultCount,
    topResults,
    createdAt: new Date().toISOString()
  });

  return noStoreJson({ ok: true });
}
