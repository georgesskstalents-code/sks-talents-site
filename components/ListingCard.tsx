import Link from "next/link";

type Props = {
  href: string;
  title: string;
  description: string;
  meta?: string;
};

export default function ListingCard({ href, title, description, meta }: Props) {
  return (
    <Link href={href} className="card-surface block p-6 transition hover:-translate-y-1">
      {meta ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">{meta}</p>
      ) : null}
      <h3 className="mt-3 font-display text-3xl text-brand-ink">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-brand-stone">{description}</p>
    </Link>
  );
}
