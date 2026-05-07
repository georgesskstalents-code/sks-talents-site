import type { Metadata } from "next";
import Link from "next/link";
import GEOAnswerCard from "@/components/GEOAnswerCard";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import { jobRoles } from "@/data/jobRoles";

export const metadata: Metadata = {
  title: "Benchmarks salaires",
  description:
    "Benchmarks salaires SKS TALENTS par métier et secteur pour Life Sciences, diagnostic, medtech, santé animale, veterinary et petfood, avec un angle Seed, Série A et Série B."
};

export default function SalaryBenchmarksPage() {
  const highlightedRoles = jobRoles.slice(0, 18);
  const glassdoorBatchSlugs = [
    "diagnostic-tender-excellence-director",
    "medical-vet-channel-marketing-manager",
    "medical-vet-distributor-excellence-manager",
    "diagnostic-customer-experience-director",
    "diagnostic-service-operations-director",
    "biotech-revenue-operations-manager",
    "diagnostic-bid-manager-international",
    "biotech-strategic-partnerships-manager",
    "diagnostic-after-sales-director",
    "medical-vet-commercial-training-manager"
  ];
  const glassdoorBatch = glassdoorBatchSlugs
    .map((slug) => jobRoles.find((role) => role.slug === slug))
    .filter((role): role is NonNullable<(typeof jobRoles)[number]> => Boolean(role));

  return (
    <>
      <PageHero
        kicker="Benchmarks salaires"
        title="Des repères salariaux pensés pour la longue traîne métier."
        description="Cette page est conçue pour relier les recherches salaire aux fiches métiers, aux comparatifs et au calculateur brut/net, avec un angle utile sur les écarts entre structures établies, Seed, Série A et Série B."
        variant="sand"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Benchmarks salaires" }
        ]}
      />
      <section className="container-shell py-4">
        <GEOAnswerCard
          title="Benchmarks salaires Life Sciences & Animal Health : à quoi sert cette page ?"
          answer="Cette page aide à relier les recherches salaire aux vrais métiers, aux secteurs, aux stades de croissance et aux décisions de recrutement. Elle sert autant aux candidats qui veulent se situer qu’aux dirigeants et DRH qui veulent calibrer une offre ou lire la tension du marché."
          bullets={[
            "Repères par métier, secteur et catégorie de poste",
            "Angles France, EMEA et contextes Seed / Série A / Série B quand le rôle le justifie",
            "Passerelles vers fiches métiers, comparatifs et calculateur brut/net",
            "Sources affichées pour éviter les généralisations abusives"
          ]}
        />
      </section>
      <SectionShell
        eyebrow="Question fréquente"
        title="Pourquoi consulter un benchmark salaire en 2026 ?"
        description="Les requêtes liées aux salaires sont très récurrentes, très concrètes et souvent proches d’une décision candidat ou recruteur, surtout quand une entreprise passe en Seed, Série A ou Série B."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Candidat", "Comparer un rôle, un secteur ou une trajectoire de carrière."],
            ["Entreprise", "Positionner une offre et comprendre la tension du marché selon le stade Seed, Série A, Série B ou scale-up."],
            ["SEO", "Créer des passerelles entre salaire, métier, école, marché, financement et conversion."]
          ].map(([title, copy]) => (
            <div key={title} className="card-surface p-8">
              <h2 className="font-display text-3xl text-brand-ink">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{copy}</p>
            </div>
          ))}
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Question fréquente"
        title="Comment lire un benchmark salaire sans surinterpréter les chiffres ?"
        description="Pour devenir une page de référence, ce hub relie chaque requête salaire à un rôle, une industrie, un contexte géographique et un stade de maturité d’entreprise."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Par rôle", "Application specialist, export manager, DRH, CEO, COO, CFO, field service, regulatory, supply et fonctions IA/cyber."],
            ["Par industrie", "Biotech, diagnostic, medtech, santé animale, groupements de cliniques, cosmétique et petfood premium."],
            ["Par contexte", "France, EMEA, Afrique francophone, mais aussi Seed, Série A, Série B et scale-up quand la fonction l’exige."]
          ].map(([title, copy]) => (
            <div key={title} className="card-surface p-8">
              <h2 className="font-display text-3xl text-brand-ink">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{copy}</p>
            </div>
          ))}
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Batch France"
        title="10 repères Glassdoor terrain / service / channel pour affiner les packages France."
        description="Ce cinquième lot couvre tender excellence, channel marketing, distributor excellence, customer experience, service operations, RevOps, bids internationaux, partenariats, after-sales et formation commerciale."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {glassdoorBatch.map((role) => (
            <Link
              key={role.slug}
              href={`/job-roles/${role.slug}`}
              className="card-surface block p-6 transition hover:-translate-y-0.5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                {role.sector} · {role.category}
              </p>
              <h3 className="mt-3 font-display text-3xl text-brand-ink">{role.title}</h3>
              <p className="mt-3 text-sm leading-7 text-brand-stone">{role.salary}</p>
              <p className="mt-3 text-sm leading-7 text-brand-stone">{role.salarySource}</p>
            </Link>
          ))}
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Exemples"
        title="Une première sélection de métiers suivis."
        description="Chaque ligne peut ensuite être reliée à une fiche détaillée, un comparatif, un article et un call-to-action."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {highlightedRoles.map((role) => (
            <Link
              key={role.slug}
              href={`/job-roles/${role.slug}`}
              className="card-surface block p-6 transition hover:-translate-y-0.5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                {role.sector} · {role.category}
              </p>
              <h3 className="mt-3 font-display text-3xl text-brand-ink">{role.title}</h3>
              <p className="mt-3 text-sm leading-7 text-brand-stone">{role.salary}</p>
              <p className="mt-3 text-sm leading-7 text-brand-stone">{role.summary}</p>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/calcul-salaire-brut-net"
            className="rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Ouvrir le calculateur
          </Link>
          <Link
            href="/job-roles"
            className="rounded-full border border-brand-teal/20 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
          >
            Explorer toute la bibliothèque métiers
          </Link>
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Sources"
        title="Sources et périmètre de confiance"
        description="Les repères salariaux affichés ici sont des ordres de grandeur. Les sources et notes détaillées sont portées au niveau de chaque fiche métier pour éviter les généralisations."
      >
        <div className="card-surface p-8">
          <ul className="space-y-3 text-sm leading-7 text-brand-stone">
            <li>
              Benchmarks principaux:{" "}
              <a
                href="https://www.aon.com/france/aon-france/landing-page/guides_enquetes_remuneration.jsp"
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-brand-teal"
              >
                Aon
              </a>{" "}
              et{" "}
              <a
                href="https://france-biotech.fr/publications/le-panorama-france-healthtech/"
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-brand-teal"
              >
                France Biotech
              </a>
              .
            </li>
            <li>
              Repères complémentaires (indicatifs):{" "}
              <a
                href="https://www.glassdoor.fr/"
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-brand-teal"
              >
                Glassdoor
              </a>
              , uniquement lorsque la fiche métier le précise (proxy, date observée, taille d’échantillon).
            </li>
            <li>
              Règle éditoriale: ne pas extrapoler un salaire à un poste donné sans préciser la source, le contexte
              (secteur, seniorité, zone) et la fiabilité perçue.
            </li>
          </ul>
        </div>
      </SectionShell>
    </>
  );
}
