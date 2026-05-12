/**
 * Endpoint debug prive : teste live la connexion Google Search Console
 * via le Service Account configure dans GSC_SERVICE_ACCOUNT_JSON_B64.
 *
 * Usage :
 *   GET /api/dashboard/gsc-test?token=DASHBOARD_PRIVATE_TOKEN
 *
 * Verifie :
 *   - Variables d'env presentes
 *   - JWT signature OK (acces token recu)
 *   - searchAnalytics retourne des donnees pour les 5 requetes phares
 */

import { NextResponse } from "next/server";
import { noStoreJson } from "@/lib/requestSecurity";
import { fetchGscQueryStats } from "@/lib/gscClient";
import { seoTargets } from "@/lib/strategicObjectives";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const expected = process.env.DASHBOARD_PRIVATE_TOKEN;

  if (!expected || token !== expected) {
    return noStoreJson({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const env = {
    GSC_SERVICE_ACCOUNT_JSON_B64: process.env.GSC_SERVICE_ACCOUNT_JSON_B64
      ? `set (${process.env.GSC_SERVICE_ACCOUNT_JSON_B64.length} chars)`
      : "missing",
    GSC_SITE_URL: process.env.GSC_SITE_URL ?? "missing"
  };

  const queries = seoTargets.map((t) => t.query);
  const stats = await fetchGscQueryStats({ queries });

  if (stats === null) {
    return NextResponse.json({
      ok: false,
      env,
      message:
        "GSC fetch a renvoye null. Causes possibles : GSC_SERVICE_ACCOUNT_JSON_B64 absent ou mal forme, GSC_SITE_URL absent, JWT signature echec, Service Account pas autorise dans Search Console, ou API HTTP error. Verifier les logs Vercel runtime pour le detail.",
      queries
    });
  }

  const summary = stats.map((s) => ({
    query: s.query,
    position: s.position,
    impressions: s.impressions,
    clicks: s.clicks,
    ctr: s.ctr,
    indexed: s.position !== null
  }));

  const allIndexed = summary.every((s) => s.indexed);
  return NextResponse.json({
    ok: true,
    env,
    period: "Derniers 28 jours",
    allIndexed,
    indexedCount: summary.filter((s) => s.indexed).length,
    totalQueries: summary.length,
    results: summary
  });
}
