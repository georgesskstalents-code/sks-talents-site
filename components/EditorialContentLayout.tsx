import Image from "next/image";
import type { ReactNode } from "react";
import { editorialHeroImages } from "@/data/editorialHeroImages.generated";
import styles from "./EditorialContentLayout.module.css";

type HeroProps = {
  badge: string;
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
};

type LayoutProps = HeroProps & {
  children: ReactNode;
};

const DEFAULT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80";

type EditorialHeroImageInput = {
  slug?: string;
  title?: string;
  topicLabel?: string;
  verticalLabel?: string;
};

const heroImageCatalog = {
  strategy: {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    alt: "Réunion stratégique autour d'un sujet RH, marché ou organisationnel"
  },
  workshop: {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    alt: "Atelier collaboratif autour des compétences, du management et de l'exécution"
  },
  diagnostic: {
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    alt: "Réunion de travail autour d'indicateurs, de diagnostic et de pilotage"
  },
  animal: {
    src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1600&q=80",
    alt: "Sujet lié à la santé animale, aux services vétérinaires ou au petcare"
  },
  lab: {
    src: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1600&q=80",
    alt: "Environnement de recherche, biotech et laboratoire"
  },
  hiring: {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    alt: "Équipe en échange autour d'un sujet de recrutement et de structuration"
  },
  salary: {
    src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
    alt: "Analyse de données RH, rémunération et arbitrages employeur"
  },
  student: {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    alt: "Parcours étudiants, orientation et montée en compétences"
  }
} as const;

const keywordMatchers: Array<{
  keywords: string[];
  image: keyof typeof heroImageCatalog;
}> = [
  { keywords: ["salaire", "salaires", "remuneration", "remunerations", "egalite", "egalite", "absenteisme", "depression", "enceinte", "licenciement", "qvct"], image: "salary" },
  { keywords: ["orientation", "lycee", "lycees", "ecole", "ecoles", "devenir", "etudiant", "etudiants"], image: "student" },
  { keywords: ["recrutement", "hiring", "talent", "staffing", "shortage", "shortlist", "rpo"], image: "hiring" },
  { keywords: ["crispr", "arn", "cell", "immunotherapy", "synthetic", "therapy", "genomics", "precision-medicine", "biotech"], image: "lab" },
  { keywords: ["ngs", "pcr", "molecular", "diagnostics", "diagnostic", "ivd", "imaging", "poct"], image: "diagnostic" },
  { keywords: ["skills", "soft", "careers", "roles", "leadership", "ia", "ai", "cybersecurity", "digital", "telemedicine"], image: "workshop" },
  { keywords: ["veterinary", "veterinaire", "vet", "animal", "antiparasitic", "vaccine", "pharma-vet", "clinic"], image: "animal" },
  { keywords: ["petfood", "pet", "nutrition", "diet", "protein", "premium-brands", "quality-assurance"], image: "animal" }
];

export function getEditorialHeroImage({
  slug,
  title,
  topicLabel,
  verticalLabel
}: EditorialHeroImageInput = {}) {
  if (slug && slug in editorialHeroImages) {
    return editorialHeroImages[slug as keyof typeof editorialHeroImages];
  }

  const haystack = [slug, title, topicLabel, verticalLabel]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  for (const matcher of keywordMatchers) {
    if (matcher.keywords.some((keyword) => haystack.includes(keyword))) {
      return heroImageCatalog[matcher.image];
    }
  }

  if ((topicLabel || "").toLowerCase().includes("skills")) {
    return heroImageCatalog.workshop;
  }

  if ((verticalLabel || "").toLowerCase().includes("diagnostic")) {
    return heroImageCatalog.diagnostic;
  }

  if ((verticalLabel || "").toLowerCase().match(/animal|petfood|veter/)) {
    return heroImageCatalog.animal;
  }

  return heroImageCatalog.strategy;
}

export function EditorialContentHero({
  badge,
  title,
  description,
  imageSrc = DEFAULT_HERO_IMAGE,
  imageAlt = "Réunion stratégique autour d'un sujet RH, marché ou organisationnel"
}: HeroProps) {
  const isArbitraryRemoteImage =
    /^https?:\/\//.test(imageSrc) &&
    !imageSrc.includes("images.unsplash.com") &&
    !imageSrc.includes("upload.wikimedia.org");

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroShell}>
        <div className={styles.imageFrame}>
          {isArbitraryRemoteImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt={imageAlt}
              className={styles.image}
            />
          ) : (
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1600}
              height={900}
              className={styles.image}
              priority
              unoptimized={imageSrc.includes("upload.wikimedia.org")}
            />
          )}
        </div>

        <div className={styles.badgeWrap}>
          <span className={styles.badge}>{badge}</span>
        </div>

        <div className={styles.brandLockup}>
          <div className={styles.brandLogoShell}>
            <Image
              src="/brand/logo-sks-talents-signature.svg"
              alt="SKS TALENTS"
              width={112}
              height={35}
              className={styles.brandLogo}
              priority
            />
          </div>
          <p className={styles.brandTagline}>Your Talents, Our Future</p>
          <p className={styles.brandSignature}>SKS TALENTS</p>
        </div>

        <h1 className={styles.title}>{title}</h1>
        {description ? <p className={styles.subtitle}>{description}</p> : null}
      </div>
    </section>
  );
}

export default function EditorialContentLayout({
  badge,
  title,
  description,
  imageSrc,
  imageAlt,
  children
}: LayoutProps) {
  return (
    <>
      <EditorialContentHero
        badge={badge}
        title={title}
        description={description}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
      />
      <section className={styles.bodyShell}>
        <div className={styles.bodyInner}>
          <article className={styles.article}>
            <div className={styles.content}>{children}</div>
          </article>
        </div>
      </section>
    </>
  );
}
