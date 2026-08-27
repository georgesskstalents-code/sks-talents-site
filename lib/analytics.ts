/**
 * Plausible Analytics helper (RGPD-friendly, cookieless).
 *
 * Fires custom events via `window.plausible(name, { props })`.
 * The Plausible script is loaded once in app/layout.tsx and defines
 * `window.plausible` at runtime. When it is not yet available (SSR,
 * pre-hydration or blocked by the visitor), the call is queued via
 * `window.plausible.q` following the official pattern.
 *
 * All event names are declared here so we track exactly what is emitted
 * across the codebase (no free-form strings sprinkled in components).
 */

export type AnalyticsEventName =
  | "simulator_started"
  | "simulator_completed"
  | "simulator_lead_submitted"
  | "chloe_chat_opened";

export type AnalyticsEventProps = Record<string, string | number | boolean | undefined>;

type PlausibleFn = (name: string, options?: { props?: AnalyticsEventProps }) => void;

type PlausibleGlobal = PlausibleFn & { q?: unknown[] };

declare global {
  interface Window {
    plausible?: PlausibleGlobal;
  }
}

/**
 * Emit a custom Plausible event. Safe to call from server-side code
 * (no-op when window is not defined) and from browsers where the
 * Plausible script has not yet loaded (call is queued).
 */
export function trackEvent(name: AnalyticsEventName, props?: AnalyticsEventProps) {
  if (typeof window === "undefined") {
    return;
  }

  const cleaned: AnalyticsEventProps | undefined = props
    ? Object.fromEntries(
        Object.entries(props).filter(([, value]) => value !== undefined && value !== null)
      )
    : undefined;

  try {
    const existing = window.plausible;
    if (typeof existing === "function") {
      existing(name, cleaned ? { props: cleaned } : undefined);
      return;
    }

    // Queue the call - Plausible replays the queue once its script loads.
    const queued: PlausibleGlobal =
      existing ??
      (Object.assign(
        (...args: unknown[]) => {
          const q = (queued.q = queued.q ?? []);
          q.push(args);
        },
        { q: [] as unknown[] }
      ) as PlausibleGlobal);

    queued.q = queued.q ?? [];
    queued.q.push([name, cleaned ? { props: cleaned } : undefined]);
    window.plausible = queued;
  } catch {
    // Analytics must never break the user experience.
  }
}
