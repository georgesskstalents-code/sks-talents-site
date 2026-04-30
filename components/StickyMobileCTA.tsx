"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCookieConsent } from "@/lib/useCookieConsent";

const visiblePrefixes = [
  "/",
  "/services/website",
  "/ecosystem",
  "/studies",
  "/contact",
  "/references",
  "/investment-funds"
];

export default function StickyMobileCTA() {
  const pathname = usePathname() ?? "";
  const consent = useCookieConsent();
  const isVisible = visiblePrefixes.some((prefix) =>
    prefix === "/" ? pathname === "/" : pathname.startsWith(prefix)
  );

  if (!isVisible) {
    return null;
  }

  // Hide while cookie banner is still asking — avoids overlap on mobile
  if (consent === null) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 px-4 pt-3 md:hidden"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
    >
      {/* Floating segmented pill (per CEO mockup) — no full-width bar, lighter visual */}
      <div className="mx-auto inline-flex w-full max-w-md overflow-hidden rounded-full border border-brand-ink/10 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
        <a
          href="https://calendly.com/g-kengue/talentconsulting"
          target="_blank"
          rel="noreferrer noopener"
          className="flex flex-1 items-center justify-center px-4 py-3 text-sm font-semibold text-brand-ink transition active:bg-brand-mint/45"
        >
          Réserver un call
        </a>
        <Link
          href="/contact#rappel"
          className="flex flex-1 items-center justify-center bg-brand-ink px-4 py-3 text-sm font-semibold text-white transition active:opacity-80"
        >
          Être rappelé
        </Link>
      </div>
    </div>
  );
}
