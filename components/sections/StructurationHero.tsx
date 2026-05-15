"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Vertical = "life-sciences" | "animal-health";

type StructurationHeroProps = {
  vertical: Vertical;
  eyebrow: string;
  headlineLines: [string, string, string];
  question: {
    thematicLabel: string;
    questionText: string;
    answer: string;
    answerHighlight: string;
    italicPhrase: string;
    punchline: string;
  };
  constat: {
    line1Prefix: string;
    line1Bold: string;
    line1Suffix: string;
    line2Italic: string;
  };
  response: {
    cibleBold: string;
    cibleSuffix: string;
    description: string;
    enjeux: string;
    agents: string;
    agentsDetail: string;
    roi: string;
  };
  pourquoiSKS: string;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`transition-transform duration-200 ${open ? "" : "rotate-180"}`}
    >
      <path d="M6 15l6-6 6 6" />
    </svg>
  );
}

export function StructurationHero(props: StructurationHeroProps) {
  const { eyebrow, headlineLines, question, constat, response, pourquoiSKS } = props;
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="relative overflow-hidden bg-[#F5F8F6] py-16 md:py-24">
      <div className="relative mx-auto max-w-[1280px] px-6 md:px-12 lg:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[60px] top-[60px] bottom-[60px] hidden w-[2px] bg-[#41a0a4] md:left-[100px] md:block"
        />

        <div className="space-y-14 md:ml-[100px] md:space-y-16 md:pl-8">
          <div>
            <span className="inline-flex items-center rounded-full bg-[#e6f0f0] px-5 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-[#41a0a4]">
              {eyebrow}
            </span>
          </div>

          <h1 className="font-display text-[32px] font-medium leading-[1.05] sm:text-[44px] lg:text-[58px]">
            <span className="block text-[#0d2a2c]">{headlineLines[0]}</span>
            <span className="block text-[#0d2a2c]">{headlineLines[1]}</span>
            <span className="block italic text-[#41a0a4]">{headlineLines[2]}</span>
          </h1>

          <div className="relative">
            <span aria-hidden className="absolute -left-[50px] top-[35px] hidden md:block">
              <span className="block h-[18px] w-[18px] rounded-full bg-[#41a0a4]" />
              <span className="absolute inset-0 -m-1.5 rounded-full border border-[#41a0a4] opacity-30" />
            </span>
            <div
              className={`rounded-2xl border-2 bg-white p-6 transition-colors md:p-8 lg:p-10 ${
                isOpen ? "border-[#41a0a4]" : "border-[#E5E7EB]"
              }`}
            >
              <button
                type="button"
                onClick={() => setIsOpen((v) => !v)}
                aria-expanded={isOpen}
                aria-controls="structuration-hero-dropdown"
                className="flex w-full items-start gap-4 rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#41a0a4] focus-visible:ring-offset-2"
              >
                <div className="min-w-0 flex-1">
                  <p
                    className={`mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.25em] ${
                      isOpen ? "text-[#41a0a4]" : "text-[#9CA3AF]"
                    }`}
                  >
                    {question.thematicLabel}
                  </p>
                  <h2 className="font-display text-[20px] font-medium leading-tight text-[#0d2a2c] md:text-[22px] lg:text-[26px]">
                    {question.questionText}
                  </h2>
                </div>
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                    isOpen
                      ? "bg-[#41a0a4] text-white"
                      : "border border-[#E5E7EB] bg-white text-[#9CA3AF]"
                  }`}
                >
                  <Chevron open={isOpen} />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id="structuration-hero-dropdown"
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <hr className="my-5 border-[#E5E7EB]" />
                    <p className="font-sans text-[15px] leading-relaxed text-[#4a6e70]">
                      {question.answer}
                      <span className="font-semibold text-[#0d2a2c]">
                        {question.answerHighlight}
                      </span>
                      {question.italicPhrase}
                    </p>
                    <div className="mt-5 flex items-start gap-3 pt-2">
                      <span aria-hidden className="mt-1 block h-5 w-[3px] shrink-0 bg-[#41a0a4]" />
                      <p className="font-display text-[16px] italic text-[#41a0a4]">
                        {question.punchline}
                      </p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>

          <div className="relative">
            <span aria-hidden className="absolute -left-[52px] top-[8px] hidden md:block">
              <span className="block h-[22px] w-[22px] rounded-full bg-[#0d2a2c]" />
            </span>
            <p className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-[#0d2a2c]">
              Notre constat
            </p>
            <p className="font-display text-[24px] text-[#0d2a2c] md:text-[26px] lg:text-[30px]">
              {constat.line1Prefix}
              <strong className="font-semibold">{constat.line1Bold}</strong>
              {constat.line1Suffix}
            </p>
            <p className="mt-2 font-display text-[24px] italic text-[#41a0a4] md:text-[26px] lg:text-[30px]">
              {constat.line2Italic}
            </p>
          </div>

          <div className="relative">
            <span aria-hidden className="absolute -left-[50px] top-[10px] hidden md:block">
              <span className="block h-[18px] w-[18px] rounded-full bg-[#41a0a4]" />
            </span>
            <p className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-[#41a0a4]">
              Notre réponse
            </p>
            <p className="font-sans text-[15px] leading-relaxed text-[#4a6e70]">
              <span className="font-semibold text-[#0d2a2c]">{response.cibleBold}</span>
              {response.cibleSuffix}
            </p>
            <p className="mt-2 font-sans text-[15px] leading-relaxed text-[#4a6e70]">
              {response.description}
            </p>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-[#4a6e70]">
              <span className="font-semibold text-[#0d2a2c]">{response.enjeux}</span>
              {"  ·  "}
              <span className="font-semibold text-[#0d2a2c]">{response.agents}</span>{" "}
              <span className="text-[#9CA3AF]">{response.agentsDetail}</span>
            </p>
            <p className="mt-2 font-sans text-[15px] font-semibold text-[#0d2a2c]">
              {response.roi}
            </p>
          </div>

          <div className="relative">
            <span aria-hidden className="absolute -left-[50px] top-[18px] hidden md:block">
              <span className="block h-[18px] w-[18px] rounded-full bg-[#41a0a4]" />
            </span>
            <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-2xl bg-[#0d2a2c] px-6 py-3 md:rounded-full md:px-8 md:py-4">
              <p className="font-sans text-[12px] leading-snug text-white md:text-[13px]">
                <span className="font-bold uppercase tracking-[0.18em] text-[#41a0a4]">
                  Pourquoi SKS Talents
                </span>
                <span className="text-white">{"  ·  "}{pourquoiSKS}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StructurationHero;
