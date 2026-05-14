"use client";

import Link from "next/link";
import {
  BarChart3,
  CheckCircle,
  FileText,
  Phone,
  Sparkles,
  TrendingUp
} from "lucide-react";
import CalendlyButton from "@/components/CalendlyButton";
import DemoStage from "@/components/landings/DemoStage";
import DiagnosticForm from "@/components/landings/DiagnosticForm";
import LogosScrollCarousel from "@/components/landings/LogosScrollCarousel";
import { animalHealthScenes } from "./animalHealthScenes";
import { animalHealthQuestions } from "./animalHealthQuestions";

// Hide 3 detail blocks (4 moments critiques, profils hybrides, vocabulaire) - page allégée.
// Repasser à true pour les ré-afficher sans toucher au code des sections.
const SHOW_DETAIL_BLOCKS = false;

// Pairs each dirigeant enjeu with the IA agent that solves it (1-to-1 or 2-to-1).
// 4 enjeux + 4 agents IA (1:1 strict).
// Mise a jour 2026-05-13 : retrait de l'agent M&A Pipeline et du dashboard ROI transversal.
const enjeuxAvecAgents: {
  enjeux: { num: string; title: string; quote: string; tone?: "amber" | "yellow" }[];
  agent: { Icon: typeof FileText; title: string; desc: string; note: string; badge?: string };
}[] = [
  {
    enjeux: [{ num: "01", title: "Documentation juridique RH dispersée", quote: "Tout est éclaté. Due diligence en 2 sem." }],
    agent: { Icon: FileText, title: "Agent Juridique RH multi-sites", desc: "Centralise contrats, génère avenants conformes à la convention vétérinaire, alerte échéances, prépare due diligences.", note: "Due diligence 48h vs 2 sem" }
  },
  {
    enjeux: [{ num: "02", title: "Plannings & finances sur Excel", quote: "30 plannings sur Excel et data sans préconisations. C'est l'enfer." }],
    agent: { Icon: BarChart3, title: "Agent Pilotage Dirigeant multi-sites", desc: "Compile auto les KPI opérationnels + P&L par clinique. Dashboard CODIR prêt chaque lundi avec alertes contextuelles, détection d'écarts et préconisations stratégiques.", note: "3 jours → 4 minutes · Cash 12 mois fiable à 95 %", badge: "DÉMO" }
  },
  {
    enjeux: [{ num: "03", title: "Appels entrants ratés (perte de leads)", quote: "30 % appels ratés = leads perdus." }],
    agent: { Icon: Phone, title: "Agent Lead Catcher 24/7", desc: "Réceptionne, qualifie et route les appels entrants. Détecte les leads chauds en 30 secondes.", note: "0 % leads perdus · 24/7" }
  },
  {
    enjeux: [{ num: "04", title: "Sales enablement commercial", quote: "Closing < 20 %, leads chauds ratés.", tone: "amber" }],
    agent: { Icon: CheckCircle, title: "Agent Sales Closer vétérinaire", desc: "Analyse calls commerciaux, score leads, suggère next actions, prépare RDV, détecte deals à risque.", note: "+30 % closing · ramp-up 6 sem" }
  }
];

const moments = [
  {
    title: "Consolidation groupement vétérinaire",
    quote:
      "Nous rachetons une clinique tous les 2 mois. Nous avons besoin d'un coordinateur régional capable d'intégrer sans casser la culture.",
    stats: "3 missions · Time-to-fill 6 sem · 45-100k€",
    tone: "emerald"
  },
  {
    title: "Scale commercial petfood",
    quote:
      "Nous voulons construire notre Vets Channel ou notre canal GSS. Nous cherchons un Head of qui parle vétérinaire ET sait piloter une force de vente.",
    stats: "2 missions · Time-to-fill 12 sem · 70-180k€",
    tone: "blue"
  },
  {
    title: "Structuration scale PME santé",
    quote:
      "Nous passons de 30 à 100 employés. Nous avons besoin d'un DOP qui comprend notre secteur ET sait industrialiser nos process.",
    stats: "1 mission flagship · Time-to-fill 10 sem · 90-130k€",
    tone: "amber"
  },
  {
    title: "Marque employeur & rétention",
    quote:
      "On perd 30 % de nos auxiliaires par an. Nos vétos partent à 18 mois. Notre marque employeur n'attire plus.",
    stats: "Enjeu transversal · Détection 60-90j · Coût 30-80k€",
    tone: "rose"
  }
] as const;

