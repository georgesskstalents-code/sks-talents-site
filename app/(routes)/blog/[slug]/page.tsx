import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContentPageSignature from "@/components/ContentPageSignature";
import EditorialContentLayout, { getEditorialHeroImage } from "@/components/EditorialContentLayout";
import { articles, getArticleVerticalLabel } from "@/data/articles";
import { getNotionSiteContentBySlug } from "@/lib/notion";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

function renderInlineMarkdown(text: string, keyPrefix: string) {
  const parts: Array<string | { href: string; label: string }> = [];
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push({ label: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  if (parts.length === 1 && typeof parts[0] === "string") {
    return text;
  }
  return parts.map((part, idx) =>
    typeof part === "string" ? (
      <span key={`${keyPrefix}-t-${idx}`}>{part}</span>
    ) : part.href.startsWith("/") ? (
      <Link
        key={`${keyPrefix}-l-${idx}`}
        href={part.href}
        className="font-semibold text-brand-teal underline decoration-brand-teal/30 underline-offset-2 hover:decoration-brand-teal"
      >
        {part.label}
      </Link>
    ) : (
      <a
        key={`${keyPrefix}-l-${idx}`}
        href={part.href}
        target="_blank"
        rel="noreferrer noopener"
        className="font-semibold text-brand-teal underline decoration-brand-teal/30 underline-offset-2 hover:decoration-brand-teal"
      >
        {part.label}
      </a>
    )
  );
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.skstalents.fr";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const notionArticle = await getNotionSiteContentBySlug(slug, "article");
  const article = articles.find((entry) => entry.slug === slug);

  if (!article && !notionArticle) {
    return {};
  }

  return {
    title: notionArticle?.seoTitle || notionArticle?.title || article?.title,
    description: notionArticle?.metaDescription || notionArticle?.excerpt || article?.excerpt,
    openGraph: notionArticle?.heroImageUrl
      ? {
          images: [
            {
              url: notionArticle.heroImageUrl,
              alt: notionArticle.heroImageAlt || notionArticle.title
            }
          ]
        }
      : undefined
  };
}

export default async function BlogDetailPage({
  params
}: Props) {
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
  const verticalLabel = article
    ? getArticleVerticalLabel(article.vertical)
    : notionArticle?.vertical || "SKS TALENTS";
  const topicLabel = article?.topic || "market";
  const audienceLabel = article?.persona.join(", ") || "CEO, COO, CPO, DRH";
  const publishedAt = notionArticle?.publishDate || article?.date || new Date().toISOString().slice(0, 10);
  const articleUrl = `${siteUrl}/blog/${slug}`;
  const paragraphs = body.split("\n\n").filter(Boolean);
  const internalLinks = article?.internalLinks ?? [];
  const answerFirst = article?.answerFirst;
  const heroVisual = notionArticle?.heroImageUrl
    ? {
        src: notionArticle.heroImageUrl,
        alt: notionArticle.heroImageAlt || `Illustration pour ${title}`
      }
    : getEditorialHeroImage({
        slug,
        title,
        topicLabel,
        verticalLabel
      });
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    inLanguage: "fr-FR",
    mainEntityOfPage: articleUrl,
    datePublished: publishedAt,
    dateModified: publishedAt,
    articleSection: verticalLabel,
    author: {
      "@type": "Organization",
      name: article?.author || "SKS TALENTS"
    },
    publisher: {
      "@type": "Organization",
      name: "SKS TALENTS",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/brand/logo-sks-talents.svg`
      }
    },
    about: [
      verticalLabel,
      topicLabel,
      "recrutement",
      "Life Sciences",
      "Animal Health"
    ],
    url: articleUrl
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <EditorialContentLayout
        badge={verticalLabel}
        title={title}
        description={excerpt || kicker}
        imageSrc={heroVisual.src}
        imageAlt={heroVisual.alt}
      >
        <div className="space-y-6 text-base leading-8 text-brand-stone">
          <div className="rounded-[22px] border border-brand-teal/12 bg-white/80 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Repères
            </p>
            <p className="mt-3 text-sm leading-7 text-brand-stone">{audienceLabel}</p>
            <p className="mt-2 text-sm leading-7 text-brand-stone">{kicker}</p>
          </div>
          {answerFirst ? (
            <div className="rounded-[22px] border border-brand-teal/20 bg-brand-mint/30 p-6">
              <p className="text-base leading-8 text-brand-ink">{answerFirst}</p>
            </div>
          ) : null}
          {paragraphs.map((paragraph, index) => (
            <p
              key={`${slug}-${index}`}
              className={index === 0 ? "text-lg leading-9 text-brand-ink" : undefined}
            >
              {renderInlineMarkdown(paragraph, `${slug}-${index}`)}
            </p>
          ))}
          {internalLinks.length ? (
            <div className="rounded-[24px] border border-brand-teal/10 bg-white/85 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Liens internes utiles
              </p>
              <div className="mt-4 grid gap-3">
                {internalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-semibold text-brand-teal transition hover:opacity-80"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
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
      </EditorialContentLayout>
      <ContentPageSignature description="Article édité par SKS TALENTS pour aider dirigeants, DRH et équipes opérationnelles à lire les marchés, les talents et les signaux utiles à la prise de décision." />
    </>
  );
}
