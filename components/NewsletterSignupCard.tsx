"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import TurnstileWidget from "@/components/TurnstileWidget";
import {
  getNewsletterSegment,
  newsletterCadence,
  newsletterPromisePillars,
  newsletterSegments,
  type NewsletterSegmentId
} from "@/data/newsletter";
import { trackSiteTelemetry } from "@/lib/siteTelemetryClient";

type Props = {
  eyebrow?: string;
  title: string;
  description: string;
  placement: string;
  defaultSegment?: NewsletterSegmentId;
  compact?: boolean;
};

export default function NewsletterSignupCard({
  eyebrow = "Newsletter SKS",
  title,
  description,
  placement,
  defaultSegment = "recruiting-leader",
  compact = false
}: Props) {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [segment, setSegment] = useState<NewsletterSegmentId>(defaultSegment);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "success" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
  const selectedSegment = getNewsletterSegment(segment);

  const canSubmit = useMemo(
    () => /\S+@\S+\.\S+/.test(email) && (!turnstileEnabled || turnstileToken.length > 10),
    [email, turnstileEnabled, turnstileToken]
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      trackSiteTelemetry({
        type: "form_error",
        path: pathname || "/newsletter",
        target: `newsletter-signup:${placement}`,
        message: "client_validation"
      });
      setState("error");
      setMessage("Merci de renseigner un email valide avant l'inscription.");
      return;
    }

    startTransition(async () => {
      trackSiteTelemetry({
        type: "form_submit",
        path: pathname || "/newsletter",
        target: `newsletter-signup:${placement}`
      });

      try {
        const response = await fetch("/api/newsletter-signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            segment,
            placement,
            website: "",
            turnstileToken
          })
        });

        const payload = (await response.json()) as { ok?: boolean; message?: string };

        if (!response.ok || !payload.ok) {
          trackSiteTelemetry({
            type: "form_error",
            path: pathname || "/newsletter",
            target: `newsletter-signup:${placement}`,
            message: payload.message ?? "api_rejected"
          });
          setState("error");
          setMessage(payload.message ?? "L'inscription n'a pas pu etre enregistree.");
          return;
        }

        trackSiteTelemetry({
          type: "form_success",
          path: pathname || "/newsletter",
          target: `newsletter-signup:${placement}`
        });
        setState("success");
        setMessage(
          payload.message ??
            "Merci, vous recevrez la prochaine note SKS. Chaque edition reste relue et validee dans Notion avant publication."
        );
        setEmail("");
        setTurnstileToken("");
      } catch {
        trackSiteTelemetry({
          type: "form_error",
          path: pathname || "/newsletter",
          target: `newsletter-signup:${placement}`,
          message: "network_error"
        });
        setState("error");
        setMessage("Un incident temporaire empeche l'inscription.");
      }
    });
  }

  return (
    <div className={`card-luxe ${compact ? "p-6" : "p-7 sm:p-8"}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h3 className={`font-display text-brand-ink ${compact ? "text-3xl" : "text-4xl"}`}>{title}</h3>
      <p className={`mt-4 text-brand-stone ${compact ? "text-sm leading-7" : "text-base leading-8"}`}>
        {description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full border border-brand-teal/12 bg-brand-mint/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal">
          {newsletterCadence.label}
        </span>
        <span className="rounded-full border border-brand-teal/12 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-stone">
          {newsletterCadence.schedule}
        </span>
        <span className="rounded-full border border-brand-teal/12 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-stone">
          {newsletterCadence.readTime}
        </span>
      </div>

      <div className={`mt-6 grid gap-3 ${compact ? "lg:grid-cols-3" : "lg:grid-cols-3"}`}>
        {newsletterSegments.map((item) => {
          const active = item.id === segment;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSegment(item.id);
                setState("idle");
                setMessage("");
              }}
              className={`rounded-[24px] border p-4 text-left transition ${
                active
                  ? "border-brand-teal bg-brand-mint/45 shadow-[0_18px_40px_rgba(22,51,52,0.08)]"
                  : "border-brand-teal/12 bg-white hover:border-brand-teal/35"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                {item.label}
              </p>
              <p className="mt-3 text-sm leading-7 text-brand-stone">{item.description}</p>
            </button>
          );
        })}
      </div>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
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
          <div className="rounded-[24px] border border-brand-teal/12 bg-white/82 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Segment actif
            </p>
            <p className="mt-3 text-sm font-semibold text-brand-ink">{selectedSegment.label}</p>
            <p className="mt-2 text-sm leading-7 text-brand-stone">
              {selectedSegment.description}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {newsletterPromisePillars.map((item) => (
            <div key={item.title} className="rounded-[22px] border border-brand-teal/12 bg-brand-mint/25 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-7 text-brand-stone">{item.description}</p>
            </div>
          ))}
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

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-7 text-brand-stone">
            Un format court, utile et relu avant publication. Aucun envoi automatique sans edition et validation Notion.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border border-brand-teal/15 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint/40"
            >
              Voir les articles
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Inscription..." : "Recevoir la note SKS"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
