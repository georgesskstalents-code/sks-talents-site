import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const mappingFile = path.join(root, "data/editorialHeroImages.generated.ts");

const stopwords = new Set([
  "a",
  "au",
  "aux",
  "avec",
  "ce",
  "ces",
  "comment",
  "dans",
  "de",
  "des",
  "du",
  "en",
  "entre",
  "et",
  "france",
  "for",
  "la",
  "le",
  "les",
  "our",
  "par",
  "pour",
  "qu",
  "que",
  "quel",
  "quels",
  "sur",
  "the",
  "to",
  "vos",
  "votre",
  "your"
]);

const notionEntries = [
  {
    slug: "egalite-remuneration-femmes-hommes-obligations-employeurs-france-2026",
    title: "Égalité de rémunération femmes-hommes : obligations employeurs",
    vertical: "rh",
    topic: "salary"
  },
  {
    slug: "salariee-enceinte-periode-essai-droits-employeur-2026",
    title: "Salariée enceinte en période d’essai : règles employeur",
    vertical: "rh",
    topic: "salary"
  },
  {
    slug: "licenciement-arret-maladie-depression-droits-employeur-2026",
    title: "Licenciement pendant un arrêt maladie pour dépression",
    vertical: "rh",
    topic: "salary"
  },
  {
    slug: "index-egalite-femmes-hommes-2026-obligations-employeurs",
    title: "Index égalité femmes-hommes 2026",
    vertical: "rh",
    topic: "salary"
  },
  {
    slug: "calcul-taux-absenteisme-life-sciences-animal-health",
    title: "Calculer le taux d’absentéisme",
    vertical: "life-sciences",
    topic: "salary"
  },
  {
    slug: "deployer-ia-aupres-collaborateurs-structuration-rh",
    title: "Déployer l’IA auprès de vos collaborateurs",
    vertical: "rh",
    topic: "skills"
  },
  {
    slug: "recrutement-life-sciences-animal-health-2026",
    title: "Recrutement Life Sciences & Animal Health 2026",
    vertical: "life-sciences",
    topic: "market"
  },
  {
    slug: "abidjanaises-in-tech-cote-divoire-ecosysteme-sante",
    title: "Abidjanaises in Tech et écosystème santé",
    vertical: "life-sciences",
    topic: "market"
  },
  {
    slug: "mission-french-tech-startups-ecosysteme-france",
    title: "Mission French Tech startups et écosystème France",
    vertical: "life-sciences",
    topic: "market"
  },
  {
    slug: "bpifrance-business-france-agri-agro-benin",
    title: "Bpifrance Business France agri-agro Bénin",
    vertical: "life-sciences",
    topic: "market"
  }
];

const bucketQueries = {
  lab: [
    "biotechnology laboratory scientist",
    "medical laboratory research",
    "scientists laboratory team"
  ],
  diagnostic: [
    "diagnostic laboratory scientist",
    "medical laboratory diagnostics",
    "laboratory analysis team"
  ],
  veterinary: [
    "veterinary clinic veterinarian dog cat",
    "animal health veterinarian team",
    "veterinary laboratory team"
  ],
  petfood: [
    "animal nutrition laboratory dog cat",
    "pet care veterinarian dog cat",
    "food science laboratory team"
  ],
  office: [
    "corporate office team meeting",
    "coworking team workspace",
    "startup founders office"
  ],
  workshop: [
    "team workshop office laptop",
    "training workshop leadership",
    "people collaborating office"
  ],
  student: [
    "students science laboratory",
    "students classroom laboratory",
    "students teamwork classroom"
  ],
  conference: [
    "startup networking event",
    "professional networking event",
    "industry conference networking"
  ]
};

const bucketSignals = {
  lab: ["lab", "laboratory", "biotech", "scientist", "research", "medicine", "clinical"],
  diagnostic: ["diagnostic", "laboratory", "medical", "analysis", "testing", "imaging"],
  veterinary: ["veterinary", "animal", "dog", "cat", "clinic", "vet"],
  petfood: ["dog", "cat", "nutrition", "food", "animal", "pet"],
  office: ["office", "meeting", "team", "business", "workspace", "startup"],
  workshop: ["workshop", "training", "team", "laptop", "leadership", "collaboration"],
  student: ["student", "students", "school", "classroom", "education", "laboratory"],
  conference: ["conference", "event", "networking", "meeting", "summit", "business"]
};

