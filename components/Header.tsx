"use client";

import Link from "next/link";
import { ChevronDown, Search, X, Briefcase, Cpu, GraduationCap, Target } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import NavDropdown from "@/components/NavDropdown";
import SiteLanguageSelector from "@/components/SiteLanguageSelector";

type NavChild = { href: string; label: string };

type NavGroup = {
  href: string;
  label: string;
  children?: NavChild[];
};

const navGroups: NavGroup[] = [
  {
    href: "/about",
    label: "Qui sommes-nous",
    children: [
      { href: "/about#histoire", label: "Notre histoire" },
      { href: "/about#valeurs", label: "Nos valeurs" },
      { href: "/mission", label: "Notre mission" },
      { href: "/team", label: "Notre équipe" }
    ]
  },
  {
    href: "/services",
    label: "Nos services",
    children: [
      { href: "/services", label: "Executive Search" },
      { href: "/services", label: "Structuration RH" },
      { href: "/life-sciences/structuration-ia", label: "Programme IA Life Sciences" },
      { href: "/animal-health/structuration-ia", label: "Programme IA Animal Health" },
      { href: "/diagnostic", label: "Diagnostic gratuit" }
    ]
  },
  {
    href: "/life-sciences",
    label: "Life Sciences",
    children: [
      { href: "/life-sciences", label: "Vue d'ensemble" },
      { href: "/life-sciences/structuration-ia", label: "★ Programme IA Life Sciences" },
      { href: "/life-sciences", label: "Biotech" },
      { href: "/life-sciences", label: "Diagnostic" },
      { href: "/life-sciences", label: "Cosmétique" }
    ]
  },
  {
    href: "/animal-health",
    label: "Animal Health",
    children: [
      { href: "/animal-health", label: "Vue d'ensemble" },
      { href: "/animal-health/structuration-ia", label: "★ Programme IA Animal Health" },
      { href: "/animal-health", label: "Veterinary" },
      { href: "/animal-health", label: "Petfood" },
      { href: "/animal-health", label: "Medical Vet" }
    ]
  },
  {
    href: "/resources",
    label: "Les ressources",
    children: [
      { href: "/scorecard-dirigeant", label: "Scorecard dirigeant" },
      { href: "/diagnostic", label: "Diagnostic" },
      { href: "/salary-benchmarks", label: "Salary benchmarks" },
      { href: "/comparatifs", label: "Comparatifs" },
      { href: "/studies", label: "Études" },
      { href: "/job-roles", label: "Fiches métiers" },
      { href: "/newsletter", label: "Newsletter" },
      { href: "/blog", label: "Articles" },
      { href: "/orientation", label: "Orientation" },
      { href: "/schools", label: "Écoles" },
      { href: "/lexique-life-sciences-rh", label: "Lexique" }
    ]
  },
  {
    href: "/references",
    label: "Les références"
  }
];

// 4 portes personas pour le drawer mobile (2x2 grid en haut).
const mobilePersonas = [
  {
    Icon: Target,
    label: "Je recrute",
    href: "/services",
    highlighted: true
  },
  {
    Icon: Cpu,
    label: "Je découvre l'IA",
    href: "/life-sciences/structuration-ia"
  },
  {
    Icon: Briefcase,
    label: "Je cherche un poste",
    href: "/rejoignez-nous"
  },
  {
    Icon: GraduationCap,
    label: "Je m'oriente",
    href: "/orientation"
  }
];

