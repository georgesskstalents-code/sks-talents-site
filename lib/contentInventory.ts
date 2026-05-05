/**
 * Content inventory & KPIs — gives the CEO a single source of truth
 * on what's published, what's missing, and what was added recently.
 *
 * Reads:
 *  - Static TS files (data/jobRoles.ts, data/articles.ts, data/references.ts)
 *  - Notion DB "Website Content SKS Talents" (filtered by Status=Published)
 *
 * Pure read-only. Safe to call from server components, cron and digest emails.
 */

import { jobRoles } from "@/data/jobRoles";
import { articles } from "@/data/articles";
import { references } from "@/data/references";
import { getNotionSiteContentList } from "@/lib/notion";

export type ContentType =
  | "job_role"
  | "article"
  | "reference"
  | "school"
  | "event"
  | "study"
  | "news"
  | "investment_fund"
  | "comparison"
  | "page";

export type ContentGap = {
  type: ContentType;
  slug: string;
  title: string;
  missing: string[]; // human-readable list of missing fields
};

export type ContentTypeKPI = {
  type: ContentType;
  label: string;
  total: number;
  fromNotion: number;
  fromStatic: number;
  publishedLast7d: number;
  publishedLast30d: number;
  gaps: number;
  publicPath: string;
};

export type ContentInventory = {
  generatedAt: string;
  totalEntries: number;
  totalNotion: number;
  totalStatic: number;
  byType: ContentTypeKPI[];
  recentlyPublished: Array<{
    type: ContentType;
    title: string;
    slug: string;
    publishDate: string;
    source: "notion" | "static";
  }>;
  contentGaps: ContentGap[];
};

const CONTENT_TYPE_META: Record<ContentType, { label: string; publicPath: string }> = {
  job_role: { label: "Fiches métiers", publicPath: "/job-roles" },
  article: { label: "Articles blog", publicPath: "/blog" },
  reference: { label: "Références clients", publicPath: "/references" },
  school: { label: "Écoles", publicPath: "/schools" },
  event: { label: "Événements", publicPath: "/events" },
  study: { label: "Études", publicPath: "/studies" },
  news: { label: "News", publicPath: "/news" },
  investment_fund: { label: "Fonds d'investissement", publicPath: "/investment-funds" },
  comparison: { label: "Comparatifs", publicPath: "/comparatifs" },
  page: { label: "Pages génériques", publicPath: "/" }
};

function dayMs(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

function isWithin(dateString: string, sinceMs: number): boolean {
  if (!dateString) return false;
  const t = new Date(dateString).getTime();
  if (Number.isNaN(t)) return false;
  return t >= sinceMs;
}

export async function buildContentInventory(): Promise<ContentInventory> {
  const now = Date.now();
  const since7d = now - dayMs(7);
  const since30d = now - dayMs(30);

  // ----- Notion side: query all Published entries across types
  // We do this once for "all" then group, instead of N requests per type.
  const notionByType = new Map<ContentType, Array<{ slug: string; title: string; publishDate: string }>>();
  const types: ContentType[] = [
    "job_role",
    "article",
    "reference",
    "school",
    "event",
    "study",
    "news",
    "investment_fund",
    "comparison",
    "page"
  ];
  await Promise.all(
    types.map(async (t) => {
      try {
        const entries = await getNotionSiteContentList(t, 200);
        notionByType.set(
          t,
          entries.map((e) => ({
            slug: e.slug,
            title: e.title,
            publishDate: e.publishDate
          }))
        );
      } catch {
        notionByType.set(t, []);
      }
    })
  );

  // ----- Static side: only types we currently maintain in TS data files
  const staticByType: Record<ContentType, Array<{ slug: string; title: string; publishDate: string }>> = {
    job_role: jobRoles.map((r) => ({
      slug: r.slug,
      title: r.title,
      publishDate: r.publishDate ?? ""
    })),
    article: articles.map((a) => ({ slug: a.slug, title: a.title, publishDate: a.date })),
    reference: references.map((r) => ({ slug: r.slug, title: r.company, publishDate: "" })),
    school: [],
    event: [],
    study: [],
    news: [],
    investment_fund: [],
    comparison: [],
    page: []
  };

  // ----- Compute KPIs per type (dedupe by slug, Notion wins over static)
  const byType: ContentTypeKPI[] = types.map((type) => {
    const notionEntries = notionByType.get(type) ?? [];
    const staticEntries = staticByType[type];
    const seenSlugs = new Set<string>();
    let fromNotion = 0;
    let fromStatic = 0;
    let publishedLast7d = 0;
    let publishedLast30d = 0;

    for (const e of notionEntries) {
      if (e.slug && !seenSlugs.has(e.slug)) {
        seenSlugs.add(e.slug);
        fromNotion += 1;
        if (isWithin(e.publishDate, since7d)) publishedLast7d += 1;
        if (isWithin(e.publishDate, since30d)) publishedLast30d += 1;
      }
    }
    for (const e of staticEntries) {
      if (e.slug && !seenSlugs.has(e.slug)) {
        seenSlugs.add(e.slug);
        fromStatic += 1;
        if (isWithin(e.publishDate, since7d)) publishedLast7d += 1;
        if (isWithin(e.publishDate, since30d)) publishedLast30d += 1;
      }
    }

    return {
      type,
      label: CONTENT_TYPE_META[type].label,
      total: fromNotion + fromStatic,
      fromNotion,
      fromStatic,
      publishedLast7d,
      publishedLast30d,
      gaps: 0, // filled below
      publicPath: CONTENT_TYPE_META[type].publicPath
    };
  });

  // ----- Recently published (across all types, top 12 by date desc)
  const recent: ContentInventory["recentlyPublished"] = [];
  for (const t of types) {
    for (const e of notionByType.get(t) ?? []) {
      if (e.publishDate) recent.push({ type: t, title: e.title, slug: e.slug, publishDate: e.publishDate, source: "notion" });
    }
    for (const e of staticByType[t]) {
      if (e.publishDate) recent.push({ type: t, title: e.title, slug: e.slug, publishDate: e.publishDate, source: "static" });
    }
  }
  recent.sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));

  // ----- Content gaps: Notion entries missing critical fields
  const gaps: ContentGap[] = [];
  for (const t of types) {
    try {
      const entries = await getNotionSiteContentList(t, 200);
      for (const e of entries) {
        const missing: string[] = [];
        if (!e.title) missing.push("Title");
        if (!e.slug) missing.push("Slug");
        if (!e.excerpt) missing.push("Excerpt");
        if (!e.vertical) missing.push("Vertical");
        if (t === "job_role" && !e.salaryRange) missing.push("Salary Range");
        if (missing.length > 0) {
          gaps.push({
            type: t,
            slug: e.slug || "(no-slug)",
            title: e.title || "(no-title)",
            missing
          });
        }
      }
    } catch {
      // Notion read failed for this type — skip
    }
  }

  for (const k of byType) {
    k.gaps = gaps.filter((g) => g.type === k.type).length;
  }

  return {
    generatedAt: new Date().toISOString(),
    totalEntries: byType.reduce((sum, k) => sum + k.total, 0),
    totalNotion: byType.reduce((sum, k) => sum + k.fromNotion, 0),
    totalStatic: byType.reduce((sum, k) => sum + k.fromStatic, 0),
    byType,
    recentlyPublished: recent.slice(0, 12),
    contentGaps: gaps.slice(0, 30)
  };
}
