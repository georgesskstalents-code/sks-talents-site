import type { Metadata } from "next";
import InlineLeadForm from "@/components/InlineLeadForm";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import WebsiteServicesContent from "./components/content";

export const metadata: Metadata = {
  title: "Service Website & Recrutement Digital",
  description:
    "Page service SEO et conversion pour presenter une offre website et recrutement digital en Life Sciences et Animal Health.",
  keywords: [
    "creation website",
    "recrutement",
    "life sciences",
    "animal health",
    "design web",
    "site cabinet de recrutement",
    "page service recrutement"
  ],
  alternates: {
    canonical: "/services/website"
  },
  openGraph: {
    title: "Service Website & Recrutement Digital | SKS TALENTS",
    description:
      "Une page service premium pour convertir sur les offres website, recrutement et structuration RH.",
    url: "https://www.skstalents.fr/services/website",
    type: "article"
  }
};

export default function WebsiteServicesPage() {
  const vimeoId = process.env.VIMEO_VIDEO_ID ?? process.env.NEXT_PUBLIC_VIMEO_VIDEO_ID ?? "851364422";
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Service Website & Recrutement Digital",
    provider: {
      "@type": "Organization",
      name: "SKS TALENTS",
      url: "https://www.skstalents.fr"
    },
    areaServed: "FR",
    serviceType: "Recrutement, structuration RH et page service website",
    url: "https://www.skstalents.fr/services/website",
    description:
      "Offre dediee a la presentation, la conversion et la structuration de services de recrutement en Life Sciences et Animal Health."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "A qui s'adresse cette offre ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Aux dirigeants, DRH, founders et equipes talent qui recrutent sur des marches techniques ou regulés."
        }
      },
      {
        "@type": "Question",
        name: "Combien de temps faut-il pour lancer un recrutement ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le cadrage peut demarrer immediatement et les premiers profils peuvent etre presentes en quelques semaines selon la rarete du poste."
        }
      },
      {
        "@type": "Question",
        name: "Quels secteurs couvrez-vous ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Biotech, diagnostic, medical vet, veterinary services, nutrition animale et petfood premium."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        kicker="Service Website"
        title="Une page premium dédiée à l’offre website et recrutement."
        description="Pensée pour convertir sans casser l’architecture actuelle du site SKS TALENTS, avec des preuves visibles, des CTA clairs et un accès direct à Georges pour le cadrage."
        variant="teal"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Service Website" }
        ]}
      />
      <WebsiteServicesContent vimeoId={vimeoId} />
      <SectionShell
        eyebrow="Preuve sociale"
        title="Des signaux concrets avant le premier échange."
        description="Lien vers Trustpilot, délai moyen, satisfaction visible et références accessibles: l’objectif est de rassurer vite."
      >
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["100+", "placements réussis"],
            ["10 jours", "1re shortlist"],
            ["2 sem.-3 mois", "mission prioritaire ou de direction"],
            ["4,5/5", "Trustpilot · 13 avis"]
          ].map(([value, label]) => (
            <div key={label} className="card-surface p-6">
              <p className="text-4xl font-semibold text-brand-teal">{value}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-brand-stone">{label}</p>
            </div>
          ))}
        </div>
        <a
          href="https://fr.trustpilot.com/review/skstalents.fr"
          target="_blank"
          rel="noreferrer noopener"
          className="mt-5 inline-flex text-sm font-semibold text-brand-teal"
        >
          Voir les avis Trustpilot
        </a>
      </SectionShell>
      <SectionShell
        eyebrow="Parler à SKS TALENTS"
        title="Un formulaire court pour les demandes les plus chaudes."
        description="Si le besoin est déjà clair, inutile d’attendre la page contact."
      >
        <InlineLeadForm
          title="Être rappelé depuis la page service"
          description="Laissez vos coordonnées et votre besoin sera envoyé directement à infos@skstalents.com."
          role="Direction / Talent"
          sector="Life Sciences"
        />
      </SectionShell>
    </>
  );
}
