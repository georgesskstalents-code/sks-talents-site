import type { JobRole } from "@/data/jobRoles";
import { schools, type ResourceItem } from "@/data/resources";
import { schoolProgramCatalog, type OfficialSchoolProgram } from "@/data/schoolPrograms";

type MatchedSchool = ResourceItem & {
  matchType: "explicit" | "study" | "sector";
};

export type RecommendedProgram = {
  schoolTitle: string;
  schoolSlug?: string;
  programTitle: string;
  programUrl: string;
};

export type StudyRecommendation = {
  study: string;
  schools: MatchedSchool[];
  programs: RecommendedProgram[];
  sourceLabel: string;
};

export type JobRoleEducationBundle = {
  recommendations: StudyRecommendation[];
  schoolPool: MatchedSchool[];
  methodology: string[];
};

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const schoolAliases: Record<string, string[]> = {
  agroparistech: ["agroparistech"],
  oniris: ["oniris"],
  "vetagro-sup": ["vetagro sup", "vetagrosup"],
  enva: ["enva", "enva alfort"],
  envt: ["envt"],
  "unilasalle-rouen-veterinaire": ["unilasalle", "ecole veterinaire unilasalle"],
  "universite-paris-saclay": ["universite paris saclay", "paris saclay"],
  "universite-paris-saclay-biology": ["universite paris saclay biology", "paris saclay biology"],
  "universite-angers-veterinary-sciences": ["universite d angers", "universite angers"],
  "universite-montpellier-pharma": ["universite de montpellier pharmacie", "montpellier pharmacie"],
  "faculte-pharmacie-universite-strasbourg": [
    "faculte de pharmacie strasbourg",
    "pharmacie strasbourg",
    "universite strasbourg pharmacie"
  ],
  "universite-strasbourg-life-sciences": ["universite strasbourg life sciences", "strasbourg life sciences"],
  "esbs-strasbourg": ["esbs strasbourg", "ecole superieure de biotechnologie strasbourg"],
  "ecole-biologie-industrielle-cergy": ["ebi cergy", "ecole de biologie industrielle cergy"],
  supbiotech: ["sup biotech", "supbiotech"],
  "universite-evry-paris-saclay-genomics": ["universite evry paris saclay genomique", "evry genomique"],
  "genopole-campus-evry": ["genopole campus evry", "genopole evry"],
  "utc-biomed": ["utc biomedical", "utc biomed", "ingenierie biomedicale utc"],
  "esigen-bioinformatique": ["esigen bioinformatique", "bioinformatique esigen"],
  "telecom-paris-tech": ["telecom paris", "telecom paris tech"],
  epita: ["epita"],
  "grenoble-inp-ensimag": ["grenoble inp ensimag", "ensimag"],
  "centrale-supelec-health": ["centralesupelec health", "centrale supelec health"],
  centralesupelec: ["centralesupelec", "centrale supelec"],
  "em-lyon-healthcare": ["em lyon", "em lyon healthcare"],
  "essec-healthcare": ["essec", "essec healthcare"],
  "skema-life-sciences-business": ["skema", "skema life sciences business"],
  "audencia-animal-health": ["audencia", "audencia animal health"],
  "isa-lille-nutrition": ["isa lille nutrition", "isa lille"],
  "agrocampus-ouest": ["agrocampus ouest"],
  "institut-agro-dijon": ["institut agro dijon", "institut agro"],
  "sciences-agro-bordeaux": ["sciences agro bordeaux"],
  "chimie-paris-tech": ["chimie paris", "chimie paristech"],
  "mines-paris-tech": ["mines paris", "mines paristech"],
  espci: ["espci"],
  esilv: ["esilv"],
  "grenoble-inp-phelma": ["grenoble inp phelma", "phelma"],
  "icap-montpellier": ["icap montpellier", "ingenierie des cosmetiques icap"],
  "uco-biotechnologies-produits-cosmetiques": [
    "uco biotechnologies cosmetiques",
    "uco biotechnologies produits cosmetiques"
  ]
};

