import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import PageHero from "@/components/PageHero";
import { jobRoleCategories, jobRoleSectors, jobRoles } from "@/data/jobRoles";
import { getNotionSiteContentList } from "@/lib/notion";

export const dynamic = "force-dynamic";

export default async function JobRolesPage() {
  const notionJobRoles = await getNotionSiteContentList("job_role", 200);
  const listingRoles = Array.from(
    new Map(
      [
        ...jobRoles.map((role) => ({
          slug: role.slug,
          title: role.title,
          summary: role.summary,
          sector: role.sector,
          salary: role.salary
        })),
        ...notionJobRoles.map((entry) => ({
          slug: entry.slug,
          title: entry.title,
          summary: entry.excerpt,
          sector: entry.vertical || "Cross-sector",
          salary: entry.salaryRange || "Rémunération sur demande"
        }))
      ].map((role) => [role.slug, role])
    ).values()
  );

  return (
    <>
      <PageHero
        kicker="Fiches métiers"
        title="Une bibliotheque metiers orientee trafic, penurie et decision."
        description="Chaque fiche rassemble missions, salaire, etudes, ecoles, industries connexes, niveaux de tension marche et contexte Seed / Série A / Série B pour capter les recherches Google et les moteurs IA."
      />
      <section className="container-shell pb-2">
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="card-surface p-6">
            <p className="eyebrow">Couverture</p>
            <h2 className="font-display text-3xl text-brand-ink">
              De la R&D a la commercialisation, jusqu'a l'IA et la cyber.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-brand-stone">
              Le cluster couvre des roles strategiques et operationnels pour biotech, diagnostic,
              cosmetique, medical vet, veterinary et petfood: application, maintenance, middleware,
              ventes, export EMEA et Afrique, business unit, COO, CEO, CFO, qualite, supply et
              customer service. L’objectif est aussi de couvrir les recherches liées aux entreprises
              en Seed, Série A, Série B, scale-up et hypercroissance.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {jobRoleSectors.map((sector) => (
                <span
                  key={sector}
                  className="rounded-full border border-brand-teal/15 bg-brand-mint px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal"
                >
                  {sector}
                </span>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {jobRoleCategories.slice(0, 8).map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-brand-teal/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-stone"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
          <div className="card-surface p-6">
            <p className="eyebrow">Outil candidat</p>
            <h2 className="font-display text-3xl text-brand-ink">Calculer un salaire brut en net</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-brand-stone">
              Avant de comparer plusieurs opportunites, estimez rapidement votre net mensuel, annuel
              et apres impots avec notre simulateur.
            </p>
            <Link
              href="/calcul-salaire-brut-net"
              className="mt-5 inline-flex rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Ouvrir le calculateur
            </Link>
            <Link
              href="/salary-benchmarks"
              className="mt-3 inline-flex rounded-full border border-brand-teal/20 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
            >
              Voir les benchmarks salaires
            </Link>
          </div>
        </div>
      </section>
      <section className="container-shell pb-2">
        <div className="card-surface p-6">
          <p className="eyebrow">Bibliotheque SEO</p>
          <p className="max-w-4xl text-sm leading-7 text-brand-stone">
            Objectif: devenir une reference utile sur les metiers penuriques des Life Sciences et de
            la sante animale, avec des fiches qui repondent a la fois aux candidats, aux recruteurs
            et aux moteurs conversationnels. Les meilleures pages relient ensuite le role a son
            industrie, a ses salaires, a ses ecoles, a ses debouches et au stade de croissance de
            l'entreprise.
          </p>
        </div>
      </section>
      <section className="container-shell grid gap-6 py-8 md:grid-cols-2 xl:grid-cols-3">
        {listingRoles.map((role) => (
          <ListingCard
            key={role.slug}
            href={`/job-roles/${role.slug}`}
            title={role.title}
            description={role.summary}
            meta={`${role.sector} · ${role.salary}`}
          />
        ))}
      </section>
    </>
  );
}
