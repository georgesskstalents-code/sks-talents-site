"use client";

import { useMemo, useState, useTransition } from "react";
import CalendlyButton from "@/components/CalendlyButton";
import TurnstileWidget from "@/components/TurnstileWidget";

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
  const [form, setForm] = useState<FormState>(initialState);
  const [state, setState] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [isPending, startTransition] = useTransition();
  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  const canSubmit = useMemo(
    () =>
      form.firstName.trim().length > 1 &&
      form.lastName.trim().length > 1 &&
      /\S+@\S+\.\S+/.test(form.email) &&
      form.phone.replace(/[^\d+]/g, "").length >= 8 &&
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
      setState("error");
      setMessage("Merci de compléter prénom, nom, email et téléphone avant l’envoi.");
      return;
    }

    startTransition(async () => {
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
          setState("error");
          setMessage(payload.message ?? "Votre demande n’a pas pu être enregistrée.");
          return;
        }

        setForm(initialState);
        setTurnstileToken("");
        setState("success");
        setMessage("Merci, votre demande a bien été envoyée à infos@skstalents.com.");
      } catch {
        setState("error");
        setMessage("Un incident temporaire bloque l’envoi. Réessayez dans quelques instants.");
      }
    });
  }

  return (
    <div className={`card-surface ${compact ? "p-6" : "p-8"}`}>
      <p className="eyebrow">Parler à SKS TALENTS</p>
      <h3 className="font-display text-4xl text-brand-ink">{title}</h3>
      <p className="mt-4 text-base leading-8 text-brand-stone">{description}</p>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            value={form.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
            className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
            placeholder="Prénom*"
            autoComplete="given-name"
          />
          <input
            value={form.lastName}
            onChange={(event) => updateField("lastName", event.target.value)}
            className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
            placeholder="Nom*"
            autoComplete="family-name"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
            placeholder="Email professionnel*"
            autoComplete="email"
            inputMode="email"
          />
          <input
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
            placeholder="Téléphone*"
            autoComplete="tel"
            inputMode="tel"
          />
        </div>

        <input
          value={form.company}
          onChange={(event) => updateField("company", event.target.value)}
          className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
          placeholder="Entreprise"
          autoComplete="organization"
        />

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
            {isPending ? "Envoi..." : "Être rappelé"}
          </button>
          <CalendlyButton label="Ou réserver un call" tone="outline" />
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-3 text-sm text-brand-stone">
        <a
          href="mailto:infos@skstalents.com"
          className="font-semibold text-brand-teal transition hover:opacity-80"
        >
          infos@skstalents.com
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
