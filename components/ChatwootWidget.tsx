"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useCookieConsent } from "@/lib/useCookieConsent";
import { useSwipeToDismiss } from "@/lib/useSwipeToDismiss";

const COPY = {
  fr: {
    eyebrow: "Assistant SKS",
    hintBody: "Une question rapide sur un service, un métier ou une ressource ?",
    cta: "Ouvrir le chat",
    aria: "Ouvrir le chat SKS"
  },
  en: {
    eyebrow: "SKS Assistant",
    hintBody: "Quick question about a service, role or resource?",
    cta: "Open chat",
    aria: "Open SKS chat"
  }
} as const;

type Lang = keyof typeof COPY;

export default function ChatwootWidget() {
  const [hintVisible, setHintVisible] = useState(false);
  const [lang, setLang] = useState<Lang>("fr");
  const consent = useCookieConsent();
  const { visible: launcherVisible, swipeHandlers } = useSwipeToDismiss({
    storageKey: "sks-chat-launcher-dismissed-at",
    reshowAfterMs: 180000,
    autoDismissAfterMs: 8000,
    autoDismissMobileOnly: true
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const readLang = (): Lang => {
      const stored = window.localStorage.getItem("sks-site-language");
      return stored === "en" ? "en" : "fr";
    };

    setLang(readLang());

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "sks-site-language") {
        setLang(readLang());
      }
    };

    const interval = window.setInterval(() => {
      const next = readLang();
      setLang((current) => (current === next ? current : next));
    }, 1000);

    window.addEventListener("storage", handleStorage);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Choreographie hint chat: attend que le cookie banner soit ferme (consent !== null),
  // puis 1ere apparition apres 600ms, retract apres 5s. Une seule fois par session.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (consent === null) return;

    const dismissed = window.sessionStorage.getItem("sks-chat-hint-dismissed");
    if (dismissed) return;

    let sessionStart = Number(window.sessionStorage.getItem("sks-session-start"));
    if (!sessionStart || Number.isNaN(sessionStart)) {
      sessionStart = Date.now();
      window.sessionStorage.setItem("sks-session-start", String(sessionStart));
    }
    const elapsed = Date.now() - sessionStart;
    const done1 = window.sessionStorage.getItem("sks-chat-hint-1-done");
    const done2 = window.sessionStorage.getItem("sks-chat-hint-2-done");
    const timers: number[] = [];

    if (!done1) {
      timers.push(
        window.setTimeout(() => {
          setHintVisible(true);
          window.sessionStorage.setItem("sks-chat-hint-1-done", "1");
          timers.push(window.setTimeout(() => setHintVisible(false), 5000));
        }, 600)
      );
    }

    if (!done2) {
      const delay = Math.max(0, 180000 - elapsed);
      timers.push(
        window.setTimeout(() => {
          setHintVisible(true);
          window.sessionStorage.setItem("sks-chat-hint-2-done", "1");
          timers.push(window.setTimeout(() => setHintVisible(false), 5000));
        }, delay)
      );
    }

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [consent]);

  const t = COPY[lang];

  // Hide the floating button while the cookie banner is still asking for consent
  // (otherwise it overlaps the banner buttons on mobile). Reappears once a choice is made.
  if (consent === null) return null;

  const dismissHint = () => {
    setHintVisible(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("sks-chat-hint-dismissed", "1");
    }
  };

  const openLocalChat = () => {
    if (typeof window === "undefined") {
      return;
    }
    window.dispatchEvent(new CustomEvent("open-sks-local-chat"));
  };

  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+5.5rem)] right-4 z-[2147482999] md:bottom-5 md:right-5">
      {hintVisible ? (
        <button
          type="button"
          onClick={() => {
            dismissHint();
            openLocalChat();
          }}
          className="mb-3 ml-auto block max-w-[16rem] rounded-[20px] border border-brand-teal/15 bg-white/96 px-4 py-3 text-left shadow-[0_16px_40px_rgba(15,23,42,0.14)] backdrop-blur"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-teal">
            {t.eyebrow}
          </p>
          <p className="mt-1 text-sm leading-6 text-brand-ink">{t.hintBody}</p>
        </button>
      ) : null}

      {launcherVisible ? (
      <button
        type="button"
        onClick={() => {
          dismissHint();
          openLocalChat();
        }}
        onTouchStart={swipeHandlers.onTouchStart}
        onTouchEnd={swipeHandlers.onTouchEnd}
        className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-brand-teal/12 bg-brand-ink px-4 py-3 text-white shadow-[0_16px_40px_rgba(15,23,42,0.2)] transition duration-300 hover:-translate-y-0.5 hover:opacity-95"
        aria-label={t.aria}
      >
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
          <MessageCircle size={18} />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-brand-mint" />
        </span>
        <span className="text-left">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">
            {t.eyebrow}
          </span>
          <span className="block text-sm font-semibold">{t.cta}</span>
        </span>
      </button>
      ) : null}
    </div>
  );
}
