import type { Reference } from "@/data/references";

export default function ReferenceMarquee({ items }: { items: Reference[] }) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden rounded-[28px] border border-brand-teal/10 bg-white/70 py-5 shadow-soft">
      <div className="flex min-w-max animate-marquee gap-4 px-4">
        {doubled.map((item, index) => (
          <a
            key={`${item.slug}-${index}`}
            href={item.website ?? `/references/${item.slug}`}
            className={`flex min-w-[220px] items-center justify-center rounded-[24px] border border-brand-teal/12 px-6 py-5 shadow-soft ${
              "bg-white transition hover:-translate-y-0.5 hover:border-brand-teal/30"
            }`}
            aria-label={item.company}
            title={item.company}
          >
            {item.logoPath ? (
              <img
                src={item.logoPath}
                alt={item.company}
                className="h-10 w-auto max-w-[150px] object-contain opacity-95"
              />
            ) : (
              <div className="text-center">
                <p className="text-sm font-semibold text-brand-ink">{item.company}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-brand-stone">
                  {item.category}
                </p>
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
