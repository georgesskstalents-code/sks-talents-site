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
  const envCalendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const calendlyUrl =
    envCalendlyUrl && envCalendlyUrl.length > 0
      ? envCalendlyUrl
      : "https://calendly.com/g-kengue/talentconsulting";
  const targetHref = href && href.length > 0 ? href : calendlyUrl;
  const isExternal = /^(https?:\/\/|mailto:|tel:)/.test(targetHref);

  const toneClassName =
    tone === "solid"
      ? "bg-brand-teal text-white hover:-translate-y-0.5 hover:opacity-90"
      : tone === "outline"
        ? "border border-brand-teal/30 text-brand-teal hover:-translate-y-0.5 hover:bg-brand-mint"
        : "bg-white text-brand-stone hover:-translate-y-0.5 hover:bg-brand-mint";

  const className = `inline-flex min-w-0 w-full items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded-full px-3 py-3.5 text-center text-[12px] font-semibold leading-none transition duration-300 sm:px-6 sm:py-4 sm:text-sm ${toneClassName}`;

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
