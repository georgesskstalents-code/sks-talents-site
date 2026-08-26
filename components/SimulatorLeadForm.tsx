"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Mode = "entreprise" | "candidat";

type Status = "idle" | "sending" | "success" | "error";

export type SimulatorLeadFormProps = {
  /** Contexte du simulateur envoye au serveur pour email + suivi. */
  simulatorContext: Record<string, string | number | boolean | null | undefined>;
  /** Slug court identifiant le simulateur d'origine (ex: "cout-mauvais-recrutement"). */
  simulatorId: string;
};

const MODE_LABELS: Record<Mode, string> = {
  entreprise: "Je recrute (DRH, CEO, fondateur.rice)",
  candidat: "Je me positionne (dirigeant.e, cadre en reflexion)"
};

const MODE_HINTS: Record<Mode, string> = {
  entreprise:
    "Vous recevez le rapport detaille : postes de cout chiffres, leviers pour securiser le poste, checklist cadrage 30 jours.",
  candidat:
    "Vous recevez la meme grille pour comprendre comment votre package se lit du cote board : benchmark, leviers de negociation, points d'attention."
};

export default function SimulatorLeadForm({
  simulatorContext,
  simulatorId
}: SimulatorLeadFormProps) {
  const [mode, setMode] = useState<Mode>("entreprise");
  const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  const trackingContext = useMemo(
    () => ({ simulator: simulatorId, mode }),
    [simulatorId, mode]
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/simulateur-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          mode,
          website,
          simulator_context: { ...simulatorContext, simulator_id: simulatorId }
        })
      });

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };

      if (response.ok && data.ok) {
        setStatus("success");
        setMessage(
          data.message ||
            "Merci. Votre rapport detaille arrive dans votre boite mail dans les prochaines minutes."
        );
        trackEvent("simulator_lead_submitted", trackingContext);
      } else {
        setStatus("error");
        setMessage(
          data.message ||
            "Erreur d'envoi. Reessayez ou ecrivez directement a g.kengue@skstalents.fr."
        );
      }
    } catch {
      setStatus("error");
      setMessage(
        "Erreur reseau. Reessayez ou ecrivez directement a g.kengue@skstalents.fr."
      );
    }
  }

  const busy = status === "sending";
  const done = status === "success";

  return (
    <div className="card-surface p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
        Rapport detaille par email
      </p>
      <h3 className="mt-3 font-display text-2xl text-brand-ink">
        Recevez le rapport complet en PDF
      </h3>
      <p className="mt-3 text-sm leading-6 text-brand-stone">
        Detail des postes de cout, sources marche, checklist cadrage 30 jours et grille de
        priorisation. Un email de SKS Talents, aucun formulaire commercial derriere.
      </p>

      {done ? (
        <div
          className="mt-5 rounded-[18px] border border-brand-teal/20 bg-brand-mint/40 p-4 text-sm leading-6 text-brand-ink"
          role="status"
        >
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Vous etes
            </legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {(Object.keys(MODE_LABELS) as Mode[]).map((value) => {
                const selected = mode === value;
                return (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-start gap-3 rounded-[14px] border p-3 text-sm transition ${
                      selected
                        ? "border-brand-teal bg-brand-mint/50 text-brand-ink"
                        : "border-brand-teal/20 bg-white text-brand-stone hover:border-brand-teal/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="simulator-lead-mode"
                      value={value}
                      checked={selected}
                      onChange={() => setMode(value)}
                      className="mt-1 accent-brand-teal"
                    />
                    <span>
                      <span className="block font-semibold text-brand-ink">
                        {MODE_LABELS[value]}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-brand-stone">
                        {MODE_HINTS[value]}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div>
            <label
              htmlFor="simulator-lead-email"
              className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal"
            >
              Email professionnel
            </label>
            <input
              id="simulator-lead-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="prenom.nom@entreprise.fr"
              className="mt-2 w-full rounded-lg border border-brand-teal/20 bg-white px-3 py-2 text-sm focus:border-brand-teal focus:outline-none"
              disabled={busy}
            />
          </div>

          {/* Honeypot anti-bot, invisible pour les visiteurs humains. */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="simulator-lead-website">
              Site web (ne pas remplir)
            </label>
            <input
              id="simulator-lead-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={busy || !email}
            className="inline-flex w-full items-center justify-center rounded-full bg-brand-ink px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {busy ? "Envoi en cours..." : "Recevoir le rapport detaille"}
          </button>

          {status === "error" && message ? (
            <p className="text-sm leading-6 text-red-700" role="alert">
              {message}
            </p>
          ) : null}

          <p className="text-xs leading-5 text-brand-stone">
            Signature : SKS Talents. Aucun partage, aucune sequence automatisee agressive.
            Vous pouvez repondre pour ecrire directement au fondateur.
          </p>
        </form>
      )}
    </div>
  );
}
