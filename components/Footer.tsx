import Link from "next/link";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";

const cabinetLinks = [
  { href: "/about", label: "Qui sommes-nous" },
  { href: "/mission", label: "Notre mission" },
  { href: "/team", label: "Notre équipe" },
  { href: "/references", label: "Références" },
  { href: "/press", label: "Presse" },
  { href: "/media-kit", label: "Media kit" },
  { href: "/partenaires-media", label: "Partenaires & sponsorings" },
  { href: "/rejoignez-nous", label: "Rejoignez-nous" }
];

const dirigeantLinks = [
  { href: "/services", label: "Executive Search · Structuration RH" },
  { href: "/life-sciences/structuration-ia", label: "Programme IA Life Sciences", highlight: true },
  { href: "/animal-health/structuration-ia", label: "Programme IA Animal Health", highlight: true },
  { href: "/diagnostic", label: "Diagnostic" },
  { href: "/scorecard-dirigeant", label: "Scorecard dirigeant" },
  { href: "/salary-benchmarks", label: "Salary benchmarks" },
  { href: "/cas-d-usage", label: "Cas d'usage" },
  { href: "/comparatifs", label: "Comparatifs" },
  { href: "/studies", label: "Études & insights" }
];

const candidatLinks = [
  { href: "/rejoignez-nous", label: "Missions ouvertes" },
  { href: "/job-roles", label: "Fiches métiers" },
  { href: "/calcul-salaire-brut-net", label: "Calcul salaire brut/net" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/blog", label: "Articles" },
  { href: "/orientation", label: "Orientation" },
  { href: "/schools", label: "Écoles" },
  { href: "/lexique-life-sciences-rh", label: "Lexique" },
  { href: "/investment-funds", label: "Investment funds" },
  { href: "/france", label: "Hub France" },
  { href: "/senegal", label: "Hub Sénégal" },
  { href: "/cote-divoire", label: "Hub Côte d'Ivoire" },
  { href: "/benin", label: "Hub Bénin" }
];

const legalLinks = [
  { href: "/legal/mentions-legales", label: "Mentions légales" },
  { href: "/legal/cgu", label: "CGU" },
  { href: "/legal/politique-confidentialite", label: "Politique de confidentialité" },
  { href: "/legal/politique-cookies", label: "Politique cookies" },
  {
    href: "/legal/politique-confidentialite",
    label: "Protection des données à caractère personnel"
  },
  { href: "/legal/charte-recrutement", label: "Charte de recrutement" },
  { href: "/legal/cgv", label: "CGV" }
];

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

type ColumnLink = { href: string; label: string; highlight?: boolean };

function FooterColumn({ title, links }: { title: string; links: ColumnLink[] }) {
  return (
    <div className="grid gap-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">{title}</p>
      {links.map((link) => (
        <Link
          key={`${link.href}-${link.label}`}
          href={link.href}
          className={`text-sm font-semibold transition hover:text-white ${
            link.highlight ? "text-brand-mint" : "text-white/80"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

function MobileColumn({ title, links }: { title: string; links: ColumnLink[] }) {
  return (
    <details className="border-b border-white/10 py-3">
      <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
        {title}
        <span aria-hidden="true" className="text-white/60">+</span>
      </summary>
      <div className="mt-3 grid gap-3 pl-1">
        {links.map((link) => (
          <Link
            key={`${link.href}-${link.label}-m`}
            href={link.href}
            className={`text-sm font-semibold transition hover:text-white ${
              link.highlight ? "text-brand-mint" : "text-white/80"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-brand-teal/10 bg-[#163334] text-white">
      <div className="container-shell py-14">
        {/* Identity column (always visible) */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center rounded-[26px] border border-white/10 bg-white px-5 py-4 shadow-[0_18px_40px_rgba(5,14,16,0.18)]">
              <img
                src="/brand/logo-sks-talents-signature.svg"
                alt="SKS TALENTS"
                className="h-16 w-[230px] object-contain object-center"
              />
            </div>
            <h2 className="font-display text-4xl">Recruter avec exigence et humanité.</h2>
            <p className="max-w-2xl text-sm leading-7 text-white/70">
              Cabinet spécialisé en executive search, talent acquisition et structuration RH pour
              les Life Sciences, le diagnostic, la santé animale et le petfood premium.
            </p>
            <address className="not-italic rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                Adresse
              </p>
              <p className="mt-2 text-base font-semibold text-white">
                128, rue la Boétie
                <br />
                75008 Paris &middot; France
              </p>
              <a
                href="https://maps.google.com/?q=128+rue+la+Bo%C3%A9tie+75008+Paris"
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 inline-flex text-sm font-semibold text-white/70 transition hover:text-white"
              >
                Voir sur Google Maps
              </a>
            </address>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={
                  process.env.NEXT_PUBLIC_CALENDLY_URL && process.env.NEXT_PUBLIC_CALENDLY_URL.length > 0
                    ? process.env.NEXT_PUBLIC_CALENDLY_URL
                    : "https://calendly.com/g-kengue/talentconsulting"
                }
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                Prendre rendez-vous
              </a>
              <a
                href="https://www.linkedin.com/company/sks-talents/"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                LinkedIn
              </a>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                Partenaires d'écosystème
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

          {/* Desktop: 3 thematic columns */}
          <div className="hidden gap-8 lg:grid lg:grid-cols-3">
            <FooterColumn title="Cabinet" links={cabinetLinks} />
            <FooterColumn title="Pour dirigeants" links={dirigeantLinks} />
            <FooterColumn title="Candidats & étudiants" links={candidatLinks} />
          </div>

          {/* Mobile: accordions */}
          <div className="lg:hidden">
            <MobileColumn title="Cabinet" links={cabinetLinks} />
            <MobileColumn title="Pour dirigeants" links={dirigeantLinks} />
            <MobileColumn title="Candidats & étudiants" links={candidatLinks} />
          </div>
        </div>

        {/* Legal links + cookie preferences */}
        <div className="mt-10 grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="grid gap-2 sm:col-span-2 lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Légal</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={`${link.href}-${link.label}-l`}
                  href={link.href}
                  className="text-xs text-white/70 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <CookiePreferencesButton className="text-left text-xs text-white/70 transition hover:text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-brand-teal/90 px-6 py-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4 text-center">
          <div className="rounded-[30px] border border-white/15 bg-white px-6 py-5 shadow-[0_22px_50px_rgba(8,22,24,0.18)]">
            <img
              src="/brand/logo-sks-talents-signature.svg"
              alt="SKS TALENTS"
              className="h-24 w-auto object-contain sm:h-28"
            />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
            Scaling teams without losing soul
          </p>
          <p className="text-xs text-white/60">© 2026 SKS TALENTS</p>
        </div>
      </div>
    </footer>
  );
}
