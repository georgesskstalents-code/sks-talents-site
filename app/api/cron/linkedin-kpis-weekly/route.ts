/**
 * Cron lundi 6h30 UTC : lit DB Notion "KPIs LinkedIn Weekly" (remplie par CEO lundi 8h Paris)
 * et synchronise vers Supabase linkedin_kpis_weekly. Upsert sur week_start.
 *
 * Note : tourne BEFORE que le CEO remplisse les KPIs (8h Paris = 6h UTC ete / 7h UTC hiver).
 * En pratique, le cron tournera donc sur la semaine PRECEDENTE deja remplie. Si rempli avant
 * 6h30, c'est encore mieux. La synchronisation est upsert donc tout reste idempotent.
 */
import { NextResponse } from "next/server";
import { noStoreJson } from "@/lib/requestSecurity";
import { isAuthorizedCronRequest } from "@/lib/cronAuth";
import { syncKpisWeekly } from "@/lib/linkedinSync";

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

  const result = await syncKpisWeekly();
  return NextResponse.json({ ok: true, ...result });
}
