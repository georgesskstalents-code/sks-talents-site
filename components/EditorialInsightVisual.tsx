"use client";

import Image from "next/image";

type Props = {
  title: string;
  verticalLabel: string;
  topicLabel: string;
  audienceLabel?: string;
  variant?: "article" | "lead";
};

const topics: Record<string, { title: string; detail: string }[]> = {
  recruitment: [
    { title: "Profils ciblés", detail: "Comprendre les rôles réellement rares et les profils à attirer." },
    { title: "Narration du poste", detail: "Clarifier le message employeur, le niveau d’exigence et le contexte." },
    { title: "Décision", detail: "Rendre la shortlist et les arbitrages plus lisibles." }
  ],
  skills: [
    { title: "Soft skills", detail: "Identifier les comportements utiles en situation réelle." },
    { title: "Posture", detail: "Lire l’impact, la clarté et la capacité d’adaptation." },
    { title: "Exécution", detail: "Évaluer le niveau d’autonomie et la capacité à délivrer." }
  ],
  market: [
    { title: "Signal marché", detail: "Lire plus simplement les tensions, mouvements et signaux utiles." },
    { title: "Priorités", detail: "Repérer où investir, recruter ou renforcer l’exécution." },
    { title: "Décision", detail: "Transformer l’information en arbitrage concret pour l’équipe dirigeante." }
  ]
};

function getSignals(topicLabel: string) {
  return topics[topicLabel] ?? topics.market;
}

function getTopicDisplayLabel(topicLabel: string) {
  return (
    {
      recruitment: "Recrutement",
      skills: "Compétences",
      market: "Marché"
    }[topicLabel] ?? topicLabel
  );
}

export default function EditorialInsightVisual({
  title,
  verticalLabel,
  topicLabel,
  audienceLabel = "Dirigeants, DRH, équipes business",
  variant = "article"
}: Props) {
  const isLead = variant === "lead";
  const signals = getSignals(topicLabel);
  const topicDisplayLabel = getTopicDisplayLabel(topicLabel);
  const readingTitle = isLead ? "Ce que ce guide aide à structurer" : "Ce que cet article aide à clarifier";
  const readingDescription = isLead
    ? "Une lecture plus simple pour cadrer les priorités, comprendre les enjeux et préparer une action utile."
    : "Une lecture plus simple pour comprendre le marché, clarifier les priorités et décider sans bruit inutile.";

  return (
    <div className="relative overflow-hidden rounded-[34px] border border-brand-teal/10 bg-[linear-gradient(145deg,rgba(255,251,246,0.98),rgba(241,249,248,0.95)_48%,rgba(255,255,255,0.98))] p-6 shadow-[0_24px_60px_rgba(19,43,45,0.06)] sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(65,160,164,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(231,200,160,0.16),transparent_26%)]" />

      <div className={`relative grid gap-6 ${isLead ? "xl:grid-cols-[1fr_0.82fr]" : "lg:grid-cols-[1.08fr_0.92fr]"}`}>
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-brand-teal/12 bg-white/92 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
              {verticalLabel}
            </span>
            <span className="rounded-full border border-brand-teal/12 bg-brand-mint/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-ink">
              {topicDisplayLabel}
            </span>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal/80">
              {isLead ? "Repères du guide" : "Repères de lecture"}
            </p>
            <h3 className="mt-3 max-w-2xl font-display text-3xl leading-tight text-brand-ink sm:text-4xl">{readingTitle}</h3>
            <p className="mt-3 max-w-2xl text-base leading-8 text-brand-stone">
              {readingDescription}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {signals.map((signal) => (
              <div
                key={signal.title}
                className="rounded-[24px] border border-brand-teal/10 bg-white/88 p-4 shadow-[0_10px_24px_rgba(19,43,45,0.05)]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-teal/80">
                  {signal.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-brand-stone">{signal.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-brand-teal/12 bg-white/88 p-6 shadow-[0_18px_40px_rgba(19,43,45,0.06)]">
          <div className="flex items-start gap-4">
            <div className="flex h-20 w-[9.5rem] items-center justify-center rounded-[28px] border border-brand-teal/10 bg-white px-4 shadow-[0_14px_30px_rgba(19,43,45,0.08)]">
              <Image
                src="/brand/logo-sks-talents-signature.svg"
                alt="SKS TALENTS"
                width={128}
                height={56}
                className="h-auto w-[128px] object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal/80">
                SKS TALENTS
              </p>
              <p className="mt-2 text-lg font-medium leading-7 text-brand-ink">{audienceLabel}</p>
              <p className="mt-2 text-sm leading-7 text-brand-stone">
                {isLead
                  ? "Un support pensé pour aider à cadrer un sujet, préparer l’échange et faire émerger la bonne trajectoire."
                  : "Un article pensé pour rendre un sujet plus lisible, plus utile et plus directement exploitable."}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {[verticalLabel, topicDisplayLabel, "France", "EMEA"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-brand-teal/12 bg-brand-mint/35 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-stone"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-[24px] border border-brand-teal/10 bg-[linear-gradient(180deg,rgba(244,251,250,0.9),rgba(255,255,255,0.96))] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              En bref
            </p>
            <p className="mt-3 text-sm leading-7 text-brand-stone">
              {title}
            </p>
            <p className="mt-3 text-sm leading-7 text-brand-stone">
              Objectif : aller à l’essentiel, clarifier les enjeux et aider à prendre une décision plus vite.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
