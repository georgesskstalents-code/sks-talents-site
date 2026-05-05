import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export const metadata = {
  title: "Typography reference — SKS TALENTS",
  robots: { index: false, follow: false }
};

const TOKENS: Array<{
  className: string;
  label: string;
  spec: string;
  sample: string;
  italic?: boolean;
}> = [
  {
    className: "t-display-xl",
    label: "display-xl",
    spec: "Mobile 40px / Desktop 64px · Instrument Serif italic · line-height 1.05 · tracking -0.02em",
    sample: "Recruter le bon dirigeant.",
    italic: true
  },
  {
    className: "t-display-l",
    label: "display-l",
    spec: "Mobile 32px / Desktop 48px · Instrument Serif italic · line-height 1.08 · tracking -0.02em",
    sample: "Une décision stratégique pour votre COMEX.",
    italic: true
  },
  {
    className: "t-h1 section-title",
    label: "h1 / section-title",
    spec: "Mobile 28px / Desktop 44px · Instrument Serif · line-height 1.15 · tracking -0.01em",
    sample: "Vous vous reconnaissez si :"
  },
  {
    className: "t-h2",
    label: "h2",
    spec: "Mobile 22px / Desktop 28px · Instrument Serif · line-height 1.2 · tracking -0.01em",
    sample: "5 signaux qu'il est temps d'agir."
  },
  {
    className: "t-h3",
    label: "h3",
    spec: "Mobile 18px / Desktop 20px · Inter Semibold · line-height 1.3",
    sample: "Constituer un COMEX aligné."
  },
  {
    className: "t-body-l section-copy",
    label: "body-l / section-copy",
    spec: "Mobile 16px / Desktop 18px · Inter Regular · line-height 1.7",
    sample:
      "Cabinet d'executive search dédié aux Life Sciences & Santé animale. Recrutement Série A, Série B et scale-up — biotech, diagnostic, vétérinaire, petfood."
  },
  {
    className: "t-body",
    label: "body",
    spec: "Mobile 15px / Desktop 16px · Inter Regular · line-height 1.65",
    sample:
      "Nous accompagnons les CEO, COO et DRH sur les recrutements critiques. 100+ placements en Série A, Série B et scale-up."
  },
  {
    className: "t-caption",
    label: "caption",
    spec: "13px · Inter Medium · line-height 1.5 · color stone/80",
    sample: "Mis à jour le 5 mai 2026 · Source : Notion"
  }
];

const WEIGHTS = [
  { label: "400 — Regular", className: "font-normal", note: "Body, lead paragraphs" },
  { label: "500 — Medium", className: "font-medium", note: "Buttons, navigation, eyebrows-light" },
  { label: "600 — Semibold", className: "font-semibold", note: "Sub-headings, eyebrows, h3, accents" },
  { label: "700 — Bold", className: "font-bold", note: "Strong emphasis only — avoid on display sizes" }
];

const SPACING = [
  { label: "tracking-tight", className: "tracking-tight", value: "-0.02em", note: "Display headlines (crisper)" },
  { label: "tracking-snug", className: "tracking-snug", value: "-0.01em", note: "Section headings" },
  { label: "tracking-normal", className: "tracking-normal", value: "0", note: "Body / default" },
  { label: "tracking-wide", className: "tracking-wide", value: "0.18em", note: "Eyebrows uppercase" },
  { label: "tracking-eyebrow", className: "tracking-eyebrow", value: "0.22em", note: "Premium uppercase eyebrows" }
];

