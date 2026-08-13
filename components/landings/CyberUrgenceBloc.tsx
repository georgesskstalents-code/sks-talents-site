import { AlertTriangle, ShieldCheck } from "lucide-react";

type Vertical = "life-sciences" | "animal-health";

type Cas = {
  date: string;
  titre: string;
  desc: string;
};

const CONFIG: Record<Vertical, Cas[]> = {
  "life-sciences": [
    {
      date: "Juin 2026",
      titre: "Novo Nordisk",
      desc: "Fabricant d&apos;Ozempic. 1,3 To de données exfiltrées. Rançon demandée : 25 M$. Faille d&apos;entrée : un simple token GitHub oublié."
    }
  ],
  "animal-health": [
    {
      date: "2024",
      titre: "Groupements vétérinaires nord-américains",
      desc: "Plusieurs groupements bloqués par rançongiciel. 3 semaines d&apos;arrêt partiel pour certains sites. Dossiers patients rendus contre rançon."
    },
    {
      date: "2023",
      titre: "Fuite de données santé animale en Europe",
      desc: "Dossiers santé animale et données clients exposés publiquement dans un groupement européen. Contentieux RGPD en cours."
    }
  ]
};

export default function CyberUrgenceBloc({ vertical }: { vertical: Vertical }) {
  const cas = CONFIG[vertical];
  return (
    <section className="bg-gradient-to-b from-white to-amber-50/40 py-10 sm:py-14">
      <div className="container-shell">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-50 px-4 py-1.5 text-eyebrow font-semibold uppercase tracking-[0.18em] text-amber-800">
          <AlertTriangle size={14} />
          Urgence marché
        </div>
        <h2 className="mt-3 t-h1 max-w-3xl font-display">
          Pourquoi la gouvernance IA n&apos;est{" "}
          <span className="italic text-brand-teal">plus optionnelle.</span>
        </h2>
        <p className="mt-3 max-w-3xl t-body">
          Les usages IA sans cadre exposent votre organisation à des risques concrets, documentés
          et coûteux. Voici ce qui s&apos;est réellement passé.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {cas.map((c, i) => (
            <article
              key={i}
              className="rounded-3xl border border-amber-200/70 bg-white p-6 shadow-[0_18px_44px_rgba(15,58,60,0.06)] sm:p-7"
            >
              <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-amber-700">
                {c.date}
              </p>
              <p className="mt-2 t-h3 font-semibold text-brand-ink">{c.titre}</p>
              <p
                className="mt-3 t-body"
                dangerouslySetInnerHTML={{ __html: c.desc }}
              />
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-3xl border border-brand-teal/15 bg-brand-mint/20 p-6 sm:p-7">
          <ShieldCheck size={22} className="mt-0.5 shrink-0 text-brand-teal" />
          <div>
            <p className="t-h3 font-semibold text-brand-ink">
              L&apos;AI Literacy est obligatoire depuis février 2025.
            </p>
            <p className="mt-2 t-body">
              Pour toutes les organisations européennes. Nos assistants IA sont conçus pour la
              conformité dès leur mise en place : traçabilité des décisions, supervision humaine,
              hébergement européen, zero data retention.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
