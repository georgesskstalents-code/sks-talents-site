import SenjaTestimonials from "@/components/SenjaTestimonials";
import { realTestimonials as testimonials } from "@/data/testimonials";

export default function TestimonialMarquee({ embedded = false }: { embedded?: boolean }) {
  const senjaWidgetId = process.env.NEXT_PUBLIC_SENJA_WIDGET_ID;

  if (senjaWidgetId) {
    if (embedded) {
      return <SenjaTestimonials widgetId={senjaWidgetId} className="min-h-[320px]" />;
    }
    return (
      <div className="overflow-hidden rounded-2xl border border-brand-teal/10 bg-white/75 px-4 py-5 shadow-soft sm:px-6 sm:py-6">
        <div className="pb-4 text-center sm:pb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-teal sm:text-xs">
            Ce que nos clients et candidats pensent de nous
          </p>
          <h3 className="mt-2 text-lg font-semibold text-brand-stone sm:text-xl">
            Ce qu&apos;ils pensent de nos services
          </h3>
        </div>
        <SenjaTestimonials widgetId={senjaWidgetId} className="min-h-[240px]" />
      </div>
    );
  }

  const doubled = [...testimonials, ...testimonials];

  const marquee = (
    <div className="overflow-hidden">
      <div className="flex min-w-max animate-marquee-testimonials gap-6 px-2 hover:[animation-play-state:paused]">
        {doubled.map((item, index) => (
          <article
            key={`${item.name}-${index}`}
            className="min-h-[260px] min-w-[280px] max-w-[280px] rounded-2xl border border-brand-teal/10 bg-white p-4 shadow-soft sm:min-w-[300px] sm:max-w-[300px]"
          >
            <p className="truncate text-[13px] font-semibold text-brand-ink sm:text-sm">{item.name}</p>
            <p className="truncate text-[12px] text-brand-stone sm:text-[13px]">{item.role ?? ""}</p>
            <p className="mt-2 text-[20px] leading-none text-amber-400">★★★★★</p>
            <p className="mt-3 line-clamp-5 text-[12px] leading-6 text-brand-stone sm:text-[13px]">
              {item.quote}
            </p>
            <a
              href="https://fr.trustpilot.com/review/skstalents.fr"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-2 inline-block text-[12px] font-medium text-brand-stone transition hover:text-brand-teal"
            >
              Voir l'avis public
            </a>
            <p className="mt-3 text-[11px] text-brand-stone/80">{item.date}</p>
          </article>
        ))}
      </div>
    </div>
  );

  if (embedded) {
    return marquee;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-teal/10 bg-white/75 px-4 py-5 shadow-soft sm:px-6 sm:py-6">
      <div className="pb-4 text-center sm:pb-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-teal sm:text-xs">
          Ce que nos clients et candidats pensent de nous
        </p>
        <h3 className="mt-2 text-lg font-semibold text-brand-stone sm:text-xl">
          Ce qu&apos;ils pensent de nos services
        </h3>
      </div>
      {marquee}
    </div>
  );
}
