"use client";

import { useMemo, useState } from "react";

function getBadgeLabel(name: string) {
  const words = name
    .replace(/[’']/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return "SKS";
  }

  if (words.length === 1) {
    return words[0].slice(0, 3).toUpperCase();
  }

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

type ResourceLogoProps = {
  name: string;
  logoUrl?: string;
  className?: string;
  imageClassName?: string;
  badgeClassName?: string;
};

export default function ResourceLogo({
  name,
  logoUrl,
  className = "relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[22px] border border-brand-line bg-white p-3",
  imageClassName = "max-h-full max-w-full object-contain",
  badgeClassName = "flex h-full w-full items-center justify-center rounded-[16px] bg-brand-mint px-2 text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-teal"
}: ResourceLogoProps) {
  const [broken, setBroken] = useState(false);
  const badgeLabel = useMemo(() => getBadgeLabel(name), [name]);
  const shouldShowImage = !!logoUrl && !broken;

  return (
    <div className={className}>
      {shouldShowImage ? (
        <img
          src={logoUrl}
          alt={name}
          className={imageClassName}
          onError={() => setBroken(true)}
        />
      ) : null}
      {!shouldShowImage ? <div className={badgeClassName}>{badgeLabel}</div> : null}
    </div>
  );
}
