import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Rendu du corps des articles.
 *
 * Avant ce composant, chaque bloc du contenu markdown etait insere tel quel
 * dans un paragraphe, et seul le format des liens etait interprete. Les
 * lecteurs voyaient donc a l'ecran les "#" des titres, les "**" du gras, les
 * ">" des citations et les tirets des listes.
 *
 * Le parseur ci-dessous reste volontairement minimal : il couvre exactement ce
 * que la redaction utilise (titres, listes, citations, gras, italique, liens,
 * separateurs) et rien de plus, pour eviter d'embarquer une dependance.
 */

/** Mentions internes destinees au redacteur, jamais au lecteur. */
const INTERNAL_MARKERS = [
  /\s*\(r[ée]sum[ée] ex[ée]cutif[^)]*\)/gi,
  /\s*\(Answer-First\)/gi,
  /^R[ée]sum[ée] ex[ée]cutif\s*[·:-]\s*/i
];

function stripInternalMarkers(text: string) {
  return INTERNAL_MARKERS.reduce((acc, re) => acc.replace(re, ""), text).trim();
}

type Segment = { type: "text" | "bold" | "italic"; value: string } | { type: "link"; label: string; href: string };

/** Gras, italique et liens, dans cet ordre de priorite. */
function parseInline(text: string): Segment[] {
  const segments: Segment[] = [];
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|(?<!\*)\*([^*\n]+)\*(?!\*)/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      segments.push({ type: "text", value: text.slice(last, match.index) });
    }
    if (match[1] !== undefined) {
      segments.push({ type: "link", label: match[1], href: match[2] });
    } else if (match[3] !== undefined) {
      segments.push({ type: "bold", value: match[3] });
    } else {
      segments.push({ type: "italic", value: match[4] });
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    segments.push({ type: "text", value: text.slice(last) });
  }
  return segments;
}

const linkClass =
  "font-semibold text-brand-teal underline decoration-brand-teal/30 underline-offset-2 transition hover:decoration-brand-teal";

function Inline({ text, keyPrefix }: { text: string; keyPrefix: string }) {
  return (
    <>
      {parseInline(text).map((seg, i) => {
        const key = `${keyPrefix}-${i}`;
        if (seg.type === "bold") return <strong key={key} className="font-semibold text-brand-ink">{seg.value}</strong>;
        if (seg.type === "italic") return <em key={key}>{seg.value}</em>;
        if (seg.type === "link") {
          return seg.href.startsWith("/") ? (
            <Link key={key} href={seg.href} className={linkClass}>{seg.label}</Link>
          ) : (
            <a key={key} href={seg.href} target="_blank" rel="noreferrer noopener" className={linkClass}>
              {seg.label}
            </a>
          );
        }
        return <span key={key}>{seg.value}</span>;
      })}
    </>
  );
}

type Block =
  | { kind: "heading"; level: 2 | 3; text: string }
  | { kind: "paragraph"; text: string; lede?: boolean }
  | { kind: "quote"; text: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "steps"; items: string[] }
  | { kind: "rule" }
  | { kind: "sources"; items: string[] }
  | { kind: "timeline"; steps: Array<{ when: string; items: string[] }> }
  | { kind: "metier"; label: string; name: string; body: Block[] };

const SOURCES_HEADING = /^(m[ée]thodologie|sources)/i;
const HORIZON_HEADING = /^(?:actions?\s+)?[àa]?\s*horizon\s+(.+)$/i;
const METIER_HEADING = /^m[ée]tier\s+n[°o]\s*(\d+)\s*[·:-]\s*(.+)$/i;

/** Une source ecrite "SIMV, Chiffres cles ..." se coupe en organisme et document. */
export function splitSource(item: string) {
  const m = item.match(/^([^,·:]{2,42})\s*[,·:]\s*(.+)$/);
  if (!m) return { org: "", doc: item };
  return { org: m[1].trim(), doc: m[2].trim() };
}

/**
 * Regroupements de presentation. Ils ne changent jamais le texte : ils
 * reconnaissent une structure deja ecrite par la redaction et lui donnent une
 * forme. Si la structure n'est pas la, on retombe sur le rendu courant.
 */
