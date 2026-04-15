"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import TurnstileWidget from "@/components/TurnstileWidget";

const STORAGE_KEY = "sks-site-feedback-prompt";

type SessionState = {
  startedAt: number;
  attempts: number;
  submitted: boolean;
};

function readState(): SessionState {
  if (typeof window === "undefined") {
    return { startedAt: 0, attempts: 0, submitted: false };
  }

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = { startedAt: Date.now(), attempts: 0, submitted: false };
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }

    const parsed = JSON.parse(raw) as SessionState;
    return {
      startedAt: parsed.startedAt || Date.now(),
      attempts: parsed.attempts ?? 0,
      submitted: Boolean(parsed.submitted)
    };
  } catch {
    return { startedAt: Date.now(), attempts: 0, submitted: false };
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
  const [state, setState] = useState<SessionState>({ startedAt: 0, attempts: 0, submitted: false });
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
    if (!state.startedAt || state.submitted || state.attempts >= 2) {
      return;
    }

    const elapsed = Date.now() - state.startedAt;
    const firstDelay = Math.max(60000 - elapsed, 0);
    const secondDelay = Math.max(120000 - elapsed, 0);

    let firstTimer: ReturnType<typeof setTimeout> | undefined;
    let secondTimer: ReturnType<typeof setTimeout> | undefined;

    if (state.attempts === 0) {
      firstTimer = setTimeout(() => {
        setIsOpen(true);
      }, firstDelay);
    }

    if (state.attempts <= 1) {
      secondTimer = setTimeout(() => {
        const latest = readState();
        if (!latest.submitted && latest.attempts === 1) {
          setState(latest);
          setIsOpen(true);
        }
      }, secondDelay);
    }

    return () => {
      if (firstTimer) {
        clearTimeout(firstTimer);
      }
      if (secondTimer) {
        clearTimeout(secondTimer);
      }
    };
  }, [state]);

  const canSubmit = useMemo(() => {
    return rating >= 1 && comment.trim().length >= 2 && (!turnstileEnabled || turnstileToken.length > 10);
  }, [comment, rating, turnstileEnabled, turnstileToken]);

  function dismissPrompt() {
    const nextState = {
      ...state,
      attempts: Math.min(state.attempts + 1, 2)
    };
    writeState(nextState);
    setState(nextState);
    setIsOpen(false);
  }

  function handleSubmit() {
    setErrorMessage("");
    setSuccessMessage("");

    if (!canSubmit) {
      setErrorMessage("Ajoutez une note et un retour rapide avant l’envoi.");
      return;
    }

    startTransition(async () => {
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
            sessionAttempts: state.attempts + 1,
            website: "",
            turnstileToken
          })
        });

        const payload = (await response.json()) as { ok?: boolean; message?: string };

        if (!response.ok || !payload.ok) {
          setErrorMessage(payload.message ?? "Le retour n’a pas pu être envoyé.");
          return;
        }

        const nextState = {
          ...state,
          attempts: 2,
          submitted: true
        };

        writeState(nextState);
        setState(nextState);
        setSuccessMessage("Merci, votre retour a bien été envoyé.");
        setTimeout(() => {
          setIsOpen(false);
        }, 1200);
      } catch {
        setErrorMessage("Un incident temporaire empêche l’envoi.");
      }
    });
  }

  if (!isOpen || state.submitted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-brand-ink/30 p-4 sm:items-center">
      <div className="w-full max-w-lg rounded-[28px] border border-brand-teal/15 bg-white p-6 shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
          Votre avis
        </p>
        <h2 className="mt-3 font-display text-4xl text-brand-ink">
          Que pensez-vous du site jusqu’ici ?
        </h2>
        <p className="mt-3 text-sm leading-7 text-brand-stone">
          Notez de 1 à 5 puis dites rapidement ce qui pourrait être amélioré ou ce que vous aimeriez voir.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                rating === value
                  ? "bg-brand-teal text-white"
                  : "border border-brand-teal/20 text-brand-teal hover:bg-brand-mint"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value.slice(0, 320))}
          rows={4}
          className="mt-5 w-full rounded-2xl border border-brand-teal/15 px-4 py-3 text-sm text-brand-ink outline-none transition focus:border-brand-teal"
          placeholder="Un retour court suffit."
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
  );
}