const schoolIndex = schools.map((school) => ({
  school,
  normalizedTitle: normalize(school.title),
  normalizedSlug: normalize(school.slug),
  aliases: (schoolAliases[school.slug] || []).map(normalize)
}));

const sectorFallbacks: Record<string, string[]> = {
  biotech: [
    "universite-paris-saclay",
    "supbiotech",
    "esbs-strasbourg",
    "ecole-biologie-industrielle-cergy",
    "agroparistech"
  ],
  "life sciences": [
    "universite-paris-saclay",
    "universite-montpellier-pharma",
    "faculte-pharmacie-universite-strasbourg",
    "em-lyon-healthcare",
    "essec-healthcare"
  ],
  diagnostic: [
    "telecom-paris-tech",
    "utc-biomed",
    "epita",
    "grenoble-inp-ensimag",
    "centrale-supelec-health"
  ],
  medtech: [
    "telecom-paris-tech",
    "utc-biomed",
    "centralesupelec",
    "esilv",
    "grenoble-inp-phelma"
  ],
  "animal health": ["oniris", "vetagro-sup", "enva", "envt", "audencia-animal-health"],
  petfood: ["agroparistech", "isa-lille-nutrition", "agrocampus-ouest", "institut-agro-dijon", "sciences-agro-bordeaux"],
  cosmetique: ["icap-montpellier", "chimie-paris-tech", "uco-biotechnologies-produits-cosmetiques"],
  "medical vet": ["oniris", "vetagro-sup", "enva", "envt", "universite-paris-saclay"]
};

const studyRules: Array<{ pattern: RegExp; slugs: string[] }> = [
  { pattern: /veterin|veterinary|imagerie diagnostique/i, slugs: ["oniris", "vetagro-sup", "enva", "envt"] },
  {
    pattern: /pharmacie|medical affairs|market access|heor|affaires reglementaires/i,
    slugs: ["universite-montpellier-pharma", "faculte-pharmacie-universite-strasbourg", "universite-paris-saclay"]
  },
  {
    pattern: /biotech|biologie|genom|sciences du vivant|bioprocede|production|qualite|doctorat/i,
    slugs: ["universite-paris-saclay", "supbiotech", "esbs-strasbourg", "ecole-biologie-industrielle-cergy"]
  },
  {
    pattern: /data|bioinfo|ia|informatique|cyber|systemes? d information/i,
    slugs: ["telecom-paris-tech", "epita", "grenoble-inp-ensimag", "centrale-supelec-health"]
  },
  {
    pattern: /business|commerce|marketing|vente|finance|management|mba|affaires publiques|rh/i,
    slugs: ["em-lyon-healthcare", "essec-healthcare", "skema-life-sciences-business", "audencia-animal-health"]
  },
  {
    pattern: /nutrition|agro|petfood|agroalimentaire/i,
    slugs: ["agroparistech", "isa-lille-nutrition", "agrocampus-ouest", "institut-agro-dijon"]
  },
  {
    pattern: /instrumentation|biomedical|physique appliquee/i,
    slugs: ["utc-biomed", "telecom-paris-tech", "centralesupelec", "grenoble-inp-phelma"]
  },
  {
    pattern: /cosmet/i,
    slugs: ["icap-montpellier", "chimie-paris-tech", "uco-biotechnologies-produits-cosmetiques"]
  }
];

function dedupeSchools(entries: MatchedSchool[]) {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.slug)) {
      return false;
    }
    seen.add(entry.slug);
    return true;
  });
}

function getSchoolBySlug(slug: string, matchType: MatchedSchool["matchType"]) {
  const school = schools.find((entry) => entry.slug === slug);
  return school ? { ...school, matchType } : null;
}

function matchSchoolByName(name: string): MatchedSchool | null {
  const normalized = normalize(name);

  const aliasMatch = schoolIndex.find((entry) =>
    [entry.normalizedTitle, entry.normalizedSlug, ...entry.aliases].some(
      (candidate) =>
        candidate === normalized ||
        candidate.includes(normalized) ||
        normalized.includes(candidate)
    )
  );

  return aliasMatch ? { ...aliasMatch.school, matchType: "explicit" } : null;
}

