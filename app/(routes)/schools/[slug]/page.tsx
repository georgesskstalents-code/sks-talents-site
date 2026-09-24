import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import ContentPageSignature from "@/components/ContentPageSignature";
import PageHero from "@/components/PageHero";
import ResourceLogo from "@/components/ResourceLogo";
import { schools } from "@/data/resources";
import { getNotionSiteContentBySlug, mapNotionEntryToResourceItem } from "@/lib/notion";
import { resolveSchoolSlug } from "@/lib/slugRescueRegistry";
import { getJobRolesForSchool, getOfficialProgramsForSchool } from "@/lib/schoolJobRoles";

const ANIMAL_HEALTH_SECTORS = ["Animal Health", "Medical Vet", "Petfood", "Vet Services"];
const LIFE_SCIENCES_SECTORS = ["Life Sciences", "Biotech", "Diagnostic", "MedTech", "Médecine nucléaire"];

function sectorPillar(sector?: string): { href: string; label: string } | null {
  if (!sector) return null;
  if (ANIMAL_HEALTH_SECTORS.includes(sector)) {
    return { href: "/animal-health", label: "Recrutement en santé animale" };
  }
  if (LIFE_SCIENCES_SECTORS.includes(sector)) {
    return { href: "/life-sciences", label: "Recrutement en Life Sciences" };
  }
  return null;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = schools.find((entry) => entry.slug === slug);
  if (!item) {
    // Ecole issue de Notion uniquement ou slug inconnu : la page gere elle-meme
    // redirection et 404, on garde les metadonnees par defaut.
    return {};
  }

  const place =
    item.location && !item.title.includes(item.location.split(/[ ,/]/)[0]) ? ` (${item.location})` : "";
  const title = `${item.title}${place} : formations et débouchés`;
  const description = `${item.summary} Formations, métiers visés et viviers de recrutement en ${item.sector}, par SKS TALENTS.`;
  const canonical = `https://www.skstalents.fr/schools/${item.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", siteName: "SKS TALENTS" }
  };
}

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
    // Filet de securite "slug devine" : voir lib/slugRescue.ts.
    const rescue = resolveSchoolSlug(slug);
    if (rescue.status === "redirect") {
      permanentRedirect(`/schools/${rescue.slug}`);
    }
    notFound();
  }

  const relatedRoles = getJobRolesForSchool(item.slug);
  const officialPrograms = getOfficialProgramsForSchool(item.slug);
  const pillar = sectorPillar(item.sector);

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
              {item.summary}
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
      {officialPrograms.length || relatedRoles.length ? (
        <section className="container-shell py-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {officialPrograms.length ? (
              <div className="card-surface p-8">
                <h2 className="font-display text-3xl">Formations suivies</h2>
                <p className="mt-4 text-sm leading-7 text-brand-stone">
                  Programmes de l’établissement que nous rapprochons de nos fiches métiers. Liens
                  vers les pages officielles.
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-7">
                  {officialPrograms.map((program) => (
                    <li key={program.url}>
                      <a
                        href={program.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="font-semibold text-brand-teal hover:underline"
                      >
                        {program.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {relatedRoles.length ? (
              <div className="card-surface p-8">
                <h2 className="font-display text-3xl">Métiers alimentés par cette école</h2>
                <p className="mt-4 text-sm leading-7 text-brand-stone">
                  Fiches métiers pour lesquelles {item.title} fait partie des viviers de
                  recrutement : missions, compétences et fourchettes de rémunération.
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-7">
                  {relatedRoles.map((role) => (
                    <li key={role.slug}>
                      <Link
                        href={`/job-roles/${role.slug}`}
                        className="font-semibold text-brand-teal hover:underline"
                      >
                        {role.title}
                      </Link>
                      <span className="text-brand-stone"> · {role.sector}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
      <section className="container-shell py-4">
        <div className="card-surface flex flex-wrap gap-3 p-6 text-sm">
          <Link href="/schools" className="rounded-full border border-brand-line px-4 py-2 hover:bg-brand-mint/50">
            Toutes les écoles
          </Link>
          <Link href="/job-roles" className="rounded-full border border-brand-line px-4 py-2 hover:bg-brand-mint/50">
            Fiches métiers
          </Link>
          <Link href="/salary-benchmarks" className="rounded-full border border-brand-line px-4 py-2 hover:bg-brand-mint/50">
            Benchmarks salaires
          </Link>
          {pillar ? (
            <Link href={pillar.href} className="rounded-full border border-brand-line px-4 py-2 hover:bg-brand-mint/50">
              {pillar.label}
            </Link>
          ) : null}
        </div>
      </section>
      <ContentPageSignature description="Page école éditée par SKS TALENTS pour relier viviers, parcours, métiers et besoins de recrutement dans les secteurs scientifiques, vétérinaires et techniques." />
    </>
  );
}
