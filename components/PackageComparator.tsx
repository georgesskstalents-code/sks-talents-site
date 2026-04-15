"use client";

import { useMemo, useState } from "react";

type ComparatorStatus =
  | "non-cadre"
  | "cadre"
  | "public-titulaire"
  | "public-contractuel"
  | "liberal"
  | "portage";

type PackageInput = {
  name: string;
  fixedAnnualGross: number;
  variablePercent: number;
  bonusAnnual: number;
  monthlyBenefits: number;
};

const statusOptions: { value: ComparatorStatus; label: string; netRatio: number }[] = [
  { value: "non-cadre", label: "Salarie non-cadre", netRatio: 0.78 },
  { value: "cadre", label: "Salarie cadre", netRatio: 0.75 },
  { value: "public-titulaire", label: "Fonction publique titulaire", netRatio: 0.8 },
  { value: "public-contractuel", label: "Fonction publique contractuelle", netRatio: 0.77 },
  { value: "liberal", label: "Profession liberale / TNS", netRatio: 0.55 },
  { value: "portage", label: "Portage salarial", netRatio: 0.5 }
];

const salaryMonthOptions = [12, 13, 14, 15, 16];

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

function PackageColumn({
  packageData,
  onChange,
  highlighted
}: {
  packageData: PackageInput;
  onChange: (next: PackageInput) => void;
  highlighted: boolean;
}) {
  return (
    <div
      className={`rounded-[28px] border p-6 transition ${
        highlighted
          ? "border-brand-teal bg-gradient-to-br from-brand-mint to-white shadow-soft"
          : "border-brand-teal/10 bg-white"
      }`}
    >
      <label className="space-y-2 text-sm font-semibold text-brand-stone">
        <span>Nom du package</span>
        <input
          type="text"
          value={packageData.name}
          onChange={(event) => onChange({ ...packageData, name: event.target.value })}
          className="w-full rounded-2xl border border-brand-teal/15 bg-white px-4 py-3 text-brand-ink outline-none"
        />
      </label>

      <div className="mt-5 grid gap-4">
        <label className="space-y-2 text-sm font-semibold text-brand-stone">
          <span>Fixe annuel brut</span>
          <input
            type="number"
            min="0"
            step="100"
            value={packageData.fixedAnnualGross}
            onChange={(event) =>
              onChange({ ...packageData, fixedAnnualGross: Number(event.target.value) || 0 })
            }
            className="w-full rounded-2xl border border-brand-teal/15 bg-white px-4 py-3 text-brand-ink outline-none"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-brand-stone">
          <span>Variable cible (% du fixe)</span>
          <input
            type="number"
            min="0"
            step="1"
            value={packageData.variablePercent}
            onChange={(event) =>
              onChange({ ...packageData, variablePercent: Number(event.target.value) || 0 })
            }
            className="w-full rounded-2xl border border-brand-teal/15 bg-white px-4 py-3 text-brand-ink outline-none"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-brand-stone">
          <span>Bonus annuel garanti</span>
          <input
            type="number"
            min="0"
            step="100"
            value={packageData.bonusAnnual}
            onChange={(event) =>
              onChange({ ...packageData, bonusAnnual: Number(event.target.value) || 0 })
            }
            className="w-full rounded-2xl border border-brand-teal/15 bg-white px-4 py-3 text-brand-ink outline-none"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-brand-stone">
          <span>Valeur mensuelle des avantages</span>
          <input
            type="number"
            min="0"
            step="10"
            value={packageData.monthlyBenefits}
            onChange={(event) =>
              onChange({ ...packageData, monthlyBenefits: Number(event.target.value) || 0 })
            }
            className="w-full rounded-2xl border border-brand-teal/15 bg-white px-4 py-3 text-brand-ink outline-none"
          />
        </label>
      </div>
    </div>
  );
}

