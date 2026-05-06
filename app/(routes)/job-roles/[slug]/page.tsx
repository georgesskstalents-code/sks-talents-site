import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPageSignature from "@/components/ContentPageSignature";
import GEOAnswerCard from "@/components/GEOAnswerCard";
import PageHero from "@/components/PageHero";
import { findJobRoleBySlug, getRelatedJobRoles } from "@/data/jobRoles";
import { getJobRoleEducationBundle } from "@/lib/jobRoleEducation";
import { getNotionSiteContentBySlug } from "@/lib/notion";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const role = findJobRoleBySlug(slug);
  const notionRole = await getNotionSiteContentBySlug(slug, "job_role");

  if (!role && !notionRole) {
    return {};
  }

  const canonical = `https://www.skstalents.fr/job-roles/${slug}`;

  return {
    title: notionRole?.seoTitle || notionRole?.title || role?.title,
    description: notionRole?.metaDescription || notionRole?.excerpt || role?.summary,
    alternates: {
      canonical
    }
  };
}

/**
 * Parse a salary range string like "85 - 120 k€" or "120 k€" into numeric
 * percentile10/percentile90 values for the Occupation JSON-LD.
 * Returns null when the string can't be parsed (we then skip estimatedSalary).
 */
function parseSalaryRange(s: string): { min: number; max: number; median: number } | null {
  if (!s) return null;
  const matches = s.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (matches) {
    const min = Number(matches[1]) * 1000;
    const max = Number(matches[2]) * 1000;
    return { min, max, median: Math.round((min + max) / 2) };
  }
  const single = s.match(/(\d+)/);
  if (single) {
    const v = Number(single[1]) * 1000;
    return { min: v, max: v, median: v };
  }
  return null;
}

function buildOccupationJsonLd(role: {
  slug: string;
  title: string;
  category: string;
  sector: string;
  summary: string;
  salary: string;
}) {
  const url = `https://www.skstalents.fr/job-roles/${role.slug}`;
  const salaryParsed = parseSalaryRange(role.salary);
  return {
    "@context": "https://schema.org",
    "@type": "Occupation",
    name: role.title,
    description: role.summary,
    occupationalCategory: role.category,
    industry: role.sector,
    inLanguage: "fr-FR",
    url,
    ...(salaryParsed && {
      estimatedSalary: [
        {
          "@type": "MonetaryAmountDistribution",
          name: "base",
          currency: "EUR",
          duration: "P1Y",
          percentile10: salaryParsed.min,
          percentile90: salaryParsed.max,
          median: salaryParsed.median
        }
      ]
    }),
    educationRequirements: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree"
    }
  };
}

