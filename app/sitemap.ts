import type { MetadataRoute } from "next";
import { fileLastmod, notInFuture } from "@/lib/sitemapLastmod";
import { jobRoleIndexing } from "@/lib/jobRoleIndexing";
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
 *
 * Pour ajouter un nouveau type de contenu : (1) garantir un page renderer +
 * data backing solide, (2) ajouter un filtre `hasSubstance` ici.
 */

function hasSubstantialArticle(a: typeof articles[number]): boolean {
  return Boolean(a.slug) && a.content.length > 500 && a.excerpt.length > 80;
}

const jobRoleSlugs = new Set(jobRoles.map((r) => r.slug));

function hasSubstantialJobRole(r: typeof jobRoles[number]): boolean {
  if (!r.slug || r.missions.length < 2 || r.skills.length < 3 || r.successFactors.length < 1) {
    return false;
  }
  // Les fiches en noindex et celles canonicalisees vers une autre URL n'ont
  // rien a faire dans le sitemap : on n'annonce que les URLs a indexer.
  return jobRoleIndexing(r.slug, (slug) => jobRoleSlugs.has(slug)).mode === "index";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/animal-health",
    "/animal-health/structuration-ia",
    "/barometre-life-sciences-2026-2027",
    "/benin",
    "/blog",
    "/calcul-salaire-brut-net",
    "/cas-d-usage",
    "/comparatifs",
    "/contact",
    "/cote-divoire",
    "/cout-mauvais-recrutement",
    "/diagnostic",
    "/france",
    "/investment-funds",
    "/job-roles",
    "/legal/cgu",
    "/legal/cgv",
    "/legal/charte-recrutement",
    "/legal/mentions-legales",
    "/legal/politique-confidentialite",
    "/legal/politique-cookies",
    "/lexique-life-sciences-rh",
    "/life-sciences",
    "/life-sciences/cosmetique",
    "/life-sciences/structuration-ia",
    "/market-hubs",
    "/mission",
    "/orientation",
    "/pour-qui",
    "/references",
    "/resources",
    "/salary-benchmarks",
    "/scorecard-dirigeant",
    "/senegal",
    "/services",
    "/structuration-rh",
    "/team"
  ];

  // Sectoral sub-routes (re-exporting rich content components).
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

  // Date de derniere modification par URL, issue du contenu quand il en porte
  // une, sinon du dernier commit du fichier de donnees qui alimente la page.
  const articleLastmod = new Map<string, string>(
    articles.map((a) => [`/blog/${a.slug}`, notInFuture(a.date)])
  );
  const jobRoleLastmod = new Map<string, string>(
    jobRoles.map((r) => [
      `/job-roles/${r.slug}`,
      notInFuture(r.publishDate || fileLastmod("data/jobRoles.ts"))
    ])
  );

  const sourceLastmod: Array<[string, string]> = [
    ["/references/", fileLastmod("data/references.ts")],
    ["/investment-funds/", fileLastmod("data/investmentFunds.ts")],
    ["/comparatifs/", fileLastmod("data/comparisons.ts")],
    ["/market-hubs/", fileLastmod("data/marketHubs.ts")],
    ["/life-sciences/", fileLastmod("data/sectors.ts")],
    ["/animal-health/", fileLastmod("data/sectors.ts")]
  ];

  const staticLastmod = fileLastmod("app/(routes)");

  function lastModifiedFor(url: string): string {
    const article = articleLastmod.get(url);
    if (article) return article;
    const jobRole = jobRoleLastmod.get(url);
    if (jobRole) return jobRole;
    const matched = sourceLastmod.find(([prefix]) => url.startsWith(prefix));
    if (matched) return matched[1];
    return staticLastmod;
  }

  // Frequence differenciee : un job-role bouge une fois par an, un article
  // rarement apres publication, une page service quelques fois par an.
  function changeFrequencyFor(url: string): "daily" | "weekly" | "monthly" | "yearly" {
    if (url === "" || url === "/blog") return "weekly";
    if (url.startsWith("/blog/")) return "monthly";
    if (url.startsWith("/job-roles")) return "yearly";
    if (url.startsWith("/legal/")) return "yearly";
    if (url.startsWith("/references/") || url.startsWith("/investment-funds/")) return "yearly";
    return "monthly";
  }

  return cleaned.map((url) => ({
    url: `${baseUrl}${url}`,
    changeFrequency: changeFrequencyFor(url),
    priority: url === "" ? 1 : url.endsWith("/structuration-ia") ? 0.9 : 0.8,
    lastModified: lastModifiedFor(url)
  }));
}
