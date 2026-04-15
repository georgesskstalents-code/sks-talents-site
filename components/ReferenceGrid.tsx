import type { Reference } from "@/data/references";

export default function ReferenceGrid({ items }: { items: Reference[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article key={item.slug} className="card-surface p-6">
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
