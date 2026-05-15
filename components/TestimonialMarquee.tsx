import SenjaTestimonials from "@/components/SenjaTestimonials";
import { realTestimonials as testimonials } from "@/data/testimonials";

export default function TestimonialMarquee({ embedded = false }: { embedded?: boolean }) {
  const senjaWidgetId = process.env.NEXT_PUBLIC_SENJA_WIDGET_ID;

  if (senjaWidgetId) {
    if (embedded) {
      return <SenjaTestimonials widgetId={senjaWidgetId} className="min-h-[320px]" />;
    }
    return (
      <div className="overflow-hidden rounded-[28px] border border-brand-teal/10 bg-white/70 py-6 shadow-soft">
        <div className="px-6 pb-5 text-center">
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
    <div className="group overflow-hidden">
      <div className="flex min-w-max animate-marquee-testimonials gap-5 px-4 group-hover:[animation-play-state:paused]">
        {doubled.map((item, index) => (
          <article
            key={`${item.name}-${index}`}
            className="flex w-[320px] shrink-0 flex-col gap-2 rounded-2xl border border-brand-teal/12 bg-white p-5"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Avis vérifié · {item.date}
            </p>
            <p className="text-[16px] leading-none text-amber-400">★★★★★</p>
            <h3 className="font-display text-xl leading-tight text-brand-ink">{item.name}</h3>
            {item.role ? (
              <p className="-mt-1 text-xs text-brand-stone">{item.role}</p>
            ) : null}
            <p className="text-sm leading-6 text-brand-stone line-clamp-4">{item.quote}</p>
            <a
              href="https://fr.trustpilot.com/review/skstalents.fr"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-auto inline-flex text-sm font-semibold text-brand-teal transition hover:opacity-80"
            >
              Voir l'avis public
            </a>
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
