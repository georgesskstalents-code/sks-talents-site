/**
 * Synchronisation Notion <-> Supabase pour les 3 flows LinkedIn :
 *  - KPIs Weekly  : Notion DB -> Supabase linkedin_kpis_weekly
 *  - Veille       : Source HTTP -> Notion + Supabase linkedin_veille
 *  - Posts Queue  : LLM -> Notion DB Queue Validation
 */

import {
  queryDatabase,
  createPage,
  readTitle,
  readRichText,
  readNumber,
  readDate,
  readUrl,
  readSelect,
  readRelation
} from "./notionClient";

const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function supabaseHeaders() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Supabase env missing");
  }
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json"
  };
}

// ---------- KPIs Weekly : Notion -> Supabase ----------

export async function syncKpisWeekly(): Promise<{ inserted: number; skipped: number; errors: string[] }> {
  const dbId = process.env.NOTION_DB_KPIS_WEEKLY;
  if (!dbId) return { inserted: 0, skipped: 0, errors: ["NOTION_DB_KPIS_WEEKLY missing"] };
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return { inserted: 0, skipped: 0, errors: ["Supabase env missing"] };
  }

  // Recupere les 4 dernieres semaines (idempotence : on re-upserte)
  const pages = await queryDatabase(dbId, {
    pageSize: 8,
    sorts: [{ property: "Date début", direction: "descending" }]
  });

  const rows = pages
    .map((p) => {
      const props = p.properties;
      const weekStart = readDate(props["Date début"]);
      if (!weekStart) return null;

      return {
        week_label: readTitle(props["Semaine"]),
        week_start: weekStart,
        profile_followers: readNumber(props["Followers perso"]),
        profile_followers_delta: readNumber(props["Δ followers perso"]),
        page_followers: readNumber(props["Followers page"]),
        page_followers_delta: readNumber(props["Δ followers page"]),
        profile_impressions: readNumber(props["Impressions perso"]),
        profile_engagement_rate: readNumber(props["Engagement rate perso %"]),
        profile_posts_published: readNumber(props["Posts perso publiés"]),
        page_posts_published: readNumber(props["Posts page publiés"]),
        dms_qualified: readNumber(props["DMs entrants qualifiés"]),
        calendly_bookings: readNumber(props["RDV Calendly bookés"]),
        insight_key: readRichText(props["Insight clé"]),
        recommendation_next_week: readRichText(props["Reco S+1"]),
        top_post_url: readRelation(props["Top post de la semaine"])[0] ?? null,
        notion_page_id: p.id,
        synced_at: new Date().toISOString()
      };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  if (rows.length === 0) {
    return { inserted: 0, skipped: 0, errors: ["No valid KPIs rows in Notion"] };
  }

  // Upsert on week_start unique constraint
  const response = await fetch(`${SUPABASE_URL}/rest/v1/linkedin_kpis_weekly?on_conflict=week_start`, {
    method: "POST",
    headers: { ...supabaseHeaders(), Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(rows),
    cache: "no-store"
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    return { inserted: 0, skipped: rows.length, errors: [`Supabase ${response.status}: ${text.slice(0, 200)}`] };
  }
  return { inserted: rows.length, skipped: 0, errors: [] };
}

// ---------- Veille : HTTP -> Notion + Supabase ----------

const VEILLE_SOURCES = [
  { id: "france-biotech", url: "https://www.france-biotech.fr/feed/" },
  { id: "afvac", url: "https://www.afvac.com/feed/" },
  { id: "lepointveterinaire", url: "https://www.lepointveterinaire.fr/rss.xml" },
  { id: "veterinaire", url: "https://www.veterinaire.fr/feed" },
  { id: "lehub-bpifrance", url: "https://lehub.bpifrance.fr/feed/" },
  { id: "biotech-finances", url: "https://www.biotech-finances.com/feed/" }
];

type ParsedItem = { title: string; url: string; summary: string; pubDate: string | null };

async function fetchRss(url: string): Promise<ParsedItem[]> {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "SKSTalents-Veille/1.0 (+https://www.skstalents.fr)" },
      cache: "no-store",
      signal: AbortSignal.timeout(15000)
    });
    if (!response.ok) return [];
    const xml = await response.text();
    // Parse minimaliste : extraction <item>...<title>X</title><link>Y</link><pubDate>Z</pubDate><description>...</description></item>
    const items: ParsedItem[] = [];
    const itemRegex = /<item[\s\S]*?<\/item>/gi;
    const matches = xml.match(itemRegex) ?? [];
    for (const m of matches.slice(0, 8)) {
      const title = (m.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i)?.[1] ?? "").trim();
      const link = (m.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i)?.[1] ?? "").trim();
      const pub = (m.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] ?? "").trim();
      const desc = (m.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i)?.[1] ?? "")
        .replace(/<[^>]+>/g, "")
        .trim()
        .slice(0, 600);
      if (title && link) {
        items.push({
          title,
          url: link,
          summary: desc,
          pubDate: pub ? new Date(pub).toISOString().slice(0, 10) : null
        });
      }
    }
    return items;
  } catch {
    return [];
  }
}

