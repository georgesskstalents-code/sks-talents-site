import { notFound } from "next/navigation";
import ContentPageSignature from "@/components/ContentPageSignature";
import PageHero from "@/components/PageHero";
import ResourceLogo from "@/components/ResourceLogo";
import { schools } from "@/data/resources";
import { getNotionSiteContentBySlug, mapNotionEntryToResourceItem } from "@/lib/notion";

export const dynamic = "force-dynamic";

function mergeSchoolItem(
  staticItem: (typeof schools)[number] | undefined,
  notionItem?: ReturnType<typeof mapNotionEntryToResourceItem>
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
    !notionItem.logoUrl || notionItem.logoUrl.includes("logo.clearbit.com");

  return {
    ...staticItem,
    ...notionItem,
    logoUrl: shouldPreferStaticLogo ? staticItem.logoUrl : notionItem.logoUrl
  };
}

export default async function SchoolDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const staticItem = schools.find((entry) => entry.slug === slug);
  let notionItem = null;

  try {
    notionItem = await getNotionSiteContentBySlug(slug, "school");
  } catch (error) {
    console.error(`School detail page: failed to load Notion school for slug "${slug}".`, error);
  }

  const item = mergeSchoolItem(
    staticItem,
    notionItem ? mapNotionEntryToResourceItem(notionItem) : undefined
  );

  if (!item) {
    notFound();
  }

  const isVeterinarySchool = ["enva", "envt", "oniris", "vetagro-sup", "unilasalle-rouen-veterinaire"].includes(
    item.slug
  );

  return (
    <>
      <PageHero
        kicker={`${item.sector} · ${item.location}`}
        title={item.title}
        description={item.summary}
      />
      <section className="container-shell py-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card-surface p-8">
            <h2 className="font-display text-3xl">Pourquoi cette école intéresse nos clients</h2>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              {item.title} alimente des viviers utiles pour les organisations qui recrutent sur des
              fonctions scientifiques, qualité, réglementaires, médicales ou business à forte
              technicité.
            </p>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              Cette page peut détailler les spécialisations les plus pertinentes, les stages,
              alternances et premiers postes qui alimentent la chaîne de talents du secteur.
            </p>
          </div>
          <div className="card-surface p-8">
            <h2 className="font-display text-3xl">Profils souvent suivis</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-brand-stone">
              <li>Jeunes diplômés ou profils à 2-5 ans d’expérience en sortie d’écosystème école.</li>
              <li>Talents orientés R&D, qualité, affaires réglementaires ou opérations selon la spécialité.</li>
              <li>Profils business ou hybrides lorsque l’école nourrit aussi des parcours management.</li>
            </ul>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 inline-flex items-center rounded-full border border-brand-teal/20 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint/50"
              >
                Visiter le site officiel
              </a>
            ) : null}
          </div>
        </div>
      </section>
      {isVeterinarySchool ? (
        <section className="container-shell py-4">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="card-surface flex items-center justify-center p-8">
              <ResourceLogo
                name={item.title}
                logoUrl={item.logoUrl}
                className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-[28px] border border-brand-line bg-white p-4"
                imageClassName="max-h-full max-w-full object-contain"
                badgeClassName="flex h-full w-full items-center justify-center rounded-[22px] bg-brand-mint px-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal"
              />
            </div>
            <div className="card-surface p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Source officielle
              </p>
              <h2 className="mt-3 font-display text-3xl text-brand-ink">
                Une des cinq écoles qui forment des vétérinaires en France
              </h2>
              <p className="mt-4 text-base leading-8 text-brand-stone">
                L’Ordre national des vétérinaires précise que cinq établissements de l’enseignement
                supérieur en France forment des vétérinaires : quatre écoles publiques et une école
                privée. Cette page relie l’école, le vivier de talents, les parcours étudiants et les
                débouchés business ou cliniques en santé animale.
              </p>
              <a
                href="https://www.veterinaire.fr/la-profession-veterinaire/devenir-veterinaire/les-ecoles"
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 inline-flex items-center rounded-full border border-brand-teal/20 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint/50"
              >
                Voir la source de l’Ordre
              </a>
            </div>
          </div>
        </section>
      ) : null}
      <ContentPageSignature description="Page école éditée par SKS TALENTS pour relier viviers, parcours, métiers et besoins de recrutement dans les secteurs scientifiques, vétérinaires et techniques." />
    </>
  );
}
