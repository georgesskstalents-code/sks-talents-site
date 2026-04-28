"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type CountUpStatProps = {
  value: string;
  label: string;
};

function translateStatValue(value: string, language: "fr" | "en") {
  if (language !== "en") {
    return value;
  }

  return value
    .replace(/\bjours\b/gi, "days")
    .replace(/\bjour\b/gi, "day");
}

function parseNumericValue(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number.parseInt(digits, 10) : null;
}

export default function CountUpStat({ value, label }: CountUpStatProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState<"fr" | "en">(() =>
    typeof document !== "undefined" && document.documentElement.lang === "en" ? "en" : "fr"
  );
  const localizedValue = useMemo(() => translateStatValue(value, language), [language, value]);
  const [displayValue, setDisplayValue] = useState(localizedValue);
  const numericValue = useMemo(() => parseNumericValue(value), [value]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const element = document.documentElement;
    const updateLanguage = () => {
      setLanguage(element.lang === "en" ? "en" : "fr");
    };

    updateLanguage();

    const observer = new MutationObserver(updateLanguage);
    observer.observe(element, {
      attributes: true,
      attributeFilter: ["lang"]
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || numericValue === null) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [numericValue]);

  useEffect(() => {
    if (!visible || numericValue === null) {
      setDisplayValue(localizedValue);
      return;
    }

    let frame = 0;
    const duration = 900;
    const startedAt = performance.now();
    const suffix = localizedValue.replace(/\d/g, "");

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const next = Math.max(1, Math.round(progress * numericValue));
      setDisplayValue(`${next}${suffix}`);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplayValue(localizedValue);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [localizedValue, numericValue, visible]);

  return (
    <div
      ref={ref}
      className="flex min-h-[148px] flex-col items-center justify-center rounded-[24px] border border-brand-teal/12 bg-white px-6 py-6 text-center shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
    >
      <p className="font-display text-5xl font-semibold leading-none text-brand-teal sm:text-6xl">
        {displayValue}
      </p>
      <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand-ink sm:text-base">
        {label}
      </p>
    </div>
  );
}
