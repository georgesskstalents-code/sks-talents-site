"use client";

import Link from "next/link";

type Props = {
  label: string;
  href?: string;
  tone?: "solid" | "outline" | "ghost";
};

export default function CalendlyButton({
  label,
  href,
  tone = "solid"
}: Props) {
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/g-kengue/talentconsulting";
  const targetHref = href ?? calendlyUrl;
  const isExternal = /^(https?:\/\/|mailto:|tel:)/.test(targetHref);

  const toneClassName =
    tone === "solid"
      ? "bg-brand-teal text-white hover:-translate-y-0.5 hover:opacity-90"
      : tone === "outline"
        ? "border border-brand-teal/30 text-brand-teal hover:-translate-y-0.5 hover:bg-brand-mint"
        : "bg-white text-brand-stone hover:-translate-y-0.5 hover:bg-brand-mint";

  const className = `inline-flex items-center justify-center rounded-full px-6 py-4 text-sm font-semibold transition duration-300 ${toneClassName}`;

  if (isExternal) {
    return (
      <a href={targetHref} target="_blank" rel="noreferrer noopener" className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={targetHref} className={className}>
      {label}
    </Link>
  );
}
