"use client";

import { useEffect, useState } from "react";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";

const STORAGE_KEY = "sks-cookie-preferences-launcher-v1";
const RELAUNCH_WINDOWS_MS: Array<[number, number]> = [
  [0, 2 * 60 * 1000],
  [5 * 60 * 1000, 7 * 60 * 1000],
  [10 * 60 * 1000, 12 * 60 * 1000],
  [15 * 60 * 1000, 17 * 60 * 1000],
  [20 * 60 * 1000, 22 * 60 * 1000]
];

function getStartedAt() {
  if (typeof window === "undefined") {
    return 0;
  }

  const existing = window.sessionStorage.getItem(STORAGE_KEY);
  if (existing) {
    return Number(existing);
  }

  const created = Date.now();
  window.sessionStorage.setItem(STORAGE_KEY, String(created));
  return created;
}

export default function CookiePreferencesLauncher() {
  const [mounted, setMounted] = useState(false);
  const [showLauncher, setShowLauncher] = useState(false);

  useEffect(() => {
    setMounted(true);

    const startedAt = getStartedAt();
    const updateVisibility = () => {
      const elapsed = Date.now() - startedAt;
      const visible = RELAUNCH_WINDOWS_MS.some(([start, end]) => elapsed >= start && elapsed < end);
      setShowLauncher(visible);
    };

    updateVisibility();
    const interval = window.setInterval(updateVisibility, 15000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  if (!mounted || !showLauncher) {
    return null;
  }

  return (
    <div className="fixed bottom-[5.5rem] left-5 z-[66] hidden md:block">
      <CookiePreferencesButton className="rounded-full border border-brand-teal/20 bg-white/95 px-5 py-3 text-sm font-semibold text-brand-stone shadow-xl backdrop-blur transition hover:-translate-y-0.5 hover:bg-brand-mint/45" />
    </div>
  );
}
