import SlugRescuePanel from "@/components/SlugRescuePanel";
import { articles } from "@/data/articles";

/**
 * 404 de segment pour /blog/[slug].
 * Rendue par `notFound()` : statut HTTP 404 conserve, contenu utile ajoute.
 */
export default function BlogNotFound() {
  const index = articles.map((article) => ({ slug: article.slug, title: article.title }));

  return (
    <SlugRescuePanel
      basePath="/blog"
      entityLabel="analyse"
      entityLabelPlural="analyses"
      index={index}
      indexHref="/blog"
      indexLabel="Voir toutes les analyses"
    />
  );
}
