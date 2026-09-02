import SlugRescuePanel from "@/components/SlugRescuePanel";
import { schools } from "@/data/resources";

/**
 * 404 de segment pour /schools/[slug].
 * Rendue par `notFound()` : statut HTTP 404 conserve, contenu utile ajoute.
 */
export default function SchoolNotFound() {
  const index = schools.map((school) => ({ slug: school.slug, title: school.title }));

  return (
    <SlugRescuePanel
      basePath="/schools"
      entityLabel="école"
      entityLabelPlural="écoles"
      index={index}
      indexHref="/schools"
      indexLabel="Voir toutes les écoles"
    />
  );
}
