import { isAuthorizedCronRequest } from "@/lib/cronAuth";
import { noStoreJson } from "@/lib/requestSecurity";
import { submitFullSitemapToIndexNow, submitToIndexNow } from "@/lib/seoIndexing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
 * GET /api/seo/refresh
 *   Submit the full sitemap to IndexNow (Bing/Yandex/Seznam). Daily cron.
 *
 * GET /api/seo/refresh?url=<encoded-url>
 *   Submit a single URL (dashboard / Notion content-sync hook).
 *
 * Auth: same as the other crons (Bearer CRON_SECRET or ?token=DASHBOARD_PRIVATE_TOKEN).
 */
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return noStoreJson({ ok: false, error: "Unauthorized" }, 401);
  }

  const url = new URL(request.url).searchParams.get("url");
  const result = url ? await submitToIndexNow([url]) : await submitFullSitemapToIndexNow();
  return noStoreJson(result, result.ok ? 200 : 502);
}

export async function POST(request: Request) {
  return GET(request);
}
