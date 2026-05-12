/**
 * Notion API client minimaliste pour le tracking LinkedIn.
 *
 * 4 DB connectes (board "LinkedIn Agency" - integration "SKS Content Sync") :
 *  - KPIs Weekly       f3fab9e8-ff7f-4b8f-8966-2c5f13ef5bb4
 *  - Queue Validation  0fd5d67a-99ef-40ae-9c7a-5f93bbfb381f
 *  - Veille Sectorielle 4c76180e-2a1a-4ebf-bce3-e47f4abe4a1f
 *  - LinkedIn Calendar 644cc7c5-1fc0-4f16-a08c-db814364a614
 */

const NOTION_API = "https://api.notion.com/v1";

function getAuthHeaders() {
  const token = process.env.NOTION_TOKEN;
  const version = process.env.NOTION_VERSION ?? "2022-06-28";
  if (!token) {
    throw new Error("NOTION_TOKEN missing");
  }
  return {
    Authorization: `Bearer ${token}`,
    "Notion-Version": version,
    "Content-Type": "application/json"
  };
}

// ---------------- Helpers extraction de champs ----------------

type NotionProp = Record<string, unknown>;

export function readTitle(prop: NotionProp): string {
  const arr = (prop?.title as Array<{ plain_text: string }>) ?? [];
  return arr.map((t) => t.plain_text).join("");
}

export function readRichText(prop: NotionProp): string {
  const arr = (prop?.rich_text as Array<{ plain_text: string }>) ?? [];
  return arr.map((t) => t.plain_text).join("");
}

export function readNumber(prop: NotionProp): number | null {
  const n = prop?.number;
  return typeof n === "number" ? n : null;
}

export function readDate(prop: NotionProp): string | null {
  const d = (prop?.date as { start?: string } | null)?.start ?? null;
  return d;
}

export function readCreatedTime(prop: NotionProp): string | null {
  return (prop?.created_time as string) ?? null;
}

export function readUrl(prop: NotionProp): string | null {
  return (prop?.url as string) ?? null;
}

export function readSelect(prop: NotionProp): string | null {
  return (prop?.select as { name?: string } | null)?.name ?? null;
}

export function readStatus(prop: NotionProp): string | null {
  return (prop?.status as { name?: string } | null)?.name ?? null;
}

export function readRelation(prop: NotionProp): string[] {
  const arr = (prop?.relation as Array<{ id: string }>) ?? [];
  return arr.map((r) => r.id);
}

// ---------------- Queries DB ----------------

export type NotionPage = {
  id: string;
  properties: Record<string, NotionProp>;
  created_time: string;
  last_edited_time: string;
};

export async function queryDatabase(
  databaseId: string,
  opts: { pageSize?: number; sorts?: Array<{ property?: string; timestamp?: string; direction: "ascending" | "descending" }>; filter?: Record<string, unknown> } = {}
): Promise<NotionPage[]> {
  const headers = getAuthHeaders();
  const body: Record<string, unknown> = { page_size: opts.pageSize ?? 50 };
  if (opts.sorts) body.sorts = opts.sorts;
  if (opts.filter) body.filter = opts.filter;

  const response = await fetch(`${NOTION_API}/databases/${databaseId}/query`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    cache: "no-store"
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Notion query ${response.status}: ${text.slice(0, 240)}`);
  }
  const data = (await response.json()) as { results: NotionPage[] };
  return data.results;
}

// ---------------- Create page in DB ----------------

export type CreatePageProperty =
  | { type: "title"; value: string }
  | { type: "rich_text"; value: string }
  | { type: "number"; value: number }
  | { type: "url"; value: string }
  | { type: "date"; value: string } // ISO date string
  | { type: "select"; value: string }
  | { type: "status"; value: string };

export async function createPage(
  databaseId: string,
  properties: Record<string, CreatePageProperty>
): Promise<{ id: string }> {
  const headers = getAuthHeaders();
  const props: Record<string, unknown> = {};
  for (const [name, p] of Object.entries(properties)) {
    switch (p.type) {
      case "title":
        props[name] = { title: [{ text: { content: p.value } }] };
        break;
      case "rich_text":
        props[name] = { rich_text: [{ text: { content: p.value } }] };
        break;
      case "number":
        props[name] = { number: p.value };
        break;
      case "url":
        props[name] = { url: p.value };
        break;
      case "date":
        props[name] = { date: { start: p.value } };
        break;
      case "select":
        props[name] = { select: { name: p.value } };
        break;
      case "status":
        props[name] = { status: { name: p.value } };
        break;
    }
  }
  const response = await fetch(`${NOTION_API}/pages`, {
    method: "POST",
    headers,
    body: JSON.stringify({ parent: { database_id: databaseId }, properties: props }),
    cache: "no-store"
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Notion create ${response.status}: ${text.slice(0, 240)}`);
  }
  const data = (await response.json()) as { id: string };
  return { id: data.id };
}
