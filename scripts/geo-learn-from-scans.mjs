#!/usr/bin/env node
// GEO Learn From Scans · SKS Talents · PR #8
//
// Post-scan (chaque lundi) · extrait des scans hebdo :
//   - Compétiteurs récurrents (top 10 mentionnés cross-queries)
//   - Terminologie récurrente (top 20 termes dans réponses LLM)
//   - Sujets associés (clustering Claude)
//   - Intents commerciaux émergents (classification Claude)
// Puis alimente Layer 3 · HYPOTHESIS de l'univers avec de nouvelles requetes
// candidates a scanner les semaines suivantes.
//
// Vocabulaire strict : les nouvelles requetes ajoutees restent "hypothesis" (jamais
// promues en observed sans nouvelle source reelle). Le systeme devient "plus
// representatif des opportunites et patterns observes dans notre benchmark LLM",
// jamais "representatif du vrai marche LLM".

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");

const CONFIG = JSON.parse(
  await fs.readFile(path.join(__dirname, "lib", "lundi-matin-config.json"), "utf8")
);

async function loadRecentScans(count = 4) {
  const historyPath = path.join(PROJECT_ROOT, "data", "llm-domination-history.jsonl");
  try {
    const raw = await fs.readFile(historyPath, "utf8");
    const lines = raw.trim().split(/\r?\n/).slice(-count);
    return lines.map((l) => JSON.parse(l));
  } catch {
    return [];
  }
}

async function loadLatestScanFull() {
  const p = path.join(PROJECT_ROOT, "data", "llm-domination-latest.json");
  try {
    return JSON.parse(await fs.readFile(p, "utf8"));
  } catch {
    return null;
  }
}

function extractRecurrentCompetitors(scans) {
  const counter = new Map();
  for (const scan of scans) {
    for (const q of scan.per_query || []) {
      for (const [provider, res] of Object.entries(q.per_llm || {})) {
        if (!res?.competitors_count) continue;
        // Note : historique JSONL ne garde que les counts · pas les noms detailles.
        // Pour les noms detailles, lire llm-domination-latest.json
      }
    }
  }
  return Array.from(counter.entries());
}

function extractRecurrentCompetitorsFromLatest(latest) {
  const counter = new Map();
  for (const q of latest?.per_query || []) {
    for (const c of q.competitors_aggregated || []) {
      const key = c.name;
      const existing = counter.get(key) || { name: key, tier: c.tier, seen_queries: 0, weighted_score: 0 };
      existing.seen_queries += 1;
      existing.weighted_score += (c.weight || 0) * (c.seen_in_runs || 1);
      counter.set(key, existing);
    }
  }
  return Array.from(counter.values())
    .sort((a, b) => b.weighted_score - a.weighted_score)
    .slice(0, 10);
}

