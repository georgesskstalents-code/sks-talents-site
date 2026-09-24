"use client";

import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackSiteTelemetry } from "@/lib/siteTelemetryClient";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  ctaTarget: string;
  ctaMessage?: string;
  children: ReactNode;
};

/**
 * Drop-in replacement for a raw external <a> that also fires a cta_click
 * telemetry event (with the page it was clicked from) before navigating.
 * Safe to render from server components since it's a small client leaf.
 */
export default function TrackedExternalLink({
  ctaTarget,
  ctaMessage,
  onClick,
  children,
  ...anchorProps
}: Props) {
  const pathname = usePathname() ?? "";

  return (
    <a
      {...anchorProps}
      onClick={(event) => {
        trackSiteTelemetry({
          type: "cta_click",
          path: pathname,
          target: ctaTarget,
          message: ctaMessage
        });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
