"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "sks-content-resources-prompt";

type PromptState = {
  dismissed: boolean;
  engaged: boolean;
};

function readPromptState(): PromptState {
  if (typeof window === "undefined") {
    return { dismissed: false, engaged: false };
  }

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { dismissed: false, engaged: false };
    }

    const parsed = JSON.parse(raw) as Partial<PromptState>;
    return {
      dismissed: Boolean(parsed.dismissed),
      engaged: Boolean(parsed.engaged)
    };
  } catch {
    return { dismissed: false, engaged: false };
  }
}

function writePromptState(nextState: PromptState) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

export default function ContentResourcesPrompt() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<PromptState>({ dismissed: false, engaged: false });

  useEffect(() => {
    setMounted(true);
    setState(readPromptState());
  }, []);

  useEffect(() => {
    if (!mounted || pathname === "/resources" || state.dismissed || state.engaged) {
      return;
    }

    const timer = window.setTimeout(() => {
      const latest = readPromptState();
      if (!latest.dismissed && !latest.engaged) {
        setOpen(true);
      }
    }, 120000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [mounted, pathname, state]);

  if (!mounted || pathname === "/resources" || state.dismissed || state.engaged || !open) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-5 z-[68] flex justify-center px-4">
      <div className="w-full max-w-xl rounded-[30px] border border-brand-teal/15 bg-white/96 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.18)] backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
          Ressources utiles
        </p>
        <h3 className="mt-3 font-display text-3xl leading-tight text-brand-ink">
          Souhaitez-vous continuer avec nos ressources clés du marché ?
        </h3>
        <p className="mt-3 text-sm leading-7 text-brand-stone">
          Nous avons réuni dans l’espace ressources un socle utile pour rester exposé en continu
          aux signaux qui comptent : écoles, événements, fonds, réseaux, partenaires et contenus
          sectoriels.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/resources"
            onClick={() => {
              const nextState = { dismissed: false, engaged: true };
              writePromptState(nextState);
              setState(nextState);
              setOpen(false);
            }}
            className="inline-flex items-center justify-center rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-95"
          >
            Accéder aux ressources
          </Link>
          <button
            type="button"
            onClick={() => {
              const nextState = { dismissed: true, engaged: false };
              writePromptState(nextState);
              setState(nextState);
              setOpen(false);
            }}
            className="inline-flex items-center justify-center rounded-full border border-brand-teal/15 px-5 py-3 text-sm font-semibold text-brand-stone transition hover:bg-brand-mint/45"
          >
            Plus tard
          </button>
        </div>
      </div>
    </div>
  );
}
