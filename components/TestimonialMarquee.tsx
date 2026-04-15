import SenjaTestimonials from "@/components/SenjaTestimonials";

const testimonials = [
  {
    name: "Sarah",
    role: "Ingénieure d'affaires - Biomedical",
    date: "Sep 17, 2023",
    quote:
      "Je vous partage une très belle expérience. Cela fait 4 ans que je suis en CDI dans la même société. Ça n’aurait pas été possible sans Georges qui s’est battu pour que je puisse avoir ce poste qui était une énorme opportunité dans ma carrière."
  },
  {
    name: "Biyang ZHOU",
    role: "Chef de produits - Biokar diagnostics",
    date: "Sep 2, 2023",
    quote:
      "Georges m'a contacté pour un poste qui me correspondait parfaitement. Il a assuré l'accompagnement tout au long du process de recrutement et même après l'embauche. Je recommande sans hésitation."
  },
  {
    name: "Lina Dawod",
    role: "Ingénieure de recherche - Biokar",
    date: "Aug 7, 2023",
    quote:
      "J'ai été contactée par Georges pour un poste d'ingénieure en R&D en Microbiologie. Son suivi tout au long du process de recrutement a été excellent. Ses conseils pertinents ainsi que nos échanges transparents et motivants m'ont été d'une aide précieuse."
  },
  {
    name: "Baldo",
    role: "Genomics EMEA Commercial Director",
    date: "Jul 30, 2023",
    quote:
      "Georges m'a accompagné pendant plusieurs années dans le recrutement de profils spécialisés en Life Sciences / In Vitro Diagnostics. Il fait preuve d'une grande agilité et d'une rapide compréhension des challenges de l'entreprise et des besoins ciblés."
  }
];

export default function TestimonialMarquee() {
  const senjaWidgetId = process.env.NEXT_PUBLIC_SENJA_WIDGET_ID;

  if (senjaWidgetId) {
    return (
      <div className="overflow-hidden rounded-[36px] border border-brand-teal/10 bg-white/75 px-4 py-8 shadow-soft sm:px-6">
        <div className="pb-8 text-center">
          <p className="text-base font-black uppercase tracking-[0.18em] text-brand-teal sm:text-2xl">
            Ce qu&apos;ils pensent de nos services ?
          </p>
          <h3 className="mt-3 text-3xl font-medium text-brand-stone sm:text-5xl">
            Découvrez leurs avis !
          </h3>
        </div>
        <SenjaTestimonials widgetId={senjaWidgetId} className="min-h-[320px]" />
      </div>
    );
  }

  const doubled = [...testimonials, ...testimonials];

  return (
    <div className="overflow-hidden rounded-[36px] border border-brand-teal/10 bg-white/75 px-4 py-8 shadow-soft sm:px-6">
      <div className="pb-8 text-center">
        <p className="text-base font-black uppercase tracking-[0.18em] text-brand-teal sm:text-2xl">
          Ce qu'ils pensent de nos services ?
        </p>
        <h3 className="mt-3 text-3xl font-medium text-brand-stone sm:text-5xl">
          Découvrez leurs avis !
        </h3>
      </div>
      <div className="flex min-w-max animate-marquee-testimonials gap-6 px-2">
        {doubled.map((item, index) => (
          <article
            key={`${item.name}-${index}`}
            className="min-h-[420px] min-w-[360px] max-w-[360px] rounded-[24px] border border-brand-teal/10 bg-white p-6 shadow-soft sm:min-w-[410px] sm:max-w-[410px]"
          >
            <p className="truncate text-[15px] font-semibold text-brand-ink sm:text-[17px]">{item.name}</p>
            <p className="truncate text-[15px] text-brand-stone sm:text-[16px]">{item.role}</p>
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
            <p className="mt-6 text-[14px] text-brand-stone/70">{item.date}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
