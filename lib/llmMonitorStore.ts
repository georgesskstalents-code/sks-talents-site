/**
 * Persistence Supabase pour les checks LLM. Table 'llm_mention_checks' :
 *
 * CREATE TABLE llm_mention_checks (
 *   id uuid default gen_random_uuid() primary key,
 *   run_at timestamptz default now() not null,
 *   provider text not null,
 *   model text not null,
 *   prompt text not null,
 *   mentioned boolean not null,
 *   matched_pattern text,
 *   response_excerpt text,
 *   duration_ms int,
 *   error_reason text
 * );
 *
 * Voir docs/SETUP-STRATEGIC-TRACKING.md pour le SQL complet.
 */

import type { LlmMentionResult } from "./llmMonitor";

export type StoredCheck = LlmMentionResult & { runAt: string };

export async function persistChecks(results: LlmMentionResult[]): Promise<{ ok: boolean; count: number }> {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || results.length === 0) {
    return { ok: false, count: 0 };
  }
  const runAt = new Date().toISOString();
  const rows = results.map((r) => ({
    run_at: runAt,
    provider: r.provider,
    model: r.model,
    prompt: r.prompt,
    mentioned: r.mentioned,
    matched_pattern: r.matchedPattern ?? null,
    response_excerpt: r.responseExcerpt,
    duration_ms: r.durationMs,
    error_reason: r.errorReason ?? null
  }));
  try {
    const response = await fetch(`${url}/rest/v1/llm_mention_checks`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify(rows),
      cache: "no-store"
    });
    return { ok: response.ok, count: rows.length };
  } catch {
    return { ok: false, count: 0 };
  }
}

/**
 * Recupere les checks les plus recents (derniers 14 jours) groupes par (provider, prompt).
 * Pour chaque combo on prend la valeur la plus recente.
 */
export async function fetchLatestChecks(): Promise<StoredCheck[]> {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];

  const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
  try {
    const response = await fetch(
      `${url}/rest/v1/llm_mention_checks?run_at=gte.${encodeURIComponent(since)}&order=run_at.desc&limit=500`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        cache: "no-store"
      }
    );
    if (!response.ok) return [];
    const rows = (await response.json()) as Array<{
      run_at: string;
      provider: string;
      model: string;
      prompt: string;
      mentioned: boolean;
      matched_pattern: string | null;
      response_excerpt: string;
      duration_ms: number;
      error_reason: string | null;
    }>;

    // Garder le check le plus recent pour chaque (provider, prompt).
    const seen = new Set<string>();
    const latest: StoredCheck[] = [];
    for (const r of rows) {
      const k = `${r.provider}|${r.prompt}`;
      if (seen.has(k)) continue;
      seen.add(k);
      latest.push({
        runAt: r.run_at,
        provider: r.provider as StoredCheck["provider"],
        model: r.model,
        prompt: r.prompt,
        mentioned: r.mentioned,
        matchedPattern: r.matched_pattern ?? undefined,
        responseExcerpt: r.response_excerpt,
        durationMs: r.duration_ms,
        errorReason: r.error_reason ?? undefined
      });
    }
    return latest;
  } catch {
    return [];
  }
}
