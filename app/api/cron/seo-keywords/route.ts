import { generateWeeklyKeywords, persistKeywordProposals } from "@/lib/seoKeywords";
import { isAuthorizedCronRequest } from "@/lib/cronAuth";
import { noStoreJson } from "@/lib/requestSecurity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

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
 * Cron lundi 5h UTC : génère 120 mots-clés depuis les sources curées,
 * persiste en Supabase status='pending'. Le digest content-digest 7h30
 * lit ensuite ces propositions pour les inclure dans l'email du CEO.
 */
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return noStoreJson({ ok: false, error: "Unauthorized" }, 401);
  }
  try {
    const proposals = await generateWeeklyKeywords(120);
    const persisted = await persistKeywordProposals(proposals);
    return noStoreJson({
      ok: true,
      generated: proposals.length,
      persisted: persisted.count,
      sample: proposals.slice(0, 10).map((p) => p.keyword)
    });
  } catch (error) {
    return noStoreJson(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
}

export async function POST(request: Request) {
  return GET(request);
}
