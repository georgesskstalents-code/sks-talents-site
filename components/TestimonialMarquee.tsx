import SenjaTestimonials from "@/components/SenjaTestimonials";
import { realTestimonials as testimonials } from "@/data/testimonials";

export default function TestimonialMarquee({ embedded = false }: { embedded?: boolean }) {
  const senjaWidgetId = process.env.NEXT_PUBLIC_SENJA_WIDGET_ID;

  if (senjaWidgetId) {
    if (embedded) {
      return <SenjaTestimonials widgetId={senjaWidgetId} className="min-h-[320px]" />;
    }
    return (
      <div className="overflow-hidden rounded-[36px] border border-brand-teal/10 bg-white/75 px-4 py-8 shadow-soft sm:px-6">
        <div className="pb-8 text-center">
          <p className="text-base font-black uppercase tracking-[0.18em] text-brand-teal sm:text-2xl">
            Ce que nos clients et candidats pensent de nous ?
          </p>
          <h3 className="mt-3 text-3xl font-medium text-brand-stone sm:text-5xl">
            Ce qu&apos;ils pensent de nos services ?
          </h3>
          <p className="mt-3 text-lg font-medium text-brand-stone sm:text-2xl">
            Découvrez leurs avis !
          </p>
        </div>
        <SenjaTestimonials widgetId={senjaWidgetId} className="min-h-[320px]" />
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
            className="min-h-[420px] min-w-[360px] max-w-[360px] rounded-[24px] border border-brand-teal/10 bg-white p-6 shadow-soft sm:min-w-[410px] sm:max-w-[410px]"
          >
            <p className="truncate text-[15px] font-semibold text-brand-ink sm:text-[17px]">{item.name}</p>
            <p className="truncate text-[15px] text-brand-stone sm:text-[16px]">{item.role ?? ""}</p>
            <p className="mt-4 text-[32px] leading-none text-amber-400">★★★★★</p>
            <p className="mt-5 line-clamp-8 text-[16px] leading-8 text-brand-stone sm:text-[17px]">
              {item.quote}
            </p>
            <a
              href="https://fr.trustpilot.com/review/skstalents.fr"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 text-left text-[15px] font-medium text-brand-stone transition hover:text-brand-teal"
            >
              Voir l'avis public
            </a>
            <p className="mt-6 text-[14px] text-brand-stone/80">{item.date}</p>
          </article>
        ))}
      </div>
    </div>
  );

  if (embedded) {
    return marquee;
  }

  return (
    <div className="overflow-hidden rounded-[36px] border border-brand-teal/10 bg-white/75 px-4 py-8 shadow-soft sm:px-6">
      <div className="pb-8 text-center">
        <p className="text-base font-black uppercase tracking-[0.18em] text-brand-teal sm:text-2xl">
          Ce que nos clients et candidats pensent de nous ?
        </p>
        <h3 className="mt-3 text-3xl font-medium text-brand-stone sm:text-5xl">
          Ce qu&apos;ils pensent de nos services ?
        </h3>
        <p className="mt-3 text-lg font-medium text-brand-stone sm:text-2xl">
          Découvrez leurs avis !
        </p>
      </div>
      {marquee}
    </div>
  );
}
