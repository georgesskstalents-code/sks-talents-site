import { promises as fs } from "fs";
import path from "path";

import { dashboardDefaultActions } from "@/data/dashboardActions";
import { dashboardDemoData } from "@/data/dashboardDemo";
import type {
  DashboardAction,
  DashboardActionStatus,
  DashboardMetricChip,
  DashboardNote
} from "@/lib/dashboardTypes";

const NOTION_VERSION = process.env.NOTION_VERSION ?? "2022-06-28";
const notesFilePath = path.join(process.cwd(), "data", "dashboard-notes-store.json");
const actionsFilePath = path.join(process.cwd(), "data", "dashboard-actions-store.json");

type NotionPage = {
  id: string;
  properties?: Record<
    string,
    {
      title?: Array<{ plain_text?: string }>;
      rich_text?: Array<{ plain_text?: string }>;
      select?: { name?: string };
      date?: { start?: string | null };
    }
  >;
};

type NoteInput = Omit<DashboardNote, "id" | "date"> & { date?: string };

const dashboardDefaultNotes: DashboardNote[] = dashboardDemoData.notes.map((note, index) => ({
  id: `note-${index + 1}`,
  ...note,
  tag: note.tag as DashboardNote["tag"]
}));

function getNotesDatabaseId() {
  return process.env.NOTION_DB_NOTES_ID ?? "";
}

function getActionsDatabaseId() {
  return process.env.NOTION_DB_ACTIONS_ID ?? "";
}

function isNotionDashboardConfigured() {
  return Boolean(process.env.NOTION_TOKEN && getNotesDatabaseId() && getActionsDatabaseId());
}

function notionHeaders() {
  const token = process.env.NOTION_TOKEN;
  if (!token) {
    throw new Error("NOTION_TOKEN is missing");
  }

  return {
    Authorization: `Bearer ${token}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json"
  };
}

async function notionRequest<T>(pathName: string, init?: RequestInit) {
  const response = await fetch(`https://api.notion.com/v1${pathName}`, {
    ...init,
    headers: {
      ...notionHeaders(),
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Notion dashboard API error ${response.status}: ${body}`);
  }

  return (await response.json()) as T;
}

async function ensureJsonFile<T>(filePath: string, fallback: T) {
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify(fallback, null, 2), "utf8");
  }
}

async function readJsonFile<T>(filePath: string, fallback: T) {
  await ensureJsonFile(filePath, fallback);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

async function writeJsonFile<T>(filePath: string, value: T) {
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}

function notionText(value: string) {
  return value
    ? [
        {
          type: "text",
          text: {
            content: value.slice(0, 1900)
          }
        }
      ]
    : [];
}

function extractTitle(page: NotionPage, propertyName = "Title") {
  return (page.properties?.[propertyName]?.title ?? []).map((item) => item.plain_text ?? "").join("").trim();
}

function extractRichText(page: NotionPage, propertyName: string) {
  return (page.properties?.[propertyName]?.rich_text ?? [])
    .map((item) => item.plain_text ?? "")
    .join("")
    .trim();
}

function extractSelect(page: NotionPage, propertyName: string) {
  return page.properties?.[propertyName]?.select?.name?.trim() ?? "";
}

function extractDate(page: NotionPage, propertyName: string) {
  return page.properties?.[propertyName]?.date?.start?.trim() ?? "";
}

function parseMetrics(raw: string): DashboardMetricChip[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as Array<{ label?: string; val?: string }>;
    return parsed
      .filter((item) => item?.label && item?.val)
      .map((item) => ({
        label: String(item.label),
        val: String(item.val)
      }));
  } catch {
    return [];
  }
}

function mapNotionNote(page: NotionPage): DashboardNote {
  return {
    id: page.id,
    title: extractTitle(page),
    date: extractDate(page, "Date") || new Date().toISOString().slice(0, 10),
    author: extractSelect(page, "Author") || "Équipe Strategy",
    tag: (extractSelect(page, "Tag") || "Insight") as DashboardNote["tag"],
    body: extractRichText(page, "Body")
  };
}

function mapNotionAction(page: NotionPage): DashboardAction {
  return {
    id: page.id,
    title: extractTitle(page),
    why: extractRichText(page, "Why"),
    source: (extractSelect(page, "Source") || "Ops") as DashboardAction["source"],
    owner: extractSelect(page, "Owner") || "Équipe Strategy",
    due: extractDate(page, "Due") || "",
    impact: (extractSelect(page, "Impact") || "medium") as DashboardAction["impact"],
    effort: (extractSelect(page, "Effort") || "medium") as DashboardAction["effort"],
    priority: (extractSelect(page, "Priority") || "P2") as DashboardAction["priority"],
    status: (extractSelect(page, "Status") || "todo") as DashboardAction["status"],
    metrics: parseMetrics(extractRichText(page, "Metrics"))
  };
}

async function queryNotesFromNotion() {
  const databaseId = getNotesDatabaseId();
  if (!databaseId) return null;

  const payload = await notionRequest<{ results?: NotionPage[] }>(`/databases/${databaseId}/query`, {
    method: "POST",
    body: JSON.stringify({
      page_size: 50,
      sorts: [{ property: "Date", direction: "descending" }]
    })
  });

  return (payload.results ?? []).map(mapNotionNote);
}

async function createNoteInNotion(input: NoteInput) {
  const databaseId = getNotesDatabaseId();
  if (!databaseId) return null;

  const response = await notionRequest<NotionPage>("/pages", {
    method: "POST",
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        Title: { title: notionText(input.title) },
        Date: { date: { start: input.date ?? new Date().toISOString().slice(0, 10) } },
        Author: { select: { name: input.author } },
        Tag: { select: { name: input.tag } },
        Body: { rich_text: notionText(input.body) }
      }
    })
  });

  return mapNotionNote(response);
}

async function queryActionsFromNotion() {
  const databaseId = getActionsDatabaseId();
  if (!databaseId) return null;

  const payload = await notionRequest<{ results?: NotionPage[] }>(`/databases/${databaseId}/query`, {
    method: "POST",
    body: JSON.stringify({
      page_size: 100,
      sorts: [
        { property: "Priority", direction: "ascending" },
        { property: "Due", direction: "ascending" }
      ]
    })
  });

  return (payload.results ?? []).map(mapNotionAction);
}

async function updateActionInNotion(id: string, status: DashboardActionStatus) {
  const response = await notionRequest<NotionPage>(`/pages/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      properties: {
        Status: { select: { name: status } }
      }
    })
  });

  return mapNotionAction(response);
}

