import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

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
    const url = `${supabaseUrl}/rest/v1/${table}?createdAt=gte.${encodeURIComponent(since)}&order=createdAt.asc&limit=10000`;
    const response = await fetch(url, {
      headers: {
        apikey: supabaseKey as string,
        Authorization: `Bearer ${supabaseKey}`
      },
      cache: "no-store"
    });
    if (!response.ok) return null;
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
    supabaseInsert(analyticsTable, payload)
  ]);
}

export async function readSiteAnalyticsLog() {
  // Prefer Supabase (durable) when configured; last 90d. Fallback to filesystem (dev).
  if (supabaseEnabled) {
    const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
    const remote = await supabaseSelect<SiteAnalyticsEvent>(analyticsTable, since);
    if (remote) return remote;
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

export async function appendLeadEventLog(payload: LeadEventLog) {
  await Promise.allSettled([
    (async () => {
      await mkdir(path.dirname(leadLogPath), { recursive: true });
      await appendFile(leadLogPath, `${JSON.stringify(payload)}\n`, "utf8");
    })(),
    supabaseInsert(leadsTable, payload)
  ]);
}

export async function readLeadEventLog() {
  if (supabaseEnabled) {
    const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
    const remote = await supabaseSelect<LeadEventLog>(leadsTable, since);
    if (remote) return remote;
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
