import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "References clients SKS Talents : 100+ placements biotech, medtech, veterinaire",
  description:
    "Placements cadres executes pour scale-ups biotech Series A-C, diagnostic IVD, medtech, groupements veterinaires et petfood premium. 75 % de retention a 5 ans. References marche par SKS TALENTS.",
  alternates: { canonical: "/references" },
  openGraph: {
    title: "References clients SKS Talents : 100+ placements Life Sciences et Animal Health",
    description:
      "Placements cadres biotech Series A-C, diagnostic IVD, medtech, veterinaire, petfood. 75 % retention 5 ans.",
    url: "https://www.skstalents.fr/references",
    type: "website"
  }
};

import PageHero from "@/components/PageHero";
import ReferenceCardMarquee from "@/components/ReferenceCardMarquee";
import SectionShell from "@/components/SectionShell";
import TrustpilotWidget from "@/components/TrustpilotWidget";
import { Reference, references } from "@/data/references";
import { getNotionSiteContentList, mapNotionEntryToReference } from "@/lib/notion";
import FAQSection from "@/components/FAQSection";
import { faqsByPage } from "@/data/faqsByPage";

export const dynamic = "force-dynamic";

function mergeReference(
  staticItem: (typeof references)[number] | undefined,
  notionItem?: ReturnType<typeof mapNotionEntryToReference>
) {
  if (!staticItem && !notionItem) {
    return undefined;
  }

  if (!staticItem) {
    return notionItem;
  }

  if (!notionItem) {
    return staticItem;
  }

  const shouldPreferStaticLogo =
    !notionItem.logoPath || notionItem.logoPath.includes("logo.clearbit.com");

  return {
    ...staticItem,
    ...notionItem,
    logoPath: shouldPreferStaticLogo ? staticItem.logoPath : notionItem.logoPath
  };
}

export default async function ReferencesPage() {
  const notionReferences = await getNotionSiteContentList("reference", 200);
  const notionReferenceMap = new Map(
    notionReferences.map(mapNotionEntryToReference).map((item) => [item.slug, item])
  );
  const mergedReferences = [
    ...references.map((item) => mergeReference(item, notionReferenceMap.get(item.slug))),
    ...Array.from(notionReferenceMap.entries())
      .filter(([slug]) => !references.some((item) => item.slug === slug))
      .map(([, item]) => item)
  ].filter((item): item is Reference => Boolean(item));

  // Build Review JSON-LD from real client references (aggregate + individual reviews)
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SKS TALENTS",
    url: "https://www.skstalents.fr",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      bestRating: "5",
      worstRating: "1",
      reviewCount: 17
    },
    review: mergedReferences.slice(0, 8).map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5"
      },
      author: { "@type": "Organization", name: r.company },
      reviewBody: r.impact || r.summary,
      itemReviewed: {
        "@type": "Service",
        name: `Executive search ${r.category}`,
        provider: { "@type": "Organization", name: "SKS TALENTS" }
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <PageHero
        kicker="Les références"
        title="Ils nous font confiance."
        description="Fondateurs et équipes dirigeantes en biotech, deeptech et santé animale. Même exigence : recruter juste, sans compromis sur la croissance."
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Les références" }
        ]}
      />
      <section className="container-shell py-8">
        <ReferenceCardMarquee items={mergedReferences} />
      </section>
      <SectionShell
        eyebrow="Preuve externe"
        title="4,6/5 sur Trustpilot, 17 avis vérifiés"
        description="Les avis publics Trustpilot complètent nos références clients : la preuve sociale externe rassure avant la prise de contact."
      >
        <TrustpilotWidget />
      </SectionShell>
          <FAQSection eyebrow="FAQ" title={faqsByPage["references"].title} description={faqsByPage["references"].description} items={faqsByPage["references"].items} />
    </>
  );
}
