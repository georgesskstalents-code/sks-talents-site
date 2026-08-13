import Link from "next/link";
import { Info, ArrowRight } from "lucide-react";
import CalendlyButton from "@/components/CalendlyButton";

type Vertical = "life-sciences" | "animal-health";

const TIMELINE = [
  {
    num: "1",
    title: "Audit",
    desc: "Analyser les processus, identifier les priorités."
  },
  {
    num: "2",
    title: "Configuration & création",
    desc: "Paramétrer l'environnement, créer une première série d'assistants IA à ROI rapide."
  },
  {
    num: "3",
    title: "Test & itération",
    desc: "Valider avant déploiement général, ajuster la qualité."
  },
  {
    num: "4",
    title: "Déploiement & prise en main",
    desc: "Former l'équipe et assurer l'adoption."
  },
  {
    num: "5",
    title: "Suivi & optimisation",
    desc: "Amélioration continue, support."
  }
];

const PHASES_CONFIG: Record<
  Vertical,
  Array<{
    num: string;
    title: string;
    duree: string;
    intro?: string;
    fait: string[];
    livre: string[];
    footer?: string;
  }>
> = {
  "life-sciences": [
    {
      num: "1",
      title: "Diagnostic & Priorisation",
      duree: "2 à 4 semaines",
      fait: [
        "Entretiens individuels CEO / COO / DRH / VP RH sur tâches, outils, irritants et pertes de temps.",
        "Cartographie des processus RH et talent chronophages ou à faible valeur ajoutée.",
        "Audit des usages IA existants (« Shadow IA ») : qui utilise déjà ChatGPT ou Claude, pour quels usages.",
        "Rédaction d'une charte d'utilisation IA adaptée à votre biotech, medtech ou deeptech.",
        "Priorisation des cas d'usage selon impact, faisabilité et gain de temps."
      ],
      livre: [
        "Cartographie des processus prioritaires.",
        "Cartographie des usages IA existants.",
        "Charte IA sur mesure.",
        "Recommandation des cas d'usage à déployer en priorité."
      ],
      footer:
        "À l'issue du diagnostic, vous choisissez les cas d'usage à mettre en œuvre. Les assistants IA déployés en Phase 2 sont définis conjointement à partir des besoins réellement identifiés."
    },
    {
      num: "2",
      title: "Déploiement des premiers cas d'usage",
      duree: "4 à 8 semaines",
      intro:
        "Cette phase concrétise les besoins identifiés lors du diagnostic en assistants IA opérationnels. L'objectif est de démontrer rapidement la valeur de l'IA sur des cas d'usage prioritaires.",
      fait: [
        "Configuration de l'environnement IA.",
        "Structuration des bases documentaires talent, R&D, financières.",
        "Formation des équipes.",
        "Création et paramétrage des premiers assistants IA (CEO Copilot, Talent Radar, Retention Radar…) en équipe pour optimiser l'adoption."
      ],
      livre: [
        "3 à 5 assistants IA opérationnels (nombre défini à partir des besoins identifiés lors de la Phase 1).",
        "Documentation utilisateur.",
        "Formation des équipes concernées."
      ]
    },
    {
      num: "3",
      title: "Généralisation & Adoption",
      duree: "3 à 8 semaines",
      intro:
        "Cette phase vise à étendre l'usage de l'IA à l'ensemble de votre organisation et à ancrer ces nouvelles pratiques dans la durée.",
      fait: [
        "Extension des assistants IA aux autres équipes (R&D, Clinical, Regulatory, Finance…).",
        "Développement de nouveaux cas d'usage.",
        "Mise en place des automatisations complémentaires.",
        "Accompagnement au changement pour une adoption harmonieuse."
      ],
      livre: [
        "Écosystème d'assistants IA interconnectés et évolutifs.",
        "Processus optimisés et documentés.",
        "Tableau de bord de suivi de performance et de ROI.",
        "Gouvernance IA pérenne et conforme à l'IA Act."
      ]
    },
    {
      num: "4",
      title: "Montée en compétences",
      duree: "2 à 6 semaines",
      intro:
        "Cette phase vise à vous autonomiser sur l'utilisation et l'administration des assistants IA, réduisant votre dépendance externe.",
      fait: [
        "Formation des utilisateurs pour une maîtrise des assistants IA.",
        "Formation des administrateurs internes pour la gestion et l'évolution de l'environnement IA.",
        "Transfert de compétences approfondi sur la création et l'optimisation des assistants."
      ],
      livre: [
        "Équipe autonome sur les usages courants et la maintenance des assistants IA.",
        "Référents IA internes identifiés pour le support et l'évolution."
      ]
    },
    {
      num: "5",
      title: "Suivi & Optimisation",
      duree: "2 à 4 semaines (récurrent)",
      fait: ["Monitoring des usages.", "Optimisation continue des assistants IA."],
      livre: [
        "Rapport de suivi de performance et d'adoption.",
        "Optimisations et ajustements des assistants existants."
      ],
      footer:
        "Objectif : garantir la performance durable des assistants IA et identifier de nouveaux leviers de création de valeur."
    }
  ],
  "animal-health": [
    {
      num: "1",
      title: "Diagnostic & Priorisation",
      duree: "2 à 4 semaines",
      fait: [
        "Entretiens individuels CEO / DG groupement / DAF / DRH / responsables cliniques sur tâches, outils, irritants et pertes de temps.",
        "Cartographie des processus RH, juridiques et opérationnels chronophages.",
        "Audit des usages IA existants (« Shadow IA ») : qui utilise déjà ChatGPT ou Claude, pour quels usages.",
        "Rédaction d'une charte d'utilisation IA adaptée à votre groupement vétérinaire, clinique, marque petfood ou laboratoire vétérinaire.",
        "Priorisation des cas d'usage selon impact, faisabilité et gain de temps."
      ],
      livre: [
        "Cartographie des processus prioritaires.",
        "Cartographie des usages IA existants.",
        "Charte IA sur mesure.",
        "Recommandation des cas d'usage à déployer en priorité."
      ],
      footer:
        "À l'issue du diagnostic, vous choisissez les cas d'usage à mettre en œuvre. Les assistants IA déployés en Phase 2 sont définis conjointement à partir des besoins réellement identifiés."
    },
    {
      num: "2",
      title: "Déploiement des premiers cas d'usage",
      duree: "4 à 8 semaines",
      intro:
        "Cette phase concrétise les besoins identifiés lors du diagnostic en assistants IA opérationnels. L'objectif est de démontrer rapidement la valeur de l'IA sur des cas d'usage prioritaires.",
      fait: [
        "Configuration de l'environnement IA.",
        "Structuration des bases documentaires RH, juridiques, financières et opérationnelles multi-sites.",
        "Formation des équipes.",
        "Création et paramétrage des premiers assistants IA (Multi-Site Copilot, HR Legal Hub, CODIR Brief, Workforce Planner…) en équipe pour optimiser l'adoption."
      ],
      livre: [
        "3 à 5 assistants IA opérationnels (nombre défini à partir des besoins identifiés lors de la Phase 1).",
        "Documentation utilisateur.",
        "Formation des équipes concernées."
      ]
    },
    {
      num: "3",
      title: "Généralisation & Adoption",
      duree: "3 à 8 semaines",
      intro:
        "Cette phase vise à étendre l'usage de l'IA à l'ensemble de votre organisation et à ancrer ces nouvelles pratiques dans la durée.",
      fait: [
        "Extension des assistants IA aux autres équipes (cliniques, finance, juridique, développement territorial…).",
        "Développement de nouveaux cas d'usage.",
        "Mise en place des automatisations complémentaires.",
        "Accompagnement au changement pour une adoption harmonieuse."
      ],
      livre: [
        "Écosystème d'assistants IA interconnectés et évolutifs.",
        "Processus optimisés et documentés.",
        "Tableau de bord de suivi de performance et de ROI.",
        "Gouvernance IA pérenne et conforme à l'IA Act."
      ]
    },
    {
      num: "4",
      title: "Montée en compétences",
      duree: "2 à 6 semaines",
      intro:
        "Cette phase vise à vous autonomiser sur l'utilisation et l'administration des assistants IA, réduisant votre dépendance externe.",
      fait: [
        "Formation des utilisateurs pour une maîtrise des assistants IA.",
        "Formation des administrateurs internes pour la gestion et l'évolution de l'environnement IA.",
        "Transfert de compétences approfondi sur la création et l'optimisation des assistants."
      ],
      livre: [
        "Équipe autonome sur les usages courants et la maintenance des assistants IA.",
        "Référents IA internes identifiés pour le support et l'évolution."
      ]
    },
    {
      num: "5",
      title: "Suivi & Optimisation",
      duree: "2 à 4 semaines (récurrent)",
      fait: ["Monitoring des usages.", "Optimisation continue des assistants IA."],
      livre: [
        "Rapport de suivi de performance et d'adoption.",
        "Optimisations et ajustements des assistants existants."
      ],
      footer:
        "Objectif : garantir la performance durable des assistants IA et identifier de nouveaux leviers de création de valeur."
    }
  ]
};

