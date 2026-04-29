import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";

export default function OrientationTeaser() {
  return (
    <section className="container-shell py-8">
      <Link
        href="/orientation"
        className="group block overflow-hidden rounded-[28px] border border-brand-teal/15 bg-gradient-to-br from-brand-mint/45 via-white to-brand-mint/35 p-6 transition hover:-translate-y-0.5 hover:shadow-soft sm:p-8"
      >
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-teal text-white shadow-[0_10px_30px_rgba(20,82,84,0.30)]">
            <Compass className="h-7 w-7" />
          </div>
          <div className="flex-1 space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
              Étudiants · Cadres en transition
            </p>
            <h2 className="font-display text-2xl leading-[1.15] text-brand-ink sm:text-3xl">
              Orientez-vous dans les métiers Life Sciences &amp; Santé animale.
            </h2>
            <p className="text-sm leading-7 text-brand-stone sm:text-[15px]">
              Diagnostic d’orientation gratuit, fiches métiers, parcours d’études et écoles
              spécialisées : trouvez votre voie en biotech, diagnostic, medtech, vétérinaire ou
              petfood.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-white transition group-hover:gap-2 sm:self-center">
            Faire mon orientation
            <ArrowRight size={16} />
          </span>
        </div>
      </Link>
    </section>
  );
}
