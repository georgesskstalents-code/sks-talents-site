"use client";

import { useMemo, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import CalendlyButton from "@/components/CalendlyButton";
import GuaranteeBadge from "@/components/GuaranteeBadge";
import TurnstileWidget from "@/components/TurnstileWidget";
import { trackSiteTelemetry } from "@/lib/siteTelemetryClient";

type Props = {
  title: string;
  description: string;
  role?: string;
  sector?: string;
  compact?: boolean;
};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: ""
};

export default function InlineLeadForm({
  title,
  description,
  role = "Direction / Talent",
  sector = "Life Sciences",
  compact = false
}: Props) {
  const pathname = usePathname();
  const [form, setForm] = useState<FormState>(initialState);
  const [state, setState] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [isPending, startTransition] = useTransition();
  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  const canSubmit = useMemo(
    () =>
      form.firstName.trim().length > 1 &&
      /\S+@\S+\.\S+/.test(form.email) &&
      (!turnstileEnabled || turnstileToken.length > 10),
    [form, turnstileEnabled, turnstileToken]
  );

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setState("idle");
    setMessage("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      trackSiteTelemetry({
        type: "form_error",
        path: pathname || "/",
        target: "inline-lead-form",
        message: "client_validation"
      });
      setState("error");
      setMessage("Merci de renseigner votre prénom et votre email avant l’envoi.");
      return;
    }

    startTransition(async () => {
      trackSiteTelemetry({
        type: "form_submit",
        path: pathname || "/",
        target: "inline-lead-form"
      });

      try {
        const response = await fetch("/api/callback-request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            role,
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            company: form.company,
            sector,
            urgency: "Sous 7 jours",
            message: "Lead généré depuis un formulaire inline du site.",
            consent: true,
            website: "",
            turnstileToken
          })
        });

        const payload = (await response.json()) as { ok?: boolean; message?: string };

        if (!response.ok || !payload.ok) {
          trackSiteTelemetry({
            type: "form_error",
            path: pathname || "/",
            target: "inline-lead-form",
            message: payload.message ?? "api_rejected"
          });
          setState("error");
          setMessage(payload.message ?? "Votre demande n’a pas pu être enregistrée.");
          return;
        }

        trackSiteTelemetry({
          type: "form_success",
          path: pathname || "/",
          target: "inline-lead-form"
        });
        setForm(initialState);
        setTurnstileToken("");
        setState("success");
        setMessage("Merci, votre demande a bien été envoyée à g.kengue@skstalents.fr.");
      } catch {
        trackSiteTelemetry({
          type: "form_error",
          path: pathname || "/",
          target: "inline-lead-form",
          message: "network_error"
        });
        setState("error");
        setMessage("Un incident temporaire bloque l’envoi. Réessayez dans quelques instants.");
      }
    });
  }

  return (
    <div className={`card-surface ${compact ? "p-6" : "p-6 sm:p-8"}`}>
      <p className="eyebrow">Parler à SKS TALENTS</p>
      <h3 className="font-display text-2xl leading-[1.15] text-brand-ink sm:text-4xl">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-brand-stone sm:mt-4 sm:text-base sm:leading-8">{description}</p>

      <p className="mt-2 hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal md:inline-flex">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse" />
        Déjà 100+ dirigeants Life Sciences &amp; Santé animale accompagnés
      </p>

      <div className="mt-4 hidden md:block">
        <GuaranteeBadge variant="compact" />
      </div>

      <form className="mt-4 grid gap-3 sm:mt-6 sm:gap-4" onSubmit={handleSubmit} noValidate>
        <input
          value={form.firstName}
          onChange={(event) => updateField("firstName", event.target.value)}
          className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
          placeholder="Prénom*"
          autoComplete="given-name"
        />

        <input
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
          placeholder="Email professionnel*"
          autoComplete="email"
          inputMode="email"
        />

        <details className="group rounded-2xl border border-brand-teal/10 bg-brand-mint/15 px-4 py-3">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
            + Ajouter téléphone &amp; entreprise (optionnel)
          </summary>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <input
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className="rounded-2xl border border-brand-teal/15 px-4 py-3 text-sm outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
              placeholder="Téléphone"
              autoComplete="tel"
              inputMode="tel"
            />
            <input
              value={form.company}
              onChange={(event) => updateField("company", event.target.value)}
              className="rounded-2xl border border-brand-teal/15 px-4 py-3 text-sm outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
              placeholder="Entreprise"
              autoComplete="organization"
            />
          </div>
        </details>

        <TurnstileWidget onVerify={setTurnstileToken} className="rounded-2xl border border-brand-teal/10 bg-brand-mint/35 px-4 py-4" />

        {message ? (
          <p
            className={`rounded-2xl px-4 py-3 text-sm ${
              state === "success"
                ? "bg-brand-mint text-brand-teal"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Envoi..." : "Réserver 15 min d’analyse"}
          </button>
          <CalendlyButton label="Ou réserver un call" tone="outline" />
        </div>
      </form>

      <div className="mt-6 rounded-2xl border border-brand-teal/10 bg-brand-mint/15 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-teal">
          Votre interlocuteur direct
        </p>
        <div className="mt-3 flex items-center gap-4">
          <img
            src="/images/georges-kengue.jpeg"
            alt="Georges Kengue, fondateur de SKS Talents"
            className="h-14 w-14 rounded-full object-cover ring-2 ring-white shadow-soft"
            loading="lazy"
          />
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg leading-tight text-brand-ink">Georges Kengue</p>
            <p className="text-xs leading-5 text-brand-stone">
              Fondateur SKS TALENTS · Executive Search Life Sciences
            </p>
          </div>
          <a
            href="https://www.linkedin.com/in/georges-kengue-81988b36/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Profil LinkedIn de Georges Kengue"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal text-white transition hover:opacity-90"
          >
            <svg
              role="img"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67h-3.55V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0Z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-sm text-brand-stone">
        <a
          href="mailto:g.kengue@skstalents.fr"
          className="font-semibold text-brand-teal transition hover:opacity-80"
        >
          g.kengue@skstalents.fr
        </a>
        <a
          href="https://fr.trustpilot.com/review/skstalents.fr"
          target="_blank"
          rel="noreferrer noopener"
          className="font-semibold text-brand-teal transition hover:opacity-80"
        >
          Voir les avis Trustpilot
        </a>
      </div>
    </div>
  );
}
