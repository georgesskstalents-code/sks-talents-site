function readFlag(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1) {
    return "";
  }

  return String(process.argv[index + 1] ?? "").trim();
}

function readMultiFlag(flag) {
  const values = [];

  for (let index = 0; index < process.argv.length; index += 1) {
    if (process.argv[index] === flag) {
      values.push(String(process.argv[index + 1] ?? "").trim());
    }
  }

  return values.filter(Boolean);
}

function sanitizeHeader(value) {
  return String(value || "").replace(/[\r\n]+/g, " ").trim();
}

function slugify(value) {
  const base = String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return base || "draft";
}

function chunkRichText(value, chunkSize = 1800) {
  const text = String(value || "").trim();
  if (!text) {
    return [];
  }

  const chunks = [];
  for (let index = 0; index < text.length; index += chunkSize) {
    chunks.push(text.slice(index, index + chunkSize));
  }

  return chunks.map((chunk) => ({
    type: "text",
    text: { content: chunk }
  }));
}

function notionTitle(value) {
  const content = sanitizeHeader(value);
  if (!content) {
    return [];
  }

  return [
    {
      type: "text",
      text: {
        content
      }
    }
  ];
}

function pickExistingPropertyName(properties, candidates) {
  for (const candidate of candidates) {
    if (candidate && properties && Object.prototype.hasOwnProperty.call(properties, candidate)) {
      return candidate;
    }
  }
  return "";
}

function pickStatusOption(database, desiredName) {
  const statusProp = database?.properties?.Status;
  if (!statusProp || statusProp.type !== "status") {
    return "";
  }

  const options = statusProp.status?.options ?? [];
  const desired = String(desiredName || "").trim().toLowerCase();
  if (!options.length) {
    return "";
  }

  const exact = options.find((option) => String(option?.name || "").trim().toLowerCase() === desired);
  if (exact?.name) {
    return exact.name;
  }

  const fallbackNames = ["draft", "brouillon", "to review", "a valider", "review", "idea", "in progress"];
  for (const fallback of fallbackNames) {
    const found = options.find(
      (option) => String(option?.name || "").trim().toLowerCase() === String(fallback).toLowerCase()
    );
    if (found?.name) {
      return found.name;
    }
  }

  return String(options[0]?.name || "").trim();
}

async function notionRequest(path, { method = "GET", body } = {}) {
  const token = process.env.NOTION_TOKEN;
  if (!token) {
    throw new Error("Missing NOTION_TOKEN");
  }

  const version = process.env.NOTION_VERSION || "2022-06-28";
  const response = await fetch(`https://api.notion.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": version,
      "Content-Type": "application/json"
    },
    body
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Notion API ${method} ${path} failed (${response.status}): ${text}`);
  }

  return response.json();
}

async function slugExists(databaseId, slug) {
  const payload = await notionRequest(`/databases/${databaseId}/query`, {
    method: "POST",
    body: JSON.stringify({
      page_size: 1,
      filter: {
        property: "Slug",
        rich_text: { equals: slug }
      }
    })
  });

  return Array.isArray(payload?.results) && payload.results.length > 0;
}

async function ensureUniqueSlug(databaseId, baseSlug) {
  let candidate = baseSlug;
  let attempt = 2;

  while (await slugExists(databaseId, candidate)) {
    candidate = `${baseSlug}-${attempt}`;
    attempt += 1;
    if (attempt > 50) {
      candidate = `${baseSlug}-${Date.now()}`;
      break;
    }
  }

  return candidate;
}

const title = readFlag("--title");
const content = readFlag("--content");
const excerpt = readFlag("--excerpt");
const seoTitle = readFlag("--seo-title");
const metaDescription = readFlag("--meta-description");
const vertical = readFlag("--vertical");
const category = readFlag("--category");
const primaryKeyword = readFlag("--primary-keyword");
const keywordVariations = readMultiFlag("--keyword-variation");
const searchIntent = readFlag("--search-intent");
const reader = readFlag("--reader");
const sensitivity = readFlag("--sensitivity");
const internalLinks = readMultiFlag("--internal-link");
const suggestedAltText = readFlag("--suggested-alt-text");
const statusArg = readFlag("--status") || "Draft";
const contentType = readFlag("--content-type") || "article";
const slugArg = readFlag("--slug");
const databaseIdFlag = readFlag("--database-id");
const dryRun = process.argv.includes("--dry-run");

