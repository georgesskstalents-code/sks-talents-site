"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FAQ_HOME_TABS, type FaqQuestion, type FaqVertical } from "@/data/faqHomeContent";

const CHEVRON_TRANSITION = { duration: 0.25, ease: "easeOut" as const };

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <span
      className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
        open
          ? "bg-[#41a0a4] text-white"
          : "bg-white border border-[#E5E7EB] text-[#4a6e70]"
      }`}
      aria-hidden
    >
      <svg
        viewBox="0 0 16 16"
        className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 6l4 4 4-4" />
      </svg>
    </span>
  );
}

function CategoryPill({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
        active ? "bg-[#e6f0f0] text-[#41a0a4]" : "bg-[#F5F8F6] text-[#4a6e70]"
      }`}
    >
      {label}
    </span>
  );
}

function CostBox({ data }: { data: NonNullable<FaqQuestion["costBox"]> }) {
  return (
    <div className="mt-5 rounded-xl bg-[#F5F8F6] p-5 sm:p-6">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-baseline sm:gap-4">
        <span className="font-display italic text-4xl sm:text-5xl text-[#41a0a4] leading-none">
          {data.figure}
        </span>
        <div>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#0d2a2c]">
            {data.label}
          </p>
          <p className="mt-1 font-sans text-sm text-[#4a6e70]">{data.caption}</p>
        </div>
      </div>
      <p className="mt-5 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#0d2a2c]">
        {data.bulletsIntro}
      </p>
      <ul className="mt-3 space-y-2">
        {data.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 font-sans text-sm text-[#0d2a2c]">
            <span
              aria-hidden
              className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#41a0a4]"
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-right font-sans text-[10px] italic text-[#9CA3AF]">{data.source}</p>
    </div>
  );
}

function QuestionAccordion({
  question,
  index,
  open,
  onToggle
}: {
  question: FaqQuestion;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const number = String(index + 1).padStart(2, "0");
  const panelId = `faq-panel-${question.id}`;
  const buttonId = `faq-button-${question.id}`;

  return (
    <div
      className={`rounded-2xl bg-white transition-colors ${
        open ? "border-[1.5px] border-[#41a0a4]" : "border-[1.5px] border-[#E5E7EB]"
      }`}
    >
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onToggle();
          }
        }}
        className="flex w-full items-start gap-3 sm:gap-4 p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#41a0a4] focus-visible:ring-offset-2 rounded-2xl"
      >
        <span className="font-display text-2xl sm:text-3xl text-[#41a0a4] leading-none pt-1 shrink-0">
          {number}
        </span>
        <div className="flex-1 min-w-0 space-y-2">
          <CategoryPill label={question.category} active={open} />
          <h3 className="font-display text-lg sm:text-[22px] text-[#0d2a2c] leading-snug">
            {question.question}
          </h3>
        </div>
        <ChevronIcon open={open} />
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={CHEVRON_TRANSITION}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 sm:px-6 sm:pb-6 sm:pl-[calc(1.5rem+2.5rem+1rem)]">
              {question.answerHtml ? (
                <p
                  className="font-sans text-[15px] leading-7 text-[#4a6e70] [&_strong]:font-semibold [&_strong]:text-[#0d2a2c]"
                  dangerouslySetInnerHTML={{ __html: question.answerHtml }}
                />
              ) : null}
              {question.costBox ? <CostBox data={question.costBox} /> : null}
              <div className="mt-5 border-l-[3px] border-[#41a0a4] pl-4">
                <p className="font-display italic text-base text-[#41a0a4] leading-relaxed">
                  {question.punchline}
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function FAQHomeTabs() {
  const [activeVertical, setActiveVertical] = useState<FaqVertical>("life-sciences");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const activeTab = FAQ_HOME_TABS.find((t) => t.vertical === activeVertical) ?? FAQ_HOME_TABS[0];

  function handleTabKey(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = (index + direction + FAQ_HOME_TABS.length) % FAQ_HOME_TABS.length;
      setActiveVertical(FAQ_HOME_TABS[next].vertical);
      setOpenIndex(0);
    }
  }

  return (
    <section className="bg-[#F5F8F6] pt-6 pb-16 sm:pt-8 sm:pb-20">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-10 lg:px-[60px]">
        <header className="text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-[#41a0a4]">
            Foire aux questions
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl text-[#0d2a2c] leading-[1.1]">
            Les questions que vous
            <br />
            <span className="italic text-[#41a0a4]">vous posez vraiment.</span>
          </h2>
          <p className="mt-4 font-sans text-base italic text-[#4a6e70]">
            3 questions clés par verticale, avec nos réponses terrain.
          </p>
        </header>

        <div
          role="tablist"
          aria-label="Verticales SKS Talents"
          className="mt-8 flex justify-center gap-3 sm:gap-4"
        >
          {FAQ_HOME_TABS.map((tab, index) => {
            const active = tab.vertical === activeVertical;
            return (
              <button
                key={tab.vertical}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`faq-tabpanel-${tab.vertical}`}
                id={`faq-tab-${tab.vertical}`}
                tabIndex={active ? 0 : -1}
                onClick={() => {
                  setActiveVertical(tab.vertical);
                  setOpenIndex(0);
                }}
                onKeyDown={(event) => handleTabKey(event, index)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.18em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#41a0a4] focus-visible:ring-offset-2 ${
                  active
                    ? "bg-[#41a0a4] text-white"
                    : "bg-white border border-[#E5E7EB] text-[#4a6e70] hover:border-[#41a0a4]/40"
                }`}
              >
                <span aria-hidden>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`faq-tabpanel-${activeTab.vertical}`}
          aria-labelledby={`faq-tab-${activeTab.vertical}`}
          className="mt-8 space-y-4"
        >
          {activeTab.questions.map((question, index) => (
            <QuestionAccordion
              key={question.id}
              question={question}
              index={index}
              open={openIndex === index}
              onToggle={() => setOpenIndex((prev) => (prev === index ? null : index))}
            />
          ))}
        </div>

        <a
          href="https://calendly.com/g-kengue/talentconsulting"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex w-full items-center justify-center rounded-full bg-[#0d2a2c] px-6 py-4 text-center font-sans text-sm font-medium leading-snug text-white transition-colors hover:bg-[#41a0a4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#41a0a4] focus-visible:ring-offset-2"
        >
          <span className="sm:hidden">Réserver 30 min avec SKS Talents →</span>
          <span className="hidden sm:inline">Une autre question ? Réserver 30 min avec SKS Talents →</span>
        </a>
      </div>
    </section>
  );
}
