import PageHero from "@/components/PageHero";
import ReferenceMarquee from "@/components/ReferenceMarquee";
import ReferenceGrid from "@/components/ReferenceGrid";
import { references } from "@/data/references";

export default function ReferencesPage() {
  return (
    <>
      <PageHero
        kicker="Les références"
        title="Des partenaires qui incarnent la profondeur sectorielle SKS TALENTS."
        description="Références, environnements techniques et cas partenaires reliés à la preuve sociale Trustpilot, aux verticales du cabinet et aux futures pages SEO détaillées."
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Les références" }
        ]}
      />
      <section className="container-shell py-8">
        <ReferenceMarquee items={references} />
      </section>
      <section className="container-shell py-4">
        <ReferenceGrid items={references} />
      </section>
    </>
  );
}
