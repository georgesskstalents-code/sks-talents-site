import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumbs({ items, className = "" }: Props) {
  if (items.length < 2) {
    return null;
  }

  return (
    <nav
      aria-label="Fil d’Ariane"
      className={`mb-6 flex flex-wrap items-center gap-2 text-sm text-brand-stone ${className}`.trim()}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="transition hover:text-brand-teal">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-semibold text-brand-ink" : ""}>{item.label}</span>
            )}
            {!isLast ? <span className="text-brand-teal/50">/</span> : null}
          </span>
        );
      })}
    </nav>
  );
}
