"use client";

import Link from "next/link";
import { Compass, Sparkles, TrendingUp, Users } from "lucide-react";
import CalendlyButton from "@/components/CalendlyButton";
import { StructurationHero } from "@/components/sections/StructurationHero";
import DemoStage from "@/components/landings/DemoStage";
import DiagnosticForm from "@/components/landings/DiagnosticForm";
import LogosScrollCarousel from "@/components/landings/LogosScrollCarousel";
import { lifeSciencesScenes } from "./lifeSciencesScenes";
import { lifeSciencesQuestions } from "./lifeSciencesQuestions";

// Hide 3 detail blocks (3 moments critiques, profils hybrides, vocabulaire) - page allégée.
// Repasser à true pour les ré-afficher sans toucher au code des sections.
const SHOW_DETAIL_BLOCKS = false;

// Pairs each CEO enjeu with the IA agent that solves it. Replaces the
// previously separated "6 enjeux" + "6 agents" sections by a single
// side-by-side row layout (left: enjeu; right: agent IA + ROI).
type StandardItem = {
  variant?: "standard";
  enjeu: { num: string; title: string; quote: string; tone?: "amber" };
  agent: { Icon: typeof Compass; title: string; desc: string; note: string; badge?: string };
};

type FeatureItem = {
  variant: "feature";
  enjeu: {
    num: string;
    eyebrow: string;
    titleA: string;
    titleB: string;
    stats: { label: string; value: string; caption: string }[];
    quote: string;
  };
  agent: {
    Icon: typeof Compass;
    chipLabel: string;
    eyebrow: string;
    title: string;
    desc: string;
    badge?: string;
    roi: { label?: string; value: string }[];
  };
};

const enjeuxAvecAgents: (StandardItem | FeatureItem)[] = [
  {
    enjeu: { num: "01", title: "Reporting talent au board", quote: "Mon board me demande mes KPI talent en temps réel. Je leur sors un PowerPoint qui date d'il y a 3 mois." },
    agent: { Icon: Compass, title: "Agent CEO Copilot stratégique", desc: "Connecte roadmap R&D + ATS + données financières. Anticipe besoins talent 6 mois à l'avance. Génère vos board packs auto.", note: "+6 mois d'anticipation · Board pack en 5 min", badge: "DÉMO" }
  },
  {
    variant: "feature",
    enjeu: {
      num: "02",
      eyebrow: "Enjeu terrain",
      titleA: "Recruter coûte cher.",
      titleB: "Recruter mal coûte plus.",
      stats: [
        { label: "Burn mensuel", value: "180-250 k€", caption: "masse salariale sur la roadmap" },
        { label: "Échec recrutement", value: "~12 mois", caption: "perdus à chaque départ précoce" }
      ],
      quote: "Junior, manager ou C-level : si on rate l'onboarding, on redémarre."
    },
    agent: {
      Icon: Users,
      chipLabel: "Agents B + D",
      eyebrow: "Duo agents IA SKS",
      title: "Talent Intelligence & Rétention",
      desc: "Optimise vos recrutements alignés roadmap. Pilote l'onboarding 90 jours sur toute l'équipe, du junior au C-level. Détecte les signaux faibles de désengagement avant qu'ils ne deviennent des départs.",
      badge: "NOUVEAU",
      roi: [
        { label: "ROI mesuré", value: "-50 % time-to-fill" },
        { value: "-60 % turnover" },
        { label: "Déploiement", value: "4 semaines" }
      ]
    }
  },
  {
    enjeu: { num: "03", title: "Scale Series B/C", quote: "50 → 200 employés en 24 mois. Process datant de 15 employés.", tone: "amber" },
    agent: { Icon: TrendingUp, title: "Agent Scale-up Playbook", desc: "Bibliothèque vivante de process RH, templates et benchmarks par phase de croissance.", note: "Process scaling Series A → C" }
  }
];

