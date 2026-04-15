import { headers } from "next/headers";
import { NextResponse } from "next/server";

const rateLimitStore = new Map<string, { count: number; expiresAt: number }>();

type RateLimitOptions = {
  key: string;
  windowMs: number;
  maxRequests: number;
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0"
    }
  });
}

function getRedisRestEnv() {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return null;
  }

  return { url, token };
}

function getAllowedHosts(host: string | null) {
  const allowed = new Set<string>();

  if (host) {
    allowed.add(host.toLowerCase());
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  if (siteUrl) {
    try {
      allowed.add(new URL(siteUrl).host.toLowerCase());
    } catch {
      // Ignore malformed env values.
    }
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    allowed.add(vercelUrl.toLowerCase());
  }

  return allowed;
}

export async function validateSameOriginRequest() {
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin");
  const referer = requestHeaders.get("referer");
  const host = requestHeaders.get("host");
  const secFetchSite = requestHeaders.get("sec-fetch-site");

  if (secFetchSite && !["same-origin", "same-site", "none"].includes(secFetchSite)) {
    return {
      ok: false as const,
      requestHeaders,
      response: jsonResponse({ ok: false, message: "Origine non autorisée." }, 403)
    };
  }

  if (!host) {
    return {
      ok: false as const,
      requestHeaders,
      response: jsonResponse({ ok: false, message: "Hôte invalide." }, 403)
    };
  }

  const allowedHosts = getAllowedHosts(host);

  if (!origin && !referer) {
    return { ok: true as const, requestHeaders };
  }

  const sourceUrl = origin || referer;
  let originHost = "";
  try {
    originHost = new URL(sourceUrl as string).host.toLowerCase();
  } catch {
    return {
      ok: false as const,
      requestHeaders,
      response: jsonResponse({ ok: false, message: "Origine invalide." }, 403)
    };
  }

  if (!allowedHosts.has(originHost)) {
    return {
      ok: false as const,
      requestHeaders,
      response: jsonResponse({ ok: false, message: "Origine non autorisée." }, 403)
    };
  }

  return { ok: true as const, requestHeaders };
}

export function getClientIp(requestHeaders: Headers) {
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
}

function applyLocalRateLimit(ip: string, options: RateLimitOptions) {
  const now = Date.now();
  const key = `${options.key}:${ip}`;
  const current = rateLimitStore.get(key);

  if (!current || current.expiresAt <= now) {
    rateLimitStore.set(key, { count: 1, expiresAt: now + options.windowMs });
    return true;
  }

  if (current.count >= options.maxRequests) {
    return false;
  }

  current.count += 1;
  rateLimitStore.set(key, current);
  return true;
}

async function applyDistributedRateLimit(ip: string, options: RateLimitOptions) {
  const redisEnv = getRedisRestEnv();
  if (!redisEnv) {
    return null;
  }

  const redisKey = `ratelimit:${options.key}:${ip}`;
  const incrementResponse = await fetch(`${redisEnv.url}/incr/${encodeURIComponent(redisKey)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redisEnv.token}`
    },
    cache: "no-store"
  });

  if (!incrementResponse.ok) {
    throw new Error(`Upstash INCR failed with ${incrementResponse.status}`);
  }

  const incrementPayload = (await incrementResponse.json()) as { result?: number };
  const count = Number(incrementPayload.result ?? 0);

  if (count === 1) {
    await fetch(
      `${redisEnv.url}/pexpire/${encodeURIComponent(redisKey)}/${encodeURIComponent(String(options.windowMs))}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${redisEnv.token}`
        },
        cache: "no-store"
      }
    );
  }

  return count <= options.maxRequests;
}

export async function applyRateLimit(ip: string, options: RateLimitOptions) {
  try {
    const distributedResult = await applyDistributedRateLimit(ip, options);
    if (distributedResult !== null) {
      return distributedResult;
    }
  } catch (error) {
    console.error("Distributed rate limit fallback", error);
  }

  return applyLocalRateLimit(ip, options);
}

export async function parseJsonBody<T>(request: Request, maxBytes = 20_000) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return {
      ok: false as const,
      response: jsonResponse({ ok: false, message: "Content-Type non supporté." }, 415)
    };
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    return {
      ok: false as const,
      response: jsonResponse({ ok: false, message: "Payload trop volumineux." }, 413)
    };
  }

  try {
    const rawBody = await request.text();
    if (rawBody.length > maxBytes) {
      return {
        ok: false as const,
        response: jsonResponse({ ok: false, message: "Payload trop volumineux." }, 413)
      };
    }

    return { ok: true as const, body: JSON.parse(rawBody) as T };
  } catch {
    return {
      ok: false as const,
      response: jsonResponse({ ok: false, message: "Payload invalide." }, 400)
    };
  }
}

export function noStoreJson(body: Record<string, unknown>, status = 200) {
  return jsonResponse(body, status);
}
