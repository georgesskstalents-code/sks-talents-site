import { CheckCircle2, CircleDot } from "lucide-react";

type Vertical = "life-sciences" | "animal-health";

type Produit = {
  name: string;
  gain: string;
};

type Roadmap = {
  name: string;
  desc: string;
};

const CONFIG: Record<
  Vertical,
  {
    title: string;
    intro: string;
    produits: Produit[];
    roadmap: Roadmap[];
  }
> = {
  "life-sciences": {
    title: "SKS Life Sciences Operating Suite",
    intro:
      "Les copilotes IA conçus pour les biotech, medtech et deeptech en croissance. Un assistant par fonction critique, en production, mesurable dès le 4ème mois.",
    produits: [
      {
        name: "CEO Copilot",
        gain: "Board pack en 5 minutes vs 3 jours de retraitement manuel."
      },
      {
        name: "Talent Radar",
        gain: "Anticipe vos recrutements stratégiques 6 mois avant le besoin réel."
      },
      {
        name: "Retention Radar",
        gain: "Détecte les signaux faibles de départ 90 jours avant qu&apos;il ne soit trop tard."
      },
      {
        name: "Scale-up Playbook",
        gain: "Process RH vivant, adapté à chaque phase Series A → C, sans tout réinventer."
      }
    ],
    roadmap: [
      { name: "Onboarding 90", desc: "Onboarding structuré sur 90 jours, mesuré et itératif." },
      { name: "Board Talent", desc: "Reporting board talent automatique, mensuel, comparable." },
      { name: "Knowledge Hub", desc: "Mémoire organisationnelle vivante, requêtable, propre à vous." },
      { name: "AI Governance", desc: "Gouvernance IA sur mesure, traçable, conforme à l&apos;IA Act." }
    ]
  },
  "animal-health": {
    title: "SKS Animal Health Operating Suite",
    intro:
      "Le système de pilotage IA des organisations vétérinaires et Animal Health multi-sites. Un assistant par fonction critique, en production, mesurable dès le 4ème mois.",
    produits: [
      {
        name: "Multi-Site Copilot",
        gain: "Reporting mensuel consolidé de 3 jours à 4 minutes, prêt pour votre CODIR."
      },
      {
        name: "HR Legal Hub",
        gain: "Documents RH centralisés, due diligence prête en 48h vs 2 semaines."
      },
      {
        name: "Sales Pipeline Vet",
        gain: "Réception et qualification des appels entrants 24/7, closing en hausse."
      },
      {
        name: "CODIR Brief",
        gain: "Reporting direction automatisé, KPI opérationnels prêts chaque lundi."
      }
    ],
    roadmap: [
      { name: "Workforce Planner", desc: "Effectifs, gardes, capacité par site, ajustés en temps réel." },
      { name: "Clinic Performance", desc: "KPI opérationnels par site, benchmarks internes." },
      { name: "Onboarding Vet", desc: "Intégration vétérinaires et ASV structurée sur 90 jours." },
      { name: "AI Governance", desc: "Gouvernance IA santé animale, conforme à l&apos;IA Act." }
    ]
  }
};

export default function OperatingSuite({ vertical }: { vertical: Vertical }) {
  const cfg = CONFIG[vertical];
  return (
    <section className="bg-gradient-to-b from-white via-brand-mint/8 to-white py-10 sm:py-14">
      <div className="container-shell">
        <p className="eyebrow">Notre suite d&apos;assistants IA</p>
        <h2 className="t-h1 max-w-3xl font-display">{cfg.title}</h2>
        <p className="mt-3 max-w-3xl t-body">{cfg.intro}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cfg.produits.map((p) => (
            <article
              key={p.name}
              className="flex flex-col rounded-3xl border border-brand-teal/15 bg-white p-6 shadow-[0_18px_44px_rgba(15,58,60,0.06)]"
            >
              <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-brand-teal/10 px-3 py-1 text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-teal">
                <CircleDot size={12} />
                En prod
              </span>
              <p className="mt-4 t-h3 font-semibold text-brand-ink">{p.name}</p>
              <p
                className="mt-3 t-body"
                dangerouslySetInnerHTML={{ __html: p.gain }}
              />
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-brand-teal/10 bg-[#faf7f1] p-6 sm:p-8">
          <p className="eyebrow">Assistants IA complémentaires · déployables à la carte</p>
          <p className="mt-2 t-body">
            Ces assistants IA sont également disponibles. Nous les activons selon vos besoins
            prioritaires identifiés en Phase 1 Diagnostic.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {cfg.roadmap.map((r) => (
              <li
                key={r.name}
                className="flex items-start gap-3 rounded-2xl border border-brand-teal/15 bg-white p-4"
              >
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-teal" />
                <div>
                  <p className="font-semibold text-brand-ink">{r.name}</p>
                  <p
                    className="mt-1 text-caption text-brand-stone"
                    dangerouslySetInnerHTML={{ __html: r.desc }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