function group(blocks: Block[]): Block[] {
  const out: Block[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];

    // Sources : un titre "Sources" ou "Methodologie" suivi d'une liste.
    if (b.kind === "heading" && SOURCES_HEADING.test(b.text)) {
      const next = blocks[i + 1];
      if (next && next.kind === "bullets") {
        out.push({ kind: "sources", items: next.items });
        i += 1;
        continue;
      }
    }

    // Plan d'action : suite de "A horizon X" suivis d'une liste numerotee.
    if (b.kind === "heading" && b.level === 3 && HORIZON_HEADING.test(b.text)) {
      const steps: Array<{ when: string; items: string[] }> = [];
      let j = i;
      while (j < blocks.length) {
        const h = blocks[j];
        const list = blocks[j + 1];
        const m = h.kind === "heading" && h.level === 3 ? h.text.match(HORIZON_HEADING) : null;
        if (!m || !list || (list.kind !== "steps" && list.kind !== "bullets")) break;
        steps.push({ when: m[1].trim(), items: list.items });
        j += 2;
      }
      if (steps.length >= 2) {
        out.push({ kind: "timeline", steps });
        i = j - 1;
        continue;
      }
    }

    // Metier : un titre "Metier n°X · Nom" et tout ce qui le suit jusqu'au titre suivant.
    if (b.kind === "heading" && b.level === 2) {
      const m = b.text.match(METIER_HEADING);
      if (m) {
        const body: Block[] = [];
        let j = i + 1;
        while (j < blocks.length && !(blocks[j].kind === "heading" && (blocks[j] as { level: number }).level === 2)) {
          body.push(blocks[j]);
          j += 1;
        }
        out.push({ kind: "metier", label: `Métier n°${m[1]}`, name: m[2].trim(), body });
        i = j - 1;
        continue;
      }
    }

    out.push(b);
  }
  return out;
}

/** Identifiant d'ancre stable, utilise par le sommaire cliquable. */
export function headingId(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

const HEADING = /^(#{1,4})\s+(.*)$/;
const BULLET = /^[-*]\s+(.*)$/;
const NUMBERED = /^\d+\.\s+(.*)$/;

/**
 * Le contenu est ecrit en blocs separes par une ligne vide. Une liste peut
 * cependant tenir dans un seul bloc, avec un item par ligne : on la reconstruit
 * ligne a ligne plutot que bloc a bloc.
 */
export function parseArticle(body: string): Block[] {
  const blocks: Block[] = [];
  const lines = body.split("\n");
  let bullets: string[] = [];
  let steps: string[] = [];
  let paragraph: string[] = [];
  let firstParagraphSeen = false;

  const flushList = () => {
    if (bullets.length) { blocks.push({ kind: "bullets", items: bullets }); bullets = []; }
    if (steps.length) { blocks.push({ kind: "steps", items: steps }); steps = []; }
  };
  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = stripInternalMarkers(paragraph.join(" "));
    paragraph = [];
    if (!text) return;
    const lede = !firstParagraphSeen;
    firstParagraphSeen = true;
    blocks.push({ kind: "paragraph", text, lede });
  };
  const flushAll = () => { flushParagraph(); flushList(); };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) { flushAll(); continue; }

    if (line === "---" || line === "***") { flushAll(); blocks.push({ kind: "rule" }); continue; }

    const heading = HEADING.exec(line);
    if (heading) {
      flushAll();
      const level = heading[1].length;
      const text = stripInternalMarkers(heading[2].replace(/^H\d+\s*·\s*/, ""));
      // Le "# Titre" du contenu repete le titre affiche dans le hero.
      if (level === 1 || !text) continue;
      blocks.push({ kind: "heading", level: level === 2 ? 2 : 3, text });
      continue;
    }

    if (line.startsWith(">")) {
      flushAll();
      blocks.push({ kind: "quote", text: stripInternalMarkers(line.replace(/^>\s?/, "")) });
      continue;
    }

    const bullet = BULLET.exec(line);
    if (bullet) { flushParagraph(); if (steps.length) flushList(); bullets.push(bullet[1]); continue; }

    const numbered = NUMBERED.exec(line);
    if (numbered) { flushParagraph(); if (bullets.length) flushList(); steps.push(numbered[1]); continue; }

    flushList();
    paragraph.push(line);
  }
  flushAll();
  return group(blocks);
}

export default function ArticleBody({ body, keyPrefix }: { body: string; keyPrefix: string }): ReactNode {
  return <ArticleBlocks blocks={parseArticle(body)} keyPrefix={keyPrefix} />;
}

