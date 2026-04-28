"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Suspense, useState } from "react";
import SiteLanguageSelector from "@/components/SiteLanguageSelector";

const navGroups = [
  {
    href: "/about",
    label: "Qui sommes-nous",
    children: [
      {
        href: "/about",
        label: "Notre histoire et nos valeurs"
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

  return (
    <header className="sticky top-0 z-50 border-b border-brand-teal/10 bg-white/90 backdrop-blur-xl">
      <div className="container-shell flex min-h-[84px] items-center gap-4 xl:gap-7">
        <Link href="/" className="mr-1 flex shrink-0 items-center xl:mr-3">
          <img
            src="/brand/logo-sks-talents-signature.svg"
            alt="SKS TALENTS"
            className="h-12 w-auto max-w-none object-contain object-left sm:h-14"
          />
        </Link>

        <nav className="hidden flex-1 items-center gap-5 lg:flex xl:gap-7">
          {navGroups.map((item) => (
            item.children ? (
              <div key={item.href} className="relative">
                <div className="flex items-center gap-2">
                  <Link
                    href={item.href}
                    className="whitespace-nowrap text-[15px] font-semibold leading-none text-brand-stone transition hover:text-brand-teal"
                  >
                    {item.label}
                  </Link>
                  <details className="relative">
                    <summary
                      className="inline-flex h-7 w-7 cursor-pointer list-none items-center justify-center rounded-full border border-brand-teal/15 bg-white text-xs text-brand-stone transition hover:bg-brand-mint hover:text-brand-teal"
                      aria-label="Ouvrir le menu Qui sommes-nous"
                    >
                      ▾
                    </summary>
                    <div className="absolute left-0 top-full z-40 mt-3 min-w-[240px] rounded-[22px] border border-brand-line bg-white p-3 shadow-[0_20px_45px_rgba(15,23,42,0.12)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-[16px] px-4 py-3 text-sm font-semibold text-brand-stone transition hover:bg-brand-mint/40 hover:text-brand-teal"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                </div>
              </div>
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
