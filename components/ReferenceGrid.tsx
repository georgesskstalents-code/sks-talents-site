import ResourceLogo from "@/components/ResourceLogo";
import type { Reference } from "@/data/references";

export default function ReferenceGrid({ items }: { items: Reference[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article key={item.slug} className="card-surface p-6">
          <div className="flex h-14 items-center">
            <ResourceLogo
              name={item.company}
              logoUrl={item.logoPath}
              className="relative flex h-14 w-[160px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-brand-line bg-white p-3"
              imageClassName="h-full w-full object-contain"
              badgeClassName="flex h-full w-full items-center justify-center rounded-xl bg-brand-mint px-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-teal"
            />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
            {item.category}
          </p>
          <h3 className="mt-3 font-display text-3xl">{item.company}</h3>
          <p className="mt-4 text-sm leading-7 text-brand-stone">{item.summary}</p>
          {item.descriptor ? (
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-stone/75">
              {item.descriptor}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3">
            {item.website ? (
              <a
                href={item.website}
                className="inline-flex text-sm font-semibold text-brand-teal transition hover:opacity-80"
              >
                Visiter le site
              </a>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
