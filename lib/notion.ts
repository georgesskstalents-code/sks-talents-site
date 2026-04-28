import { articles, type Article } from "@/data/articles";
import { jobRoles, type JobRole } from "@/data/jobRoles";
import { references, type Reference } from "@/data/references";
import { events, schools, type ResourceItem } from "@/data/resources";
import {
  validateArticleForSync,
  validateEventForSync,
  validateJobRoleForSync,
  validateReferenceForSync,
  validateSchoolForSync
} from "@/lib/contentGovernance";

const NOTION_VERSION = process.env.NOTION_VERSION ?? "2022-06-28";
const NOTION_READ_TIMEOUT_MS = Number(process.env.NOTION_READ_TIMEOUT_MS ?? "2500");

type NotionRichText = {
  type: "text";
  text: {
    content: string;
    link?: { url: string } | null;
  };
};

type NotionPropertyValue =
  | { title: NotionRichText[] }
  | { rich_text: NotionRichText[] }
  | { select: { name: string } | null }
  | { status: { name: string } | null }
  | { multi_select: { name: string }[] }
  | { number: number }
  | { date: { start: string } | null }
  | { url: string | null }
  | {
      files: Array<{
        name?: string;
        type?: "external" | "file";
        external?: { url?: string };
        file?: { url?: string };
      }>;
    };

type NotionPage = {
  id: string;
  cover?: {
    type?: "external" | "file";
    external?: { url?: string };
    file?: { url?: string };
  } | null;
  properties?: Record<
    string,
    {
      type?: string;
      rich_text?: { plain_text?: string }[];
      title?: { plain_text?: string }[];
      select?: { name?: string };
      status?: { name?: string };
      date?: { start?: string };
      url?: string | null;
      files?: Array<{
        name?: string;
        type?: "external" | "file";
        external?: { url?: string };
        file?: { url?: string };
      }>;
    }
  >;
};

type NotionDatabase = {
  properties?: Record<string, { type?: string }>;
};