const profils = [
  { title: "Vétérinaire + Entrepreneur", desc: "DVM avec capacité de structuration business et appétence terrain.", example: "Nos vétérinaires Performance auditent 30 cliniques/an et génèrent +18 % de marge." },
  { title: "Sales B2B + Expertise scientifique", desc: "KAM avec compréhension réelle de la nutrition animale ou pharmacologie vétérinaire.", example: "Nos Head of Vets Channel parlent science avant de parler commerce." },
  { title: "M&A + Terrain vétérinaire", desc: "5-10 ans M&A qui aime la gestion de relations longues avec vétérinaires indépendants.", example: "Nos Responsables Développement closent 3-5 acquisitions/an." },
  { title: "Sales petfood + Canal GSS", desc: "Directeur Commercial avec maîtrise des animaleries, GSS, et négociations centrales d'achats.", example: "Nos Directeurs Commerciaux PME doublent le chiffre d'affaires en 24 mois." },
  { title: "DOP + Secteur santé animale", desc: "Directeur Opérations avec connaissance pharma / vétérinaire / formation B2B santé.", example: "Nos DOP comprennent les cycles laboratoires." },
  { title: "Coordinateur + Réseau multi-sites", desc: "5+ ans terrain avec maîtrise des relations vétérinaires associés et gestion projet.", example: "Nos Coordinateurs sont les yeux et oreilles des directions de groupements." }
];

const vocabulaire = {
  "Groupements vétérinaires": [
    "Délégué Vétérinaire", "Coordinateur Régional", "ASV référent", "Vétérinaire associé",
    "Cliniques canin/équin/mixte", "Performance clinique", "Plan d'audit clinique",
    "Onboarding post-rachat", "Conventions vétérinaires", "Ordre vétérinaire",
    "Indépendant vs salarié", "Acquisition de cliniques", "Earn-out", "Réseau franchisé"
  ],
  "Petfood multinationale": [
    "KAM Vets", "Salesforce Vets", "Vets Team Leads", "Field Strategy",
    "Vet Affairs", "KOL Relations", "GxP compliance", "DVM/Agronomy",
    "Affaires Réglementaires Animal Health"
  ],
  "Petfood PME premium": [
    "GSS", "Animaleries", "Centrales d'achats", "D2C", "Cleanlabel",
    "Cru/BARF", "Premium nutrition", "Distribution sélective", "Marketing direct"
  ]
};

const partnerLogos = [
  { name: "Affinity Petcare", src: "/images/partners/affinity-petcare.svg" },
  { name: "Saga Nutrition", src: "/images/partners/saga-nutrition.svg" },
  { name: "Qovetia", src: "/images/partners/qovetia.svg" },
  { name: "Wolf Learning", src: "/images/partners/wolf-learning.svg" },
  { name: "Faircraft.bio", src: "/images/partners/faircraft-bio.svg" },
  { name: "ConexSante", src: "/images/partners/conexsante.svg" },
  { name: "Roche Diagnostics", src: "/images/partners/roche-diagnostics.svg" },
  { name: "Beckman Coulter", src: "/images/partners/beckman-coulter.svg" },
  { name: "Miltenyi Biotec", src: "/images/partners/miltenyi-biotec.svg" },
  { name: "Biokar Diagnostics", src: "/images/partners/biokar-diagnostics.svg" },
  { name: "Mindray", src: "/images/partners/mindray.svg" },
  { name: "Visionix", src: "/images/partners/visionix.svg" }
];

const chiffresCles = [
  { value: "100+", label: "Placements" },
  { value: "10 j", label: "1re shortlist" },
  { value: "60 j", label: "Intake → Signature" },
  { value: "92 %", label: "Missions OK" }
];

const trustSignals = ["★ 4,5/5 Trustpilot", "France Biotech", "Saclay", "100+ placements"];

