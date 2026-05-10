import type { DemoScene } from "@/components/landings/DemoStage";

/**
 * 4 scènes pour la démo Animal Health "Agent Reporting Multi-Sites".
 * Témoignage anonymisé : "Cofondateur DG · Groupement vétérinaire 32 cliniques".
 * Total : 30 secondes (5 + 8 + 10 + 7). Tap droite/gauche pour naviguer.
 */
export const animalHealthScenes: DemoScene[] = [
  // -------------------------------------------------- Scène 1 - Hook (5s)
  {
    id: "ah-hook",
    durationMs: 5000,
    render: () => (
      <div className="flex h-full flex-col items-start justify-center bg-brand-ink px-6 py-8 text-white sm:px-12 sm:py-12">
        <p className="text-eyebrow font-semibold uppercase text-brand-mint/70">
          Scène 1 · Cofondateur DG · Groupement vétérinaire
        </p>
        <p className="mt-4 max-w-2xl font-display text-[24px] leading-tight sm:text-[32px]">
          Il y a 18 mois, je passais{" "}
          <span className="rounded bg-red-500/30 px-1.5 py-0.5">3 jours par mois</span> à
          comprendre ce qui se passait dans mes 32 cliniques.
        </p>
        <p className="mt-4 text-[18px] text-white/85 sm:text-[22px]">
          Aujourd'hui, ça me prend{" "}
          <span className="font-semibold text-emerald-300">4 minutes</span>.
        </p>
        <p className="mt-3 text-caption text-white/60">Je vous montre.</p>
      </div>
    )
  },

  // -------------------------------------------------- Scène 2 - Avant (8s)
  {
    id: "ah-before",
    durationMs: 8000,
    render: () => (
      <div className="flex h-full flex-col bg-white px-6 py-6 sm:px-8 sm:py-8">
        <div className="mb-4 inline-flex items-center gap-2 self-start rounded-full bg-red-50 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-eyebrow font-semibold uppercase text-red-700">Avant</span>
        </div>
        <h4 className="t-h2 font-display">L'enfer du reporting manuel</h4>
        <p className="mt-2 italic font-display t-body">
          "32 directeurs de cliniques. 32 formats différents. 0 vue d'ensemble."
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {[
            { label: "Excel", count: "12 fichiers", note: "Données figées", tone: "red" },
            { label: "Mails", count: "47", note: "Non lus", tone: "amber" },
            { label: "Slack", count: "12", note: "À traiter", tone: "amber" },
            { label: "WhatsApp", count: "8 voice notes", note: "Pas indexées", tone: "red" }
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
            <li className="flex justify-between"><span>Lundi · Compilation Excel</span><span className="font-mono font-semibold">8h</span></li>
            <li className="flex justify-between"><span>Mardi · Recoupement coordinatrice RH</span><span className="font-mono font-semibold">6h</span></li>
            <li className="flex justify-between"><span>Mercredi · Détection erreurs</span><span className="font-mono font-semibold">4h</span></li>
            <li className="flex justify-between border-t border-red-200 pt-1.5"><span className="font-semibold text-red-700">Total mensuel</span><span className="font-mono font-bold text-red-700">3 jours</span></li>
          </ul>
        </div>
      </div>
    )
  },

  // -------------------------------------------------- Scène 3 - Après (10s)
  {
    id: "ah-after",
    durationMs: 10000,
    render: () => (
      <div className="flex h-full flex-col bg-white px-6 py-6 sm:px-8 sm:py-8">
        <div className="mb-3 inline-flex items-center gap-2 self-start rounded-full bg-emerald-50 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-eyebrow font-semibold uppercase text-emerald-700">Après</span>
        </div>
        <h4 className="t-h2 font-display">Une seule source de vérité</h4>

        {/* Dashboard header */}
        <div className="mt-3 flex items-center justify-between rounded-t-2xl bg-brand-ink px-4 py-2.5 text-white">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-caption font-semibold">SKS Dashboard · Multi-sites</span>
          </div>
          <span className="text-caption text-white/60">Mis à jour il y a 2 min</span>
        </div>

        <div className="rounded-b-2xl border border-t-0 border-brand-teal/15 bg-white p-3">
          <p className="text-caption text-brand-stone">32 cliniques · vue temps réel</p>
          <div className="mt-2 grid grid-cols-8 gap-1 sm:grid-cols-16">
            {Array.from({ length: 32 }).map((_, i) => {
              const color = i < 28 ? "bg-emerald-500" : i < 31 ? "bg-amber-500" : "bg-red-500";
              return <span key={i} className={`h-3 w-3 rounded-sm ${color}`} aria-hidden />;
            })}
          </div>
          <p className="mt-2 text-caption text-brand-stone">● 28 OK | ● 3 alertes | ● 1 critique</p>

          <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-2.5">
            <p className="text-caption font-semibold text-red-700">Action requise · Lille · il y a 14 min</p>
            <p className="text-caption text-brand-stone">Turnover véto à 22 % (vs 8 % groupe). Recommandation : appeler la cofondatrice cette semaine.</p>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { label: "CA", val: "2.4M€", delta: "+12%", tone: "good" },
              { label: "Marge", val: "18.3%", delta: "+1.8pt", tone: "good" },
              { label: "Turnover", val: "11%", delta: "-3pt", tone: "good" }
            ].map((k) => (
              <div key={k.label} className="rounded-xl border border-emerald-200 bg-emerald-50 p-2">
                <p className="text-eyebrow font-semibold uppercase text-brand-stone/80">{k.label}</p>
                <p className="t-h3 font-semibold">{k.val}</p>
                <p className="text-caption font-semibold text-emerald-700">{k.delta}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 rounded-2xl bg-brand-mint/40 p-3 text-center font-display italic t-body text-brand-teal">
          3 jours → 4 minutes <span className="block sm:inline">+24 jours/an récupérés</span>
        </p>
      </div>
    )
  },

  // -------------------------------------------------- Scène 4 - Témoignage (7s)
  {
    id: "ah-testimonial",
    durationMs: 7000,
    render: () => (
      <div className="flex h-full flex-col items-center justify-center bg-white px-6 py-6 text-center sm:px-12">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-semibold text-blue-700">
          SD
        </div>
        <p className="mt-3 t-h3 font-semibold">Cofondateur DG</p>
        <p className="text-caption text-brand-stone">Groupement vétérinaire · 32 cliniques · 280 collaborateurs</p>

        <p className="mt-5 max-w-md font-display italic t-body text-brand-ink">
          "Si vous êtes cofondateur d'un groupement qui grandit plus vite que ses process, je
          recommande SKS Talents. L'agent reporting a payé son ROI en 4 mois."
        </p>

        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-mint/40 px-3 py-1.5 text-caption font-semibold text-brand-teal">
          ROI atteint en 4 mois
        </span>
      </div>
    )
  }
];
