import type { Metadata } from "next";
import DirectionCPage from "@/components/landings/DirectionCPage";
import { lifeSciencesContent } from "@/components/landings/directionCContent";
import { getSectorLandingPage } from "@/data/sectorLandingPages";
import FAQSection from "@/components/FAQSection";
import { faqsByPage } from "@/data/faqsByPage";
import { faqNode, orgRef, pageGraph, WEBSITE_ID } from "@/lib/seo";

const page = getSectorLandingPage("life");

export const metadata: Metadata = {
  title: page.metadata.title,
  description: page.metadata.description,
  keywords: [
    "recrutement life sciences",
    "cabinet recrutement biotech",
    "recrutement diagnostic ivd ngs",
    "executive search life sciences",
    "RPO life sciences",
    "structuration recrutement life sciences",
    "recrutement e-sante",
    "recrutement robotique sante"
  ],
  alternates: {
    canonical: page.metadata.canonical
  },
  openGraph: {
    title: page.metadata.title,
    description: page.metadata.description,
    type: "website",
    locale: "fr_FR",
    url: page.metadata.canonical,
    siteName: "SKS TALENTS"
  },
  twitter: {
    card: "summary_large_image",
    title: page.metadata.title,
    description: page.metadata.description
  },
  robots: {
    index: true,
    follow: true
  }
};

const professionalServiceNode = {
  "@type": "ProfessionalService",
  "@id": `${page.metadata.canonical}#service`,
  name: "SKS TALENTS - Executive Search Life Sciences",
  url: page.metadata.canonical,
  serviceType: "Executive Search Life Sciences",
  description: page.metadata.description,
  areaServed: [
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Europe" }
  ],
  availableLanguage: ["French", "English"],
  provider: orgRef
};

const breadcrumbNode = {
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://www.skstalents.fr"
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Life Sciences",
      item: page.metadata.canonical
    }
  ]
};

const collectionPageNode = {
  "@type": "CollectionPage",
  name: "Recrutement Life Sciences",
  url: page.metadata.canonical,
  description: page.metadata.description,
  about: page.verticals.map((item) => item.name),
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: page.strategicLinks.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      url: `https://www.skstalents.fr${item.href}`
    }))
  }
};

export default function LifeSciencesHubPage() {
  return (
    <>
      <script
        id="life-sciences-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageGraph([breadcrumbNode, collectionPageNode, professionalServiceNode, faqNode(faqsByPage["life-sciences"].items)])
          )
        }}
      />
      <DirectionCPage sector={lifeSciencesContent} />
          <FAQSection eyebrow="FAQ" title={faqsByPage["life-sciences"].title} description={faqsByPage["life-sciences"].description} items={faqsByPage["life-sciences"].items} emitJsonLd={false} />
    </>
  );
}
