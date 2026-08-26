"use client";

import { useEffect, useState, lazy, Suspense } from "react";

type Props = {
  ficheSlug: string;
  ficheTitle?: string;
};

const Widget = lazy(() => import("./ChloeLiveWidget"));

const COLORS = {
  teal: "#4A9B9B",
  ink: "#163334",
  cream: "#EFEDE4"
};

/**
 * Bulle bas-droite qui s'affiche apres 15 secondes sur la page.
 * Feature flag NEXT_PUBLIC_CHLOE_LIVE_ENABLED = "true" pour activer en prod.
 * SSR-safe : rien ne se rend cote serveur, tout part sur mount.
 */
export default function ChloeLiveBubble({ ficheSlug, ficheTitle }: Props) {
  const [visible, setVisible] = useState(false);
  const [opened, setOpened] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_CHLOE_LIVE_ENABLED !== "true") return;

    let dismissedFromStorage = false;
    try {
      dismissedFromStorage = window.sessionStorage.getItem("chloeDismissed") === "1";
    } catch {
      dismissedFromStorage = false;
    }
    if (dismissedFromStorage) {
      setDismissed(true);
      return;
    }

    const timer = window.setTimeout(() => setVisible(true), 15000);
    return () => window.clearTimeout(timer);
  }, []);

  function handleClose() {
    setOpened(false);
    setDismissed(true);
    try {
      window.sessionStorage.setItem("chloeDismissed", "1");
    } catch {
      /* no-op */
    }
  }

  if (dismissed) return null;
  if (process.env.NEXT_PUBLIC_CHLOE_LIVE_ENABLED !== "true") return null;
  if (!visible) return null;

  if (opened) {
    return (
      <Suspense fallback={null}>
        <Widget ficheSlug={ficheSlug} ficheTitle={ficheTitle} onClose={handleClose} />
      </Suspense>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setOpened(true)}
      aria-label="Ouvrir Chloe Live, assistante SKS Talents"
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: COLORS.ink,
        color: "#fff",
        border: `1px solid ${COLORS.teal}`,
        borderRadius: 999,
        padding: "10px 16px 10px 10px",
        boxShadow: "0 12px 30px rgba(25, 72, 74, 0.28)",
        cursor: "pointer",
        fontFamily: "var(--font-sans), Inter, system-ui, sans-serif",
        fontSize: 14,
        maxWidth: "calc(100vw - 32px)"
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: COLORS.cream,
          color: COLORS.ink,
          display: "grid",
          placeItems: "center",
          fontFamily: "var(--font-display), Playfair Display, serif",
          fontWeight: 600,
          fontSize: 14
        }}
      >
        C
      </span>
      <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.1 }}>
        <strong style={{ fontWeight: 600 }}>Chloe Live</strong>
        <span style={{ fontSize: 11, opacity: 0.85 }}>Une question sur ce metier ?</span>
      </span>
    </button>
  );
}
