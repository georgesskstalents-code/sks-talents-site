import { isAuthorizedCronRequest } from "@/lib/cronAuth";
import { noStoreJson } from "@/lib/requestSecurity";
import { submitToIndexNow } from "@/lib/seoIndexing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.skstalents.fr";

function isAuthorized(request: Request): boolean {
  return isAuthorizedCronRequest({
    authorization: request.headers.get("authorization"),
    userAgent: request.headers.get("user-agent"),
    url: request.url,
    env: {
      cronSecret: process.env.CRON_SECRET,
      dashboardToken: process.env.DASHBOARD_PRIVATE_TOKEN
    }
  });
}

/**
 * GET /api/seo/keywords?status=pending&limit=120
 *   List proposals (used by /dashboard/seo-keywords).
 *
 * PATCH /api/seo/keywords  body { ids: number[], status: "approved" | "rejected" }
 *   Bulk-update proposals. On approval, also re-trigger an IndexNow ping
 *   so the changes propagate fast.
 */
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return noStoreJson({ ok: false, error: "Unauthorized" }, 401);
  }
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return noStoreJson({ ok: false, error: "Supabase not configured" }, 503);
  }
  const url = new URL(request.url);
  const status = url.searchParams.get("status") ?? "pending";
  const limit = Math.min(Number(url.searchParams.get("limit") ?? "120"), 500);

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/seo_keyword_proposals?status=eq.${encodeURIComponent(status)}&select=*&order=score.desc&limit=${limit}`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }, cache: "no-store" }
  );
  if (!response.ok) {
    return noStoreJson({ ok: false, error: `Supabase ${response.status}` }, 502);
  }
  return noStoreJson({ ok: true, proposals: await response.json() });
}

export async function PATCH(request: Request) {
  if (!isAuthorized(request)) {
    return noStoreJson({ ok: false, error: "Unauthorized" }, 401);
  }
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return noStoreJson({ ok: false, error: "Supabase not configured" }, 503);
  }
  const body = (await request.json().catch(() => ({}))) as {
    ids?: number[];
    status?: "approved" | "rejected";
  };
  if (!Array.isArray(body.ids) || body.ids.length === 0 || !body.status) {
    return noStoreJson({ ok: false, error: "ids[] + status required" }, 422);
  }
  if (!["approved", "rejected"].includes(body.status)) {
    return noStoreJson({ ok: false, error: "status must be approved|rejected" }, 422);
  }

  const idFilter = body.ids.map((n) => `id.eq.${Number(n)}`).join(",");
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/seo_keyword_proposals?or=(${idFilter})`,
    {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify({ status: body.status, decided_at: new Date().toISOString() }),
      cache: "no-store"
    }
  );
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    return noStoreJson({ ok: false, error: `Supabase ${response.status}: ${text.slice(0, 200)}` }, 502);
  }

  // On approval, ping IndexNow so search engines re-fetch the home + landings
  // (where keywords meta is rebuilt at request time).
  if (body.status === "approved") {
    await submitToIndexNow([
      `${SITE_URL}/`,
      `${SITE_URL}/animal-health/structuration-ia`,
      `${SITE_URL}/life-sciences/structuration-ia`,
      `${SITE_URL}/sitemap.xml`
    ]);
  }

  return noStoreJson({ ok: true, updated: body.ids.length, status: body.status });
}
