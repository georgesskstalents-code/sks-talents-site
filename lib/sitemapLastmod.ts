import { execFileSync } from "node:child_process";

/**
 * Date de derniere modification reelle par fichier source.
 *
 * Le sitemap datait les 474 URLs avec `new Date()`, donc l'heure du build :
 * toutes les pages semblaient modifiees le meme jour, ce qui n'aide pas le
 * crawl et n'est pas exact.
 *
 * On lit ici la date du dernier commit du fichier de donnees qui alimente la
 * page. Si l'historique git n'est pas accessible au build (clone superficiel),
 * on retombe sur une date de reference explicite plutot que sur l'heure du
 * build.
 */
const FALLBACK_LASTMOD = "2026-09-14";

const cache = new Map<string, string>();

export function fileLastmod(relativePath: string): string {
  const cached = cache.get(relativePath);
  if (cached) {
    return cached;
  }

  let value = FALLBACK_LASTMOD;
  try {
    const output = execFileSync("git", ["log", "-1", "--format=%cI", "--", relativePath], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
    if (output) {
      value = output.slice(0, 10);
    }
  } catch {
    // Historique indisponible : on conserve la date de reference.
  }

  cache.set(relativePath, value);
  return value;
}

/** Borne une date de contenu pour qu'elle ne soit jamais dans le futur. */
export function notInFuture(date: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return date > today ? today : date;
}
