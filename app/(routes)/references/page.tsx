import PageHero from "@/components/PageHero";
import ReferenceMarquee from "@/components/ReferenceMarquee";
import ReferenceGrid from "@/components/ReferenceGrid";
import { Reference, references } from "@/data/references";
import { getNotionSiteContentList, mapNotionEntryToReference } from "@/lib/notion";

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
        title="Ils nous ont fait confiance."
        description="Des fondateurs biotech, des cofondateurs vétérinaires, des CODIR petfood et des labos de diagnostic. Tous partagent une exigence : recruter vite, sans renoncer à la qualité."
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Les références" }
        ]}
      />
      <section className="container-shell py-8">
        <ReferenceMarquee items={mergedReferences} />
      </section>
    </>
  );
}
