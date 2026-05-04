import Link from "next/link";
import { ArrowRight, Briefcase, Calculator, GraduationCap, School } from "lucide-react";

const purpleUrl =
  process.env.NEXT_PUBLIC_PURPLE_URL ?? "https://www.purplesquirrel.fr/miniformation-dirigeant";

/**
 * Mobile-only orientation + tools section.
 * Wrapped from the page with `md:hidden` so the desktop layout is untouched.
 */
export default function MobileOrientationSection() {
  return (
    <section className="container-shell py-10 md:hidden">
      {/* Eyebrow + title + intro */}
      <div className="space-y-4">
        <span className="inline-flex rounded-full border border-brand-teal/15 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-stone/80 shadow-sm">
          Orientez-vous
        </span>
        <h2 className="font-display text-[26px] leading-[1.15] text-brand-ink">
          Un agent d’orientation pour trouver votre meilleure porte d’entrée.
        </h2>
        <p className="text-[15px] leading-[1.7] text-brand-stone">
          Deux parcours ont été pensés pour éviter les conseils trop génériques : l’un pour les
          étudiantes et étudiants qui cherchent leur place, l’autre pour les professionnels déjà en
          poste qui veulent clarifier leur prochaine étape.
        </p>
      </div>

      {/* 2 hero cards (Étudiant / Dirigeant) */}
      <div className="mt-8 space-y-4">
        <Link
          href="/orientation"
          className="block rounded-[24px] border border-brand-teal/15 bg-gradient-to-br from-white via-white to-brand-mint/35 p-6 shadow-sm transition active:scale-[0.99]"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-mint text-brand-teal">
            <GraduationCap size={22} />
          </span>
          <h3 className="mt-4 font-display text-xl leading-[1.2] text-brand-ink">
            Étudiant / Jeune diplômé
          </h3>
          <p className="mt-3 text-[14px] leading-[1.65] text-brand-stone">
            Faites un mini diagnostic, comparez 2 à 3 métiers et récupérez des pistes concrètes de
            rôles, d’écoles et de lectures.
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal">
            Commencer le parcours étudiant <ArrowRight size={16} />
          </span>
        </Link>

        <a
          href={purpleUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="block rounded-[24px] border border-white/15 bg-gradient-to-br from-brand-ink via-[#15333a] to-[#0f4d4f] p-6 shadow-[0_18px_45px_rgba(15,51,58,0.25)] transition active:scale-[0.99]"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-brand-mint">
            <Briefcase size={22} />
          </span>
          <h3 className="mt-4 font-display text-xl leading-[1.2] text-white">
            Mini-formation dirigeant
          </h3>
          <p className="mt-3 text-[14px] leading-[1.65] text-white/80">
            Pour les cadres dirigeants en recherche d’emploi, en mobilité ou en repositionnement,
            accédez directement à une formation gratuite pensée pour clarifier votre suite de
            trajectoire.
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-mint">
            Accéder à la mini-formation <ArrowRight size={16} />
          </span>
        </a>
      </div>

      {/* Tools row: Calcul salaire + Écoles */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link
          href="/calcul-salaire-brut-net"
          className="group flex items-start gap-3 rounded-2xl border border-brand-teal/15 bg-white p-4 shadow-sm transition active:scale-[0.99]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-mint/45 text-brand-teal">
            <Calculator size={18} />
          </span>
          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-stone/80">
              Outil
            </p>
            <p className="mt-1 font-display text-base leading-tight text-brand-ink">
              Calcul salaire brut/net
            </p>
            <p className="mt-1 text-xs leading-5 text-brand-stone/80">
              Simulez votre salaire net en quelques secondes.
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-teal transition group-hover:gap-1.5">
              Ouvrir le simulateur <ArrowRight size={12} />
            </span>
          </div>
        </Link>

        <Link
          href="/schools"
          className="group flex items-start gap-3 rounded-2xl border border-brand-teal/15 bg-white p-4 shadow-sm transition active:scale-[0.99]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-mint/45 text-brand-teal">
            <School size={18} />
          </span>
          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-stone/80">
              Ressource
            </p>
            <p className="mt-1 font-display text-base leading-tight text-brand-ink">
              Écoles spécialisées
            </p>
            <p className="mt-1 text-xs leading-5 text-brand-stone/80">
              Parcours d’études Life Sciences &amp; Animal Health.
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-teal transition group-hover:gap-1.5">
              Voir les écoles <ArrowRight size={12} />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
