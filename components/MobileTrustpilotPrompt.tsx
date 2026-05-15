"use client";

import { Star, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCookieConsent } from "@/lib/useCookieConsent";

const SHOWS_KEY = "sks-trustpilot-shows-count";
const DISMISSED_AT_KEY = "sks-trustpilot-dismissed-at";
const FIRST_APPEAR_AFTER_MS = 4 * 60 * 1000; // 4 min after page load (CEO direction 2026-05-15)
const REAPPEAR_AFTER_MS = 5 * 60 * 1000; // 5 min after first dismiss
const AUTO_HIDE_AFTER_MS = 5 * 1000; // auto-disparait apres 5s d'affichage
const TRUSTPILOT_URL = "https://fr.trustpilot.com/review/skstalents.fr";

/**
 * Mobile-only floating Trustpilot prompt.
 * Choreography (per CEO direction):
 *   1. First appearance after 6 minutes of navigation (only once cookie banner is answered).
 *   2. If dismissed → reappears once, 5 minutes later.
 *   3. After the second dismiss → never again in this session.
 *
 * State persists in sessionStorage so navigation between pages does not reset the timer.
 */
export default function MobileTrustpilotPrompt() {
  const consent = useCookieConsent();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (consent === null) return;

    const showsCount = Number(window.sessionStorage.getItem(SHOWS_KEY) ?? "0");

    // Already shown twice - never again
    if (showsCount >= 2) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    if (showsCount === 0) {
      // First appearance: 6 min after first load (or remaining time if user navigated)
      timerRef.current = setTimeout(() => setVisible(true), FIRST_APPEAR_AFTER_MS);
      return;
    }

    // showsCount === 1 → reappear 5 min after dismiss timestamp
    const dismissedAt = Number(window.sessionStorage.getItem(DISMISSED_AT_KEY) ?? "0");
    const elapsed = Date.now() - dismissedAt;
    const remaining = REAPPEAR_AFTER_MS - elapsed;

    if (remaining <= 0) {
      setVisible(true);
    } else {
      timerRef.current = setTimeout(() => setVisible(true), remaining);
    }
  }, [consent]);

  // Mark as shown when it actually becomes visible (so refresh doesn't double-count).
  // Auto-hide apres 5s d'affichage (CEO direction).
  useEffect(() => {
    if (!visible || typeof window === "undefined") return;
    const showsCount = Number(window.sessionStorage.getItem(SHOWS_KEY) ?? "0");
    if (showsCount === 0) {
      window.sessionStorage.setItem(SHOWS_KEY, "1");
    } else if (showsCount === 1) {
      window.sessionStorage.setItem(SHOWS_KEY, "2");
      window.sessionStorage.setItem(DISMISSED_AT_KEY, String(Date.now()));
    } else {
      window.sessionStorage.setItem(DISMISSED_AT_KEY, String(Date.now()));
    }

    const hideTimer = window.setTimeout(() => {
      setVisible(false);
    }, AUTO_HIDE_AFTER_MS);
    return () => window.clearTimeout(hideTimer);
  }, [visible]);

  if (!mounted) return null;
  if (!visible) return null;
  if (consent === null) return null;

  const handleDismiss = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setVisible(false);
    if (typeof window !== "undefined") {
      const showsCount = Number(window.sessionStorage.getItem(SHOWS_KEY) ?? "1");
      if (showsCount === 1) {
        // First dismiss: schedule reappearance in 5 min
        window.sessionStorage.setItem(DISMISSED_AT_KEY, String(Date.now()));
      }
      // showsCount === 2: nothing more to do - won't reappear
    }
  };

  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+10rem)] right-4 z-[2147482998] md:hidden">
      <a
        href={TRUSTPILOT_URL}
        target="_blank"
        rel="noreferrer noopener"
        className="pointer-events-auto relative flex items-center gap-3 rounded-full border border-brand-teal/15 bg-white px-4 py-3 pr-9 text-sm font-semibold text-brand-ink shadow-[0_16px_40px_rgba(15,23,42,0.18)] transition active:scale-95"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00b67a] text-white">
          <Star size={16} fill="currentColor" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-stone/80">
            Avis SKS Talents
          </span>
          <span className="text-sm font-semibold text-brand-ink">4,5/5 sur Trustpilot</span>
        </span>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Fermer"
          className="absolute right-1.5 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-brand-teal/15 bg-white text-brand-stone/80 transition active:scale-90"
        >
          <X size={12} />
        </button>
      </a>
    </div>
  );
}