function extractRecurrentTerms(latest) {
  const wordCounter = new Map();
  const stopwords = new Set([
    "le", "la", "les", "un", "une", "des", "de", "du", "et", "ou", "en", "a", "au", "aux",
    "pour", "par", "avec", "sur", "dans", "est", "sont", "the", "of", "and", "in", "to", "a",
    "for", "on", "with", "as", "at", "by", "or", "but", "sks", "talents", "cabinet", "france",
    "peut", "cette", "ces", "cela", "il", "elle", "vous", "nous", "que", "qui", "notre", "leur",
    "plus", "moins", "aussi", "tres", "bien", "sans", "entre", "chaque", "leurs", "son", "ses",
  ]);
  for (const q of latest?.per_query || []) {
    for (const res of Object.values(q.per_llm || {})) {
      if (!res?.available || !res?.text_first_run_preview) continue;
      const words = res.text_first_run_preview
        .toLowerCase()
        .replace(/[^a-zà-ÿ\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length >= 4 && !stopwords.has(w));
      for (const w of words) {
        wordCounter.set(w, (wordCounter.get(w) || 0) + 1);
      }
    }
  }
  return Array.from(wordCounter.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([term, count]) => ({ term, count, source_type: "observed", origin: "llm_responses_text" }));
}

async function generateNewHypothesisFromLearning(competitors, terms) {
  if (!process.env.ANTHROPIC_API_KEY) return [];
  const prompt = `Tu es le stratege GEO de SKS Talents (cabinet exec search Life Sciences / Animal Health FR).

Voici les competiteurs recurrents detectes dans les reponses LLM cette semaine :
${JSON.stringify(competitors, null, 2)}

Voici la terminologie recurrente extraite des reponses LLM (top 20 termes) :
${JSON.stringify(terms, null, 2)}

Ces donnees viennent de "notre benchmark LLM" · elles ne representent pas le comportement reel de tous les utilisateurs.

Sur cette base, genere 5 a 8 nouvelles requetes HYPOTHESES a ajouter dans le pool rotating pour les semaines suivantes. Ces requetes doivent :
- Exploiter les patterns detectes ci-dessus (competiteurs recurrents · terminologie).
- Ne pas repeter les requetes deja scannees cette semaine.
- Focus intent commercial (find_provider, hire, consulting, compare).
- Rester dans le scope SKS : Life Sciences, Animal Health, Petfood, executive search FR.

Renvoie STRICTEMENT un tableau JSON de 5 a 8 objets :
[{ "query": "...", "reason": "pourquoi cette requete emerge des patterns" }]

Rien d'autre.`;

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
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    const text = data?.content?.[0]?.text || "[]";
    const cleaned = text.replace(/^```json\s*/, "").replace(/```\s*$/, "").trim();
    return JSON.parse(cleaned).map((it) => ({
      query: it.query,
      source_type: "hypothesis",
      origin: "learning_loop",
      generation_reason: it.reason,
      generated_at: new Date().toISOString(),
    }));
  } catch (err) {
    console.warn("Learning generation failed:", err.message);
    return [];
  }
}

async function updateUniverseWithLearnings(newHypotheses) {
  const universePath = path.join(PROJECT_ROOT, "data", "geo-query-universe.json");
  try {
    const raw = await fs.readFile(universePath, "utf8");
    const universe = JSON.parse(raw);
    const seen = new Set(universe.full_universe.map((q) => q.query.toLowerCase().trim()));
    const additions = newHypotheses.filter((q) => !seen.has(q.query.toLowerCase().trim()));
    universe.full_universe.push(...additions);
    universe.counts.layer3_hypothesis = (universe.counts.layer3_hypothesis || 0) + additions.length;
    universe.counts.total_after_dedup = universe.full_universe.length;
    universe.last_learning_update = new Date().toISOString();
    universe.last_learning_additions = additions.length;
    await fs.writeFile(universePath, JSON.stringify(universe, null, 2), "utf8");
    return additions;
  } catch {
    return [];
  }
}

async function main() {
  console.log("Learning from scans...");
  const latest = await loadLatestScanFull();
  if (!latest) {
    console.error("No latest scan found · run llm-domination-scan.mjs first.");
    return;
  }
  const competitors = extractRecurrentCompetitorsFromLatest(latest);
  const terms = extractRecurrentTerms(latest);
  const newHypotheses = await generateNewHypothesisFromLearning(competitors, terms);
  const added = await updateUniverseWithLearnings(newHypotheses);

  const output = {
    ran_at: new Date().toISOString(),
    based_on_scan_at: latest.scanned_at,
    recurrent_competitors: competitors,
    recurrent_terms: terms,
    new_hypothesis_generated: newHypotheses.length,
    added_to_universe: added.length,
    scope_note: "Ce systeme devient plus representatif des opportunites et patterns observes dans notre benchmark LLM. Il ne represente pas le comportement reel de tous les utilisateurs LLM.",
  };

  const outPath = path.join(PROJECT_ROOT, "data", "geo-learning-latest.json");
  await fs.writeFile(outPath, JSON.stringify(output, null, 2), "utf8");
  console.log(`Learning : ${added.length} new hypotheses added to universe.`);
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
    console.error("Learning loop failed:", err);
    process.exit(1);
  });
}

export { main as learnFromScans };
