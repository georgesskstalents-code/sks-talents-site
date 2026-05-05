"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { trackSiteTelemetry } from "@/lib/siteTelemetryClient";

export type DemoScene = {
  id: string;
  durationMs: number;
  /**
   * Render the scene body. Scenes are pure visual — no fetches, no side effects.
   */
  render: () => React.ReactNode;
};

type Props = {
  /** Section identifier — used in GA event names: demo_<sector>_play_clicked, etc. */
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
  const totalMs = totalSeconds * 1000;

  const cumulativeMs = useMemo(() => {
    let total = 0;
    return scenes.map((s) => {
      total += s.durationMs;
      return total;
    });
  }, [scenes]);

  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (tickerRef.current) {
      clearInterval(tickerRef.current);
      tickerRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clearTimers();
    setHasStarted(true);
    setCurrentIdx(0);
    setProgressMs(0);

    trackSiteTelemetry({
      type: "cta_click",
      path: typeof window !== "undefined" ? window.location.pathname : "",
      target: `demo_${sector}_play`
    });

    // Schedule scene transitions
    let elapsed = 0;
    scenes.forEach((scene, idx) => {
      if (idx === 0) return;
      elapsed += scenes[idx - 1].durationMs;
      const t = setTimeout(() => {
        setCurrentIdx(idx);
        if (idx === 1) {
          trackSiteTelemetry({
            type: "cta_click",
            path: typeof window !== "undefined" ? window.location.pathname : "",
            target: `demo_${sector}_scene_2_reached`
          });
        }
        if (idx === 2) {
          trackSiteTelemetry({
            type: "cta_click",
            path: typeof window !== "undefined" ? window.location.pathname : "",
            target: `demo_${sector}_scene_3_reached`
          });
        }
        if (idx === scenes.length - 1) {
          trackSiteTelemetry({
            type: "cta_click",
            path: typeof window !== "undefined" ? window.location.pathname : "",
            target: `demo_${sector}_completed`
          });
        }
      }, elapsed);
      timeoutsRef.current.push(t);
    });

    // Progress ticker (10 fps is enough)
    tickerRef.current = setInterval(() => {
      setProgressMs((prev) => {
        const next = prev + 100;
        return next > totalMs ? totalMs : next;
      });
    }, 100);

    // Stop ticker at the end
    const stopTimer = setTimeout(() => {
      if (tickerRef.current) {
        clearInterval(tickerRef.current);
        tickerRef.current = null;
      }
    }, totalMs);
    timeoutsRef.current.push(stopTimer);
  }, [scenes, sector, totalMs, clearTimers]);

  const restart = useCallback(() => {
    clearTimers();
    start();
  }, [clearTimers, start]);

  useEffect(() => () => clearTimers(), [clearTimers]);

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
          aria-label="Lancer la démo de 90 secondes"
        >
          <Play className="ml-1 h-6 w-6 transition group-hover:translate-x-0.5" fill="white" />
        </button>
        <p className="mt-5 t-h3 text-brand-ink">▶ Lancer la démo (90 sec)</p>
        <p className="mt-2 text-eyebrow font-semibold uppercase text-brand-teal">
          4 scènes · Avant / Après · Témoignage
        </p>
      </div>
    );
  }

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
      <div className="relative min-h-[420px] sm:min-h-[540px]">
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
      </div>

      {/* Final state */}
      {progressMs >= totalMs && (
        <div className="border-t border-brand-teal/10 bg-brand-mint/30 px-4 py-3 text-center text-caption font-semibold text-brand-teal sm:px-6">
          ✓ Démo terminée — clique sur ⟳ pour rejouer
        </div>
      )}
    </div>
  );
}
