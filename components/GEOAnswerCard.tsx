type GEOAnswerCardProps = {
  eyebrow?: string;
  title: string;
  answer: string;
  bullets?: string[];
};

export default function GEOAnswerCard({
  eyebrow = "Réponse directe",
  title,
  answer,
  bullets = []
}: GEOAnswerCardProps) {
  return (
    <div className="card-surface p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl text-brand-ink sm:text-4xl">{title}</h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-brand-stone">{answer}</p>
      {bullets.length ? (
        <ul className="mt-5 grid gap-3 text-sm leading-7 text-brand-stone md:grid-cols-2">
          {bullets.map((bullet) => (
            <li key={bullet} className="rounded-2xl border border-brand-teal/10 bg-brand-mint/35 px-4 py-3">
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
