import { createDashboardNote, listDashboardNotes } from "@/lib/dashboardStore";
import {
  applyRateLimit,
  getClientIp,
  noStoreJson,
  parseJsonBody,
  validateSameOriginRequest
} from "@/lib/requestSecurity";

function isAuthorized(request: Request) {
  const expectedToken = process.env.DASHBOARD_PRIVATE_TOKEN;

  if (!expectedToken) {
    return true;
  }

  const url = new URL(request.url);
  const queryToken = url.searchParams.get("token");
  const headerToken = request.headers.get("x-dashboard-token");
  return queryToken === expectedToken || headerToken === expectedToken;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return noStoreJson({ ok: false, message: "Token dashboard invalide." }, 401);
  }

  const notes = await listDashboardNotes();
  return noStoreJson({ ok: true, items: notes });
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return noStoreJson({ ok: false, message: "Token dashboard invalide." }, 401);
  }

  const originCheck = await validateSameOriginRequest();
  if (!originCheck.ok) {
    return originCheck.response;
  }

  const ip = getClientIp(originCheck.requestHeaders);
  const allowed = await applyRateLimit(ip, {
    key: "dashboard-notes-write",
    windowMs: 60_000,
    maxRequests: 20
  });

  if (!allowed) {
    return noStoreJson({ ok: false, message: "Trop d'écritures sur les notes." }, 429);
  }

  const payload = await parseJsonBody<{
    title?: string;
    body?: string;
    author?: string;
    tag?: "Insight" | "Gain" | "Risque" | "Lancement";
    date?: string;
  }>(request, 10_000);

  if (!payload.ok) {
    return payload.response;
  }

  const title = payload.body.title?.trim();
  const body = payload.body.body?.trim();
  const author = payload.body.author?.trim() || "Équipe Strategy";
  const tag = payload.body.tag || "Insight";

  if (!title || !body) {
    return noStoreJson({ ok: false, message: "Titre et contenu requis." }, 400);
  }

  const note = await createDashboardNote({
    title,
    body,
    author,
    tag,
    date: payload.body.date
  });

  return noStoreJson({ ok: true, item: note }, 201);
}
