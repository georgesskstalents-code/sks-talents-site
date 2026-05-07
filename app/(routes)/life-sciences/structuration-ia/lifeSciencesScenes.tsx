import type { DemoScene } from "@/components/landings/DemoStage";

/**
 * 4 scènes pour la démo Life Sciences "Agent CEO Copilot stratégique".
 * Témoignage anonymisé : "CEO biotech Series B, oncologie".
 * Total : 30 secondes (5 + 8 + 10 + 7). Tap droite/gauche pour naviguer.
 */
export const lifeSciencesScenes: DemoScene[] = [
  // -------------------------------------------------- Scène 1 — Hook (5s)
  {
    id: "ls-hook",
    durationMs: 5000,
    render: () => (
      <div className="flex h-full flex-col items-start justify-center bg-brand-ink px-6 py-8 text-white sm:px-12 sm:py-12">
        <p className="text-eyebrow font-semibold uppercase text-brand-mint/70">
          Scène 1 · CEO biotech Series B · Oncologie
        </p>
        <p className="mt-4 max-w-2xl font-display text-[24px] leading-tight sm:text-[32px]">
          Avant chaque board, je passais{" "}
          <span className="rounded bg-red-500/30 px-1.5 py-0.5">2 jours</span> à compiler mes
          données talent et anticiper mes besoins en équipe.
        </p>
        <p className="mt-4 text-[18px] text-white/85 sm:text-[22px]">
          Maintenant, mon copilot le fait en{" "}
          <span className="font-semibold text-emerald-300">5 minutes</span>.
        </p>
        <p className="mt-3 text-caption text-white/60">
          Et il anticipe mes besoins 6 mois à l'avance.
        </p>
      </div>
    )
  },

  // -------------------------------------------------- Scène 2 — Avant (8s)
  {
    id: "ls-before",
    durationMs: 8000,
    render: () => (
      <div className="flex h-full flex-col bg-white px-6 py-6 sm:px-8 sm:py-8">
        <div className="mb-4 inline-flex items-center gap-2 self-start rounded-full bg-red-50 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-eyebrow font-semibold uppercase text-red-700">Avant</span>
        </div>
        <h4 className="t-h2 font-display">5 sources, 3 jours, décisions tardives</h4>
        <p className="mt-2 italic font-display t-body">
          "5 sources de données. 3 jours pour comprendre. 2 heures pour décider."
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {[
            { label: "Notion R&D pipeline", count: "47 projets", note: "Statuts épars", tone: "red" },
            { label: "Excel ressources", count: "89 lignes", note: "Format daté", tone: "red" },
            { label: "Greenhouse ATS", count: "23 postes", note: "Mal hiérarchisés", tone: "amber" },
            { label: "Slack équipes", count: "12 alertes", note: "Burnout détecté tard", tone: "amber" }
          ].map((c) => (
            <div
              key={c.label}
              className={`rounded-2xl border p-3 ${c.tone === "red" ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"}`}
            >
              <p className="text-caption font-semibold text-brand-ink">{c.label}</p>
              <p className="mt-0.5 t-h3 font-semibold">{c.count}</p>
              <p className="text-caption text-brand-stone">{c.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-red-200 bg-white p-3">
          <ul className="space-y-1.5 text-caption">
            <li className="flex justify-between"><span>Lundi · Extraction 5 sources</span><span className="font-mono font-semibold">4h</span></li>
            <li className="flex justify-between"><span>Mardi · Recoupement roadmap R&D</span><span className="font-mono font-semibold">6h</span></li>
            <li className="flex justify-between"><span>Mercredi · Construction slides</span><span className="font-mono font-semibold">6h</span></li>
            <li className="flex justify-between border-t border-red-200 pt-1.5"><span className="font-semibold text-red-700">Total / board</span><span className="font-mono font-bold text-red-700">2 jours</span></li>
          </ul>
        </div>

        <p className="mt-3 rounded-2xl border border-red-200 bg-red-50 p-3 text-caption text-red-700">
          ⚠ Décision Head of CMC prise 4 mois trop tard. Phase II retardée 6 mois. Coût opportunité : 8 M€.
        </p>
      </div>
    )
  },

  // -------------------------------------------------- Scène 3 — Après (10s)
  {
    id: "ls-after",
    durationMs: 10000,
    render: () => (
      <div className="flex h-full flex-col bg-white px-6 py-6 sm:px-8 sm:py-8">
        <div className="mb-3 inline-flex items-center gap-2 self-start rounded-full bg-emerald-50 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-eyebrow font-semibold uppercase text-emerald-700">Après</span>
        </div>
        <h4 className="t-h2 font-display">Talent Intelligence · 5 minutes pour le board</h4>

        {/* Dashboard header */}
        <div className="mt-3 flex items-center justify-between rounded-t-2xl bg-brand-ink px-4 py-2.5 text-white">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-caption font-semibold">SKS CEO Copilot · Talent Intelligence</span>
          </div>
          <span className="text-caption text-white/60">Ready · Board pack</span>
        </div>

        <div className="space-y-3 rounded-b-2xl border border-t-0 border-brand-teal/15 bg-white p-3">
          {/* Module 1 */}
          <div className="rounded-xl border border-brand-teal/15 p-3">
            <p className="text-eyebrow font-semibold uppercase text-brand-teal">
              Pipeline R&D × Talent
            </p>
            <ul className="mt-2 space-y-1 text-caption">
              <li className="flex justify-between"><span>Phase II · Programme A</span><span className="font-semibold text-emerald-700">CMC ✓</span></li>
              <li className="flex justify-between"><span>Phase I · Programme B</span><span className="font-semibold text-amber-700">VP Reg · 3 mois</span></li>
              <li className="flex justify-between"><span>Pre-clinical · Programme C</span><span className="font-semibold text-emerald-700">Lab manager OK</span></li>
              <li className="flex justify-between"><span>Pre-clinical · Programme D</span><span className="font-semibold text-red-700">Director Industrialisation · 6 mois</span></li>
            </ul>
          </div>

          {/* Module 2 */}
          <div className="rounded-xl border border-brand-teal/15 p-3">
            <p className="text-eyebrow font-semibold uppercase text-brand-teal">Anticipation 6 mois</p>
            <div className="mt-2 grid grid-cols-3 gap-1">
              {["Q3", "Q4", "Q1 27"].map((q) => (
                <div key={q} className="rounded-lg bg-brand-mint/40 p-2 text-center text-caption">
                  <p className="font-mono text-eyebrow font-semibold uppercase text-brand-teal">{q}</p>
                  <p className="mt-1 font-semibold text-brand-ink">2 hires</p>
                </div>
              ))}
            </div>
          </div>

          {/* Module 3 */}
          <div className="rounded-xl border border-brand-teal/15 bg-brand-mint/15 p-3">
            <p className="text-eyebrow font-semibold uppercase text-brand-teal">
              Rapport investisseurs · auto
            </p>
            <p className="mt-1 text-caption text-brand-stone">
              Talent KPIs Q2 2026 · Time-to-fill 38j · Turnover senior 8 % · Pipeline 14 hires anticipés
            </p>
          </div>
        </div>

        <p className="mt-4 rounded-2xl bg-brand-mint/40 p-3 text-center font-display italic t-body text-brand-teal">
          2 jours → 5 minutes <span className="block sm:inline">+6 mois d'anticipation</span>
        </p>
      </div>
    )
  },

  // -------------------------------------------------- Scène 4 — Témoignage (7s)
  {
    id: "ls-testimonial",
    durationMs: 7000,
    render: () => (
      <div className="flex h-full flex-col items-center justify-center bg-white px-6 py-6 text-center sm:px-12">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-mint text-2xl font-semibold text-brand-teal">
          ML
        </div>
        <p className="mt-3 t-h3 font-semibold">CEO · Co-fondatrice</p>
        <p className="text-caption text-brand-stone">Biotech oncologie · Series B 32 M€ · 110 employés</p>

        <p className="mt-5 max-w-md font-display italic t-body text-brand-ink">
          "Le copilot CEO a changé ma façon de présenter au board. Je ne subis plus mes
          recrutements, je les anticipe. Mes investisseurs voient enfin la talent strategy
          comme un asset, pas comme un risque."
        </p>

        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-mint/40 px-3 py-1.5 text-caption font-semibold text-brand-teal">
          ✓ Series C levée +45 % en 8 mois
        </span>
      </div>
    )
  }
];