const moments = [
  {
    title: "Industrialisation medtech",
    quote:
      "Nous passons du prototype à la production. Notre CTO doit comprendre les bioprocédés OU l'électronique ET le scale industriel ET les normes médicales.",
    stats: "1 mission flagship · Tech Lead 5+ ans · Fixe + BSPCE",
    tone: "emerald"
  },
  {
    title: "Scale deeptech biomatériaux",
    quote:
      "Nous fabriquons un nouveau matériau. Nous avons besoin d'un Head of Engineering qui maîtrise les bioprocédés ET le scale industriel.",
    stats: "2 missions · MSc/PhD 10+ ans · 50-180 k€",
    tone: "blue"
  },
  {
    title: "Anticipation recrutements biotech",
    quote:
      "Quand on passe Phase II, j'ai besoin de mon Head of Clinical Ops 6 mois avant. Quand on prépare notre Series C, je dois prouver ma talent strategy à mes investisseurs.",
    stats: "Enjeu transversal · Anticipation 6 mois · 100-200 k€ + BSPCE",
    tone: "amber"
  }
] as const;

const profils = [
  { title: "PhD Ingénierie + Startup deeptech", desc: "MSc/PhD bioprocédés ou ingénierie avec mindset startup.", example: "Nos Head of Engineering passent du papier au pilote en 18 mois." },
  { title: "Tech Lead + Normes medtech", desc: "CTO électronique avec maîtrise de la conformité ISO 13485, MDR, IVDR.", example: "Nos CTO sont fiables pour passer les normes médicales sans bloquer l'innovation." },
  { title: "Lab Manager + Biotech startup", desc: "Bac+5 biotech avec leadership opérationnel en environnement startup hyper-croissance.", example: "Nos Lab Managers structurent les R&D sans alourdir." },
  { title: "Head of CMC + Phase clinique", desc: "Director CMC avec passage Phase II/III réussi.", example: "Nos Head of CMC garantissent la roadmap clinique sur 24 mois." },
  { title: "VP Regulatory + Stratégie business", desc: "Director Regulatory avec vision stratégique des parcours d'enregistrement.", example: "Nos VP Regulatory accélèrent le marquage CE de 12 à 6 mois." },
  { title: "Director Industrialisation + Startup", desc: "Director Manufacturing avec capacité à passer du prototype au pilote industriel.", example: "Nos Directors Industrialization livrent les premiers lots commerciaux en 18 mois." }
];

const vocabulaire = {
  "Biotech": [
    "Head of CMC", "Director Clinical Operations", "VP Regulatory",
    "Phase I/II/III", "Bioprocédés", "GMP/GLP", "ANSM", "EMA", "FDA",
    "Marquage CE", "IND/NDA", "Therapeutics oncology", "Cell therapy",
    "Bpifrance", "French Tech"
  ],
  "Medtech": [
    "Dispositifs médicaux", "ISO 13485", "MDR / IVDR",
    "Conception électronique", "Industrialisation", "IEC 60601",
    "Notified Body", "Class IIa/IIb/III", "BSPCE", "Levée Series A/B"
  ],
  "Deeptech biomatériaux": [
    "PhD ingénierie", "Bioprocédés", "Scale-up production",
    "Lab biologie cellulaire", "Cellules souches", "Bioréacteurs", "Bpifrance"
  ],
  "E-santé": [
    "Telemedicine", "SaaS B2B santé", "IA santé", "DTx",
    "RGPD santé", "HDS hébergement", "CE marking software", "DMD",
    "CMO", "ARS", "CNIL"
  ]
};

const partnerLogos = [
  { name: "Faircraft.bio", src: "/images/partners/faircraft-bio.svg" },
  { name: "Roche Diagnostics", src: "/images/partners/roche-diagnostics.svg" },
  { name: "Beckman Coulter", src: "/images/partners/beckman-coulter.svg" },
  { name: "Miltenyi Biotec", src: "/images/partners/miltenyi-biotec.svg" },
  { name: "Biokar Diagnostics", src: "/images/partners/biokar-diagnostics.svg" },
  { name: "Solabia", src: "/images/partners/solabia.svg" },
  { name: "Mindray", src: "/images/partners/mindray.svg" },
  { name: "Visionix", src: "/images/partners/visionix.svg" },
  { name: "ELITechGroup", src: "/images/partners/elitechgroup.svg" },
  { name: "Eurofins", src: "/images/partners/eurofins.svg" },
  { name: "Microline Surgical", src: "/images/partners/microline-surgical.svg" },
  { name: "ConexSante", src: "/images/partners/conexsante.svg" }
];

const chiffresCles = [
  { value: "100+", label: "Placements" },
  { value: "10 j", label: "1re shortlist" },
  { value: "60 j", label: "Intake → Signature" },
  { value: "92 %", label: "Missions OK" }
];

