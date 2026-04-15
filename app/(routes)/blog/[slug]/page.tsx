import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { articles, getArticleVerticalLabel } from "@/data/articles";
import { getNotionSiteContentBySlug } from "@/lib/notion";

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const notionArticle = await getNotionSiteContentBySlug(slug, "article");
  const article = articles.find((entry) => entry.slug === slug);

  if (!article && !notionArticle) {
    notFound();
  }

  const title = notionArticle?.title || article?.title || "";
  const excerpt = notionArticle?.excerpt || article?.excerpt || "";
  const body = notionArticle?.mainContent || article?.content || "";
  const sources =
    notionArticle?.sourceName && notionArticle?.sourceUrl
      ? [{ name: notionArticle.sourceName, url: notionArticle.sourceUrl }]
      : (article?.sources ?? []);
  const kicker = article
    ? `${article.persona.join(", ")} · ${getArticleVerticalLabel(article.vertical)} · ${article.readTime} min`
    : notionArticle?.vertical || "SKS TALENTS";

  return (
    <>
      <PageHero
        kicker={kicker}
        title={title}
        description={excerpt}
      />
      <article className="container-shell py-8">
        <div className="card-surface max-w-4xl p-8 sm:p-10">
          <div className="space-y-6 text-base leading-8 text-brand-stone">
            {body.split("\n\n").map((paragraph, index) => (
              <p key={`${slug}-${index}`}>{paragraph}</p>
            ))}
            {sources.length ? (
              <div className="rounded-[24px] border border-brand-teal/10 bg-brand-mint/35 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  Sources
                </p>
                <div className="mt-4 grid gap-3">
                  {sources.map((source) => (
                    <a
                      key={source.url}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sm font-semibold text-brand-teal transition hover:opacity-80"
                    >
                      {source.name}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </article>
    </>
  );
}
