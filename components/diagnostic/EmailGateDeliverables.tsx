"use client";

import { useState } from "react";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";
import type { Answers } from "@/lib/recruitmentDiagnostic";

type Props = {
  answers: Answers;
};

type Status = "idle" | "submitting" | "success" | "error";

export default function EmailGateDeliverables({ answers }: Props) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/diagnostic/deliverables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, company, answers })
      });
      const data = (await res.json()) as { ok?: boolean; message?: string; note?: string };

      if (res.ok && data.ok) {
        setStatus("success");
        setMessage(data.note ?? "Email envoye. Verifiez votre boite (et les spams).");
      } else {
        setStatus("error");
        setMessage(data.message ?? "Echec de l'envoi. Reessayez ou ecrivez-nous directement.");
      }
    } catch {
      setStatus("error");
      setMessage("Connexion interrompue. Reessayez.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          <div>
            <p className="font-display text-xl text-emerald-900">Envoye !</p>
            <p className="mt-2 text-sm leading-7 text-emerald-800">{message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[24px] border border-brand-teal/20 bg-gradient-to-br from-brand-mint/40 to-white p-6 sm:p-8">
      <div className="flex items-start gap-3">
        <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
        <div className="min-w-0 flex-1">
          <p className="eyebrow text-brand-teal">Vos 2 livrables par email</p>
          <h3 className="mt-2 font-display text-2xl text-brand-ink sm:text-3xl">
            Benchmark salaires France 2026 + Plan d'action 12 mois personnalise
          </h3>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-brand-stone">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
              <span>
                <strong className="font-semibold text-brand-ink">Benchmark</strong> : grille
                salariale CTO/VP/Plant Director/BD pour Biotech (Series A/B/C) + Animal Health,
                actualisee sur 100+ placements.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
              <span>
                <strong className="font-semibold text-brand-ink">Plan d'action 12 mois</strong> :
                roadmap calibree sur vos reponses (sourcing, structuration, automatisation,
                onboarding), avec jalons mois 1-2, 3-6, 7-12.
              </span>
            </li>
          </ul>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Prenom"
                className="rounded-2xl border border-brand-teal/15 bg-white px-4 py-3 text-sm text-brand-ink outline-none transition focus:border-brand-teal"
                autoComplete="given-name"
              />
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Entreprise (optionnel)"
                className="rounded-2xl border border-brand-teal/15 bg-white px-4 py-3 text-sm text-brand-ink outline-none transition focus:border-brand-teal"
                autoComplete="organization"
              />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email pro (ex : prenom@biotech.fr)"
              className="w-full rounded-2xl border border-brand-teal/15 bg-white px-4 py-3 text-sm text-brand-ink outline-none transition focus:border-brand-teal"
              autoComplete="email"
            />

            {status === "error" ? (
              <div className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{message}</span>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting" || !email}
              className="w-full rounded-full bg-brand-ink px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {status === "submitting" ? "Envoi en cours..." : "Recevoir les 2 livrables"}
            </button>
            <p className="text-[11px] leading-5 text-brand-stone">
              Vous recevez les livrables sous 30 secondes. Nous ne partageons pas votre email. Vous
              pouvez vous desabonner via le lien dans l'email.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
