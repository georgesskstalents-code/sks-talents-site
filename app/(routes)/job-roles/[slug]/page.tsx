import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FicheMetierPage from "@/components/landings/FicheMetierPage";
import { findJobRoleBySlug, getRelatedJobRoles } from "@/data/jobRoles";
import { getNotionSiteContentBySlug } from "@/lib/notion";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const role = findJobRoleBySlug(slug);
  const notionRole = await getNotionSiteContentBySlug(slug, "job_role");

  if (!role && !notionRole) {
    return {};
  }

  const canonical = `https://www.skstalents.fr/job-roles/${slug}`;

  return {
    title: notionRole?.seoTitle || notionRole?.title || role?.title,
    description: notionRole?.metaDescription || notionRole?.excerpt || role?.summary,
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
  const matches = s.match(/(\d+)\s*[--]\s*(\d+)/);
  if (matches) {
    const min = Number(matches[1]) * 1000;
    const max = Number(matches[2]) * 1000;
    return { min, max, median: Math.round((min + max) / 2) };
  }
  const single = s.match(/(\d+)/);
  if (single) {
    const v = Number(single[1]) * 1000;
    return { min: v, max: v, median: v };
  }
  return null;
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
      <FicheMetierPage role={resolvedRole} relatedRoles={relatedRoles} />
    </>
  );
}
