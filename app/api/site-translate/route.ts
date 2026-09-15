import {
  applyRateLimit,
  getClientIp,
  noStoreJson,
  parseJsonBody,
  validateSameOriginRequest
} from "@/lib/requestSecurity";
import { readCachedTranslations, writeCachedTranslations } from "@/lib/translationCache";

type SiteTranslateBody = {
  texts?: unknown;
  sourceLanguage?: "fr" | "en";
  targetLanguage?: "fr" | "en";
  path?: string;
};

const BATCH_SEPARATOR = "__SKS_BREAK_123__";
// Increased from 8 to 24: Google Translate handles up to 5000 chars per request,
// at 320 chars/text avg this is ~7700 chars (still safe). Net effect: 3x fewer
// roundtrips. Combined with parallel dispatch below = 6-9x faster overall.
const BATCH_SIZE = 24;
// Concurrency lowered 6 → 2: the unofficial translate endpoint rate-limits
// (429) aggressively per source IP, and Vercel egress IPs are shared. Most
// strings now come from the Redis cache, so latency stays low anyway.
const PARALLEL_BATCHES = 2;
const UPSTREAM_TIMEOUT_MS = 6000;
const UPSTREAM_RETRY_DELAY_MS = 400;

class UpstreamError extends Error {
  status: number;
  constructor(status: number) {
    super(`Translation upstream error: ${status}`);
    this.status = status;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const CUSTOM_TRANSLATIONS: Record<string, Partial<Record<"fr" | "en", string>>> = {
  Chercher: { en: "Search" },
  "Être rappelé": { en: "Get a callback" },
  "Réserver un call": { en: "Book a call" },
  jour: { en: "day" },
  jours: { en: "days" },
  Jour: { en: "Day" },
  Jours: { en: "Days" },
  "10 jours": { en: "10 days" },
  "5 j": { en: "5 d" },
  "10 j": { en: "10 d" },
  "28 j": { en: "28 d" },
  "30 j": { en: "30 d" },
  "60 j": { en: "60 d" },
  "5j": { en: "5d" },
  "10j": { en: "10d" },
  "28j": { en: "28d" },
  "30j": { en: "30d" },
  "60j": { en: "60d" },
  "EN traduit la page active directement sur le site.": {
    en: "EN translates the active page directly on the site."
  },
  Search: { fr: "Chercher" },
  "Get a callback": { fr: "Être rappelé" },
  "Book a call": { fr: "Réserver un call" },
  day: { fr: "jour" },
  days: { fr: "jours" },
  Day: { fr: "Jour" },
  Days: { fr: "Jours" },
  "10 days": { fr: "10 jours" },
  "5 d": { fr: "5 j" },
  "10 d": { fr: "10 j" },
  "28 d": { fr: "28 j" },
  "30 d": { fr: "30 j" },
  "60 d": { fr: "60 j" },
  "5d": { fr: "5j" },
  "10d": { fr: "10j" },
  "28d": { fr: "28j" },
  "30d": { fr: "30j" },
  "60d": { fr: "60j" }
};

function normalizeText(value: unknown) {
  // Cap raised from 320 → 600 to handle long paragraphs (FAQ answers, hero
  // descriptions). Google Translate accepts up to ~5000 chars per call, well
  // above this. Texts > 600 chars are still rare on the site and would be
  // pre-trimmed at the source.
  return typeof value === "string" ? value.trim().slice(0, 600) : "";
}

function resolveCustomTranslation(text: string, targetLanguage: "fr" | "en") {
  return CUSTOM_TRANSLATIONS[text]?.[targetLanguage] ?? null;
}

async function fetchUpstream(texts: string[], sourceLanguage: "fr" | "en", targetLanguage: "fr" | "en") {
  const query = encodeURIComponent(texts.join(` ${BATCH_SEPARATOR} `));
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${query}`,
      { cache: "no-store", signal: controller.signal }
    );

    if (!response.ok) {
      throw new UpstreamError(response.status);
    }

    const payload = (await response.json()) as unknown[];
    const translatedText = Array.isArray(payload?.[0])
      ? (payload[0] as unknown[][])
          .map((part) => (Array.isArray(part) && typeof part[0] === "string" ? part[0] : ""))
          .join("")
      : "";

    return translatedText.split(BATCH_SEPARATOR).map((value) => value.trim());
  } finally {
    clearTimeout(timer);
  }
}

// Returns null when the upstream is unavailable (429 / 5xx / timeout) after one
// retry. Callers degrade gracefully instead of surfacing a 5xx to the browser.
async function translateBatch(texts: string[], sourceLanguage: "fr" | "en", targetLanguage: "fr" | "en") {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      return await fetchUpstream(texts, sourceLanguage, targetLanguage);
    } catch (error) {
      const status = error instanceof UpstreamError ? error.status : 0;
      const retryable = status === 429 || status >= 500 || status === 0;
      if (!retryable || attempt === 1) {
        console.warn("site-translate upstream unavailable", { status, attempt, batchSize: texts.length });
        return null;
      }
      await sleep(UPSTREAM_RETRY_DELAY_MS * (attempt + 1));
    }
  }
  return null;
}

export async function POST(request: Request) {
  const originCheck = await validateSameOriginRequest();
  if (!originCheck.ok) {
    return originCheck.response;
  }

  const ip = getClientIp(originCheck.requestHeaders);
  // Rate limit raised from 30 → 100 / 10 min : a user navigating 5-10 pages can
  // legitimately trigger that many translation requests, especially on mobile
  // when drawers open and trigger MutationObserver re-fetches.
  const allowed = await applyRateLimit(ip, {
    key: "site-translate",
    windowMs: 10 * 60 * 1000,
    maxRequests: 100
  });

  if (!allowed) {
    return noStoreJson({ ok: false, message: "Too many translation requests." }, 429);
  }

  const parsedBody = await parseJsonBody<SiteTranslateBody>(request, 32_000);
  if (!parsedBody.ok) {
    return parsedBody.response;
  }

  const sourceLanguage = parsedBody.body.sourceLanguage === "en" ? "en" : "fr";
  const targetLanguage = parsedBody.body.targetLanguage === "fr" ? "fr" : "en";

  const texts = Array.isArray(parsedBody.body.texts)
    // Cap raised from 120 → 500 unique texts. Most content-rich pages on the
    // site have ~150-250 unique strings; the 120 ceiling was actively cropping
    // content (FAQ answers, fiches métiers content) leading to "untranslated"
    // patches the user reported.
    ? parsedBody.body.texts.map(normalizeText).filter(Boolean).slice(0, 500)
    : [];

  if (texts.length === 0) {
    return noStoreJson({ ok: false, message: "No text to translate." }, 422);
  }

  if (sourceLanguage === targetLanguage) {
    return noStoreJson({
      ok: true,
      translations: Object.fromEntries(texts.map((text) => [text, text]))
    });
  }

  const uniqueTexts = Array.from(new Set(texts));
  const translations = new Map<string, string>();
  const upstreamTexts: string[] = [];

  uniqueTexts.forEach((text) => {
    const customTranslation = resolveCustomTranslation(text, targetLanguage);
    if (customTranslation) {
      translations.set(text, customTranslation);
      return;
    }

    upstreamTexts.push(text);
  });

  // Serve everything we can from the shared cache before touching the upstream.
  const cached = await readCachedTranslations(upstreamTexts, sourceLanguage, targetLanguage);
  const toFetch: string[] = [];
  upstreamTexts.forEach((text) => {
    const hit = cached.get(text);
    if (hit) {
      translations.set(text, hit);
    } else {
      toFetch.push(text);
    }
  });

  // Run batches in waves of PARALLEL_BATCHES concurrent requests. Each wave
  // waits for its batches to finish before launching the next, preventing
  // unbounded concurrency that could trigger Google Translate's rate limiting.
  const batches: string[][] = [];
  for (let index = 0; index < toFetch.length; index += BATCH_SIZE) {
    batches.push(toFetch.slice(index, index + BATCH_SIZE));
  }

  let partial = false;
  const freshlyTranslated = new Map<string, string>();

  for (let waveStart = 0; waveStart < batches.length; waveStart += PARALLEL_BATCHES) {
    if (partial) {
      // Upstream is throttling us: stop hammering it, return what we have.
      break;
    }
    const wave = batches.slice(waveStart, waveStart + PARALLEL_BATCHES);
    const waveResults = await Promise.all(
      wave.map((batch) => translateBatch(batch, sourceLanguage, targetLanguage))
    );

    wave.forEach((batch, waveIndex) => {
      const translatedBatch = waveResults[waveIndex];
      if (!translatedBatch) {
        partial = true;
        return;
      }
      batch.forEach((text, batchIndex) => {
        const translated = translatedBatch[batchIndex];
        if (translated) {
          translations.set(text, translated);
          freshlyTranslated.set(text, translated);
        }
      });
    });
  }

  if (freshlyTranslated.size > 0) {
    await writeCachedTranslations(freshlyTranslated, sourceLanguage, targetLanguage);
  }

  // Never answer 5xx because of the upstream: return the strings we have (the
  // browser keeps the original for the rest) and flag the response as partial so
  // the client does not persist an incomplete map.
  return noStoreJson({
    ok: true,
    partial,
    translations: Object.fromEntries(
      uniqueTexts.flatMap((text) => {
        const translated = translations.get(text);
        return translated ? [[text, translated] as const] : [];
      })
    )
  });
}
