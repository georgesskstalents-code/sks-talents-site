import ExternalLinkGrid from "@/components/ExternalLinkGrid";
import PageHero from "@/components/PageHero";
import ResourceLogo from "@/components/ResourceLogo";
import { ResourceItem, schools } from "@/data/resources";
import { getNotionSiteContentList, mapNotionEntryToResourceItem } from "@/lib/notion";
import Link from "next/link";

export const dynamic = "force-dynamic";

function mergeSchoolItem(staticItem: (typeof schools)[number] | undefined, notionItem?: ReturnType<typeof mapNotionEntryToResourceItem>) {
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
    !notionItem.logoUrl || notionItem.logoUrl.includes("logo.clearbit.com");

  return {
    ...staticItem,
    ...notionItem,
    logoUrl: shouldPreferStaticLogo ? staticItem.logoUrl : notionItem.logoUrl
  };
}

const faqItems = [
  {
    question: "Pourquoi publier des pages écoles sur un site de recrutement ?",
    answer:
      "Parce que les écoles, universités et centres de formation sont des signaux de viviers. Elles aident à capter les recherches liées aux débouchés, aux parcours et aux bassins de talents."
  },
  {
    question: "Ces écoles couvrent-elles uniquement les biotechnologies ?",
    answer:
      "Non. La cartographie couvre aussi diagnostic, medtech, cosmétique, agro-industrie, ingénierie verte et santé animale."
  },
  {
    question: "Comment utiliser cette page en tant qu’entreprise ?",
    answer:
      "Elle permet d’identifier des bassins de formation, de nourrir une stratégie campus et de relier les métiers visés à des écosystèmes académiques pertinents."
  }
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
};

