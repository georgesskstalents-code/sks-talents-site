"use client";

import { useMemo, useState, type FormEvent } from "react";

const SIGNALS: ReadonlyArray<{ id: string; before: string; strong: string; after: string }> = [
  {
    id: "process",
    before: "Notre process de recrutement est ",
    strong: "écrit, partagé et utilisé",
    after: "."
  },
  {
    id: "time-to-hire",
    before: "Notre ",
    strong: "time-to-hire est suivi et discuté",
    after: ", pas seulement subi."
  },
  {
    id: "critical-roles",
    before: "Les ",
    strong: "rôles critiques sont définis",
    after: " avant l'ouverture des postes."
  },
  {
    id: "automation",
    before: "Les ",
    strong: "tâches répétitives sont automatisées",
    after: " quand elles n'apportent pas de valeur humaine."
  },
  {
    id: "ceo-bottleneck",
    before: "Le ",
    strong: "recrutement ne dépend pas du CEO",
    after: " pour chaque validation."
  }
];

type Zone = "chaos" | "fragile" | "structure";

const ZONE_META: Record<
  Zone,
  {
    label: string;
    range: string;
    cardBg: string;
    cardBorder: string;
    cardText: string;
    badgeBg: string;
    badgeText: string;
    hint: string;
    short: string;
  }
> = {
  chaos: {
    label: "Chaos",
    range: "0-2",
    cardBg: "#FEF9E7",
    cardBorder: "#FCD34D",
    cardText: "#92400E",
    badgeBg: "#FCD34D",
    badgeText: "#78350F",
    hint: "Vous avancez surtout en réaction et en urgence. La structure se construit après coup, pas en amont.",
    short: "Vous avancez surtout en réaction et en urgence."
  },
  fragile: {
    label: "Fragile",
    range: "3-4",
    cardBg: "#FFE8D6",
    cardBorder: "#F97316",
    cardText: "#9A3412",
    badgeBg: "#F97316",
    badgeText: "#FFFFFF",
    hint: "Une partie de la mécanique tient, mais elle cassera en phase de scale.",
    short: "Une partie tient, mais cassera en phase de scale."
  },
  structure: {
    label: "Structuré",
    range: "5+",
    cardBg: "#D1FAE5",
    cardBorder: "#10B981",
    cardText: "#065F46",
    badgeBg: "#10B981",
    badgeText: "#FFFFFF",
    hint: "Votre organisation absorbe la croissance avec moins de friction. La structure travaille pour vous.",
    short: "Votre organisation absorbe la croissance avec moins de friction."
  }
};

function getZone(score: number): Zone {
  if (score >= 5) return "structure";
  if (score >= 3) return "fragile";
  return "chaos";
}

type FormState = "idle" | "open" | "loading" | "success" | "error";

