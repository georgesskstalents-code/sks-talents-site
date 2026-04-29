const partners = [
  {
    name: "France Biotech",
    href: "https://france-biotech.fr/",
    logoPath: "/images/partners/france-biotech.svg"
  },
  {
    name: "Université Paris-Saclay",
    href: "https://www.universite-paris-saclay.fr",
    logoPath: "/images/partners/universite-paris-saclay.svg"
  }
];

export default function EcosystemTrustBar() {
  return (
    <section className="container-shell py-4">
      <div className="flex flex-col items-center justify-center gap-4 rounded-[28px] border border-brand-teal/10 bg-white/80 px-6 py-5 backdrop-blur sm:flex-row sm:gap-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-stone/70">
          Membre de l’écosystème
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noreferrer noopener"
              className="opacity-70 transition hover:opacity-100"
              aria-label={partner.name}
            >
              <img
                src={partner.logoPath}
                alt={partner.name}
                className="h-9 w-auto object-contain sm:h-11"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
