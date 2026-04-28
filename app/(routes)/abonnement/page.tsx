import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";
import ContentPageSignature from "@/components/ContentPageSignature";
import InlineLeadForm from "@/components/InlineLeadForm";
import PageHero from "@/components/PageHero";

const plans = [
  {
    name: "Veille premium",
    price: "39 à 59 €/mois",
    audience: "Dirigeants, RH, profils de niche, candidats avancés",
    include: [
      "2 notes marché / mois",
      "Signaux talents, fonds, rôles critiques, tendances",
      "Accès prioritaire aux guides et ressources premium",
      "Lecture 5 minutes, orientée décision"
    ]
  },
  {
    name: "Membership entreprise",
    price: "290 à 690 €/mois",
    audience: "Startups, scale-ups et PME santé",
    include: [
      "Briefing mensuel talents & marché",
      "Veille rôles critiques, concurrence et signaux d’embauche",
      "Priorisation des recrutements et risques organisationnels",
      "1 session de revue mensuelle"
    ]
  },
  {
    name: "Operator / advisory",
    price: "1 200 à 2 500 €/mois",
    audience: "CEO, COO, DRH, CPO, équipes sous tension",
    include: [
      "Diagnostic mensuel de la machine recrutement / RH",
      "Revue des process, automatisations et goulots d’étranglement",
      "Aide à la priorisation des rôles et du sequencing de croissance",
      "Accompagnement plus proche, orienté exécution"
    ]
  }
];

export const metadata = {
  title: "Abonnement / Membership SKS TALENTS | Veille, structuration RH et signaux marché",
  description:
    "Une offre récurrente pour dirigeants et équipes RH qui veulent suivre marché, talents, structuration RH et priorités de croissance sans dépendre uniquement d’un recrutement ponctuel.",
  alternates: {
    canonical: "https://www.skstalents.fr/abonnement"
  }
};

export default function AbonnementPage() {
  return (
    <>
      <PageHero
        kicker="Abonnement / Membership"
        title="Une offre récurrente pour suivre vos signaux talents, RH et croissance"
        description="L’idée n’est pas d’ajouter un abonnement de plus. L’idée est de vous donner une lecture régulière, actionnable et sectorielle pour éviter que recrutement, structuration RH et organisation deviennent des angles morts."
        variant="sand"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Abonnement" }
        ]}
      />

      <section className="container-shell pb-8 sm:pb-12">
        <div className="card-surface p-8 sm:p-10">
          <p className="eyebrow">Promesse</p>
          <h2 className="mt-3 font-display text-4xl text-brand-ink sm:text-5xl">
            Gagner du temps dirigeant, mieux prioriser et éviter les blocages invisibles.
          </h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[
              "Suivre les signaux marché, fonds, concurrence et tensions talents.",
              "Voir plus tôt où votre organisation devient fragile.",
              "Accéder à une lecture sectorielle continue sans attendre qu’un problème explose."
            ].map((item) => (
              <article key={item} className="rounded-[24px] border border-brand-teal/10 bg-brand-mint/25 p-5">
                <p className="text-sm leading-7 text-brand-stone">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-12">
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.name} className="card-surface flex h-full flex-col p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">{plan.name}</p>
              <h3 className="mt-3 font-display text-3xl text-brand-ink">{plan.price}</h3>
              <p className="mt-3 text-sm leading-7 text-brand-stone">{plan.audience}</p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-brand-stone">
                {plan.include.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-12">
        <div className="card-surface p-8 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <p className="eyebrow">Fréquence</p>
              <h2 className="mt-3 font-display text-4xl text-brand-ink sm:text-5xl">
                Une cadence pensée pour rester utile, pas envahissante.
              </h2>
              <p className="mt-4 text-base leading-8 text-brand-stone">
                Le membership s’appuie sur la cadence déjà posée sur le site : `2 newsletters par mois`, un
                socle de pages mises à jour, des signaux marché, un diagnostic activable à la demande et un
                point de lecture régulier pour les entreprises qui veulent aller plus loin.
              </p>
            </div>
            <div className="rounded-[26px] border border-brand-teal/10 bg-brand-mint/25 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Ce que l’abonnement remplace
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-brand-stone">
                {[
                  "Les décisions prises trop tard faute de lecture claire.",
                  "Les points RH qui ne remontent qu’au moment de la crise.",
                  "La dépendance à un recrutement ponctuel sans vue plus large.",
                  "L’impression d’avoir des outils, mais pas de système."
                ].map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-12">
        <div className="card-surface p-8 text-center sm:p-10">
          <p className="eyebrow">Prochain pas</p>
          <h2 className="mt-3 font-display text-5xl text-brand-ink sm:text-6xl">
            Voyons quel niveau d’abonnement correspond à votre situation.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-brand-stone">
            Si vous êtes en phase de structuration, de scale ou de tension recrutement, on peut rapidement voir
            si le bon format est une veille, un membership entreprise ou un accompagnement plus proche.
          </p>
          <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Commencer par le diagnostic
            </Link>
            <CalendlyButton label="Réserver un call" tone="outline" />
          </div>
        </div>
      </section>

      <section className="container-shell pb-10 sm:pb-14">
        <InlineLeadForm
          title="Recevoir la grille abonnement"
          description="Laissez vos coordonnées si vous voulez recevoir une recommandation simple sur le bon format : veille premium, membership entreprise ou operator advisory."
          role="CEO / COO / DRH"
          sector="Abonnement / membership"
        />
      </section>

      <ContentPageSignature description="Page abonnement éditée par SKS TALENTS pour transformer l’autorité éditoriale et les signaux marché en offre récurrente utile." />
    </>
  );
}
