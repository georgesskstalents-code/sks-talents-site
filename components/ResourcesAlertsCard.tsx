"use client";

import { useMemo, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import TurnstileWidget from "@/components/TurnstileWidget";
import { trackSiteTelemetry } from "@/lib/siteTelemetryClient";

const interestOptions = [
  "Marché & recrutement",
  "Événements & séminaires",
  "Écoles & viviers",
  "Fonds & écosystème",
  "Salaires & métiers"
] as const;

export default function ResourcesAlertsCard() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Marché & recrutement",
    "Événements & séminaires"
  ]);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "success" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  const canSubmit = useMemo(
    () => /\S+@\S+\.\S+/.test(email) && (!turnstileEnabled || turnstileToken.length > 10),
    [email, turnstileEnabled, turnstileToken]
  );

  function toggleInterest(value: string) {
    setSelectedInterests((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
    setState("idle");
    setMessage("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      trackSiteTelemetry({
        type: "form_error",
        path: pathname || "/resources",
        target: "resources-alerts-form",
        message: "client_validation"
      });
      setState("error");
      setMessage("Merci de renseigner un email valide avant l’envoi.");
      return;
    }

    startTransition(async () => {
      trackSiteTelemetry({
        type: "form_submit",
        path: pathname || "/resources",
        target: "resources-alerts-form"
      });

      try {
        const response = await fetch("/api/resources-alerts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            interests: selectedInterests,
            website: "",
            turnstileToken
          })
        });

        const payload = (await response.json()) as { ok?: boolean; message?: string };

        if (!response.ok || !payload.ok) {
          trackSiteTelemetry({
            type: "form_error",
            path: pathname || "/resources",
            target: "resources-alerts-form",
            message: payload.message ?? "api_rejected"
          });
          setState("error");
          setMessage(payload.message ?? "L’inscription n’a pas pu être prise en compte.");
          return;
        }

        trackSiteTelemetry({
          type: "form_success",
          path: pathname || "/resources",
          target: "resources-alerts-form"
        });
        setState("success");
        setMessage(payload.message ?? "Merci, vous êtes bien inscrit.");
        setEmail("");
        setTurnstileToken("");
      } catch {
        trackSiteTelemetry({
          type: "form_error",
          path: pathname || "/resources",
          target: "resources-alerts-form",
          message: "network_error"
        });
        setState("error");
        setMessage("Un incident temporaire empêche l’inscription.");
      }
    });
  }

  return (
    <div className="card-luxe p-7">
      <p className="eyebrow">Alertes éditoriales</p>
      <h2 className="font-display text-4xl text-brand-ink">
        Recevoir les prochains signaux utiles de l’écosystème.
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-brand-stone">
        Laissez votre email pour recevoir en priorité les nouvelles ressources publiées par SKS TALENTS :
        marchés, métiers, événements, écoles, fonds et contenus à forte valeur pour les décideurs.
      </p>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setState("idle");
              setMessage("");
            }}
            className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
            placeholder="Email professionnel"
            autoComplete="email"
            inputMode="email"
          />
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((option) => {
              const active = selectedInterests.includes(option);

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleInterest(option)}
                  className={`rounded-full px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-brand-teal text-white"
                      : "border border-brand-teal/15 text-brand-stone hover:bg-brand-mint/45"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <TurnstileWidget
          onVerify={setTurnstileToken}
          className="rounded-2xl border border-brand-teal/10 bg-brand-mint/30 px-4 py-4"
        />

        {message ? (
          <p
            className={`rounded-2xl px-4 py-3 text-sm ${
              state === "success" ? "bg-brand-mint text-brand-teal" : "bg-red-50 text-red-700"
            }`}
          >
            {message}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm leading-7 text-brand-stone">
            Une veille utile, sans bruit, orientée marché, recrutement et écosystème.
          </p>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Inscription..." : "Recevoir les alertes"}
          </button>
        </div>
      </form>
    </div>
  );
}
