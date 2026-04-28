"use client";

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
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <article key={item.question} className="card-surface p-6">
            <h3 className="font-display text-2xl text-brand-ink">{item.question}</h3>
            <p className="mt-3 text-sm leading-7 text-brand-stone">{item.answer}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
