import { articles } from "@/data/articles";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 3600;

const SITE_URL = "https://www.skstalents.fr";
const SITE_TITLE = "SKS TALENTS - Executive Search Life Sciences & Santé animale";
const SITE_DESC =
  "Insights, signaux marché et fiches métiers pour CEO, COO, CPO et DRH en biotech, diagnostic, vétérinaire et petfood. Cabinet d'executive search SKS Talents.";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * RSS 2.0 feed for new articles. Picked up by Google News, LLM crawlers
 * (OpenAI, Anthropic, Perplexity, Google AI Overviews) and feed readers.
 *
 * Only the 50 latest articles with substantial content are exposed.
 */
export function GET() {
  const items = articles
    .filter((a) => a.content.length > 500 && a.excerpt.length > 80)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 50);

  const lastBuildDate = items[0]?.date ? new Date(items[0].date).toUTCString() : new Date().toUTCString();

  const itemsXml = items
    .map((a) => {
      const url = `${SITE_URL}/blog/${a.slug}`;
      const pubDate = new Date(a.date).toUTCString();
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>noreply@skstalents.fr (${escapeXml(a.author || "SKS Talents")})</author>
      <category>${escapeXml(a.vertical || "Life Sciences")}</category>
      <description>${escapeXml(a.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESC)}</description>
    <language>fr-FR</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <generator>Next.js</generator>
${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600"
    }
  });
}
