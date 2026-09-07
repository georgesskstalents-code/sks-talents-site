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
  | { kind: "rule" };

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
  return blocks;
}

export default function ArticleBody({ body, keyPrefix }: { body: string; keyPrefix: string }): ReactNode {
  const blocks = parseArticle(body);

  return (
    <>
      {blocks.map((block, index) => {
        const key = `${keyPrefix}-b${index}`;

        if (block.kind === "rule") {
          return <hr key={key} className="my-12 border-0 border-t border-brand-ink/10" />;
        }

        if (block.kind === "heading") {
          return block.level === 2 ? (
            <h2
              key={key}
              className="mb-4 mt-14 font-display text-[2rem] font-normal leading-tight text-brand-ink [text-wrap:balance]"
            >
              <Inline text={block.text} keyPrefix={key} />
            </h2>
          ) : (
            <h3 key={key} className="mb-3 mt-9 text-base font-semibold text-brand-ink">
              <Inline text={block.text} keyPrefix={key} />
            </h3>
          );
        }

        if (block.kind === "quote") {
          return (
            <div key={key} className="my-8 bg-brand-mint px-6 py-5 text-[0.99rem]">
              <p>
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
