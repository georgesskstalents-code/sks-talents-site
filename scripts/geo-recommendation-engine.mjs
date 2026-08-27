#!/usr/bin/env node
// GEO Recommendation Engine · SKS Talents · PR #8
//
// Prend le scan LLM structure + les contenus SKS existants (sitemap + articles + jobRoles)
// et produit 3-5 actions SEO/GEO priorisees pour la semaine, format :
//   { query, constat, concurrents_dominants, raison_probable_gap,
//     page_concernee, action_precise, impact_potentiel, effort, priorite }
//
// Utilise Claude Sonnet 5 en synthese finale · le systeme prompt fait tout le travail
// de mise en forme et de precision.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");

const CONFIG = JSON.parse(
  await fs.readFile(path.join(__dirname, "lib", "lundi-matin-config.json"), "utf8")
);

async function loadScan() {
  const p = path.join(PROJECT_ROOT, "data", "llm-domination-latest.json");
  try {
    return JSON.parse(await fs.readFile(p, "utf8"));
  } catch {
    return null;
  }
}

async function loadSiteInventory() {
  const inventory = {
    articles: [],
    jobRoles: [],
    landings: [],
  };
  try {
    const articlesRaw = await fs.readFile(path.join(PROJECT_ROOT, "data", "articles.ts"), "utf8");
    inventory.articles = [...articlesRaw.matchAll(/slug:\s*"([^"]+)"[\s\S]{0,300}?title:\s*"([^"]+)"/g)]
      .map((m) => ({ slug: m[1], title: m[2] }))
      .slice(0, 50);
  } catch {}
  try {
    const rolesRaw = await fs.readFile(path.join(PROJECT_ROOT, "data", "jobRoles.ts"), "utf8");
    inventory.jobRoles = [...rolesRaw.matchAll(/slug:\s*"([^"]+)"[\s\S]{0,200}?title:\s*"([^"]+)"/g)]
      .map((m) => ({ slug: m[1], title: m[2] }))
      .slice(0, 100);
  } catch {}
  // Landings
  const landingsMap = [
    { url: "/animal-health/", topic: "Animal Health services + recrutement" },
    { url: "/animal-health/structuration-ia", topic: "Structuration IA equipe RH sante animale" },
    { url: "/life-sciences/", topic: "Life Sciences services + recrutement" },
    { url: "/life-sciences/structuration-ia", topic: "Structuration IA equipe RH biotech" },
    { url: "/services/", topic: "Vue d'ensemble services" },
    { url: "/diagnostic", topic: "Diagnostic gratuit structuration IA" },
    { url: "/cout-mauvais-recrutement", topic: "Simulateur cout mauvais recrutement" },
    { url: "/references", topic: "References clients" },
  ];
  inventory.landings = landingsMap;
  return inventory;
}

function summarizeScanForPrompt(scan) {
  const summary = {
    core_visibility_score: scan.core_visibility_score,
    scan_meta: scan.scan_meta,
    queries: scan.per_query.map((q) => ({
      query: q.query,
      is_stable_core: q.is_stable_core,
      source_type: q.source_type,
      presence_summary: q.presence_summary,
      per_llm_levels: Object.fromEntries(
        Object.entries(q.per_llm).map(([k, v]) => [k, v.available ? v.presence_level : "unavailable"])
      ),
      competitors_top: (q.competitors_aggregated || [])
        .sort((a, b) => (b.seen_in_runs || 0) * (b.weight || 0) - (a.seen_in_runs || 0) * (a.weight || 0))
        .slice(0, 6)
        .map((c) => ({ name: c.name, tier: c.tier, seen_in_runs: c.seen_in_runs, source: c.source })),
    })),
  };
  return summary;
}

