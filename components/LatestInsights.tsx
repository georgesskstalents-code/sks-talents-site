import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getNotionSiteContentList } from "@/lib/notion";
import { articles } from "@/data/articles";

type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  vertical?: string;
  date?: string;
};

async function fetchInsights(limit = 3): Promise<Insight[]> {
  try {
    const notionEntries = await getNotionSiteContentList("article", limit);
    if (notionEntries.length > 0) {
      return notionEntries.slice(0, limit).map((entry) => ({
        slug: entry.slug,
        title: entry.title,
        excerpt: entry.excerpt || entry.metaDescription || "",
        vertical: entry.vertical || undefined,
        date: entry.publishDate || undefined
      }));
    }
  } catch {
    // Silent fallback — Notion unreachable, use static articles
  }

  return articles.slice(0, limit).map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    vertical: article.vertical,
    date: article.date
  }));
}

export default async function LatestInsights() {
  const insights = await fetchInsights(3);
  if (insights.length === 0) return null;

  return (
    <section className="container-shell py-10">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-3">
          <p className="eyebrow">Derniers insights</p>
          <h2 className="font-display text-4xl leading-[1.05] text-brand-ink sm:text-5xl">
            Lecture marché — articles récents
          </h2>
          <p className="max-w-2xl text-base leading-8 text-brand-stone">
            Insights, fiches métiers et signaux marché pour comprendre, calibrer et décider avant de
            recruter.
          </p>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-brand-teal/20 bg-white px-5 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
        >
          Voir tous les articles
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {insights.map((insight) => (
          <Link
            key={insight.slug}
            href={`/blog/${insight.slug}`}
            className="card-luxe panel-lift group flex h-full flex-col p-6 transition"
          >
            {insight.vertical ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-teal">
                {insight.vertical}
              </p>
            ) : null}
            <h3 className="mt-3 font-display text-2xl leading-[1.2] text-brand-ink group-hover:text-brand-teal">
              {insight.title}
            </h3>
            {insight.excerpt ? (
              <p className="mt-4 line-clamp-3 text-sm leading-7 text-brand-stone">
                {insight.excerpt}
              </p>
            ) : null}
            <div className="mt-auto flex items-center justify-between pt-6">
              {insight.date ? (
                <p className="text-xs text-brand-stone/70">
                  {new Date(insight.date).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                  })}
                </p>
              ) : <span />}
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-teal transition group-hover:gap-2">
                Lire <ArrowUpRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
