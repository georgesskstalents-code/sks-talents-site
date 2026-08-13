import { CheckCircle, Coins, Info } from "lucide-react";

type Vertical = "life-sciences" | "animal-health";

type Aide = {
  icon: string;
  title: string;
  desc: string;
};

const CONFIG: Record<Vertical, { aides: Aide[]; casConcret: string }> = {
  "life-sciences": {
    aides: [
      {
        icon: "🏛",
        title: "Bpifrance · Diag IA",
        desc: "Subvention pour diagnostic et déploiement IA. Éligibilité PME/ETI françaises."
      },
      {
        icon: "🏛",
        title: "Région (IDF, PACA, AURA, Occitanie…)",
        desc: "Subvention Santé numérique / Digitalisation, selon votre implantation régionale."
      },
      {
        icon: "🎓",
        title: "OPCO · Formation AI Literacy",
        desc: "Prise en charge par collaborateur. Obligation légale depuis février 2025."
      },
      {
        icon: "🤝",
        title: "Mécénat d'entreprise",
        desc: "Réduction d'impôt de 60 % pour vos donateurs (dans la limite légale)."
      },
      {
        icon: "🇪🇺",
        title: "France 2030 · Santé numérique",
        desc: "Pour projets structurants Life Sciences (biotech, medtech, deeptech)."
      },
      {
        icon: "🎓",
        title: "CPF · Formation dirigeant IA",
        desc: "Pour formation certifiante du dirigeant ou du référent IA interne."
      }
    ],
    casConcret:
      "Sur un accompagnement récent, notre client a obtenu une prise en charge de 50 % via Région IDF + OPCO. Investissement net réduit de moitié."
  },
  "animal-health": {
    aides: [
      {
        icon: "🏛",
        title: "Bpifrance · Diag IA",
        desc: "Subvention pour diagnostic et déploiement IA. Éligibilité PME/ETI françaises."
      },
      {
        icon: "🏛",
        title: "Région (IDF, PACA, AURA, Occitanie…)",
        desc: "Subvention Digitalisation / Santé numérique, selon votre implantation régionale."
      },
      {
        icon: "🎓",
        title: "OPCO Uniformation · Formation AI Literacy",
        desc: "OPCO dédié santé animale et associations vétérinaires. Prise en charge par collaborateur. Obligation légale depuis février 2025."
      },
      {
        icon: "🤝",
        title: "Mécénat d'entreprise",
        desc: "Réduction d'impôt de 60 % pour vos donateurs (dans la limite légale)."
      },
      {
        icon: "🌾",
        title: "FEADER · Numérisation agricole et vétérinaire",
        desc: "Fonds européen pour la modernisation des activités agricoles et vétérinaires."
      },
      {
        icon: "🐾",
        title: "France Relance · Santé animale",
        desc: "Volet dédié à la modernisation des filières santé animale et petfood."
      },
      {
        icon: "🎓",
        title: "CPF · Formation dirigeant IA",
        desc: "Pour formation certifiante du dirigeant ou du référent IA interne."
      }
    ],
    casConcret:
      "Sur un accompagnement récent, notre client a obtenu une prise en charge de 50 % via OPCO Uniformation + Région. Investissement net réduit de moitié."
  }
};

const INCLUS = [
  "Diagnostic éligibilité en Phase 1",
  "Compte rendu d'audit détaillé",
  "Mise en relation avec notre partenaire financement"
];

export default function FinancementsBloc({ vertical }: { vertical: Vertical }) {
  const cfg = CONFIG[vertical];
  return (
    <section className="bg-gradient-to-b from-brand-mint/15 to-white py-10 sm:py-14">
      <div className="container-shell">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-teal/20 bg-white px-4 py-1.5 text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-teal">
          <Coins size={14} />
          Financements mobilisables
        </div>
        <h2 className="mt-3 t-h1 max-w-3xl font-display">
          Jusqu&apos;à{" "}
          <span className="italic text-brand-teal">50 à 60 % de prise en charge</span> selon
          votre éligibilité.
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cfg.aides.map((a) => (
            <article
              key={a.title}
              className="rounded-3xl border border-brand-teal/15 bg-white p-5 shadow-[0_18px_44px_rgba(15,58,60,0.06)]"
            >
              <p className="text-2xl" aria-hidden>
                {a.icon}
              </p>
              <p className="mt-3 font-semibold text-brand-ink">{a.title}</p>
              <p className="mt-2 text-caption text-brand-stone">{a.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-brand-teal/15 bg-white p-6 sm:p-7">
            <p className="eyebrow">Comment obtenir vos financements</p>
            <p className="mt-3 t-body">
              Le montage de vos dossiers de financement est réalisé par{" "}
              <span className="font-semibold text-brand-ink">
                notre partenaire spécialisé
              </span>
              , expert reconnu depuis{" "}
              <span className="font-semibold text-brand-ink">25 ans en Structuration,</span>{" "}
              <span className="font-semibold text-brand-ink">Conformité et Financements</span>{" "}
              publics.
            </p>
            <p className="mt-3 t-body">
              Il s&apos;agit d&apos;une{" "}
              <span className="font-semibold text-brand-ink">prestation distincte</span> de notre
              accompagnement IA. Nous facilitons l&apos;introduction et la coordination avec
              notre partenaire.
            </p>

            <p className="mt-6 text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Ce qui est inclus dans notre accompagnement SKS Talents
            </p>
            <ul className="mt-3 space-y-2">
              {INCLUS.map((i) => (
                <li key={i} className="flex items-start gap-2.5 t-body">
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-brand-teal" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-brand-ink p-6 text-white sm:p-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-mint">
              <Info size={14} />
              Cas concret
            </div>
            <p className="mt-4 t-body !text-white/90">{cfg.casConcret}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