function ArticleBlocks({ blocks, keyPrefix }: { blocks: Block[]; keyPrefix: string }): ReactNode {
  let headingIndex = 0;

  return (
    <>
      {blocks.map((block, index) => {
        const key = `${keyPrefix}-b${index}`;

        if (block.kind === "rule") {
          return <hr key={key} className="my-12 border-0 border-t border-brand-ink/10" />;
        }

        if (block.kind === "heading") {
          if (block.level === 2) {
            headingIndex += 1;
          }
          const num = String(headingIndex).padStart(2, "0");
          return block.level === 2 ? (
            <h2
              key={key}
              id={headingId(block.text)}
              className="relative mb-4 mt-14 scroll-mt-24 pl-12 font-display text-[1.9rem] font-normal leading-tight text-brand-ink [text-wrap:balance]"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-[0.42em] font-mono text-[0.7rem] tracking-[0.14em] text-brand-teal"
              >
                {num}
              </span>
              <Inline text={block.text} keyPrefix={key} />
            </h2>
          ) : (
            <h3 key={key} className="mb-3 mt-9 text-base font-semibold text-brand-ink">
              <Inline text={block.text} keyPrefix={key} />
            </h3>
          );
        }

        if (block.kind === "sources") {
          return (
            <div key={key} className="my-10 bg-[#1d5457] px-7 py-6">
              <p className="mb-4 font-mono text-[0.64rem] uppercase tracking-[0.2em] text-[#e8e2d4]">
                Méthodologie et sources
              </p>
              <ul className="grid list-none gap-3 p-0">
                {block.items.map((item, i) => {
                  const { org, doc } = splitSource(item);
                  return (
                    <li
                      key={`${key}-s${i}`}
                      className="grid gap-x-4 gap-y-1 text-[0.9rem] sm:grid-cols-[8rem_1fr] sm:items-baseline"
                    >
                      <span className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-[#e8e2d4]">
                        {org}
                      </span>
                      <span className="text-white/90">
                        <Inline text={doc} keyPrefix={`${key}-s${i}`} />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }

        if (block.kind === "timeline") {
          return (
            <div key={key} className="relative my-10 pl-9">
              <span
                aria-hidden="true"
                className="absolute bottom-2 left-[0.55rem] top-2 w-px bg-brand-ink/10"
              />
              {block.steps.map((step, i) => (
                <div key={`${key}-t${i}`} className="relative mb-8 last:mb-0">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.93rem] top-[0.45rem] h-3 w-3 rounded-full bg-[#1d5457] ring-4 ring-white"
                  />
                  <p className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-brand-teal">
                    {step.when}
                  </p>
                  <ul className="mt-3 grid list-none gap-2 p-0">
                    {step.items.map((item, j) => (
                      <li key={`${key}-t${i}-i${j}`} className="relative pl-5 text-[0.95rem]">
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-brand-teal"
                        />
                        <Inline text={item} keyPrefix={`${key}-t${i}-i${j}`} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          );
        }

        if (block.kind === "metier") {
          headingIndex += 1;
          return (
            <section
              key={key}
              id={headingId(block.name)}
              className="my-12 scroll-mt-24 grid gap-6 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-8"
            >
              <div className="flex flex-col justify-between bg-[#1d5457] px-6 py-6">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-[#e8e2d4]">
                  {block.label}
                </p>
                <h2 className="mt-4 font-display text-[1.7rem] font-normal leading-tight text-white">
                  {block.name}
                </h2>
              </div>
              <div className="min-w-0">
                <ArticleBlocks blocks={block.body} keyPrefix={key} />
              </div>
            </section>
          );
        }

        if (block.kind === "quote") {
          return (
            <div key={key} className="my-8 bg-[#1d5457] px-7 py-6 text-[0.99rem]">
              <p className="mb-2 font-mono text-[0.64rem] uppercase tracking-[0.2em] text-[#e8e2d4]">
                À retenir
              </p>
              <p className="text-white/[0.93]">
                <Inline text={block.text} keyPrefix={key} />
              </p>
            </div>
          );
        }

        if (block.kind === "bullets") {
          return (
            <ul key={key} className="mb-7 grid list-none gap-3 p-0">
              {block.items.map((item, i) => (
                <li key={`${key}-i${i}`} className="relative pl-6">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[0.72em] h-1.5 w-1.5 rounded-full bg-brand-teal"
                  />
                  <Inline text={item} keyPrefix={`${key}-i${i}`} />
                </li>
              ))}
            </ul>
          );
        }

        if (block.kind === "steps") {
          return (
            <ol key={key} className="mb-7 grid list-none gap-4 p-0">
              {block.items.map((item, i) => (
                <li key={`${key}-s${i}`} className="relative pl-9">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1 grid h-6 w-6 place-items-center border border-brand-ink/10 font-mono text-xs text-brand-teal"
                  >
                    {i + 1}
                  </span>
                  <Inline text={item} keyPrefix={`${key}-s${i}`} />
                </li>
              ))}
            </ol>
          );
        }

        return (
          <p key={key} className={block.lede ? "text-lg leading-9 text-brand-ink" : undefined}>
            <Inline text={block.text} keyPrefix={key} />
          </p>
        );
      })}
    </>
  );
}