export default async function JobRoleDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = findJobRoleBySlug(slug);
  const notionRole = await getNotionSiteContentBySlug(slug, "job_role");

  if (!role && !notionRole) {
    notFound();
  }

  const splitNotionList = (value: string | undefined) =>
    value ? value.split("·").map((item) => item.trim()).filter(Boolean) : [];

  const effectiveRole = role
    ? {
        ...role,
        title: notionRole?.title || role.title,
        salary: notionRole?.salaryRange || role.salary,
        summary: notionRole?.excerpt || role.summary,
        sector: notionRole?.vertical || role.sector,
        category: notionRole?.category || role.category,
        studies: notionRole?.studies ? splitNotionList(notionRole.studies) : role.studies,
        schools: notionRole?.schools ? splitNotionList(notionRole.schools) : role.schools,
        relatedIndustries: notionRole?.industries
          ? splitNotionList(notionRole.industries)
          : role.relatedIndustries
      }
    : notionRole
      ? // Notion-only fiche: synthesize a JobRole-shaped object with sensible defaults.
        // Empty arrays mean the corresponding sections (skills, missions, etc.) won't render.
        {
          slug: notionRole.slug,
          title: notionRole.title,
          summary: notionRole.excerpt || "",
          salary: notionRole.salaryRange || "Rémunération sur demande",
          sector: notionRole.vertical || "Cross-sector",
          category: notionRole.category || "Fiche métier",
          shortageLevel: "Moderee" as const,
          skills: [] as string[],
          successFactors: [] as string[],
          path: [] as string[],
          missions: [] as string[],
          studies: splitNotionList(notionRole.studies),
          schools: splitNotionList(notionRole.schools),
          relatedIndustries: splitNotionList(notionRole.industries)
        }
      : null;

  const resolvedRole = effectiveRole!;
  const relatedRoles = getRelatedJobRoles(resolvedRole.slug, resolvedRole.sector);
  const educationBundle = getJobRoleEducationBundle(resolvedRole);
  const occupationJsonLd = buildOccupationJsonLd({
    slug: resolvedRole.slug,
    title: resolvedRole.title,
    category: resolvedRole.category,
    sector: resolvedRole.sector,
    summary: resolvedRole.summary,
    salary: resolvedRole.salary
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(occupationJsonLd) }}
      />
      <PageHero
        kicker={`${resolvedRole.sector} · ${resolvedRole.category} · ${resolvedRole.salary}`}
        title={resolvedRole.title}
        description={resolvedRole.summary}
        template="job-role"
      />
      <section className="container-shell py-4">
        <GEOAnswerCard
          title={`${resolvedRole.title} : que faut-il savoir ?`}
          answer={`${resolvedRole.title} est un rôle ${resolvedRole.category.toLowerCase()} suivi par SKS TALENTS dans ${resolvedRole.sector}. Les entreprises le recrutent lorsque la technicité du marché, l’exigence opérationnelle et la pression sur l’exécution rendent un mauvais cadrage coûteux.`}
          bullets={[
            `Fourchette observée : ${resolvedRole.salary}`,
            `Tension marché : ${resolvedRole.shortageLevel}`,
            `Pourquoi le poste existe : ${resolvedRole.summary}`,
            `Secteur principal : ${resolvedRole.sector}`
          ]}
        />
      </section>
      <section className="container-shell py-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card-surface p-8">
            <h2 className="font-display text-3xl">À propos du rôle</h2>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              {resolvedRole.title} joue un rôle structurant sur des organisations où la technicité, la
              qualité d’exécution et la crédibilité marché pèsent directement sur la performance.
            </p>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              Chez SKS TALENTS, ce type de poste demande souvent un cadrage fin entre expertise
              métier, exposition managériale et maturité de l’organisation.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-brand-teal/15 bg-brand-mint px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Tension marche: {resolvedRole.shortageLevel}
              </span>
              <span className="rounded-full border border-brand-teal/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-stone">
                Categorie: {resolvedRole.category}
              </span>
            </div>
          </div>
          {resolvedRole.successFactors.length > 0 && (
            <div className="card-surface p-8">
              <h2 className="font-display text-3xl">Pourquoi les entreprises recrutent ce rôle</h2>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-brand-stone">
                {resolvedRole.successFactors.slice(0, 4).map((item) => (
                  <li key={item} className="rounded-2xl bg-brand-mint/35 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="card-surface p-8">
            <h2 className="font-display text-3xl">Repères de rémunération</h2>
            <p className="mt-4 text-base leading-8 text-brand-stone">{resolvedRole.salary}</p>
            <p className="mt-4 text-sm leading-7 text-brand-stone">
              Le package final dépend du scope, de la localisation, du niveau de pénurie et du
              degré d’exposition stratégique du poste.
            </p>
            {resolvedRole.salarySource ? (
              <p className="mt-4 text-sm leading-7 text-brand-stone">{resolvedRole.salarySource}</p>
            ) : null}
            {resolvedRole.sources?.length ? (
              <div className="mt-5 flex flex-wrap gap-3">
                {resolvedRole.sources.map((source) => (
                  <a
                    key={`${resolvedRole.slug}-${source.url}`}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-full border border-brand-teal/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal transition hover:bg-brand-mint"
                  >
                    Source: {source.name}
                  </a>
                ))}
              </div>
            ) : null}
            <Link
              href="/calcul-salaire-brut-net"
              className="mt-6 inline-flex rounded-full border border-brand-teal/20 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
            >
              Convertir un brut en net
            </Link>
          </div>
          {resolvedRole.missions.length > 0 && (
            <div className="card-surface p-8">
              <h2 className="font-display text-3xl">Missions frequentes</h2>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-brand-stone">
                {resolvedRole.missions.map((mission) => (
                  <li key={mission} className="rounded-2xl bg-white px-4 py-3 shadow-soft">
                    {mission}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {resolvedRole.skills.length > 0 && (
            <div className="card-surface p-8">
              <h2 className="font-display text-3xl">Compétences clés</h2>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-brand-stone">
                {resolvedRole.skills.map((skill) => (
                  <li key={skill} className="rounded-2xl bg-brand-mint/80 px-4 py-3">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {resolvedRole.successFactors.length > 0 && (
            <div className="card-surface p-8">
              <h2 className="font-display text-3xl">Ce qu'il faut pour exceller</h2>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-brand-stone">
                {resolvedRole.successFactors.map((item) => (
                  <li key={item} className="rounded-2xl bg-white px-4 py-3 shadow-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {resolvedRole.path.length > 0 && (
            <div className="card-surface p-8">
              <h2 className="font-display text-3xl">Parcours fréquent</h2>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-brand-stone">
                {resolvedRole.path.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="card-surface p-8">
            <h2 className="font-display text-3xl">Etudes recommandees</h2>
            <p className="mt-4 text-sm leading-7 text-brand-stone">
              Nous relions chaque parcours recommandé à des viviers déjà présents dans la base
              écoles SKS TALENTS, puis au site officiel de l’établissement quand il est connu.
            </p>
            <div className="mt-6 space-y-4">
              {educationBundle.recommendations.map((entry) => (
                <article
                  key={`${resolvedRole.slug}-${entry.study}`}
                  className="rounded-[28px] border border-brand-teal/12 bg-white px-5 py-5 shadow-soft"
                >
                  <h3 className="text-lg font-semibold text-brand-ink">{entry.study}</h3>
                  <p className="mt-2 text-sm leading-7 text-brand-stone">{entry.sourceLabel}</p>
                  {entry.programs.length ? (
                    <div className="mt-4 grid gap-3">
                      {entry.programs.map((program) => (
                        <a
                          key={`${entry.study}-${program.programUrl}`}
                          href={program.programUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="rounded-2xl border border-brand-teal/12 bg-white px-4 py-4 shadow-soft transition hover:-translate-y-0.5"
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal">
                            {program.schoolTitle}
                          </p>
                          <p className="mt-2 text-sm font-semibold text-brand-ink">
                            {program.programTitle}
                          </p>
                          <p className="mt-2 text-xs text-brand-stone">
                            Ouvrir la formation officielle
                          </p>
                        </a>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-3">
                    {entry.schools.map((school) => (
                      <div
                        key={`${entry.study}-${school.slug}`}
                        className="rounded-2xl border border-brand-teal/12 bg-brand-mint/45 px-4 py-3"
                      >
                        <Link
                          href={`/schools/${school.slug}`}
                          className="text-sm font-semibold text-brand-ink transition hover:text-brand-teal"
                        >
                          {school.title}
                        </Link>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-brand-teal">
                          {school.location || school.sector}
                        </p>
                        {school.href ? (
                          <a
                            href={school.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="mt-2 inline-flex text-xs font-semibold text-brand-teal transition hover:underline"
                          >
                            Source officielle
                          </a>
                        ) : (
                          <p className="mt-2 text-xs text-brand-stone">
                            Source officielle à compléter, école déjà documentée dans notre base.
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-6 rounded-[28px] border border-brand-teal/12 bg-brand-mint/35 px-5 py-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Méthode de sourcing
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-brand-stone">
                {educationBundle.methodology.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card-surface p-8">
            <h2 className="font-display text-3xl">Ecoles et viviers possibles</h2>
            <p className="mt-4 text-sm leading-7 text-brand-stone">
              Ces viviers sont les plus cohérents avec le rôle, le secteur et les parcours
              recommandés de la fiche.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {educationBundle.schoolPool.map((school) => (
                <article
                  key={`${resolvedRole.slug}-${school.slug}`}
                  className="rounded-[28px] border border-brand-teal/12 bg-white px-5 py-5 shadow-soft"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/schools/${school.slug}`}
                        className="text-base font-semibold text-brand-ink transition hover:text-brand-teal"
                      >
                        {school.title}
                      </Link>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-brand-teal">
                        {school.sector} {school.location ? `· ${school.location}` : ""}
                      </p>
                    </div>
                    <span className="rounded-full border border-brand-teal/16 bg-brand-mint px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-teal">
                      {school.matchType === "explicit"
                        ? "Cité dans la fiche"
                        : school.matchType === "study"
                          ? "Rapproché de l'étude"
                          : "Cohérent avec le secteur"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-brand-stone">{school.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={`/schools/${school.slug}`}
                      className="rounded-full border border-brand-teal/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal transition hover:bg-brand-mint"
                    >
                      Voir la fiche école
                    </Link>
                    {school.href ? (
                      <a
                        href={school.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="rounded-full border border-brand-teal/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal transition hover:bg-brand-mint"
                      >
                        Site officiel
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
          {resolvedRole.relatedIndustries.length > 0 && (
            <div className="card-surface p-8 lg:col-span-2">
              <h2 className="font-display text-3xl">Industries connexes</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-brand-stone">
                Ce role peut aussi exister dans des secteurs voisins lorsque les enjeux techniques,
                réglementaires, qualité, service ou industrialisation se ressemblent.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {resolvedRole.relatedIndustries.map((industry) => (
                  <span
                    key={industry}
                    className="rounded-full border border-brand-teal/15 bg-white px-4 py-2 text-sm font-semibold text-brand-stone"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="card-surface p-8 lg:col-span-2">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <h2 className="font-display text-3xl">Et maintenant ?</h2>
                <p className="mt-4 text-base leading-8 text-brand-stone">
                  Si vous recrutez ce type de profil, nous pouvons cadrer la mission, estimer le
                  niveau de penurie et proposer un plan d'approche adapte a votre marche.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contact#rappel"
                    className="inline-flex rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Demander un rappel
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex rounded-full border border-brand-teal/20 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
                  >
                    Voir nos services
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="font-display text-3xl">Fiches proches</h3>
                <div className="mt-4 grid gap-3">
                  {relatedRoles.map((entry) => (
                    <Link
                      key={entry.slug}
                      href={`/job-roles/${entry.slug}`}
                      className="rounded-2xl border border-brand-teal/10 bg-white px-4 py-4 text-sm font-semibold text-brand-ink transition hover:-translate-y-0.5"
                    >
                      {entry.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContentPageSignature description="Fiche métier SKS TALENTS pour aider entreprises, candidats et décideurs à cadrer missions, rémunération, compétences clés et signaux de tension du marché." />
    </>
  );
}
