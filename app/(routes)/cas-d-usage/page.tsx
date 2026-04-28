import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";
import ContentPageSignature from "@/components/ContentPageSignature";
import PageHero from "@/components/PageHero";

const useCases = [
  {
    title: "Startup en croissance",
    before: "Le CEO absorbe encore beaucoup trop de temps RH, le recrutement se décide dans l’urgence et les rôles prioritaires ne sont pas séquencés.",
    after: "Une priorisation plus claire, un diagnostic rapide et un premier niveau de structuration pour éviter que ce qui marchait à 10 casse à 30."
  },
  {
    title: "Scale-up après levée",
    before: "Le cash crée une pression de recrutement, mais aussi une pression de performance. Les erreurs coûtent plus vite et les arbitrages doivent être plus lisibles.",
    after: "Une lecture plus structurée des rôles, des délais, des dépendances et du bon niveau d’externalisation ou d’accompagnement."
  },
  {
    title: "Entreprise sous tension recrutement",
    before: "Le problème semble venir du marché, alors qu’il vient souvent aussi du brief, de la décision, du pipeline et du manque de process documenté.",
    after: "Une capacité à distinguer ce qui relève de la rareté du marché et ce qui relève d’un système de recrutement encore trop artisanal."
  },
  {
    title: "Équipe RH débordée",
    before: "L’équipe RH tourne beaucoup, mais pilote peu : tâches répétitives, relances manuelles, reporting dispersé, dépendance à quelques personnes clés.",
    after: "Une meilleure structuration, une automatisation utile et une capacité à remonter aux dirigeants les vrais goulots d’étranglement."
  }
];

export const metadata = {
  title: "Cas d’usage | SKS TALENTS",
  description:
    "Des cas d’usage concrets pour comprendre comment SKS TALENTS aide startups, scale-ups, entreprises sous tension recrutement et équipes RH débordées.",
  alternates: {
    canonical: "https://www.skstalents.fr/cas-d-usage"
  }
};

export default function CasDUsagePage() {
  return (
    <>
      <PageHero
        kicker="Cas d’usage"
        title="Des situations concrètes où recrutement, RH et croissance commencent à se gêner."
        description="Cette page ne vend pas un service abstrait. Elle montre des contextes réels dans lesquels la lecture marché, la structuration RH, l’automatisation utile ou l’executive search deviennent les bons leviers."
        variant="sand"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Cas d’usage" }
        ]}
      />

      <section className="container-shell pb-8 sm:pb-12">
        <div className="space-y-5">
          {useCases.map((useCase) => (
            <article key={useCase.title} className="card-surface p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">{useCase.title}</p>
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[24px] border border-brand-teal/10 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">Avant</p>
                  <p className="mt-3 text-sm leading-7 text-brand-stone">{useCase.before}</p>
                </div>
                <div className="rounded-[24px] border border-brand-teal/10 bg-brand-mint/25 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">Après</p>
                  <p className="mt-3 text-sm leading-7 text-brand-stone">{useCase.after}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-12">
        <div className="card-surface p-8 text-center sm:p-10">
          <p className="eyebrow">Orientation</p>
          <h2 className="mt-3 font-display text-5xl text-brand-ink sm:text-6xl">
            Commencez par le cas qui vous ressemble le plus.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-brand-stone">
            Ensuite, passez soit par le diagnostic, soit par la scorecard dirigeant, soit par l’abonnement si
            vous cherchez une lecture plus régulière de vos enjeux.
          </p>
          <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Diagnostic", "/diagnostic"],
              ["Scorecard", "/scorecard-dirigeant"],
              ["Abonnement", "/abonnement"],
              ["Pour qui", "/pour-qui"]
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center justify-center rounded-full border border-brand-teal/20 bg-white px-6 py-4 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="mx-auto mt-4 max-w-sm">
            <CalendlyButton label="Réserver un call" tone="outline" />
          </div>
        </div>
      </section>

      <ContentPageSignature description="Cas d’usage édités par SKS TALENTS pour aider les dirigeants et équipes RH à reconnaître rapidement leur situation actuelle." />
    </>
  );
}