type NotionFetchOptions = {
  cache?: RequestCache;
  timeoutMs?: number;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

export type NotionSiteContentEntry = {
  id: string;
  title: string;
  slug: string;
  contentType: string;
  status: string;
  vertical: string;
  category: string;
  excerpt: string;
  mainContent: string;
  publishDate: string;
  seoTitle: string;
  metaDescription: string;
  salaryRange: string;
  studies: string;
  schools: string;
  industries: string;
  sourceName: string;
  sourceUrl: string;
  heroImageUrl: string;
  heroImageAlt: string;
};

export function mapNotionEntryToResourceItem(entry: NotionSiteContentEntry): ResourceItem {
  return {
    slug: entry.slug,
    title: entry.title,
    summary: entry.excerpt || entry.mainContent || entry.metaDescription,
    sector: entry.vertical || entry.category || "Cross-sector",
    location: entry.category || undefined,
    dateLabel: entry.publishDate || undefined,
    href: entry.sourceUrl || undefined
  };
}

export function mapNotionEntryToReference(entry: NotionSiteContentEntry): Reference {
  return {
    slug: entry.slug,
    company: entry.title,
    category: entry.vertical || "Cross-sector",
    descriptor: entry.category || undefined,
    summary: entry.excerpt || entry.mainContent || entry.metaDescription,
    impact:
      entry.mainContent || "Référence éditoriale enrichie depuis Notion pour soutenir la preuve sociale du site.",
    website: entry.sourceUrl || undefined
  };
}

function notionText(value: string): NotionRichText[] {
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

function getHeaders() {
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

async function notionRequest<T>(
  path: string,
  init?: RequestInit,
  timeoutMs = 10000,
  fetchOptions?: NotionFetchOptions
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  let response: Response;

  try {
    response = await fetch(`https://api.notion.com/v1${path}`, {
      ...init,
      headers: {
        ...getHeaders(),
        ...(init?.headers ?? {})
      },
      cache: fetchOptions?.cache ?? "no-store",
      next: fetchOptions?.next,
      signal: controller.signal
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`Notion request timeout after ${timeoutMs}ms`);
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Notion API error ${response.status}: ${body}`);
  }

  return (await response.json()) as T;
}

async function getDatabaseSchema(databaseId: string) {
  return notionRequest<NotionDatabase>(`/databases/${databaseId}`);
}

function extractSlug(page: NotionPage, propertyName = "Slug") {
  const richText = page.properties?.[propertyName]?.rich_text ?? [];
  return richText.map((item) => item.plain_text ?? "").join("").trim();
}

function extractTitle(page: NotionPage, propertyName = "Title") {
  const title = page.properties?.[propertyName]?.title ?? [];
  return title.map((item) => item.plain_text ?? "").join("").trim();
}

function extractSelect(page: NotionPage, propertyName: string) {
  return page.properties?.[propertyName]?.select?.name?.trim() ?? "";
}

function extractStatus(page: NotionPage, propertyName = "Status") {
  return page.properties?.[propertyName]?.status?.name?.trim() ?? "";
}

function extractRichText(page: NotionPage, propertyName: string) {
  const richText = page.properties?.[propertyName]?.rich_text ?? [];
  return richText.map((item) => item.plain_text ?? "").join("").trim();
}

function extractDate(page: NotionPage, propertyName: string) {
  return page.properties?.[propertyName]?.date?.start?.trim() ?? "";
}

function extractUrl(page: NotionPage, propertyName: string) {
  return page.properties?.[propertyName]?.url?.trim() ?? "";
}

function extractFilesUrl(page: NotionPage, propertyName: string) {
  const files = page.properties?.[propertyName]?.files ?? [];
  const firstFile = files.find((item) => item?.external?.url || item?.file?.url);
  return firstFile?.external?.url?.trim() || firstFile?.file?.url?.trim() || "";
}

function extractCoverUrl(page: NotionPage) {
  return page.cover?.external?.url?.trim() || page.cover?.file?.url?.trim() || "";
}

function extractFirstMatchingUrl(page: NotionPage, propertyNames: string[]) {
  for (const propertyName of propertyNames) {
    const url = extractUrl(page, propertyName);
    if (url) return url;
  }

  return "";
}

function extractFirstMatchingFilesUrl(page: NotionPage, propertyNames: string[]) {
  for (const propertyName of propertyNames) {
    const url = extractFilesUrl(page, propertyName);
    if (url) return url;
  }

  return "";
}

function extractHeroImageUrl(page: NotionPage) {
  return (
    extractFirstMatchingUrl(page, ["Hero Image URL", "Cover Image URL", "Image URL"]) ||
    extractFirstMatchingFilesUrl(page, ["Hero Image", "Cover Image", "Image"]) ||
    extractCoverUrl(page)
  );
}

function extractHeroImageAlt(page: NotionPage) {
  return (
    extractRichText(page, "Hero Image Alt") ||
    extractRichText(page, "Image Alt") ||
    extractTitle(page)
  );
}

async function findPageBySlug(databaseId: string, slug: string, timeoutMs = 10000) {
  const payload = await notionRequest<{ results: NotionPage[] }>(
    `/databases/${databaseId}/query`,
    {
      method: "POST",
      body: JSON.stringify({
        filter: {
          property: "Slug",
          rich_text: {
            equals: slug
          }
        },
        page_size: 1
      })
    },
    timeoutMs
  );

  return payload.results.find((entry) => extractSlug(entry) === slug) ?? null;
}

async function upsertDatabasePage(
  databaseId: string,
  slug: string,
  properties: Record<string, NotionPropertyValue>
) {
  const existing = await findPageBySlug(databaseId, slug);

  if (existing) {
    await notionRequest(`/pages/${existing.id}`, {
      method: "PATCH",
      body: JSON.stringify({ properties })
    });
    return { action: "updated" as const, id: existing.id };
  }

  const created = await notionRequest<{ id: string }>("/pages", {
    method: "POST",
    body: JSON.stringify({
      parent: {
        database_id: databaseId
      },
      properties
    })
  });

  return { action: "created" as const, id: created.id };
}

function mapArticleToProperties(article: Article): Record<string, NotionPropertyValue> {
  return {
    Title: { title: notionText(article.title) },
    Slug: { rich_text: notionText(article.slug) },
    Vertical: { select: { name: article.vertical } },
    Persona: { multi_select: article.persona.map((value) => ({ name: value })) },
    Topic: { select: { name: article.topic } },
    Excerpt: { rich_text: notionText(article.excerpt) },
    Content: { rich_text: notionText(article.content.slice(0, 1800)) },
    Date: { date: { start: article.date } },
    "Read time": { number: article.readTime }
  };
}

function mapRoleToProperties(role: JobRole): Record<string, NotionPropertyValue> {
  return {
    Title: { title: notionText(role.title) },
    Slug: { rich_text: notionText(role.slug) },
    Sector: { select: { name: role.sector } },
    Category: { select: { name: role.category } },
    Shortage: { select: { name: role.shortageLevel } },
    Salary: { rich_text: notionText(role.salary) },
    Summary: { rich_text: notionText(role.summary) },
    Studies: { rich_text: notionText(role.studies.join(" · ")) },
    Schools: { rich_text: notionText(role.schools.join(" · ")) },
    Industries: { rich_text: notionText(role.relatedIndustries.join(" · ")) }
  };
}

function pickKnownProperties(
  candidateProperties: Record<string, NotionPropertyValue>,
  schema: Record<string, { type?: string }> | undefined
): Record<string, NotionPropertyValue> {
  if (!schema) {
    return candidateProperties;
  }

  const entries = Object.entries(candidateProperties)
    .filter(([key]) => Object.prototype.hasOwnProperty.call(schema, key))
    .map(([key, value]) => [key, coercePropertyValueForSchema(value, schema[key]?.type)] as const)
    .filter((entry): entry is readonly [string, NotionPropertyValue] => entry[1] !== null);

  return Object.fromEntries(entries);
}

function getPlainText(value: NotionPropertyValue) {
  if ("title" in value) {
    return value.title.map((item) => item.text.content).join("").trim();
  }

  if ("rich_text" in value) {
    return value.rich_text.map((item) => item.text.content).join("").trim();
  }

  if ("select" in value) {
    return value.select?.name?.trim() ?? "";
  }

  if ("status" in value) {
    return value.status?.name?.trim() ?? "";
  }

  if ("multi_select" in value) {
    return value.multi_select.map((item) => item.name).join(" · ").trim();
  }

  if ("number" in value) {
    return String(value.number);
  }

  if ("date" in value) {
    return value.date?.start ?? "";
  }

  if ("url" in value) {
    return value.url?.trim() ?? "";
  }

  return "";
}

function getPlainTextArray(value: NotionPropertyValue) {
  if ("multi_select" in value) {
    return value.multi_select
      .map((item) => item.name.trim())
      .filter(Boolean)
      .slice(0, 20);
  }

  const text = getPlainText(value);
  return text
    .split(/[·,]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 20);
}

function coercePropertyValueForSchema(
  value: NotionPropertyValue,
  schemaType: string | undefined
): NotionPropertyValue | null {
  if (!schemaType) {
    return value;
  }

  const text = getPlainText(value);

  if (schemaType === "title") {
    return { title: notionText(text) };
  }

  if (schemaType === "rich_text") {
    return { rich_text: notionText(text) };
  }

  if (schemaType === "select") {
    return { select: text ? { name: text } : null };
  }

  if (schemaType === "status") {
    return { status: text ? { name: text } : null };
  }

  if (schemaType === "multi_select") {
    return { multi_select: getPlainTextArray(value).map((item) => ({ name: item })) };
  }

  if (schemaType === "number") {
    const numberValue = Number(text);
    return { number: Number.isFinite(numberValue) ? numberValue : 0 };
  }

  if (schemaType === "date") {
    return { date: text ? { start: text } : null };
  }

  if (schemaType === "url") {
    const url = text.split(" · ").map((item) => item.trim()).find((item) => /^https?:\/\//.test(item));
    return { url: url ?? null };
  }

  return null;
}

function normalizeSingleDatabaseVertical(value: string) {
  if (value === "Life Sciences" || value === "Agro" || value === "Green Engineering") {
    return value;
  }

  const lower = value.toLowerCase();
  if (
    lower.includes("animal") ||
    lower.includes("medical vet") ||
    lower.includes("veterinary") ||
    lower.includes("petfood")
  ) {
    return "Animal Health";
  }

  if (lower.includes("medtech")) {
    return "Life Sciences";
  }

  if (
    lower.includes("biotech") ||
    lower.includes("diagnostic") ||
    lower.includes("cosm")
  ) {
    return "Life Sciences";
  }

  if (lower.includes("agro")) {
    return "Agro";
  }

  if (lower.includes("green")) {
    return "Green Engineering";
  }

  return "Cross-sector";
}

function mapArticleToSingleDatabaseProperties(article: Article): Record<string, NotionPropertyValue> {
  return {
    Title: { title: notionText(article.title) },
    Slug: { rich_text: notionText(article.slug) },
    "Content Type": { select: { name: "article" } },
    Status: { status: { name: "Published" } },
    Vertical: { select: { name: normalizeSingleDatabaseVertical(article.vertical) } },
    Topic: { select: { name: article.topic } },
    Excerpt: { rich_text: notionText(article.excerpt) },
    "Main Content": { rich_text: notionText(article.content.slice(0, 1800)) },
    "Publish date": { date: { start: article.date } },
    "SEO Title": { rich_text: notionText(article.title) },
    "Meta Description": { rich_text: notionText(article.excerpt) },
    Category: { select: { name: "Article" } },
    "Source Name": {
      rich_text: notionText(article.sources?.map((source) => source.name).join(" · ") ?? "")
    },
    "Source URL": {
      url: article.sources?.[0]?.url ?? null
    }
  };
}

function mapRoleToSingleDatabaseProperties(role: JobRole): Record<string, NotionPropertyValue> {
  return {
    Title: { title: notionText(role.title) },
    Slug: { rich_text: notionText(role.slug) },
    "Content Type": { select: { name: "job_role" } },
    Status: { status: { name: "Published" } },
    Vertical: { select: { name: normalizeSingleDatabaseVertical(role.sector) } },
    Category: { select: { name: role.category } },
    "Salary Range": { rich_text: notionText(role.salary) },
    Excerpt: { rich_text: notionText(role.summary) },
    "Main Content": {
      rich_text: notionText(
        [
          role.summary,
          `Missions: ${role.missions.join(" · ")}`,
          `Competences: ${role.skills.join(" · ")}`
        ].join(" ")
      )
    },
    Studies: { rich_text: notionText(role.studies.join(" · ")) },
    Schools: { rich_text: notionText(role.schools.join(" · ")) },
    Industries: { rich_text: notionText(role.relatedIndustries.join(" · ")) },
    "SEO Title": { rich_text: notionText(role.title) },
    "Meta Description": { rich_text: notionText(role.summary) }
  };
}

function mapEventToSingleDatabaseProperties(event: ResourceItem): Record<string, NotionPropertyValue> {
  return {
    Title: { title: notionText(event.title) },
    Slug: { rich_text: notionText(event.slug) },
    "Content Type": { select: { name: "event" } },
    Status: { status: { name: "Published" } },
    Vertical: { select: { name: normalizeSingleDatabaseVertical(event.sector) } },
    Category: { select: { name: event.location || event.sector } },
    Excerpt: { rich_text: notionText(event.summary) },
    "Main Content": {
      rich_text: notionText(
        [event.summary, event.location, event.dateLabel].filter(Boolean).join(" · ")
      )
    },
    "Publish date": {
      date: /^\d{4}-\d{2}-\d{2}$/.test(event.dateLabel ?? "") ? { start: event.dateLabel! } : null
    },
    "SEO Title": { rich_text: notionText(event.title) },
    "Meta Description": { rich_text: notionText(event.summary) },
    "Source Name": { rich_text: notionText(event.title) },
    "Source URL": { url: event.href ?? null }
  };
}

function mapSchoolToSingleDatabaseProperties(school: ResourceItem): Record<string, NotionPropertyValue> {
  return {
    Title: { title: notionText(school.title) },
    Slug: { rich_text: notionText(school.slug) },
    "Content Type": { select: { name: "school" } },
    Status: { status: { name: "Published" } },
    Vertical: { select: { name: normalizeSingleDatabaseVertical(school.sector) } },
    Category: { select: { name: school.location || school.sector } },
    Excerpt: { rich_text: notionText(school.summary) },
    "Main Content": {
      rich_text: notionText([school.summary, school.location, school.sector].filter(Boolean).join(" · "))
    },
    "SEO Title": { rich_text: notionText(school.title) },
    "Meta Description": { rich_text: notionText(school.summary) },
    "Source Name": { rich_text: notionText(school.title) },
    "Source URL": { url: school.href ?? null }
  };
}

function mapReferenceToSingleDatabaseProperties(reference: Reference): Record<string, NotionPropertyValue> {
  return {
    Title: { title: notionText(reference.company) },
    Slug: { rich_text: notionText(reference.slug) },
    "Content Type": { select: { name: "reference" } },
    Status: { status: { name: "Published" } },
    Vertical: { select: { name: normalizeSingleDatabaseVertical(reference.category) } },
    Category: { select: { name: reference.descriptor || reference.category } },
    Excerpt: { rich_text: notionText(reference.summary) },
    "Main Content": { rich_text: notionText(reference.impact) },
    "SEO Title": { rich_text: notionText(reference.company) },
    "Meta Description": { rich_text: notionText(reference.summary) },
    "Source Name": { rich_text: notionText(reference.company) },
    "Source URL": { url: reference.website ?? null }
  };
}

export function hasNotionSyncConfig() {
  return Boolean(
    process.env.NOTION_TOKEN &&
      (process.env.NOTION_SITE_DATABASE_ID ||
        (process.env.NOTION_ARTICLES_DATABASE_ID && process.env.NOTION_JOB_ROLES_DATABASE_ID))
  );
}

export function hasNotionReadConfig() {
  return Boolean(process.env.NOTION_TOKEN && process.env.NOTION_SITE_DATABASE_ID);
}

function mapPageToSiteContentEntry(page: NotionPage): NotionSiteContentEntry {
  return {
    id: page.id,
    title: extractTitle(page),
    slug: extractSlug(page),
    contentType: extractSelect(page, "Content Type"),
    status: extractStatus(page),
    vertical: extractSelect(page, "Vertical"),
    category: extractSelect(page, "Category"),
    excerpt: extractRichText(page, "Excerpt"),
    mainContent: extractRichText(page, "Main Content"),
    publishDate: extractDate(page, "Publish date"),
    seoTitle: extractRichText(page, "SEO Title"),
    metaDescription: extractRichText(page, "Meta Description"),
    salaryRange: extractRichText(page, "Salary Range"),
    studies: extractRichText(page, "Studies"),
    schools: extractRichText(page, "Schools"),
    industries: extractRichText(page, "Industries"),
    sourceName: extractRichText(page, "Source Name"),
    sourceUrl: extractUrl(page, "Source URL"),
    heroImageUrl: extractHeroImageUrl(page),
    heroImageAlt: extractHeroImageAlt(page)
  };
}

export async function getNotionSiteContentBySlug(
  slug: string,
  expectedContentType?: string
): Promise<NotionSiteContentEntry | null> {
  if (!hasNotionReadConfig()) {
    return null;
  }

  try {
    const databaseId = process.env.NOTION_SITE_DATABASE_ID!;
    const page = await findPageBySlug(databaseId, slug, NOTION_READ_TIMEOUT_MS);
    if (!page) {
      return null;
    }

    const entry = mapPageToSiteContentEntry(page);
    if (entry.status !== "Published") {
      return null;
    }

    if (expectedContentType && entry.contentType !== expectedContentType) {
      return null;
    }

    return entry;
  } catch (error) {
    console.error(`Notion read fallback by slug for "${slug}".`, error);
    return null;
  }
}

export async function getNotionSiteContentList(
  expectedContentType?: string,
  limit = 100,
  fetchOptions?: NotionFetchOptions
): Promise<NotionSiteContentEntry[]> {
  if (!hasNotionReadConfig()) {
    return [];
  }

  try {
    const databaseId = process.env.NOTION_SITE_DATABASE_ID!;
    const filters: Array<Record<string, unknown>> = [
      {
        property: "Status",
        status: {
          equals: "Published"
        }
      }
    ];

    if (expectedContentType) {
      filters.push({
        property: "Content Type",
        select: {
          equals: expectedContentType
        }
      });
    }

    const payload = await notionRequest<{ results: NotionPage[] }>(
      `/databases/${databaseId}/query`,
      {
        method: "POST",
        body: JSON.stringify({
          filter: {
            and: filters
          },
          sorts: [
            {
              property: "Publish date",
              direction: "descending"
            }
          ],
          page_size: limit
        })
      },
      fetchOptions?.timeoutMs ?? NOTION_READ_TIMEOUT_MS,
      fetchOptions
    );

    return payload.results
      .map(mapPageToSiteContentEntry)
      .filter((entry) => entry.status === "Published");
  } catch (error) {
    console.error("Notion read fallback for site content list.", error);
    return [];
  }
}

export async function syncNotionContent({
  articleLimit = 10,
  roleLimit = 20,
  eventLimit = 20,
  schoolLimit = 30,
  referenceLimit = 20
}: {
  articleLimit?: number;
  roleLimit?: number;
  eventLimit?: number;
  schoolLimit?: number;
  referenceLimit?: number;
}) {
  if (!hasNotionSyncConfig()) {
    throw new Error("Notion sync config missing");
  }

  const siteDatabaseId = process.env.NOTION_SITE_DATABASE_ID;
  const articleDatabaseId = process.env.NOTION_ARTICLES_DATABASE_ID!;
  const roleDatabaseId = process.env.NOTION_JOB_ROLES_DATABASE_ID!;

  const latestArticles = [...articles]
    .sort((left, right) => right.date.localeCompare(left.date))
    .slice(0, articleLimit);

  const latestRoles = [...jobRoles]
    .sort((left, right) => right.shortageLevel.localeCompare(left.shortageLevel, "fr"))
    .slice(0, roleLimit);
  const latestEvents = [...events]
    .filter((event) => event.href)
    .slice(0, eventLimit);
  const latestSchools = [...schools]
    .filter((school) => school.href)
    .slice(0, schoolLimit);
  const latestReferences = [...references]
    .filter((reference) => reference.website)
    .slice(0, referenceLimit);

  const articleResults: Array<{ action: "created" | "updated"; id: string }> = [];
  const roleResults: Array<{ action: "created" | "updated"; id: string }> = [];
  const eventResults: Array<{ action: "created" | "updated"; id: string }> = [];
  const schoolResults: Array<{ action: "created" | "updated"; id: string }> = [];
  const referenceResults: Array<{ action: "created" | "updated"; id: string }> = [];
  const rejectedArticles: Array<{ slug: string; title: string; errors: string[] }> = [];
  const rejectedJobRoles: Array<{ slug: string; title: string; errors: string[] }> = [];
  const rejectedEvents: Array<{ slug: string; title: string; errors: string[] }> = [];
  const rejectedSchools: Array<{ slug: string; title: string; errors: string[] }> = [];
  const rejectedReferences: Array<{ slug: string; title: string; errors: string[] }> = [];

  const validatedArticles = latestArticles.filter((article) => {
    const validation = validateArticleForSync(article);
    if (!validation.ok) {
      rejectedArticles.push({
        slug: article.slug,
        title: article.title,
        errors: validation.errors
      });
      return false;
    }

    return true;
  });

  const validatedRoles = latestRoles.filter((role) => {
    const validation = validateJobRoleForSync(role);
    if (!validation.ok) {
      rejectedJobRoles.push({
        slug: role.slug,
        title: role.title,
        errors: validation.errors
      });
      return false;
    }

    return true;
  });

  const validatedEvents = latestEvents.filter((event) => {
    const validation = validateEventForSync(event);
    if (!validation.ok) {
      rejectedEvents.push({
        slug: event.slug,
        title: event.title,
        errors: validation.errors
      });
      return false;
    }

    return true;
  });

  const validatedSchools = latestSchools.filter((school) => {
    const validation = validateSchoolForSync(school);
    if (!validation.ok) {
      rejectedSchools.push({
        slug: school.slug,
        title: school.title,
        errors: validation.errors
      });
      return false;
    }

    return true;
  });

  const validatedReferences = latestReferences.filter((reference) => {
    const validation = validateReferenceForSync(reference);
    if (!validation.ok) {
      rejectedReferences.push({
        slug: reference.slug,
        title: reference.company,
        errors: validation.errors
      });
      return false;
    }

    return true;
  });

  if (siteDatabaseId) {
    const siteSchema = await getDatabaseSchema(siteDatabaseId);

    for (const article of validatedArticles) {
      articleResults.push(
        await upsertDatabasePage(
          siteDatabaseId,
          article.slug,
          pickKnownProperties(mapArticleToSingleDatabaseProperties(article), siteSchema.properties)
        )
      );
    }

    for (const role of validatedRoles) {
      roleResults.push(
        await upsertDatabasePage(
          siteDatabaseId,
          role.slug,
          pickKnownProperties(mapRoleToSingleDatabaseProperties(role), siteSchema.properties)
        )
      );
    }

    for (const event of validatedEvents) {
      eventResults.push(
        await upsertDatabasePage(
          siteDatabaseId,
          event.slug,
          pickKnownProperties(mapEventToSingleDatabaseProperties(event), siteSchema.properties)
        )
      );
    }

    for (const school of validatedSchools) {
      schoolResults.push(
        await upsertDatabasePage(
          siteDatabaseId,
          school.slug,
          pickKnownProperties(mapSchoolToSingleDatabaseProperties(school), siteSchema.properties)
        )
      );
    }

    for (const reference of validatedReferences) {
      referenceResults.push(
        await upsertDatabasePage(
          siteDatabaseId,
          reference.slug,
          pickKnownProperties(mapReferenceToSingleDatabaseProperties(reference), siteSchema.properties)
        )
      );
    }
  } else {
    for (const article of validatedArticles) {
      articleResults.push(
        await upsertDatabasePage(articleDatabaseId, article.slug, mapArticleToProperties(article))
      );
    }

    for (const role of validatedRoles) {
      roleResults.push(await upsertDatabasePage(roleDatabaseId, role.slug, mapRoleToProperties(role)));
    }
  }

  return {
    articles: articleResults,
    jobRoles: roleResults,
    events: eventResults,
    schools: schoolResults,
    references: referenceResults,
    rejectedArticles,
    rejectedJobRoles,
    rejectedEvents,
    rejectedSchools,
    rejectedReferences
  };
}
