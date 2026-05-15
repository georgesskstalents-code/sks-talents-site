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
    "mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-ink px-2 py-2 text-[11px] font-semibold text-white transition hover:opacity-90 sm:w-auto sm:px-5 sm:py-3.5 sm:text-caption md:px-6";
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
    "text-[11px] font-semibold text-brand-teal underline-offset-4 hover:underline sm:text-caption";
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

          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-brand-teal/15 pt-6 sm:gap-6 md:mt-8 md:gap-10 md:pt-8">
            {portals.map((p, i) => (
              <div
                key={p.title}
                className={
                  i > 0
                    ? "border-l border-brand-teal/15 pl-3 sm:pl-5 md:pl-10"
                    : ""
                }
              >
                <h3 className="whitespace-pre-line text-[14px] font-semibold leading-tight text-brand-ink sm:text-base md:t-h3 md:font-display">
                  {p.title}
                </h3>
                <p className="mt-2 text-[11px] leading-snug text-brand-stone sm:text-xs md:text-caption md:leading-normal">
                  {p.description}
                </p>
                <PrimaryCTA {...p.primary} />
                {p.secondary.length > 0 ? (
                  <div className="mt-3 flex flex-col gap-1.5 sm:mt-4 sm:gap-2">
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
