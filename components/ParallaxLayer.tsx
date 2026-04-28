"use client";

import { useEffect, useState } from "react";

type ParallaxLayerProps = {
  children?: React.ReactNode;
  offset?: number;
  className?: string;
};

export default function ParallaxLayer({
  children,
  offset = 18,
  className = ""
}: ParallaxLayerProps) {
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const disableForViewport = window.innerWidth < 768;

    if (media.matches || disableForViewport) {
      setTranslateY(0);
      return;
    }

    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const amplitude = offset * 1.8;
        const next = Math.max(
          Math.min(window.scrollY * (offset / 42), amplitude),
          -amplitude
        );
        setTranslateY(next);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [offset]);

  return (
    <div
      className={className}
      style={{
        transform: `translate3d(0, ${translateY}px, 0)`,
        transition: "transform 90ms linear",
        willChange: "transform"
      }}
    >
      {children}
    </div>
  );
}
