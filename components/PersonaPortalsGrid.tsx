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

type CTA = { label: string; href: string };

export type PersonaPortal = {
  icons: IconKey[];
  title: string;
  description: string;
  primary: CTA;
  secondary: CTA[];
};

type Props = {
  title?: string;
  portals: PersonaPortal[];
};

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

function PrimaryCTA({ href, label }: CTA) {
  const className =
    "mt-5 inline-flex w-full items-center justify-center rounded-full bg-brand-ink px-5 py-3.5 text-caption font-semibold text-white transition hover:opacity-90 sm:w-auto sm:px-6";
  if (isExternal(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

function SecondaryCTA({ href, label }: CTA) {
  const className =
    "text-caption font-semibold text-brand-teal underline-offset-4 hover:underline";
  if (isExternal(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export default function PersonaPortalsGrid({
  title = "Choisissez votre porte d'entrée.",
  portals
}: Props) {
  return (
    <section className="py-10 sm:py-16">
      <div className="container-shell">
        <RevealOnScroll>
          <div className="flex items-center gap-3 text-brand-teal">
            {portals.flatMap((p, pi) =>
              p.icons.map((iconKey, ii) => {
                const Icon = ICONS[iconKey];
                return <Icon key={`${pi}-${ii}-${iconKey}`} className="h-7 w-7" aria-hidden />;
              })
            )}
          </div>
          <h2 className="t-h1 mt-5 max-w-3xl font-display">{title}</h2>

          <div className="mt-8 grid gap-8 border-t border-brand-teal/15 pt-8 md:grid-cols-3 md:gap-10">
            {portals.map((p, i) => (
              <div
                key={p.title}
                className={
                  i > 0
                    ? "md:border-l md:border-brand-teal/15 md:pl-10"
                    : ""
                }
              >
                <h3 className="t-h3 font-display text-brand-ink">{p.title}</h3>
                <p className="mt-2 text-caption text-brand-stone">{p.description}</p>
                <PrimaryCTA {...p.primary} />
                {p.secondary.length > 0 ? (
                  <div className="mt-4 flex flex-col gap-2">
                    {p.secondary.map((s) => (
                      <SecondaryCTA key={s.href + s.label} {...s} />
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
