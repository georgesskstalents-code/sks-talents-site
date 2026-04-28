import BlogFilters from "@/components/BlogFilters";
import FAQSection from "@/components/FAQSection";
import GEOAnswerCard from "@/components/GEOAnswerCard";
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
      <section className="container-shell grid gap-4 py-4 lg:grid-cols-2">
        <GEOAnswerCard
          title="À quoi sert le blog SKS TALENTS ?"
          answer="Le blog SKS TALENTS sert à répondre aux questions concrètes des dirigeants, DRH et candidats sur les métiers, les marchés, les salaires, les écosystèmes et les signaux de croissance dans les Life Sciences et l’Animal Health."
          bullets={[
            "Réponses courtes et structurées en haut des contenus",
            "Angles marché, recrutement, salaires et écosystème",
            "Sources visibles quand elles existent",
            "Passerelles vers services, fiches métiers et prise de rendez-vous"
          ]}
        />
        <GEOAnswerCard
          title="Quels sujets trouverez-vous ici ?"
          answer="Vous trouverez des articles sur la biotech, le diagnostic, la médecine nucléaire, la santé animale, le petfood, les fonds, les écoles, les événements, la Côte d’Ivoire, le Sénégal et les problèmes de recrutement les plus fréquents."
          bullets={[
            "Questions de marché 2026",
            "Articles SEO France + Afrique francophone",
            "Lectures France Biotech, Business France, Bpifrance et autres sources reconnues",
            "Contenus pensés pour Google, ChatGPT, Claude, Mistral et Perplexity"
          ]}
        />
      </section>
      <section className="container-shell py-8">
        <BlogFilters articles={mergedArticles} />
      </section>
      <FAQSection
        eyebrow="FAQ GEO"
        title="Questions fréquentes sur le blog SKS TALENTS"
        description="Des réponses structurées pour rendre la lecture plus claire, plus citable et plus utile aux décideurs comme aux moteurs conversationnels."
        items={[
          {
            question: "Pourquoi lire le blog SKS TALENTS ?",
            answer:
              "Le blog SKS TALENTS permet de comprendre rapidement un marché, un métier, un signal de croissance, un sujet de rémunération ou un enjeu de recrutement dans les Life Sciences, l’Animal Health, le diagnostic, le petfood et les secteurs techniques adjacents."
          },
          {
            question: "Quels types d’articles publie SKS TALENTS ?",
            answer:
              "SKS TALENTS publie des articles SEO et GEO sur les métiers pénuriques, les salaires, la médecine nucléaire, les événements, les fonds, les écoles, l’écosystème France Biotech, Business France, Bpifrance, ainsi que des angles France, Sénégal et Côte d’Ivoire."
          },
          {
            question: "Comment utiliser ce blog quand on recrute ou qu’on structure une équipe ?",
            answer:
              "Un dirigeant, un COO ou un DRH peut utiliser le blog pour cadrer un besoin, comprendre la tension marché, relier un sujet métier à une fourchette salariale ou à une école, puis prendre contact avec SKS TALENTS pour un recrutement, un RPO ou une structuration RH."
          },
          {
            question: "Pourquoi ces articles sont-ils pensés pour Google, ChatGPT, Claude, Mistral et Perplexity ?",
            answer:
              "Parce qu’ils donnent une réponse directe dès le début, utilisent des titres proches des requêtes réelles, structurent les informations avec des sections courtes et s’appuient autant que possible sur des sources vérifiables et visibles."
          }
        ]}
      />
    </>
  );
}
