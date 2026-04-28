import { getArticleVerticalLabel, type Article } from "@/data/articles";
import ArticleFlyerCard from "@/components/ArticleFlyerCard";

type Props = {
  articles: Article[];
  resourceStats: Array<{ label: string; value: string }>;
};

export default function ResourceHub({ articles, resourceStats }: Props) {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="card-surface self-start p-8">
        <h3 className="font-display text-3xl">La machine éditoriale SKS TALENTS</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {resourceStats.map((stat) => (
            <div key={stat.label} className="rounded-3xl bg-brand-mint/80 p-5">
              <p className="font-display text-4xl text-brand-teal">{stat.value}</p>
              <p className="mt-2 text-sm text-brand-stone">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-[28px] border border-brand-teal/12 bg-white/82 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
            Cadence éditoriale
          </p>
          <p className="mt-3 text-sm leading-7 text-brand-stone">
            Une logique simple : publier des contenus utiles, capter les signaux de marché, puis
            transformer les sujets qui tirent en conversations, leads et offres.
          </p>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {articles.map((article) => (
          <ArticleFlyerCard
            key={article.slug}
            href={`/blog/${article.slug}`}
            title={article.title}
            description={article.excerpt}
            audienceLabel={article.persona.join(", ")}
            verticalLabel={getArticleVerticalLabel(article.vertical)}
            topicLabel={article.topic}
            variant="compact"
          />
        ))}
      </div>
    </div>
  );
}
