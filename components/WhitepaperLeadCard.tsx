"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import CalendlyButton from "@/components/CalendlyButton";
import CommercialNextSteps from "@/components/CommercialNextSteps";
import TurnstileWidget from "@/components/TurnstileWidget";
import { trackSiteTelemetry } from "@/lib/siteTelemetryClient";

type Props = {
  whitepaperId: string;
  title: string;
  description: string;
  benefit: string;
  problem: string;
  ctaLabel: string;
  guideHref: string;
};

export default function WhitepaperLeadCard({
  whitepaperId,
  title,
  description,
  benefit,
  problem,
  ctaLabel,
  guideHref
}: Props) {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [state, setState] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  const canSubmit = useMemo(
    () => /\S+@\S+\.\S+/.test(email) && (!turnstileEnabled || turnstileToken.length > 10),
    [email, turnstileEnabled, turnstileToken]
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      setState("error");
      setMessage("Merci de renseigner un email valide avant l’envoi.");
      trackSiteTelemetry({
        type: "form_error",
        path: pathname || "/",
        target: `whitepaper-request:${whitepaperId}`,
        message: "client_validation"
      });
      return;
    }

    startTransition(async () => {
      trackSiteTelemetry({
        type: "form_submit",
        path: pathname || "/",
        target: `whitepaper-request:${whitepaperId}`
      });

      try {
        const response = await fetch("/api/whitepaper-request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            company,
            whitepaperId,
            placement: "lexicon-hub",
            website: "",
            turnstileToken
          })
        });

        const payload = (await response.json()) as { ok?: boolean; message?: string };

        if (!response.ok || !payload.ok) {
          setState("error");
          setMessage(payload.message ?? "Votre demande n’a pas pu être enregistrée.");
          trackSiteTelemetry({
            type: "form_error",
            path: pathname || "/",
            target: `whitepaper-request:${whitepaperId}`,
            message: payload.message ?? "api_rejected"
          });
          return;
        }

        setState("success");
        setMessage(payload.message ?? "Merci, votre guide est prêt.");
        setEmail("");
        setCompany("");
        setTurnstileToken("");
        trackSiteTelemetry({
          type: "form_success",
          path: pathname || "/",
          target: `whitepaper-request:${whitepaperId}`
        });
      } catch {
        setState("error");
        setMessage("Un incident temporaire bloque l’envoi. Réessayez dans quelques instants.");
        trackSiteTelemetry({
          type: "form_error",
          path: pathname || "/",
          target: `whitepaper-request:${whitepaperId}`,
          message: "network_error"
        });
      }
    });
  }

  return (
    <article className="card-surface flex h-full flex-col p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">Livre blanc</p>
      <h3 className="mt-4 font-display text-4xl leading-tight text-brand-ink">{title}</h3>
      <p className="mt-4 text-base leading-8 text-brand-stone">{description}</p>

      <div className="mt-6 space-y-4 rounded-[24px] border border-brand-teal/10 bg-brand-mint/25 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">Problème traité</p>
        <p className="text-sm leading-7 text-brand-stone">{problem}</p>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">Bénéfice clé</p>
        <p className="text-sm font-semibold leading-7 text-brand-ink">{benefit}</p>
      </div>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
        <input
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setState("idle");
            setMessage("");
          }}
          placeholder="Email professionnel*"
          autoComplete="email"
          inputMode="email"
          className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
        />
        <input
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          placeholder="Entreprise (optionnel)"
          autoComplete="organization"
          className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
        />

        <TurnstileWidget
          onVerify={setTurnstileToken}
          className="rounded-2xl border border-brand-teal/10 bg-brand-mint/35 px-4 py-4"
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

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Envoi..." : ctaLabel}
        </button>
      </form>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Link
          href={guideHref}
          className="inline-flex items-center justify-center rounded-full border border-brand-teal/20 px-6 py-4 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
        >
          Voir l’aperçu
        </Link>
        <CalendlyButton label="Réserver un call" tone="outline" />
      </div>

      <p className="mt-4 text-xs leading-6 text-brand-stone">
        Lead capture : email pro + proposition de call. Vous pouvez aussi ouvrir le guide immédiatement si
        vous souhaitez juger la pertinence avant d’échanger.
      </p>

      {state === "success" ? (
        <div className="mt-6">
          <CommercialNextSteps
            guideHref={guideHref}
            title="Après le téléchargement"
            description="Le guide est disponible. Voici la suite logique pour transformer la lecture en décision puis en action."
          />
        </div>
      ) : null}
    </article>
  );
}
