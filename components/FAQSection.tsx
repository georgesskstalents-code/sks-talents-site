import SectionShell from "@/components/SectionShell";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: FAQItem[];
};

export default function FAQSection({
  eyebrow = "FAQ",
  title,
  description,
  items
}: FAQSectionProps) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <SectionShell eyebrow={eyebrow} title={title} description={description}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl divide-y divide-brand-teal/15 border-y border-brand-teal/15">
        {items.map((item) => (
          <details key={item.question} className="group py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5">
              <h3 className="font-display text-xl text-brand-ink transition group-hover:text-brand-teal sm:text-2xl">
                {item.question}
              </h3>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-teal/30 text-lg text-brand-teal transition group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pb-6 pr-12 text-base leading-7 text-brand-stone">{item.answer}</p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}
