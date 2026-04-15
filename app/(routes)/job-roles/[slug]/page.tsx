import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { findJobRoleBySlug, getRelatedJobRoles, jobRoles } from "@/data/jobRoles";
import { getNotionSiteContentBySlug } from "@/lib/notion";

export const dynamic = "force-dynamic";

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

  const effectiveRole = role
    ? {
        ...role,
        title: notionRole?.title || role.title,
        salary: notionRole?.salaryRange || role.salary,
        summary: notionRole?.excerpt || role.summary,
        sector: notionRole?.vertical || role.sector,
        category: notionRole?.category || role.category,
        studies: notionRole?.studies
          ? notionRole.studies.split("·").map((item) => item.trim()).filter(Boolean)
          : role.studies,
        schools: notionRole?.schools
          ? notionRole.schools.split("·").map((item) => item.trim()).filter(Boolean)
          : role.schools,
        relatedIndustries: notionRole?.industries
          ? notionRole.industries.split("·").map((item) => item.trim()).filter(Boolean)
          : role.relatedIndustries
      }
    : null;

  if (!effectiveRole && notionRole) {
    notFound();
  }

  const resolvedRole = effectiveRole!;
  const relatedRoles = getRelatedJobRoles(resolvedRole.slug, resolvedRole.sector);

  return (
    <>
      <PageHero
        kicker={`${resolvedRole.sector} · ${resolvedRole.category} · ${resolvedRole.salary}`}
        title={resolvedRole.title}
        description={resolvedRole.summary}
      />
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
          <div className="card-surface p-8">
            <h2 className="font-display text-3xl">Parcours fréquent</h2>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-brand-stone">
              {resolvedRole.path.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
          <div className="card-surface p-8">
            <h2 className="font-display text-3xl">Etudes recommandees</h2>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-brand-stone">
              {resolvedRole.studies.map((study) => (
                <li key={study}>{study}</li>
              ))}
            </ul>
          </div>
          <div className="card-surface p-8">
            <h2 className="font-display text-3xl">Ecoles et viviers possibles</h2>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-brand-stone">
              {resolvedRole.schools.map((school) => (
                <li key={school}>{school}</li>
              ))}
            </ul>
          </div>
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
    </>
  );
}
