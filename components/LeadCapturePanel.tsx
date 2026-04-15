"use client";

import { useMemo, useState, useTransition } from "react";
import {
  ArrowRight,
  CalendarCheck2,
  Clock3,
  PhoneCall,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import CalendlyButton from "@/components/CalendlyButton";
import TurnstileWidget from "@/components/TurnstileWidget";

type LeadCapturePanelProps = {
  variant?: "hero" | "contact";
};

type FormState = {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  sector: string;
  urgency: string;
  message: string;
  consent: boolean;
  website: string;
};

const initialState: FormState = {
  role: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  sector: "Life Sciences",
  urgency: "Sous 7 jours",
  message: "",
  consent: true,
  website: ""
};

const urgencyOptions = ["Sous 24h", "Sous 7 jours", "Ce mois-ci", "Autre"];
const sectorOptions = ["Life Sciences", "Diagnostic", "Animal Health", "Petfood", "Autre"];

export default function LeadCapturePanel({ variant = "hero" }: LeadCapturePanelProps) {
  const [activeTab, setActiveTab] = useState<"callback" | "meeting">("callback");
  const [form, setForm] = useState<FormState>(initialState);
  const [isPending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const isHero = variant === "hero";
  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/g-kengue/talentconsulting";

  const canSubmit = useMemo(() => {
    return (
      form.role.trim().length > 1 &&
      form.firstName.trim().length > 1 &&
      form.lastName.trim().length > 1 &&
      /\S+@\S+\.\S+/.test(form.email) &&
      form.phone.replace(/[^\d+]/g, "").length >= 8 &&
      form.consent &&
      (!turnstileEnabled || turnstileToken.length > 10)
    );
  }, [form, turnstileEnabled, turnstileToken]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function renderChoiceGroup(
    field: "sector" | "urgency",
    options: readonly string[],
    value: string
  ) {
    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((item) => {
          const id = `${field}-${item.toLowerCase().replace(/[^a-z0-9]+/gi, "-")}`;
          const active = value === item;
          return (
            <label
              key={item}
              htmlFor={id}
              className={`cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold transition ${
                active
                  ? "border-brand-teal bg-brand-teal text-white shadow-soft"
                  : "border-transparent bg-white text-brand-stone hover:border-brand-teal/20 hover:bg-brand-mint"
              }`}
            >
              <input
                id={id}
                type="radio"
                name={field}
                value={item}
                checked={active}
                onChange={() => updateField(field, item)}
                className="sr-only"
              />
              {item}
            </label>
          );
        })}
      </div>
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!canSubmit) {
      setErrorMessage("Merci de compléter les champs requis avant l’envoi.");
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
            ...form,
            turnstileToken
          })
        });

        const payload = (await response.json()) as { ok?: boolean; message?: string };

        if (!response.ok || !payload.ok) {
          setErrorMessage(payload.message ?? "Votre demande n’a pas pu être envoyée.");
          return;
        }

        setSuccessMessage(
          "Demande reçue. Nous revenons vers vous rapidement avec un créneau ou un rappel qualifié."
        );
        setForm(initialState);
        setTurnstileToken("");
      } catch {
        setErrorMessage("Un incident temporaire empêche l’envoi. Réessayez dans quelques instants.");
      }
    });
  }

  return (
    <aside
      className={`relative overflow-hidden rounded-[32px] border border-brand-teal/20 bg-white shadow-[0_30px_80px_rgba(22,51,52,0.12)] ${
        isHero ? "p-5 sm:p-6" : "p-6 sm:p-8"
      }`}
    >
      <div className="pointer-events-none absolute -right-20 top-28 h-72 w-72 rounded-full bg-gradient-to-br from-brand-teal/18 to-cyan-300/20 blur-2xl" />
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
              Conversion
            </p>
            <h2 className="mt-2 font-display text-3xl leading-tight text-brand-ink">
              Un projet de recrutement ? Demandez à être rappelé.
            </h2>
          </div>
          <div className="inline-flex rounded-full border border-brand-teal/15 bg-brand-mint/60 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("callback")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === "callback"
                  ? "bg-brand-teal text-white"
                  : "text-brand-stone hover:text-brand-teal"
              }`}
            >
              Être rappelé
            </button>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === "meeting"
                  ? "bg-brand-teal text-white"
                  : "text-brand-stone hover:text-brand-teal"
              }`}
            >
              Prendre RDV
            </a>
          </div>
        </div>

        {activeTab === "callback" ? (
          <form className="mt-8 grid gap-4" onSubmit={handleSubmit} noValidate>
            <select
              value={form.role}
              onChange={(event) => updateField("role", event.target.value)}
              className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base text-brand-ink outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
              aria-label="Quel est votre poste"
              required
            >
              <option value="">Quel est votre poste ?*</option>
              <option>CEO / Fondateur</option>
              <option>DRH / Talent Acquisition</option>
              <option>Direction opérations</option>
              <option>Autre fonction</option>
            </select>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                value={form.firstName}
                onChange={(event) => updateField("firstName", event.target.value)}
                className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
                placeholder="Prénom*"
                autoComplete="given-name"
                required
              />
              <input
                value={form.lastName}
                onChange={(event) => updateField("lastName", event.target.value)}
                className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
                placeholder="Nom*"
                autoComplete="family-name"
                required
              />
            </div>

            <input
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
              placeholder="Adresse e-mail professionnelle*"
              autoComplete="email"
              inputMode="email"
              required
            />

            <div className="grid gap-4 sm:grid-cols-[0.85fr_1.15fr]">
              <input
                value={form.company}
                onChange={(event) => updateField("company", event.target.value)}
                className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
                placeholder="Entreprise"
                autoComplete="organization"
              />
              <input
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className="rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
                placeholder="Téléphone*"
                autoComplete="tel"
                inputMode="tel"
                required
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-brand-teal/10 bg-brand-mint/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-stone">
                  Secteur prioritaire
                </p>
                {renderChoiceGroup("sector", sectorOptions, form.sector)}
              </div>

              <div className="rounded-3xl border border-brand-teal/10 bg-brand-mint/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-stone">
                  Niveau d’urgence
                </p>
                {renderChoiceGroup("urgency", urgencyOptions, form.urgency)}
              </div>
            </div>

            <textarea
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              className="min-h-28 rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
              placeholder="Décrivez brièvement le besoin: profil, timing, localisation, complexité."
            />

            <input
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(event) => updateField("website", event.target.value)}
              className="hidden"
              aria-hidden="true"
              name="website"
            />

            <label className="flex items-start gap-3 rounded-2xl border border-brand-teal/10 bg-brand-mint/35 px-4 py-4 text-sm leading-6 text-brand-stone">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(event) => updateField("consent", event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-brand-teal/30 text-brand-teal focus:ring-brand-teal"
              />
              <span>
                J’accepte d’être recontacté par SKS TALENTS au sujet de ma demande. Vos données sont
                utilisées uniquement pour traiter ce besoin et ne sont pas revendues.
              </span>
            </label>

            <TurnstileWidget
              onVerify={setTurnstileToken}
              className="rounded-2xl border border-brand-teal/10 bg-brand-mint/35 px-4 py-4"
            />

            {errorMessage ? (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </p>
            ) : null}

            {successMessage ? (
              <div className="rounded-3xl border border-brand-teal/15 bg-brand-mint/60 p-5">
                <p className="text-sm font-semibold text-brand-teal">Merci, votre demande est partie.</p>
                <p className="mt-2 text-sm leading-7 text-brand-stone">{successMessage}</p>
                <div className="mt-4">
                  <CalendlyButton label="Réserver aussi un créneau" tone="solid" />
                </div>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Envoi en cours..." : "Demander à être rappelé"}
              <PhoneCall size={18} />
            </button>

            <div className="grid gap-3 text-sm text-brand-stone sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <Clock3 size={16} className="text-brand-teal" />
                Réponse rapide
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-brand-teal" />
                Validation serveur
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-brand-teal" />
                Qualification ciblée
              </div>
            </div>
          </form>
        ) : (
          <div className="mt-8 grid gap-4">
            <div className="rounded-3xl border border-brand-teal/10 bg-brand-mint/45 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-stone">
                Calendly connecté
              </p>
              <h3 className="mt-3 font-display text-3xl text-brand-ink">
                Choisissez le bon format d’échange, sans friction.
              </h3>
              <p className="mt-4 text-sm leading-7 text-brand-stone">
                Votre lien direct est branché. Les CTA de rendez-vous envoient maintenant vers votre
                Calendly de consulting talent.
              </p>
            </div>
            <div className="grid gap-3">
              <CalendlyButton label="Ouvrir Calendly maintenant" tone="solid" href={calendlyUrl} />
              <CalendlyButton label="Réserver un diagnostic gratuit" tone="solid" />
              <CalendlyButton label="Réserver un call de cadrage" tone="outline" />
              <CalendlyButton label="Réserver un audit RH" tone="ghost" />
            </div>
            <div className="rounded-3xl bg-[#163334] p-5 text-white">
              <div className="flex items-start gap-3">
                <CalendarCheck2 className="mt-1 text-teal-300" size={22} />
                <div>
                  <p className="font-semibold">Version finale recommandée du funnel</p>
                  <p className="mt-2 text-sm leading-7 text-white/75">
                    1 formulaire callback en homepage, 1 page contact premium, 1 CTA sticky mobile et
                    un Calendly direct pour les prospects déjà mûrs.
                  </p>
                </div>
              </div>
              <a
                href="/contact#rappel"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-200"
              >
                Voir la version contact complète
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        )}
        {activeTab === "callback" ? (
          <div className="mt-4">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-teal transition hover:opacity-80"
            >
              Ou ouvrir directement l’agenda Calendly
              <ArrowRight size={16} />
            </a>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
