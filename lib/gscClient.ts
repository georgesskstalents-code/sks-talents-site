/**
 * Google Search Console client - 2 methodes d'auth supportees :
 *
 * 1. OAuth refresh token (PREFERE - pour contourner le bug "SA email blocked" sur GSC UI)
 *    Vercel env :
 *      GSC_OAUTH_CLIENT_ID
 *      GSC_OAUTH_CLIENT_SECRET
 *      GSC_OAUTH_REFRESH_TOKEN
 *    + GSC_SITE_URL
 *
 * 2. Service Account JWT (fallback - bloque sur certains comptes Google)
 *    Vercel env :
 *      GSC_SERVICE_ACCOUNT_JSON_B64
 *      GSC_SITE_URL
 *
 * Le code essaie OAuth d'abord, fallback sur SA si OAuth absent. Aucune dependance externe.
 */

import crypto from "node:crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SEARCH_ANALYTICS_URL = (siteUrl: string) =>
  `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;

type ServiceAccount = {
  client_email: string;
  private_key: string;
  token_uri?: string;
};

export type GscQueryStat = {
  query: string;
  position: number | null; // moyenne ponderee sur la periode
  clicks: number;
  impressions: number;
  ctr: number;
};

export type AuthMethod = "oauth_refresh" | "service_account" | "none";

function base64UrlEncode(buf: Buffer | string): string {
  const b64 = Buffer.isBuffer(buf) ? buf.toString("base64") : Buffer.from(buf).toString("base64");
  return b64.replace(/=+$/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

// ---------------- OAuth refresh token method (preferred) ----------------

function hasOAuthCredentials(): boolean {
  return Boolean(
    process.env.GSC_OAUTH_CLIENT_ID &&
      process.env.GSC_OAUTH_CLIENT_SECRET &&
      process.env.GSC_OAUTH_REFRESH_TOKEN
  );
}

async function getAccessTokenFromOAuth(): Promise<string | null> {
  const clientId = process.env.GSC_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GSC_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GSC_OAUTH_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return null;

  try {
    const response = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token"
      }),
      cache: "no-store"
    });
    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error("GSC OAuth refresh failed", response.status, body.slice(0, 240));
      return null;
    }
    const data = (await response.json()) as { access_token?: string };
    return data.access_token ?? null;
  } catch (err) {
    console.error("GSC OAuth fetch error", err);
    return null;
  }
}

// ---------------- Service Account JWT method (fallback) ----------------

function loadServiceAccount(): ServiceAccount | null {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON_B64;
  if (!raw) return null;
  try {
    const decoded = Buffer.from(raw, "base64").toString("utf-8");
    const parsed = JSON.parse(decoded) as ServiceAccount;
    if (!parsed.client_email || !parsed.private_key) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function getAccessTokenFromSA(sa: ServiceAccount): Promise<string | null> {
  const iat = Math.floor(Date.now() / 1000);
  const claim = {
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: sa.token_uri ?? TOKEN_URL,
    exp: iat + 3600,
    iat
  };
  const header = { alg: "RS256", typ: "JWT" };
  const unsigned = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(claim))}`;

  try {
    const signer = crypto.createSign("RSA-SHA256");
    signer.update(unsigned);
    signer.end();
    const signature = signer.sign(sa.private_key);
    const jwt = `${unsigned}.${base64UrlEncode(signature)}`;

    const response = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt
      }),
      cache: "no-store"
    });
    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error("GSC SA JWT token exchange failed", response.status, body.slice(0, 240));
      return null;
    }
    const data = (await response.json()) as { access_token?: string };
    return data.access_token ?? null;
  } catch (err) {
    console.error("GSC SA JWT sign failed", err);
    return null;
  }
}

// ---------------- Unified access token ----------------

export async function getGscAccessToken(): Promise<{ token: string | null; method: AuthMethod }> {
  // Prefer OAuth refresh token (works even when SA is blocked)
  if (hasOAuthCredentials()) {
    const token = await getAccessTokenFromOAuth();
    return { token, method: "oauth_refresh" };
  }
  // Fallback : Service Account JWT
  const sa = loadServiceAccount();
  if (sa) {
    const token = await getAccessTokenFromSA(sa);
    return { token, method: "service_account" };
  }
  return { token: null, method: "none" };
}

// ---------------- Search Analytics query (public API) ----------------

export async function fetchGscQueryStats(opts: {
  queries: string[];
  startDate?: string; // YYYY-MM-DD
  endDate?: string;
}): Promise<GscQueryStat[] | null> {
  const siteUrl = process.env.GSC_SITE_URL;
  if (!siteUrl) return null;

  const { token } = await getGscAccessToken();
  if (!token) return null;

  const today = new Date();
  const default28 = new Date(today.getTime() - 28 * 24 * 60 * 60 * 1000);
  const startDate = opts.startDate ?? default28.toISOString().slice(0, 10);
  const endDate = opts.endDate ?? today.toISOString().slice(0, 10);

  // 1 seule requete GSC qui ramene 200 lignes sur la periode, on filtre cote client.
  const response = await fetch(SEARCH_ANALYTICS_URL(siteUrl), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      startDate,
      endDate,
      dimensions: ["query"],
      rowLimit: 1000,
      type: "web"
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error("GSC searchAnalytics failed", response.status, body.slice(0, 240));
    return null;
  }

  const data = (await response.json()) as {
    rows?: Array<{ keys: string[]; clicks: number; impressions: number; ctr: number; position: number }>;
  };

  const rows = data.rows ?? [];
  const map = new Map<string, { clicks: number; impressions: number; ctr: number; position: number }>();
  for (const r of rows) {
    const q = (r.keys?.[0] ?? "").toLowerCase().trim();
    if (q) map.set(q, r);
  }

  return opts.queries.map((q) => {
    const lower = q.toLowerCase().trim();
    // match exact ou inclusif (la query GSC peut inclure variantes du keyword)
    const exact = map.get(lower);
    if (exact) {
      return {
        query: q,
        position: exact.position,
        clicks: exact.clicks,
        impressions: exact.impressions,
        ctr: exact.ctr
      };
    }
    // fallback : best inclusion match
    const includesMatches = [...map.entries()].filter(([k]) => k.includes(lower));
    if (includesMatches.length === 0) {
      return { query: q, position: null, clicks: 0, impressions: 0, ctr: 0 };
    }
    const best = includesMatches.reduce((acc, [, v]) =>
      v.impressions > (acc.impressions ?? 0) ? v : acc
    , { clicks: 0, impressions: 0, ctr: 0, position: 0 } as { clicks: number; impressions: number; ctr: number; position: number });
    return {
      query: q,
      position: best.position,
      clicks: best.clicks,
      impressions: best.impressions,
      ctr: best.ctr
    };
  });
}
