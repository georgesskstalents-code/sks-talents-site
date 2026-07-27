"use client";

import { useMemo, useState } from "react";

type RoleTier =
  | "c-level"
  | "vp-director"
  | "manager"
  | "expert-ic";

type RoleConfig = {
  value: RoleTier;
  label: string;
  searchFeePct: number;
  onboardingPct: number;
  teamMultiplier: number;
  projectImpactPct: number;
  note: string;
};

const ROLES: RoleConfig[] = [
  {
    value: "c-level",
    label: "C-level (CEO, COO, CMO, CTO, CSO)",
    searchFeePct: 0.25,
    onboardingPct: 0.15,
    teamMultiplier: 6,
    projectImpactPct: 0.35,
    note: "Direction executive : cout search eleve, ramp-up long, impact strategique fort."
  },
  {
    value: "vp-director",
    label: "VP, Director, Head of (senior fonctionnel)",
    searchFeePct: 0.20,
    onboardingPct: 0.12,
    teamMultiplier: 4,
    projectImpactPct: 0.25,
    note: "Fonction pivot : impact operations et equipe direct, coordination COMEX."
  },
  {
    value: "manager",
    label: "Manager, Lead, Head (intermediaire)",
    searchFeePct: 0.18,
    onboardingPct: 0.10,
    teamMultiplier: 3,
    projectImpactPct: 0.15,
    note: "Middle management : impact equipe immediat, effet sur projets locaux."
  },
  {
    value: "expert-ic",
    label: "Expert, Individual Contributor senior",
    searchFeePct: 0.15,
    onboardingPct: 0.08,
    teamMultiplier: 1,
    projectImpactPct: 0.10,
    note: "Contributeur individuel : impact projet cible, moins de coordination transverse."
  }
];

type BreakdownItem = {
  label: string;
  min: number;
  max: number;
  note: string;
};

type Result = {
  totalMin: number;
  totalMax: number;
  multiplierMin: number;
  multiplierMax: number;
  breakdown: BreakdownItem[];
};

function computeResult(
  annualSalary: number,
  role: RoleConfig,
  timeToFillMonths: number,
  teamSize: number
): Result {
  const monthlySalary = annualSalary / 12;
  const effectiveTeamMultiplier = Math.min(role.teamMultiplier, Math.max(1, teamSize));

  const searchCostMid = annualSalary * role.searchFeePct;
  const searchCostMin = searchCostMid * 0.8;
  const searchCostMax = searchCostMid * 1.2;

  const onboardingCostMid = annualSalary * role.onboardingPct;
  const onboardingCostMin = onboardingCostMid * 0.75;
  const onboardingCostMax = onboardingCostMid * 1.25;

  const vacancyCostMid = monthlySalary * timeToFillMonths;
  const vacancyCostMin = vacancyCostMid * 0.7;
  const vacancyCostMax = vacancyCostMid * 1.3;

  const teamCostMid = monthlySalary * 0.25 * timeToFillMonths * effectiveTeamMultiplier * 0.5;
  const teamCostMin = teamCostMid * 0.6;
  const teamCostMax = teamCostMid * 1.4;

  const projectImpactMid = annualSalary * role.projectImpactPct;
  const projectImpactMin = projectImpactMid * 0.5;
  const projectImpactMax = projectImpactMid * 1.5;

  const breakdown: BreakdownItem[] = [
    {
      label: "Cout de search et onboarding du remplacement",
      min: searchCostMin + onboardingCostMin,
      max: searchCostMax + onboardingCostMax,
      note: `Frais cabinet (${Math.round(role.searchFeePct * 100)} % type) + ramp-up 12 mois.`
    },
    {
      label: "Cout de vacance du poste",
      min: vacancyCostMin,
      max: vacancyCostMax,
      note: `Salaire mensuel non-productif pendant ${timeToFillMonths} mois de recherche.`
    },
    {
      label: "Perte de productivite de l'equipe impactee",
      min: teamCostMin,
      max: teamCostMax,
      note: `Effet de coordination sur ${effectiveTeamMultiplier} personne${effectiveTeamMultiplier > 1 ? "s" : ""} pendant la vacance.`
    },
    {
      label: "Impact projets et decisions retardees",
      min: projectImpactMin,
      max: projectImpactMax,
      note: `Cout indirect des jalons manques, decisions differees, opportunites perdues.`
    }
  ];

  const totalMin = breakdown.reduce((s, b) => s + b.min, 0);
  const totalMax = breakdown.reduce((s, b) => s + b.max, 0);

  return {
    totalMin,
    totalMax,
    multiplierMin: totalMin / annualSalary,
    multiplierMax: totalMax / annualSalary,
    breakdown
  };
}

