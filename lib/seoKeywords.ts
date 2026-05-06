/**
 * Hebdomadaire generator de mots-clés SEO.
 *
 * Pipeline :
 *   1. Scrape titres + meta descriptions des sources curées (data/seoSources.ts)
 *   2. Tokenize + filter (FR/EN, stop words, length, sectoriel)
 *   3. Score TF-IDF (terme fréquent dans une source rare = signal)
 *   4. Optionnel : enrichissement Anthropic (synonymes, longue traîne, intent)
 *   5. Persist en Supabase (table seo_keyword_proposals) — status='pending'
 *
 * Usage : appelé chaque lundi 6h30 par /api/cron/seo-keywords (avant le digest).
 */

import { seoSources, type SeoSource } from "@/data/seoSources";

export type ProposedKeyword = {
  keyword: string;
  sourceCategory: SeoSource["category"];
  sourceUrl: string;
  score: number; // 0..1
};

const STOP_WORDS = new Set([
  // FR
  "et", "ou", "le", "la", "les", "des", "de", "du", "un", "une", "au", "aux", "ce", "cette",
  "ces", "que", "qui", "pour", "par", "sur", "avec", "sans", "dans", "en", "à", "se", "son",
  "sa", "ses", "ils", "elles", "nous", "vous", "est", "sont", "été", "être", "avoir", "fait",
  "plus", "moins", "tout", "tous", "toute", "toutes", "comme", "mais", "donc", "ainsi",
  "aussi", "très", "trop", "peu", "leurs", "leur",
  // EN
  "the", "and", "or", "of", "to", "for", "with", "without", "in", "on", "at", "by", "from",
  "as", "is", "are", "was", "were", "be", "been", "being", "this", "that", "these", "those",
  "we", "you", "they", "our", "your", "their", "all", "any", "some", "more", "most", "less"
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip diacritics for matching
    .replace(/[^a-z0-9\s\-/&]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((t) => t.length >= 4 && t.length <= 30)
    .filter((t) => !STOP_WORDS.has(t))
    .filter((t) => !/^\d+$/.test(t)); // skip pure numbers
}

/**
 * Build n-grams (unigrams + bigrams + trigrams) from tokens.
 * Bigrams/trigrams are richer SEO signal ("executive search biotech",
 * "talent acquisition life sciences", etc.).
 */
function nGrams(tokens: string[]): string[] {
  const grams: string[] = [...tokens];
  for (let i = 0; i < tokens.length - 1; i++) {
    grams.push(`${tokens[i]} ${tokens[i + 1]}`);
  }
  for (let i = 0; i < tokens.length - 2; i++) {
    grams.push(`${tokens[i]} ${tokens[i + 1]} ${tokens[i + 2]}`);
  }
  return grams;
}

async function scrapeSource(source: SeoSource, timeoutMs = 8000): Promise<string> {
  try {
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), timeoutMs);
    const response = await fetch(source.url, {
      signal: ac.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; SKSTalentsKeywordBot/1.0; +https://www.skstalents.fr)",
        "Accept": "text/html"
      },
      cache: "no-store"
    });
    clearTimeout(t);
    if (!response.ok) return "";
    const html = await response.text();
    return extractRelevantText(html);
  } catch {
    return "";
  }
}

function extractRelevantText(html: string): string {
  const out: string[] = [];
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) out.push(titleMatch[1]);
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
  if (descMatch) out.push(descMatch[1]);
  const ogDescMatch = html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i);
  if (ogDescMatch) out.push(ogDescMatch[1]);
  const headingMatches = Array.from(html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi));
  for (const m of headingMatches) {
    out.push(m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " "));
  }
  return out.join(" \n ").slice(0, 8000);
}

/**
 * Generate weekly keyword proposals from the curated sources.
 * Returns up to `targetCount` proposals (default 120) sorted by relevance.
 */
