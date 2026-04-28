import { listDashboardActions, updateDashboardActionStatus } from "@/lib/dashboardStore";
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

  const actions = await listDashboardActions();
  return noStoreJson({ ok: true, items: actions });
}

export async function PATCH(request: Request) {
  if (!isAuthorized(request)) {
    return noStoreJson({ ok: false, message: "Token dashboard invalide." }, 401);
  }

  const originCheck = await validateSameOriginRequest();
  if (!originCheck.ok) {
    return originCheck.response;
  }

  const ip = getClientIp(originCheck.requestHeaders);
  const allowed = await applyRateLimit(ip, {
    key: "dashboard-actions-write",
    windowMs: 60_000,
    maxRequests: 30
  });

  if (!allowed) {
    return noStoreJson({ ok: false, message: "Trop de mises à jour du plan d'action." }, 429);
  }

  const payload = await parseJsonBody<{
    id?: string;
    status?: "todo" | "in-progress" | "done";
  }>(request, 4_000);

  if (!payload.ok) {
    return payload.response;
  }

  if (!payload.body.id || !payload.body.status) {
    return noStoreJson({ ok: false, message: "Action et statut requis." }, 400);
  }

  const item = await updateDashboardActionStatus(payload.body.id, payload.body.status);
  return noStoreJson({ ok: true, item });
}
