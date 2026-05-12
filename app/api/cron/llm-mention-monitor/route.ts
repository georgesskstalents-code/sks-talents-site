/**
 * Weekly cron : teste les 5 prompts strategiques sur 3 LLMs (OpenAI, Anthropic, Perplexity)
 * et persiste les resultats dans Supabase table llm_mention_checks.
 *
 * Cadence : tous les lundi a 6h UTC (avant le weekly-digest qui consomme les resultats).
 * Voir vercel.json pour le mapping cron.
 *
 * Endpoint reachable :
 *  - Vercel cron (Bearer CRON_SECRET) - automatique
 *  - Manuel avec ?token=DASHBOARD_PRIVATE_TOKEN pour test
 */

import { NextResponse } from "next/server";
import { noStoreJson } from "@/lib/requestSecurity";
import { isAuthorizedCronRequest } from "@/lib/cronAuth";
import { runAllChecks } from "@/lib/llmMonitor";
import { persistChecks } from "@/lib/llmMonitorStore";
import { llmTargets } from "@/lib/strategicObjectives";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 min - 15 calls LLM peuvent prendre 2-3min

export async function GET(request: Request) {
  const url = new URL(request.url);
  const authorized = isAuthorizedCronRequest({
    authorization: request.headers.get("authorization"),
    userAgent: request.headers.get("user-agent"),
    url: request.url,
    env: {
      cronSecret: process.env.CRON_SECRET,
      dashboardToken: process.env.DASHBOARD_PRIVATE_TOKEN
    }
  });
  if (!authorized) {
    return noStoreJson({ ok: false, message: "Unauthorized" }, 401);
  }

  const prompts = llmTargets.map((t) => t.prompt);
  const results = await runAllChecks(prompts);
  const persistResult = await persistChecks(results);

  const dryRun = url.searchParams.get("dry") === "1";
  const summary = {
    ok: true,
    runs: results.length,
    mentioned: results.filter((r) => r.mentioned).length,
    persisted: persistResult.ok ? persistResult.count : 0,
    errors: results.filter((r) => r.errorReason).map((r) => ({
      provider: r.provider,
      reason: r.errorReason
    })),
    dryRun
  };

  if (dryRun) {
    return NextResponse.json({ ...summary, results });
  }
  return noStoreJson(summary);
}
