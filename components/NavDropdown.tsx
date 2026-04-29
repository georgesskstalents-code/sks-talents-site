"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type DropdownItem = {
  href: string;
  label: string;
  description?: string;
};

type Props = {
  label: string;
  items: DropdownItem[];
  triggerClassName?: string;
};

/**
 * Accessible nav dropdown with hover (150ms open / 200ms close delays)
 * + click toggle + keyboard escape. Closes on outside click / focus loss.
 */
export default function NavDropdown({ label, items, triggerClassName }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearTimers();
    openTimeoutRef.current = setTimeout(() => setIsOpen(true), 150);
  };

  const handleMouseLeave = () => {
    clearTimers();
    closeTimeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => () => clearTimers(), []);

  const triggerClasses =
    triggerClassName ??
    "inline-flex items-center gap-1 text-sm font-semibold text-brand-stone transition hover:text-brand-teal";

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={triggerClasses}
      >
        {label}
        <svg
          className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M3 4.5 6 7.5 9 4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen ? (
        <div
          className="absolute left-0 top-full z-50 mt-2 w-64 rounded-2xl border border-brand-teal/12 bg-white py-2 shadow-[0_18px_50px_rgba(15,23,42,0.14)]"
          role="menu"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 text-sm font-semibold text-brand-stone transition hover:bg-brand-mint/45 hover:text-brand-teal"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
              {item.description ? (
                <span className="mt-0.5 block text-xs font-normal text-brand-stone/75">
                  {item.description}
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
