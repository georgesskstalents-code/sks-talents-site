import { buildDashboardPayload } from "@/lib/dashboardData";
import { applyRateLimit, getClientIp, noStoreJson } from "@/lib/requestSecurity";

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

  const ip = getClientIp(new Headers(request.headers));
  const allowed = await applyRateLimit(ip, {
    key: "dashboard-read",
    windowMs: 60_000,
    maxRequests: 120
  });

  if (!allowed) {
    return noStoreJson({ ok: false, message: "Trop de requêtes dashboard." }, 429);
  }

  const url = new URL(request.url);
  const range = url.searchParams.get("range") ?? "30d";
  const channel = url.searchParams.get("channel");

  const payload = await buildDashboardPayload(range, channel);
  return noStoreJson(payload);
}
