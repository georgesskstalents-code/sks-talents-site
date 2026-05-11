"use client";

import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/g-kengue/talentconsulting";

/**
 * Sticky bottom-right CTA visible sur 100% des pages publiques.
 * - Apparait apres 400px de scroll (evite chevauchement avec le Hero).
 * - Masque sur /dashboard, /legal/*, et toute page editoriale qui le souhaite via data-no-fab.
 * - Position: bottom-left desktop, bottom-center mobile (au-dessus du Chatwoot bottom-right).
 */
export default function CalendlyStickyFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    if (path.startsWith("/dashboard") || path.startsWith("/legal")) {
      return null;
    }
  }

  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Réserver un appel de 15 minutes avec Georges Kengue"
      className={`fixed left-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full bg-brand-ink px-4 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:opacity-90 sm:left-6 sm:bottom-6 sm:px-5 sm:py-3.5 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <CalendarClock size={16} aria-hidden />
      <span>Réserver 15 min</span>
    </a>
  );
}
