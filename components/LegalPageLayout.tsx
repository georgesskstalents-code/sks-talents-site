import type { ReactNode } from "react";
import PageHero from "@/components/PageHero";

type LegalSection = {
  title: string;
  body: ReactNode;
};

type LegalPageLayoutProps = {
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
  footer?: ReactNode;
};

/**
 * Gabarit commun aux pages juridiques : meme hero, meme rythme de lecture,
 * meme mise en page que la politique cookies deja en ligne.
 */
export default function LegalPageLayout({
  title,
  description,
  updatedAt,
  sections,
  footer
}: LegalPageLayoutProps) {
  return (
    <>
      <PageHero
        kicker="Légal"
        title={title}
        description={description}
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: title }]}
      />
      <section className="container-shell py-8">
        <div className="card-surface max-w-4xl space-y-10 p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
            Dernière mise à jour :{" "}
            <time dateTime={updatedAt}>
              {new Date(updatedAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </time>
          </p>
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h2 className="font-display text-2xl text-brand-ink sm:text-3xl">{section.title}</h2>
              <div className="space-y-4 text-base leading-8 text-brand-stone">{section.body}</div>
            </div>
          ))}
          {footer ? <div className="border-t border-brand-teal/12 pt-8">{footer}</div> : null}
        </div>
      </section>
    </>
  );
}

/** Ligne cle-valeur utilisee par les tableaux d'identite legale. */
export function LegalRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-brand-teal/10 py-3 last:border-0 sm:grid-cols-[220px_1fr] sm:gap-6">
      <dt className="text-sm font-semibold text-brand-ink">{label}</dt>
      <dd className="text-sm leading-7 text-brand-stone">{value}</dd>
    </div>
  );
}
