import BlogMagazine from "@/components/landings/BlogMagazine";
import FAQSection from "@/components/FAQSection";
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
        kicker="Articles & analyses"
        title="Lectures utiles pour décider plus juste sur vos marchés."
        description="Signaux marché, métiers pénuriques, salaires, écosystème : des analyses courtes et sourcées pour CEO, DRH, candidats et dirigeants en mobilité — biotech, diagnostic, santé animale et petfood premium."
      />
      <BlogMagazine articles={mergedArticles} />
      <FAQSection
        eyebrow="Questions fréquentes"
        title="Ce qu'on trouve dans le blog SKS"
        items={[
          {
            question: "Quels sujets sont traités ?",
            answer:
              "Métiers pénuriques, salaires, médecine nucléaire, événements et fonds, écoles, écosystème France Biotech, Business France, Bpifrance, et angles France, Sénégal et Côte d'Ivoire."
          },
          {
            question: "Comment utiliser ce blog quand on recrute ou qu'on structure une équipe ?",
            answer:
              "Un dirigeant, un COO ou un DRH peut utiliser le blog pour cadrer un besoin, comprendre la tension marché, relier un sujet métier à une fourchette salariale ou à une école, puis prendre contact avec SKS TALENTS pour un recrutement, un RPO ou une structuration RH."
          }
        ]}
      />
    </>
  );
}
