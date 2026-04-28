"use client";

import { Play, Volume2, X } from "lucide-react";
import { useEffect, useState } from "react";

type HeroVideoCardProps = {
  vimeoId: string;
  compact?: boolean;
};

export default function HeroVideoCard({ vimeoId, compact = false }: HeroVideoCardProps) {
  const [open, setOpen] = useState(false);
  const [inlinePlayerVisible, setInlinePlayerVisible] = useState(false);
  const previewSrc = `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1`;
  const modalSrc = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=0&muted=0&title=0&byline=0&portrait=0`;
  const inlinePlayerSrc = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=0&muted=0&title=0&byline=0&portrait=0`;

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const previous = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <>
      <div className="relative aspect-[16/11] overflow-hidden rounded-[32px] border border-white/10 bg-[#0f2526] shadow-[0_24px_60px_rgba(8,22,22,0.32)]">
        {compact ? (
          <>
            {inlinePlayerVisible ? (
              <iframe
                title="Vidéo SKS TALENTS embarquée"
                src={inlinePlayerSrc}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
              />
            ) : (
              <>
                <iframe
                  title="Aperçu vidéo SKS TALENTS"
                  src={previewSrc}
                  className="h-full w-full scale-[1.05]"
                  allow="autoplay; fullscreen; picture-in-picture"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(132,255,239,0.14),transparent_24%),linear-gradient(160deg,rgba(17,39,41,0.72)_0%,rgba(23,54,55,0.54)_54%,rgba(16,33,35,0.72)_100%)]" />
                <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2526]/86 via-[#0f2526]/30 to-transparent" />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 pb-24">
                  <div className="rounded-[36px] bg-white/96 px-10 py-8 shadow-[0_26px_70px_rgba(7,18,21,0.28)]">
                    <img
                      src="/brand/logo-sks-talents-signature.svg"
                      alt="SKS TALENTS"
                      className="h-16 w-auto object-contain sm:h-20"
                    />
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <iframe
              title="Présentation vidéo SKS TALENTS"
              src={previewSrc}
              className="h-full w-full scale-[1.04]"
              allow="autoplay; fullscreen; picture-in-picture"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f2526]/88 via-[#0f2526]/10 to-transparent" />
          </>
        )}

        {!(compact && inlinePlayerVisible) ? (
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <div className="rounded-[28px] border border-white/12 bg-white/10 p-4 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">
                    {compact ? "Présentation vidéo" : "Aperçu vidéo"}
                  </p>
                  <h3 className="font-display text-2xl text-white sm:text-3xl">
                    {compact
                      ? "Lancer la présentation vidéo."
                      : "Voir la vidéo et écouter la présentation."}
                  </h3>
                  <p className="max-w-xl text-sm leading-7 text-white/72">
                    {compact
                      ? "Lecture embarquée avec le son et les contrôles, directement sur la page."
                      : "La vidéo s’ouvre maintenant directement dans le site, avec le son et les contrôles."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (compact) {
                      setInlinePlayerVisible(true);
                      return;
                    }
                    setOpen(true);
                  }}
                  aria-haspopup="dialog"
                  className="inline-flex items-center gap-3 rounded-full bg-brand-teal px-5 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:opacity-95"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                    <Play className="h-4 w-4 fill-current" />
                  </span>
                  <span className="flex items-center gap-2">
                    Lancer la vidéo
                    <Volume2 className="h-4 w-4" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {open ? (
        <div className="fixed inset-0 z-[2147482998] flex items-center justify-center bg-[#091416]/88 px-4 py-6 backdrop-blur-md">
          <button
            type="button"
            aria-label="Fermer la vidéo"
            onClick={() => setOpen(false)}
            className="absolute inset-0"
          />
          <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[30px] border border-white/12 bg-[#071215] shadow-[0_28px_90px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-white">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-200">
                  SKS TALENTS
                </p>
                <p className="mt-1 text-sm text-white/72">Présentation vidéo embarquée</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white transition hover:bg-white/10"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                title="Vidéo complète SKS TALENTS"
                src={modalSrc}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
