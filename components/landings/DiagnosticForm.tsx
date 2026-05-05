"use client";

import { useState, useTransition } from "react";
import { ArrowRight, Award, CheckCircle2 } from "lucide-react";
import CalendlyButton from "@/components/CalendlyButton";
import TurnstileWidget from "@/components/TurnstileWidget";
import { trackSiteTelemetry } from "@/lib/siteTelemetryClient";
import type { DiagnosticAnswers, DiagnosticSector } from "@/lib/diagnosticMatching";

export type DiagnosticQuestion = {
  id: keyof Pick<DiagnosticAnswers, "q1" | "q2" | "q3" | "q4" | "q5">;
  title: string;
  helper?: string;
  options: { value: string; label: string }[];
  /** If selected option key matches this list, show a free-text "Autre" input. */
  otherOptionValues?: string[];
};

type Props = {
  sector: DiagnosticSector;
  questions: [DiagnosticQuestion, DiagnosticQuestion, DiagnosticQuestion, DiagnosticQuestion, DiagnosticQuestion];
};

type AgentResult = {
  id: string;
  label: string;
  pitch: string;
  roiHeadline: string;
  badge?: string;
};

type DiagnosticApiResult = {
  primary: AgentResult;
  complements: AgentResult[];
  priorities: string[];
  frictionScore: { axis: string; score: number }[];
  roiSummary: string;
};

const ROLE_OPTIONS = ["CEO", "Co-fondateur", "COO", "DG", "CHRO", "DRH", "Autre"];

