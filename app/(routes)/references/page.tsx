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

  return (
    <>
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
          <FAQSection eyebrow="FAQ" title={faqsByPage["references"].title} description={faqsByPage["references"].description} items={faqsByPage["references"].items} />
    </>
  );
}
