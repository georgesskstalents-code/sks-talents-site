/**
 * SEO indexing helpers - IndexNow protocol (Bing, Yandex, Seznam, etc.)
 *
 * IndexNow is the 2026-standard for instant URL submission.
 * Google deprecated the legacy /ping endpoint in 2023 ; we now rely on
 * (a) up-to-date `lastmod` in the sitemap (already automatic) and
 * (b) Search Console API (needs OAuth - handled separately).
 *
 * Reference: https://www.indexnow.org/documentation
 */

const INDEXNOW_KEY = "179543a23c24b98e45dc176379b20224";
const SITE_HOST = "www.skstalents.fr";
const SITE_URL = `https://${SITE_HOST}`;

export type IndexingResult = {
  ok: boolean;
  endpoint: string;
  status?: number;
  error?: string;
  urlsSubmitted: number;
};

/**
 * Submit a batch of URLs to IndexNow. Up to 10 000 URLs per call.
 * Verified by Bing fetching `${SITE_URL}/${INDEXNOW_KEY}.txt` (already in /public).
 */
export async function submitToIndexNow(urls: string[]): Promise<IndexingResult> {
  if (!urls.length) {
    return { ok: true, endpoint: "indexnow", urlsSubmitted: 0 };
  }

  // Normalize: keep only same-host URLs.
  const normalized = urls
    .map((u) => (u.startsWith("http") ? u : `${SITE_URL}${u.startsWith("/") ? "" : "/"}${u}`))
    .filter((u) => u.startsWith(SITE_URL));

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: normalized
      }),
      cache: "no-store"
    });

    return {
      ok: response.ok,
      endpoint: "indexnow",
      status: response.status,
      urlsSubmitted: normalized.length
    };
  } catch (error) {
    return {
      ok: false,
      endpoint: "indexnow",
      error: error instanceof Error ? error.message : "unknown",
      urlsSubmitted: normalized.length
    };
  }
}

/**
 * Submit a single URL to IndexNow via GET (simpler for the dashboard).
 */
export async function submitSingleUrlToIndexNow(url: string): Promise<IndexingResult> {
  return submitToIndexNow([url]);
}

/**
 * Fetch the current sitemap and submit all URLs to IndexNow.
 * Used by the daily cron to keep Bing/Yandex/Seznam fresh.
 */
export async function submitFullSitemapToIndexNow(): Promise<IndexingResult> {
  try {
    const response = await fetch(`${SITE_URL}/sitemap.xml`, { cache: "no-store" });
    if (!response.ok) {
      return { ok: false, endpoint: "indexnow", error: `sitemap fetch ${response.status}`, urlsSubmitted: 0 };
    }
    const xml = await response.text();
    const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
    return submitToIndexNow(urls);
  } catch (error) {
    return {
      ok: false,
      endpoint: "indexnow",
      error: error instanceof Error ? error.message : "unknown",
      urlsSubmitted: 0
    };
  }
}
