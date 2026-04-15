"use client";

import { useMemo, useState } from "react";

const MONTHLY_BASE_HOURS = 151.67;
const PMSS_MONTHLY_2026 = 4005;
const PMSS_ANNUAL_2026 = 48060;
const PUBLIC_CSG_FULL_THRESHOLD = 15700;

type StatusValue =
  | "non-cadre"
  | "cadre"
  | "public-titulaire"
  | "public-contractuel"
  | "liberal"
  | "portage";

type BreakdownLine = {
  label: string;
  value: number;
  accent?: boolean;
};

type CalculationResult = {
  hourlyGross: number;
  monthlyGross: number;
  annualGross: number;
  hourlyNet: number;
  monthlyNet: number;
  annualNet: number;
  monthlyTaxableNet: number;
  annualTaxableNet: number;
  monthlyTaxAmount: number;
  annualTaxAmount: number;
  monthlyNetAfterTax: number;
  annualNetAfterTax: number;
  breakdown: BreakdownLine[];
  employerBreakdown: BreakdownLine[];
  totalEmployeeContributions: number;
  totalEmployerContributions: number;
  monthlyEmployerCost: number;
  annualEmployerCost: number;
  methodTitle: string;
  methodNote: string;
  employerMethodNote: string;
  precisionBadge: string;
};

const statuses: {
  value: StatusValue;
  label: string;
  description: string;
  precisionBadge: string;
}[] = [
  {
    value: "non-cadre",
    label: "Salarie non-cadre",
    description: "Secteur prive avec cotisations salariales detaillees et PAS sur net imposable.",
    precisionBadge: "Affinage eleve"
  },
  {
    value: "cadre",
    label: "Salarie cadre",
    description: "Secteur prive avec Agirc-Arrco, CEG, CET et cotisation Apec 2026.",
    precisionBadge: "Affinage eleve"
  },
  {
    value: "public-titulaire",
    label: "Fonction publique titulaire",
    description: "Traitement indiciaire, RAFP, CSG/CRDS avec prise en compte des primes.",
    precisionBadge: "Affinage eleve"
  },
  {
    value: "public-contractuel",
    label: "Fonction publique contractuelle",
    description: "Assurance retraite, Ircantec et CSG/CRDS selon regles agents contractuels.",
    precisionBadge: "Affinage eleve"
  },
  {
    value: "liberal",
    label: "Profession liberale / TNS",
    description: "Approche indicative fondee sur un taux global de cotisations modulable.",
    precisionBadge: "Indicatif"
  },
  {
    value: "portage",
    label: "Portage salarial",
    description: "Approximation a partir d'un brut salarial porte de type cadre.",
    precisionBadge: "Indicatif"
  }
];

const monthOptions = [12, 13, 14, 15, 16];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function round2(value: number) {
  return Math.round(value * 100) / 100;
}

