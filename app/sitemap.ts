import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { jobRoles } from "@/data/jobRoles";
import { references } from "@/data/references";
import { investmentFunds } from "@/data/investmentFunds";
import { comparisons } from "@/data/comparisons";
import { marketHubs } from "@/data/marketHubs";
import { events, newsHubs, schools } from "@/data/resources";
import { ecosystemDetailedPages, ecosystemStudy } from "@/data/ecosystemTargets";
import {
  animalHealthCategories,
  animalHealthHub,
  lifeSciencesCategories,
  lifeSciencesHub
} from "@/data/sectors";

const baseUrl = "https://www.skstalents.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/resources",
    "/ecosystem",
    "/studies",
    "/salary-benchmarks",
    "/comparatifs",
    "/market-hubs",
    "/team",
    "/press",
    "/media-kit",
    "/partenaires-media",
    "/rejoignez-nous",
    "/orientation",
    "/orientation/biotechnologies",
    "/references",
    "/contact",
    "/blog",
    "/job-roles",
    "/calcul-salaire-brut-net",
    "/investment-funds",
    "/services/website",
    "/news",
    "/schools",
    "/events",
    "/life-sciences",
    "/animal-health",
    "/legal/mentions-legales",
    "/legal/politique-confidentialite",
    "/legal/cgu",
    "/legal/charte-recrutement",
    "/legal/politique-cookies",
    "/legal/cgv"
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
    `/studies/${ecosystemStudy.slug}`,
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
