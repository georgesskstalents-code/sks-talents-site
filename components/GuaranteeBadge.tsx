import { ShieldCheck } from "lucide-react";

type Props = {
  variant?: "banner" | "compact";
};

export default function GuaranteeBadge({ variant = "banner" }: Props) {
  if (variant === "compact") {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-brand-teal/20 bg-brand-mint/40 px-4 py-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-teal">
            Garantie SKS Talents
          </p>
          <p className="mt-1 text-sm leading-6 text-brand-ink">
            <strong>Première shortlist en 10 jours ouvrés.</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="container-shell py-6">
      <div className="relative overflow-hidden rounded-[28px] border border-brand-teal/20 bg-gradient-to-br from-brand-mint/55 via-white to-brand-mint/40 p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-teal/12 blur-3xl" />
        <div className="pointer-events-none absolute -left-12 bottom-0 h-28 w-28 rounded-full bg-brand-mint/55 blur-3xl" />
        <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-teal text-white shadow-[0_10px_30px_rgba(20,82,84,0.30)]">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div className="flex-1 space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
              Garantie SKS Talents
            </p>
            <h3 className="font-display text-2xl leading-[1.15] text-brand-ink sm:text-3xl">
              <span className="text-brand-teal">Première shortlist en 10 jours ouvrés.</span>
            </h3>
            <p className="text-sm leading-7 text-brand-stone sm:text-[15px]">
              Engagement de moyen sur la première shortlist : un brief cadré, une lecture marché
              activée et 3 profils lisibles présentés sous 10 jours ouvrés.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
