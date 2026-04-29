import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  variant?: "ribbon" | "final";
};

export default function RibbonCTA({
  eyebrow = "Prochaine étape",
  title,
  description,
  primaryLabel = "Réserver 15 min d’analyse",
  secondaryHref = "/services",
  secondaryLabel = "Découvrir nos services",
  variant = "ribbon"
}: Props) {
  if (variant === "final") {
    return (
      <section className="container-shell pb-16">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-brand-teal via-[#1d4d4f] to-brand-ink px-8 py-14 text-white sm:px-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-brand-mint/30 blur-3xl" />
            <div className="absolute -right-12 bottom-0 h-44 w-44 rounded-full bg-cyan-200/25 blur-3xl" />
          </div>
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-mint">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-mint" />
                {eyebrow}
              </p>
              <h2 className="font-display text-4xl leading-[1.05] text-white sm:text-5xl xl:text-6xl">
                {title}
              </h2>
              {description ? (
                <p className="max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
                  {description}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <CalendlyButton label={primaryLabel} tone="solid" />
              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container-shell py-6">
      <div className="card-luxe panel-lift flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-7">
        <div className="flex-1 space-y-1.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
            {eyebrow}
          </p>
          <p className="font-display text-2xl leading-[1.15] text-brand-ink sm:text-3xl">
            {title}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <CalendlyButton label={primaryLabel} tone="solid" />
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center rounded-full border border-brand-teal/20 bg-white px-5 py-3.5 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