const databaseId = databaseIdFlag || process.env.NOTION_SITE_DATABASE_ID || "";

if (!title) {
  console.error(
    "Usage: node scripts/create-notion-draft-article.mjs --title \"...\" --content \"...\" [--excerpt \"...\"] [--seo-title \"...\"] [--meta-description \"...\"] [--vertical \"...\"] [--category \"...\"] [--primary-keyword \"...\"] [--keyword-variation \"...\"] [--search-intent \"...\"] [--reader \"...\"] [--sensitivity \"...\"] [--internal-link \"...\"] [--suggested-alt-text \"...\"] [--status \"Draft\"] [--content-type \"article\"] [--slug \"...\"] [--database-id \"...\"] [--dry-run]"
  );
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const baseSlug = slugArg ? slugify(slugArg) : `${slugify(title)}-${today}`;

const draft = {
  title: sanitizeHeader(title),
  content: String(content || "").trim(),
  excerpt: String(excerpt || "").trim(),
  seoTitle: String(seoTitle || "").trim(),
  metaDescription: String(metaDescription || "").trim(),
  vertical: String(vertical || "").trim(),
  category: String(category || "").trim(),
  primaryKeyword: String(primaryKeyword || "").trim(),
  keywordVariations: keywordVariations.map((value) => String(value || "").trim()).filter(Boolean),
  searchIntent: String(searchIntent || "").trim(),
  reader: String(reader || "").trim(),
  sensitivity: String(sensitivity || "").trim(),
  internalLinks: internalLinks.map((value) => String(value || "").trim()).filter(Boolean),
  suggestedAltText: String(suggestedAltText || "").trim(),
  status: String(statusArg || "").trim(),
  contentType: String(contentType || "").trim() || "article",
  baseSlug
};

if (dryRun) {
  console.log(JSON.stringify({ databaseId, draft }, null, 2));
  process.exit(0);
}

if (!databaseId) {
  console.error("Missing NOTION_SITE_DATABASE_ID (or pass --database-id)");
  process.exit(1);
}

const database = await notionRequest(`/databases/${databaseId}`);
const properties = database?.properties ?? {};

const resolvedSlug = await ensureUniqueSlug(databaseId, baseSlug);
const resolvedStatus = pickStatusOption(database, draft.status);

const internalLinksValue = draft.internalLinks.length ? draft.internalLinks.map((href) => `- ${href}`).join("\n") : "";
const variationsValue = draft.keywordVariations.length ? draft.keywordVariations.join(", ") : "";

const resolvedTitle = pickExistingPropertyName(properties, ["Title"]);
const resolvedSlugName = pickExistingPropertyName(properties, ["Slug"]);
const resolvedContentTypeName = pickExistingPropertyName(properties, ["Content Type", "ContentType", "Type"]);
const resolvedStatusName = pickExistingPropertyName(properties, ["Status"]);
const resolvedVerticalName = pickExistingPropertyName(properties, ["Vertical"]);
const resolvedCategoryName = pickExistingPropertyName(properties, ["Category"]);
const resolvedExcerptName = pickExistingPropertyName(properties, ["Excerpt"]);
const resolvedMainContentName = pickExistingPropertyName(properties, ["Main Content", "MainContent", "Content"]);
const resolvedSeoTitleName = pickExistingPropertyName(properties, ["SEO Title", "Seo Title", "SEO"]);
const resolvedMetaDescriptionName = pickExistingPropertyName(properties, ["Meta Description", "MetaDescription"]);
const resolvedPrimaryKeywordName = pickExistingPropertyName(properties, ["Primary Keyword", "Primary keyword"]);
const resolvedKeywordVariationsName = pickExistingPropertyName(properties, ["Keyword Variations", "Keyword variations"]);
const resolvedSearchIntentName = pickExistingPropertyName(properties, ["Search Intent", "Intent"]);
const resolvedReaderName = pickExistingPropertyName(properties, [
  "Reader Persona",
  "Primary Reader",
  "Target Reader",
  "Reader"
]);
const resolvedSensitivityName = pickExistingPropertyName(properties, ["Content Sensitivity", "Sensitivity"]);
const resolvedInternalLinksName = pickExistingPropertyName(properties, ["Internal Links", "Internal links"]);
const resolvedAltTextName = pickExistingPropertyName(properties, ["Suggested Alt Text", "Alt Text", "Alt text"]);

const pageProperties = {};

if (resolvedTitle) {
  pageProperties[resolvedTitle] = { title: notionTitle(draft.title) };
}

if (resolvedSlugName) {
  pageProperties[resolvedSlugName] = { rich_text: chunkRichText(resolvedSlug, 1600) };
}

if (resolvedContentTypeName) {
  pageProperties[resolvedContentTypeName] = { select: { name: draft.contentType } };
}

if (resolvedStatusName && resolvedStatus) {
  if (properties?.Status?.type === "status") {
    pageProperties[resolvedStatusName] = { status: { name: resolvedStatus } };
  } else if (properties?.Status?.type === "select") {
    pageProperties[resolvedStatusName] = { select: { name: resolvedStatus } };
  }
}

if (resolvedVerticalName && draft.vertical) {
  pageProperties[resolvedVerticalName] = { select: { name: draft.vertical } };
}

if (resolvedCategoryName && draft.category) {
  pageProperties[resolvedCategoryName] = { select: { name: draft.category } };
}

if (resolvedExcerptName && draft.excerpt) {
  pageProperties[resolvedExcerptName] = { rich_text: chunkRichText(draft.excerpt, 1800) };
}

if (resolvedMainContentName && draft.content) {
  pageProperties[resolvedMainContentName] = { rich_text: chunkRichText(draft.content, 1800) };
}

if (resolvedSeoTitleName && draft.seoTitle) {
  pageProperties[resolvedSeoTitleName] = { rich_text: chunkRichText(draft.seoTitle, 1800) };
}

if (resolvedMetaDescriptionName && draft.metaDescription) {
  pageProperties[resolvedMetaDescriptionName] = { rich_text: chunkRichText(draft.metaDescription, 1800) };
}

if (resolvedPrimaryKeywordName && draft.primaryKeyword) {
  pageProperties[resolvedPrimaryKeywordName] = { rich_text: chunkRichText(draft.primaryKeyword, 1800) };
}

if (resolvedKeywordVariationsName && variationsValue) {
  pageProperties[resolvedKeywordVariationsName] = { rich_text: chunkRichText(variationsValue, 1800) };
}

if (resolvedSearchIntentName && draft.searchIntent) {
  pageProperties[resolvedSearchIntentName] = { rich_text: chunkRichText(draft.searchIntent, 1800) };
}

if (resolvedReaderName && draft.reader) {
  pageProperties[resolvedReaderName] = { rich_text: chunkRichText(draft.reader, 1800) };
}

if (resolvedSensitivityName && draft.sensitivity) {
  const type = properties?.[resolvedSensitivityName]?.type;
  if (type === "select") {
    pageProperties[resolvedSensitivityName] = { select: { name: draft.sensitivity } };
  } else if (type === "status") {
    pageProperties[resolvedSensitivityName] = { status: { name: draft.sensitivity } };
  } else {
    pageProperties[resolvedSensitivityName] = { rich_text: chunkRichText(draft.sensitivity, 1800) };
  }
}

if (resolvedInternalLinksName && internalLinksValue) {
  pageProperties[resolvedInternalLinksName] = { rich_text: chunkRichText(internalLinksValue, 1800) };
}

if (resolvedAltTextName && draft.suggestedAltText) {
  pageProperties[resolvedAltTextName] = { rich_text: chunkRichText(draft.suggestedAltText, 1800) };
}

const page = await notionRequest("/pages", {
  method: "POST",
  body: JSON.stringify({
    parent: { database_id: databaseId },
    properties: pageProperties
  })
});

console.log(
  JSON.stringify(
    {
      id: page?.id || "",
      url: page?.url || "",
      slug: resolvedSlug,
      title: draft.title
    },
    null,
    2
  )
);