export function getDashboardSourceState() {
  const hasToken = Boolean(process.env.NOTION_TOKEN);

  return {
    notesConfigured: Boolean(hasToken && getNotesDatabaseId()),
    actionsConfigured: Boolean(hasToken && getActionsDatabaseId()),
    fullyConfigured: isNotionDashboardConfigured()
  };
}

export async function listDashboardNotes() {
  if (process.env.NOTION_TOKEN && getNotesDatabaseId()) {
    try {
      const notionNotes = await queryNotesFromNotion();
      if (notionNotes) return notionNotes;
    } catch (error) {
      console.error("Dashboard notes Notion fallback", error);
    }
  }

  return readJsonFile<DashboardNote[]>(notesFilePath, dashboardDefaultNotes);
}

export async function createDashboardNote(input: NoteInput) {
  if (process.env.NOTION_TOKEN && getNotesDatabaseId()) {
    try {
      const notionNote = await createNoteInNotion(input);
      if (notionNote) return notionNote;
    } catch (error) {
      console.error("Dashboard note create Notion fallback", error);
    }
  }

  const current = await readJsonFile<DashboardNote[]>(notesFilePath, dashboardDefaultNotes);
  const nextNote: DashboardNote = {
    id: crypto.randomUUID(),
    title: input.title,
    date: input.date ?? new Date().toISOString().slice(0, 10),
    author: input.author,
    tag: input.tag,
    body: input.body
  };
  const next = [nextNote, ...current];
  await writeJsonFile(notesFilePath, next);
  return nextNote;
}

export async function listDashboardActions() {
  if (process.env.NOTION_TOKEN && getActionsDatabaseId()) {
    try {
      const notionActions = await queryActionsFromNotion();
      if (notionActions) return notionActions;
    } catch (error) {
      console.error("Dashboard actions Notion fallback", error);
    }
  }

  return readJsonFile<DashboardAction[]>(actionsFilePath, dashboardDefaultActions);
}

export async function updateDashboardActionStatus(id: string, status: DashboardActionStatus) {
  if (process.env.NOTION_TOKEN && getActionsDatabaseId()) {
    try {
      return await updateActionInNotion(id, status);
    } catch (error) {
      console.error("Dashboard action update Notion fallback", error);
    }
  }

  const current = await readJsonFile<DashboardAction[]>(actionsFilePath, dashboardDefaultActions);
  const next = current.map((action) => (action.id === id ? { ...action, status } : action));
  const updated = next.find((action) => action.id === id);

  if (!updated) {
    throw new Error("Action introuvable.");
  }

  await writeJsonFile(actionsFilePath, next);
  return updated;
}
