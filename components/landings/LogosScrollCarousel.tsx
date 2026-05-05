"use client";

import Image from "next/image";

type Props = {
  logos: { name: string; src: string }[];
  ariaLabel?: string;
};

/**
 * Auto-scrolling logo marquee. Pure CSS animation (60fps).
 * Logos duplicated 2x in DOM for a seamless loop.
 * Accessible: marked aria-hidden because logos are decorative
 * (real list of clients is in references page).
 */
export default function LogosScrollCarousel({ logos, ariaLabel }: Props) {
  const items = [...logos, ...logos];
  return (
    <div
      className="relative overflow-hidden"
      aria-label={ariaLabel ?? "Logos partenaires"}
      role="region"
      style={{
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        maskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)"
      }}
    >
      <ul
        className="flex w-max gap-12 py-2"
        style={{ animation: "logos-scroll 30s linear infinite" }}
        aria-hidden="true"
      >
        {items.map((logo, i) => (
          <li key={`${logo.src}-${i}`} className="flex h-16 w-32 shrink-0 items-center justify-center">
            <Image
              src={logo.src}
              alt={logo.name}
              width={120}
              height={56}
              className="max-h-12 w-auto object-contain opacity-70 transition-opacity hover:opacity-100"
              loading="lazy"
              unoptimized
            />
          </li>
        ))}
      </ul>
      <style>{`
        @keyframes logos-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="logos-scroll"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
