/**
 * Endpoint debug prive : teste live la connexion Google Search Console.
 *
 * Supporte 2 methodes d'auth :
 *  - OAuth refresh token (prefere quand SA blocked)
 *  - Service Account JWT (fallback)
 *
 * Usage :
 *   GET /api/dashboard/gsc-test?token=DASHBOARD_PRIVATE_TOKEN          (test normal)
 *   GET /api/dashboard/gsc-test?token=...&debug=1                       (step-by-step diag)
 */

import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { noStoreJson } from "@/lib/requestSecurity";
import { fetchGscQueryStats, getGscAccessToken } from "@/lib/gscClient";
import { seoTargets } from "@/lib/strategicObjectives";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function base64UrlEncode(buf: Buffer | string): string {
  const b64 = Buffer.isBuffer(buf) ? buf.toString("base64") : Buffer.from(buf).toString("base64");
  return b64.replace(/=+$/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function diagnose(): Promise<Record<string, unknown>> {
  const steps: Record<string, unknown> = {};
  const oauthClientId = process.env.GSC_OAUTH_CLIENT_ID;
  const oauthClientSecret = process.env.GSC_OAUTH_CLIENT_SECRET;
  const oauthRefreshToken = process.env.GSC_OAUTH_REFRESH_TOKEN;
  const saJsonB64 = process.env.GSC_SERVICE_ACCOUNT_JSON_B64;
  const siteUrl = process.env.GSC_SITE_URL;

  steps.step1_env = {
    OAUTH_CLIENT_ID: oauthClientId ? `set (${oauthClientId.length} chars)` : "missing",
    OAUTH_CLIENT_SECRET: oauthClientSecret ? `set (${oauthClientSecret.length} chars)` : "missing",
    OAUTH_REFRESH_TOKEN: oauthRefreshToken ? `set (${oauthRefreshToken.length} chars)` : "missing",
    SERVICE_ACCOUNT_JSON_B64: saJsonB64 ? `set (${saJsonB64.length} chars)` : "missing",
    SITE_URL: siteUrl ?? "MISSING"
  };
  if (!siteUrl) return { ...steps, failure: "missing_site_url" };

  // Choose auth method
  const hasOAuth = oauthClientId && oauthClientSecret && oauthRefreshToken;
  const hasSA = Boolean(saJsonB64);

  if (!hasOAuth && !hasSA) {
    return { ...steps, failure: "no_auth_configured" };
  }

  if (hasOAuth) {
    steps.step2_method = "OAuth refresh token (preferred)";

    // Step 3 : exchange refresh -> access token
    const tokenResp = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: oauthClientId!,
        client_secret: oauthClientSecret!,
        refresh_token: oauthRefreshToken!,
        grant_type: "refresh_token"
      }),
      cache: "no-store"
    });
    const tokenBody = await tokenResp.text();
    if (!tokenResp.ok) {
      steps.step3_oauth_exchange = {
        ok: false,
        status: tokenResp.status,
        body: tokenBody.slice(0, 400)
      };
      return { ...steps, failure: "step3_oauth_exchange" };
    }
    const tokenJson = JSON.parse(tokenBody);
    steps.step3_oauth_exchange = {
      ok: true,
      expires_in: tokenJson.expires_in,
      access_token_preview: tokenJson.access_token ? `${tokenJson.access_token.slice(0, 12)}...` : null
    };
    const accessToken = tokenJson.access_token as string;

    // Step 4 : searchAnalytics
    const today = new Date();
    const start = new Date(today.getTime() - 28 * 24 * 60 * 60 * 1000);
    const searchResp = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate: start.toISOString().slice(0, 10),
          endDate: today.toISOString().slice(0, 10),
          dimensions: ["query"],
          rowLimit: 20,
          type: "web"
        }),
        cache: "no-store"
      }
    );
    const searchBody = await searchResp.text();
    if (!searchResp.ok) {
      steps.step4_search_analytics = {
        ok: false,
        status: searchResp.status,
        body: searchBody.slice(0, 400),
        site_url_used: siteUrl
      };
      return { ...steps, failure: "step4_search_analytics" };
    }
    const data = JSON.parse(searchBody);
    steps.step4_search_analytics = {
      ok: true,
      rows: (data.rows ?? []).length,
      sample_first_query: data.rows?.[0]?.keys?.[0] ?? "(no rows)"
    };
    return { ...steps, failure: null };
  }

  // Fallback : SA JWT method
  steps.step2_method = "Service Account JWT (fallback)";
  // Decode + parse SA
  let decoded: string;
  try {
    decoded = Buffer.from(saJsonB64!, "base64").toString("utf-8");
  } catch (err) {
    steps.step3_sa_decode = { ok: false, error: String(err) };
    return { ...steps, failure: "step3_sa_decode" };
  }
  type SA = { client_email?: string; private_key?: string; token_uri?: string };
  let sa: SA;
  try {
    sa = JSON.parse(decoded);
  } catch (err) {
    steps.step3_sa_parse = { ok: false, error: String(err).slice(0, 200) };
    return { ...steps, failure: "step3_sa_parse" };
  }
  steps.step3_sa_parse = { ok: true, client_email: sa.client_email };
  if (!sa.client_email || !sa.private_key) return { ...steps, failure: "step3_sa_missing_fields" };

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
    const tokenResp = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt
      }),
      cache: "no-store"
    });
    const tokenBody = await tokenResp.text();
    if (!tokenResp.ok) {
      steps.step4_sa_token = { ok: false, status: tokenResp.status, body: tokenBody.slice(0, 400) };
      return { ...steps, failure: "step4_sa_token" };
    }
    accessToken = JSON.parse(tokenBody).access_token;
    steps.step4_sa_token = { ok: true };
  } catch (err) {
    steps.step4_sa_jwt = { ok: false, error: String(err).slice(0, 300) };
    return { ...steps, failure: "step4_sa_jwt" };
  }

  if (!accessToken) return { ...steps, failure: "step4_no_token" };

  const searchResp = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate: new Date(Date.now() - 28 * 86400000).toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10),
        dimensions: ["query"],
        rowLimit: 20,
        type: "web"
      }),
      cache: "no-store"
    }
  );
  const searchBody = await searchResp.text();
  if (!searchResp.ok) {
    steps.step5_search_analytics = {
      ok: false,
      status: searchResp.status,
      body: searchBody.slice(0, 400),
      site_url_used: siteUrl
    };
    return { ...steps, failure: "step5_search_analytics" };
  }
  const data = JSON.parse(searchBody);
  steps.step5_search_analytics = {
    ok: true,
    rows: (data.rows ?? []).length,
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

  if (url.searchParams.get("debug") === "1") {
    const diag = await diagnose();
    return NextResponse.json(diag);
  }

  const queries = seoTargets.map((t) => t.query);
  const stats = await fetchGscQueryStats({ queries });
  const { method } = await getGscAccessToken();

  const env = {
    auth_method_active: method,
    GSC_OAUTH_CLIENT_ID: process.env.GSC_OAUTH_CLIENT_ID ? "set" : "missing",
    GSC_OAUTH_CLIENT_SECRET: process.env.GSC_OAUTH_CLIENT_SECRET ? "set" : "missing",
    GSC_OAUTH_REFRESH_TOKEN: process.env.GSC_OAUTH_REFRESH_TOKEN ? "set" : "missing",
    GSC_SERVICE_ACCOUNT_JSON_B64: process.env.GSC_SERVICE_ACCOUNT_JSON_B64 ? "set" : "missing",
    GSC_SITE_URL: process.env.GSC_SITE_URL ?? "missing"
  };

  if (stats === null) {
    return NextResponse.json({
      ok: false,
      env,
      message: "GSC fetch returned null. Relancer avec ?debug=1 pour diagnostiquer.",
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
