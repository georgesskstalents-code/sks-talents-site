import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { jobRoles } from "@/data/jobRoles";
import { references } from "@/data/references";
import { investmentFunds } from "@/data/investmentFunds";
import { comparisons } from "@/data/comparisons";
import { marketHubs } from "@/data/marketHubs";
import {
  animalHealthCategories,
  animalHealthHub,
  lifeSciencesCategories,
  lifeSciencesHub
} from "@/data/sectors";

const baseUrl = "https://www.skstalents.fr";

/**
 * Sitemap policy (revisé 2026-05-05 après audit Search Console) :
 *
 *   ✓ Inclus : routes statiques curées + dynamic routes adossées à du contenu
 *     substantiel (jobRoles avec missions ET skills remplis, articles avec
 *     content > 500 chars, references curées, comparisons, marketHubs,
 *     investmentFunds).
 *
 *   ✗ Exclus : seoGrowthPages (SEO bait auto-généré), schools, events, news,
 *     ecosystem dynamic, whitepaper guides, newsletter Notion. Ces pages
 *     restent accessibles par lien direct mais ne sont pas annoncées à Google
 *     pour préserver le crawl budget et concentrer le signal de qualité.
 *
 * Avant cette revision : 621 URLs (audit GSC : ~28 considérées « accessibles »).
 * Après : ~250 URLs ciblées qualité-content.
 */

function hasSubstantialArticle(a: typeof articles[number]): boolean {
  return Boolean(a.slug) && a.content.length > 500 && a.excerpt.length > 80;
}

function hasSubstantialJobRole(r: typeof jobRoles[number]): boolean {
  return (
    Boolean(r.slug) &&
    r.missions.length >= 2 &&
    r.skills.length >= 3 &&
    r.successFactors.length >= 1
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/animal-health",
    "/animal-health/structuration-ia",
    "/blog",
    "/calcul-salaire-brut-net",
    "/contact",
    "/diagnostic",
    "/job-roles",
    "/legal/cgu",
    "/legal/cgv",
    "/legal/charte-recrutement",
    "/legal/mentions-legales",
    "/legal/politique-confidentialite",
    "/legal/politique-cookies",
    "/lexique-life-sciences-rh",
    "/life-sciences",
    "/life-sciences/structuration-ia",
    "/mission",
    "/orientation",
    "/pour-qui",
    "/references",
    "/rejoignez-nous",
    "/services",
    "/resources",
    "/salary-benchmarks",
    "/scorecard-dirigeant",
    "/team"
  ];

  const sectorRoutes = [
    ...lifeSciencesCategories.flatMap((category) => [
      `${lifeSciencesHub.path}/${category.slug}`,
      ...category.pages.map((page) => `${lifeSciencesHub.path}/${category.slug}/${page.slug}`)
    ]),
    ...animalHealthCategories.flatMap((category) => [
      `${animalHealthHub.path}/${category.slug}`,
      ...category.pages.map((page) => `${animalHealthHub.path}/${category.slug}/${page.slug}`)
    ])
  ];

  const dynamicRoutes = [
    ...articles.filter(hasSubstantialArticle).map((a) => `/blog/${a.slug}`),
    ...jobRoles.filter(hasSubstantialJobRole).map((r) => `/job-roles/${r.slug}`),
    ...references.map((r) => `/references/${r.slug}`),
    ...investmentFunds.map((f) => `/investment-funds/${f.slug}`),
    ...comparisons.map((c) => `/comparatifs/${c.slug}`),
    ...marketHubs.map((m) => `/market-hubs/${m.slug}`)
  ];

  const allUrls = [...staticRoutes, ...sectorRoutes, ...dynamicRoutes];

  // Defensive : strip duplicates AND any URL containing /404 (safety net).
  const cleaned = Array.from(new Set(allUrls)).filter((url) => !url.includes("/404"));

  return cleaned.map((url) => ({
    url: `${baseUrl}${url}`,
    changeFrequency: "weekly",
    priority: url === "" ? 1 : url.endsWith("/structuration-ia") ? 0.9 : 0.8,
    lastModified: new Date()
  }));
}
