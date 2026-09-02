import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import FicheMetierPage from "@/components/landings/FicheMetierPage";
import ChloeLiveBubble from "@/components/ChloeLiveBubble";
import { getRelatedArticlesBySector } from "@/data/articles";
import { findJobRoleBySlug, getRelatedJobRoles } from "@/data/jobRoles";
import {
  findChloeFicheBySlug,
  isChloeActiveFor
} from "@/data/chloe-fiches-priority";
import { getNotionSiteContentBySlug } from "@/lib/notion";
import { resolveJobRoleSlug } from "@/lib/slugRescueRegistry";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Extrait une fourchette "X-Y K€" depuis les formats variables de salary.
 * Supporte : "42kEUR - 65kEUR", "Base 55kEUR - 90kEUR + 5kEUR - 15kEUR de variable".
 * Retourne "" si non parsable.
 */
function extractSalaryLabel(salary: string | undefined): string {
  if (!salary) return "";
  const m = salary.match(/(\d+)\s*k\s*EUR\s*-\s*(\d+)\s*k\s*EUR/i);
  if (m) return `${m[1]}-${m[2]} K€`;
  const single = salary.match(/(\d+)\s*k\s*EUR/i);
  if (single) return `${single[1]} K€`;
  return "";
}

/**
 * Fallback intelligent : construit un seoTitle CTR-optimise a partir des donnees
 * de la fiche metier. Applique uniquement si role.seoTitle et notionRole.seoTitle
 * absents. Formule : {titre} : salaire {fourchette}, missions | SKS
 */
function buildAutoSeoTitle(role: { title: string; salary?: string } | null | undefined): string | undefined {
  if (!role?.title) return undefined;
  const label = extractSalaryLabel(role.salary);
  const salaryPart = label ? ` : salaire ${label}, missions` : " : missions et formation";
  return `${role.title}${salaryPart} | SKS`;
}

/**
 * Fallback intelligent : construit une seoDescription CTR-optimisee.
 * Formule : Fiche metier {X} : missions, salaire {Y}, formations. Benchmark {secteur} 2026 SKS TALENTS.
 */
function buildAutoSeoDescription(
  role: { title: string; salary?: string; sector?: string } | null | undefined
): string | undefined {
  if (!role?.title) return undefined;
  const label = extractSalaryLabel(role.salary);
  const salaryPart = label ? `salaire ${label}, ` : "";
  const sectorPart = role.sector ? role.sector : "Life Sciences";
  return `Fiche metier ${role.title} : missions cles, ${salaryPart}competences, formations et parcours. Benchmark sectoriel ${sectorPart} 2026 par SKS TALENTS, cabinet executive search.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const role = findJobRoleBySlug(slug);
  const notionRole = await getNotionSiteContentBySlug(slug, "job_role");

  if (!role && !notionRole) {
    // Slug inconnu : la page rendra soit un 308 vers la fiche la plus proche,
    // soit un 404 utile. Dans les deux cas Google ne doit pas indexer l'URL.
    return { robots: { index: false, follow: true } };
  }

  const canonical = `https://www.skstalents.fr/job-roles/${slug}`;

  return {
    title:
      notionRole?.seoTitle ||
      role?.seoTitle ||
      buildAutoSeoTitle(role) ||
      notionRole?.title ||
      role?.title,
    description:
      notionRole?.metaDescription ||
      role?.seoDescription ||
      buildAutoSeoDescription(role) ||
      notionRole?.excerpt ||
      role?.summary,
    alternates: {
      canonical
    }
  };
}

/**
 * Parse a salary range string like "85 - 120 k€" or "120 k€" into numeric
 * percentile10/percentile90 values for the Occupation JSON-LD.
 * Returns null when the string can't be parsed (we then skip estimatedSalary).
 */
function parseSalaryRange(s: string): { min: number; max: number; median: number } | null {
  if (!s) return null;
  // Les valeurs de data/jobRoles.ts sont ecrites "45kEUR - 90kEUR",
  // parfois prefixees ("Base 50kEUR - 100kEUR + 10kEUR - 49kEUR de variable").
  // On tolere donc une unite collee au nombre et on retient la premiere plage.
  const unit = "(?:\\s*(?:kEUR|KEUR|k€|K€|k|K))?";
  const rangeRe = new RegExp(`(\\d+)${unit}\\s*-\\s*(\\d+)${unit}`);
  const matches = s.match(rangeRe);
  if (matches) {
    const min = toAnnualEuros(Number(matches[1]));
    const max = toAnnualEuros(Number(matches[2]));
    if (min > 0 && max >= min) {
      return { min, max, median: Math.round((min + max) / 2) };
    }
  }
  const single = s.match(/(\d+)/);
  if (single) {
    const v = toAnnualEuros(Number(single[1]));
    if (v > 0) return { min: v, max: v, median: v };
  }
  return null;
}

