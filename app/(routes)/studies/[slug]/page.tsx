import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContentPageSignature from "@/components/ContentPageSignature";
import EditorialContentLayout, {
  EditorialContentHero,
  getEditorialHeroImage
} from "@/components/EditorialContentLayout";
import InlineLeadForm from "@/components/InlineLeadForm";
import SectionShell from "@/components/SectionShell";
import { articles } from "@/data/articles";
import { ecosystemDetailedPages, ecosystemStudy } from "@/data/ecosystemTargets";
import { events, schools } from "@/data/resources";
import { investmentFunds } from "@/data/investmentFunds";
import { jobRoles } from "@/data/jobRoles";
import { references } from "@/data/references";
import { getNotionSiteContentBySlug } from "@/lib/notion";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return [{ slug: ecosystemStudy.slug }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === ecosystemStudy.slug) {
    return {
      title: ecosystemStudy.title,
      description: ecosystemStudy.summary
    };
  }

  const notionStudy = await getNotionSiteContentBySlug(slug, "study");
  if (!notionStudy) {
    return {};
  }

  return {
    title: notionStudy.seoTitle || notionStudy.title,
    description: notionStudy.metaDescription || notionStudy.excerpt,
    openGraph: notionStudy.heroImageUrl
      ? {
          images: [
            {
              url: notionStudy.heroImageUrl,
              alt: notionStudy.heroImageAlt || notionStudy.title
            }
          ]
        }
      : undefined
  };
}

