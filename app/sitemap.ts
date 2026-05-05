import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { whitepaperGuides } from "@/data/lexiconHub";
import { jobRoles } from "@/data/jobRoles";
import { references } from "@/data/references";
import { investmentFunds } from "@/data/investmentFunds";
import { comparisons } from "@/data/comparisons";
import { marketHubs } from "@/data/marketHubs";
import { events, newsHubs, schools } from "@/data/resources";
import { ecosystemDetailedPages, ecosystemStudy } from "@/data/ecosystemTargets";
import { seoGrowthPages } from "@/data/seoGrowthPages";
import {
  animalHealthCategories,
  animalHealthHub,
  lifeSciencesCategories,
  lifeSciencesHub
} from "@/data/sectors";
import { getNotionSiteContentList } from "@/lib/notion";

const baseUrl = "https://www.skstalents.fr";
const SITEMAP_NOTION_REVALIDATE_SECONDS = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/abonnement",
    "/about",
    "/animal-health",
    "/animal-health/structuration-ia",
    "/benin",
    "/blog",
    "/calcul-salaire-brut-net",
    "/cas-d-usage",
    "/contact",
    "/cote-divoire",
    "/diagnostic",
    "/diagnostic/rapport",
    "/ecosystem",
    "/events",
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
    "/life-sciences/structuration-ia",
    "/market-hubs",
    "/media-kit",
    "/mission",
    "/news",
    "/newsletter",
    "/orientation",
    "/orientation/biotechnologies",
    "/partenaires-media",
    "/pour-qui",
    "/press",
    "/references",
    "/rejoignez-nous",
    "/services",
    "/resources",
    "/salary-benchmarks",
    "/schools",
    "/scorecard-dirigeant",
    "/senegal",
    "/services/website",
    "/studies",
    "/comparatifs",
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

  const newsletterEntries = await getNotionSiteContentList("newsletter", 100, {
    cache: "force-cache",
    timeoutMs: 8000,
    next: {
      revalidate: SITEMAP_NOTION_REVALIDATE_SECONDS
    }
  }).catch(() => []);

  return [
    ...staticRoutes,
    ...sectorRoutes,
    ...articles.map((article) => `/blog/${article.slug}`),
    ...jobRoles.map((role) => `/job-roles/${role.slug}`),
    ...references.map((reference) => `/references/${reference.slug}`),
    ...investmentFunds.map((fund) => `/investment-funds/${fund.slug}`),
    ...comparisons.map((comparison) => `/comparatifs/${comparison.slug}`),
    ...marketHubs.map((hub) => `/market-hubs/${hub.slug}`),
    ...ecosystemDetailedPages.map((item) => `/ecosystem/${item.slug}`),
    ...seoGrowthPages.map((page) => `/${page.slug}`),
    ...whitepaperGuides.map((guide) => `/guides/${guide.slug}`),
    `/studies/${ecosystemStudy.slug}`,
    ...newsletterEntries.map((item) => `/newsletter/${item.slug}`),
    ...newsHubs.map((item) => `/news/${item.slug}`),
    ...schools.map((item) => `/schools/${item.slug}`),
    ...events.map((item) => `/events/${item.slug}`)
  ].map((url) => ({
    url: `${baseUrl}${url}`,
    changeFrequency: "weekly",
    priority: url === "" ? 1 : 0.8,
    lastModified: new Date()
  }));
}
