import ResourceLogo from "@/components/ResourceLogo";
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
            <ResourceLogo
              name={item.company}
              logoUrl={item.logoPath}
              className="relative flex h-12 w-[150px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-brand-line bg-white p-3"
              imageClassName="h-full w-full object-contain"
              badgeClassName="flex h-full w-full items-center justify-center rounded-xl bg-brand-mint px-3 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-teal"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