const hardBanTerms = [
  "logo",
  "diagram",
  "chart",
  "map",
  "flag",
  "icon",
  "symbol",
  "seal",
  "vector",
  ".pdf",
  ".svg",
  ".djvu",
  ".webm",
  ".ogg",
  ".gif",
  "pdf",
  "svg",
  "djvu",
  "webm",
  "ogg",
  "gif",
  "emblem",
  "kfor",
  "soldier",
  "military",
  "army",
  "air_base",
  "foreign_office",
  "resolute_sentinel",
  "delegation",
  "minister",
  "ministry",
  "president",
  "trump",
  "zelenskyy",
  "secretary_of_state",
  "governor",
  "prime_minister",
  "oval_office",
  "salvador_dali",
  "wikimania",
  "archives"
];

const softPenaltyTerms = [
  "conference",
  "meeting_of",
  "thumbnail",
  "government",
  "official",
  "ceremony"
];

function uniqueEntries(entries) {
  const seen = new Set();
  return entries.filter((entry) => {
    if (seen.has(entry.slug)) return false;
    seen.add(entry.slug);
    return true;
  });
}

function parseArticlesFile(source) {
  const regex =
    /\{\s*id:\s*"[^"]+",\s*title:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*vertical:\s*"([^"]+)",[\s\S]*?topic:\s*"([^"]+)"/g;
  const results = [];

  for (const match of source.matchAll(regex)) {
    results.push({
      title: match[1],
      slug: match[2],
      vertical: match[3],
      topic: match[4]
    });
  }

  return results;
}

function normalize(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function tokenize(value) {
  return normalize(value)
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter((token) => token && !stopwords.has(token) && !/^\d+$/.test(token));
}

function getEntryBucket(entry) {
  const haystack = normalize(`${entry.slug} ${entry.title} ${entry.vertical} ${entry.topic}`);

  if (haystack.match(/orientation|lycee|ecole|etudiant|devenir/)) return "student";
  if (haystack.match(/petfood|nutrition|diet|protein|pet-|pet |dog|cat/)) return "petfood";
  if (haystack.match(/vet|veter|animal|clinic|pharma-vet/)) return "veterinary";
  if (haystack.match(/diagnostic|ivd|pcr|ngs|poct|lims|middleware|hl7|imaging|nucleaire/)) return "diagnostic";
  if (haystack.match(/salary|remuneration|salaire|egalite|absenteisme|enceinte|licenciement|drh|rh|convention|teletravail/))
    return "office";
  if (haystack.match(/skills|soft|ia|ai|cyber|digital|leadership|workshop|formation/)) return "workshop";
  if (haystack.match(/fund|bpifrance|business-france|conference|ecosysteme|event|webinaire|startup|french-tech|finance|export/))
    return "conference";
  return "lab";
}

function getEntryQueries(entry, bucket) {
  const titleTokens = tokenize(entry.title).slice(0, 4).join(" ");
  const slugTokens = tokenize(entry.slug).slice(0, 4).join(" ");
  const baseQueries = bucketQueries[bucket];

  return [...new Set([`${titleTokens} ${baseQueries[0]}`.trim(), `${slugTokens} ${baseQueries[1]}`.trim(), ...baseQueries])];
}

function filterCommonsPages(pages = {}) {
  return Object.values(pages)
    .filter((page) => page?.imageinfo?.[0]?.url)
    .filter((page) => {
      const title = normalize(page.title || "");
      const url = normalize(page.imageinfo[0].url || "");
      return !hardBanTerms.some((term) => title.includes(term) || url.includes(term));
    });
}

function scoreCandidate(page, entry, bucket) {
  const title = normalize(page.title || "");
  const tokens = tokenize(`${entry.title} ${entry.slug}`).slice(0, 8);
  let score = 0;

  for (const signal of bucketSignals[bucket] || []) {
    if (title.includes(signal)) score += 4;
  }

  for (const token of tokens) {
    if (title.includes(token)) score += 3;
  }

  if (title.includes("jpg") || title.includes("jpeg") || title.includes("png")) {
    score += 1;
  }

  for (const term of softPenaltyTerms) {
    if (title.includes(term)) score -= 3;
  }

  return score;
}

async function searchCommons(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&generator=search" +
    `&gsrsearch=${encodeURIComponent(query)}` +
    "&gsrnamespace=6&gsrlimit=30&prop=imageinfo&iiprop=url&format=json";

  return searchCommonsWithRetry(url, query);
}

async function searchCommonsWithRetry(url, query, attempt = 0) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "SKS-TALENTS-Codex/1.0"
    }
  });

  if (response.status === 429 && attempt < 4) {
    await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt + 1)));
    return searchCommonsWithRetry(url, query, attempt + 1);
  }

  if (!response.ok) {
    throw new Error(`Search failed for ${query}: ${response.status}`);
  }

  const data = await response.json();
  return filterCommonsPages(data?.query?.pages);
}

