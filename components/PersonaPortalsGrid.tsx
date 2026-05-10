import Link from "next/link";
import { Briefcase, Cpu, GraduationCap, Target, type LucideIcon } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

type IconKey = "target-arrow" | "cpu" | "briefcase" | "school";

const ICONS: Record<IconKey, LucideIcon> = {
  "target-arrow": Target,
  cpu: Cpu,
  briefcase: Briefcase,
  school: GraduationCap
};

export type PersonaPortal = {
  icon: IconKey;
  title: string;
  description: string;
  cta1: { label: string; href: string };
  cta2: { label: string; href: string };
  cta3: { label: string; href: string };
  highlighted?: boolean;
};

type Props = {
  eyebrow?: string;
  title?: string;
  portals: PersonaPortal[];
};

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

function PortalLink({ href, label, primary }: { href: string; label: string; primary?: boolean }) {
  const baseClass = primary
    ? "inline-flex items-center justify-center rounded-full bg-brand-ink px-4 py-2 text-caption font-semibold text-white transition hover:opacity-90"
    : "inline-flex items-center text-caption font-semibold text-brand-teal underline-offset-4 hover:underline";
  if (isExternal(href)) {
    return (
      <a href={href} className={baseClass} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={baseClass}>
      {label}
    </Link>
  );
}

export default function PersonaPortalsGrid({
  eyebrow = "Vous êtes ?",
  title = "Choisissez votre porte d'entrée.",
  portals
}: Props) {
  return (
    <section className="py-14 sm:py-20">
      <div className="container-shell">
        <RevealOnScroll>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="t-h1 mt-2 max-w-3xl font-display">{title}</h2>

          <div className="mt-8 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
            {portals.map((p) => {
              const Icon = ICONS[p.icon];
              const cardClass = p.highlighted
                ? "rounded-2xl border border-brand-teal bg-brand-mint p-5 sm:p-6"
                : "rounded-2xl border border-brand-teal/15 bg-white p-5 sm:p-6";
              return (
                <article key={p.title} className={cardClass}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-teal sm:h-11 sm:w-11">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 t-h3 font-display text-brand-ink">{p.title}</h3>
                  <p className="mt-1 text-caption text-brand-stone">{p.description}</p>
                  <div className="mt-4 flex flex-col gap-2">
                    <PortalLink href={p.cta1.href} label={p.cta1.label} primary />
                    <PortalLink href={p.cta2.href} label={p.cta2.label} />
                    <PortalLink href={p.cta3.href} label={p.cta3.label} />
                  </div>
                </article>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
