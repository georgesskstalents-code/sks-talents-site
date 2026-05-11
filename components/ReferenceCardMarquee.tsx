import ResourceLogo from "@/components/ResourceLogo";
import type { Reference } from "@/data/references";

type Props = { items: Reference[] };

/**
 * Detailed reference cards (logo + category + name + summary + visit link)
 * scrolling horizontally left-to-right via CSS marquee animation.
 * Replaces the static ReferenceGrid + logo-only ReferenceMarquee combo on
 * pages where we want one continuous horizontal scroll of full cards.
 */
export default function ReferenceCardMarquee({ items }: Props) {
  if (items.length === 0) {
    return null;
  }
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden rounded-[28px] border border-brand-teal/10 bg-white/70 py-6 shadow-soft">
      <div className="flex min-w-max animate-marquee gap-5 px-4">
        {doubled.map((item, index) => (
          <article
            key={`${item.slug}-${index}`}
            className="flex w-[320px] shrink-0 flex-col gap-3 rounded-2xl border border-brand-teal/12 bg-white p-5"
          >
            <div className="flex h-12 items-center">
              <ResourceLogo
                name={item.company}
                logoUrl={item.logoPath}
                className="relative flex h-12 w-[140px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-brand-line bg-white p-2"
                imageClassName="h-full w-full object-contain"
                badgeClassName="flex h-full w-full items-center justify-center rounded-lg bg-brand-mint px-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-teal"
              />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-teal">
              {item.category}
            </p>
            <h3 className="font-display text-2xl leading-tight text-brand-ink">{item.company}</h3>
            <p className="text-sm leading-6 text-brand-stone line-clamp-4">{item.summary}</p>
            {item.website ? (
              <a
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex text-sm font-semibold text-brand-teal transition hover:opacity-80"
              >
                Visiter le site
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