const FORMATION = [
  {
    num: "1",
    title: "Session 1 · Audit et roadmap",
    desc: "Analyse des processus · identification des cas d'usage · roadmap 3 mois priorisée ROI rapide / faible effort."
  },
  {
    num: "2",
    title: "Sessions 2-3 · Premiers assistants IA",
    desc: "Premiers pas sur la plateforme d'orchestration IA · création des premiers assistants · développement pratique."
  },
  {
    num: "3",
    title: "Sessions 4-6 · Assistants complémentaires",
    desc: "Assistants plus avancés · optimisation des premiers · formation de l'équipe."
  },
  {
    num: "4",
    title: "Sessions 7-10 · Perfectionnement",
    desc: "Automatisations entre assistants · bilan final · roadmap d'autonomisation."
  }
];

const PROCHAINES_ETAPES = [
  {
    num: "1",
    title: "Diagnostic gratuit 5 questions",
    desc: "En ligne, 5 minutes. Nous identifions vos priorités IA.",
    href: "#diagnostic"
  },
  {
    num: "2",
    title: "Cadrage 15 min avec Georges",
    desc: "Périmètre, budget, financements, timing.",
    href: "calendly"
  },
  {
    num: "3",
    title: "Kick-off Phase 1",
    desc: "Entretiens, audit Shadow IA, cartographie.",
    href: null as string | null
  }
];

