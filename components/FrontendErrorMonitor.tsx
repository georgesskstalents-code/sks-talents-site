"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackSiteTelemetry } from "@/lib/siteTelemetryClient";

function normalizeReason(reason: unknown) {
  if (typeof reason === "string") {
    return reason;
  }

  if (reason instanceof Error) {
    return reason.message;
  }

  return "Unhandled client error";
}

export default function FrontendErrorMonitor() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const onError = (event: ErrorEvent) => {
      trackSiteTelemetry({
        type: "frontend_error",
        path: pathname,
        target: event.filename || "window.error",
        message: normalizeReason(event.error ?? event.message)
      });
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackSiteTelemetry({
        type: "frontend_error",
        path: pathname,
        target: "unhandledrejection",
        message: normalizeReason(event.reason)
      });
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, [pathname]);

  return null;
}
