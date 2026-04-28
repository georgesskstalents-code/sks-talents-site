import Link from "next/link";
import ContentPageSignature from "@/components/ContentPageSignature";
import PageHero from "@/components/PageHero";

const audiences = [
  {
    title: "Dirigeants",
    copy: "Pour les CEO, COO, fondateurs et associés qui veulent gagner du temps, prioriser mieux leurs recrutements et éviter qu’un sujet RH mal cadré ne freine la croissance."
  },
  {
    title: "RH / CPO / DRH",
    copy: "Pour les équipes RH qui veulent mieux structurer le recrutement, fluidifier les process, automatiser ce qui doit l’être et mieux dialoguer avec le business."
  },
  {
    title: "Candidats",
    copy: "Pour les profils qui veulent comprendre les marchés Life Sciences, Animal Health, healthtech, diagnostic et les rôles à fort impact."
  },
  {
    title: "Étudiants",
    copy: "Pour les étudiants et jeunes talents qui cherchent des repères concrets sur les métiers, écoles, signaux marché et trajectoires crédibles."
  }
];

export const metadata = {
  title: "Pour qui ce site est utile | SKS TALENTS",
  description:
    "Une page claire pour comprendre à qui s’adresse SKS TALENTS : dirigeants, RH, candidats et étudiants sur les marchés Life Sciences et Animal Health.",
  alternates: {
    canonical: "https://www.skstalents.fr/pour-qui"
  }
};

export default function PourQuiPage() {
  return (
    <>
      <PageHero
        kicker="Pour qui"
        title="Le site est utile à ceux qui ont besoin de décider plus vite sur des marchés complexes."
        description="SKS TALENTS ne s’adresse pas à une seule audience. Le site a été conçu pour quatre publics différents, avec un même angle : rendre le marché plus lisible et plus actionnable."
        variant="sand"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Pour qui" }
        ]}
      />

      <section className="container-shell pb-8 sm:pb-12">
        <div className="grid gap-5 lg:grid-cols-2">
          {audiences.map((audience) => (
            <article key={audience.title} className="card-surface h-full p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">{audience.title}</p>
              <p className="mt-4 text-base leading-8 text-brand-stone">{audience.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-12">
        <div className="card-surface p-8 text-center sm:p-10">
          <p className="eyebrow">Accès utiles</p>
          <h2 className="mt-3 font-display text-5xl text-brand-ink sm:text-6xl">
            Choisissez la bonne porte d’entrée.
          </h2>
          <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Diagnostic", "/diagnostic"],
              ["Lexique RH", "/lexique-life-sciences-rh"],
              ["Cas d’usage", "/cas-d-usage"],
              ["Abonnement", "/abonnement"]
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center justify-center rounded-full border border-brand-teal/20 bg-white px-6 py-4 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContentPageSignature description="Page éditée par SKS TALENTS pour clarifier à qui la plateforme est utile et comment chaque audience peut l’utiliser." />
    </>
  );
}
