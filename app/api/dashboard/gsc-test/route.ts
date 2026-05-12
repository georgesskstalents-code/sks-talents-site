/**
 * Endpoint debug prive : teste live la connexion Google Search Console
 * et surface chaque etape (parse JSON, JWT, OAuth, searchAnalytics) pour identifier
 * exactement ou ca casse.
 *
 * Usage :
 *   GET /api/dashboard/gsc-test?token=DASHBOARD_PRIVATE_TOKEN
 */

import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { noStoreJson } from "@/lib/requestSecurity";
import { fetchGscQueryStats } from "@/lib/gscClient";
import { seoTargets } from "@/lib/strategicObjectives";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function base64UrlEncode(buf: Buffer | string): string {
  const b64 = Buffer.isBuffer(buf) ? buf.toString("base64") : Buffer.from(buf).toString("base64");
  return b64.replace(/=+$/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function diagnose(): Promise<Record<string, unknown>> {
  const steps: Record<string, unknown> = {};

  // Step 1 : env vars
  const rawB64 = process.env.GSC_SERVICE_ACCOUNT_JSON_B64;
  const siteUrl = process.env.GSC_SITE_URL;
  steps.step1_env = {
    GSC_SERVICE_ACCOUNT_JSON_B64: rawB64 ? `present (${rawB64.length} chars)` : "MISSING",
    GSC_SITE_URL: siteUrl ?? "MISSING"
  };
  if (!rawB64 || !siteUrl) return { ...steps, failure: "step1" };

  // Step 2 : decode base64
  let decoded: string;
  try {
    decoded = Buffer.from(rawB64, "base64").toString("utf-8");
    steps.step2_base64_decode = {
      ok: true,
      decoded_length: decoded.length,
      starts_with: decoded.slice(0, 30) + "..."
    };
  } catch (err) {
    steps.step2_base64_decode = { ok: false, error: String(err) };
    return { ...steps, failure: "step2" };
  }

  // Step 3 : parse JSON
  type SA = { client_email?: string; private_key?: string; token_uri?: string; project_id?: string };
  let sa: SA;
  try {
    sa = JSON.parse(decoded);
    steps.step3_json_parse = {
      ok: true,
      has_client_email: Boolean(sa.client_email),
      has_private_key: Boolean(sa.private_key),
      client_email: sa.client_email ?? "(missing)",
      project_id: sa.project_id ?? "(missing)"
    };
    if (!sa.client_email || !sa.private_key) return { ...steps, failure: "step3_missing_fields" };
  } catch (err) {
    steps.step3_json_parse = { ok: false, error: String(err).slice(0, 200) };
    return { ...steps, failure: "step3" };
  }

  // Step 4 : sign JWT + exchange for access token
  const iat = Math.floor(Date.now() / 1000);
  const claim = {
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: sa.token_uri ?? "https://oauth2.googleapis.com/token",
    exp: iat + 3600,
    iat
  };
  const header = { alg: "RS256", typ: "JWT" };
  const unsigned = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(claim))}`;
  let accessToken: string | null = null;
  try {
    const signer = crypto.createSign("RSA-SHA256");
    signer.update(unsigned);
    signer.end();
    const signature = signer.sign(sa.private_key!);
    const jwt = `${unsigned}.${base64UrlEncode(signature)}`;
    steps.step4_jwt_sign = { ok: true, jwt_length: jwt.length };

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt
      }),
      cache: "no-store"
    });
    const tokenBody = await tokenResponse.text();
    if (!tokenResponse.ok) {
      steps.step5_oauth_token = {
        ok: false,
        status: tokenResponse.status,
        body: tokenBody.slice(0, 400)
      };
      return { ...steps, failure: "step5" };
    }
    const tokenJson = JSON.parse(tokenBody);
    accessToken = tokenJson.access_token;
    steps.step5_oauth_token = { ok: true, expires_in: tokenJson.expires_in };
  } catch (err) {
    steps.step4_jwt_sign = { ok: false, error: String(err).slice(0, 300) };
    return { ...steps, failure: "step4" };
  }

  if (!accessToken) return { ...steps, failure: "step5_no_token" };

  // Step 6 : searchAnalytics query
  const today = new Date();
  const start = new Date(today.getTime() - 28 * 24 * 60 * 60 * 1000);
  const searchUrl = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const searchResponse = await fetch(searchUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      startDate: start.toISOString().slice(0, 10),
      endDate: today.toISOString().slice(0, 10),
      dimensions: ["query"],
      rowLimit: 20,
      type: "web"
    }),
    cache: "no-store"
  });
  const searchBody = await searchResponse.text();
  if (!searchResponse.ok) {
    steps.step6_search_analytics = {
      ok: false,
      status: searchResponse.status,
      body: searchBody.slice(0, 400),
      site_url_used: siteUrl
    };
    return { ...steps, failure: "step6" };
  }
  const data = JSON.parse(searchBody);
  const rowCount = (data.rows ?? []).length;
  steps.step6_search_analytics = {
    ok: true,
    rows: rowCount,
    sample_first_query: data.rows?.[0]?.keys?.[0] ?? "(no rows)"
  };

  return { ...steps, failure: null };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const expected = process.env.DASHBOARD_PRIVATE_TOKEN;

  if (!expected || token !== expected) {
    return noStoreJson({ ok: false, message: "Unauthorized" }, 401);
  }

  // Mode debug : diagnostique etape par etape
  if (url.searchParams.get("debug") === "1") {
    const diag = await diagnose();
    return NextResponse.json(diag);
  }

  // Mode standard : utilise fetchGscQueryStats normal
  const queries = seoTargets.map((t) => t.query);
  const stats = await fetchGscQueryStats({ queries });

  const env = {
    GSC_SERVICE_ACCOUNT_JSON_B64: process.env.GSC_SERVICE_ACCOUNT_JSON_B64
      ? `set (${process.env.GSC_SERVICE_ACCOUNT_JSON_B64.length} chars)`
      : "missing",
    GSC_SITE_URL: process.env.GSC_SITE_URL ?? "missing"
  };

  if (stats === null) {
    return NextResponse.json({
      ok: false,
      env,
      message: "GSC fetch a renvoye null. Relancer avec ?debug=1 pour diagnostiquer etape par etape.",
      hint: `https://www.skstalents.fr/api/dashboard/gsc-test?token=${token}&debug=1`
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

  return NextResponse.json({
    ok: true,
    env,
    period: "Derniers 28 jours",
    indexedCount: summary.filter((s) => s.indexed).length,
    totalQueries: summary.length,
    results: summary
  });
}