export default function AnimalHealthLanding() {
  return (
    <main className="bg-white">
      {/* ===== Section 1 - HERO ===== */}
      <section className="relative bg-gradient-to-b from-brand-mint/30 to-white pb-12 pt-12 sm:pb-16 sm:pt-20">
        <div className="container-shell">
          <p className="eyebrow">Executive Search · Animal Health</p>
          <h1 className="t-display-l">
            Combien de jours par mois passez-vous à comprendre ce qui se passe vraiment dans{" "}
            <span className="italic text-brand-teal">vos cliniques</span> ?
          </h1>
          <div className="mt-4 max-w-2xl space-y-1.5 t-body">
            <p>Combien d'opportunités d'acquisition manquées faute de pipeline structuré ?</p>
            <p>Combien d'appels entrants ratés transformés en clients perdus ?</p>
          </div>
          <p className="mt-5 max-w-2xl t-body-l font-medium text-brand-ink">
            Vos process RH ne suivent plus votre développement.{" "}
            <span className="text-brand-teal">Chez SKS Talents, nos agents IA, oui.</span>
          </p>
          <p className="mt-3 max-w-2xl t-body">
            Pour les groupements de cliniques vétérinaires en consolidation et les marques petfood
            (multinationales et PME premium) en hyper-croissance. 4 enjeux structurels.{" "}
            4 agents IA sectoriels. ROI mesuré sur vos propres données.
          </p>

          <div className="mt-6 max-w-md rounded-3xl border border-brand-teal/15 bg-white px-5 py-4 shadow-sm">
            <p className="text-eyebrow font-semibold uppercase text-brand-teal">Pourquoi SKS Talents</p>
            <p className="mt-2 text-caption text-brand-stone">
              Expertise depuis plus de 8 ans en recrutement Animal Health · 100+ placements · 4,5/5
              sur Trustpilot · Membre France Biotech · Présent dans 6 pays.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 t-body font-semibold text-white transition hover:opacity-90"
            >
              Voir la démo ↓
            </a>
            <CalendlyButton label="Réserver 15 min →" tone="outline" />
          </div>
        </div>
      </section>

      {/* ===== Section 2 - DÉMO ===== */}
      <section id="demo" className="bg-white py-14 sm:py-20">
        <div className="container-shell">
          <p className="eyebrow">Démo interactive · 30 secondes</p>
          <h2 className="t-h1 max-w-3xl font-display">
            Passer de 3 jours à <span className="italic text-brand-teal">4 minutes</span> de reporting mensuel.
          </h2>
          <p className="mt-3 max-w-3xl t-body">
            C'est ce qu'on a mis en place chez un groupement vétérinaire.
          </p>
          <div className="mt-8">
            <DemoStage
              sector="animal_health"
              scenes={animalHealthScenes}
              totalSeconds={30}
              ariaLabel="Démo interactive Agent Reporting Multi-Sites"
            />
          </div>
        </div>
      </section>

      {/* ===== Section 3 - ENJEUX × AGENTS IA (fusion, redesign 2026-05-07) ===== */}
      <section className="bg-gradient-to-b from-white via-brand-mint/8 to-white py-14 sm:py-20">
        <div className="container-shell">
          <p className="eyebrow">Vos enjeux → Notre réponse IA</p>
          <h2 className="t-h1 max-w-3xl font-display">
            4 enjeux dirigeants.{" "}
            <span className="italic text-brand-teal">4 agents IA</span> qui y répondent.
          </h2>
          <p className="mt-3 max-w-3xl t-body">
            À gauche, la phrase qu'on entend. À droite, l'agent IA qui transforme la situation, avec son ROI mesuré.
          </p>
          <div className="mt-12 space-y-8">
            {enjeuxAvecAgents.map(({ enjeux, agent }, index) => {
              const { Icon } = agent;
              return (
                <article
                  key={agent.title}
                  className="group relative grid gap-5 sm:grid-cols-[1fr_auto_1.15fr] sm:items-stretch sm:gap-0"
                >
                  {/* Enjeu(x) - fond crème, peut contenir 1 ou 2 enjeux */}
                  <div className="relative overflow-hidden rounded-3xl bg-[#faf7f1] p-6 sm:rounded-r-none sm:p-7">
                    <div className="flex items-baseline gap-3">
                      <div className="flex items-baseline gap-1">
                        {enjeux.map((e, i) => (
                          <span
                            key={e.num}
                            className={`font-display text-[44px] leading-none sm:text-[52px] ${
                              e.tone === "amber"
                                ? "text-amber-700"
                                : e.tone === "yellow"
                                  ? "text-yellow-700"
                                  : "text-brand-teal"
                            } ${i > 0 ? "ml-1 text-[28px] sm:text-[32px]" : ""}`}
                          >
                            {i === 0 ? e.num : `+${e.num}`}
                          </span>
                        ))}
                      </div>
                      <span className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-stone/70">
                        {enjeux.length > 1 ? "Enjeux" : "Enjeu"}
                      </span>
                    </div>
                    <div className="mt-4 space-y-4">
                      {enjeux.map((e) => (
                        <div key={e.num}>
                          <p className="t-h3 font-semibold text-brand-ink">{e.title}</p>
                          <blockquote className="mt-2 border-l-2 border-brand-teal/30 pl-4">
                            <p className="font-display italic t-body text-brand-stone">"{e.quote}"</p>
                          </blockquote>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Connecteur desktop */}
                  <div className="hidden flex-col items-center justify-center px-2 sm:flex">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-eyebrow font-semibold uppercase tracking-[0.22em] text-brand-teal/70">
                        Transformation
                      </span>
                      <span aria-hidden="true" className="text-3xl text-brand-teal">→</span>
                    </div>
                  </div>
                  {/* Connecteur mobile */}
                  <div aria-hidden="true" className="flex flex-col items-center sm:hidden">
                    <span className="h-6 w-px bg-brand-teal/40" />
                    <span className="text-2xl text-brand-teal">↓</span>
                  </div>

                  {/* Solution - agent IA */}
                  <div className="relative flex flex-col overflow-hidden rounded-3xl border border-brand-teal/15 bg-white shadow-[0_18px_44px_rgba(15,58,60,0.08)] transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_24px_56px_rgba(15,58,60,0.12)] sm:rounded-l-none">
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-3">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-mint/60 to-brand-mint/30 text-brand-teal">
                          <Icon size={22} />
                        </span>
                        {agent.badge && (
                          <span className="rounded-full bg-brand-ink px-3 py-1 text-eyebrow font-semibold uppercase tracking-[0.18em] text-white">
                            {agent.badge}
                          </span>
                        )}
                      </div>
                      <p className="mt-4 t-h3 font-semibold text-brand-ink">{agent.title}</p>
                      <p className="mt-2 t-body">{agent.desc}</p>
                    </div>
                    <div className="border-t border-brand-teal/15 bg-gradient-to-r from-brand-teal to-brand-teal/85 px-6 py-3 sm:px-7">
                      <div className="flex items-baseline gap-3">
                        <span className="text-eyebrow font-semibold uppercase tracking-[0.22em] text-white/70">
                          ROI
                        </span>
                        <span className="font-display text-sm font-semibold text-white sm:text-base">
                          {agent.note}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Step counter */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-4 left-6 hidden rounded-full border border-brand-teal/15 bg-white px-3 py-1 text-eyebrow font-semibold uppercase tracking-[0.22em] text-brand-stone/60 shadow-sm sm:inline-block"
                  >
                    {String(index + 1).padStart(2, "0")} / {String(enjeuxAvecAgents.length).padStart(2, "0")}
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Section 4 - DIAGNOSTIC (remonté du #10) ===== */}
      <section id="diagnostic" className="scroll-mt-24 bg-gradient-to-b from-brand-mint/15 to-white py-14 sm:py-20">
        <div className="container-shell">
          <p className="eyebrow">Diagnostic personnalisé · 5 min</p>
          <h2 className="t-h1 max-w-3xl font-display">Quel agent IA déployer en premier ?</h2>
          <p className="mt-3 max-w-3xl t-body">
            5 questions ciblées. Résultat immédiat. 3 priorités personnalisées.
          </p>
          <div className="mt-8 max-w-2xl">
            <DiagnosticForm sector="animal-health" questions={animalHealthQuestions} />
          </div>
        </div>
      </section>

      {SHOW_DETAIL_BLOCKS && (
        <>
          {/* ===== Section 4 - 4 MOMENTS CRITIQUES ===== */}
          <section className="bg-gradient-to-b from-brand-mint/15 to-white py-14 sm:py-20">
            <div className="container-shell">
              <p className="eyebrow">Les moments où nos clients nous appellent</p>
              <h2 className="t-h1 max-w-3xl font-display">4 moments business critiques. Notre terrain de jeu.</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {moments.map((m) => {
                  const accent: Record<string, string> = {
                    emerald: "border-emerald-200 bg-emerald-50",
                    blue: "border-blue-200 bg-blue-50",
                    amber: "border-amber-200 bg-amber-50",
                    rose: "border-rose-200 bg-rose-50"
                  };
                  return (
                    <article key={m.title} className={`rounded-3xl border p-6 ${accent[m.tone]}`}>
                      <p className="t-h3 font-semibold">{m.title}</p>
                      <p className="mt-3 font-display italic t-body text-brand-ink">"{m.quote}"</p>
                      <p className="mt-4 text-caption font-semibold text-brand-stone">{m.stats}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ===== Section 5 - PROFILS HYBRIDES ===== */}
          <section className="bg-white py-14 sm:py-20">
            <div className="container-shell">
              <p className="eyebrow">Notre vraie spécialité</p>
              <h2 className="t-h1 max-w-3xl font-display">
                Les profils hybrides que personne ne sait trouver.
              </h2>
              <p className="mt-3 max-w-3xl t-body">
                Notre méthode : croiser 2 ou 3 compétences rares pour trouver le profil que vos
                concurrents cherchent encore dans 6 mois.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {profils.map((p) => (
                  <article key={p.title} className="rounded-3xl border border-brand-teal/10 bg-white p-5 shadow-sm">
                    <p className="t-h3 font-semibold uppercase tracking-wide text-brand-ink">{p.title}</p>
                    <p className="mt-2 t-body">{p.desc}</p>
                    <p className="mt-3 rounded-2xl bg-brand-mint/30 px-3 py-2 text-caption text-brand-stone">
                      {p.example}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ===== Section 6 - VOCABULAIRE ===== */}
          <section className="bg-gradient-to-b from-white to-brand-mint/15 py-14 sm:py-20">
            <div className="container-shell">
              <p className="eyebrow">Le vocabulaire que nous maîtrisons</p>
              <h2 className="t-h1 max-w-3xl font-display">
                Pour vous, ces termes ne sont pas du jargon.{" "}
                <span className="italic text-brand-teal">Pour la concurrence, oui.</span>
              </h2>
              <div className="mt-8 space-y-6">
                {Object.entries(vocabulaire).map(([category, terms]) => (
                  <div key={category}>
                    <p className="text-eyebrow font-semibold uppercase tracking-wide text-brand-stone/80">
                      {category}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {terms.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-brand-teal/15 bg-white px-3 py-1.5 text-caption text-brand-stone"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ===== Section 5 - LOGOS DÉFILANTS ===== */}
      <section className="bg-gradient-to-b from-white to-brand-mint/15 py-14 sm:py-20">
        <div className="container-shell">
          <p className="eyebrow">Références &amp; exécution</p>
          <h2 className="t-h1 max-w-3xl font-display">
            Des marques reconnues. Des scale-ups ambitieuses.
          </h2>
          <p className="mt-3 max-w-3xl t-body">
            Cas lisibles · Exécution rigoureuse · Confidentialité respectée.
          </p>
          <div className="mt-8">
            <LogosScrollCarousel logos={partnerLogos} ariaLabel="Logos partenaires Animal Health" />
          </div>
        </div>
      </section>

      {/* ===== Section 9 - CHIFFRES CLÉS ===== */}
      <section className="bg-white py-14 sm:py-20">
        <div className="container-shell">
          <p className="eyebrow">Chiffres clés</p>
          <h2 className="t-h1 max-w-3xl font-display">Notre activité en transparence.</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {chiffresCles.map((c) => (
              <div key={c.label} className="rounded-3xl border border-brand-teal/10 bg-brand-mint/15 p-5 text-center">
                <p className="font-display text-[28px] leading-none text-brand-teal sm:text-[36px]">
                  {c.value}
                </p>
                <p className="mt-2 text-caption text-brand-stone">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 7 - CTA FINAL ===== */}
      <section className="bg-brand-ink py-14 text-white sm:py-20">
        <div className="container-shell">
          <p className="text-eyebrow font-semibold uppercase text-white/60">Dernière étape</p>
          <h2 className="t-h1 mt-2 max-w-3xl font-display text-white">
            Quel agent IA{" "}
            <span className="italic text-brand-mint">déployer en premier</span> ?
          </h2>
          <p className="mt-3 max-w-2xl text-white/70 t-body">
            15 min avec Georges Kengue. ROI projeté chiffré sur 6 mois. Pas de pitch commercial.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CalendlyButton label="Réserver mes 15 min →" tone="solid" />
            <Link
              href="#diagnostic"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-4 t-body font-semibold text-white transition hover:bg-white/10"
            >
              Diagnostic
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-caption text-white/50">
            {trustSignals.map((s) => (
              <li key={s} className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
