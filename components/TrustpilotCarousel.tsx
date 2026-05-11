"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { realTestimonials } from "@/data/testimonials";

const CARD_WIDTH = 440; // 420px card + 20px gap

export default function TrustpilotCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = window.setInterval(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "auto" });
      } else {
        el.scrollBy({ left: 1, behavior: "auto" });
      }
    }, 25);
    return () => window.clearInterval(id);
  }, [paused]);

  const scrollByCard = (dir: -1 | 1) => {
    scrollerRef.current?.scrollBy({ left: dir * CARD_WIDTH, behavior: "smooth" });
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        aria-label="Avis précédent"
        className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-brand-teal/20 bg-white p-2 text-brand-teal shadow-soft transition hover:bg-brand-mint sm:inline-flex"
      >
        <ChevronLeft size={20} />
      </button>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-2 py-4 sm:px-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {realTestimonials.map((t, i) => (
          <article
            key={i}
            className="flex w-[320px] shrink-0 snap-start flex-col gap-3 rounded-2xl border border-brand-teal/12 bg-white p-5 shadow-soft sm:w-[420px] sm:p-6"
          >
            <div className="flex items-center gap-1 text-brand-teal">
              {Array.from({ length: t.rating ?? 5 }).map((_, j) => (
                <Star key={j} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="text-[14px] leading-6 text-brand-ink sm:text-[15px] sm:leading-7">{t.quote}</p>
            <div className="mt-auto flex items-center gap-3 pt-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-mint text-sm font-semibold text-brand-teal">
                {t.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold text-brand-ink">{t.name}</div>
                {t.role ? (
                  <div className="truncate text-[11px] text-brand-stone">{t.role}</div>
                ) : null}
              </div>
              <div className="shrink-0 text-[11px] text-brand-stone">{t.date}</div>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollByCard(1)}
        aria-label="Avis suivant"
        className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-brand-teal/20 bg-white p-2 text-brand-teal shadow-soft transition hover:bg-brand-mint sm:inline-flex"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