function formatMoney(value: number, decimals = 0) {
  if (!Number.isFinite(value) || value <= 0) {
    return "0 €";
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

function buildOutput(
  grossMonthly: number,
  bonusMonths: number,
  workRatio: number,
  taxRate: number,
  breakdown: BreakdownLine[],
  employerBreakdown: BreakdownLine[],
  methodTitle: string,
  methodNote: string,
  employerMethodNote: string,
  precisionBadge: string
): CalculationResult {
  const totalEmployeeContributions = breakdown.reduce((sum, line) => sum + line.value, 0);
  const totalEmployerContributions = employerBreakdown.reduce((sum, line) => sum + line.value, 0);
  const monthlyNet = Math.max(grossMonthly - totalEmployeeContributions, 0);
  const annualGross = grossMonthly * bonusMonths;
  const annualNet = monthlyNet * bonusMonths;
  const monthlyHours = MONTHLY_BASE_HOURS * workRatio;
  const hourlyGross = monthlyHours > 0 ? grossMonthly / monthlyHours : 0;
  const hourlyNet = monthlyHours > 0 ? monthlyNet / monthlyHours : 0;

  const monthlyNonDeductibleTaxes = breakdown
    .filter((line) => line.accent)
    .reduce((sum, line) => sum + line.value, 0);

  const monthlyTaxableNet = Math.max(monthlyNet + monthlyNonDeductibleTaxes, 0);
  const annualTaxableNet = monthlyTaxableNet * bonusMonths;
  const monthlyTaxAmount = monthlyTaxableNet * (taxRate / 100);
  const annualTaxAmount = monthlyTaxAmount * bonusMonths;

  return {
    hourlyGross,
    monthlyGross: grossMonthly,
    annualGross,
    hourlyNet,
    monthlyNet,
    annualNet,
    monthlyTaxableNet,
    annualTaxableNet,
    monthlyTaxAmount,
    annualTaxAmount,
    monthlyNetAfterTax: Math.max(monthlyNet - monthlyTaxAmount, 0),
    annualNetAfterTax: Math.max(annualNet - annualTaxAmount, 0),
    breakdown,
    employerBreakdown,
    totalEmployeeContributions,
    totalEmployerContributions,
    monthlyEmployerCost: grossMonthly + totalEmployerContributions,
    annualEmployerCost: annualGross + totalEmployerContributions * bonusMonths,
    methodTitle,
    methodNote,
    employerMethodNote,
    precisionBadge
  };
}

function calculatePrivateEmployee(
  grossMonthly: number,
  bonusMonths: number,
  workRatio: number,
  taxRate: number,
  cadre: boolean,
  accidentRate: number,
  companySize: "lt50" | "gte50",
  applyGeneralReduction: boolean
) {
  const reducedPmss = PMSS_MONTHLY_2026 * workRatio;
  const tranche1 = Math.min(grossMonthly, reducedPmss);
  const tranche2 = clamp(grossMonthly - reducedPmss, 0, reducedPmss * 7);
  const csgBaseFactor = grossMonthly * bonusMonths > PMSS_ANNUAL_2026 * 4 ? 1 : 0.9825;
  const csgBase = grossMonthly * csgBaseFactor;
  const fnalRate = companySize === "lt50" ? 0.001 : 0.005;
  const maladieRate = grossMonthly <= 2.5 * 1801.8 * workRatio ? 0.07 : 0.13;
  const allocationsRate = grossMonthly <= 3.5 * 1801.8 * workRatio ? 0.0345 : 0.0525;

  const breakdown: BreakdownLine[] = [
    { label: "Vieillesse deplafonnee", value: grossMonthly * 0.004 },
    { label: "Vieillesse plafonnee", value: tranche1 * 0.069 },
    { label: "Agirc-Arrco tranche 1", value: tranche1 * 0.0315 },
    { label: "CEG tranche 1", value: tranche1 * 0.0086 },
    { label: "Agirc-Arrco tranche 2", value: tranche2 * 0.0864 },
    { label: "CEG tranche 2", value: tranche2 * 0.0108 },
    {
      label: "CET",
      value: grossMonthly > reducedPmss ? (tranche1 + tranche2) * 0.0014 : 0
    },
    { label: "CSG deductibile", value: csgBase * 0.068 },
    { label: "CSG non deductibile", value: csgBase * 0.024, accent: true },
    { label: "CRDS", value: csgBase * 0.005, accent: true }
  ];

  const employerBreakdown: BreakdownLine[] = [
    { label: "Maladie", value: grossMonthly * maladieRate },
    { label: "Allocations familiales", value: grossMonthly * allocationsRate },
    { label: "Vieillesse deplafonnee employeur", value: grossMonthly * 0.0202 },
    { label: "Vieillesse plafonnee employeur", value: tranche1 * 0.0855 },
    { label: "Agirc-Arrco tranche 1 employeur", value: tranche1 * 0.0472 },
    { label: "CEG tranche 1 employeur", value: tranche1 * 0.0129 },
    { label: "Agirc-Arrco tranche 2 employeur", value: tranche2 * 0.1295 },
    { label: "CEG tranche 2 employeur", value: tranche2 * 0.0162 },
    { label: "CET employeur", value: grossMonthly > reducedPmss ? (tranche1 + tranche2) * 0.0021 : 0 },
    { label: "Chomage employeur", value: grossMonthly * 0.0405 },
    { label: "AGS", value: grossMonthly * 0.0025 },
    { label: "Accidents du travail / MP", value: grossMonthly * (accidentRate / 100) },
    { label: "CSA", value: grossMonthly * 0.003 },
    { label: "FNAL", value: grossMonthly * fnalRate },
    { label: "Dialogue social", value: grossMonthly * 0.00016 }
  ];

  if (cadre) {
    breakdown.splice(7, 0, {
      label: "Cotisation Apec",
      value: Math.min(grossMonthly, reducedPmss * 4) * 0.00024
    });
    employerBreakdown.splice(8, 0, {
      label: "Cotisation Apec employeur",
      value: Math.min(grossMonthly, reducedPmss * 4) * 0.00036
    });
  }

  if (applyGeneralReduction && grossMonthly <= 1.6 * 1801.8 * workRatio) {
    employerBreakdown.push({
      label: "Reduction generale estimee",
      value: -(grossMonthly * 0.11)
    });
  }

  return buildOutput(
    grossMonthly,
    bonusMonths,
    workRatio,
    taxRate,
    breakdown,
    employerBreakdown,
    cadre ? "Prive cadre" : "Prive non-cadre",
    cadre
      ? "Base privee avec vieillesse, Agirc-Arrco, CEG, CET et cotisation Apec 2026. Le PAS est applique sur le net imposable estime."
      : "Base privee avec vieillesse, Agirc-Arrco, CEG, CET et PAS sur le net imposable estime.",
    applyGeneralReduction
      ? "Cout employeur estime avec charges patronales de base, taux AT/MP saisi, FNAL selon effectif et une approximation de reduction generale quand la remuneration reste sous 1,6 Smic."
      : "Cout employeur estime avec charges patronales de base, taux AT/MP saisi et FNAL selon effectif. Alleegements specifiques non appliques.",
    "Affinage eleve"
  );
}

function calculatePublicTitulaire(
  grossMonthly: number,
  bonusMonths: number,
  workRatio: number,
  taxRate: number,
  primeShare: number
) {
  const primeRatio = clamp(primeShare, 0, 40) / 100;
  const indiciaire = grossMonthly * (1 - primeRatio);
  const primes = grossMonthly - indiciaire;
  const rafpBase = Math.min(primes, indiciaire * 0.2);
  const csgBaseFactor = grossMonthly >= PUBLIC_CSG_FULL_THRESHOLD ? 1 : 0.9825;
  const csgBase = grossMonthly * csgBaseFactor;

  const breakdown: BreakdownLine[] = [
    { label: "Retraite de base fonction publique", value: indiciaire * 0.111 },
    { label: "RAFP sur primes plafonnees", value: rafpBase * 0.05 },
    { label: "CSG deductibile", value: csgBase * 0.068 },
    { label: "CSG non deductibile", value: csgBase * 0.024, accent: true },
    { label: "CRDS", value: csgBase * 0.005, accent: true }
  ];

  const employerBreakdown: BreakdownLine[] = [
    { label: "Contribution employeur retraite fonction publique", value: indiciaire * 0.31 },
    { label: "Contribution employeur RAFP", value: rafpBase * 0.05 },
    { label: "Contribution employeur maladie et solidarite", value: grossMonthly * 0.12 }
  ];

  return buildOutput(
    grossMonthly,
    bonusMonths,
    workRatio,
    taxRate,
    breakdown,
    employerBreakdown,
    "Fonction publique titulaire",
    `Hypothese retenue: ${primeShare}% du brut en primes et indemnites. La RAFP est plafonnee a 20% du traitement indiciaire brut.`,
    "Cout employeur tres indicatif: il varie fortement selon le versant, la nature de l'employeur public et les contributions specifiques.",
    "Affinage eleve"
  );
}

function calculatePublicContractual(
  grossMonthly: number,
  bonusMonths: number,
  workRatio: number,
  taxRate: number
) {
  const reducedPmss = PMSS_MONTHLY_2026 * workRatio;
  const trancheA = Math.min(grossMonthly, reducedPmss);
  const trancheB = Math.max(grossMonthly - reducedPmss, 0);
  const csgBaseFactor = grossMonthly >= PUBLIC_CSG_FULL_THRESHOLD ? 1 : 0.9825;
  const csgBase = grossMonthly * csgBaseFactor;

  const breakdown: BreakdownLine[] = [
    { label: "Assurance retraite de base deployee", value: grossMonthly * 0.004 },
    { label: "Assurance retraite plafonnee", value: trancheA * 0.069 },
    { label: "Ircantec tranche A", value: trancheA * 0.028 },
    { label: "Ircantec tranche B", value: trancheB * 0.0695 },
    { label: "CSG deductibile", value: csgBase * 0.068 },
    { label: "CSG non deductibile", value: csgBase * 0.024, accent: true },
    { label: "CRDS", value: csgBase * 0.005, accent: true }
  ];

  const employerBreakdown: BreakdownLine[] = [
    { label: "Maladie employeur", value: grossMonthly * 0.13 },
    { label: "Vieillesse deplafonnee employeur", value: grossMonthly * 0.0202 },
    { label: "Vieillesse plafonnee employeur", value: trancheA * 0.0855 },
    { label: "Ircantec employeur tranche A", value: trancheA * 0.042 },
    { label: "Ircantec employeur tranche B", value: trancheB * 0.1275 },
    { label: "Chomage employeur", value: grossMonthly * 0.0405 }
  ];

  return buildOutput(
    grossMonthly,
    bonusMonths,
    workRatio,
    taxRate,
    breakdown,
    employerBreakdown,
    "Fonction publique contractuelle",
    "Regles agents contractuels avec Assurance retraite, Ircantec et net imposable estime pour le PAS.",
    "Cout employeur indicatif pour un agent contractuel avec principales charges patronales de droit commun.",
    "Affinage eleve"
  );
}

function calculateLiberal(
  grossMonthly: number,
  bonusMonths: number,
  workRatio: number,
  taxRate: number,
  socialRate: number
) {
  const normalizedRate = clamp(socialRate, 20, 60) / 100;
  const breakdown: BreakdownLine[] = [
    {
      label: "Cotisations sociales estimees independant",
      value: grossMonthly * normalizedRate
    }
  ];

  const result = buildOutput(
    grossMonthly,
    bonusMonths,
    workRatio,
    taxRate,
    breakdown,
    [],
    "Profession liberale / TNS",
    "Mode indicatif: le brut saisi est interprete comme un revenu avant cotisations sociales, avec un taux global modulable.",
    "La notion de cout employeur n'est pas pertinente de la meme facon en activite independante. Aucun cout employeur additionnel n'est ajoute.",
    "Indicatif"
  );

  return {
    ...result,
    monthlyTaxableNet: result.monthlyNet,
    annualTaxableNet: result.annualNet,
    monthlyTaxAmount: result.monthlyNet * (taxRate / 100),
    annualTaxAmount: result.annualNet * (taxRate / 100),
    monthlyNetAfterTax: Math.max(result.monthlyNet * (1 - taxRate / 100), 0),
    annualNetAfterTax: Math.max(result.annualNet * (1 - taxRate / 100), 0)
  };
}

function calculatePortage(
  grossMonthly: number,
  bonusMonths: number,
  workRatio: number,
  taxRate: number,
  accidentRate: number,
  companySize: "lt50" | "gte50",
  applyGeneralReduction: boolean
) {
  const base = calculatePrivateEmployee(
    grossMonthly,
    bonusMonths,
    workRatio,
    taxRate,
    true,
    accidentRate,
    companySize,
    applyGeneralReduction
  );

  return {
    ...base,
    methodTitle: "Portage salarial",
    methodNote:
      "Approximation alignee sur un brut salarial porte de type cadre. Les frais de gestion et la structure exacte du contrat de portage ne sont pas integres.",
    employerMethodNote:
      "Le cout employeur reste tres indicatif en portage salarial: il ne comprend ni frais de gestion de la societe de portage ni reserve financiere eventuelle.",
    precisionBadge: "Indicatif"
  };
}

export default function SalaryCalculator() {
  const [viewMode, setViewMode] = useState<"employee" | "employer">("employee");
  const [source, setSource] = useState<"hourly" | "monthly" | "annual">("monthly");
  const [grossHourly, setGrossHourly] = useState("");
  const [grossMonthly, setGrossMonthly] = useState("");
  const [grossAnnual, setGrossAnnual] = useState("");
  const [status, setStatus] = useState<StatusValue>("non-cadre");
  const [workPercentage, setWorkPercentage] = useState(100);
  const [bonusMonths, setBonusMonths] = useState(12);
  const [taxRate, setTaxRate] = useState(0);
  const [publicPrimeShare, setPublicPrimeShare] = useState(20);
  const [independentSocialRate, setIndependentSocialRate] = useState(45);
  const [accidentRate, setAccidentRate] = useState(1.2);
  const [companySize, setCompanySize] = useState<"lt50" | "gte50">("lt50");
  const [applyGeneralReduction, setApplyGeneralReduction] = useState(true);

  const activeStatus = statuses.find((item) => item.value === status) ?? statuses[0];

  const result = useMemo(() => {
    const workRatio = Math.max(workPercentage, 1) / 100;
    const monthlyHours = MONTHLY_BASE_HOURS * workRatio;
    const parsedHourly = Number(grossHourly) || 0;
    const parsedMonthly = Number(grossMonthly) || 0;
    const parsedAnnual = Number(grossAnnual) || 0;

    let resolvedMonthlyGross = 0;

    if (source === "hourly" && parsedHourly > 0) {
      resolvedMonthlyGross = parsedHourly * monthlyHours;
    } else if (source === "annual" && parsedAnnual > 0) {
      resolvedMonthlyGross = parsedAnnual / bonusMonths;
    } else {
      resolvedMonthlyGross = parsedMonthly;
    }

    if (resolvedMonthlyGross <= 0) {
      return buildOutput(
        0,
        bonusMonths,
        workRatio,
        taxRate,
        [],
        [],
        activeStatus.label,
        activeStatus.description,
        "Aucun cout employeur disponible tant qu'aucun montant brut n'est saisi.",
        activeStatus.precisionBadge
      );
    }

    switch (status) {
      case "cadre":
        return calculatePrivateEmployee(
          resolvedMonthlyGross,
          bonusMonths,
          workRatio,
          taxRate,
          true,
          accidentRate,
          companySize,
          applyGeneralReduction
        );
      case "public-titulaire":
        return calculatePublicTitulaire(
          resolvedMonthlyGross,
          bonusMonths,
          workRatio,
          taxRate,
          publicPrimeShare
        );
      case "public-contractuel":
        return calculatePublicContractual(resolvedMonthlyGross, bonusMonths, workRatio, taxRate);
      case "liberal":
        return calculateLiberal(
          resolvedMonthlyGross,
          bonusMonths,
          workRatio,
          taxRate,
          independentSocialRate
        );
      case "portage":
        return calculatePortage(
          resolvedMonthlyGross,
          bonusMonths,
          workRatio,
          taxRate,
          accidentRate,
          companySize,
          applyGeneralReduction
        );
      case "non-cadre":
      default:
        return calculatePrivateEmployee(
          resolvedMonthlyGross,
          bonusMonths,
          workRatio,
          taxRate,
          false,
          accidentRate,
          companySize,
          applyGeneralReduction
        );
    }
  }, [
    activeStatus.description,
    activeStatus.label,
    activeStatus.precisionBadge,
    bonusMonths,
    grossAnnual,
    grossHourly,
    grossMonthly,
    independentSocialRate,
    accidentRate,
    companySize,
    applyGeneralReduction,
    publicPrimeShare,
    source,
    status,
    taxRate,
    workPercentage
  ]);

  function resetFields() {
    setSource("monthly");
    setGrossHourly("");
    setGrossMonthly("");
    setGrossAnnual("");
    setStatus("non-cadre");
    setWorkPercentage(100);
    setBonusMonths(12);
    setTaxRate(0);
    setPublicPrimeShare(20);
    setIndependentSocialRate(45);
    setAccidentRate(1.2);
    setCompanySize("lt50");
    setApplyGeneralReduction(true);
    setViewMode("employee");
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="card-surface overflow-hidden p-0">
          <div className="border-b border-brand-teal/10 bg-gradient-to-r from-brand-mint via-white to-white px-8 py-8 sm:px-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Calcul du salaire brut en net</p>
                <h2 className="section-title">Version France plus precise</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-brand-stone">
                  Le calcul tient compte d'un net imposable estime pour le PAS et de regles plus
                  fines selon le statut choisi.
                </p>
              </div>
              <div className="rounded-3xl border border-brand-teal/15 bg-white/90 px-5 py-4 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  Niveau
                </p>
                <p className="mt-2 text-lg font-semibold text-brand-ink">{result.precisionBadge}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8 px-8 py-8 sm:px-10">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setViewMode("employee")}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  viewMode === "employee"
                    ? "bg-brand-teal text-white"
                    : "border border-brand-teal/20 bg-white text-brand-teal hover:bg-brand-mint"
                }`}
              >
                Mode salarie
              </button>
              <button
                type="button"
                onClick={() => setViewMode("employer")}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  viewMode === "employer"
                    ? "bg-[#163334] text-white"
                    : "border border-brand-teal/20 bg-white text-brand-teal hover:bg-brand-mint"
                }`}
              >
                Mode entreprise
              </button>
            </div>

            <div>
              <p className="text-sm font-semibold text-brand-stone">Selectionnez votre statut :</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {statuses.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setStatus(item.value)}
                    className={`rounded-[24px] border p-4 text-left transition ${
                      status === item.value
                        ? "border-brand-teal bg-gradient-to-br from-brand-mint to-white shadow-soft"
                        : "border-brand-teal/10 bg-white hover:border-brand-teal/30"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-brand-ink">{item.label}</span>
                      <span
                        className={`rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                          item.precisionBadge === "Affinage eleve"
                            ? "bg-brand-mint text-brand-teal"
                            : "bg-[#163334] text-white/80"
                        }`}
                      >
                        {item.precisionBadge}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-brand-stone">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <label className="space-y-2 text-sm font-semibold text-brand-stone">
                <span>Horaire brut</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={grossHourly}
                  onChange={(event) => {
                    setSource("hourly");
                    setGrossHourly(event.target.value);
                  }}
                  className="w-full rounded-2xl border border-brand-teal/15 bg-white px-4 py-3 text-brand-ink outline-none"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-brand-stone">
                <span>Mensuel brut</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={grossMonthly}
                  onChange={(event) => {
                    setSource("monthly");
                    setGrossMonthly(event.target.value);
                  }}
                  className="w-full rounded-2xl border border-brand-teal/15 bg-white px-4 py-3 text-brand-ink outline-none"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-brand-stone">
                <span>Annuel brut</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={grossAnnual}
                  onChange={(event) => {
                    setSource("annual");
                    setGrossAnnual(event.target.value);
                  }}
                  className="w-full rounded-2xl border border-brand-teal/15 bg-white px-4 py-3 text-brand-ink outline-none"
                />
              </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-brand-stone">
                    Selectionnez votre temps de travail :
                  </p>
                  <span className="rounded-full bg-brand-mint px-3 py-1 text-sm font-semibold text-brand-teal">
                    {workPercentage} %
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={workPercentage}
                  onChange={(event) => setWorkPercentage(Number(event.target.value))}
                  className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-brand-teal/15"
                />
                <p className="mt-3 text-xs leading-6 text-brand-stone/80">
                  Le plafond de cotisation est reduit au prorata du temps partiel pour les regimes
                  prives et assimiles.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-brand-stone">
                    Selectionnez le taux de prelevement a la source :
                  </p>
                  <span className="rounded-full bg-brand-mint px-3 py-1 text-sm font-semibold text-brand-teal">
                    {taxRate.toFixed(1)} %
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="0.1"
                  value={taxRate}
                  onChange={(event) => setTaxRate(Number(event.target.value))}
                  className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-brand-teal/15"
                />
                <p className="mt-3 text-xs leading-6 text-brand-stone/80">
                  Le PAS est applique sur le net imposable estime, pas directement sur le net verse.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-brand-stone">
                Selectionnez le nombre de mois de prime conventionnelle :
              </p>
              <div className="flex flex-wrap gap-3">
                {monthOptions.map((months) => (
                  <button
                    key={months}
                    type="button"
                    onClick={() => setBonusMonths(months)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      bonusMonths === months
                        ? "border-brand-teal bg-brand-teal text-white"
                        : "border-brand-teal/15 bg-white text-brand-stone hover:border-brand-teal/35"
                    }`}
                  >
                    {months} mois
                  </button>
                ))}
              </div>
            </div>

            {viewMode === "employer" && ["non-cadre", "cadre", "portage", "public-contractuel", "public-titulaire"].includes(status) ? (
              <div className="rounded-[28px] border border-brand-teal/10 bg-brand-mint/40 p-6">
                <p className="text-sm font-semibold text-brand-stone">Hypotheses employeur :</p>
                <div className="mt-5 grid gap-6 lg:grid-cols-2">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-brand-stone">Taux AT / MP estime :</p>
                      <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-brand-teal">
                        {accidentRate.toFixed(1)} %
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="8"
                      step="0.1"
                      value={accidentRate}
                      onChange={(event) => setAccidentRate(Number(event.target.value))}
                      className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-brand-teal/15"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-brand-stone">Effectif entreprise :</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setCompanySize("lt50")}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          companySize === "lt50"
                            ? "bg-brand-teal text-white"
                            : "border border-brand-teal/20 bg-white text-brand-teal"
                        }`}
                      >
                        Moins de 50
                      </button>
                      <button
                        type="button"
                        onClick={() => setCompanySize("gte50")}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          companySize === "gte50"
                            ? "bg-brand-teal text-white"
                            : "border border-brand-teal/20 bg-white text-brand-teal"
                        }`}
                      >
                        50 et plus
                      </button>
                    </div>
                  </div>
                </div>

                {(status === "non-cadre" || status === "cadre" || status === "portage") ? (
                  <label className="mt-5 flex items-start gap-3 rounded-2xl border border-brand-teal/10 bg-white px-4 py-4 text-sm leading-6 text-brand-stone">
                    <input
                      type="checkbox"
                      checked={applyGeneralReduction}
                      onChange={(event) => setApplyGeneralReduction(event.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-brand-teal/30"
                    />
                    <span>
                      Appliquer une estimation de reduction generale des cotisations patronales
                      lorsque la remuneration reste sous 1,6 Smic.
                    </span>
                  </label>
                ) : null}
              </div>
            ) : null}

            {status === "public-titulaire" ? (
              <div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-brand-stone">
                    Part estimee de primes dans le brut :
                  </p>
                  <span className="rounded-full bg-brand-mint px-3 py-1 text-sm font-semibold text-brand-teal">
                    {publicPrimeShare} %
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="1"
                  value={publicPrimeShare}
                  onChange={(event) => setPublicPrimeShare(Number(event.target.value))}
                  className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-brand-teal/15"
                />
                <p className="mt-3 text-xs leading-6 text-brand-stone/80">
                  Utilise pour distinguer traitement indiciaire et primes, puis plafonner la RAFP a
                  20% du traitement indiciaire.
                </p>
              </div>
            ) : null}

            {status === "liberal" ? (
              <div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-brand-stone">
                    Taux global de cotisations estime independant :
                  </p>
                  <span className="rounded-full bg-brand-mint px-3 py-1 text-sm font-semibold text-brand-teal">
                    {independentSocialRate} %
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="60"
                  step="1"
                  value={independentSocialRate}
                  onChange={(event) => setIndependentSocialRate(Number(event.target.value))}
                  className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-brand-teal/15"
                />
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={resetFields}
                className="inline-flex rounded-full border border-brand-teal/20 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
              >
                Effacer les champs
              </button>
              <a
                href="https://mon-entreprise.urssaf.fr/simulateurs/salaire-brut-net"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-[#163334] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Comparer avec le simulateur Urssaf
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-surface overflow-hidden border-none bg-gradient-to-br from-slate-950 via-[#163334] to-teal-950 p-8 text-white sm:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-200">
                  Resultat de votre salaire net
                </p>
                <h3 className="mt-3 font-display text-4xl">
                  {viewMode === "employee" ? "Estimation nette affinee" : "Estimation du cout employeur"}
                </h3>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                {result.methodTitle}
              </div>
            </div>

            {viewMode === "employee" ? (
              <>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold text-white/65">Horaire net</p>
                    <p className="mt-3 font-display text-3xl text-teal-200">
                      {formatMoney(result.hourlyNet, 2)}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold text-white/65">Horaire brut reconstitue</p>
                    <p className="mt-3 font-display text-3xl">{formatMoney(result.hourlyGross, 2)}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold text-white/65">Mensuel net avant impots</p>
                    <p className="mt-3 font-display text-4xl">{formatMoney(result.monthlyNet)}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold text-white/65">Annuel net avant impots</p>
                    <p className="mt-3 font-display text-4xl">{formatMoney(result.annualNet)}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-[28px] border border-white/10 bg-black/10 p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold text-white/65">Net imposable mensuel estime</p>
                      <p className="mt-3 font-display text-3xl">{formatMoney(result.monthlyTaxableNet)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white/65">Montant mensuel du PAS</p>
                      <p className="mt-3 font-display text-3xl text-teal-200">
                        {formatMoney(result.monthlyTaxAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white/65">Mensuel net apres impots</p>
                      <p className="mt-3 font-display text-4xl text-teal-200">
                        {formatMoney(result.monthlyNetAfterTax)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white/65">Annuel net apres impots</p>
                      <p className="mt-3 font-display text-4xl text-teal-200">
                        {formatMoney(result.annualNetAfterTax)}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold text-white/65">Brut mensuel</p>
                    <p className="mt-3 font-display text-4xl">{formatMoney(result.monthlyGross)}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold text-white/65">Charges patronales estimees</p>
                    <p className="mt-3 font-display text-4xl text-teal-200">
                      {formatMoney(result.totalEmployerContributions)}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold text-white/65">Cout employeur mensuel</p>
                    <p className="mt-3 font-display text-4xl text-teal-200">
                      {formatMoney(result.monthlyEmployerCost)}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold text-white/65">Cout employeur annuel</p>
                    <p className="mt-3 font-display text-4xl text-teal-200">
                      {formatMoney(result.annualEmployerCost)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-[28px] border border-white/10 bg-black/10 p-6 text-sm leading-7 text-white/75">
                  {result.employerMethodNote}
                </div>
              </>
            )}
          </div>

          <div className="card-surface p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Ventilation</p>
                <h3 className="font-display text-3xl text-brand-ink">
                  {viewMode === "employee" ? "Retenues estimees" : "Charges employeur estimees"}
                </h3>
              </div>
              <div className="rounded-full bg-brand-mint px-4 py-2 text-sm font-semibold text-brand-teal">
                {viewMode === "employee"
                  ? `${formatMoney(result.totalEmployeeContributions)} / mois`
                  : `${formatMoney(result.totalEmployerContributions)} / mois`}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {(viewMode === "employee" ? result.breakdown : result.employerBreakdown).length ? (
                (viewMode === "employee" ? result.breakdown : result.employerBreakdown).map((line) => (
                  <div
                    key={line.label}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-brand-teal/10 bg-white px-4 py-3"
                  >
                    <span className="text-sm font-medium text-brand-stone">{line.label}</span>
                    <span className="text-sm font-semibold text-brand-ink">
                      {formatMoney(round2(line.value), 2)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-brand-teal/20 px-4 py-5 text-sm leading-7 text-brand-stone">
                  Saisissez un montant brut pour afficher la ventilation detaillee.
                </div>
              )}
            </div>
          </div>

          <div className="card-surface p-8">
            <p className="eyebrow">Hypothese appliquee</p>
            <h3 className="font-display text-3xl text-brand-ink">{result.methodTitle}</h3>
            <p className="mt-4 text-base leading-8 text-brand-stone">{result.methodNote}</p>
            <div className="mt-6 rounded-3xl bg-brand-mint/70 p-5 text-sm leading-7 text-brand-stone">
              Reference technique:
              <br />
              prive 2026: PMSS 4 005 €, Agirc-Arrco T1/T2, CEG, CET, cotisation Apec pour cadres,
              CSG/CRDS et PAS sur net imposable.
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
            Source officielle
          </p>
          <h3 className="mt-3 font-display text-2xl text-brand-ink">Urssaf</h3>
          <p className="mt-3 text-sm leading-7 text-brand-stone">
            Le convertisseur salaire brut/net de Mon Entreprise reste la reference la plus robuste
            pour les salaries du prive.
          </p>
          <a
            href="https://mon-entreprise.urssaf.fr/simulateurs/salaire-brut-net"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-sm font-semibold text-brand-teal"
          >
            Ouvrir le simulateur officiel
          </a>
        </div>

        <div className="card-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
            CSG / CRDS
          </p>
          <h3 className="mt-3 font-display text-2xl text-brand-ink">Service-Public.fr</h3>
          <p className="mt-3 text-sm leading-7 text-brand-stone">
            Les assiettes de CSG/CRDS et la distinction entre part deductible et non deductible sont
            prises en compte dans le net imposable.
          </p>
          <a
            href="https://www.service-public.fr/particuliers/vosdroits/N17580"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-sm font-semibold text-brand-teal"
          >
            Voir la reference officielle
          </a>
        </div>

        <div className="card-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
            Retraite complementaire
          </p>
          <h3 className="mt-3 font-display text-2xl text-brand-ink">Agirc-Arrco</h3>
          <p className="mt-3 text-sm leading-7 text-brand-stone">
            Les seuils 2026, les taux T1/T2, la CEG, la CET et la cotisation Apec cadre sont
            alignes sur les parametres publics du regime.
          </p>
          <a
            href="https://www.agirc-arrco.fr/nous-connaitre/nos-etudes-et-publications/documentation-institutionnelle/parametres-et-donnees-statistiques/"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-sm font-semibold text-brand-teal"
          >
            Consulter les parametres 2026
          </a>
        </div>
      </div>
    </div>
  );
}
