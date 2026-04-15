import { articles, type Article } from "@/data/articles";
import { jobRoles, type JobRole } from "@/data/jobRoles";
import { validateArticleForSync, validateJobRoleForSync } from "@/lib/contentGovernance";

const NOTION_VERSION = process.env.NOTION_VERSION ?? "2022-06-28";

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
  | { url: string | null };

type NotionPage = {
  id: string;
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
    }
  >;
};

type NotionDatabase = {
  properties?: Record<string, { type?: string }>;
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
};

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

async function notionRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`https://api.notion.com/v1${path}`, {
    ...init,
    headers: {
      ...getHeaders(),
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

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

async function findPageBySlug(databaseId: string, slug: string) {
  const payload = await notionRequest<{ results: NotionPage[] }>(`/databases/${databaseId}/query`, {
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
  });

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
    lower.includes("biotech") ||
    lower.includes("diagnostic") ||
    lower.includes("medtech") ||
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
    sourceUrl: extractUrl(page, "Source URL")
  };
}

export async function getNotionSiteContentBySlug(
  slug: string,
  expectedContentType?: string
): Promise<NotionSiteContentEntry | null> {
  if (!hasNotionReadConfig()) {
    return null;
  }

  const databaseId = process.env.NOTION_SITE_DATABASE_ID!;
  const page = await findPageBySlug(databaseId, slug);
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
}

export async function getNotionSiteContentList(
  expectedContentType?: string,
  limit = 100
): Promise<NotionSiteContentEntry[]> {
  if (!hasNotionReadConfig()) {
    return [];
  }

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

  const payload = await notionRequest<{ results: NotionPage[] }>(`/databases/${databaseId}/query`, {
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
  });

  return payload.results.map(mapPageToSiteContentEntry).filter((entry) => entry.status === "Published");
}

export async function syncNotionContent({
  articleLimit = 10,
  roleLimit = 20
}: {
  articleLimit?: number;
  roleLimit?: number;
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

  const articleResults: Array<{ action: "created" | "updated"; id: string }> = [];
  const roleResults: Array<{ action: "created" | "updated"; id: string }> = [];
  const rejectedArticles: Array<{ slug: string; title: string; errors: string[] }> = [];
  const rejectedJobRoles: Array<{ slug: string; title: string; errors: string[] }> = [];

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
    rejectedArticles,
    rejectedJobRoles
  };
}
