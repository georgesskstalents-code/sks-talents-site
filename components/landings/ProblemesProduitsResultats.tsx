import { ArrowRight } from "lucide-react";

type Vertical = "life-sciences" | "animal-health";

type Row = {
  probleme: string;
  produit: string;
  resultat: string;
};

const CONFIG: Record<Vertical, Row[]> = {
  "life-sciences": [
    {
      probleme:
        "3 fichiers Excel, un ATS incomplet, une roadmap R&D dans PowerPoint. Le board demande : quand devons-nous recruter ?",
      produit: "CEO Copilot",
      resultat:
        "Roadmap R&D → besoins talent → budget → recrutement anticipé → board pack automatique."
    },
    {
      probleme:
        "Recruter coûte cher. Recruter mal coûte plus. Junior, manager ou C-level : si on rate l&apos;onboarding, on redémarre.",
      produit: "Talent Radar + Retention Radar",
      resultat:
        "Recrutements ciblés alignés sur la roadmap. Signaux faibles de désengagement détectés 90 jours à l&apos;avance."
    },
    {
      probleme:
        "50 → 200 employés en 24 mois, avec des process datant de l&apos;époque où on était 15.",
      produit: "Scale-up Playbook",
      resultat:
        "Process RH vivant qui évolue au rythme de vos levées, sans tout réinventer à chaque palier."
    }
  ],
  "animal-health": [
    {
      probleme:
        "Tout est éclaté. Une due diligence me prend deux semaines. Les contrats sont dans des classeurs, les avenants dans des mails.",
      produit: "HR Legal Hub",
      resultat:
        "Documents RH centralisés, avenants conformes générés, due diligence prête en 48h vs 2 semaines."
    },
    {
      probleme:
        "Entre la pénurie de vétos, le turnover et 30 plannings sur Excel par site, je passe mon temps à boucher les trous.",
      produit: "Multi-Site Copilot + CODIR Brief",
      resultat:
        "Sous-effectifs visibles avant qu&apos;ils ne coûtent d&apos;activité. Reporting consolidé sans ressaisie, prêt chaque lundi."
    },
    {
      probleme:
        "Des appels manqués, des leads qui refroidissent, un closing qu&apos;on ne maîtrise pas.",
      produit: "Sales Pipeline Vet",
      resultat:
        "Réception et qualification des appels entrants 24/7, équipes concentrées sur les leads à fort potentiel."
    }
  ]
};

export default function ProblemesProduitsResultats({ vertical }: { vertical: Vertical }) {
  const rows = CONFIG[vertical];
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="container-shell">
        <p className="eyebrow">Problème quotidien → assistant IA → résultat</p>
        <h2 className="t-h1 max-w-3xl font-display">
          3 frictions concrètes.{" "}
          <span className="italic text-brand-teal">3 réponses opérationnelles.</span>
        </h2>
        <p className="mt-3 max-w-3xl t-body">
          À gauche, la phrase qu&apos;on entend en salle de réunion. Au milieu, l&apos;assistant IA
          qui transforme la situation. À droite, ce que vous y gagnez.
        </p>

        <div className="mt-10 space-y-6">
          {rows.map((r, i) => (
            <article
              key={i}
              className="grid gap-4 rounded-3xl border border-brand-teal/15 bg-white p-6 shadow-[0_18px_44px_rgba(15,58,60,0.06)] sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center sm:gap-3 sm:p-7"
            >
              <div className="rounded-2xl bg-[#faf7f1] p-4">
                <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-stone">
                  Le problème
                </p>
                <p
                  className="mt-2 font-display italic t-body text-brand-ink"
                  dangerouslySetInnerHTML={{ __html: `« ${r.probleme} »` }}
                />
              </div>

              <ArrowRight
                aria-hidden
                size={22}
                className="justify-self-center text-brand-teal sm:rotate-0"
              />

              <div className="rounded-2xl border border-brand-teal/20 bg-brand-mint/25 p-4">
                <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  L&apos;assistant IA
                </p>
                <p className="mt-2 t-h3 font-semibold text-brand-ink">{r.produit}</p>
              </div>

              <ArrowRight
                aria-hidden
                size={22}
                className="justify-self-center text-brand-teal sm:rotate-0"
              />

              <div className="rounded-2xl bg-brand-teal/95 p-4 text-white">
                <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-white/70">
                  Le résultat
                </p>
                <p
                  className="mt-2 t-body !text-white"
                  dangerouslySetInnerHTML={{ __html: r.resultat }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
