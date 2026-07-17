"use client";

import { useState } from "react";

type Props = {
  name: string;
  domain?: string;
};

/**
 * Rendu d'un item de marquee "Ils nous ont fait confiance".
 * - Si domain fourni : tente <img> Clearbit (logo.clearbit.com/{domain}).
 *   Fallback automatique vers le nom en texte si l'image echoue (404, blocked, etc.).
 * - Si pas de domain : texte seul.
 * CSP autorise deja https://logo.clearbit.com dans img-src (next.config.mjs).
 */
export default function MarqueeLogoItem({ name, domain }: Props) {
  const [broken, setBroken] = useState(false);

  if (!domain || broken) {
    return <span className="c-marquee-item">{name}</span>;
  }

  return (
    <span className="c-marquee-item c-marquee-item-logo">
      <img
        src={`https://logo.clearbit.com/${domain}`}
        alt={`Logo ${name}`}
        loading="lazy"
        onError={() => setBroken(true)}
        className="c-marquee-logo-img"
      />
      <span className="sr-only">{name}</span>
    </span>
  );
}