function formatEuros(n: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(n);
}

export default function CoutRecrutementCalculator() {
  const [annualSalary, setAnnualSalary] = useState<number>(120000);
  const [roleTier, setRoleTier] = useState<RoleTier>("vp-director");
  const [timeToFillMonths, setTimeToFillMonths] = useState<number>(4);
  const [teamSize, setTeamSize] = useState<number>(5);

  const role = useMemo(
    () => ROLES.find((r) => r.value === roleTier) ?? ROLES[0],
    [roleTier]
  );

  const result = useMemo(
    () => computeResult(annualSalary, role, timeToFillMonths, teamSize),
    [annualSalary, role, timeToFillMonths, teamSize]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <div className="card-surface space-y-5 p-6">
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
            Salaire brut annuel
          </label>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="range"
              min={40000}
              max={350000}
              step={5000}
              value={annualSalary}
              onChange={(e) => setAnnualSalary(Number(e.target.value))}
              className="flex-1 accent-brand-teal"
              aria-label="Salaire brut annuel"
            />
            <input
              type="number"
              min={0}
              step={1000}
              value={annualSalary}
              onChange={(e) => setAnnualSalary(Math.max(0, Number(e.target.value) || 0))}
              className="w-28 rounded-lg border border-brand-teal/20 px-3 py-2 text-right font-mono text-sm"
              aria-label="Salaire brut annuel en euros"
            />
          </div>
          <p className="mt-2 text-xs text-brand-stone">
            {formatEuros(annualSalary)} bruts/an
          </p>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
            Type de poste
          </label>
          <select
            value={roleTier}
            onChange={(e) => setRoleTier(e.target.value as RoleTier)}
            className="mt-2 w-full rounded-lg border border-brand-teal/20 bg-white px-3 py-2 text-sm"
          >
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs leading-5 text-brand-stone">{role.note}</p>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
            Delai de remplacement estime
          </label>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={12}
              step={1}
              value={timeToFillMonths}
              onChange={(e) => setTimeToFillMonths(Number(e.target.value))}
              className="flex-1 accent-brand-teal"
              aria-label="Delai de remplacement en mois"
            />
            <span className="w-16 text-right font-mono text-sm">
              {timeToFillMonths} mois
            </span>
          </div>
          <p className="mt-2 text-xs text-brand-stone">
            Duree moyenne observee sur profils cadres Life Sciences : 4 a 7 mois (Source : France Biotech x EY 2025).
          </p>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
            Taille de l'equipe impactee
          </label>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={20}
              step={1}
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="flex-1 accent-brand-teal"
              aria-label="Taille equipe impactee"
            />
            <span className="w-16 text-right font-mono text-sm">
              {teamSize} pers.
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-[22px] border border-brand-teal/20 bg-brand-mint/30 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
            Estimation totale du cout cache
          </p>
          <p className="mt-3 font-display text-4xl text-brand-ink sm:text-5xl">
            {formatEuros(result.totalMin)} <span className="text-2xl">a</span> {formatEuros(result.totalMax)}
          </p>
          <p className="mt-3 text-sm leading-6 text-brand-stone">
            Soit {result.multiplierMin.toFixed(1)}x a {result.multiplierMax.toFixed(1)}x le salaire annuel brut. Cette fourchette
            couvre les couts directs (search, onboarding, vacance) et indirects (equipe, projets, credibilite board).
          </p>
        </div>

        <div className="card-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
            Detail des postes de cout
          </p>
          <ul className="mt-4 space-y-4">
            {result.breakdown.map((b) => (
              <li key={b.label} className="border-b border-brand-teal/10 pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="text-sm font-semibold text-brand-ink sm:text-base">{b.label}</h4>
                  <span className="font-mono text-sm text-brand-teal sm:text-base">
                    {formatEuros(b.min)} - {formatEuros(b.max)}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-brand-stone">{b.note}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[18px] border border-brand-teal/10 bg-white/85 p-5 text-xs leading-6 text-brand-stone">
          <p className="font-semibold uppercase tracking-[0.14em] text-brand-teal">Methode et sources</p>
          <p className="mt-2">
            Formule basee sur les fourchettes publiees par AON x France Biotech 2025, le Panorama France
            HealthTech 2026 et les observations SKS Talents sur 100+ placements Life Sciences et Animal
            Health (8 ans). Les fourchettes min/max integrent la variabilite reelle observee selon le
            contexte (urgence, disponibilite marche, negociations). Estimation indicative : chaque contexte
            demande un cadrage specifique.
          </p>
        </div>
      </div>
    </div>
  );
}
