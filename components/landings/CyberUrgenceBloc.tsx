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
      date: "Juin 2026 · Pharma mondiale",
      titre: "Novo Nordisk (Danemark)",
      desc: "Le géant pharmaceutique danois (fabricant d&apos;Ozempic et Wegovy) victime d&apos;une cyberattaque majeure. Le groupe d&apos;extorsion <strong>FulcrumSec</strong> réclame <strong>25 M$</strong>, refusés par le groupe. Butin exfiltré : plus d&apos;<strong>1 To de données</strong> (environ 700 000 fichiers) incluant recherche propriétaire, dépôts de code GitHub, modèles d&apos;IA propriétaires et données d&apos;essais cliniques. Faille d&apos;entrée : un simple <strong>token GitHub oublié</strong>."
    }
  ],
  "animal-health": [
    {
      date: "Pharma vétérinaire",
      titre: "Virbac (France)",
      desc: "Le laboratoire français, acteur mondial majeur de la santé animale, paralysé par une cyberattaque massive. Production ralentie ou arrêtée temporairement sur plusieurs sites mondiaux, le temps de sécuriser les infrastructures."
    },
    {
      date: "Réseau clinique multi-sites",
      titre: "National Veterinary Associates (États-Unis)",
      desc: "Rançongiciel via le malware <strong>Ryuk</strong>. Accès aux dossiers médicaux des animaux bloqué dans <strong>plus de 400 cliniques vétérinaires</strong> du réseau NVA. Continuité des soins gravement impactée."
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
