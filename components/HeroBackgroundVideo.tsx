"use client";

import { useEffect, useState } from "react";

type Props = {
  vimeoId: string;
};

/**
 * Hero background Vimeo iframe — mounted AFTER first paint to keep LCP fast.
 * Uses requestIdleCallback when available, falling back to setTimeout(800ms).
 * Skipped entirely when the user prefers reduced motion.
 */
export default function HeroBackgroundVideo({ vimeoId }: Props) {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Skip background video on mobile/small screens — saves ~2-5 MB and several
    // 100 ms on first interaction. Static gradient remains as the visual treatment.
    if (window.matchMedia("(max-width: 768px)").matches) return;
    // Also skip if Save-Data header is set (slow connections)
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /(2g|slow-2g)/.test(conn.effectiveType)) return;

    const mount = () => setShouldMount(true);

    const ric = (window as Window & {
      requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number;
    }).requestIdleCallback;

    if (ric) {
      const id = ric(mount, { timeout: 1500 });
      return () => {
        const cic = (window as Window & {
          cancelIdleCallback?: (handle: number) => void;
        }).cancelIdleCallback;
        if (cic) cic(id);
      };
    }

    const timeout = window.setTimeout(mount, 800);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!shouldMount) return null;

  const src = `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1&controls=0&playsinline=1`;

  return (
    <iframe
      src={src}
      title="SKS Talents — vidéo de présentation en arrière-plan"
      aria-hidden="true"
      tabIndex={-1}
      loading="lazy"
      allow="autoplay; fullscreen; picture-in-picture"
      className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-30"
      frameBorder={0}
    />
  );
}
