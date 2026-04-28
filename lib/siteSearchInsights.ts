import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

export type SiteSearchLogEntry = {
  query: string;
  normalizedQuery: string;
  resultCount: number;
  topResults: string[];
  createdAt: string;
};

const searchLogPath =
  process.env.SITE_SEARCH_LOG_PATH ?? path.join(process.cwd(), "data", "site-search-log.jsonl");

export async function appendSiteSearchLog(payload: SiteSearchLogEntry) {
  await mkdir(path.dirname(searchLogPath), { recursive: true });
  await appendFile(searchLogPath, `${JSON.stringify(payload)}\n`, "utf8");
}

export async function readSiteSearchLog() {
  try {
    const raw = await readFile(searchLogPath, "utf8");
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line) as SiteSearchLogEntry);
  } catch {
    return [] as SiteSearchLogEntry[];
  }
}
