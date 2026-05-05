import Link from "next/link";
import { ArrowRight, FlaskConical, PawPrint, Stethoscope } from "lucide-react";

const cards = [
  {
    Icon: PawPrint,
    title: "Diagnostic IA santé animale",
    description: "Quel agent IA déployer pour piloter vos cliniques vétérinaires et votre force commerciale petfood ?",
    href: "/animal-health/structuration-ia#diagnostic",
    accent: "from-emerald-50 to-white",
    iconBg: "bg-emerald-100 text-emerald-700"
  },
  {
    Icon: FlaskConical,
    title: "Diagnostic IA structuration RH santé animale",
    description: "Cadrage RH, juridique et reporting multi-sites pour groupements vétérinaires et marques petfood premium.",
    href: "/animal-health/structuration-ia#diagnostic",
    accent: "from-brand-mint/40 to-white",
    iconBg: "bg-brand-mint/60 text-brand-teal"
  },
  {
    Icon: Stethoscope,
    title: "Diagnostic IA structuration RH santé humaine",
    description: "CEO Copilot biotech, medtech, deeptech, e-santé : anticipez vos hires 6 mois avant le board.",
    href: "/life-sciences/structuration-ia#diagnostic",
    accent: "from-brand-mint/40 to-white",
    iconBg: "bg-brand-teal/10 text-brand-teal"
  }
];

/**
 * Mobile-only quick-access cards to the 3 sectoral AI diagnostics.
 * Mounted right below the existing recruitment diagnostic on the homepage.
 * Hidden on md+ (desktop has dedicated landing pages with their own diagnostic section).
 */
export default function MobileDiagnosticsSection() {
  return (
    <section className="container-shell py-10 md:hidden">
      <div className="space-y-4">
        <span className="inline-flex rounded-full border border-brand-teal/15 bg-white px-4 py-2 text-eyebrow font-semibold uppercase text-brand-stone/80 shadow-sm">
          Diagnostics IA
        </span>
        <h2 className="t-h1 font-display">Quel agent IA déployer en premier ?</h2>
        <p className="t-body">
          3 diagnostics ciblés selon votre secteur. 5 questions, résultat immédiat, ROI projeté
          sur 6 mois.
        </p>
      </div>

      <ul className="mt-6 space-y-3">
        {cards.map(({ Icon, title, description, href, accent, iconBg }) => (
          <li key={title}>
            <Link
              href={href}
              className={`flex items-start gap-3 rounded-2xl border border-brand-teal/15 bg-gradient-to-br ${accent} p-4 shadow-sm transition active:scale-[0.99]`}
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
                <Icon size={18} />
              </span>
              <div className="flex-1">
                <p className="t-h3 font-semibold text-brand-ink">{title}</p>
                <p className="mt-1 text-caption text-brand-stone">{description}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-caption font-semibold text-brand-teal">
                  Lancer le diagnostic <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
