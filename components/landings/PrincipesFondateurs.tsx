import { Link2, Sparkles, ShieldCheck, RefreshCw } from "lucide-react";

const PRINCIPES = [
  {
    num: "1",
    Icon: ShieldCheck,
    title: "On ne touche à rien",
    desc: "Vos outils actuels restent en place. Nous nous intégrons à votre environnement, pas l'inverse."
  },
  {
    num: "2",
    Icon: Link2,
    title: "On connecte",
    desc: "Les silos sont comblés par des connecteurs. Vos outils se parlent enfin et vos données se synchronisent."
  },
  {
    num: "3",
    Icon: Sparkles,
    title: "Assistants IA",
    desc: "On élimine le répétitif pour redonner du temps à vos équipes sur ce qui compte vraiment."
  }
];

export default function PrincipesFondateurs() {
  return (
    <section className="bg-gradient-to-b from-white via-brand-mint/8 to-white py-10 sm:py-14">
      <div className="container-shell">
        <p className="eyebrow">3 principes fondateurs</p>
        <h2 className="t-h1 max-w-3xl font-display">
          3 principes qui garantissent{" "}
          <span className="italic text-brand-teal">votre tranquillité.</span>
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {PRINCIPES.map((p) => (
            <article
              key={p.num}
              className="relative rounded-3xl border border-brand-teal/15 bg-white p-6 shadow-[0_18px_44px_rgba(15,58,60,0.06)] sm:p-7"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[44px] leading-none text-brand-teal">
                  {p.num}
                </span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-mint/60 to-brand-mint/30 text-brand-teal">
                  <p.Icon size={18} />
                </span>
              </div>
              <p className="mt-4 t-h3 font-semibold text-brand-ink">{p.title}</p>
              <p className="mt-2 t-body">{p.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-brand-teal/15 bg-brand-mint/20 p-4 sm:p-5">
          <RefreshCw size={18} className="mt-0.5 shrink-0 text-brand-teal" />
          <p className="t-body">
            <span className="font-semibold text-brand-ink">Architecture réversible.</span> Mistral,
            Claude, GPT remplaçables en 1 clic sans reconstruire les assistants IA.
          </p>
        </div>
      </div>
    </section>
  );
}
