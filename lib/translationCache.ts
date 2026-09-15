import { createHash } from "node:crypto";

import { getRedisRestEnv } from "@/lib/requestSecurity";

type Lang = "fr" | "en";

// Translated strings are stable: cache them 30 days in Redis (shared across all
// Vercel instances) and in a module-level Map (warm instance). This removes the
// vast majority of upstream Google Translate calls, which were getting 429'd.
const REDIS_TTL_SECONDS = 30 * 24 * 60 * 60;
const MEMORY_MAX_ENTRIES = 5000;
const memoryCache = new Map<string, string>();

function cacheKey(text: string, source: Lang, target: Lang) {
  const digest = createHash("sha1").update(text).digest("hex");
  return `site-translate:v1:${source}:${target}:${digest}`;
}

function rememberInMemory(key: string, value: string) {
  if (memoryCache.size >= MEMORY_MAX_ENTRIES) {
    const oldest = memoryCache.keys().next().value;
    if (oldest) memoryCache.delete(oldest);
  }
  memoryCache.set(key, value);
}

async function redisCommand(command: unknown[], timeoutMs = 1500) {
  const env = getRedisRestEnv();
  if (!env) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(env.url, {
      method: "POST",
      headers: { Authorization: `Bearer ${env.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(command),
      cache: "no-store",
      signal: controller.signal
    });
    if (!response.ok) return null;
    return (await response.json()) as { result?: unknown };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function redisPipeline(commands: unknown[][], timeoutMs = 2000) {
  const env = getRedisRestEnv();
  if (!env || commands.length === 0) return;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    await fetch(`${env.url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${env.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(commands),
      cache: "no-store",
      signal: controller.signal
    });
  } catch {
    // Best effort.
  } finally {
    clearTimeout(timer);
  }
}

export async function readCachedTranslations(texts: string[], source: Lang, target: Lang) {
  const found = new Map<string, string>();
  const missingKeys: string[] = [];
  const missingTexts: string[] = [];

  for (const text of texts) {
    const key = cacheKey(text, source, target);
    const memoryHit = memoryCache.get(key);
    if (memoryHit !== undefined) {
      found.set(text, memoryHit);
    } else {
      missingKeys.push(key);
      missingTexts.push(text);
    }
  }

  if (missingKeys.length > 0) {
    const payload = await redisCommand(["MGET", ...missingKeys]);
    const values = Array.isArray(payload?.result) ? (payload!.result as unknown[]) : [];
    values.forEach((value, index) => {
      if (typeof value === "string" && value.length > 0) {
        found.set(missingTexts[index], value);
        rememberInMemory(missingKeys[index], value);
      }
    });
  }

  return found;
}

export async function writeCachedTranslations(entries: Map<string, string>, source: Lang, target: Lang) {
  const commands: unknown[][] = [];
  entries.forEach((translated, text) => {
    if (!translated || translated === text) return;
    const key = cacheKey(text, source, target);
    rememberInMemory(key, translated);
    commands.push(["SET", key, translated, "EX", REDIS_TTL_SECONDS]);
  });
  await redisPipeline(commands);
}
