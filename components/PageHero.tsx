import Breadcrumbs from "@/components/Breadcrumbs";

type Props = {
  kicker: string;
  title: string;
  description: string;
  variant?: "default" | "teal" | "ink" | "sand";
  breadcrumbs?: { label: string; href?: string }[];
};

const variantClassNames = {
  default: "bg-grain",
  teal:
    "bg-[radial-gradient(circle_at_top_right,rgba(65,160,164,0.18),transparent_32%),linear-gradient(180deg,rgba(223,243,241,0.95),rgba(255,255,255,0.88))]",
  ink:
    "bg-[radial-gradient(circle_at_top_right,rgba(65,160,164,0.16),transparent_28%),linear-gradient(180deg,rgba(22,51,52,0.98),rgba(28,54,56,0.92))] text-white",
  sand:
    "bg-[radial-gradient(circle_at_top_right,rgba(193,154,107,0.15),transparent_28%),linear-gradient(180deg,rgba(248,244,238,0.98),rgba(255,255,255,0.9))]"
} as const;

export default function PageHero({
  kicker,
  title,
  description,
  variant = "default",
  breadcrumbs
}: Props) {
  const isDark = variant === "ink";
  return (
    <section className="container-shell py-16 sm:py-20">
      <div className={`card-surface p-8 sm:p-12 ${variantClassNames[variant]}`}>
        {breadcrumbs ? (
          <Breadcrumbs
            items={breadcrumbs}
            className={isDark ? "text-white/75 [&_a]:hover:text-white [&_span]:text-white/75" : ""}
          />
        ) : null}
        <p className={`eyebrow ${isDark ? "border-white/15 bg-white/10 text-white/75" : ""}`}>
          {kicker}
        </p>
        <h1 className="max-w-4xl font-display text-5xl leading-none sm:text-6xl">{title}</h1>
        <p className={`mt-6 max-w-3xl text-lg leading-8 ${isDark ? "text-white/78" : "text-brand-stone"}`}>
          {description}
        </p>
      </div>
    </section>
  );
}