export default function MethodologieBlocs({ vertical }: { vertical: Vertical }) {
  const phases = PHASES_CONFIG[vertical];

  return (
    <>
      {/* ===== Bloc 1 - Timeline 5 phases ===== */}
      <section className="bg-white py-10 sm:py-14">
        <div className="container-shell">
          <p className="eyebrow">Notre méthodologie · 5 phases</p>
          <h2 className="t-h1 max-w-3xl font-display">
            Durée totale :{" "}
            <span className="italic text-brand-teal">2 à 6 mois</span> selon vos enjeux et la
            taille de votre organisation.
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-5">
            {TIMELINE.map((t) => (
              <article
                key={t.num}
                className="rounded-3xl border border-brand-teal/15 bg-white p-5 shadow-[0_18px_44px_rgba(15,58,60,0.06)]"
              >
                <span className="font-display text-[44px] leading-none text-brand-teal">
                  {t.num}
                </span>
                <p className="mt-3 font-semibold text-brand-ink">{t.title}</p>
                <p className="mt-2 text-caption text-brand-stone">{t.desc}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-brand-teal/15 bg-brand-mint/20 p-4 sm:p-5">
            <p className="t-body">
              Chaque phase s&apos;appuie sur les résultats de la précédente. L&apos;approche
              progressive garantit l&apos;adoption et la qualité à chaque étape.
            </p>
            <p className="mt-3 flex items-start gap-2 text-caption text-brand-stone">
              <Info size={14} className="mt-0.5 shrink-0 text-brand-teal" />
              <span>
                La durée de chaque phase est adaptée à la taille de vos équipes, à la complexité
                de vos enjeux et à vos outils déjà en place.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ===== Bloc 2 - 5 cards détaillées ===== */}
      <section className="bg-gradient-to-b from-white via-brand-mint/8 to-white py-10 sm:py-14">
        <div className="container-shell">
          <p className="eyebrow">Détail des 5 phases</p>
          <h2 className="t-h1 max-w-3xl font-display">
            Ce que l&apos;on fait.{" "}
            <span className="italic text-brand-teal">Ce que l&apos;on livre.</span>
          </h2>

          <div className="mt-10 space-y-6">
            {phases.map((p) => (
              <article
                key={p.num}
                className="rounded-3xl border border-brand-teal/15 bg-white p-6 shadow-[0_18px_44px_rgba(15,58,60,0.06)] sm:p-7"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-[44px] leading-none text-brand-teal">
                    {p.num}
                  </span>
                  <div>
                    <p className="t-h3 font-semibold text-brand-ink">
                      Phase {p.num} · {p.title}
                    </p>
                    <p className="mt-1 text-caption font-semibold uppercase tracking-[0.18em] text-brand-stone">
                      Durée : {p.duree}
                    </p>
                  </div>
                </div>

                {p.intro && <p className="mt-4 t-body">{p.intro}</p>}

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-teal">
                      Ce que l&apos;on fait
                    </p>
                    <ul className="mt-3 space-y-2">
                      {p.fait.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 t-body">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-teal">
                      Ce que l&apos;on livre
                    </p>
                    <ul className="mt-3 space-y-2">
                      {p.livre.map((l, i) => (
                        <li key={i} className="flex items-start gap-2 t-body">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {p.footer && (
                  <p className="mt-6 rounded-2xl bg-[#faf7f1] p-4 text-caption text-brand-stone">
                    {p.footer}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Bloc 3 - 2 tailles, 2 rythmes ===== */}
      <section className="bg-white py-10 sm:py-14">
        <div className="container-shell">
          <p className="eyebrow">2 tailles d&apos;organisation, 2 rythmes</p>
          <h2 className="t-h1 max-w-3xl font-display">
            La méthodologie reste la même.{" "}
            <span className="italic text-brand-teal">Le rythme s&apos;adapte.</span>
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <article className="rounded-3xl border border-brand-teal/15 bg-white p-6 shadow-[0_18px_44px_rgba(15,58,60,0.06)] sm:p-7">
              <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Petite équipe
              </p>
              <p className="mt-2 font-display text-3xl text-brand-ink">5-20 personnes</p>
              <p className="mt-4 text-caption font-semibold uppercase tracking-[0.18em] text-brand-stone">
                Rythme rapide
              </p>
              <p className="mt-1 font-display text-2xl text-brand-ink">Environ 2 mois</p>
              <p className="mt-4 text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-stone">
                Priorité
              </p>
              <p className="mt-2 t-body">
                Impact rapide sur les cas d&apos;usage les plus chronophages.
              </p>
            </article>

            <article className="rounded-3xl border border-brand-teal/15 bg-brand-mint/20 p-6 shadow-[0_18px_44px_rgba(15,58,60,0.06)] sm:p-7">
              <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Équipe moyenne
              </p>
              <p className="mt-2 font-display text-3xl text-brand-ink">20-50 personnes</p>
              <p className="mt-4 text-caption font-semibold uppercase tracking-[0.18em] text-brand-stone">
                Rythme équilibré
              </p>
              <p className="mt-1 font-display text-2xl text-brand-ink">Environ 3-4 mois</p>
              <p className="mt-4 text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-stone">
                Priorité
              </p>
              <p className="mt-2 t-body">
                Déploiement structuré avec gouvernance IA et adoption équipe.
              </p>
            </article>
          </div>

          <p className="mt-6 text-caption text-brand-stone">
            Le nombre exact d&apos;assistants IA à déployer est défini à l&apos;issue de
            l&apos;audit de Phase 1, en fonction de vos enjeux prioritaires.
          </p>
        </div>
      </section>

      {/* ===== Bloc 4 - Plan de formation ===== */}
      <section className="bg-gradient-to-b from-white to-brand-mint/15 py-10 sm:py-14">
        <div className="container-shell">
          <p className="eyebrow">Plan de formation · 100 % personnalisable</p>
          <h2 className="t-h1 max-w-3xl font-display">
            Adapté au niveau de base de{" "}
            <span className="italic text-brand-teal">votre référent IA.</span>
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {FORMATION.map((f) => (
              <article
                key={f.num}
                className="rounded-3xl border border-brand-teal/15 bg-white p-6 shadow-[0_18px_44px_rgba(15,58,60,0.06)] sm:p-7"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-[36px] leading-none text-brand-teal">
                    {f.num}
                  </span>
                  <p className="t-h3 font-semibold text-brand-ink">{f.title}</p>
                </div>
                <p className="mt-3 t-body">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Bloc 5 - Investissement (sans prix + fourchette) ===== */}
      <section className="bg-white py-10 sm:py-14">
        <div className="container-shell">
          <p className="eyebrow">L&apos;investissement</p>
          <h2 className="t-h1 max-w-3xl font-display">
            Pour passer d&apos;une IA utilisée individuellement à une IA{" "}
            <span className="italic text-brand-teal">
              déployée au service de toute votre organisation.
            </span>
          </h2>

          <div className="mt-10 overflow-hidden rounded-3xl border border-brand-teal/15 bg-white shadow-[0_18px_44px_rgba(15,58,60,0.06)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-brand-mint/25">
                  <tr>
                    <th className="px-5 py-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-teal">
                      Phase
                    </th>
                    <th className="px-5 py-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-teal">
                      Durée
                    </th>
                    <th className="px-5 py-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-teal">
                      Périmètre
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-teal/10">
                  <tr>
                    <td className="px-5 py-4 t-body">1 · Diagnostic</td>
                    <td className="px-5 py-4 t-body">2 à 4 semaines</td>
                    <td className="px-5 py-4 t-body">Cartographie</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 t-body">2 · Construction</td>
                    <td className="px-5 py-4 t-body">4 à 8 semaines</td>
                    <td className="px-5 py-4 t-body">Premiers assistants IA</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 t-body">3 · Déploiement</td>
                    <td className="px-5 py-4 t-body">3 à 8 semaines</td>
                    <td className="px-5 py-4 t-body">Toutes équipes</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 t-body">4 · Autonomie</td>
                    <td className="px-5 py-4 t-body">2 à 6 semaines</td>
                    <td className="px-5 py-4 t-body">Formation admin</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 t-body">5 · Optimisation</td>
                    <td className="px-5 py-4 t-body">2 à 4 sem. (récurrent)</td>
                    <td className="px-5 py-4 t-body">Bilan + ROI</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-6 t-body">
            <span className="font-semibold text-brand-ink">Durée totale :</span> 2 à 6 mois de
            bout en bout.
          </p>

          <div className="mt-6 rounded-3xl border border-brand-teal/15 bg-brand-mint/20 p-6 sm:p-7">
            <p className="flex items-start gap-2 text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-teal">
              <Info size={14} className="mt-0.5 shrink-0" />
              Pourquoi une fourchette ?
            </p>
            <p className="mt-3 t-body">La durée réelle dépend de :</p>
            <ul className="mt-3 space-y-2">
              {[
                "La taille de votre équipe (5 à 50+ personnes).",
                "Le nombre d'assistants IA à déployer en fonction de vos enjeux prioritaires.",
                "Vos outils déjà en place.",
                "Votre ambition de formation.",
                "Votre périmètre (mono/multi-sites/multi-pays)."
              ].map((li) => (
                <li key={li} className="flex items-start gap-2 t-body">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                  <span>{li}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-caption font-semibold text-brand-stone">
              Une équipe de 8 personnes se déploie en 2 mois. Une équipe de 50 personnes en 4
              mois.
            </p>
          </div>

          <div className="mt-8 grid gap-6 rounded-3xl border border-brand-teal/15 bg-white p-6 shadow-[0_18px_44px_rgba(15,58,60,0.06)] sm:p-7 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow">Investissement</p>
              <p className="mt-3 font-display text-3xl text-brand-ink">
                À partir de <span className="italic text-brand-teal">sur mesure</span>
              </p>
              <p className="mt-3 t-body">
                Modulé en fonction de la taille de votre équipe, du nombre d&apos;assistants IA à
                déployer, de vos outils déjà en place, de votre ambition de formation et de votre
                périmètre géographique.
              </p>
              <p className="mt-4 text-caption font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Devis précis en 48h après diagnostic gratuit.
              </p>
            </div>
            <div className="rounded-2xl bg-[#faf7f1] p-5 sm:p-6">
              <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Modalités d&apos;accompagnement
              </p>
              <ul className="mt-3 space-y-2 t-body">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                  <span>Interventions sur site réparties tout au long du projet.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                  <span>
                    Ateliers et comités de pilotage en visio adaptés au rythme du projet.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                  <span>
                    Développement, paramétrage, tests, support et ajustements réalisés à
                    distance entre les ateliers.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                  <span>Support par e-mail et messagerie continue.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Bloc 6 - Prochaines étapes ===== */}
      <section className="bg-gradient-to-b from-brand-mint/15 to-white py-10 sm:py-14">
        <div className="container-shell">
          <p className="eyebrow">Prochaines étapes</p>
          <h2 className="t-h1 max-w-3xl font-display">
            3 pas simples pour{" "}
            <span className="italic text-brand-teal">démarrer aujourd&apos;hui.</span>
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {PROCHAINES_ETAPES.map((e) => (
              <article
                key={e.num}
                className="rounded-3xl border border-brand-teal/15 bg-white p-6 shadow-[0_18px_44px_rgba(15,58,60,0.06)] sm:p-7"
              >
                <span className="font-display text-[44px] leading-none text-brand-teal">
                  {e.num}
                </span>
                <p className="mt-3 t-h3 font-semibold text-brand-ink">{e.title}</p>
                <p className="mt-2 t-body">{e.desc}</p>
                {e.href === "calendly" ? (
                  <div className="mt-4">
                    <CalendlyButton label="Réserver 15 min →" tone="ghost" />
                  </div>
                ) : e.href ? (
                  <Link
                    href={e.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-caption font-semibold text-brand-teal transition hover:opacity-80"
                  >
                    Faire le diagnostic
                    <ArrowRight size={14} />
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
