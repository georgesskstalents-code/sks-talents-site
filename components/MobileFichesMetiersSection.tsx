import Link from "next/link";
import { ArrowRight, Beaker, Stethoscope, Microscope, PawPrint } from "lucide-react";

type FicheMetier = {
  slug: string;
  title: string;
  sector: string;
  salary: string;
  Icon: React.ComponentType<{ size?: number }>;
};

const fiches: FicheMetier[] = [
  {
    slug: "biotech-medical-director",
    title: "Medical Director Biotech",
    sector: "Biotech",
    salary: "100k€ – 170k€ + variable",
    Icon: Stethoscope
  },
  {
    slug: "biotech-market-access-manager",
    title: "Market Access Manager Biotech",
    sector: "Biotech",
    salary: "68k€ – 105k€ + bonus",
    Icon: Beaker
  },
  {
    slug: "diagnostic-data-science-manager",
    title: "Data Science Manager Diagnostic & Medtech",
    sector: "Diagnostic",
    salary: "72k€ – 115k€",
    Icon: Microscope
  },
  {
    slug: "veterinary-clinic-operations-director",
    title: "Clinic Operations Director Veterinary",
    sector: "Veterinary",
    salary: "70k€ – 115k€",
    Icon: PawPrint
  }
];

export default function MobileFichesMetiersSection() {
  return (
    <section className="container-shell py-10 md:hidden">
      <div className="space-y-4">
        <span className="inline-flex rounded-full border border-brand-teal/15 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-stone/70 shadow-sm">
          Fiches métiers
        </span>
        <h2 className="font-display text-[26px] leading-[1.15] text-brand-ink">
          Comprendre les rôles clés en Life Sciences & Animal Health.
        </h2>
        <p className="text-[15px] leading-[1.7] text-brand-stone">
          Missions, salaires, parcours et tension marché — chaque fiche pose le contexte d&apos;un
          rôle dirigeant ou expert que nous recrutons en biotech, diagnostic, vétérinaire et
          petfood.
        </p>
      </div>

      <ul className="mt-6 space-y-3">
        {fiches.map(({ slug, title, sector, salary, Icon }) => (
          <li key={slug}>
            <Link
              href={`/job-roles/${slug}`}
              className="flex items-start gap-3 rounded-2xl border border-brand-teal/15 bg-white p-4 shadow-sm transition active:scale-[0.99]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-mint/45 text-brand-teal">
                <Icon size={18} />
              </span>
              <div className="flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-stone/70">
                  {sector}
                </p>
                <p className="mt-1 font-display text-base leading-tight text-brand-ink">
                  {title}
                </p>
                <p className="mt-1 text-xs leading-5 text-brand-stone/80">{salary}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-teal">
                  Lire la fiche <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/job-roles"
        className="mt-6 flex items-center justify-between rounded-2xl bg-brand-ink px-5 py-4 text-white shadow-[0_18px_45px_rgba(15,51,58,0.25)] transition active:scale-[0.99]"
      >
        <span className="text-sm font-semibold">Voir toutes les fiches métiers</span>
        <ArrowRight size={18} />
      </Link>
    </section>
  );
}
