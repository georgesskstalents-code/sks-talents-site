import { Lock, ScrollText, ShieldCheck } from "lucide-react";

type ComplianceSectionProps = {
  // Body after "Vos données restent les vôtres." - differs per vertical
  // (votre groupement vs votre entreprise).
  ownershipBody: string;
  // Body after "Conçus pour l'IA Act." - the LS variant adds the algorithmic
  // HR usages parenthetical.
  iaActBody: string;
};

const SHORT_TAGS = [
  "Hébergement européen",
  "Conforme RGPD",
  "Conçu pour l'IA Act",
  "Supervision humaine garantie"
];

export default function ComplianceSection({ ownershipBody, iaActBody }: ComplianceSectionProps) {
  return (
    <section className="bg-gradient-to-b from-white to-brand-mint/15 py-10 sm:py-14">
      <div className="container-shell">
        <p className="eyebrow">Souveraineté &amp; conformité</p>
        <h2 className="t-h1 max-w-3xl font-display">
          Vos données restent <span className="italic text-brand-teal">les vôtres.</span>
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <article className="rounded-3xl border border-brand-teal/15 bg-white p-6 shadow-sm sm:p-7">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-mint/60 to-brand-mint/30 text-brand-teal">
              <Lock size={22} />
            </span>
            <p className="mt-4 t-h3 font-semibold text-brand-ink">Vos données restent les vôtres</p>
            <p className="mt-2 t-body">{ownershipBody}</p>
          </article>

          <article className="rounded-3xl border border-brand-teal/15 bg-white p-6 shadow-sm sm:p-7">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-mint/60 to-brand-mint/30 text-brand-teal">
              <ScrollText size={22} />
            </span>
            <p className="mt-4 t-h3 font-semibold text-brand-ink">Conçus pour l'IA Act</p>
            <p className="mt-2 t-body">{iaActBody}</p>
          </article>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {SHORT_TAGS.map((tag) => (
            <li
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-teal/15 bg-white px-3 py-1.5 text-caption font-semibold text-brand-stone"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-brand-teal" />
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