function inferSchoolsForStudy(study: string, role: JobRole, explicitSchools: MatchedSchool[]) {
  const matchedFromStudy = studyRules
    .filter((rule) => rule.pattern.test(study))
    .flatMap((rule) => rule.slugs.map((slug) => getSchoolBySlug(slug, "study")))
    .filter(Boolean) as MatchedSchool[];

  const normalizedSector = normalize(role.sector);
  const matchedFromSector = Object.entries(sectorFallbacks)
    .filter(([key]) => normalizedSector.includes(key))
    .flatMap(([, slugs]) => slugs.map((slug) => getSchoolBySlug(slug, "sector")))
    .filter(Boolean) as MatchedSchool[];

  const merged = dedupeSchools([...explicitSchools, ...matchedFromStudy, ...matchedFromSector]);
  return merged.slice(0, 4);
}

function findCatalogEntries(names: string[]) {
  const normalizedNames = names.map(normalize);

  return schoolProgramCatalog.filter((entry) =>
    entry.matchNames.some((name) => normalizedNames.includes(normalize(name)))
  );
}

function getProgramsForStudy(study: string, role: JobRole, schoolMatches: MatchedSchool[]): RecommendedProgram[] {
  const explicitCatalogEntries = findCatalogEntries(role.schools);
  const matchedCatalogEntries = findCatalogEntries(
    schoolMatches.map((school) => school.title).concat(role.schools)
  );
  const candidateEntries = [...explicitCatalogEntries, ...matchedCatalogEntries].filter(
    (entry, index, array) => array.findIndex((item) => item.schoolTitle === entry.schoolTitle) === index
  );

  const studyContext = normalize(`${role.sector} ${study}`);

  const programMatches = candidateEntries.flatMap((entry) => {
    const matchingPrograms = entry.programs.filter((program) =>
      program.tags.some((tag) => studyContext.includes(normalize(tag)))
    );

    const selectedPrograms = matchingPrograms.length ? matchingPrograms : entry.programs.slice(0, 1);

    return selectedPrograms.map((program) => ({
      schoolTitle: entry.schoolTitle,
      schoolSlug: entry.schoolSlug,
      programTitle: program.title,
      programUrl: program.url
    }));
  });

  const deduped = programMatches.filter(
    (entry, index, array) => array.findIndex((item) => item.programUrl === entry.programUrl) === index
  );

  return deduped.slice(0, 4);
}

export function getJobRoleEducationBundle(role: JobRole): JobRoleEducationBundle {
  const explicitSchools = dedupeSchools(
    role.schools.map((name) => matchSchoolByName(name)).filter(Boolean) as MatchedSchool[]
  );

  const recommendations = role.studies.map((study) => {
    const matchedSchools = inferSchoolsForStudy(study, role, explicitSchools);
    const programs = getProgramsForStudy(study, role, matchedSchools);
    const hasOfficialSource = programs.length > 0 || matchedSchools.some((school) => school.href);

    return {
      study,
      schools: matchedSchools,
      programs,
      sourceLabel: hasOfficialSource
        ? "Sources : base écoles SKS TALENTS + pages de formation officielles des établissements ci-dessous."
        : "Sources : base écoles SKS TALENTS. Aucun diplôme officiel n'est affiché tant qu'il n'est pas vérifié."
    };
  });

  const schoolPool = dedupeSchools([
    ...explicitSchools,
    ...recommendations.flatMap((recommendation) => recommendation.schools)
  ]).slice(0, 8);

  return {
    recommendations,
    schoolPool,
    methodology: [
      "Les écoles proposées sont d’abord rapprochées de la base écoles SKS TALENTS déjà présente sur le site.",
      "Quand une école officielle existe dans la base, nous privilégions ce lien comme source de référence.",
      "Si une fiche cite un parcours large (business, marketing, sciences, ingénierie), nous proposons uniquement des viviers cohérents déjà documentés."
    ]
  };
}