export default function DiagnosticForm({ sector, questions }: Props) {
  const [step, setStep] = useState<number>(0); // 0..4 = questions, 5 = lead, 6 = result
  const [answers, setAnswers] = useState<DiagnosticAnswers>({ q1: "", q2: "", q3: "", q4: "", q5: "" });
  const [lead, setLead] = useState({ email: "", firstName: "", lastName: "", company: "", role: "CEO" });
  const [turnstileToken, setTurnstileToken] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<DiagnosticApiResult | null>(null);
  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  const currentQuestion = step < 5 ? questions[step] : null;
  const totalSteps = 6;
  const progress = ((step + 1) / totalSteps) * 100;

  function selectOption(value: string) {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    setError("");
    if (currentQuestion.otherOptionValues?.includes(value)) {
      // Stay on this step so the user can fill the free-text "Autre"
      return;
    }
    if (step < 4) {
      setStep((s) => s + 1);
      trackSiteTelemetry({
        type: "form_submit",
        path: typeof window !== "undefined" ? window.location.pathname : "",
        target: `diagnostic_${sector}_q${step + 1}_answered`
      });
    } else if (step === 4) {
      setStep(5);
    }
  }

  function next() {
    if (!currentQuestion) return;
    if (!answers[currentQuestion.id]) {
      setError("Sélectionne une option pour continuer.");
      return;
    }
    setStep((s) => s + 1);
  }

  async function submit() {
    setError("");
    if (
      !lead.firstName.trim() ||
      !lead.email.trim() ||
      !/\S+@\S+\.\S+/.test(lead.email) ||
      !lead.company.trim()
    ) {
      setError("Merci de compléter prénom, email pro et société.");
      return;
    }
    if (turnstileEnabled && turnstileToken.length < 10) {
      setError("Vérification anti-bot en cours, réessaie dans 1 seconde.");
      return;
    }

    trackSiteTelemetry({
      type: "form_submit",
      path: typeof window !== "undefined" ? window.location.pathname : "",
      target: `diagnostic_${sector}_email_submitted`
    });

    startTransition(async () => {
      try {
        const response = await fetch("/api/diagnostic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sector, answers, lead, turnstileToken, website: "" })
        });
        const payload = (await response.json()) as { ok?: boolean; result?: DiagnosticApiResult; message?: string };
        if (!response.ok || !payload.ok || !payload.result) {
          setError(payload.message ?? "Le diagnostic n'a pas pu être enregistré.");
          return;
        }
        setResult(payload.result);
        setStep(6);
        trackSiteTelemetry({
          type: "form_success",
          path: typeof window !== "undefined" ? window.location.pathname : "",
          target: `diagnostic_${sector}_completed`
        });
      } catch {
        setError("Un incident temporaire bloque l'envoi. Réessaie dans quelques instants.");
      }
    });
  }

  // ----------------- Result view (step 6) -----------------
  if (step === 6 && result) {
    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-brand-teal/20 bg-white p-6 shadow-soft sm:p-8">
          <p className="eyebrow">Diagnostic personnalisé</p>
          <h3 className="t-h2 mt-2 font-display">
            Pour {lead.company} :{" "}
            <span className="italic text-brand-teal">votre agent IA prioritaire</span>
          </h3>

          <div className="mt-6 rounded-2xl border border-brand-teal/15 bg-brand-mint/30 p-5">
            <div className="flex items-start gap-3">
              <Award className="mt-1 h-6 w-6 shrink-0 text-brand-teal" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="t-h3 font-semibold text-brand-ink">{result.primary.label}</p>
                  {result.primary.badge && (
                    <span className="rounded-full bg-brand-ink px-2 py-0.5 text-eyebrow font-semibold uppercase text-white">
                      {result.primary.badge}
                    </span>
                  )}
                </div>
                <p className="mt-2 t-body">{result.primary.pitch}</p>
                <p className="mt-2 text-caption font-semibold uppercase text-brand-teal">
                  ROI projeté · {result.roiSummary}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-eyebrow font-semibold uppercase text-brand-stone/80">2 agents complémentaires</p>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {result.complements.map((c) => (
                <li key={c.id} className="rounded-2xl border border-brand-teal/10 bg-white p-3">
                  <p className="t-caption font-semibold text-brand-ink">{c.label}</p>
                  <p className="mt-1 text-caption text-brand-stone">{c.roiHeadline}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5">
            <p className="text-eyebrow font-semibold uppercase text-brand-stone/80">3 priorités · 6 mois</p>
            <ol className="mt-2 space-y-2">
              {result.priorities.map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                  <span className="t-body">{p}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CalendlyButton label="Réserver mes 15 min →" tone="solid" />
            <span className="t-caption self-center">
              Tu reçois aussi ce diagnostic par email à {lead.email}.
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ----------------- Lead form (step 5) -----------------
  if (step === 5) {
    return (
      <div className="rounded-3xl border border-brand-teal/15 bg-white p-6 shadow-soft sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="eyebrow">Étape finale</p>
          <span className="text-caption text-brand-stone">6 / 6</span>
        </div>
        <h3 className="t-h2 font-display">Où t'envoyer ton diagnostic ?</h3>
        <p className="mt-2 t-body">Email pro, prénom + nom et société. On te répond sous 24h.</p>

        <div className="mt-5 space-y-3">
          <input
            type="text"
            placeholder="Prénom*"
            autoComplete="given-name"
            value={lead.firstName}
            onChange={(e) => setLead({ ...lead, firstName: e.target.value })}
            className="w-full rounded-2xl border border-brand-teal/15 px-4 py-3.5 t-body outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
          />
          <input
            type="text"
            placeholder="Nom"
            autoComplete="family-name"
            value={lead.lastName}
            onChange={(e) => setLead({ ...lead, lastName: e.target.value })}
            className="w-full rounded-2xl border border-brand-teal/15 px-4 py-3.5 t-body outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
          />
          <input
            type="email"
            placeholder="Email professionnel*"
            autoComplete="email"
            inputMode="email"
            value={lead.email}
            onChange={(e) => setLead({ ...lead, email: e.target.value })}
            className="w-full rounded-2xl border border-brand-teal/15 px-4 py-3.5 t-body outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
          />
          <input
            type="text"
            placeholder="Société*"
            autoComplete="organization"
            value={lead.company}
            onChange={(e) => setLead({ ...lead, company: e.target.value })}
            className="w-full rounded-2xl border border-brand-teal/15 px-4 py-3.5 t-body outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
          />
          <select
            value={lead.role}
            onChange={(e) => setLead({ ...lead, role: e.target.value })}
            className="w-full rounded-2xl border border-brand-teal/15 px-4 py-3.5 t-body outline-none transition focus:border-brand-teal"
          >
            {ROLE_OPTIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>

          {turnstileEnabled && (
            <TurnstileWidget onVerify={setTurnstileToken} className="rounded-2xl border border-brand-teal/10 bg-brand-mint/30 px-4 py-3" />
          )}
        </div>

        {error && <p className="mt-3 rounded-2xl bg-red-50 px-4 py-3 t-caption text-red-700">{error}</p>}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setStep(4)}
            className="inline-flex items-center justify-center rounded-full border border-brand-teal/20 px-5 py-3.5 t-body font-semibold text-brand-teal transition hover:bg-brand-mint"
          >
            ← Retour
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={submit}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-ink px-6 py-4 t-body font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Envoi en cours…" : "Recevoir mon diagnostic"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // ----------------- Question view (step 0..4) -----------------
  if (!currentQuestion) return null;
  const value = answers[currentQuestion.id];
  const isOtherSelected = currentQuestion.otherOptionValues?.includes(value);
  const otherKey = `${currentQuestion.id}Other` as const;
  const otherValue = (answers as Record<string, string | undefined>)[otherKey] ?? "";

  return (
    <div className="rounded-3xl border border-brand-teal/15 bg-white p-6 shadow-soft sm:p-8">
      <div className="mb-4 flex items-center justify-between">
        <p className="eyebrow">Question {step + 1} / 5</p>
        <span className="text-caption text-brand-stone">{Math.round(progress)}%</span>
      </div>
      <div className="mb-5 h-1 overflow-hidden rounded-full bg-brand-teal/10">
        <div
          className="h-full bg-brand-teal transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <h3 className="t-h2 font-display">{currentQuestion.title}</h3>
      {currentQuestion.helper && <p className="mt-2 t-body">{currentQuestion.helper}</p>}

      <div className="mt-5 space-y-2">
        {currentQuestion.options.map((opt) => {
          const isActive = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => selectOption(opt.value)}
              className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3.5 text-left transition active:scale-[0.99] ${
                isActive
                  ? "border-brand-teal bg-brand-mint/40 shadow-sm"
                  : "border-brand-teal/15 bg-white hover:border-brand-teal/40 hover:bg-brand-mint/15"
              }`}
            >
              <span
                className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  isActive ? "border-brand-teal bg-brand-teal" : "border-brand-teal/30"
                }`}
              >
                {isActive && <span className="h-2 w-2 rounded-full bg-white" />}
              </span>
              <span className="t-body">{opt.label}</span>
            </button>
          );
        })}

        {isOtherSelected && (
          <input
            type="text"
            placeholder="Précise (optionnel)"
            value={otherValue}
            onChange={(e) =>
              setAnswers((prev) => ({ ...prev, [otherKey]: e.target.value }))
            }
            className="w-full rounded-2xl border border-brand-teal/30 bg-brand-mint/20 px-4 py-3 t-body outline-none transition focus:border-brand-teal"
          />
        )}
      </div>

      {error && <p className="mt-3 rounded-2xl bg-red-50 px-4 py-3 t-caption text-red-700">{error}</p>}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex items-center justify-center rounded-full border border-brand-teal/20 px-5 py-3.5 t-body font-semibold text-brand-teal transition hover:bg-brand-mint"
          >
            ← Retour
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={next}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-ink px-6 py-3.5 t-body font-semibold text-white transition hover:opacity-90"
        >
          {step < 4 ? "Question suivante" : "Voir mon diagnostic"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
