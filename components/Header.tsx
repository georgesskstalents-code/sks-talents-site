"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import NavDropdown from "@/components/NavDropdown";
import SiteLanguageSelector from "@/components/SiteLanguageSelector";

const navGroups = [
  {
    href: "/about",
    label: "Qui sommes-nous",
    children: [
      {
        href: "/about#histoire",
        label: "Notre histoire"
      },
      {
        href: "/about#valeurs",
        label: "Nos valeurs"
      },
      {
        href: "/mission",
        label: "Notre mission"
      },
      {
        href: "/team",
        label: "Notre équipe"
      }
    ]
  },
  {
    href: "/services",
    label: "Nos services"
  },
  {
    href: "/life-sciences",
    label: "Life Sciences"
  },
  {
    href: "/animal-health",
    label: "Animal Health"
  },
  {
    href: "/resources",
    label: "Les ressources"
  },
  {
    href: "/references",
    label: "Les références"
  }
];

function LanguageSelectorFallback() {
  return (
    <div
      className="inline-flex min-h-[44px] items-center gap-1 rounded-full border border-brand-teal/20 bg-white/90 p-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-stone shadow-soft"
      aria-hidden="true"
    >
      <span className="rounded-full bg-brand-mint px-3 py-2 text-brand-teal">FR</span>
      <span className="px-3 py-2">EN</span>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-brand-teal/10 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-[0_6px_24px_rgba(15,23,42,0.06)]" : "bg-white/90"
      }`}
    >
      <div
        className={`container-shell flex items-center gap-4 transition-all duration-300 xl:gap-7 ${
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

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <Link
            href="/search"
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-brand-teal/20 px-5 py-3 text-sm font-semibold text-brand-stone transition hover:bg-brand-mint hover:text-brand-teal"
          >
            <Search size={16} />
            Chercher
          </Link>
          <Suspense fallback={<LanguageSelectorFallback />}>
            <SiteLanguageSelector />
          </Suspense>
        </div>

        <button
          type="button"
          className="ml-auto inline-flex rounded-full border border-brand-teal/20 p-3 text-brand-teal lg:hidden"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="Ouvrir le menu"
        >
          <span className="h-0.5 w-5 bg-current shadow-[0_6px_0_currentColor,0_-6px_0_currentColor]" />
        </button>
      </div>
      {menuOpen ? (
        <div className="border-t border-brand-teal/10 bg-white lg:hidden">
          <div className="container-shell flex flex-col gap-4 py-6">
            {navGroups.map((item) => (
              <div key={item.href} className="flex flex-col gap-2">
                {item.children?.length ? (
                  <>
                    <p className="text-base font-semibold text-brand-stone">{item.label}</p>
                    <div className="ml-4 flex flex-col gap-2 border-l border-brand-line pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="text-sm font-semibold text-brand-stone/80"
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-base font-semibold text-brand-stone"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-teal/20 px-5 py-3 text-center text-sm font-semibold text-brand-stone"
              onClick={() => setMenuOpen(false)}
            >
              <Search size={16} />
              Chercher
            </Link>
            <div className="pt-1">
              <Suspense fallback={<LanguageSelectorFallback />}>
                <SiteLanguageSelector />
              </Suspense>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
