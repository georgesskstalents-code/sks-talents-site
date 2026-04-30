"use client";

import { Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCookieConsent } from "@/lib/useCookieConsent";

const DISMISS_KEY = "sks-trustpilot-prompt-dismissed";
const APPEAR_AFTER_MS = 90_000; // 1 min 30
const TRUSTPILOT_URL = "https://fr.trustpilot.com/review/skstalents.fr";

/**
 * Mobile-only floating button that surfaces the Trustpilot reviews link
 * after 90 seconds of navigation, *only* once the cookie banner has been
 * answered. Dismissible — remembered for the session.
 *
 * Hidden on tablets/desktops (md:hidden) to keep the desktop layout untouched.
 */
export default function MobileTrustpilotPrompt() {
  const consent = useCookieConsent();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (consent === null) return; // wait until cookie banner answered

    if (window.sessionStorage.getItem(DISMISS_KEY)) return;

    const timer = window.setTimeout(() => setVisible(true), APPEAR_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [consent]);

  if (!mounted) return null;
  if (!visible) return null;
  if (consent === null) return null;

  const handleDismiss = (event: React.MouseEvent) => {
    event.stopPropagation();
    setVisible(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    }
  };

  return (
    <div className="fixed bottom-24 right-4 z-[2147482998] md:hidden">
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
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-stone/70">
            Avis SKS Talents
          </span>
          <span className="text-sm font-semibold text-brand-ink">4,5/5 sur Trustpilot</span>
        </span>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Fermer"
          className="absolute right-1.5 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-brand-teal/15 bg-white text-brand-stone/70 transition active:scale-90"
        >
          <X size={12} />
        </button>
      </a>
    </div>
  );
}
