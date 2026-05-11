"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { Star } from "lucide-react";
import TurnstileWidget from "@/components/TurnstileWidget";
import { trackSiteTelemetry } from "@/lib/siteTelemetryClient";

const STORAGE_KEY = "sks-site-feedback-prompt-v3";
// Rule (CEO 2026-05-11): apparait une seule fois par session, au seuil de 3min, reste 7s, puis disparait.
const APPEAR_AT_MS = 3 * 60 * 1000;
const STAY_DURATION_MS = 7 * 1000;

type SessionState = {
  startedAt: number;
  submitted: boolean;
  dismissedOnce?: boolean;
};

function readState(): SessionState {
  if (typeof window === "undefined") {
    return { startedAt: 0, submitted: false };
  }

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = { startedAt: Date.now(), submitted: false };
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }

    const parsed = JSON.parse(raw) as SessionState;
    return {
      startedAt: parsed.startedAt || Date.now(),
      submitted: Boolean(parsed.submitted),
      dismissedOnce: Boolean(parsed.dismissedOnce)
    };
  } catch {
    return { startedAt: Date.now(), submitted: false, dismissedOnce: false };
  }
}

function writeState(value: SessionState) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export default function SiteFeedbackPrompt() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showLauncher, setShowLauncher] = useState(false);
  const [state, setState] = useState<SessionState>({
    startedAt: 0,
    submitted: false
  });
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [isPending, startTransition] = useTransition();

  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  useEffect(() => {
    const nextState = readState();
    setState(nextState);
  }, []);

  useEffect(() => {
    if (!state.startedAt || state.submitted || state.dismissedOnce) {
      return;
    }

    const elapsed = Date.now() - state.startedAt;
    const remaining = APPEAR_AT_MS - elapsed;

    let hideTimer: number | undefined;
    let showTimer: number | undefined;

    const triggerShow = () => {
      setShowLauncher(true);
      hideTimer = window.setTimeout(() => {
        setShowLauncher(false);
        const next: SessionState = { ...state, dismissedOnce: true };
        writeState(next);
        setState(next);
      }, STAY_DURATION_MS);
    };

    if (remaining <= 0) {
      triggerShow();
    } else {
      showTimer = window.setTimeout(triggerShow, remaining);
    }

    return () => {
      if (hideTimer) window.clearTimeout(hideTimer);
      if (showTimer) window.clearTimeout(showTimer);
    };
  }, [state]);

  const canSubmit = useMemo(() => {
    return rating >= 1 && comment.trim().length >= 2 && (!turnstileEnabled || turnstileToken.length > 10);
  }, [comment, rating, turnstileEnabled, turnstileToken]);

  function dismissPrompt() {
    setIsOpen(false);
  }

  function handleSubmit() {
    setErrorMessage("");
    setSuccessMessage("");

    if (!canSubmit) {
      trackSiteTelemetry({
        type: "form_error",
        path: pathname || "/",
        target: "site-feedback-prompt",
        message: "client_validation"
      });
      setErrorMessage("Ajoutez une note et un retour rapide avant l’envoi.");
      return;
    }

    startTransition(async () => {
      trackSiteTelemetry({
        type: "form_submit",
        path: pathname || "/",
        target: "site-feedback-prompt"
      });

      try {
        const response = await fetch("/api/site-feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            rating,
            comment,
            pagePath: pathname,
            pageTitle: typeof document !== "undefined" ? document.title : "",
            sessionAttempts: 1,
            website: "",
            turnstileToken
          })
        });

        const payload = (await response.json()) as { ok?: boolean; message?: string };

        if (!response.ok || !payload.ok) {
          trackSiteTelemetry({
            type: "form_error",
            path: pathname || "/",
            target: "site-feedback-prompt",
            message: payload.message ?? "api_rejected"
          });
          setErrorMessage(payload.message ?? "Le retour n’a pas pu être envoyé.");
          return;
        }

        trackSiteTelemetry({
          type: "form_success",
          path: pathname || "/",
          target: "site-feedback-prompt"
        });
        const nextState = {
          ...state,
          submitted: true
        };

        writeState(nextState);
        setState(nextState);
        setShowLauncher(false);
        setSuccessMessage("Merci, votre retour a bien été envoyé.");
        setTimeout(() => {
          setIsOpen(false);
        }, 1200);
      } catch {
        trackSiteTelemetry({
          type: "form_error",
          path: pathname || "/",
          target: "site-feedback-prompt",
          message: "network_error"
        });
        setErrorMessage("Un incident temporaire empêche l’envoi.");
      }
    });
  }

  return (
    <>
      {!isOpen && !state.submitted && showLauncher ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="animate-soft-pulse fixed bottom-5 left-5 z-[69] inline-block rounded-full border border-brand-teal/20 bg-white/95 px-5 py-3 text-left shadow-xl backdrop-blur transition hover:-translate-y-0.5"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-teal">
            Votre avis
          </p>
          <p className="mt-1 text-sm font-semibold text-brand-ink">Que pensez-vous du site ?</p>
        </button>
      ) : null}
      {isOpen && !state.submitted ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-brand-ink/30 p-4 sm:items-center">
          <div className="w-full max-w-xl rounded-[28px] border border-brand-teal/15 bg-white p-6 shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Votre avis
            </p>
            <h2 className="mt-3 font-display text-4xl text-brand-ink">
              Que pensez-vous du site jusqu’ici ?
            </h2>
            <p className="mt-3 text-sm leading-7 text-brand-stone">
              Notez votre expérience, puis dites-nous ce qui manque, ce qui bloque ou quels contenus vous aimeriez voir pour rendre le site plus utile.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    rating === value
                      ? "bg-brand-teal text-white shadow-soft"
                      : "border border-brand-teal/20 text-brand-teal hover:bg-brand-mint"
                  }`}
                  aria-label={`${value} étoiles`}
                >
                  <Star className={`h-4 w-4 ${rating >= value ? "fill-current" : ""}`} />
                  {value}
                </button>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Le site est clair",
                "Je veux plus de salaires",
                "Je veux plus de fiches métiers",
                "Je veux plus d’articles marché",
                "Le chat doit être plus visible"
              ].map((idea) => (
                <button
                  key={idea}
                  type="button"
                  onClick={() => setComment((current) => (current ? `${current} ${idea}` : idea))}
                  className="rounded-full border border-brand-teal/15 bg-brand-mint/55 px-3 py-2 text-xs font-semibold text-brand-teal transition hover:bg-brand-mint"
                >
                  {idea}
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value.slice(0, 320))}
              rows={4}
              className="mt-5 w-full rounded-2xl border border-brand-teal/15 px-4 py-3 text-sm text-brand-ink outline-none transition focus:border-brand-teal"
              placeholder="Un retour court suffit, par exemple sur les contenus, les pages ou ce qui pourrait être amélioré."
            />
            <input type="text" className="hidden" tabIndex={-1} autoComplete="off" />
            <div className="mt-4">
              <TurnstileWidget onVerify={setTurnstileToken} />
            </div>
            {errorMessage ? (
              <p className="mt-3 text-sm font-medium text-red-600">{errorMessage}</p>
            ) : null}
            {successMessage ? (
              <p className="mt-3 text-sm font-medium text-emerald-600">{successMessage}</p>
            ) : null}
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={dismissPrompt}
                className="rounded-full border border-brand-teal/20 px-4 py-2 text-sm font-semibold text-brand-stone transition hover:bg-brand-mint"
              >
                Continuer sans répondre
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit || isPending}
                className="rounded-full bg-brand-teal px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
