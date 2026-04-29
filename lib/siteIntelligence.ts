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

export async function appendSiteAnalyticsLog(payload: SiteAnalyticsEvent) {
  await mkdir(path.dirname(analyticsLogPath), { recursive: true });
  await appendFile(analyticsLogPath, `${JSON.stringify(payload)}\n`, "utf8");
}

export async function readSiteAnalyticsLog() {
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
  await mkdir(path.dirname(leadLogPath), { recursive: true });
  await appendFile(leadLogPath, `${JSON.stringify(payload)}\n`, "utf8");
}

export async function readLeadEventLog() {
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
