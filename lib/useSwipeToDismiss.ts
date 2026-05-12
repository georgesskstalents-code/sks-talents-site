"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MIN_HORIZONTAL_PX = 60;
const MAX_VERTICAL_PX = 40; // pour eviter les scroll verticaux qui declenchent un dismiss

/**
 * Hook reutilisable : permet de swipe horizontalement un element (mobile)
 * pour le faire disparaitre, puis le re-afficher apres reshowAfterMs.
 *
 * Utilise sessionStorage pour persister entre les pages (navigation interne)
 * tout en repoussant le bouton de 3 min meme si l'user navigue.
 */
export function useSwipeToDismiss(opts: {
  storageKey: string;
  reshowAfterMs: number;
  autoDismissAfterMs?: number;
  autoDismissMobileOnly?: boolean;
}) {
  const { storageKey, reshowAfterMs, autoDismissAfterMs, autoDismissMobileOnly } = opts;
  const [visible, setVisible] = useState(true);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const timerRef = useRef<number | null>(null);

  // Verifie au mount si on est dans la fenetre "dismissed" depuis sessionStorage.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.sessionStorage.getItem(storageKey);
    const dismissedAt = raw ? Number(raw) : 0;
    if (!dismissedAt || Number.isNaN(dismissedAt)) {
      return;
    }
    const elapsed = Date.now() - dismissedAt;
    if (elapsed >= reshowAfterMs) {
      // Deja expire : on re-affiche et on nettoie le flag.
      window.sessionStorage.removeItem(storageKey);
      return;
    }
    setVisible(false);
    const remaining = reshowAfterMs - elapsed;
    timerRef.current = window.setTimeout(() => {
      setVisible(true);
      window.sessionStorage.removeItem(storageKey);
    }, remaining);

    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [storageKey, reshowAfterMs]);

  // Auto-dismiss apres autoDismissAfterMs si non interactif. Optionnellement mobile-only.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!autoDismissAfterMs || !visible) return;
    if (autoDismissMobileOnly && window.matchMedia("(min-width: 1024px)").matches) return;

    const autoTimer = window.setTimeout(() => {
      setVisible(false);
      window.sessionStorage.setItem(storageKey, String(Date.now()));
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setVisible(true);
        window.sessionStorage.removeItem(storageKey);
      }, reshowAfterMs);
    }, autoDismissAfterMs);

    return () => window.clearTimeout(autoTimer);
  }, [autoDismissAfterMs, autoDismissMobileOnly, storageKey, reshowAfterMs, visible]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    if (!t) return;
    startRef.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!startRef.current) return;
      const t = e.changedTouches[0];
      if (!t) {
        startRef.current = null;
        return;
      }
      const dx = t.clientX - startRef.current.x;
      const dy = Math.abs(t.clientY - startRef.current.y);
      startRef.current = null;

      // Swipe horizontal franc (dans n'importe quelle direction) + pas trop vertical = dismiss
      if (Math.abs(dx) >= MIN_HORIZONTAL_PX && dy <= MAX_VERTICAL_PX) {
        setVisible(false);
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem(storageKey, String(Date.now()));
        }
        if (timerRef.current !== null) window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
          setVisible(true);
          if (typeof window !== "undefined") {
            window.sessionStorage.removeItem(storageKey);
          }
        }, reshowAfterMs);
      }
    },
    [storageKey, reshowAfterMs]
  );

  return {
    visible,
    swipeHandlers: { onTouchStart, onTouchEnd }
  };
}
