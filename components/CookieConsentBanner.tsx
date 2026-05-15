"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_UPDATED_EVENT,
  OPEN_COOKIE_PREFERENCES_EVENT,
  getStoredCookieConsent,
  setStoredCookieConsent
} from "@/lib/cookieConsent";

export default function CookieConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setOpen(!getStoredCookieConsent());

    const handleOpen = () => {
      setOpen(true);
      setDetailOpen(true);
    };
    const handleUpdated = () => {
      setOpen(false);
      setDetailOpen(false);
    };

    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpen);
    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, handleUpdated);

    return () => {
      window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpen);
      window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, handleUpdated);
    };
  }, []);

  // Auto-dismiss apres 5s si l'utilisateur n'a pas cliqu (CEO direction):
  // bascule en consent "essential" pour laisser les autres widgets (chat, etc.) apparaitre.
  // L'utilisateur peut revenir via "Preferences cookies" dans le footer.
  useEffect(() => {
    if (!open) return;
    if (detailOpen) return;
    const timer = window.setTimeout(() => {
      setStoredCookieConsent("essential");
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [open, detailOpen]);

  if (!mounted || !open) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-brand-ink/10 bg-white shadow-[0_-18px_80px_rgba(15,23,42,0.16)]">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-8 sm:py-5">
        <div className="grid gap-3 sm:gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-2 sm:space-y-4">
            <p className="hidden text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal sm:block">
              Confidentialité
            </p>
            <div className="space-y-2 sm:space-y-3">
              <h2 className="font-display text-xl text-brand-ink sm:text-3xl lg:text-4xl">
                <span className="sm:hidden">Cookies</span>
                <span className="hidden sm:inline">Vos données vous appartiennent</span>
              </h2>
              <p className="max-w-3xl text-sm leading-6 text-brand-stone sm:text-base sm:leading-8">
                <span className="sm:hidden">
                  SKS TALENTS utilise des cookies pour le fonctionnement du site et, avec votre
                  accord, mesurer la fréquentation. Aucune donnée n’est cédée à des tiers.
                </span>
                <span className="hidden sm:inline">
                  SKS TALENTS utilise sur ce site des cookies destinés à son bon fonctionnement et,
                  avec votre accord, à mesurer la fréquentation afin d’évaluer les performances des
                  contenus, des parcours et des campagnes d’information.
                </span>
              </p>
              <p className="hidden max-w-3xl text-base leading-8 text-brand-stone sm:block">
                SKS TALENTS ne vend, ne cède et ne communique aucune donnée personnelle à des tiers.
              </p>
              <p className="hidden max-w-3xl text-sm leading-7 text-brand-stone/90 sm:block">
                Pour modifier vos préférences plus tard, cliquez sur le lien{" "}
                <span className="font-semibold text-brand-ink">Préférences cookies</span> situé
                dans le pied de page.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-1 lg:min-w-[300px]">
            <button
              type="button"
              onClick={() => setDetailOpen((current) => !current)}
              className="inline-flex items-center justify-center rounded-full border border-brand-ink/12 px-4 py-2.5 text-xs font-semibold text-brand-ink transition hover:bg-brand-mint/45 sm:px-5 sm:py-3 sm:text-sm"
            >
              {detailOpen ? "Masquer" : "Détails"}
            </button>
            <button
              type="button"
              onClick={() => setStoredCookieConsent("accepted")}
              className="inline-flex items-center justify-center rounded-full bg-[#f5b70a] px-4 py-2.5 text-xs font-semibold text-white transition hover:brightness-95 sm:px-5 sm:py-3 sm:text-sm"
            >
              OK pour moi
            </button>
          </div>
        </div>
        {detailOpen ? (
          <div className="mt-5 grid gap-4 rounded-[28px] border border-brand-teal/12 bg-brand-mint/18 p-5 lg:grid-cols-[1fr_1fr_auto]">
            <div className="rounded-[24px] border border-brand-teal/12 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Cookies essentiels
              </p>
              <p className="mt-3 text-sm leading-7 text-brand-stone">
                Nécessaires au fonctionnement du site, à la sécurité des formulaires, à la
                mémorisation de vos préférences et à certains services utiles comme le chat.
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-ink">
                Toujours actifs
              </p>
            </div>
            <div className="rounded-[24px] border border-brand-teal/12 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Mesure d’audience
              </p>
              <p className="mt-3 text-sm leading-7 text-brand-stone">
                Activée uniquement avec votre accord pour comprendre quelles pages fonctionnent,
                quelles recherches aboutissent et quels contenus doivent être améliorés.
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-ink">
                Optionnelle
              </p>
            </div>
            <div className="flex flex-col justify-between gap-3 rounded-[24px] border border-brand-teal/12 bg-white p-5">
              <Link
                href="/legal/politique-cookies"
                className="inline-flex items-center justify-center rounded-full border border-brand-ink/12 px-4 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-mint/45"
              >
                Politique cookies
              </Link>
              <button
                type="button"
                onClick={() => setStoredCookieConsent("essential")}
                className="inline-flex items-center justify-center rounded-full border border-brand-teal/20 px-4 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
              >
                Essentiels uniquement
              </button>
              <button
                type="button"
                onClick={() => setStoredCookieConsent("accepted")}
                className="inline-flex items-center justify-center rounded-full bg-[#f5b70a] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-95"
              >
                Accepter
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
