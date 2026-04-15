"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function getSessionId() {
  const key = "sks-session-id";
  const existing = window.sessionStorage.getItem(key);
  if (existing) {
    return existing;
  }

  const created = crypto.randomUUID();
  window.sessionStorage.setItem(key, created);
  return created;
}

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const payload = {
      type: "pageview",
      path: pathname,
      title: document.title,
      sessionId: getSessionId()
    };

    void fetch("/api/site-analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(() => undefined);
  }, [pathname]);

  return null;
}

