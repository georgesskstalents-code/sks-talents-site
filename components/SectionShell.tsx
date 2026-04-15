type Props = {
  eyebrow?: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function SectionShell({ eyebrow, title, description, children }: Props) {
  return (
    <section className="py-14 sm:py-18">
      <div className="container-shell space-y-8">
        <div className="space-y-4">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 className="section-title">{title}</h2>
          <p className="section-copy">{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
