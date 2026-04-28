type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function SectionShell({ eyebrow, title, description, children }: Props) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-shell space-y-10">
        <div className="space-y-5">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 className="section-title max-w-5xl">{title}</h2>
          {description ? <p className="section-copy">{description}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