function LanguageSelectorFallback() {
  return (
    <div
      className="inline-flex min-h-[36px] items-center gap-0.5 rounded-full border border-brand-teal/20 bg-white/90 p-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-stone shadow-soft sm:min-h-[44px] sm:gap-1 sm:p-1 sm:tracking-[0.18em]"
      aria-hidden="true"
    >
      <span className="rounded-full bg-brand-mint px-2.5 py-1.5 text-brand-teal sm:px-3 sm:py-2">FR</span>
      <span className="px-2.5 py-1.5 sm:px-3 sm:py-2">EN</span>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string>("/about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (menuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-brand-teal/10 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-[0_6px_24px_rgba(15,23,42,0.06)]" : "bg-white/90"
      }`}
    >
      <div
        className={`container-shell flex items-center gap-2 transition-all duration-300 sm:gap-4 xl:gap-7 ${
          scrolled ? "min-h-[64px]" : "min-h-[84px]"
        }`}
      >
        <Link href="/" className="mr-1 flex shrink-0 items-center xl:mr-3">
          <img
            src="/brand/logo-sks-talents-signature.svg"
            alt="SKS TALENTS"
            className={`w-auto max-w-none object-contain object-left transition-all duration-300 ${
              scrolled ? "h-9 sm:h-11" : "h-12 sm:h-14"
            }`}
          />
        </Link>

        <nav className="hidden flex-1 items-center gap-5 lg:flex xl:gap-7">
          {navGroups.map((item) => (
            item.children ? (
              <NavDropdown
                key={item.href}
                label={item.label}
                items={item.children}
                triggerClassName="inline-flex items-center gap-1 whitespace-nowrap text-[15px] font-semibold leading-none text-brand-stone transition hover:text-brand-teal"
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-[15px] font-semibold leading-none text-brand-stone transition hover:text-brand-teal"
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <Link
            href="/search"
            className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-brand-teal/20 px-5 py-3 text-sm font-semibold text-brand-stone transition hover:bg-brand-mint hover:text-brand-teal md:inline-flex"
          >
            <Search size={16} />
            Chercher
          </Link>
          <Suspense fallback={<LanguageSelectorFallback />}>
            <SiteLanguageSelector />
          </Suspense>
        </div>

        {/* Mobile-only: quick 'Réserver' CTA next to hamburger (per CEO mockup) */}
        <a
          href="https://calendly.com/g-kengue/talentconsulting"
          target="_blank"
          rel="noreferrer noopener"
          className="ml-1 inline-flex shrink-0 items-center justify-center rounded-full bg-brand-teal px-3 py-2 text-xs font-semibold text-white transition active:scale-95 sm:px-4 sm:py-2.5 sm:text-sm lg:hidden"
        >
          Réserver
        </a>

        <button
          type="button"
          className="ml-1 inline-flex shrink-0 rounded-full border border-brand-teal/20 p-2.5 text-brand-teal sm:p-3 lg:hidden"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="Ouvrir le menu"
        >
          <span className="h-0.5 w-5 bg-current shadow-[0_6px_0_currentColor,0_-6px_0_currentColor]" />
        </button>
      </div>
      {menuOpen ? (
        <div className="fixed inset-0 z-[80] flex flex-col bg-white lg:hidden" role="dialog" aria-modal="true">
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-brand-teal/10 px-5 py-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="font-display text-lg font-semibold tracking-tight text-brand-ink"
            >
              SKS TALENTS
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fermer le menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-teal/15 bg-white text-brand-stone transition active:scale-95"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable nav body */}
          <div className="flex-1 overflow-y-auto px-3 pb-6 pt-4">
            {/* 2x2 persona portals at top of drawer */}
            <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-stone/80">
              Vous êtes ?
            </p>
            <div className="mb-6 grid grid-cols-2 gap-2 px-2">
              {mobilePersonas.map((p) => {
                const cardClass = p.highlighted
                  ? "flex flex-col items-start gap-2 rounded-2xl border border-brand-teal bg-brand-mint p-4"
                  : "flex flex-col items-start gap-2 rounded-2xl border border-brand-teal/15 bg-white p-4";
                return (
                  <Link
                    key={p.label}
                    href={p.href}
                    onClick={() => setMenuOpen(false)}
                    className={cardClass}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-teal">
                      <p.Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="text-caption font-semibold text-brand-ink">{p.label}</span>
                  </Link>
                );
              })}
            </div>

            <ul className="flex flex-col">
              {navGroups.map((item) => {
                const isOpen = item.children?.length ? openGroup === item.href : false;
                if (item.children?.length) {
                  return (
                    <li key={item.href} className="border-b border-brand-teal/8">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenGroup((current) => (current === item.href ? "" : item.href))
                        }
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between px-2 py-4 text-left text-[15px] font-semibold uppercase tracking-[0.08em] text-brand-ink"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-brand-teal transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen ? (
                        <ul className="flex flex-col gap-0.5 pb-3 pl-2">
                          {item.children.map((child) => (
                            <li key={`${item.href}-${child.label}`}>
                              <Link
                                href={child.href}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-3 rounded-2xl px-3 py-3 text-[15px] font-semibold text-brand-stone transition active:bg-brand-mint/45 active:text-brand-teal"
                              >
                                <span>{child.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  );
                }
                return (
                  <li key={item.href} className="border-b border-brand-teal/8">
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between px-2 py-4 text-[15px] font-semibold uppercase tracking-[0.08em] text-brand-ink"
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true" className="text-brand-teal">›</span>
                    </Link>
                  </li>
                );
              })}
              <li className="border-b border-brand-teal/8">
                <Link
                  href="/search"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-2 py-4 text-[15px] font-semibold uppercase tracking-[0.08em] text-brand-ink"
                >
                  <span className="inline-flex items-center gap-2">
                    <Search size={16} className="text-brand-teal" />
                    Recherche
                  </span>
                  <span aria-hidden="true" className="text-brand-teal">›</span>
                </Link>
              </li>
            </ul>

            {/* Language */}
            <div className="mt-5 px-2">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-stone/80">
                Langue
              </p>
              <Suspense fallback={<LanguageSelectorFallback />}>
                <SiteLanguageSelector />
              </Suspense>
            </div>
          </div>

          {/* Sticky CTA footer */}
          <div
            className="border-t border-brand-teal/12 bg-white px-4 pt-3"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
          >
            <div className="grid gap-2.5">
              <a
                href="https://calendly.com/g-kengue/talentconsulting"
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center gap-1 rounded-full bg-brand-teal px-5 py-3.5 text-sm font-semibold text-white transition active:scale-95"
              >
                Réserver 15 min
              </a>
              <Link
                href="/diagnostic"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-brand-teal/25 bg-white px-5 py-3.5 text-sm font-semibold text-brand-teal transition active:scale-95"
              >
                Faire le diagnostic
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
