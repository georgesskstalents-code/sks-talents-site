import { editorialAllowedDomains, weeklyEditorialWatchlist } from "@/data/editorialSources";
import type { Article } from "@/data/articles";
import type { JobRole } from "@/data/jobRoles";

type TraceableSource = {
  name: string;
  url: string;
};

export type GovernanceValidationResult = {
  ok: boolean;
  errors: string[];
};

function getHostname(url: string) {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "";
  }
}

function isAllowedSourceUrl(url: string) {
  const hostname = getHostname(url);
  if (!hostname) {
    return false;
  }

  return editorialAllowedDomains.some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
  );
}

function validateSources(
  label: string,
  sources: TraceableSource[] | undefined
): GovernanceValidationResult {
  const errors: string[] = [];

  if (!sources?.length) {
    errors.push(`${label}: aucune source traçable fournie.`);
    return { ok: false, errors };
  }

  for (const source of sources) {
    if (!source.name?.trim()) {
      errors.push(`${label}: source_name manquant.`);
    }

    if (!source.url?.trim()) {
      errors.push(`${label}: source_url manquant.`);
      continue;
    }

    if (!isAllowedSourceUrl(source.url)) {
      errors.push(`${label}: domaine non autorisé (${source.url}).`);
    }
  }

  return {
    ok: errors.length === 0,
    errors
  };
}

export function validateArticleForSync(article: Article): GovernanceValidationResult {
  return validateSources(`article:${article.slug}`, article.sources);
}

export function validateJobRoleForSync(role: JobRole): GovernanceValidationResult {
  return validateSources(`job_role:${role.slug}`, role.sources);
}

export function getWeeklyEditorialSourceBrief() {
  return weeklyEditorialWatchlist.map((source) => ({
    name: source.name,
    href: source.href,
    domain: source.domain,
    personas: source.personas,
    topics: source.topics
  }));
}
