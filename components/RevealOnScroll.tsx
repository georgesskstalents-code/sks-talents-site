"use client";

import { useEffect, useRef, useState } from "react";

type RevealOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
};

export default function RevealOnScroll({
  children,
  className = "",
  delayMs = 0
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    setHydrated(true);

    if (typeof window === "undefined") {
      setVisible(true);
      return;
    }

    const rect = node.getBoundingClientRect();
    const alreadyNearViewport = rect.top <= window.innerHeight * 0.92;

    if (alreadyNearViewport) {
      setVisible(true);
      return;
    }

    setVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`reveal-on-scroll ${hydrated ? "is-ready" : ""} ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
