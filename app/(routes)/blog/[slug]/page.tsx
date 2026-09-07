import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import ArticleBody, { headingId, parseArticle } from "@/components/ArticleBody";
import ContentPageSignature from "@/components/ContentPageSignature";
import EditorialContentLayout, { getEditorialHeroImage } from "@/components/EditorialContentLayout";
import { articles, getArticleVerticalLabel } from "@/data/articles";
import { getNotionSiteContentBySlug } from "@/lib/notion";
import { resolveArticleSlug } from "@/lib/slugRescueRegistry";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

const COVERS_DIR = path.join(process.cwd(), "public", "blog-covers");

/**
 * Retourne l'URL d'une cover PNG generee par scripts/generate_covers.py
 * si le fichier existe dans public/blog-covers/{slug}.png. Sinon null.
 * Cache implicite via fs (rapide).
 */
function getBlogCoverUrl(slug: string): string | null {
  try {
    const file = path.join(COVERS_DIR, `${slug}.png`);
    if (fs.existsSync(file)) {
      return `/blog-covers/${slug}.png`;
    }
    return null;
  } catch {
    return null;
  }
}

function buildHowToSchema(slug: string, title: string, paragraphs: string[], articleUrl: string) {
  if (!slug.startsWith("comment-") && !slug.includes("playbook")) return null;
  const steps: Array<{ name: string; text: string }> = [];
  for (let i = 0; i < paragraphs.length; i++) {
    const p = paragraphs[i];
    if (p.startsWith("## ")) {
      const name = p.slice(3).trim();
      const next = paragraphs[i + 1];
      const text = next && !next.startsWith("##") ? next.slice(0, 280) : name;
      steps.push({ name, text });
    }
  }
  if (steps.length < 3) return null;
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    description: paragraphs[0]?.slice(0, 280) || title,
    inLanguage: "fr-FR",
    url: articleUrl,
    step: steps.map((s, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: s.name,
      text: s.text
    }))
  };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.skstalents.fr";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const notionArticle = await getNotionSiteContentBySlug(slug, "article");
  const article = articles.find((entry) => entry.slug === slug);

  if (!article && !notionArticle) {
    // Slug inconnu : 308 vers l'analyse la plus proche ou 404 utile.
    return { robots: { index: false, follow: true } };
  }

  const coverUrl = getBlogCoverUrl(slug);
  const finalTitle = notionArticle?.seoTitle || notionArticle?.title || article?.title || "";

  // Fallback chain complet pour l'image OG :
  // 1. Cover PNG generee (public/blog-covers/{slug}.png) si presente
  // 2. Image Notion heroImageUrl si presente
  // 3. Image editorial catalog (getEditorialHeroImage) - toujours presente
  let ogImageUrl: string;
  let ogImageAlt: string;
  if (coverUrl) {
    ogImageUrl = `${siteUrl}${coverUrl}`;
    ogImageAlt = `Couverture editoriale : ${finalTitle}`;
  } else if (notionArticle?.heroImageUrl) {
    ogImageUrl = notionArticle.heroImageUrl;
    ogImageAlt = notionArticle.heroImageAlt || notionArticle.title || finalTitle;
  } else {
    const heroFallback = getEditorialHeroImage({
      slug,
      title: finalTitle,
      topicLabel: article?.topic,
      verticalLabel: article ? getArticleVerticalLabel(article.vertical) : undefined
    });
    ogImageUrl = heroFallback.src.startsWith("http")
      ? heroFallback.src
      : `${siteUrl}${heroFallback.src}`;
    ogImageAlt = heroFallback.alt || finalTitle;
  }

  return {
    title: finalTitle,
    description: notionArticle?.metaDescription || notionArticle?.excerpt || article?.excerpt,
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`
    },
    openGraph: {
      title: finalTitle,
      description: notionArticle?.metaDescription || notionArticle?.excerpt || article?.excerpt,
      url: `${siteUrl}/blog/${slug}`,
      type: "article",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 627,
          alt: ogImageAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: notionArticle?.metaDescription || notionArticle?.excerpt || article?.excerpt,
      images: [ogImageUrl]
    }
  };
}

export default async function BlogDetailPage({
  params
}: Props) {
  const { slug } = await params;
  const notionArticle = await getNotionSiteContentBySlug(slug, "article");
  const article = articles.find((entry) => entry.slug === slug);

  if (!article && !notionArticle) {
    // Filet de securite "slug devine" : voir lib/slugRescue.ts.
    const rescue = resolveArticleSlug(slug);
    if (rescue.status === "redirect") {
      permanentRedirect(`/blog/${rescue.slug}`);
    }
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

  // Les titres sont ecrits "Sujet · phrase". Le sujet remonte en surtitre et la
  // phrase devient le titre : le lecteur voit la thematique, puis l'accroche,
  // au lieu d'un bloc unique qui se casse sur quatre lignes.
  // Sommaire cliquable : construit a partir des titres de section reels de
  // l'article, jamais d'une liste ecrite a la main.
  const sections = parseArticle(body)
    .filter((b): b is { kind: "heading"; level: 2 | 3; text: string } => b.kind === "heading" && b.level === 2)
    .map((b, i) => ({ id: headingId(b.text), label: b.text, num: String(i + 1).padStart(2, "0") }));

  const titleParts = title.split(" · ");
  const heroOverline = titleParts.length > 1 ? titleParts[0] : undefined;
  const heroTitle =
    titleParts.length > 1
      ? (() => {
          const rest = titleParts.slice(1).join(" · ");
          return rest.charAt(0).toUpperCase() + rest.slice(1);
        })()
      : title;
  const paragraphs = body.split("\n\n").filter(Boolean);
  const internalLinks = article?.internalLinks ?? [];
  const answerFirst = article?.answerFirst;
  const coverUrl = getBlogCoverUrl(slug);
  const heroVisual = coverUrl
    ? {
        src: coverUrl,
        alt: `Couverture editoriale ${title}`
      }
    : notionArticle?.heroImageUrl
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
  let schemaImageUrl: string;
  if (coverUrl) {
    schemaImageUrl = `${siteUrl}${coverUrl}`;
  } else if (notionArticle?.heroImageUrl) {
    schemaImageUrl = notionArticle.heroImageUrl;
  } else if (heroVisual.src.startsWith("http")) {
    schemaImageUrl = heroVisual.src;
  } else {
    schemaImageUrl = `${siteUrl}${heroVisual.src}`;
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    image: schemaImageUrl,
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

  const howToSchema = buildHowToSchema(slug, title, paragraphs, articleUrl);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: siteUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: articleUrl
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {howToSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      ) : null}
      <EditorialContentLayout
        badge={topicLabel || verticalLabel}
        overline={heroOverline}
        title={heroTitle}
        description={excerpt || kicker}
        imageSrc={heroVisual.src}
        imageAlt={heroVisual.alt}
        variant="typographic"
        sidebar={
          sections.length > 2 ? (
            <nav aria-label="Sommaire de l'article">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-brand-teal">
                Sommaire
              </p>
              <ol className="mt-3 grid list-none gap-2 border-l border-brand-ink/10 p-0">
                {sections.map((section) => (
                  <li key={section.id} className="pl-4 text-sm leading-snug">
                    <a
                      href={`#${section.id}`}
                      className="text-brand-stone transition hover:text-brand-teal"
                    >
                      <span className="font-mono text-[0.7rem] text-brand-teal">{section.num}</span>{" "}
                      {section.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : undefined
        }
        meta={[
          "SKS Talents",
          new Date(publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
          article?.readTime ? `${article.readTime} min de lecture` : ""
        ].filter(Boolean)}
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
          <ArticleBody body={body} keyPrefix={slug} />
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
              <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Méthodologie et sources
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