export default async function StudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const notionStudy = slug === ecosystemStudy.slug ? null : await getNotionSiteContentBySlug(slug, "study");

  if (slug !== ecosystemStudy.slug && !notionStudy) {
    notFound();
  }

  if (notionStudy) {
    const body = notionStudy.mainContent || notionStudy.excerpt;
    const paragraphs = body.split("\n\n").filter(Boolean);
    const heroVisual = notionStudy.heroImageUrl
      ? {
          src: notionStudy.heroImageUrl,
          alt: notionStudy.heroImageAlt || `Illustration pour ${notionStudy.title}`
        }
      : getEditorialHeroImage({
          slug,
          title: notionStudy.title,
          topicLabel: notionStudy.category || "study",
          verticalLabel: notionStudy.vertical || "Livre blanc"
        });

    return (
      <>
        <EditorialContentLayout
          badge={notionStudy.vertical || "Livre blanc"}
          title={notionStudy.title}
          description={notionStudy.excerpt || notionStudy.metaDescription}
          imageSrc={heroVisual.src}
          imageAlt={heroVisual.alt}
        >
          <div className="space-y-6 text-base leading-8 text-brand-stone">
            <div className="rounded-[22px] border border-brand-teal/12 bg-white/80 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Repères
              </p>
              <p className="mt-3 text-sm leading-7 text-brand-stone">
                CEO, COO, CPO, DRH
              </p>
              <p className="mt-2 text-sm leading-7 text-brand-stone">
                Livre blanc SKS TALENTS pour transformer un sujet RH, marché ou organisationnel en décision exploitable.
              </p>
            </div>
            {paragraphs.map((paragraph, index) => (
              <p
                key={`${slug}-${index}`}
                className={index === 0 ? "text-lg leading-9 text-brand-ink" : undefined}
              >
                {paragraph}
              </p>
            ))}
            {notionStudy.sourceName && notionStudy.sourceUrl ? (
              <div className="rounded-[24px] border border-brand-teal/10 bg-brand-mint/35 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  Source officielle
                </p>
                <a
                  href={notionStudy.sourceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-4 inline-flex text-sm font-semibold text-brand-teal transition hover:opacity-80"
                >
                  {notionStudy.sourceName}
                </a>
              </div>
            ) : null}
          </div>
        </EditorialContentLayout>
        <SectionShell
          eyebrow="Passer à l’action"
          title="Recevoir le livre blanc et cadrer le prochain échange."
          description="Laissez vos coordonnées si vous voulez utiliser cette lecture pour structurer une équipe, cadrer un besoin RH ou prioriser un sujet de recrutement."
        >
          <InlineLeadForm
            title="Recevoir un rappel à partir de ce livre blanc"
            description="Un échange confidentiel pour relier ce contenu à votre contexte d’entreprise."
            role="Direction / RH"
            sector={notionStudy.vertical || "Cross-sector"}
            compact
          />
        </SectionShell>
        <ContentPageSignature description="Étude éditée par SKS TALENTS pour transformer un sujet RH, marché ou organisationnel en décision exploitable par des dirigeants et des équipes RH." />
      </>
    );
  }

  const insightMetrics = [
    { label: "Pages écoles publiées", value: schools.length, tint: "bg-brand-teal" },
    { label: "Fiches métiers publiées", value: jobRoles.length, tint: "bg-[#163334]" },
    { label: "Articles blog publiés", value: articles.length, tint: "bg-brand-teal" },
    { label: "Profils fonds publiés", value: investmentFunds.length, tint: "bg-[#163334]" },
    { label: "Références clients publiées", value: references.length, tint: "bg-brand-teal" },
    { label: "Événements publiés", value: events.length, tint: "bg-[#163334]" }
  ];
  const maxMetric = Math.max(...insightMetrics.map((item) => item.value));
  const citations = [
    { label: "France Biotech", href: "https://www.france-biotech.fr/" },
    { label: "Bpifrance", href: "https://www.bpifrance.fr/" },
    { label: "Seventure Partners", href: "https://www.seventure.fr/en/" },
    { label: "BioFIT", href: "https://www.biofit-event.com/" },
    { label: "MEDFIT", href: "https://www.medfit-event.com/" }
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Pourquoi cette étude est-elle utile à un cabinet de recrutement spécialisé ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Parce qu’elle relie écosystème, métiers, écoles, funding et signaux de marché dans une seule lecture exploitable commercialement."
        }
      },
      {
        "@type": "Question",
        name: "Que peut-on faire après avoir lu cette étude ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La transformer en page de preuve, en angle d’approche, en contenu LinkedIn et en porte d’entrée vers un échange avec SKS TALENTS."
        }
      }
    ]
  };
  const ecosystemHeroVisual = getEditorialHeroImage({
    slug: ecosystemStudy.slug,
    title: ecosystemStudy.title,
    topicLabel: "market",
    verticalLabel: "Life Sciences"
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EditorialContentHero
        badge="Étude signature"
        title={ecosystemStudy.title}
        description={ecosystemStudy.subtitle}
        imageSrc={ecosystemHeroVisual.src}
        imageAlt={ecosystemHeroVisual.alt}
      />

      <SectionShell
        eyebrow="Positionnement"
        title="Pourquoi cette étude existe."
        description="Cette étude est conçue comme un contenu signature SKS TALENTS: utile pour Google, exploitable par vos prospects et suffisamment claire pour être relayée dans des environnements conversationnels."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Les 5 signaux
            </p>
            <ol className="mt-4 space-y-3 text-sm leading-7 text-brand-stone">
              <li>Les recrutements se débloquent là où écosystème, financement et spécialisation se rejoignent.</li>
              <li>Les pages écoles et viviers deviennent des portes d’entrée SEO très qualifiées.</li>
              <li>Les entreprises attendent des partenaires capables de contextualiser le marché, pas seulement de sourcer.</li>
              <li>Les métiers hybrides data, réglementaire, produit et scientifique gagnent du poids.</li>
              <li>Les contenus les plus performants relient secteur, rôle, salaire, parcours et signaux business.</li>
            </ol>
          </div>
          <div className="card-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Méthode
            </p>
            <p className="mt-4 text-sm leading-7 text-brand-stone">
              Cette lecture s’appuie sur l’expérience sectorielle SKS TALENTS, sur les contenus publiés
              sur le site, sur la structuration des écosystèmes ciblés et sur l’observation des points
              de contact entre entreprises, viviers de formation, réseaux et événements spécialisés.
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Applications"
        title="Comment utiliser cette étude concrètement."
        description="L’enjeu n’est pas seulement d’informer. Il s’agit de transformer cette étude en actif commercial, SEO et relationnel."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {ecosystemDetailedPages.map((page) => (
            <Link
              key={page.slug}
              href={`/ecosystem/${page.slug}`}
              className="card-surface block p-5 transition hover:-translate-y-1"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                {page.kicker}
              </p>
              <h3 className="mt-3 font-display text-3xl text-brand-ink">{page.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{page.description}</p>
            </Link>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Données propriétaires"
        title="Quelques signaux internes déjà exploitables."
        description="Ces mini-graphiques ne prétendent pas résumer tout le marché. Ils montrent la profondeur du corpus SKS TALENTS déjà disponible pour travailler votre visibilité et vos contenus."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {insightMetrics.map((metric) => (
            <div key={metric.label} className="card-surface p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                    Signal
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-brand-ink">{metric.label}</h3>
                </div>
                <p className="text-4xl font-semibold text-brand-ink">{metric.value}</p>
              </div>
              <div className="mt-5 h-3 rounded-full bg-brand-mint/60">
                <div
                  className={`h-3 rounded-full ${metric.tint}`}
                  style={{ width: `${Math.max(18, (metric.value / maxMetric) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Citations"
        title="Références et réseaux à relier à cette étude."
        description="Une étude crédible gagne en force lorsqu’elle est reliée à des réseaux identifiables, à des institutions et à des événements reconnus."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {citations.map((citation) => (
            <a
              key={citation.href}
              href={citation.href}
              target="_blank"
              rel="noreferrer noopener"
              className="card-surface block p-5 transition hover:-translate-y-1"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Source
              </p>
              <h3 className="mt-3 font-display text-3xl text-brand-ink">{citation.label}</h3>
            </a>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Activation"
        title="Ce que SKS TALENTS peut en faire ensuite."
        description="Une fois cette page publiée, elle peut alimenter vos relances, votre maillage interne et vos prises de parole externes."
      >
        <div className="card-surface p-6">
          <ul className="space-y-3 text-sm leading-7 text-brand-stone">
            <li>Relier chaque page service à au moins un signal marché issu de l’étude.</li>
            <li>Créer des extraits LinkedIn ou newsletter à partir des 5 signaux.</li>
            <li>Utiliser l’étude comme angle d’approche pour écoles, clusters, médias et partenaires.</li>
            <li>Mettre à jour la page chaque trimestre pour la garder vivante et citée.</li>
          </ul>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Passer à l’action"
        title="Transformer l’étude en discussion business."
        description="Si cette lecture résonne avec votre contexte, le plus simple est d’ouvrir un échange."
      >
        <InlineLeadForm
          title="Échanger à partir de cette étude"
          description="Laissez vos coordonnées pour être recontacté rapidement, ou poursuivez vers Calendly depuis le sticky CTA mobile."
          role="Direction / Talent"
          sector="Life Sciences"
          compact
        />
      </SectionShell>
      <ContentPageSignature description="Étude signature éditée par SKS TALENTS pour transformer une lecture sectorielle en actif SEO, commercial et conversationnel durable." />
    </>
  );
}
