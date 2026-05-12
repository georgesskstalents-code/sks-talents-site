/**
 * Cron quotidien 7h UTC : scan 6 sources sectorielles -> Notion + Supabase linkedin_veille.
 * Dedoublonne par URL pour eviter re-ingestion.
 */
import { NextResponse } from "next/server";
import { noStoreJson } from "@/lib/requestSecurity";
import { isAuthorizedCronRequest } from "@/lib/cronAuth";
import { syncVeille } from "@/lib/linkedinSync";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
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

  const result = await syncVeille();
  return NextResponse.json({ ok: true, ...result });
}
