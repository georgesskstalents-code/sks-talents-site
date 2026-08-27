#!/usr/bin/env node
// GEO Query Universe Manager · SKS Talents
//
// Maintient l'univers de 60-90 requetes en 3 layers :
//   Layer 1 · OBSERVED (30-50 queries)   · GSC (queries >= 5 impressions/90j)
//   Layer 2 · EXTRAPOLATED (20-30 queries) · variations depuis jobRoles + articles + services
//   Layer 3 · HYPOTHESIS (10-15 queries) · Claude API sur le positionnement business
//
// Puis calcule un score de priorite /100 par requete selon la nouvelle grille CEO :
//   business_intent 25 % + adequation SKS 20 % + intensite concurrentielle 20 %
//   + gap SKS 15 % + GSC signals 10 % + effort inverse 10 %
//
// Output : data/geo-query-universe.json (versionne · lu par scan + recommendation)
//
// Vocabulaire strict : chaque requete est taggee observed/extrapolated/hypothesis.
// Learning loop peut ajouter des requetes en Layer 3 · pas d'auto-promotion en observed.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");

const CONFIG = JSON.parse(
  await fs.readFile(path.join(__dirname, "lib", "lundi-matin-config.json"), "utf8")
);
const COMPETITORS = JSON.parse(
  await fs.readFile(path.join(__dirname, "lib", "geo-known-competitors.json"), "utf8")
);

// -----------------------------------------------------------------------
// Layer 1 · OBSERVED via GSC snapshot
// -----------------------------------------------------------------------

async function loadGscObserved() {
  const snapshotPath = path.join(PROJECT_ROOT, "data", "gsc-latest-snapshot.json");
  try {
    const raw = await fs.readFile(snapshotPath, "utf8");
    const gsc = JSON.parse(raw);
    const queries = gsc.queries || gsc.rows || [];
    return queries
      .filter((q) => (q.impressions || 0) >= 5)
      .map((q) => ({
        query: q.query || q.keys?.[0],
        source_type: "observed",
        origin: "gsc",
        gsc: {
          impressions: q.impressions,
          clicks: q.clicks,
          position: q.position,
          ctr: q.ctr,
        },
      }))
      .filter((q) => q.query);
  } catch {
    return [];
  }
}

// -----------------------------------------------------------------------
// Layer 2 · EXTRAPOLATED via jobRoles + articles + services
// -----------------------------------------------------------------------

async function loadJobRoleTitles() {
  const p = path.join(PROJECT_ROOT, "data", "jobRoles.ts");
  try {
    const raw = await fs.readFile(p, "utf8");
    const titles = [...raw.matchAll(/title:\s*"([^"]+)"/g)].map((m) => m[1]);
    return Array.from(new Set(titles));
  } catch {
    return [];
  }
}

const EXTRAPOLATION_TEMPLATES = [
  "recrutement {role}",
  "cabinet recrutement {role}",
  "{role} salaire France",
  "cabinet exec search {role}",
  "recruter un {role} France",
  "cabinet chasseur de tetes {role}",
];

function extrapolateQueries(titles) {
  const out = [];
  const seen = new Set();
  for (const title of titles.slice(0, 40)) {
    for (const tpl of EXTRAPOLATION_TEMPLATES) {
      const q = tpl.replace("{role}", title.toLowerCase().replace(/[·]/g, "-"));
      if (!seen.has(q)) {
        seen.add(q);
        out.push({
          query: q,
          source_type: "extrapolated",
          origin: "jobRoles_template",
          derived_from: title,
        });
      }
    }
  }
  return out.slice(0, 30);
}

// -----------------------------------------------------------------------
// Layer 3 · HYPOTHESIS via Claude API
// -----------------------------------------------------------------------

