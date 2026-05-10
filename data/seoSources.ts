import { trackedInvestmentFundsDirectory } from "./investmentFunds";

/**
 * Sources de scraping pour la génération hebdomadaire de mots-clés SEO.
 *
 * Composition :
 *   - investmentFunds (23 fonds, France Biotech 2024) → vocabulaire VC santé
 *   - ecosystemPartners (clusters, syndicats) → vocabulaire institutionnel
 *   - executiveSearchCompetitors → vocabulaire des cabinets concurrents
 *   - keyMediaSources → médias spécialisés Life Sciences
 *
 * Chaque entrée a un `url`, un `category` et un `weight` pour pondérer
 * les mots-clés extraits (les concurrents directs comptent plus que les
 * sources contextuelles).
 */

export type SeoSource = {
  name: string;
  url: string;
  category: "fund" | "ecosystem" | "competitor" | "media";
  weight: number; // 1 = baseline, 2 = direct competitor, 3 = top reference
};

const fundSources: SeoSource[] = trackedInvestmentFundsDirectory
  .filter((f) => f.href && f.href.startsWith("http"))
  .slice(0, 12) // 12 funds is plenty for keyword diversity
  .map((f) => ({ name: f.manager, url: f.href, category: "fund" as const, weight: 1 }));

const ecosystemPartners: SeoSource[] = [
  { name: "France Biotech", url: "https://france-biotech.fr/", category: "ecosystem", weight: 2 },
  { name: "France Deeptech", url: "https://www.francedeeptech.fr/", category: "ecosystem", weight: 1 },
  { name: "Medicen Paris Region", url: "https://www.medicen.org/", category: "ecosystem", weight: 1 },
  { name: "Lyonbiopôle", url: "https://www.lyonbiopole.com/", category: "ecosystem", weight: 1 },
  { name: "Eurobiomed", url: "https://www.eurobiomed.org/", category: "ecosystem", weight: 1 },
  { name: "BioValley France", url: "https://www.biovalley-france.com/", category: "ecosystem", weight: 1 },
  { name: "Polepharma", url: "https://www.polepharma.com/", category: "ecosystem", weight: 1 },
  { name: "Cosmetic Valley", url: "https://www.cosmetic-valley.com/", category: "ecosystem", weight: 1 },
  { name: "EuropaBio", url: "https://www.europabio.org/", category: "ecosystem", weight: 1 },
  { name: "Bpifrance Hub HealthTech", url: "https://lehub.bpifrance.fr/secteur/health-deeptech/", category: "ecosystem", weight: 2 }
];

/**
 * Cabinets executive search Life Sciences / Health concurrents directs.
 * Combinaison globaux (Korn Ferry, Russell Reynolds, etc.) + spécialisés santé.
 * Weight élevé : ce sont des sources directes pour le vocabulaire métier.
 */
const executiveSearchCompetitors: SeoSource[] = [
  { name: "Korn Ferry - Healthcare", url: "https://www.kornferry.com/industries/life-sciences-healthcare", category: "competitor", weight: 3 },
  { name: "Russell Reynolds - Healthcare", url: "https://www.russellreynolds.com/en/industries/healthcare", category: "competitor", weight: 3 },
  { name: "Heidrick & Struggles - Healthcare", url: "https://www.heidrick.com/en/industries/healthcare-life-sciences", category: "competitor", weight: 3 },
  { name: "Egon Zehnder - Healthcare", url: "https://www.egonzehnder.com/industries/healthcare", category: "competitor", weight: 3 },
  { name: "Spencer Stuart - Healthcare", url: "https://www.spencerstuart.com/our-expertise/healthcare", category: "competitor", weight: 3 },
  { name: "Odgers Berndtson - Healthcare", url: "https://www.odgersberndtson.com/en/industries/healthcare-life-sciences", category: "competitor", weight: 2 },
  { name: "Witt/Kieffer (Healthcare exec search)", url: "https://www.wittkieffer.com/", category: "competitor", weight: 2 },
  { name: "Caliopa", url: "https://www.caliopa.com/", category: "competitor", weight: 2 },
  { name: "MD Search (FR)", url: "https://www.mdsearch.fr/", category: "competitor", weight: 2 }
];

/**
 * Médias / publications spécialisées (volume éditorial fort, vocabulaire à jour).
 */
const keyMediaSources: SeoSource[] = [
  { name: "BioPharma Dive", url: "https://www.biopharmadive.com/", category: "media", weight: 1 },
  { name: "Endpoints News", url: "https://endpts.com/", category: "media", weight: 1 },
  { name: "Labiotech.eu", url: "https://www.labiotech.eu/", category: "media", weight: 2 },
  { name: "FierceBiotech", url: "https://www.fiercebiotech.com/", category: "media", weight: 1 },
  { name: "MedTech Dive", url: "https://www.medtechdive.com/", category: "media", weight: 1 },
  { name: "Vet'Argus (vétérinaire)", url: "https://www.vet-argus.fr/", category: "media", weight: 1 }
];

export const seoSources: SeoSource[] = [
  ...fundSources,
  ...ecosystemPartners,
  ...executiveSearchCompetitors,
  ...keyMediaSources
];
