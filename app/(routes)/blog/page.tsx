import BlogFilters from "@/components/BlogFilters";
import PageHero from "@/components/PageHero";
import { articles, type Article } from "@/data/articles";
import { getNotionSiteContentList } from "@/lib/notion";

export const dynamic = "force-dynamic";

function mapNotionVerticalToArticleVertical(vertical: string) {
  const normalized = vertical.toLowerCase();

  if (normalized.includes("diagnostic")) {
    return "diagnostic";
  }

  if (normalized.includes("medical vet")) {
    return "medical-vet";
  }

  if (normalized.includes("veterinary")) {
    return "vet-services";
  }

  if (normalized.includes("petfood")) {
    return "petfood";
  }

  if (normalized.includes("cosm")) {
    return "cosmetique";
  }

  return "biotech";
}

function estimateReadTime(content: string) {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(4, Math.ceil(words / 180));
}

export default async function BlogPage() {
  const notionArticles = await getNotionSiteContentList("article", 100);
  const notionMappedArticles: Article[] = notionArticles.map((entry) => ({
    id: entry.id,
    title: entry.title,
    slug: entry.slug,
    vertical: mapNotionVerticalToArticleVertical(entry.vertical),
    persona: ["CEO", "COO", "DRH", "CPO"],
    topic: entry.category || "market",
    excerpt: entry.excerpt,
    content: entry.mainContent,
    author: "SKS TALENTS",
    date: entry.publishDate || new Date().toISOString().slice(0, 10),
    readTime: estimateReadTime(entry.mainContent),
    sources:
      entry.sourceName && entry.sourceUrl
        ? [
            {
              name: entry.sourceName,
              url: entry.sourceUrl
            }
          ]
        : []
  }));

  const mergedArticles = Array.from(
    new Map([...articles, ...notionMappedArticles].map((article) => [article.slug, article])).values()
  ).sort((left, right) => right.date.localeCompare(left.date));

  return (
    <>
      <PageHero
        kicker="Blog"
        title="Une base éditoriale filtrable par persona, secteur et topic."
        description="Le listing ci-dessous démontre le comportement attendu pour vos 50+ articles."
      />
      <section className="container-shell py-8">
        <BlogFilters articles={mergedArticles} />
      </section>
    </>
  );
}
