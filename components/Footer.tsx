import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "Qui sommes-nous" },
  { href: "/services", label: "Services" },
  { href: "/resources", label: "Ressources" },
  { href: "/ecosystem", label: "Écosystème & réseaux" },
  { href: "/studies", label: "Études & insights" },
  { href: "/salary-benchmarks", label: "Benchmarks salaires" },
  { href: "/comparatifs", label: "Comparatifs SEO" },
  { href: "/team", label: "Équipe & expertise" },
  { href: "/press", label: "Presse & publications" },
  { href: "/media-kit", label: "Media kit" },
  { href: "/partenaires-media", label: "Partenaires & sponsorings" },
  { href: "/rejoignez-nous", label: "Rejoignez-nous" },
  { href: "/calcul-salaire-brut-net", label: "Calcul salaire brut/net" },
  { href: "/investment-funds", label: "Investment funds" },
  { href: "/references", label: "Références" },
  { href: "/contact", label: "Contact" }
];

const legalLinks = [
  { href: "/legal/mentions-legales", label: "Mentions légales" },
  { href: "/legal/cgu", label: "CGU" },
  { href: "/legal/politique-confidentialite", label: "Politique de confidentialité" },
  {
    href: "/legal/politique-confidentialite",
    label: "Protection des données à caractère personnel"
  },
  { href: "/legal/charte-recrutement", label: "Charte de recrutement" },
  { href: "/legal/cgv", label: "CGV" }
];

export default function Footer() {
  const ecosystemPartners = [
    {
      name: "France Biotech",
      href: "https://france-biotech.fr/",
      logoPath: "/images/partners/france-biotech.svg"
    },
    {
      name: "Université Paris-Saclay",
      href: "http://www.universite-paris-saclay.fr",
      logoPath: "/images/partners/universite-paris-saclay.svg"
    }
  ];

  return (
    <footer className="mt-24 border-t border-brand-teal/10 bg-[#163334] text-white">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <img
            src="/brand/logo-sks-talents.svg"
            alt="SKS TALENTS"
            className="h-16 w-[230px] object-contain object-left brightness-[1.08] contrast-125"
          />
          <h2 className="font-display text-4xl">Recruter avec exigence et humanité.</h2>
          <p className="max-w-2xl text-sm leading-7 text-white/70">
            Cabinet spécialisé en executive search, talent acquisition et structuration RH pour
            les Life Sciences, le diagnostic, la santé animale et le petfood premium.
          </p>
          <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Contact direct
            </p>
            <a
              href="mailto:infos@skstalents.com"
              className="mt-2 inline-flex text-base font-semibold text-white transition hover:text-teal-200"
            >
              infos@skstalents.com
            </a>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://calendly.com/g-kengue/talentconsulting"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
            >
              Prendre rendez-vous
            </a>
            <a
              href="https://linkedin.com/m/search/results/all/?keywords=sks+talents&fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A86378852&position=0&origin=RICH_QUERY_TYPEAHEAD_HISTORY&lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BrPgcaT3hSCqaGuomz7Pvvw%3D%3D"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
            >
              LinkedIn
            </a>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Partenaires d’écosystème
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {ecosystemPartners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-[22px] border border-white/10 bg-white px-4 py-4 transition hover:-translate-y-0.5"
                >
                  <div className="flex h-16 items-center justify-center">
                    <img
                      src={partner.logoPath}
                      alt={partner.name}
                      className="max-h-12 w-auto object-contain"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="grid gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Navigation
            </p>
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-white/80 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="grid gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Légal
            </p>
            {legalLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="text-sm font-semibold text-white/80 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 bg-brand-teal/90 px-6 py-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4 text-center">
          <img
            src="/brand/logo-sks-talents.svg"
            alt="SKS TALENTS"
            className="h-24 w-auto object-contain brightness-0 invert sm:h-28"
          />
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
            Scaling teams without losing soul
          </p>
        </div>
      </div>
    </footer>
  );
}
