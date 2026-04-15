"use client";

import { usePathname } from "next/navigation";
import CalendlyButton from "@/components/CalendlyButton";

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
  const isVisible = visiblePrefixes.some((prefix) =>
    prefix === "/" ? pathname === "/" : pathname.startsWith(prefix)
  );

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-teal/10 bg-white/96 px-4 py-3 shadow-[0_-12px_30px_rgba(22,51,52,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3">
        <CalendlyButton label="Être rappelé" href="/contact#rappel" tone="outline" />
        <CalendlyButton label="Réserver un call" tone="solid" />
      </div>
    </div>
  );
}
