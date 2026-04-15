type ExternalLinkItem = {
  name: string;
  href: string;
  summary: string;
  meta: string;
  logoUrl: string;
};

export default function ExternalLinkGrid({
  items
}: {
  items: ExternalLinkItem[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <a
          key={`${item.name}-${item.href}`}
          href={item.href}
          target="_blank"
          rel="noreferrer noopener"
          className="card-surface block p-5 transition hover:-translate-y-0.5"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-brand-line bg-white p-2">
              <img
                src={item.logoUrl}
                alt={item.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                {item.meta}
              </p>
              <h3 className="mt-2 font-display text-2xl text-brand-ink">{item.name}</h3>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-brand-stone">{item.summary}</p>
          <p className="mt-4 text-sm font-semibold text-brand-teal">Visiter le site</p>
        </a>
      ))}
    </div>
  );
}