export async function generateWeeklyKeywords(targetCount = 120): Promise<ProposedKeyword[]> {
  const corpus: { source: SeoSource; text: string; tokens: string[] }[] = [];

  // Parallel scrape (10 at a time max to avoid hammering)
  const chunks: SeoSource[][] = [];
  for (let i = 0; i < seoSources.length; i += 10) {
    chunks.push(seoSources.slice(i, i + 10));
  }
  for (const chunk of chunks) {
    const results = await Promise.all(
      chunk.map(async (source) => ({
        source,
        text: await scrapeSource(source)
      }))
    );
    for (const { source, text } of results) {
      const tokens = tokenize(text);
      if (tokens.length === 0) continue;
      corpus.push({ source, text, tokens });
    }
  }

  // Document frequency for each n-gram
  const docFreq = new Map<string, number>();
  const sourcesByGram = new Map<string, SeoSource>();
  const totalDocs = Math.max(corpus.length, 1);

  for (const doc of corpus) {
    const seen = new Set<string>();
    for (const gram of nGrams(doc.tokens)) {
      if (seen.has(gram)) continue;
      seen.add(gram);
      docFreq.set(gram, (docFreq.get(gram) ?? 0) + 1);
      // Keep the highest-weight source for that gram
      const existing = sourcesByGram.get(gram);
      if (!existing || doc.source.weight > existing.weight) {
        sourcesByGram.set(gram, doc.source);
      }
    }
  }

  // TF-IDF style score with weight pondération
  const scored: ProposedKeyword[] = [];
  for (const doc of corpus) {
    const tf = new Map<string, number>();
    for (const gram of nGrams(doc.tokens)) tf.set(gram, (tf.get(gram) ?? 0) + 1);
    for (const [gram, count] of tf) {
      const df = docFreq.get(gram) ?? 1;
      // IDF lite: prefer terms found in 1 to 4 docs (not too rare, not too common)
      if (df < 1 || df > Math.ceil(totalDocs / 2)) continue;
      const idf = Math.log(totalDocs / df);
      const baseScore = count * idf;
      const weighted = baseScore * doc.source.weight;
      scored.push({
        keyword: gram,
        sourceCategory: doc.source.category,
        sourceUrl: doc.source.url,
        score: weighted
      });
    }
  }

  // Dedupe (keep highest-scoring instance) + sort + slice
  const dedup = new Map<string, ProposedKeyword>();
  for (const p of scored) {
    const existing = dedup.get(p.keyword);
    if (!existing || p.score > existing.score) dedup.set(p.keyword, p);
  }
  const sorted = Array.from(dedup.values()).sort((a, b) => b.score - a.score);

  // Normalize scores 0..1 and clip to target
  const max = sorted[0]?.score ?? 1;
  return sorted
    .slice(0, targetCount)
    .map((p) => ({ ...p, score: max > 0 ? +(p.score / max).toFixed(3) : 0 }));
}

/**
 * Persist proposals to Supabase table `seo_keyword_proposals`.
 * Returns count actually persisted (no-op if Supabase env not set).
 */
export async function persistKeywordProposals(
  proposals: ProposedKeyword[]
): Promise<{ ok: boolean; count: number }> {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || proposals.length === 0) {
    return { ok: false, count: 0 };
  }
  const proposedAt = new Date().toISOString();
  const rows = proposals.map((p) => ({
    keyword: p.keyword,
    source_category: p.sourceCategory,
    source_url: p.sourceUrl,
    score: p.score,
    status: "pending",
    proposed_at: proposedAt
  }));
  try {
    const response = await fetch(`${url}/rest/v1/seo_keyword_proposals`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify(rows),
      cache: "no-store"
    });
    return { ok: response.ok, count: rows.length };
  } catch {
    return { ok: false, count: 0 };
  }
}

export async function getApprovedKeywords(): Promise<string[]> {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];
  try {
    const response = await fetch(
      `${url}/rest/v1/seo_keyword_proposals?status=eq.approved&select=keyword&order=score.desc&limit=200`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        cache: "no-store"
      }
    );
    if (!response.ok) return [];
    const rows = (await response.json()) as { keyword: string }[];
    return rows.map((r) => r.keyword);
  } catch {
    return [];
  }
}
