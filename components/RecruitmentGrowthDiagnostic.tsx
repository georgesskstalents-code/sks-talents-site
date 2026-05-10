"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";
import CommercialNextSteps from "@/components/CommercialNextSteps";
import InlineLeadForm from "@/components/InlineLeadForm";
import { trackSiteTelemetry } from "@/lib/siteTelemetryClient";
import {
  buildDiagnosticReportHref,
  diagnosticQuestions as questions,
  getDiagnosticResult,
  initialAnswers,
  isDiagnosticComplete,
  type Answers
} from "@/lib/recruitmentDiagnostic";

export default function RecruitmentGrowthDiagnostic() {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [submitted, setSubmitted] = useState(false);

  const isComplete = useMemo(() => isDiagnosticComplete(answers), [answers]);

  const result = useMemo(
    () => (isComplete ? getDiagnosticResult(answers) : null),
    [answers, isComplete]
  );

  function updateAnswer<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((current) => ({ ...current, [key]: value }));
    if (submitted) {
      setSubmitted(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isComplete) {
      return;
    }

    setSubmitted(true);
    trackSiteTelemetry({
      type: "form_submit",
      path: "/diagnostic",
      target: "diagnostic-growth"
    });
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
        <form className="card-surface p-6 sm:p-8" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <p className="eyebrow">5 questions simples</p>
            <h2 className="font-display text-4xl text-brand-ink sm:text-5xl">
              Diagnostic : votre recrutement est-il un frein à votre croissance ?
            </h2>
            <p className="text-base leading-8 text-brand-stone">
              Le but n’est pas de vous vendre quelque chose. Le but est d’identifier si le vrai
              problème vient du sourcing, de la décision, de la structuration RH ou de la surcharge
              opérationnelle.
            </p>
          </div>

          <div className="mt-8 space-y-5">
            {questions.map((question, index) => (
              <fieldset
                key={question.id}
                className="rounded-[28px] border border-brand-teal/10 bg-white px-5 py-5"
              >
                <legend className="flex items-start gap-3 text-lg font-semibold leading-7 text-brand-ink">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-mint text-xs font-semibold uppercase tracking-[0.14em] text-brand-teal">
                    0{index + 1}
                  </span>
                  <span>{question.title}</span>
                </legend>

                <div className="mt-5 grid gap-3">
                  {question.options.map((option) => {
                    const checked = answers[question.id as keyof Answers] === option.value;

                    return (
                      <label
                        key={option.label}
                        className={`cursor-pointer rounded-[22px] border px-4 py-4 text-sm leading-7 transition ${
                          checked
                            ? "border-brand-teal bg-brand-mint/55 text-brand-ink"
                            : "border-brand-teal/10 bg-brand-mint/20 text-brand-stone hover:border-brand-teal/30 hover:bg-brand-mint/35"
                        }`}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={option.value}
                          checked={checked}
                          onChange={() =>
                            updateAnswer(question.id as keyof Answers, option.value as Answers[keyof Answers])
                          }
                          className="sr-only"
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={!isComplete}
              className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Voir mon diagnostic
            </button>
            <p className="text-sm leading-7 text-brand-stone">
              Résultat immédiat, sans inscription obligatoire.
            </p>
          </div>
        </form>

        <aside className="card-surface bg-grain p-6 sm:p-8">
          <p className="eyebrow">Ce que vous obtenez</p>
          <h2 className="font-display text-4xl text-brand-ink sm:text-5xl">
            Une lecture utile, pas un quiz gadget.
          </h2>
          <div className="mt-6 grid gap-4">
            {[
              "Un verdict simple sur le niveau de friction actuel.",
              "3 priorités concrètes pour reprendre le contrôle.",
              "Une recommandation claire : executive search, RPO, structuration RH ou automatisation.",
              "Une proposition d’échange si vous voulez aller plus loin."
            ].map((item) => (
              <div
                key={item}
                className="rounded-[22px] border border-brand-teal/10 bg-white px-5 py-4"
              >
                <p className="text-sm leading-7 text-brand-stone">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[28px] border border-brand-teal/10 bg-brand-mint/35 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Positionnement
            </p>
            <p className="mt-3 text-sm leading-7 text-brand-stone">
              Ici, le sujet n’est pas “faire du recrutement”. Le sujet est de faire gagner du temps
              aux dirigeants, de débloquer la croissance et d’éviter que les RH deviennent un frein
              invisible.
            </p>
          </div>
        </aside>
      </div>

      {submitted && result ? (
        <div className="space-y-6">
          <section className="card-surface p-6 sm:p-8">
            <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr] xl:items-start">
              <div className="space-y-4">
                <p className="eyebrow">Votre résultat</p>
                <h2 className="font-display text-4xl text-brand-ink sm:text-5xl">
                  {result.health.title}
                </h2>
                <p className="text-base leading-8 text-brand-stone">{result.health.summary}</p>
                <div className="rounded-[24px] border border-brand-teal/10 bg-brand-mint/35 px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                    Prochaine étape recommandée
                  </p>
                  <h3 className="mt-3 font-display text-3xl text-brand-ink">
                    {result.topRecommendation.label}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-brand-stone">
                    {result.topRecommendation.reason}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[24px] border border-brand-teal/10 bg-white px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                    Vos 3 priorités
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-brand-stone">
                    {result.priorities.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <CalendlyButton label="Je réserve un call - 15 min" tone="solid" />
                  <Link
                    href={result.topRecommendation.href}
                    className="inline-flex items-center justify-center rounded-full border border-brand-teal/20 bg-white px-6 py-4 text-sm font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-mint"
                  >
                    Voir la page recommandée
                  </Link>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    href={buildDiagnosticReportHref(answers)}
                    className="inline-flex items-center justify-center rounded-full border border-brand-teal/20 bg-white px-6 py-4 text-sm font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-mint"
                  >
                    Ouvrir le rapport PDF
                  </Link>
                  <Link
                    href="/scorecard-dirigeant"
                    className="inline-flex items-center justify-center rounded-full border border-brand-teal/20 bg-white px-6 py-4 text-sm font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-mint"
                  >
                    Voir la mini scorecard
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <CommercialNextSteps
            title="Après le diagnostic"
            description="Passez du constat à l’action avec un rapport imprimable, une scorecard dirigeant et les pages les plus utiles pour décider."
          />

          <InlineLeadForm
            title="Recevoir une lecture personnalisée de votre diagnostic"
            description="Si vous voulez aller plus loin, laissez vos coordonnées. Nous revenons avec une lecture claire de ce qui ralentit votre recrutement ou vos RH, et de la meilleure trajectoire pour reprendre le contrôle."
            role="CEO / COO / DRH"
            sector="Diagnostic croissance RH"
          />
        </div>
      ) : null}
    </div>
  );
}
