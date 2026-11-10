/**
 * Contenu redige dans Notion pour une fiche metier.
 *
 * Les fiches creees directement dans Notion (sans equivalent dans
 * data/jobRoles.ts) n'affichaient jusqu'ici que leur resume : missions,
 * competences, tension marche et sources restaient invisibles, et la page
 * etait trop mince pour etre indexee.
 *
 * Le champ "Main Content" melange deux choses :
 *  - le texte destine au lecteur (missions, competences, tension marche...)
 *  - des notes de travail destinees au redacteur (brief SEO, meta
 *    description, alt text, hypotheses non sourcees, liste brute de liens
 *    internes).
 *
 * Ce module separe les deux. Une section interne n'est jamais affichee, quel
 * que soit son contenu.
 */

export type JobRoleEditorialContent = {
  /** Puces de la section missions, pour le bloc "Missions" de la fiche. */
  missions: string[];
  /** Le reste du texte destine au lecteur, en markdown, pour ArticleBody. */
  body: string;
};

/** Titres de sections reservees au redacteur. Comparaison sans accents. */
const INTERNAL_SECTION_PATTERNS = [
  /^brief\b/,
  /^avant redaction/,
  /^mot-?cle/,
  /^variations?\b/,
  /^intention de recherche/,
  /^lecteur principal/,
  /^(niveau de )?sensibilite/,
  /^meta\s*description/,
  /^alt\s*text/,
  /^(proposition )?visuel/,
  /^estimations?\b/,
  /^hypotheses?\b/,
  /^liens internes/,
  /^notes?\s*(internes?|redaction)/,
  /^seo\b/
];

const MISSIONS_HEADING = /^missions?\b/;

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

/**
 * Titre tel qu'affiche au lecteur : sans numerotation de travail ("1) ",
 * "10. ") ni consigne entre parentheses ("(1-3 phrases)", "(prete SEO)").
 */
function cleanHeading(title: string) {
  return title
    .replace(/^\d+\s*[).]\s*/, "")
    .replace(/\s*\((?:[^)]*\b(?:phrases?|seo|optionnel|option|exploitable|repères|reperes|à emporter|a emporter|max)\b[^)]*)\)\s*$/i, "")
    .trim();
}

function isInternalHeading(title: string) {
  const n = normalize(cleanHeading(title));
  return INTERNAL_SECTION_PATTERNS.some((re) => re.test(n));
}

type Section = { level: number; title: string; lines: string[] };

/** Ramene le texte Notion a du markdown simple avec de vrais sauts de ligne. */
function toPlainMarkdown(raw: string) {
  return raw
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/\\(#{1,6}\s)/g, "$1")
    .replace(/\r\n/g, "\n");
}

function splitSections(markdown: string): { intro: string[]; sections: Section[] } {
  const intro: string[] = [];
  const sections: Section[] = [];
  let current: Section | null = null;

  for (const line of markdown.split("\n")) {
    // Separateurs de travail et titre H1 repete : jamais affiches.
    if (/^\s*-{3,}\s*$/.test(line) || /^#\s+/.test(line)) continue;
    const heading = line.match(/^(#{2,3})\s+(.*)$/);
    if (heading) {
      current = { level: heading[1].length, title: cleanHeading(heading[2].trim()), lines: [] };
      sections.push(current);
      continue;
    }
    if (current) current.lines.push(line);
    else intro.push(line);
  }
  return { intro, sections };
}

function bulletsOf(lines: string[]) {
  return lines
    .map((l) => l.match(/^\s*[-*]\s+(.*)$/)?.[1]?.trim())
    .filter((v): v is string => Boolean(v));
}

/**
 * Decoupe le contenu Notion d'une fiche metier.
 * Retourne null si le texte n'a pas de structure en sections : la fiche garde
 * alors son affichage actuel, sans risque pour les fiches deja en ligne.
 */
export function parseJobRoleContent(raw: string | null | undefined): JobRoleEditorialContent | null {
  if (!raw) return null;
  const { sections } = splitSections(toPlainMarkdown(raw));
  if (sections.length === 0) return null;

  const missions: string[] = [];
  const kept: string[] = [];

  // Une sous-section (###) suit le sort de sa section parente (##).
  let parentInternal = false;

  for (const s of sections) {
    if (s.level === 2) {
      parentInternal = isInternalHeading(s.title);
      if (parentInternal) continue;

      // Les missions alimentent le bloc dedie de la fiche, mis en forme en liste.
      const bullets = MISSIONS_HEADING.test(normalize(s.title)) ? bulletsOf(s.lines) : [];
      if (bullets.length > 0) {
        missions.push(...bullets);
        continue;
      }
    } else if (parentInternal || isInternalHeading(s.title)) {
      continue;
    }

    const text = s.lines.join("\n").trim();
    // Une sous-section vide garde son titre seulement si du texte suit.
    if (!text && s.level === 2) {
      kept.push(`## ${s.title}`);
      continue;
    }
    if (!text) continue;
    kept.push(`${"#".repeat(s.level)} ${s.title}\n\n${text}`);
  }

  // Retire un titre de section reste sans contenu (aucune sous-section gardee).
  const cleaned = kept.filter((block, i) => {
    if (!/^## [^\n]+$/.test(block)) return true;
    const next = kept[i + 1];
    return Boolean(next && next.startsWith("### "));
  });

  if (missions.length === 0 && cleaned.length === 0) return null;

  return { missions, body: cleaned.join("\n\n") };
}
