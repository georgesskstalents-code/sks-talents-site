import SlugRescuePanel from "@/components/SlugRescuePanel";
import { jobRoles } from "@/data/jobRoles";

/**
 * 404 de segment pour /job-roles/[slug].
 * Rendue par `notFound()` : le statut HTTP reste bien 404, mais le visiteur
 * (ou le moteur de reponse) recoit les fiches les plus proches du slug demande.
 */
export default function JobRoleNotFound() {
  const index = jobRoles.map((role) => ({ slug: role.slug, title: role.title }));

  return (
    <SlugRescuePanel
      basePath="/job-roles"
      entityLabel="fiche métier"
      entityLabelPlural="fiches métiers"
      index={index}
      indexHref="/job-roles"
      indexLabel="Voir toutes les fiches métiers"
    />
  );
}