async function synthesize(scan, inventory) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return { skipped: true, reason: "ANTHROPIC_API_KEY absent" };
  }
  const scanSummary = summarizeScanForPrompt(scan);
  const inventorySummary = {
    landings: inventory.landings,
    articles_sample: inventory.articles.slice(0, 20),
    jobRoles_sample: inventory.jobRoles.slice(0, 20),
  };

  const systemPrompt = `Tu es le stratege GEO (Generative Engine Optimization) et SEO de SKS Talents, cabinet exec search Life Sciences et Animal Health en France.

Ton role cette semaine : produire 3 a 5 actions concretes et PRIORISEES pour ameliorer la visibilite de SKS Talents dans les reponses des LLMs (ChatGPT, Claude, Perplexity, Mistral, Gemini) sur les requetes strategiques.

Contraintes strictes :
- Renvoie STRICTEMENT un tableau JSON de 3 a 5 objets. Aucun texte hors JSON.
- Actions REELLEMENT EXECUTABLES : "optimize_existing", "create_page", "add_faq", "publish_article", "improve_schema", "build_authority_signal", "update_content", "no_action".
- Chaque action doit citer une URL concrete du site OU une URL a creer.
- Zero recommandation SEO generique (pas de "ameliorez le contenu" · dis exactement quoi ajouter/modifier).
- Concurrents : utilise ceux DETECTES dans le scan (pas d'invention).
- Marque explicitement "inferred" tout element non observe.
- Priorite basee sur : intent business + adequation SKS + intensite concurrentielle pertinente + gap + effort inverse.

Schema JSON obligatoire par action :
{
  "priority": 1-5,
  "query": "requete concernee",
  "constat": "phrase courte factuelle : SKS absent/cite/recommande sur X/5 LLMs",
  "concurrents_dominants": [{"name": "...", "tier": "tier1_direct|tier2_adjacent", "seen_in_llms": N}],
  "raison_probable_gap": "hypothese sur pourquoi SKS n'apparait pas (pas d'affirmation)",
  "page_concernee": "/url" ou "NEW: /url-a-creer",
  "action_precise": "instruction executable ce jour · ex : ajouter FAQ 5 questions sur X, ajouter schema Service pour Y, publier article pilier Z sur A",
  "impact_potentiel": "high|medium|low",
  "effort": "low|medium|high",
  "estimated_time_to_visibility_weeks": nombre,
  "reasoning": "justification en une phrase"
}`;

  const userPrompt = `SCAN LLM CETTE SEMAINE :
${JSON.stringify(scanSummary, null, 2)}

INVENTAIRE SITE SKS TALENTS :
${JSON.stringify(inventorySummary, null, 2)}

Produis les 3 a 5 actions priorisees maintenant.`;

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
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      return { error: err };
    }
    const data = await res.json();
    const text = data?.content?.[0]?.text || "[]";
    const cleaned = text.replace(/^```json\s*/, "").replace(/```\s*$/, "").trim();
    const actions = JSON.parse(cleaned);
    return { actions };
  } catch (err) {
    return { error: err.message };
  }
}

async function main() {
  console.log("Building GEO recommendations...");
  const scan = await loadScan();
  if (!scan) {
    console.error("No scan found · run llm-domination-scan.mjs first.");
    process.exit(1);
  }
  const inventory = await loadSiteInventory();
  const result = await synthesize(scan, inventory);

  const output = {
    generated_at: new Date().toISOString(),
    based_on_scan_at: scan.scanned_at,
    core_visibility_score: scan.core_visibility_score,
    actions: result.actions || [],
    fallback: result.skipped || result.error ? { reason: result.reason || result.error } : null,
  };

  const outPath = path.join(PROJECT_ROOT, "data", "geo-recommendations-latest.json");
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(output, null, 2), "utf8");
  console.log(`Recommendations : ${(output.actions || []).length} actions`);
  console.log(`Saved to ${outPath}`);
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
    console.error("Recommendation engine failed:", err);
    process.exit(1);
  });
}

export { main as buildGeoRecommendations };