export default function DiagnosticStructurationRH() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const score = useMemo(
    () => SIGNALS.reduce((acc, s) => acc + (checked[s.id] ? 1 : 0), 0),
    [checked]
  );
  const zone = getZone(score);
  const meta = ZONE_META[zone];

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("loading");
    setErrorMsg(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      website: String(data.get("website") ?? ""),
      score,
      zone,
      signals: SIGNALS.filter((s) => checked[s.id]).map((s) => s.id)
    };

    try {
      const response = await fetch("/api/diagnostic-structuration-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };
      if (!response.ok || !json.ok) {
        throw new Error(json.message ?? "Erreur lors de l'envoi.");
      }
      setFormState("success");
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Erreur lors de l'envoi.");
      setFormState("error");
    }
  }

  return (
    <section className="bg-[#F5F8F6] py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-[#41a0a4]">
          Diagnostic SKS · Structuration RH
        </p>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl font-normal text-[#0d2a2c]">
          Votre organisation est-elle prête à scaler ?
        </h2>
        <p className="mt-3 font-sans text-base text-[#4a6e70]">
          Cochez les signaux que vous observez aujourd'hui dans votre organisation.
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-[#41a0a4]">
              Les 5 signaux de structuration
            </p>
            <ul className="mt-4 space-y-3">
              {SIGNALS.map((signal) => {
                const isOn = !!checked[signal.id];
                return (
                  <li key={signal.id}>
                    <button
                      type="button"
                      onClick={() => toggle(signal.id)}
                      aria-pressed={isOn}
                      className={`w-full text-left bg-white rounded-2xl px-5 py-4 flex items-start gap-4 transition-colors ${
                        isOn
                          ? "border-2 border-[#41a0a4]"
                          : "border border-[#E5E7EB] hover:border-[#41a0a4]/40"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
                          isOn ? "bg-[#41a0a4] border-[#41a0a4]" : "bg-white border-[#E5E7EB]"
                        }`}
                      >
                        {isOn ? (
                          <svg
                            viewBox="0 0 16 16"
                            className="h-4 w-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 8.5l3.2 3 6.3-6.5" />
                          </svg>
                        ) : null}
                      </span>
                      <span className="flex-1">
                        <span className="font-sans text-base text-[#0d2a2c]">
                          {signal.before}
                          <strong className="font-semibold">{signal.strong}</strong>
                          {signal.after}
                        </span>
                        <span className="mt-1 block font-sans text-xs italic text-[#4a6e70]">
                          +1 point
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <aside className="lg:col-span-2">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-[#41a0a4]">
                Votre score
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-7xl sm:text-8xl text-[#41a0a4] leading-none">
                  {score}
                </span>
                <span className="font-display text-4xl text-[#9CA3AF]">/ 5</span>
              </div>
              <div className="mt-4 flex items-center gap-2" aria-hidden>
                {SIGNALS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2.5 w-2.5 rounded-full ${
                      i < score ? "bg-[#41a0a4]" : "bg-white border border-[#E5E7EB]"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-6">
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 font-sans text-xs font-bold uppercase tracking-[0.22em]"
                  style={{ backgroundColor: meta.badgeBg, color: meta.badgeText }}
                >
                  {meta.label}
                </span>
              </div>

              <p className="mt-4 font-display italic text-xl text-[#0d2a2c] leading-snug">
                {meta.hint}
              </p>

              <hr className="my-6 border-[#E5E7EB]" />

              {formState === "success" ? (
                <div className="rounded-xl bg-[#F5F8F6] border border-[#E5E7EB] p-4">
                  <p className="font-sans text-sm text-[#0d2a2c]">
                    Merci. Votre diagnostic PDF arrive dans votre boite mail dans les prochaines
                    minutes.
                  </p>
                </div>
              ) : formState === "open" ||
                formState === "loading" ||
                formState === "error" ? (
                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="hidden"
                  />
                  <label className="block">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#4a6e70]">
                      Nom
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      className="mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 font-sans text-sm text-[#0d2a2c] focus:outline-none focus:border-[#41a0a4]"
                    />
                  </label>
                  <label className="block">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#4a6e70]">
                      Email pro
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      className="mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 font-sans text-sm text-[#0d2a2c] focus:outline-none focus:border-[#41a0a4]"
                    />
                  </label>
                  <label className="block">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#4a6e70]">
                      Entreprise
                    </span>
                    <input
                      type="text"
                      name="company"
                      required
                      autoComplete="organization"
                      className="mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 font-sans text-sm text-[#0d2a2c] focus:outline-none focus:border-[#41a0a4]"
                    />
                  </label>
                  {errorMsg ? (
                    <p className="font-sans text-xs text-[#9A3412]">{errorMsg}</p>
                  ) : null}
                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="w-full rounded-full bg-[#0d2a2c] px-5 py-3 font-sans text-sm font-semibold text-white hover:bg-[#41a0a4] transition-colors disabled:opacity-60"
                  >
                    {formState === "loading" ? "Envoi..." : "Envoyer ma demande"}
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setFormState("open")}
                  className="w-full rounded-full bg-[#0d2a2c] px-5 py-3 font-sans text-sm font-semibold text-white hover:bg-[#41a0a4] transition-colors"
                >
                  → Recevoir mon diagnostic complet en PDF
                </button>
              )}
            </div>
          </aside>
        </div>

        <div className="mt-12">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-[#41a0a4]">
            Lecture du score
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(["chaos", "fragile", "structure"] as const).map((key) => {
              const m = ZONE_META[key];
              const active = zone === key && score > 0;
              return (
                <div
                  key={key}
                  className="relative rounded-2xl p-5 border-2"
                  style={{
                    backgroundColor: m.cardBg,
                    borderColor: active ? m.cardBorder : "transparent"
                  }}
                >
                  {active ? (
                    <span className="absolute -top-3 right-4 inline-flex items-center rounded-md bg-[#0d2a2c] px-2 py-1 font-sans text-[10px] font-bold uppercase tracking-widest text-white">
                      Vous êtes ici
                    </span>
                  ) : null}
                  <div className="flex items-center gap-3">
                    <span className="font-display text-3xl" style={{ color: m.cardText }}>
                      {m.range}
                    </span>
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-widest"
                      style={{ backgroundColor: m.badgeBg, color: m.badgeText }}
                    >
                      {m.label}
                    </span>
                  </div>
                  <p className="mt-3 font-sans text-sm" style={{ color: m.cardText }}>
                    {m.short}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