async function buildPools(entries) {
  const pools = new Map();

  for (const bucket of Object.keys(bucketQueries)) {
    pools.set(bucket, []);
  }

  for (const bucket of Object.keys(bucketQueries)) {
    const bucketEntries = entries.filter((entry) => getEntryBucket(entry) === bucket).slice(0, 10);
    const queries = new Set(bucketQueries[bucket]);

    for (const entry of bucketEntries) {
      for (const query of getEntryQueries(entry, bucket).slice(0, 2)) {
        queries.add(query);
      }
    }

    const seenUrls = new Set();
    const candidates = [];

    for (const query of queries) {
      const pages = await searchCommons(query);
      for (const page of pages) {
        const imageUrl = page.imageinfo[0].url;
        if (seenUrls.has(imageUrl)) continue;
        seenUrls.add(imageUrl);
        candidates.push(page);
      }
    }

    pools.set(bucket, candidates);
  }

  return pools;
}

function getCandidateList(entry, bucket, pools, usedUrls) {
  const bucketOrder = [bucket, "lab", "diagnostic", "office", "workshop", "conference", "student", "veterinary", "petfood"];
  const collected = [];
  const seen = new Set();

  for (const currentBucket of bucketOrder) {
    const candidates = (pools.get(currentBucket) || [])
      .filter((page) => !usedUrls.has(page.imageinfo[0].url))
      .sort((a, b) => scoreCandidate(b, entry, currentBucket) - scoreCandidate(a, entry, currentBucket))
      .slice(0, 12);

    for (const candidate of candidates) {
      const imageUrl = candidate.imageinfo[0].url;
      if (seen.has(imageUrl)) continue;
      seen.add(imageUrl);
      collected.push(candidate);
    }
  }

  return collected;
}

function createAlt(entry) {
  return `Illustration éditoriale pour ${entry.title}`;
}

async function main() {
  const rawArticles = await readFile(path.join(root, "data/articles.ts"), "utf8");
  const localArticles = parseArticlesFile(rawArticles);
  const entries = uniqueEntries([...localArticles, ...notionEntries]);

  const pools = await buildPools(entries);
  const usedUrls = new Set();
  const generated = {};

  for (const entry of entries) {
    const bucket = getEntryBucket(entry);
    const candidates = getCandidateList(entry, bucket, pools, usedUrls);
    let selected = null;

    for (const candidate of candidates) {
      const imageUrl = candidate.imageinfo[0].url;

      try {
        usedUrls.add(imageUrl);
        selected = { candidate, imageUrl };
        break;
      } catch (error) {
        console.warn(`Skipping candidate for ${entry.slug}: ${error.message}`);
      }
    }

    if (!selected) {
      console.warn(`No image found for ${entry.slug}`);
      continue;
    }

    generated[entry.slug] = {
      src: selected.imageUrl,
      alt: createAlt(entry),
      source: selected.candidate.imageinfo[0].descriptionurl
    };

    console.log(`Assigned ${entry.slug} -> ${selected.imageUrl}`);
  }

  const fileContents = `export const editorialHeroImages = ${JSON.stringify(generated, null, 2)} as const;\n`;
  await writeFile(mappingFile, fileContents);
  console.log(`Generated ${Object.keys(generated).length} image mappings.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
