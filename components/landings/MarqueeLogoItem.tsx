"use client";

import { useEffect, useState } from "react";

type Props = {
  name: string;
  domain?: string;
};

/**
 * Rendu d'un item de marquee "Ils nous ont fait confiance".
 *
 * Strategie 2026-07: Clearbit Logo API a ete arretee (acquisition HubSpot).
 * On preload maintenant l'image via new Image() et on ne rend le <img>
 * QUE si l'image a vraiment charge avec des dimensions suffisantes (>= 32px).
 * Sinon on retombe sur le texte du nom. Zero broken image icon garanti.
 *
 * Ordre de tentative :
 *   1. Google favicon HD (sz=128) - toujours en CSP, universel
 *   2. Icon Horse (icon.horse) - meilleure qualite si CSP le permet
 *
 * Ajouter les CDN dans next.config.mjs img-src si on veut d'autres services.
 */
export default function MarqueeLogoItem({ name, domain }: Props) {
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!domain) {
      setChecked(true);
      return;
    }

    const candidates = [
      `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`
    ];

    let cancelled = false;

    (async () => {
      for (const url of candidates) {
        const ok = await new Promise<boolean>((resolve) => {
          const img = new Image();
          img.onload = () => {
            // Reject Google's default globe icon (~16px) and tiny placeholders
            if (img.naturalWidth >= 32 && img.naturalHeight >= 32) resolve(true);
            else resolve(false);
          };
          img.onerror = () => resolve(false);
          img.src = url;
        });
        if (cancelled) return;
        if (ok) {
          setResolvedSrc(url);
          setChecked(true);
          return;
        }
      }
      if (!cancelled) setChecked(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [domain]);

  if (!checked || !resolvedSrc) {
    return <span className="c-marquee-item">{name}</span>;
  }

  return (
    <span className="c-marquee-item c-marquee-item-logo">
      <img
        src={resolvedSrc}
        alt=""
        aria-hidden="true"
        className="c-marquee-logo-img"
      />
      <span className="sr-only">{name}</span>
    </span>
  );
}
