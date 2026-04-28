import type { Metadata } from "next";
import Link from "next/link";
import ContentPageSignature from "@/components/ContentPageSignature";
import NewsletterSignupCard from "@/components/NewsletterSignupCard";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import {
  newsletterCadence,
  newsletterEditionExamples,
  newsletterPromisePillars,
  newsletterSegments,
  newsletterWelcomeSequence
} from "@/data/newsletter";
import { getNotionSiteContentList } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Newsletter | SKS TALENTS",
  description:
    "La note SKS TALENTS : une newsletter courte et premium pour suivre les signaux marche, les metiers penuriques, les salaires, l'ecosysteme et les decisions dirigeants."
};

export const dynamic = "force-dynamic";

export default async function NewsletterPage() {
  const newsletterEntries = await getNotionSiteContentList("newsletter", 100);

  return (
    <>
      <PageHero
        kicker="Newsletter"
        title="Une note courte pour mieux lire le marche, les talents et les decisions qui comptent."
        description="Pas une newsletter generique. Une lecture premium pour dirigeants, DRH, CPO et profils en mobilite : signaux marche, metiers penuriques, salaires, ecosysteme et arbitrages utiles. Deux editions par mois, 5 minutes max."
        variant="sand"
      />

      <SectionShell
        eyebrow="Promesse"
        title="Une lettre utile, pas un bruit de plus dans la boite mail."
        description="Chaque edition est pensee comme une lecture courte, sourçable et directement exploitable. Elle sert a garder la bonne lecture du marche avant une decision recrutement, RH ou trajectoire."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {newsletterPromisePillars.map((item) => (
            <div key={item.title} className="card-surface p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                {item.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-brand-stone">{item.description}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Pour qui"
        title="Trois entrees, une meme exigence de lecture."
        description="La newsletter reste courte, mais l'angle change selon le lecteur principal. Le segment choisi sert a mieux qualifier l'inscription et a preparer les bonnes suites."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {newsletterSegments.map((segment) => (
            <div key={segment.id} className="card-surface p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                {segment.label}
              </p>
              <p className="mt-3 text-sm leading-7 text-brand-stone">{segment.description}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Inscription"
        title="Recevoir la note SKS au bon rythme."
        description={`${newsletterCadence.label} : ${newsletterCadence.schedule.toLowerCase()} • ${newsletterCadence.readTime.toLowerCase()}. Chaque edition est editee et validee dans Notion avant de passer en ligne.`}
      >
        <NewsletterSignupCard
          title="Recevoir une lecture marche utile avant qu'elle ne se disperse ailleurs."
          description="Inscrivez-vous pour recevoir une note structuree autour des signaux marche, des metiers penuriques, des salaires, de l'ecosysteme et des decisions dirigeants. La publication ne se fait qu'apres edition et validation dans Notion."
          placement="newsletter-page"
        />
      </SectionShell>

      <SectionShell
        eyebrow="Archive"
        title="Des editions consultables, bonnes pour la confiance, le partage et les moteurs."
        description="L'archive ne montre que les editions publiees. Tout commence par une version editee dans Notion, puis la page apparait ici seulement quand le statut passe a Published."
      >
        {newsletterEntries.length ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {newsletterEntries.map((entry) => (
              <Link
                key={entry.slug}
                href={`/newsletter/${entry.slug}`}
                className="card-surface block p-8 transition hover:-translate-y-1"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  {entry.publishDate || "Edition"} · {entry.vertical || entry.category || "SKS TALENTS"}
                </p>
                <h2 className="mt-3 font-display text-4xl text-brand-ink">{entry.title}</h2>
                <p className="mt-4 text-base leading-8 text-brand-stone">
                  {entry.excerpt || entry.metaDescription || entry.mainContent}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="card-surface p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Archive vide pour l'instant
              </p>
              <h2 className="mt-3 font-display text-4xl text-brand-ink">
                L'archive s'alimente uniquement apres validation Notion.
              </h2>
              <p className="mt-4 text-base leading-8 text-brand-stone">
                Pour publier une edition ici, creez une page dans Notion avec `Content Type =
                newsletter`, renseignez le titre, l'extrait, le contenu, la date et les sources,
                puis passez `Status` a `Published` uniquement apres relecture.
              </p>
            </div>
            <div className="grid gap-4">
              {newsletterEditionExamples.map((item) => (
                <div key={item.title} className="card-surface p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                    Exemple d'edition
                  </p>
                  <h3 className="mt-3 font-display text-3xl text-brand-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-brand-stone">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionShell>

      <SectionShell
        eyebrow="Sequence d'accueil"
        title="Quatre emails de bienvenue, pensés comme une progression."
        description="La sequence existe pour faire avancer la relation sans noyer le lecteur : bienvenue, contenus piliers, piece premium, puis proposition d'echange."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {newsletterWelcomeSequence.map((item) => (
            <div key={item.step} className="card-surface p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                {item.step}
              </p>
              <h3 className="mt-3 font-display text-3xl text-brand-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-brand-stone">{item.description}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <ContentPageSignature description="Newsletter SKS TALENTS : une base de confiance pour centraliser la promesse, l'inscription, l'archive et le workflow editorial Notion avant publication." />
    </>
  );
}
