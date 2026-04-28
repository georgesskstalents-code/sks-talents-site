"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import sectorHubs from "@/data/sectorHubs.json";

const hub = sectorHubs["life-sciences"];

export default function LifeSciencesHeader() {
  const pathname = usePathname();

  if (pathname === "/life-sciences") {
    return null;
  }

  return (
    <section className="border-b border-brand-teal/10 bg-gradient-to-b from-white to-brand-mint/20 backdrop-blur">
      <div className="container-shell py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Navigation Hub
            </p>
            <h2 className="mt-2 font-display text-3xl text-brand-ink">{hub.label}</h2>
          </div>
          <nav className="grid gap-3 md:grid-cols-3">
            {hub.links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-[26px] border p-5 transition duration-300 ${
                    isActive
                      ? "border-brand-teal bg-brand-mint shadow-soft"
                      : "border-brand-teal/20 bg-gradient-to-br from-white to-brand-mint/65 shadow-[0_12px_30px_rgba(65,160,164,0.08)] hover:border-brand-teal/50 hover:-translate-y-0.5 hover:from-brand-mint/80 hover:to-white"
                  }`}
                >
                  <p className="text-lg font-semibold text-brand-ink">{link.label}</p>
                  <p className="mt-2 text-sm leading-6 text-brand-stone">{link.description}</p>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}