async function generateHypothesisQueries(existingQueries) {
  if (!process.env.ANTHROPIC_API_KEY) return [];
  const existingList = existingQueries.slice(0, 30).map((q) => `- ${q.query}`).join("\n");
  const prompt = `Tu es un stratege SEO et GEO (Generative Engine Optimization) qui conseille SKS Talents, cabinet exec search Life Sciences et Animal Health en France.

Voici les 30 premieres requetes DEJA dans l'univers de veille (observed + extrapolated) :
${existingList}

Genere 12 nouvelles requetes HYPOTHESES · c'est a dire des formulations que des dirigeants ou DRH pourraient taper dans ChatGPT/Claude/Perplexity pour trouver un cabinet comme SKS Talents ou pour se renseigner sur les metiers Life Sciences / Animal Health / Petfood en France.

Contraintes :
- Ne repete PAS les requetes existantes ci-dessus.
- Ces requetes sont des HYPOTHESES · elles n'ont pas ete observees.
- Focus intent commercial : find_provider, hire, consulting, compare.
- Verticaux prioritaires : Animal Health, Petfood (Q4 2026), Life Sciences C-level (Q1 2027).
- Formulations naturelles francaises (comment un dirigeant parle).
- Aucune mention explicite de "SKS Talents" dans la requete.

Renvoie STRICTEMENT un tableau JSON de 12 objets, chacun avec :
  { "query": "...", "reason": "...pourquoi cette requete est plausible..." }

Rien d'autre. Pas de markdown, pas de texte autour.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    const text = data?.content?.[0]?.text || "[]";
    const parsed = JSON.parse(text.replace(/^```json\s*/, "").replace(/```\s*$/, ""));
    return parsed.map((it) => ({
      query: it.query,
      source_type: "hypothesis",
      origin: "claude_generation",
      generation_reason: it.reason,
    }));
  } catch (err) {
    console.warn("Hypothesis generation failed:", err.message);
    return [];
  }
}

// -----------------------------------------------------------------------
// Cross-check Google Suggest (public endpoint)
// -----------------------------------------------------------------------

async function googleSuggest(query) {
  try {
    const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=fr&q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.[1]) ? data[1] : [];
  } catch {
    return [];
  }
}

async function crossCheckSuggest(queries) {
  const enriched = [];
  for (const q of queries) {
    const suggests = await googleSuggest(q.query);
    enriched.push({ ...q, google_suggests_related: suggests.slice(0, 4) });
  }
  return enriched;
}

// -----------------------------------------------------------------------
// Priority scoring · nouvelle grille CEO (25/20/20/15/10/10)
// -----------------------------------------------------------------------

const SKS_VERTICALS = ["biotech", "medtech", "life sciences", "animal health", "petfood", "veterinary", "vet", "petcare"];
const INTENT_MARKERS = {
  find_provider: ["cabinet", "chasseur", "agence", "recruteur", "exec search"],
  hire: ["recruter", "recrutement", "embaucher", "trouver un"],
  consulting: ["conseil", "structuration", "audit", "cadrage"],
  compare: ["vs", "meilleur", "top", "comparaison", "difference entre"],
  info: ["salaire", "profil", "missions", "definition", "qu'est-ce que"],
};

function classifyIntent(query) {
  const q = query.toLowerCase();
  for (const [intent, markers] of Object.entries(INTENT_MARKERS)) {
    if (markers.some((m) => q.includes(m))) return intent;
  }
  return "info";
}

const INTENT_SCORES = {
  find_provider: 25,
  hire: 22,
  consulting: 20,
  compare: 15,
  info: 8,
};

function scoreAdequationSks(query) {
  const q = query.toLowerCase();
  const verticalMatches = SKS_VERTICALS.filter((v) => q.includes(v)).length;
  return Math.min(20, verticalMatches * 10);
}

function scoreGsc(observed) {
  if (!observed?.gsc) return 0;
  const impressions = observed.gsc.impressions || 0;
  if (impressions >= 100) return 10;
  if (impressions >= 20) return 6;
  if (impressions >= 5) return 3;
  return 0;
}

function scorePrelimEffort(query, articles, jobRoles) {
  // If SKS already has a landing/article/jobRole matching · low effort (higher score inverse)
  const q = query.toLowerCase();
  const hasMatch = jobRoles.some((t) => q.includes(t.toLowerCase().slice(0, 20)));
  return hasMatch ? 8 : 3;
}

async function loadArticleSlugs() {
  const p = path.join(PROJECT_ROOT, "data", "articles.ts");
  try {
    const raw = await fs.readFile(p, "utf8");
    return [...raw.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  } catch {
    return [];
  }
}

function scoreQuery(q, jobRoles, articles) {
  const intent = classifyIntent(q.query);
  const intent_score = INTENT_SCORES[intent] || 8;
  const adequation_score = scoreAdequationSks(q.query);
  const gsc_score = scoreGsc(q);
  const effort_score = scorePrelimEffort(q.query, articles, jobRoles);
  // Intensite concurrentielle + gap SKS a scan-time · placeholder ici
  const intensite_placeholder = 10;
  const gap_placeholder = 8;
  const total =
    intent_score + adequation_score + intensite_placeholder + gap_placeholder + gsc_score + effort_score;
  return {
    intent,
    intent_score,
    adequation_score,
    intensite_placeholder,
    gap_placeholder,
    gsc_score,
    effort_score,
    priority_total_prescan: total,
    note: "priority_total_prescan · intensite_concurrentielle et gap seront mis a jour post-scan LLM.",
  };
}

// -----------------------------------------------------------------------
// Main · build universe
// -----------------------------------------------------------------------

async function main() {
  console.log("Building GEO Query Universe...");
  const layer1 = await loadGscObserved();
  console.log(`Layer 1 · OBSERVED (GSC) : ${layer1.length} queries`);

  const jobTitles = await loadJobRoleTitles();
  const articleSlugs = await loadArticleSlugs();
  const layer2 = extrapolateQueries(jobTitles);
  console.log(`Layer 2 · EXTRAPOLATED : ${layer2.length} queries`);

  const layer3 = await generateHypothesisQueries([...layer1, ...layer2]);
  console.log(`Layer 3 · HYPOTHESIS : ${layer3.length} queries`);

  // Dedup by normalized query
  const seen = new Set();
  const norm = (s) => s.trim().toLowerCase().replace(/\s+/g, " ");
  const combined = [...layer1, ...layer2, ...layer3].filter((q) => {
    const n = norm(q.query);
    if (seen.has(n)) return false;
    seen.add(n);
    return true;
  });

  // Priority score prescan
  const scored = combined.map((q) => ({
    ...q,
    priority: scoreQuery(q, jobTitles, articleSlugs),
  }));

  // Sort by priority
  scored.sort((a, b) => b.priority.priority_total_prescan - a.priority.priority_total_prescan);

  // Include core queries with special flag
  const coreSet = new Set(CONFIG.geo.stable_core_queries.map(norm));
  const withCore = scored.map((q) => ({
    ...q,
    is_stable_core: coreSet.has(norm(q.query)),
  }));

  // Add missing core queries (defensive · si pas dans layers, on les ajoute quand meme)
  for (const coreQ of CONFIG.geo.stable_core_queries) {
    if (!withCore.some((q) => norm(q.query) === norm(coreQ))) {
      withCore.unshift({
        query: coreQ,
        source_type: "hypothesis",
        origin: "core_config",
        is_stable_core: true,
        priority: { priority_total_prescan: 100, note: "core query config" },
      });
    }
  }

  const output = {
    generated_at: new Date().toISOString(),
    counts: {
      layer1_observed: layer1.length,
      layer2_extrapolated: layer2.length,
      layer3_hypothesis: layer3.length,
      total_after_dedup: withCore.length,
      stable_core: withCore.filter((q) => q.is_stable_core).length,
    },
    stable_core_queries: withCore.filter((q) => q.is_stable_core),
    rotating_candidates: withCore
      .filter((q) => !q.is_stable_core)
      .slice(0, CONFIG.geo.rotating_pool_size),
    full_universe: withCore,
  };

  const outPath = path.join(PROJECT_ROOT, "data", "geo-query-universe.json");
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(output, null, 2), "utf8");
  console.log(`Saved to ${outPath}`);
  console.log(`Universe : ${output.counts.total_after_dedup} queries (${output.counts.stable_core} core)`);
  return output;
}

const isDirectRun = (() => {
  try {
    return import.meta.url === new URL(`file://${process.argv[1]}`).href;
  } catch {
    return false;
  }
})();
if (isDirectRun) {
  main().catch((err) => {
    console.error("Query universe build failed:", err);
    process.exit(1);
  });
}

export { main as buildGeoQueryUniverse };
