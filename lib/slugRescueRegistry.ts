import { articles } from "@/data/articles";
import { schools } from "@/data/resources";
import { getJobRoleAliases, jobRoleCandidates } from "@/lib/jobRoleAliases";
import {
  buildGeneratedAliases,
  resolveSlug,
  type AliasGenerationConfig,
  type SlugCandidate,
  type SlugResolution
} from "@/lib/slugRescue";

/**
 * Point d'entree unique du filet de securite "slug devine" pour les routes
 * dynamiques a fort trafic. Une seule implementation, trois consommateurs :
 * /job-roles/[slug], /blog/[slug] et /schools/[slug].
 *
 * Les tables d'alias sont construites paresseusement puis mises en cache au
 * niveau du module : le cout est paye une fois par instance serveur.
 */

/** Config minimale : ni prefixe sectoriel ni synonyme de secteur a exploiter. */
const PLAIN_CONFIG: AliasGenerationConfig = {
  sectorPrefixes: [],
  sectorSynonyms: {},
  sectorWords: []
};

/* ----------------------------- job roles ----------------------------- */

export function resolveJobRoleSlug(requested: string): SlugResolution {
  return resolveSlug({
    requested,
    candidates: jobRoleCandidates,
    aliases: getJobRoleAliases()
  });
}

/* ------------------------------ articles ----------------------------- */

const articleCandidates: SlugCandidate[] = articles.map((article) => ({
  slug: article.slug,
  title: article.title
}));

let articleAliases: Map<string, string> | null = null;

function getArticleAliases(): Map<string, string> {
  if (!articleAliases) {
    articleAliases = buildGeneratedAliases(articleCandidates, PLAIN_CONFIG);
  }
  return articleAliases;
}

export function resolveArticleSlug(requested: string): SlugResolution {
  return resolveSlug({
    requested,
    candidates: articleCandidates,
    aliases: getArticleAliases(),
    // Les titres d'articles sont longs et se ressemblent beaucoup : on exige
    // une confiance plus haute avant de rediriger.
    redirectThreshold: 0.88,
    dominantThreshold: 0.78,
    dominantMargin: 0.12
  });
}

/* ------------------------------- schools ----------------------------- */

const schoolCandidates: SlugCandidate[] = schools.map((school) => ({
  slug: school.slug,
  title: school.title
}));

let schoolAliases: Map<string, string> | null = null;

function getSchoolAliases(): Map<string, string> {
  if (!schoolAliases) {
    schoolAliases = buildGeneratedAliases(schoolCandidates, PLAIN_CONFIG);
  }
  return schoolAliases;
}

export function resolveSchoolSlug(requested: string): SlugResolution {
  return resolveSlug({
    requested,
    candidates: schoolCandidates,
    aliases: getSchoolAliases()
  });
}
