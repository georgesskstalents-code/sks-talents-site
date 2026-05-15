type Props = {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  compact?: boolean;
};

export default function SectionShell({ eyebrow, title, description, children, compact }: Props) {
  return (
    <section className={compact ? "py-8 sm:py-12" : "py-10 sm:py-14"}>
      <div className="container-shell space-y-10">
        <div className="space-y-5">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          {title ? <h2 className="section-title max-w-5xl">{title}</h2> : null}
          {description ? <p className="section-copy">{description}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