export default async function SchoolsPage() {
  let notionSchools: Awaited<ReturnType<typeof getNotionSiteContentList>> = [];

  try {
    notionSchools = await getNotionSiteContentList("school", 200);
  } catch (error) {
    console.error("Schools page: failed to load Notion schools, using local fallback.", error);
  }

  const notionSchoolMap = new Map(
    notionSchools.map(mapNotionEntryToResourceItem).map((item) => [item.slug, item])
  );

  const mergedSchools = [
    ...schools.map((item) => mergeSchoolItem(item, notionSchoolMap.get(item.slug))),
    ...Array.from(notionSchoolMap.entries())
      .filter(([slug]) => !schools.some((item) => item.slug === slug))
      .map(([, item]) => item)
  ].filter((item): item is ResourceItem => Boolean(item));

  const veterinarySchools = mergedSchools.filter((item) =>
    ["enva", "envt", "oniris", "vetagro-sup", "unilasalle-rouen-veterinaire"].includes(item.slug)
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        kicker="Écoles spécialisées"
        title="Cartographier les viviers de talents des Life Sciences et de l’Animal Health."
        description="Chaque page école devient un point d’entrée SEO pour capter les recherches liées aux parcours, formations, bassins de talents et débouchés sectoriels."
        variant="sand"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Ressources", href: "/resources" },
          { label: "Écoles spécialisées" }
        ]}
      />
      <section className="container-shell grid gap-6 py-4 lg:grid-cols-2">
        <a
          href="https://www.svtsup.fr/ecoles-ingenieurs-et-debouches/ecoles-ingenieurs-biotechnologies/"
          target="_blank"
          rel="noreferrer noopener"
          className="card-surface block p-6 transition hover:-translate-y-1"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">Source écosystème</p>
          <h2 className="mt-3 font-display text-3xl text-brand-ink">SVTSUP · écoles d’ingénieurs en biotechnologies</h2>
          <p className="mt-4 text-sm leading-7 text-brand-stone">
            Une base utile pour enrichir le maillage écoles, croiser les débouchés biotech et faire émerger
            des pages plus précises sur les viviers étudiants et jeunes diplômés.
          </p>
        </a>
        <a
          href="https://www.universite-paris-saclay.fr/en/about/about-universite-paris-saclay"
          target="_blank"
          rel="noreferrer noopener"
          className="card-surface block p-6 transition hover:-translate-y-1"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">Source institutionnelle</p>
          <h2 className="mt-3 font-display text-3xl text-brand-ink">Université Paris-Saclay</h2>
          <p className="mt-4 text-sm leading-7 text-brand-stone">
            Référence académique à fort signal scientifique, utile pour structurer des pages écoles,
            des contenus orientation et des ponts vers les métiers biotech, data et medtech.
          </p>
        </a>
      </section>
      <section className="container-shell py-4">
        <div className="card-surface p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
            Écoles vétérinaires en France
          </p>
          <h2 className="mt-3 font-display text-4xl text-brand-ink">
            5 établissements forment des vétérinaires en France.
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-brand-stone">
            L’Ordre national des vétérinaires rappelle que cinq établissements de l’enseignement
            supérieur en France forment des vétérinaires : quatre écoles publiques (ENVF) et une
            école privée. Cette page relie ces écoles officielles aux recherches d’orientation, aux
            débouchés et aux viviers de talents en santé animale.
          </p>
          <a
            href="https://www.veterinaire.fr/la-profession-veterinaire/devenir-veterinaire/les-ecoles"
            target="_blank"
            rel="noreferrer noopener"
            className="mt-5 inline-flex text-sm font-semibold text-brand-teal"
          >
            Source officielle · Ordre national des vétérinaires
          </a>
        </div>
      </section>
      <section className="container-shell py-4">
        <ExternalLinkGrid
          items={veterinarySchools.map((item) => ({
            name: item.title,
            href: item.href ?? "/schools",
            summary: item.summary,
            meta: `${item.sector} · ${item.location ?? "France"}`,
            logoUrl: item.logoUrl ?? ""
          }))}
        />
      </section>
      <section className="container-shell grid gap-6 py-8 md:grid-cols-2 xl:grid-cols-3">
        {mergedSchools.map((item) => (
          <Link
            key={item.slug}
            href={`/schools/${item.slug}`}
            className="card-surface block p-6 transition hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <ResourceLogo name={item.title} logoUrl={item.logoUrl} />
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
                  {`${item.sector} · ${item.location}`}
                </p>
                <h3 className="mt-3 font-display text-3xl text-brand-ink">{item.title}</h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-brand-stone">{item.summary}</p>
            <p className="mt-4 text-sm font-semibold text-brand-teal">Voir la page école</p>
          </Link>
        ))}
      </section>
      <section className="container-shell grid gap-6 py-4 md:grid-cols-3">
        {[
          [
            "Écoles & orientation",
            "Captez les recherches lycée, post-bac, master et reconversion autour des débouchés biotech, medtech, cosmétique et santé animale."
          ],
          [
            "Pipelines talents",
            "Reliez chaque école aux fiches métiers, aux secteurs visés, aux bassins de talents et aux entreprises qui recrutent."
          ],
          [
            "Pages de référence",
            "Mettez à jour régulièrement les programmes, localisations, spécialités et ponts vers les fonctions pénuriques pour garder un signal frais."
          ],
          [
            "Métiers animaliers",
            "Créez aussi des pages dédiées aux écoles des métiers animaliers pour capter les recherches autour des parcours auxiliaire vétérinaire, soigneur animalier, éleveur, toilettage ou comportement animal."
          ]
        ].map(([title, copy]) => (
          <div key={title} className="card-surface p-8">
            <h2 className="font-display text-3xl text-brand-ink">{title}</h2>
            <p className="mt-4 text-sm leading-7 text-brand-stone">{copy}</p>
          </div>
        ))}
      </section>
      <section className="container-shell grid gap-4 py-4">
        {faqItems.map((item) => (
          <div key={item.question} className="card-surface p-6">
            <h2 className="font-display text-3xl text-brand-ink">{item.question}</h2>
            <p className="mt-3 text-sm leading-7 text-brand-stone">{item.answer}</p>
          </div>
        ))}
      </section>
    </>
  );
}