export async function syncVeille(): Promise<{ scanned: number; new: number; errors: string[] }> {
  const errors: string[] = [];

  // 1) Scan toutes les sources en parallele
  const allItems: Array<ParsedItem & { source: string }> = [];
  for (const src of VEILLE_SOURCES) {
    const items = await fetchRss(src.url);
    for (const it of items) {
      allItems.push({ ...it, source: src.id });
    }
  }

  if (allItems.length === 0) {
    return { scanned: 0, new: 0, errors: ["No items fetched from any RSS source"] };
  }

  // 2) Filtrer pour ne garder que les nouveaux (URL pas deja dans Supabase)
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return { scanned: allItems.length, new: 0, errors: ["Supabase env missing - cannot dedupe"] };
  }

  const urls = allItems.map((i) => i.url);
  const checkRes = await fetch(
    `${SUPABASE_URL}/rest/v1/linkedin_veille?url=in.(${urls.map((u) => `"${encodeURIComponent(u)}"`).join(",")})&select=url`,
    { headers: supabaseHeaders(), cache: "no-store" }
  ).catch(() => null);

  let existingUrls = new Set<string>();
  if (checkRes && checkRes.ok) {
    const rows = (await checkRes.json()) as Array<{ url: string }>;
    existingUrls = new Set(rows.map((r) => r.url));
  }

  const newItems = allItems.filter((i) => !existingUrls.has(i.url));

  if (newItems.length === 0) {
    return { scanned: allItems.length, new: 0, errors };
  }

  // 3) Insert dans Supabase
  const rows = newItems.map((i) => ({
    title: i.title,
    url: i.url,
    summary: i.summary,
    source: i.source,
    category: null,
    relevance: "moyenne",
    status: "nouveau",
    published_at: i.pubDate
  }));

  const supabaseRes = await fetch(`${SUPABASE_URL}/rest/v1/linkedin_veille?on_conflict=url`, {
    method: "POST",
    headers: { ...supabaseHeaders(), Prefer: "resolution=ignore-duplicates,return=minimal" },
    body: JSON.stringify(rows),
    cache: "no-store"
  });
  if (!supabaseRes.ok) {
    const text = await supabaseRes.text().catch(() => "");
    errors.push(`Supabase insert ${supabaseRes.status}: ${text.slice(0, 200)}`);
  }

  // 4) Mirror dans Notion DB Veille (best effort)
  const notionDbId = process.env.NOTION_DB_VEILLE;
  if (notionDbId) {
    for (const i of newItems.slice(0, 10)) {
      try {
        await createPage(notionDbId, {
          "Titre actu": { type: "title", value: i.title },
          "URL article": { type: "url", value: i.url },
          "Résumé 3 lignes": { type: "rich_text", value: i.summary },
          "Source": { type: "select", value: i.source }
        });
      } catch (err) {
        errors.push(`Notion create veille: ${err instanceof Error ? err.message : String(err)}`);
        break; // stop after first error to avoid quota burn
      }
    }
  }

  return { scanned: allItems.length, new: newItems.length, errors };
}
