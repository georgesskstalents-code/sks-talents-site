"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, RotateCcw } from "lucide-react";
import { trackSiteTelemetry } from "@/lib/siteTelemetryClient";

export type DemoScene = {
  id: string;
  durationMs: number;
  /**
   * Render the scene body. Scenes are pure visual - no fetches, no side effects.
   */
  render: () => React.ReactNode;
};

type Props = {
  /** Section identifier - used in GA event names: demo_<sector>_play_clicked, etc. */
  sector: "animal_health" | "life_sciences";
  scenes: DemoScene[];
  totalSeconds: number;
  /** Aria label for the scene region. */
  ariaLabel: string;
};

/**
 * Vanilla React 4-scene demo player.
 * - Auto-plays scene 1 → 2 → 3 → 4 with timers; final scene shows "✓ Démo terminée".
 * - Spacebar / click on play button starts. Restart button resets.
 * - Instagram-style nav: tap right 2/3 = next scene, tap left 1/3 = previous. ←/→ keys also work.
 * - Reduce-motion: scenes still advance, transitions removed.
 * - Analytics: emits play, scene_2_reached, scene_3_reached, completed, cta_clicked.
 *
 * Lazy-loaded by parent landing pages (pas de chargement avant interaction).
 */
export default function DemoStage({ sector, scenes, totalSeconds, ariaLabel }: Props) {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progressMs, setProgressMs] = useState(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const tickerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const totalMs = totalSeconds * 1000;

  const cumulativeMs = useMemo(() => {
    let total = 0;
    return scenes.map((s) => {
      total += s.durationMs;
      return total;
    });
  }, [scenes]);

  const path = () => (typeof window !== "undefined" ? window.location.pathname : "");

  const fireSceneTelemetry = useCallback((idx: number) => {
    if (idx === 1) {
      trackSiteTelemetry({ type: "cta_click", path: path(), target: `demo_${sector}_scene_2_reached` });
    }
    if (idx === 2) {
      trackSiteTelemetry({ type: "cta_click", path: path(), target: `demo_${sector}_scene_3_reached` });
    }
    if (idx === scenes.length - 1) {
      trackSiteTelemetry({ type: "cta_click", path: path(), target: `demo_${sector}_completed` });
    }
  }, [scenes.length, sector]);

  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (tickerRef.current) {
      clearInterval(tickerRef.current);
      tickerRef.current = null;
    }
  }, []);

  /** Schedule auto-advances + ticker starting from a given scene index (with cumulative progress already set). */
  const scheduleFromIdx = useCallback(
    (idx: number, startProgressMs: number) => {
      clearTimers();

      let elapsed = 0;
      for (let i = idx + 1; i < scenes.length; i++) {
        elapsed += scenes[i - 1].durationMs;
        const t = setTimeout(() => {
          setCurrentIdx(i);
          fireSceneTelemetry(i);
        }, elapsed);
        timeoutsRef.current.push(t);
      }

      tickerRef.current = setInterval(() => {
        setProgressMs((prev) => {
          const next = prev + 100;
          return next > totalMs ? totalMs : next;
        });
      }, 100);

      const remaining = totalMs - startProgressMs;
      const stopTimer = setTimeout(() => {
        if (tickerRef.current) {
          clearInterval(tickerRef.current);
          tickerRef.current = null;
        }
      }, remaining);
      timeoutsRef.current.push(stopTimer);
    },
    [scenes, totalMs, clearTimers, fireSceneTelemetry]
  );

  const start = useCallback(() => {
    setHasStarted(true);
    setCurrentIdx(0);
    setProgressMs(0);
    trackSiteTelemetry({ type: "cta_click", path: path(), target: `demo_${sector}_play` });
    scheduleFromIdx(0, 0);
  }, [sector, scheduleFromIdx]);

  const goToScene = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= scenes.length) return;
      const newProgress = idx === 0 ? 0 : cumulativeMs[idx - 1];
      setCurrentIdx(idx);
      setProgressMs(newProgress);
      fireSceneTelemetry(idx);
      scheduleFromIdx(idx, newProgress);
    },
    [scenes.length, cumulativeMs, fireSceneTelemetry, scheduleFromIdx]
  );

  const restart = useCallback(() => start(), [start]);
  const goNext = useCallback(() => goToScene(currentIdx + 1), [currentIdx, goToScene]);
  const goPrev = useCallback(() => goToScene(currentIdx - 1), [currentIdx, goToScene]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  // Keyboard nav while playing
  useEffect(() => {
    if (!hasStarted) return;
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [hasStarted, goNext, goPrev]);

  const formatTime = (ms: number) => {
    const total = Math.floor(ms / 1000);
    const mm = Math.floor(total / 60);
    const ss = total % 60;
    return `${mm}:${ss.toString().padStart(2, "0")}`;
  };

  if (!hasStarted) {
    return (
      <div
        role="region"
        aria-label={ariaLabel}
        className="relative flex min-h-[420px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-brand-teal/40 bg-brand-mint/30 p-8 text-center sm:min-h-[540px]"
      >
        <button
          type="button"
          onClick={start}
          className="group inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-ink text-white shadow-lg transition active:scale-95 hover:scale-105 sm:h-16 sm:w-16"
          aria-label={`Lancer la démo de ${totalSeconds} secondes`}
        >
          <Play className="ml-1 h-6 w-6 transition group-hover:translate-x-0.5" fill="white" />
        </button>
        <p className="mt-5 t-h3 text-brand-ink">▶ Lancer la démo ({totalSeconds} sec)</p>
        <p className="mt-2 text-eyebrow font-semibold uppercase text-brand-teal">
          4 scènes · Avant / Après · Témoignage
        </p>
        <p className="mt-1 text-caption text-brand-stone/80">
          Tap droite/gauche pour naviguer · ← → au clavier
        </p>
      </div>
    );
  }

  const isLast = currentIdx === scenes.length - 1;
  const isFirst = currentIdx === 0;

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      aria-live="polite"
      className="relative overflow-hidden rounded-3xl border border-brand-teal/15 bg-white shadow-soft"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-brand-teal/10 bg-white/80 px-4 py-3 backdrop-blur sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={restart}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-ink text-white transition active:scale-95"
            aria-label="Rejouer la démo"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <span className="font-mono text-caption tabular-nums text-brand-stone">
            {formatTime(progressMs)} / {formatTime(totalMs)}
          </span>
        </div>
        <span className="text-eyebrow font-semibold uppercase text-brand-teal">
          Scène {currentIdx + 1} / {scenes.length}
        </span>
      </div>

      {/* Progress bar (4 segments) */}
      <div className="grid gap-1 bg-white/80 px-4 py-2 sm:px-6" style={{ gridTemplateColumns: `repeat(${scenes.length}, 1fr)` }}>
        {scenes.map((scene, idx) => {
          const startCum = idx === 0 ? 0 : cumulativeMs[idx - 1];
          const endCum = cumulativeMs[idx];
          const within = Math.max(0, Math.min(progressMs - startCum, scene.durationMs));
          const pct = (within / scene.durationMs) * 100;
          return (
            <div key={scene.id} className="h-1 overflow-hidden rounded-full bg-brand-teal/10">
              <div
                className="h-full bg-brand-teal transition-[width]"
                style={{ width: progressMs >= endCum ? "100%" : `${pct}%`, transitionDuration: "100ms" }}
              />
            </div>
          );
        })}
      </div>

      {/* Stage */}
      <div ref={stageRef} className="relative min-h-[420px] sm:min-h-[540px]">
        {scenes.map((scene, idx) => (
          <div
            key={scene.id}
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: idx === currentIdx ? 1 : 0,
              pointerEvents: idx === currentIdx ? "auto" : "none"
            }}
            aria-hidden={idx !== currentIdx}
          >
            {scene.render()}
          </div>
        ))}

        {/* Instagram-style tap zones - overlay on top of scenes */}
        <button
          type="button"
          onClick={goPrev}
          disabled={isFirst}
          aria-label="Scène précédente"
          className="group absolute inset-y-0 left-0 z-10 flex w-1/3 cursor-pointer items-center justify-start pl-2 transition disabled:cursor-default disabled:opacity-0 sm:pl-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-brand-ink/60 shadow-sm backdrop-blur-sm transition group-hover:bg-white group-hover:text-brand-ink group-focus-visible:bg-white group-focus-visible:text-brand-ink sm:h-12 sm:w-12">
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </span>
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={isLast}
          aria-label="Scène suivante"
          className="group absolute inset-y-0 right-0 z-10 flex w-2/3 cursor-pointer items-center justify-end pr-2 transition disabled:cursor-default disabled:opacity-0 sm:pr-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-brand-ink/60 shadow-sm backdrop-blur-sm transition group-hover:bg-white group-hover:text-brand-ink group-focus-visible:bg-white group-focus-visible:text-brand-ink sm:h-12 sm:w-12">
            <ChevronRight className="h-5 w-5" aria-hidden />
          </span>
        </button>
      </div>

      {/* Final state */}
      {progressMs >= totalMs && (
        <div className="border-t border-brand-teal/10 bg-brand-mint/30 px-4 py-3 text-center text-caption font-semibold text-brand-teal sm:px-6">
          ✓ Démo terminée - clique sur ⟳ pour rejouer
        </div>
      )}
    </div>
  );
}
