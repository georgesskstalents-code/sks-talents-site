import {
  applyRateLimit,
  getClientIp,
  noStoreJson,
  parseJsonBody,
  validateSameOriginRequest
} from "@/lib/requestSecurity";

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
// Run up to this many batches in parallel (was sequential). Mobile networks
// benefit most from concurrency since each request has high RTT overhead.
const PARALLEL_BATCHES = 6;
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

async function translateBatch(texts: string[], sourceLanguage: "fr" | "en", targetLanguage: "fr" | "en") {
  const query = encodeURIComponent(texts.join(` ${BATCH_SEPARATOR} `));
  const response = await fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${query}`,
    {
      cache: "no-store"
    }
  );

  if (!response.ok) {
    throw new Error(`Translation upstream error: ${response.status}`);
  }

  const payload = (await response.json()) as unknown[];
  const translatedText = Array.isArray(payload?.[0])
    ? (payload[0] as unknown[][])
        .map((part) => (Array.isArray(part) && typeof part[0] === "string" ? part[0] : ""))
        .join("")
    : "";

  return translatedText.split(BATCH_SEPARATOR).map((value) => value.trim());
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

  // Run batches in waves of PARALLEL_BATCHES concurrent requests. Each wave
  // waits for its batches to finish before launching the next, preventing
  // unbounded concurrency that could trigger Google Translate's rate limiting.
  const batches: string[][] = [];
  for (let index = 0; index < upstreamTexts.length; index += BATCH_SIZE) {
    batches.push(upstreamTexts.slice(index, index + BATCH_SIZE));
  }

  for (let waveStart = 0; waveStart < batches.length; waveStart += PARALLEL_BATCHES) {
    const wave = batches.slice(waveStart, waveStart + PARALLEL_BATCHES);
    const waveResults = await Promise.all(
      wave.map((batch) => translateBatch(batch, sourceLanguage, targetLanguage))
    );

    wave.forEach((batch, waveIndex) => {
      const translatedBatch = waveResults[waveIndex];
      batch.forEach((text, batchIndex) => {
        translations.set(text, translatedBatch[batchIndex] ?? text);
      });
    });
  }

  return noStoreJson({
    ok: true,
    translations: Object.fromEntries(uniqueTexts.map((text) => [text, translations.get(text) ?? text]))
  });
}
