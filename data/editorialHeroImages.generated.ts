// Per-article hero overrides. Empty by default - lib/editorialHeroImage.ts falls back
// to the keyword-based catalog (8 archetypes) when a slug is not listed here.
//
// File paths are served from /public/images/editorial/ via next/image.
// Add entries here as photos are deposited in /public/images/editorial/.
export const editorialHeroImages: Record<
  string,
  { src: string; alt: string; source?: string }
> = {
  "life-sciences-hiring-priorities-2026": {
    src: "/images/editorial/life-sciences-hiring-priorities-2026.jpg",
    alt: "Recrutement Life Sciences : 10 rôles tendus en R&D, industrialisation et commercialisation",
    source: "Unsplash"
  },
  "precision-medicine-biotech": {
    src: "/images/editorial/precision-medicine-biotech.jpg",
    alt: "Médecine de précision biotech : rôles et salaires en biotechnologie",
    source: "Unsplash"
  },
  "pet-clinic-group-expansion": {
    src: "/images/editorial/pet-clinic-group-expansion.jpg",
    alt: "Groupement de cliniques vétérinaires : structurer l'équipe pour l'expansion",
    source: "Unsplash"
  },
  "molecular-diagnostics-pcr-ngs": {
    src: "/images/editorial/molecular-diagnostics-pcr-ngs.jpg",
    alt: "Diagnostic moléculaire : profils experts PCR et NGS",
    source: "Unsplash"
  },
  "medtech-maintenance-field-service-roles": {
    src: "/images/editorial/medtech-maintenance-field-service-roles.jpg",
    alt: "Medtech maintenance et field service : pourquoi ces rôles sont critiques",
    source: "Unsplash"
  },
  "csv-validation-data-integrity-biotech": {
    src: "/images/editorial/csv-validation-data-integrity-biotech.jpg",
    alt: "CSV et data integrity en bioproduction : la validation comme goulot d'exécution",
    source: "Unsplash"
  },
  "drh-life-sciences-scaleup-playbook": {
    src: "/images/editorial/drh-life-sciences-scaleup-playbook.jpg",
    alt: "DRH Life Sciences en scale-up : playbook RH structurant",
    source: "Unsplash"
  },
  "cell-therapy-manufacturing": {
    src: "/images/editorial/cell-therapy-manufacturing.jpg",
    alt: "Cell therapy manufacturing : enjeux de staffing en biotech",
    source: "Unsplash"
  },
  "ivd-testing-laboratory-roles": {
    src: "/images/editorial/ivd-testing-laboratory-roles.jpg",
    alt: "Tests IVD : rôles de laboratoire et recrutement",
    source: "Unsplash"
  },
  "pet-nutrition-science-trends": {
    src: "/images/editorial/pet-nutrition-science-trends.jpg",
    alt: "Pet nutrition science : tendances R&D",
    source: "Unsplash"
  },
  "petfood-rd-quality-manufacturing-roles": {
    src: "/images/editorial/petfood-rd-quality-manufacturing-roles.jpg",
    alt: "Petfood R&D, qualité et production : rôles à staffer",
    source: "Unsplash"
  },
  "companion-fund-animal-health-hiring": {
    src: "/images/editorial/companion-fund-animal-health-hiring.jpg",
    alt: "Companion Fund II et impact recrutement en santé animale",
    source: "Unsplash"
  },
  "telemedicine-vet-practice": {
    src: "/images/editorial/telemedicine-vet-practice.jpg",
    alt: "Télémédecine vétérinaire : nouveaux rôles",
    source: "Unsplash"
  },
  "vaccine-manufacturing-careers": {
    src: "/images/editorial/vaccine-manufacturing-careers.jpg",
    alt: "Vaccine manufacturing : carrières et compétences 2026",
    source: "Unsplash"
  },
  "pourquoi-recruter-profil-rare-prend-6-mois": {
    src: "/images/editorial/pourquoi-recruter-profil-rare-prend-6-mois.jpg",
    alt: "Pourquoi recruter un profil rare prend 6 mois et comment réduire ce délai",
    source: "Unsplash"
  },
  "ai-medical-imaging-careers": {
    src: "/images/editorial/ai-medical-imaging-careers.jpg",
    alt: "IA en imagerie médicale : nouveaux métiers et profils hybrides",
    source: "Unsplash"
  },
  "arn-hiring-2025": {
    src: "/images/editorial/arn-hiring-2025.jpg",
    alt: "Thérapies ARN : tendances de recrutement biotech 2025",
    source: "Unsplash"
  },
  "business-france-services-webinaires-export-vie": {
    src: "/images/editorial/business-france-services-webinaires-export-vie.jpg",
    alt: "Business France : services export, webinaires et V.I.E pour les dirigeants",
    source: "Unsplash"
  },
  "crispr-gene-editing-roles": {
    src: "/images/editorial/crispr-gene-editing-roles.jpg",
    alt: "CRISPR édition génique : rôles clés et compétences attendues",
    source: "Unsplash"
  },
  "deeptech-startup-talent-war": {
    src: "/images/editorial/deeptech-startup-talent-war.jpg",
    alt: "Guerre des talents en deeptech : biotech early-stage",
    source: "Unsplash"
  },
  "ngs-bioinformatician-demand": {
    src: "/images/editorial/ngs-bioinformatician-demand.jpg",
    alt: "NGS bioinformaticien : le rôle le plus demandé en 2026",
    source: "Unsplash"
  },
  "orientation-biotech-lycees-francais-afrique": {
    src: "/images/editorial/orientation-biotech-lycees-francais-afrique.jpg",
    alt: "Orientation biotech : guide pour lycéens français en Afrique",
    source: "Unsplash"
  },
  "diagnostic-ai-cyber-application-roles": {
    src: "/images/editorial/diagnostic-ai-cyber-application-roles.jpg",
    alt: "Diagnostic moderne : 5 rôles hybrides en data, cyber, HL7, terrain",
    source: "Unsplash"
  },
  "bpifrance-business-france-agri-agro-benin": {
    src: "/images/editorial/bpifrance-business-france-agri-agro-benin.jpg",
    alt: "Mission Agri-Agro Bénin : opportunités Bpifrance et Business France",
    source: "Unsplash"
  },
  "export-manager-afrique-life-sciences": {
    src: "/images/editorial/export-manager-afrique-life-sciences.jpg",
    alt: "Export Manager Afrique en Life Sciences : un rôle critique",
    source: "Unsplash"
  },
  "export-manager-life-sciences-africa": {
    src: "/images/editorial/export-manager-life-sciences-africa.jpg",
    alt: "Export Manager Life Sciences pour l'Afrique et le MENA",
    source: "Unsplash"
  },
  "veterinary-ecc-urgences-penurie": {
    src: "/images/editorial/veterinary-ecc-urgences-penurie.jpg",
    alt: "Vétérinaire urgences et soins intensifs : pénurie qui se renforce",
    source: "Unsplash"
  },
  "quality-systems-biotech-sop-change-control": {
    src: "/images/editorial/quality-systems-biotech-sop-change-control.jpg",
    alt: "Quality Systems Biotech : SOP, change control, deviations",
    source: "Unsplash"
  }
};
