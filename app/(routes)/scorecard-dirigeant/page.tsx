import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";
import ContentPageSignature from "@/components/ContentPageSignature";
import InlineLeadForm from "@/components/InlineLeadForm";
import PageHero from "@/components/PageHero";

const scorecardItems = [
  "Le CEO n’est pas le point de passage obligé de chaque recrutement.",
  "Le time-to-hire est mesuré et discuté au moins une fois par mois.",
  "Les rôles critiques à ouvrir dans les 6 à 12 mois sont déjà priorisés.",
  "Le process de recrutement est écrit, pas seulement implicite.",
  "L’onboarding suit une trame claire au lieu de dépendre du manager seul.",
  "Les tâches RH répétitives sont automatisées quand elles n’ont pas de valeur humaine forte.",
  "Les données utiles existent : pipeline, délais, goulots d’étranglement, qualité de décision.",
  "Les responsabilités RH et opérationnelles sont claires entre dirigeants, managers et RH.",
  "Le recrutement est relié à des objectifs business visibles.",
  "Le marché est relu régulièrement pour ajuster les priorités, les profils et le niveau d’exigence."
];

export const metadata = {
  title: "Mini scorecard dirigeant | Structuration RH & croissance | SKS TALENTS",
  description:
    "Une scorecard simple pour dirigeants, COO, CPO et DRH afin d’évaluer si l’organisation RH est prête à accompagner la prochaine phase de croissance.",
  alternates: {
    canonical: "https://www.skstalents.fr/scorecard-dirigeant"
  }
};

export default function ScorecardDirigeantPage() {
  return (
    <>
      <PageHero
        kicker="Scorecard dirigeant"
        title="Votre organisation est-elle prête à absorber la prochaine phase de croissance ?"
        description="Une mini scorecard pensée pour les dirigeants, COO, CPO et RH qui veulent savoir si le vrai sujet vient du recrutement, de la structure, du temps perdu ou d’une exécution trop artisanale."
        variant="sand"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Scorecard dirigeant" }
        ]}
      />

      <section className="container-shell pb-8 sm:pb-12">
        <div className="card-surface p-8 sm:p-10">
          <p className="eyebrow">Mode d’emploi</p>
          <h2 className="mt-3 font-display text-4xl text-brand-ink sm:text-5xl">
            Comptez simplement le nombre de “oui”.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-brand-stone">
            Cette scorecard n’est pas un audit exhaustif. C’est un repère rapide pour voir si vos RH, votre
            recrutement et votre organisation suivent encore la croissance ou commencent à la ralentir.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {scorecardItems.map((item, index) => (
              <article
                key={item}
                className="rounded-[24px] border border-brand-teal/10 bg-[linear-gradient(180deg,rgba(248,252,251,0.95),rgba(255,255,255,0.95))] px-5 py-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  Critère {index + 1}
                </p>
                <p className="mt-3 text-sm leading-7 text-brand-stone">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-12">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              title: "0 à 3 oui",
              copy: "La structure repose encore trop sur l’urgence, la bande passante du CEO ou des process non stabilisés. Il faut clarifier vite avant de recruter plus."
            },
            {
              title: "4 à 7 oui",
              copy: "Le socle existe, mais il reste fragile. Vous pouvez encore corriger avec quelques décisions structurantes sur les rôles, le pipeline et les automatismes utiles."
            },
            {
              title: "8 à 10 oui",
              copy: "La base est saine. L’enjeu devient d’anticiper la prochaine phase de croissance et de ne pas laisser les sujets RH se recharger trop tard."
            }
          ].map((band) => (
            <article key={band.title} className="card-surface h-full p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">Lecture</p>
              <h3 className="mt-3 font-display text-3xl text-brand-ink">{band.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{band.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-12">
        <div className="card-surface p-8 text-center sm:p-10">
          <p className="eyebrow">Prochain pas</p>
          <h2 className="mt-3 font-display text-5xl text-brand-ink sm:text-6xl">
            Passez de la scorecard au diagnostic.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-brand-stone">
            La scorecard vous donne une lecture rapide. Le diagnostic vous donne ensuite une trajectoire
            plus claire : executive search, RPO, structuration RH ou automatisation utile.
          </p>
          <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Faire le diagnostic
            </Link>
            <CalendlyButton label="Réserver un call" tone="outline" />
          </div>
        </div>
      </section>

      <section className="container-shell pb-10 sm:pb-14">
        <InlineLeadForm
          title="Recevoir une lecture commentée de votre scorecard"
          description="Laissez vos coordonnées si vous voulez transformer cette scorecard rapide en lecture plus utile pour vos enjeux de croissance, de recrutement et de structuration."
          role="CEO / COO / DRH"
          sector="Scorecard dirigeant"
        />
      </section>

      <ContentPageSignature description="Scorecard éditée par SKS TALENTS pour aider les dirigeants à évaluer rapidement si leur organisation est encore lisible, scalable et soutenable." />
    </>
  );
}