export default function PackageComparator() {
  const [status, setStatus] = useState<ComparatorStatus>("cadre");
  const [salaryMonths, setSalaryMonths] = useState(12);
  const [variableAchievement, setVariableAchievement] = useState(100);
  const [packageA, setPackageA] = useState<PackageInput>({
    name: "Package A",
    fixedAnnualGross: 65000,
    variablePercent: 10,
    bonusAnnual: 3000,
    monthlyBenefits: 250
  });
  const [packageB, setPackageB] = useState<PackageInput>({
    name: "Package B",
    fixedAnnualGross: 60000,
    variablePercent: 20,
    bonusAnnual: 5000,
    monthlyBenefits: 420
  });

  const activeStatus = statusOptions.find((item) => item.value === status) ?? statusOptions[1];

  const results = useMemo(() => {
    const mapPackage = (item: PackageInput) => {
      const targetVariable = item.fixedAnnualGross * (item.variablePercent / 100);
      const achievedVariable = targetVariable * (variableAchievement / 100);
      const annualBenefits = item.monthlyBenefits * 12;
      const annualCashGross = item.fixedAnnualGross + achievedVariable + item.bonusAnnual;
      const annualPackageValue = annualCashGross + annualBenefits;
      const securedAnnualCash = item.fixedAnnualGross + item.bonusAnnual;
      const monthlyGrossEquivalent = annualCashGross / salaryMonths;
      const monthlyNetEstimate = (annualCashGross * activeStatus.netRatio) / salaryMonths;

      return {
        ...item,
        targetVariable,
        achievedVariable,
        annualBenefits,
        annualCashGross,
        annualPackageValue,
        securedAnnualCash,
        monthlyGrossEquivalent,
        monthlyNetEstimate
      };
    };

    const first = mapPackage(packageA);
    const second = mapPackage(packageB);

    return {
      first,
      second,
      totalDelta: second.annualPackageValue - first.annualPackageValue,
      fixedDelta: second.fixedAnnualGross - first.fixedAnnualGross,
      benefitsDelta: second.annualBenefits - first.annualBenefits
    };
  }, [activeStatus.netRatio, packageA, packageB, salaryMonths, variableAchievement]);

  const winningPackage =
    results.first.annualPackageValue === results.second.annualPackageValue
      ? null
      : results.first.annualPackageValue > results.second.annualPackageValue
        ? "first"
        : "second";

  return (
    <div className="space-y-8">
      <div className="card-surface p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Comparateur de packages</p>
            <h2 className="section-title">Comparez fixe, variable, bonus et avantages</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-brand-stone">
              Idéal pour arbitrer entre deux offres, préparer une négociation salariale ou mesurer
              la vraie valeur d’un package au-delà du seul fixe annuel.
            </p>
          </div>
          <div className="rounded-3xl border border-brand-teal/15 bg-brand-mint/60 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Statut de référence
            </p>
            <p className="mt-2 text-lg font-semibold text-brand-ink">{activeStatus.label}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-brand-stone">Statut utilisé pour l’estimation nette :</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStatus(option.value)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    status === option.value
                      ? "bg-brand-teal text-white"
                      : "border border-brand-teal/20 bg-white text-brand-teal hover:bg-brand-mint"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-brand-stone">Atteinte du variable :</p>
                <span className="rounded-full bg-brand-mint px-3 py-1 text-sm font-semibold text-brand-teal">
                  {variableAchievement} %
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="150"
                step="5"
                value={variableAchievement}
                onChange={(event) => setVariableAchievement(Number(event.target.value))}
                className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-brand-teal/15"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-brand-stone">Nombre de mois de salaire :</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {salaryMonthOptions.map((months) => (
                  <button
                    key={months}
                    type="button"
                    onClick={() => setSalaryMonths(months)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      salaryMonths === months
                        ? "bg-[#163334] text-white"
                        : "border border-brand-teal/20 bg-white text-brand-teal hover:bg-brand-mint"
                    }`}
                  >
                    {months} mois
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PackageColumn
          packageData={packageA}
          onChange={setPackageA}
          highlighted={winningPackage === "first"}
        />
        <PackageColumn
          packageData={packageB}
          onChange={setPackageB}
          highlighted={winningPackage === "second"}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {[results.first, results.second].map((item, index) => (
          <div
            key={item.name + index}
            className={`card-surface p-8 ${
              (winningPackage === "first" && index === 0) || (winningPackage === "second" && index === 1)
                ? "border-brand-teal/40"
                : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">{item.name || `Package ${index === 0 ? "A" : "B"}`}</p>
                <h3 className="font-display text-3xl text-brand-ink">Vue synthétique</h3>
              </div>
              {(winningPackage === "first" && index === 0) || (winningPackage === "second" && index === 1) ? (
                <span className="rounded-full bg-brand-teal px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  Valeur la plus haute
                </span>
              ) : null}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-brand-mint/50 p-5">
                <p className="text-sm font-semibold text-brand-stone">Fixe annuel brut</p>
                <p className="mt-3 font-display text-4xl text-brand-ink">
                  {formatMoney(item.fixedAnnualGross)}
                </p>
              </div>
              <div className="rounded-3xl bg-brand-mint/50 p-5">
                <p className="text-sm font-semibold text-brand-stone">Variable cible</p>
                <p className="mt-3 font-display text-4xl text-brand-ink">
                  {formatMoney(item.targetVariable)}
                </p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-soft">
                <p className="text-sm font-semibold text-brand-stone">Variable retenu</p>
                <p className="mt-3 font-display text-3xl text-brand-ink">
                  {formatMoney(item.achievedVariable)}
                </p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-soft">
                <p className="text-sm font-semibold text-brand-stone">Bonus garanti</p>
                <p className="mt-3 font-display text-3xl text-brand-ink">
                  {formatMoney(item.bonusAnnual)}
                </p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-soft">
                <p className="text-sm font-semibold text-brand-stone">Avantages annuels</p>
                <p className="mt-3 font-display text-3xl text-brand-ink">
                  {formatMoney(item.annualBenefits)}
                </p>
              </div>
              <div className="rounded-3xl bg-[#163334] p-5 text-white">
                <p className="text-sm font-semibold text-white/70">Valeur totale du package</p>
                <p className="mt-3 font-display text-4xl text-teal-200">
                  {formatMoney(item.annualPackageValue)}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-brand-teal/10 px-4 py-4">
                <p className="text-sm font-semibold text-brand-stone">Cash sécurisé</p>
                <p className="mt-2 text-xl font-semibold text-brand-ink">
                  {formatMoney(item.securedAnnualCash)}
                </p>
              </div>
              <div className="rounded-2xl border border-brand-teal/10 px-4 py-4">
                <p className="text-sm font-semibold text-brand-stone">Équiv. mensuel brut</p>
                <p className="mt-2 text-xl font-semibold text-brand-ink">
                  {formatMoney(item.monthlyGrossEquivalent)}
                </p>
              </div>
              <div className="rounded-2xl border border-brand-teal/10 px-4 py-4">
                <p className="text-sm font-semibold text-brand-stone">Équiv. mensuel net estimé</p>
                <p className="mt-2 text-xl font-semibold text-brand-ink">
                  {formatMoney(item.monthlyNetEstimate)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card-surface overflow-hidden border-none bg-gradient-to-br from-slate-950 via-[#163334] to-teal-950 p-8 text-white">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-200">
              Lecture rapide
            </p>
            <h3 className="mt-3 font-display text-4xl">Comparaison instantanée</h3>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
            {activeStatus.label}
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-white/70">Écart de valeur totale</p>
            <p className="mt-3 font-display text-4xl text-teal-200">
              {formatMoney(Math.abs(results.totalDelta))}
            </p>
            <p className="mt-3 text-sm leading-7 text-white/70">
              {results.totalDelta > 0
                ? `${results.second.name || "Package B"} prend l’avantage en valeur totale.`
                : results.totalDelta < 0
                  ? `${results.first.name || "Package A"} prend l’avantage en valeur totale.`
                  : "Les deux packages sont équivalents en valeur totale."}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-white/70">Écart de fixe annuel</p>
            <p className="mt-3 font-display text-4xl text-teal-200">
              {formatMoney(Math.abs(results.fixedDelta))}
            </p>
            <p className="mt-3 text-sm leading-7 text-white/70">
              Le fixe reste le meilleur indicateur de sécurité de revenu d’une offre à l’autre.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-white/70">Écart d’avantages</p>
            <p className="mt-3 font-display text-4xl text-teal-200">
              {formatMoney(Math.abs(results.benefitsDelta))}
            </p>
            <p className="mt-3 text-sm leading-7 text-white/70">
              Les avantages peuvent compenser une partie d’un écart de fixe, surtout sur une vision annuelle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
