import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import {
  CREATED_AT_COLUMN,
  fromAnalyticsRow,
  fromLeadEventRow,
  toAnalyticsRow
} from "@/lib/supabaseRows";

export type SiteAnalyticsEvent = {
  type:
    | "pageview"
    | "agent_query"
    | "agent_query_voice"
    | "agent_content_gap"
    | "agent_click"
    | "cta_click"
    | "form_submit"
    | "form_success"
    | "form_error"
    | "frontend_error";
  path: string;
  title?: string;
  query?: string;
  target?: string;
  message?: string;
  sessionId?: string;
  createdAt: string;
};

export type LeadEventLog = {
  kind: string;
  pagePath: string;
  email?: string;
  createdAt: string;
};

const analyticsLogPath =
  process.env.SITE_ANALYTICS_LOG_PATH ?? path.join(process.cwd(), "data", "site-analytics-log.jsonl");
const leadLogPath =
  process.env.SITE_LEAD_LOG_PATH ?? path.join(process.cwd(), "data", "site-lead-log.jsonl");

const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const analyticsTable = process.env.SUPABASE_ANALYTICS_TABLE ?? "site_analytics";
const leadsTable = process.env.SUPABASE_LEADS_TABLE ?? "lead_events";
const supabaseEnabled = Boolean(supabaseUrl && supabaseKey);

/** Derniere erreur Supabase rencontree, affichee par /dashboard/suivi. */
let lastSupabaseError: string | null = null;

/** Etat de la source de donnees, pour distinguer 'vide' de 'casse'. */
export function getDataSourceStatus() {
  return {
    supabaseConfigured: supabaseEnabled,
    lastError: lastSupabaseError
  };
}

async function supabaseInsert(table: string, row: Record<string, unknown>): Promise<void> {
  if (!supabaseEnabled) return;
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: supabaseKey as string,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify(row),
      cache: "no-store"
    });
    if (!response.ok && process.env.NODE_ENV !== "production") {
      console.error(`Supabase insert ${table} ${response.status}`, await response.text());
    }
  } catch (error) {
    if (process.env.NODE_ENV !== "production") console.error(`Supabase insert ${table} error`, error);
  }
}

async function supabaseSelect<T>(table: string, since: string): Promise<T[] | null> {
  if (!supabaseEnabled) return null;
  try {
    const url = `${supabaseUrl}/rest/v1/${table}?${CREATED_AT_COLUMN}=gte.${encodeURIComponent(since)}&order=${CREATED_AT_COLUMN}.asc&limit=10000`;
    const response = await fetch(url, {
      headers: {
        apikey: supabaseKey as string,
        Authorization: `Bearer ${supabaseKey}`
      },
      cache: "no-store"
    });
    if (!response.ok) {
      // Cause la plus frequente : table absente ou colonne mal nommee. On le
      // trace, sinon le tableau de bord affiche zero sans rien expliquer.
      console.error(
        `Supabase select ${table} a echoue : ${response.status} ${await response.text().catch(() => "")}`
      );
      lastSupabaseError = `${table}: ${response.status}`;
      return null;
    }
    lastSupabaseError = null;
    return (await response.json()) as T[];
  } catch {
    return null;
  }
}

export async function appendSiteAnalyticsLog(payload: SiteAnalyticsEvent) {
  // Dual-write: filesystem (local dev) + Supabase (durable, prod). Both fire-and-forget.
  await Promise.allSettled([
    (async () => {
      await mkdir(path.dirname(analyticsLogPath), { recursive: true });
      await appendFile(analyticsLogPath, `${JSON.stringify(payload)}\n`, "utf8");
    })(),
    supabaseInsert(analyticsTable, toAnalyticsRow(payload))
  ]);
}

export async function readSiteAnalyticsLog(): Promise<SiteAnalyticsEvent[]> {
  // Prefer Supabase (durable) when configured; last 90d. Fallback to filesystem (dev).
  if (supabaseEnabled) {
    const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
    const remote = await supabaseSelect<Record<string, unknown>>(analyticsTable, since);
    if (remote) return remote.map(fromAnalyticsRow);
  }
  try {
    const raw = await readFile(analyticsLogPath, "utf8");
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line) as SiteAnalyticsEvent);
  } catch {
    return [] as SiteAnalyticsEvent[];
  }
}

/**
 * Trace locale d'un lead, pour le developpement.
 *
 * Cette fonction ecrivait aussi dans Supabase, alors que les huit routes qui
 * l'appellent appellent deja persistLeadDurably. Chaque soumission creait donc
 * deux lignes dans lead_events : une complete avec ses metadata, et une
 * minimale. Le tableau de bord comptait chaque lead deux fois.
 *
 * Constate en recette le 15/09/2026. La durabilite est desormais assuree par
 * persistLeadDurably seul, qui ecrit la ligne complete et alimente aussi le
 * webhook. Il reste ici le journal fichier, utile en local ou Supabase n'est
 * pas configure.
 */
export async function appendLeadEventLog(payload: LeadEventLog) {
  try {
    await mkdir(path.dirname(leadLogPath), { recursive: true });
    await appendFile(leadLogPath, `${JSON.stringify(payload)}\n`, "utf8");
  } catch {
    // Systeme de fichiers en lecture seule en production : sans consequence,
    // la ligne durable est ecrite par persistLeadDurably.
  }
}

export async function readLeadEventLog(): Promise<LeadEventLog[]> {
  if (supabaseEnabled) {
    const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
    const remote = await supabaseSelect<Record<string, unknown>>(leadsTable, since);
    if (remote) return remote.map(fromLeadEventRow);
  }
  try {
    const raw = await readFile(leadLogPath, "utf8");
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line) as LeadEventLog);
  } catch {
    return [] as LeadEventLog[];
  }
}
