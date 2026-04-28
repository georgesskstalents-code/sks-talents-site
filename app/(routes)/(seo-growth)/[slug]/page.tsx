import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoGrowthLandingPage from "@/components/SeoGrowthLandingPage";
import { getSeoGrowthPage, seoGrowthPages } from "@/data/seoGrowthPages";

export const dynamicParams = false;

export function generateStaticParams() {
  return seoGrowthPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoGrowthPage(slug);

  if (!page) {
    return {};
  }

  const url = `https://www.skstalents.fr/${page.slug}`;

  return {
    title: `${page.metaTitle} | SKS TALENTS`,
    description: page.metaDescription,
    keywords: [page.primaryKeyword, ...page.secondaryKeywords, ...page.clusterItems],
    alternates: {
      canonical: url
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      siteName: "SKS TALENTS",
      locale: "fr_FR",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription
    }
  };
}

export default async function SeoGrowthPageRoute({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getSeoGrowthPage(slug);

  if (!page) {
    notFound();
  }

  const url = `https://www.skstalents.fr/${page.slug}`;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SKS TALENTS",
    url,
    serviceType: page.title,
    description: page.metaDescription,
    areaServed: ["France", "Paris", "Lyon", "Toulouse", "Bordeaux", "Montpellier", "Marseille"],
    availableLanguage: ["French", "English"],
    knowsAbout: [page.primaryKeyword, ...page.secondaryKeywords, ...page.clusterItems]
  };

  return (
    <>
      <script
        id={`${page.slug}-professionalservice-jsonld`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        id={`${page.slug}-faq-jsonld`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SeoGrowthLandingPage page={page} />
    </>
  );
}