const trustSignals = ["★ 4,5/5 Trustpilot", "France Biotech", "Saclay", "100+ placements"];

export default function LifeSciencesLanding() {
  return (
    <main className="bg-white">
      {/* ===== Section 1 - HERO (StructurationHero) ===== */}
      <StructurationHero
        vertical="life-sciences"
        eyebrow="Executive Search  ·  Life Sciences"
        headlineLines={[
          "Combien de mois d'avance",
          "avez-vous sur votre prochain",
          "hire stratégique ?"
        ]}
        question={{
          thematicLabel: "Le copilot IA qui transforme vos board meetings",
          questionText:
            "Pourquoi vos décisions stratégiques talents reposent-elles encore sur des données fragmentées ?",
          answer: "Peut-être parce que vos ",
          answerHighlight: "KPIs talents sont éparpillés dans plusieurs outils",
          italicPhrase:
            " et que chaque board mobilise des heures de retraitement manuel. Quand l'information circule mal, le pilotage devient plus lent qu'il ne devrait.",
          punchline: "Et si vos boards reposaient sur une lecture en temps réel ?"
        }}
        constat={{
          line1Prefix: "Vos process talent ",
          line1Bold: "ne suivent plus",
          line1Suffix: " votre croissance.",
          line2Italic: "Chez SKS Talents, notre CEO Copilot, oui."
        }}
        response={{
          cibleBold: "Pour les CEO biotech, medtech, deeptech et e-santé",
          cibleSuffix: " en industrialisation Series A à C.",
          description:
            "Anticipez vos recrutements stratégiques selon l'évolution de vos programmes.",
          enjeux: "3 enjeux structurels",
          agents: "4 agents IA sectoriels",
          agentsDetail: "(Talent Intelligence + Rétention)",
          roi: "ROI mesuré sur vos propres données."
        }}
        pourquoiSKS="8 ans d'expertise  ·  Commission RH France Biotech  ·  100+ placements  ·  4,5/5 Trustpilot"
      />

      {/* ===== Section 2 - DÉMO ===== */}
      <section id="demo" className="bg-white py-14 sm:py-20">
        <div className="container-shell">
          <p className="eyebrow">Démo interactive · 30 secondes</p>
          <h2 className="t-h1 max-w-3xl font-display">
            Le copilot IA qui transforme{" "}
            <span className="italic text-brand-teal">vos board meetings</span>.
          </h2>
          <p className="mt-3 max-w-3xl t-body">
            Une CEO biotech Series B en oncologie anticipe ses recrutements 6 mois à l'avance et
            reporte au board en 5 minutes. Voici comment.
          </p>
          <div className="mt-8">
            <DemoStage
              sector="life_sciences"
              scenes={lifeSciencesScenes}
              totalSeconds={30}
              ariaLabel="Démo interactive Agent CEO Copilot stratégique"
            />
          </div>
        </div>
      </section>

      {/* ===== Section 3 - ENJEUX × AGENTS IA (fusion, redesign 2026-05-07) ===== */}
      <section className="bg-gradient-to-b from-white via-brand-mint/8 to-white py-14 sm:py-20">
        <div className="container-shell">
          <p className="eyebrow">Vos enjeux → Notre réponse IA</p>
          <h2 className="t-h1 max-w-3xl font-display">
            3 enjeux dirigeants.{" "}
            <span className="italic text-brand-teal">4 agents IA</span> qui y répondent.
          </h2>
          <p className="mt-3 max-w-3xl t-body">
            À gauche, la phrase qu'on entend. À droite, l'agent IA qui transforme la situation, avec son ROI mesuré.
          </p>
          <div className="mt-12 space-y-8">
            {enjeuxAvecAgents.map((item, index) => {
              const counter = `${String(index + 1).padStart(2, "0")} / ${String(enjeuxAvecAgents.length).padStart(2, "0")}`;

              if (item.variant === "feature") {
                const { enjeu, agent } = item;
                const { Icon } = agent;
                return (
                  <article
                    key={enjeu.num}
                    className="group relative grid gap-5 overflow-hidden rounded-3xl border border-brand-teal/15 bg-white shadow-[0_22px_56px_rgba(15,58,60,0.08)] sm:grid-cols-[1fr_auto_1.15fr] sm:items-stretch sm:gap-0"
                  >
                    {/* Counter chip top-left */}
                    <span className="absolute left-5 top-5 rounded-full border border-brand-teal/15 bg-[#faf7f1] px-3 py-1 text-eyebrow font-semibold uppercase tracking-[0.22em] text-brand-stone/70 sm:left-7 sm:top-7">
                      {counter}
                    </span>

                    {/* LEFT - enjeu */}
                    <div className="relative overflow-hidden bg-[#faf7f1] p-6 pt-16 sm:p-10 sm:pt-20">
                      <p className="text-eyebrow font-semibold uppercase tracking-[0.22em] text-amber-700/80">
                        {enjeu.eyebrow}
                      </p>
                      <h3 className="mt-4 font-display text-[34px] leading-[1.05] text-brand-ink sm:text-[44px]">
                        {enjeu.titleA}
                        <br />
                        <span className="italic text-brand-teal">{enjeu.titleB}</span>
                      </h3>

                      <div className="mt-7 grid gap-5 sm:grid-cols-2">
                        {enjeu.stats.map((s) => (
                          <div key={s.label}>
                            <p className="text-eyebrow font-semibold uppercase tracking-[0.2em] text-brand-stone/70">
                              {s.label}
                            </p>
                            <p className="mt-2 font-display text-[32px] leading-none text-brand-ink sm:text-[38px]">
                              {s.value}
                            </p>
                            <p className="mt-2 text-caption text-brand-stone">{s.caption}</p>
                          </div>
                        ))}
                      </div>

                      <blockquote className="mt-7 border-l-2 border-brand-teal/40 pl-4">
                        <p className="font-display italic t-body text-brand-stone">
                          « {enjeu.quote} »
                        </p>
                      </blockquote>
                    </div>

                    {/* CENTER - connector */}
                    <div className="hidden flex-col items-center justify-center gap-3 px-2 sm:flex">
                      <span className="h-full w-px border-l border-dashed border-brand-teal/30" aria-hidden />
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-teal text-2xl text-white shadow-[0_10px_24px_rgba(15,58,60,0.18)]">
                        ›
                      </span>
                      <p className="text-eyebrow font-semibold uppercase tracking-[0.22em] text-brand-teal/80">
                        Transformation
                      </p>
                      <p className="font-display italic text-sm text-brand-stone">par SKS Talents</p>
                      <span className="h-full w-px border-l border-dashed border-brand-teal/30" aria-hidden />
                    </div>
                    <div aria-hidden="true" className="flex flex-col items-center sm:hidden">
                      <span className="h-6 w-px bg-brand-teal/40" />
                      <span className="text-2xl text-brand-teal">↓</span>
                    </div>

                    {/* RIGHT - duo agents */}
                    <div className="relative flex flex-col bg-white p-6 pt-16 sm:p-10 sm:pt-20">
                      <span className="absolute left-5 top-5 rounded-full border border-brand-teal/30 bg-brand-mint/60 px-3 py-1 text-eyebrow font-semibold uppercase tracking-[0.22em] text-brand-teal sm:left-10 sm:top-7">
                        {agent.chipLabel}
                      </span>
                      {agent.badge && (
                        <span className="absolute right-5 top-5 rounded-full bg-brand-ink px-3 py-1 text-eyebrow font-semibold uppercase tracking-[0.22em] text-white sm:right-10 sm:top-7">
                          {agent.badge}
                        </span>
                      )}

                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-mint/60 to-brand-mint/30 text-brand-teal">
                        <Icon size={22} />
                      </span>

                      <p className="mt-5 text-eyebrow font-semibold uppercase tracking-[0.22em] text-brand-teal/80">
                        {agent.eyebrow}
                      </p>
                      <h4 className="mt-2 font-display text-[28px] leading-[1.1] text-brand-ink sm:text-[36px]">
                        {agent.title}
                      </h4>
                      <p className="mt-4 t-body">{agent.desc}</p>

                      <div className="mt-auto pt-6">
                        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-brand-teal/20">
                          {agent.roi.map((r, i) => (
                            <div
                              key={`${r.value}-${i}`}
                              className="bg-gradient-to-r from-brand-teal to-brand-teal/85 px-4 py-4 text-white"
                            >
                              {r.label ? (
                                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
                                  {r.label}
                                </p>
                              ) : (
                                <span className="block h-[14px]" aria-hidden />
                              )}
                              <p className="mt-1 font-display text-base font-semibold leading-tight text-white sm:text-lg">
                                {r.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              }

              const { enjeu, agent } = item;
              const { Icon } = agent;
              return (
                <article
                  key={enjeu.num}
                  className="group relative grid gap-5 sm:grid-cols-[1fr_auto_1.15fr] sm:items-stretch sm:gap-0"
                >
                  {/* Problème - fond crème, citation prominente */}
                  <div className="relative overflow-hidden rounded-3xl bg-[#faf7f1] p-6 sm:rounded-r-none sm:p-7">
                    <div className="flex items-baseline gap-3">
                      <span
                        className={`font-display text-[44px] leading-none sm:text-[52px] ${
                          enjeu.tone === "amber" ? "text-amber-700" : "text-brand-teal"
                        }`}
                      >
                        {enjeu.num}
                      </span>
                      <span className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-stone/70">
                        Enjeu
                      </span>
                    </div>
                    <p className="mt-4 t-h3 font-semibold text-brand-ink">{enjeu.title}</p>
                    <blockquote className="mt-4 border-l-2 border-brand-teal/30 pl-4">
                      <p className="font-display italic t-body text-brand-stone">"{enjeu.quote}"</p>
                    </blockquote>
                  </div>

                  {/* Connecteur - flèche + label transformation */}
                  <div className="hidden flex-col items-center justify-center px-2 sm:flex">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-eyebrow font-semibold uppercase tracking-[0.22em] text-brand-teal/70">
                        Transformation
                      </span>
                      <span aria-hidden="true" className="text-3xl text-brand-teal">→</span>
                    </div>
                  </div>
                  {/* Connecteur mobile : ligne verticale + flèche bas */}
                  <div aria-hidden="true" className="flex flex-col items-center sm:hidden">
                    <span className="h-6 w-px bg-brand-teal/40" />
                    <span className="text-2xl text-brand-teal">↓</span>
                  </div>

                  {/* Solution - agent IA, fond blanc, ROI en bande teal */}
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
                    {/* ROI strip - bande teal en bas, métrique mise en valeur */}
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

                  {/* Step counter overlay (desktop only) */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-4 left-6 hidden rounded-full border border-brand-teal/15 bg-white px-3 py-1 text-eyebrow font-semibold uppercase tracking-[0.22em] text-brand-stone/60 shadow-sm sm:inline-block"
                  >
                    {counter}
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
            <DiagnosticForm sector="life-sciences" questions={lifeSciencesQuestions} />
          </div>
        </div>
      </section>

      {SHOW_DETAIL_BLOCKS && (
        <>
          {/* ===== Section 4 - 3 MOMENTS CRITIQUES ===== */}
          <section className="bg-gradient-to-b from-brand-mint/15 to-white py-14 sm:py-20">
            <div className="container-shell">
              <p className="eyebrow">Les moments où nos clients nous appellent</p>
              <h2 className="t-h1 max-w-3xl font-display">3 moments business critiques. Notre terrain de jeu Life Sciences.</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {moments.map((m) => {
                  const accent: Record<string, string> = {
                    emerald: "border-emerald-200 bg-emerald-50",
                    blue: "border-blue-200 bg-blue-50",
                    amber: "border-amber-200 bg-amber-50"
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
                Les profils hybrides Life Sciences que personne ne sait trouver.
              </h2>
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
            Ils nous ont fait confiance.
          </h2>
          <p className="mt-3 max-w-3xl t-body">
            Dans des moments où structurer et sécuriser les bons talents devient un enjeu de croissance.
          </p>
          <div className="mt-8">
            <LogosScrollCarousel logos={partnerLogos} ariaLabel="Logos partenaires Life Sciences" />
          </div>
        </div>
      </section>

      {/* ===== Section 6 - CHIFFRES CLÉS ===== */}
      <section className="bg-white py-14 sm:py-20">
        <div className="container-shell">
          <p className="eyebrow">Chiffres clés</p>
          <h2 className="t-h1 max-w-3xl font-display">Notre activité Life Sciences en transparence.</h2>
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
            Prêt à transformer votre talent strategy{" "}
            <span className="italic text-brand-mint">en avantage stratégique</span> ?
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
