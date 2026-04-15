import type { Metadata } from "next";
import Link from "next/link";
import OrientationAgent from "@/components/OrientationAgent";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import { schools } from "@/data/resources";

export const metadata: Metadata = {
  title: "Orientation carrière Life Sciences & Animal Health",
  description:
    "Agent d’orientation SKS TALENTS pour étudiants, jeunes diplômés et lycéens français en Afrique: biotech, medtech, cosmétique, santé animale et métiers vétérinaires.",
  keywords: [
    "orientation life sciences",
    "orientation carrière biotech",
    "bilan de carrière life sciences",
    "évolution professionnelle santé animale",
    "métier biotech étudiant",
    "orientation lycée français afrique",
    "orientation biotech sénégal",
    "orientation medtech maroc",
    "orientation santé animale cote d'ivoire"
  ]
};

export default function OrientationPage() {
  const featuredSchools = schools
    .filter((school) => ["Biotech", "Life Sciences", "MedTech", "Cosmétique"].includes(school.sector))
    .slice(0, 6);

  return (
    <>
      <PageHero
        kicker="Orientation"
        title="S’orienter entre biotech, diagnostic, santé animale et petfood."
        description="Un agent pensé pour les étudiants, jeunes diplômés, lycéens français en Afrique et profils en réflexion, avec une passerelle claire vers un bilan de carrière approfondi pour les professionnels déjà en poste."
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Orientation" }
        ]}
      />
      <SectionShell
        eyebrow="Afrique francophone"
        title="Un point d’entrée utile aussi pour les lycéens des écoles françaises en Afrique."
        description="Le contenu orientation est pensé pour capter les recherches faites depuis le Sénégal, la Côte d’Ivoire, le Congo, le Bénin ou le Maroc par des profils qui veulent comprendre les métiers biotech, medtech, cosmétique ou santé animale."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {["Sénégal", "Côte d’Ivoire", "Congo", "Bénin", "Maroc"].map((country) => (
            <div key={country} className="card-surface p-5 text-center text-sm font-semibold text-brand-stone">
              {country}
            </div>
          ))}
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Parcours"
        title="Un modèle plus utile qu’un simple quiz générique."
        description="Nous reprenons ce qui fonctionne dans les expériences étudiantes efficaces: des débouchés lisibles, des parcours de formation visibles, puis un agent qui affine selon votre profil, vos appétences et votre secteur visé."
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
          <div className="card-surface p-8">
            <h3 className="font-display text-3xl text-brand-ink">Étudiants & post-bac</h3>
            <p className="mt-4 text-sm leading-7 text-brand-stone">
              BTS, BUT, licence, master, école d’ingénieurs: comprendre les passerelles avant de choisir un
              domaine trop vite.
            </p>
          </div>
          <div className="card-surface p-8">
            <h3 className="font-display text-3xl text-brand-ink">Jeunes diplômés</h3>
            <p className="mt-4 text-sm leading-7 text-brand-stone">
              Clarifier les métiers réalistes à 0-3 ans d’expérience et les secteurs où vos compétences
              sont déjà convertibles.
            </p>
          </div>
          <div className="card-surface p-8">
            <h3 className="font-display text-3xl text-brand-ink">Professionnels en poste</h3>
            <p className="mt-4 text-sm leading-7 text-brand-stone">
              Basculer vers un bilan approfondi lorsqu’il faut parler repositionnement, mobilité, salaire et
              trajectoire de carrière.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href="/orientation/biotechnologies"
            className="inline-flex rounded-full border border-brand-teal/25 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
          >
            Voir le guide orientation biotechnologies
          </Link>
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Agent"
        title="Deux parcours pour éviter les conseils hors-sol."
        description="Le parcours étudiant reste actionnable et léger. Le parcours professionnel, lui, redirige vers une démarche plus approfondie chez Purple."
      >
        <OrientationAgent />
      </SectionShell>
      <SectionShell
        eyebrow="Écoles & débouchés"
        title="Quelques établissements utiles pour démarrer l’exploration."
        description="Ces écoles et universités servent de points d’entrée pour croiser formation, bassin de talents et débouchés par secteur."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredSchools.map((school) => (
            <Link
              key={school.slug}
              href={`/schools/${school.slug}`}
              className="card-surface block p-6 transition hover:-translate-y-1"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
                {school.sector} · {school.location}
              </p>
              <h3 className="mt-3 font-display text-3xl text-brand-ink">{school.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{school.summary}</p>
            </Link>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
