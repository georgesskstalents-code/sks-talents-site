import { findJobRoleBySlug, jobRoles, type JobRole } from "@/data/jobRoles";
import { schoolProgramCatalog, type SchoolProgramCatalogEntry } from "@/data/schoolPrograms";
import { getJobRoleEducationBundle } from "@/lib/jobRoleEducation";
import { jobRoleIndexing } from "@/lib/jobRoleIndexing";

/**
 * Liens reciproques ecole -> fiches metiers.
 *
 * Les fiches metiers calculent deja les ecoles qui alimentent chaque metier
 * (lib/jobRoleEducation). On inverse cette relation pour que chaque page ecole
 * pointe vers les metiers qu'elle alimente : du contenu propre a l'ecole au
 * lieu d'un gabarit identique, et un maillage interne dans les deux sens.
 *
 * Seules les fiches indexables sont proposees (ni noindex, ni doublon
 * canonicalise), pour ne pas diluer les liens vers des URLs exclues.
 */
let cache: Map<string, JobRole[]> | null = null;

function buildIndex(): Map<string, JobRole[]> {
  const index = new Map<string, JobRole[]>();
  const exists = (candidate: string) => Boolean(findJobRoleBySlug(candidate));

  for (const role of jobRoles) {
    if (jobRoleIndexing(role.slug, exists).mode !== "index") {
      continue;
    }

    for (const school of getJobRoleEducationBundle(role).schoolPool) {
      const list = index.get(school.slug) ?? [];
      list.push(role);
      index.set(school.slug, list);
    }
  }

  return index;
}

export function getJobRolesForSchool(schoolSlug: string, limit = 8): JobRole[] {
  if (!cache) {
    cache = buildIndex();
  }
  return (cache.get(schoolSlug) ?? []).slice(0, limit);
}

export function getOfficialProgramsForSchool(
  schoolSlug: string
): SchoolProgramCatalogEntry["programs"] {
  return schoolProgramCatalog
    .filter((entry) => entry.schoolSlug === schoolSlug)
    .flatMap((entry) => entry.programs);
}
