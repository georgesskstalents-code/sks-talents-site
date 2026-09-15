/**
 * Correspondance entre les types applicatifs, en camelCase, et les colonnes
 * Postgres, en snake_case.
 *
 * Sans cette traduction, PostgREST rejette les requetes : une colonne
 * `createdAt` ou `pagePath` n'existe pas dans `lead_events`, et l'API renvoie
 * une 400 que le code avalait en silence. Consequence constatee le 15/09/2026 :
 * aucun lead n'etait enregistre en base, et le tableau de bord affichait des
 * compteurs a zero sans le moindre message.
 */
import type { LeadEventLog, SiteAnalyticsEvent } from "@/lib/siteIntelligence";

/** Colonne de date commune aux trois tables, utilisee pour filtrer et trier. */
export const CREATED_AT_COLUMN = "created_at";

/** Colonnes reellement declarees dans supabase/schema.sql pour lead_events. */
const LEAD_COLUMNS = new Set([
  "kind",
  "full_name",
  "first_name",
  "last_name",
  "email",
  "phone",
  "company",
  "role",
  "sector",
  "message",
  "page",
  "source"
]);

/** camelCase applicatif vers snake_case Postgres. */
function snakeCase(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
}

/**
 * Prepare une ligne `lead_events`.
 *
 * Les cles connues alimentent leur colonne, tout le reste part dans la colonne
 * jsonb `metadata` au lieu de faire echouer l'insertion entiere. Un champ
 * inattendu ne doit jamais faire perdre un lead.
 */
export function toLeadEventRow(kind: string, payload: Record<string, unknown>) {
  const row: Record<string, unknown> = { kind };
  const metadata: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || value === null || value === "") continue;
    // pagePath est le nom applicatif de la colonne page.
    const column = key === "pagePath" ? "page" : snakeCase(key);
    if (column === "kind") continue;
    if (column === "created_at" || key === "createdAt") {
      row.created_at = value;
      continue;
    }
    if (LEAD_COLUMNS.has(column)) {
      row[column] = value;
    } else {
      metadata[key] = value;
    }
  }

  if (Object.keys(metadata).length > 0) {
    row.metadata = metadata;
  }
  return row;
}

/** Ligne `lead_events` renvoyee par PostgREST vers le type applicatif. */
export function fromLeadEventRow(row: Record<string, unknown>): LeadEventLog {
  return {
    kind: String(row.kind ?? ""),
    pagePath: String(row.page ?? ""),
    email: row.email ? String(row.email) : undefined,
    createdAt: String(row.created_at ?? "")
  };
}

/** Prepare une ligne `site_analytics`. */
export function toAnalyticsRow(event: SiteAnalyticsEvent) {
  return {
    type: event.type,
    path: event.path,
    title: event.title ?? null,
    query: event.query ?? null,
    target: event.target ?? null,
    message: event.message ?? null,
    session_id: event.sessionId ?? null,
    created_at: event.createdAt
  };
}

/** Ligne `site_analytics` renvoyee par PostgREST vers le type applicatif. */
export function fromAnalyticsRow(row: Record<string, unknown>): SiteAnalyticsEvent {
  return {
    type: row.type as SiteAnalyticsEvent["type"],
    path: String(row.path ?? ""),
    title: row.title ? String(row.title) : undefined,
    query: row.query ? String(row.query) : undefined,
    target: row.target ? String(row.target) : undefined,
    message: row.message ? String(row.message) : undefined,
    sessionId: row.session_id ? String(row.session_id) : undefined,
    createdAt: String(row.created_at ?? "")
  };
}