/** Les fiches expriment les salaires en milliers d'euros ; on normalise en euros. */
function toAnnualEuros(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 0;
  return value >= 1000 ? value : value * 1000;
}

function buildOccupationJsonLd(role: {
  slug: string;
  title: string;
  category: string;
  sector: string;
  summary: string;
  salary: string;
}) {
  const url = `https://www.skstalents.fr/job-roles/${role.slug}`;
  const salaryParsed = parseSalaryRange(role.salary);
  return {
    "@context": "https://schema.org",
    "@type": "Occupation",
    name: role.title,
    description: role.summary,
    occupationalCategory: role.category,
    industry: role.sector,
    inLanguage: "fr-FR",
    url,
    ...(salaryParsed && {
      estimatedSalary: [
        {
          "@type": "MonetaryAmountDistribution",
          name: "base",
          currency: "EUR",
          duration: "P1Y",
          percentile10: salaryParsed.min,
          percentile90: salaryParsed.max,
          median: salaryParsed.median
        }
      ]
    }),
    educationRequirements: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree"
    }
  };
}

export default async function JobRoleDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = findJobRoleBySlug(slug);
  const notionRole = await getNotionSiteContentBySlug(slug, "job_role");

  if (!role && !notionRole) {
    // Filet de securite "slug devine" (LLM, backlink approximatif, faute de
    // frappe). next.config.mjs a deja eu sa chance : on tente ici un 308 vers
    // la fiche la plus proche, sinon on rend un 404 utile (not-found.tsx).
    const rescue = resolveJobRoleSlug(slug);
    if (rescue.status === "redirect") {
      permanentRedirect(`/job-roles/${rescue.slug}`);
    }
    notFound();
  }

  const splitNotionList = (value: string | undefined) =>
    value ? value.split("·").map((item) => item.trim()).filter(Boolean) : [];

  const effectiveRole = role
    ? {
        ...role,
        title: notionRole?.title || role.title,
        salary: notionRole?.salaryRange || role.salary,
        summary: notionRole?.excerpt || role.summary,
        sector: notionRole?.vertical || role.sector,
        category: notionRole?.category || role.category,
        studies: notionRole?.studies ? splitNotionList(notionRole.studies) : role.studies,
        schools: notionRole?.schools ? splitNotionList(notionRole.schools) : role.schools,
        relatedIndustries: notionRole?.industries
          ? splitNotionList(notionRole.industries)
          : role.relatedIndustries
      }
    : notionRole
      ? {
          slug: notionRole.slug,
          title: notionRole.title,
          summary: notionRole.excerpt || "",
          salary: notionRole.salaryRange || "Rémunération sur demande",
          sector: notionRole.vertical || "Cross-sector",
          category: notionRole.category || "Fiche métier",
          shortageLevel: "Moderee" as const,
          skills: [] as string[],
          successFactors: [] as string[],
          path: [] as string[],
          missions: [] as string[],
          studies: splitNotionList(notionRole.studies),
          schools: splitNotionList(notionRole.schools),
          relatedIndustries: splitNotionList(notionRole.industries)
        }
      : null;

  const resolvedRole = effectiveRole!;
  const relatedRoles = getRelatedJobRoles(resolvedRole.slug, resolvedRole.sector);
  const relatedArticles = getRelatedArticlesBySector(resolvedRole.sector, 3);
  const occupationJsonLd = buildOccupationJsonLd({
    slug: resolvedRole.slug,
    title: resolvedRole.title,
    category: resolvedRole.category,
    sector: resolvedRole.sector,
    summary: resolvedRole.summary,
    salary: resolvedRole.salary
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(occupationJsonLd) }}
      />
      <FicheMetierPage role={resolvedRole} relatedRoles={relatedRoles} relatedArticles={relatedArticles} />
      {isChloeActiveFor(resolvedRole.slug) ? (
        <ChloeLiveBubble
          ficheSlug={resolvedRole.slug}
          ficheTitle={findChloeFicheBySlug(resolvedRole.slug)?.targetTitle || resolvedRole.title}
        />
      ) : null}
    </>
  );
}
