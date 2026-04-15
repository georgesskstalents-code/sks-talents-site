import Link from "next/link";
import { getArticleVerticalLabel, type Article } from "@/data/articles";

type Props = {
  articles: Article[];
  resourceStats: Array<{ label: string; value: string }>;
};

export default function ResourceHub({ articles, resourceStats }: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="card-surface p-8">
        <h3 className="font-display text-3xl">La machine éditoriale SKS TALENTS</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {resourceStats.map((stat) => (
            <div key={stat.label} className="rounded-3xl bg-brand-mint/80 p-5">
              <p className="font-display text-4xl text-brand-teal">{stat.value}</p>
              <p className="mt-2 text-sm text-brand-stone">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="card-surface block p-6 transition hover:-translate-y-1"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
              {article.persona.join(", ")} · {getArticleVerticalLabel(article.vertical)}
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-brand-ink">{article.title}</h3>
            <p className="mt-3 text-sm leading-7 text-brand-stone">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
