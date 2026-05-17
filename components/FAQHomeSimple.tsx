"use client";

import Link from "next/link";
import { useState } from "react";
import CalendlyButton from "@/components/CalendlyButton";
import { FAQ_HOME_SIMPLE_ITEMS } from "@/data/faqHomeSimpleContent";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0 text-[#41a0a4]"
    >
      {open ? <path d="M5 12h14" /> : <path d="M12 5v14M5 12h14" />}
    </svg>
  );
}

export default function FAQHomeSimple() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(FAQ_HOME_SIMPLE_ITEMS.map((i) => [i.num, true]))
  );

  function toggle(num: string) {
    setOpenIds((prev) => ({ ...prev, [num]: !prev[num] }));
  }

  return (
    <section className="bg-[#F5F8F6] py-10 sm:py-14">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-[#41a0a4]">
            Questions fréquentes
          </p>
          <h2 className="mt-3 font-display text-3xl text-brand-ink sm:text-4xl">
            Vos questions les plus fréquentes
          </h2>
          <p className="mt-3 font-sans text-sm leading-relaxed text-brand-stone sm:text-base">
            Secteurs, services, garanties, IA - une réponse Calendly si la vôtre n&apos;y figure pas.
          </p>

          <div className="mt-8 divide-y divide-[#E5E7EB] rounded-2xl border border-[#E5E7EB] bg-white px-5 sm:px-6">
            {FAQ_HOME_SIMPLE_ITEMS.map((item) => {
              const open = !!openIds[item.num];
              const panelId = `faq-home-simple-${item.num}`;
              return (
                <div key={item.num} className="py-5">
                  <button
                    type="button"
                    onClick={() => toggle(item.num)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="flex w-full items-start justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#41a0a4] focus-visible:ring-offset-2 rounded"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#41a0a4]">
                        {item.num} - {item.category}
                      </p>
                      <p className="mt-1 font-sans text-base font-medium leading-snug text-brand-ink">
                        {item.question}
                      </p>
                    </div>
                    <Chevron open={open} />
                  </button>
                  {open ? (
                    <p
                      id={panelId}
                      className="mt-3 font-sans text-sm leading-relaxed text-brand-stone"
                    >
                      {item.answer}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl bg-brand-mint px-6 py-8 text-center sm:px-10 sm:py-10">
            <p className="font-display text-2xl text-brand-ink sm:text-3xl">
              Pas la bonne question ?
            </p>
            <p className="mt-2 font-sans text-sm leading-relaxed text-brand-ink sm:text-base">
              15 minutes pour échanger sur votre vrai blocage.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CalendlyButton label="Réserver 15 min →" tone="solid" />
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center rounded-full border border-brand-ink/15 px-6 py-3 font-sans text-sm font-semibold text-brand-ink transition hover:bg-white"
              >
                Faire le diagnostic
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