export default async function TypoReferencePage({ searchParams }: Props) {
  const expected = process.env.DASHBOARD_PRIVATE_TOKEN;
  const { token } = await searchParams;
  if (expected && token !== expected) {
    redirect("/");
  }

  return (
    <main className="container-shell py-12">
      <header className="mb-12 max-w-3xl">
        <p className="eyebrow">Design system</p>
        <h1 className="t-display-l">SKS Talents — système typographique.</h1>
        <p className="t-body-l mt-4">
          Source de vérité visuelle. Si une page du site dévie de cette référence, c'est qu'elle utilise des
          valeurs inline (<code>text-[Npx]</code>, <code>leading-[N]</code>) — à corriger en utilisant les classes
          ci-dessous. Document complémentaire : <code>Copilot/Typo-System.md</code>.
        </p>
      </header>

      {/* Type scale */}
      <section className="space-y-8">
        <div>
          <p className="eyebrow">Échelle</p>
          <h2 className="t-h1">Type scale (mobile + desktop)</h2>
        </div>
        {TOKENS.map((t) => (
          <article key={t.label} className="card-surface p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <code className="font-mono text-sm font-semibold text-brand-teal">.{t.label}</code>
              <span className="text-caption text-brand-stone/80">{t.spec}</span>
            </div>
            <p className={`mt-4 ${t.className}`}>{t.sample}</p>
          </article>
        ))}
      </section>

      {/* Weights */}
      <section className="mt-16 space-y-6">
        <div>
          <p className="eyebrow">Poids</p>
          <h2 className="t-h1">Inter — 4 weights</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {WEIGHTS.map((w) => (
            <article key={w.label} className="card-surface p-6">
              <p className={`text-2xl ${w.className}`}>The quick brown fox jumps over the lazy dog</p>
              <p className="mt-3 text-caption text-brand-stone/80">{w.label}</p>
              <p className="mt-1 text-body text-brand-stone">{w.note}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Letter spacing */}
      <section className="mt-16 space-y-6">
        <div>
          <p className="eyebrow">Letter-spacing</p>
          <h2 className="t-h1">Tokens de tracking</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {SPACING.map((s) => (
            <article key={s.label} className="card-surface p-6">
              <p className={`text-xl ${s.className}`}>EXECUTIVE SEARCH SKS TALENTS</p>
              <div className="mt-3 flex items-center gap-2">
                <code className="font-mono text-xs text-brand-teal">{s.label}</code>
                <span className="font-mono text-xs text-brand-stone/80">({s.value})</span>
              </div>
              <p className="mt-1 text-body text-brand-stone">{s.note}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Examples */}
      <section className="mt-16 space-y-6">
        <div>
          <p className="eyebrow">Compositions</p>
          <h2 className="t-h1">Compositions réelles</h2>
        </div>
        <div className="card-surface p-8 sm:p-10">
          <p className="eyebrow">Hero principal</p>
          <h3 className="t-display-l">
            Recruter les bons talents n'est pas un enjeu RH.{" "}
            <span className="italic text-brand-teal">C'est une décision stratégique.</span>
          </h3>
          <p className="t-body-l mt-4">
            Cabinet d'executive search dédié aux Life Sciences &amp; Santé animale. Recrutement Série A, Série B
            et scale-up — biotech, diagnostic, vétérinaire, petfood.
          </p>
        </div>

        <div className="card-surface p-8 sm:p-10">
          <p className="eyebrow">Section secondaire</p>
          <h3 className="t-h1 section-title">Vous vous reconnaissez si :</h3>
          <p className="t-body-l mt-4">
            Vous devez constituer un COMEX aligné sur votre stratégie et vos valeurs, et chaque recrutement
            impacte directement votre exécution.
          </p>
        </div>

        <div className="card-surface p-8">
          <p className="eyebrow">Card</p>
          <h3 className="t-h3 mt-2">Constituer un COMEX aligné</h3>
          <p className="t-body mt-2">
            Vous devez constituer un COMEX aligné sur votre stratégie et vos valeurs, et chaque recrutement
            impacte directement votre exécution.
          </p>
          <p className="t-caption mt-4">Mise à jour le 5 mai 2026 · 100+ placements</p>
        </div>
      </section>

      <footer className="mt-16 border-t border-brand-teal/10 pt-8">
        <p className="t-caption">
          Pour vérifier qu'aucun composant ne dévie : <code>npm test</code> (le snapshot
          <code className="text-brand-teal"> tailwind.tokens.test.ts</code> verrouille toutes les valeurs).
          Pour grep les composants à migrer : <code>scripts/find-typography-drift.sh</code>.
        </p>
      </footer>
    </main>
  );
}
