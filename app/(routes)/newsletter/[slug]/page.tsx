import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPageSignature from "@/components/ContentPageSignature";
import EditorialContentLayout, { getEditorialHeroImage } from "@/components/EditorialContentLayout";
import { newsletterCadence } from "@/data/newsletter";
import { getNotionSiteContentBySlug } from "@/lib/notion";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.skstalents.fr";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const newsletterEntry = await getNotionSiteContentBySlug(slug, "newsletter");

  if (!newsletterEntry) {
    return {};
  }

  return {
    title: newsletterEntry.seoTitle || newsletterEntry.title,
    description: newsletterEntry.metaDescription || newsletterEntry.excerpt,
    openGraph: newsletterEntry.heroImageUrl
      ? {
          images: [
            {
              url: newsletterEntry.heroImageUrl,
              alt: newsletterEntry.heroImageAlt || newsletterEntry.title
            }
          ]
        }
      : undefined
  };
}

export default async function NewsletterDetailPage({ params }: Props) {
  const { slug } = await params;
  const newsletterEntry = await getNotionSiteContentBySlug(slug, "newsletter");

  if (!newsletterEntry) {
    notFound();
  }

  const title = newsletterEntry.title;
  const excerpt = newsletterEntry.excerpt || newsletterEntry.metaDescription;
  const body = newsletterEntry.mainContent || newsletterEntry.excerpt || "";
  const paragraphs = body.split("\n\n").filter(Boolean);
  const newsletterUrl = `${siteUrl}/newsletter/${slug}`;
  const heroVisual = newsletterEntry.heroImageUrl
    ? {
        src: newsletterEntry.heroImageUrl,
        alt: newsletterEntry.heroImageAlt || `Illustration pour ${title}`
      }
    : getEditorialHeroImage({
        slug,
        title,
        topicLabel: newsletterEntry.category,
        verticalLabel: newsletterEntry.vertical
      });

  const newsletterSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    inLanguage: "fr-FR",
    mainEntityOfPage: newsletterUrl,
    datePublished: newsletterEntry.publishDate || new Date().toISOString().slice(0, 10),
    dateModified: newsletterEntry.publishDate || new Date().toISOString().slice(0, 10),
    articleSection: newsletterEntry.vertical || newsletterEntry.category || "Newsletter",
    author: {
      "@type": "Organization",
      name: "SKS TALENTS"
    },
    publisher: {
      "@type": "Organization",
      name: "SKS TALENTS",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/brand/logo-sks-talents.svg`
      }
    },
    url: newsletterUrl
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsletterSchema) }}
      />
      <EditorialContentLayout
        badge={newsletterEntry.vertical || "Newsletter"}
        title={title}
        description={excerpt || "Edition newsletter SKS TALENTS"}
        imageSrc={heroVisual.src}
        imageAlt={heroVisual.alt}
      >
        <div className="space-y-6 text-base leading-8 text-brand-stone">
          <div className="rounded-[22px] border border-brand-teal/12 bg-white/80 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Repere d'edition
            </p>
            <p className="mt-3 text-sm leading-7 text-brand-stone">
              {newsletterEntry.publishDate || "Edition SKS TALENTS"}
            </p>
            <p className="mt-2 text-sm leading-7 text-brand-stone">
              {newsletterCadence.schedule} · {newsletterCadence.readTime}
            </p>
          </div>

          {paragraphs.map((paragraph, index) => (
            <p
              key={`${slug}-${index}`}
              className={index === 0 ? "text-lg leading-9 text-brand-ink" : undefined}
            >
              {paragraph}
            </p>
          ))}

          {newsletterEntry.sourceName && newsletterEntry.sourceUrl ? (
            <div className="rounded-[24px] border border-brand-teal/10 bg-brand-mint/35 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Source officielle
              </p>
              <a
                href={newsletterEntry.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex text-sm font-semibold text-brand-teal transition hover:opacity-80"
              >
                {newsletterEntry.sourceName}
              </a>
            </div>
          ) : null}
        </div>
      </EditorialContentLayout>
      <ContentPageSignature description="Edition newsletter SKS TALENTS publiee apres edition et validation Notion, pour relier signaux marche, talents, ecosysteme et decisions dirigeantes." />
    </>
  );
}
