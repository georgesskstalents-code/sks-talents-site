import type { Metadata } from "next";
import DirectionCPage from "@/components/landings/DirectionCPage";
import { animalHealthContent } from "@/components/landings/directionCContent";
import { getSectorLandingPage } from "@/data/sectorLandingPages";
import FAQSection from "@/components/FAQSection";
import { faqsByPage } from "@/data/faqsByPage";
import { faqNode, orgRef, pageGraph, WEBSITE_ID } from "@/lib/seo";

const page = getSectorLandingPage("animal");

export const metadata: Metadata = {
  title: page.metadata.title,
  description: page.metadata.description,
  keywords: [
    "recrutement animal health",
    "cabinet recrutement sante animale",
    "recrutement diagnostic veterinaire",
    "recrutement cliniques veterinaires",
    "recrutement petfood",
    "executive search animal health",
    "structuration recrutement sante animale"
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
  name: "SKS TALENTS - Executive Search Animal Health",
  url: page.metadata.canonical,
  serviceType: "Executive Search Animal Health",
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
      name: "Animal Health",
      item: page.metadata.canonical
    }
  ]
};

const collectionPageNode = {
  "@type": "CollectionPage",
  name: "Recrutement Animal Health",
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

export default function AnimalHealthHubPage() {
  return (
    <>
      <script
        id="animal-health-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageGraph([breadcrumbNode, collectionPageNode, professionalServiceNode, faqNode(faqsByPage["animal-health"].items)])
          )
        }}
      />
      <DirectionCPage sector={animalHealthContent} />
          <FAQSection eyebrow="FAQ" title={faqsByPage["animal-health"].title} description={faqsByPage["animal-health"].description} items={faqsByPage["animal-health"].items} emitJsonLd={false} />
    </>
  );
}
