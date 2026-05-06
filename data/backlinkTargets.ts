/**
 * Liste curée de cibles backlinks pour SKS Talents.
 *
 * Critères :
 *   - DA estimé (Domain Authority) ≥ 30
 *   - Pertinence sectorielle Life Sciences / Animal Health / Executive Search
 *   - Accessibilité : annuaires membres, partenariats existants, pages contributeur
 *
 * Workflow :
 *   1. Trier par priority desc (3 = top, 1 = nice-to-have)
 *   2. Pour chaque cible, le `template` indique quel modèle utiliser
 *   3. Mettre à jour `status` au fur et à mesure (manuellement pour l'instant —
 *      Supabase tracker à brancher plus tard si volume justifie)
 */

export type BacklinkCategory =
  | "ecosystem"      // Clusters santé (France Biotech, Medicen, Lyonbiopôle, etc.)
  | "fund"           // VC santé (page écosystème, mention partenaire RH)
  | "media"          // Médias spécialisés Life Sciences
  | "academic"       // Écoles + masters partenaires (Paris-Saclay, etc.)
  | "association"    // Syndicats professionnels (SNVEL, AVECC, etc.)
  | "directory"      // Annuaires sectoriels (PageJaunes Pro, Société.com, etc.)
  | "competitor";    // Cross-link symbiotique (autre cabinet niche complémentaire)

export type BacklinkStatus =
  | "pending"        // À contacter
  | "sent"           // Email envoyé, attente
  | "responded"      // Réponse reçue, en discussion
  | "won"            // Backlink obtenu ✓
  | "lost"           // Refus / silence > 30 jours
  | "skip";          // Non pertinent finalement

export type BacklinkTemplate = "ecosystem" | "fund" | "media" | "academic" | "directory";

export type BacklinkTarget = {
  name: string;
  url: string;
  contactPath?: string;       // /membres, /partenaires, mailto, etc.
  contactEmail?: string;
  category: BacklinkCategory;
  template: BacklinkTemplate;
  priority: 1 | 2 | 3;        // 3 = top ROI
  rationale: string;          // Pourquoi cette cible vaut le coup
  status: BacklinkStatus;
  estimatedDa?: number;
};

export const backlinkTargets: BacklinkTarget[] = [
  // ─────────── Tier 1 — Clusters santé France (priorité max) ───────────
  {
    name: "France Biotech",
    url: "https://france-biotech.fr/",
    contactPath: "/qui-sommes-nous/devenir-membre/",
    contactEmail: "contact@france-biotech.fr",
    category: "ecosystem",
    template: "ecosystem",
    priority: 3,
    rationale:
      "L'association nationale de la biotech FR. Annuaire membres = backlink dofollow + audience CEO biotech 100% qualifiée. SKS est déjà mentionné dans plusieurs études France Biotech 2024 (vivier de fonds). Adhésion = ~3000€/an mais ROI SEO + business énorme.",
    status: "pending",
    estimatedDa: 56
  },
  {
    name: "Medicen Paris Region",
    url: "https://www.medicen.org/",
    contactPath: "/adhesion/",
    contactEmail: "contact@medicen.org",
    category: "ecosystem",
    template: "ecosystem",
    priority: 3,
    rationale:
      "Pôle de compétitivité Île-de-France santé — base de membres ultra-pertinente (biotech, medtech, deeptech santé Île-de-France). Annuaire avec lien direct.",
    status: "pending",
    estimatedDa: 48
  },
  {
    name: "Lyonbiopôle",
    url: "https://www.lyonbiopole.com/",
    contactPath: "/lyonbiopole/membres/",
    contactEmail: "contact@lyonbiopole.com",
    category: "ecosystem",
    template: "ecosystem",
    priority: 3,
    rationale:
      "Cluster santé Auvergne-Rhône-Alpes (Sanofi, BioMérieux, Boiron). Membre = backlink + accès à la pipeline biotech lyonnaise.",
    status: "pending",
    estimatedDa: 50
  },
  {
    name: "Eurobiomed",
    url: "https://www.eurobiomed.org/",
    contactPath: "/devenir-membre/",
    contactEmail: "contact@eurobiomed.org",
    category: "ecosystem",
    template: "ecosystem",
    priority: 3,
    rationale: "Cluster santé PACA + Occitanie. Pipeline Marseille/Montpellier (~500 sociétés santé).",
    status: "pending",
    estimatedDa: 45
  },
  {
    name: "BioValley France",
    url: "https://www.biovalley-france.com/",
    contactPath: "/adherer/",
    category: "ecosystem",
    template: "ecosystem",
    priority: 2,
    rationale: "Cluster santé Alsace (Strasbourg, Mulhouse). Hub Pharma + Biotech.",
    status: "pending",
    estimatedDa: 38
  },
  {
    name: "Polepharma",
    url: "https://www.polepharma.com/",
    contactPath: "/devenir-adherent/",
    category: "ecosystem",
    template: "ecosystem",
    priority: 2,
    rationale: "Cluster pharma Centre-Val de Loire. Sites industriels Servier, Ipsen, Pfizer France.",
    status: "pending",
    estimatedDa: 41
  },
  {
    name: "Cosmetic Valley",
    url: "https://www.cosmetic-valley.com/",
    contactPath: "/devenir-adherent/",
    category: "ecosystem",
    template: "ecosystem",
    priority: 1,
    rationale: "Cluster cosmétique — adjacent Life Sciences mais pertinent pour les marques pharma-cosméto.",
    status: "pending",
    estimatedDa: 44
  },
  {
    name: "France Deeptech",
    url: "https://www.francedeeptech.fr/",
    contactPath: "/adhesion",
    category: "ecosystem",
    template: "ecosystem",
    priority: 2,
    rationale: "Association deeptech FR — couvre la frange biotech-deeptech (IA santé, robotique médicale).",
    status: "pending",
    estimatedDa: 47
  },
  {
    name: "Bpifrance Hub HealthTech",
    url: "https://lehub.bpifrance.fr/secteur/health-deeptech/",
    contactPath: "/le-hub/contact/",
    category: "ecosystem",
    template: "ecosystem",
    priority: 3,
    rationale:
      "Hub Bpifrance = annuaire référence biotech/medtech FR. Mention SKS comme partenaire RH en exécution = signal national. DA très élevé.",
    status: "pending",
    estimatedDa: 78
  },
  // ─────────── Tier 2 — Associations Animal Health / Vétérinaire ───────────
  {
    name: "SNVEL (Syndicat National Vétérinaires d'Exercice Libéral)",
    url: "https://www.snvel.fr/",
    contactPath: "/contact",
    category: "association",
    template: "ecosystem",
    priority: 2,
    rationale: "Syndicat de référence vétérinaires libéraux FR. Page partenaires + newsletter.",
    status: "pending",
    estimatedDa: 35
  },
  {
    name: "FACCO (Fabricants d'aliments pour chiens, chats)",
    url: "https://www.facco.fr/",
    contactPath: "/contact/",
    category: "association",
    template: "ecosystem",
    priority: 2,
    rationale: "Fédération petfood FR. Vivier dirigeants petfood premium (notre cœur de cible).",
    status: "pending",
    estimatedDa: 32
  },
  {
    name: "AFVAC (Vétérinaires Animaux de Compagnie)",
    url: "https://afvac.com/",
    contactPath: "/partenaires/",
    category: "association",
    template: "ecosystem",
    priority: 2,
    rationale: "Association vétérinaire canine/féline. Annuaire partenaires + congrès annuel.",
    status: "pending",
    estimatedDa: 33
  },
  // ─────────── Tier 3 — Médias spécialisés ───────────
  {
    name: "Labiotech.eu",
    url: "https://www.labiotech.eu/",
    contactPath: "/contact/",
    category: "media",
    template: "media",
    priority: 3,
    rationale:
      "Média biotech européen #1. Tribune libre (interview Georges sur 'recruter dirigeant Series B') + mentions cas clients = excellents backlinks éditoriaux.",
    status: "pending",
    estimatedDa: 62
  },
  {
    name: "BioPharma Dive",
    url: "https://www.biopharmadive.com/",
    contactPath: "/about/contact/",
    category: "media",
    template: "media",
    priority: 2,
    rationale: "Média biotech US — anglophone mais lu par direction biotech FR (board members).",
    status: "pending",
    estimatedDa: 71
  },
  {
    name: "Vet'Argus (vétérinaire)",
    url: "https://www.vet-argus.fr/",
    contactPath: "/contact/",
    category: "media",
    template: "media",
    priority: 2,
    rationale: "Média vétérinaire FR. Tribune sur 'fidélisation des cliniques vétérinaires' à proposer.",
    status: "pending",
    estimatedDa: 36
  },
  {
    name: "L'Usine Nouvelle — Santé",
    url: "https://www.usinenouvelle.com/sante/",
    contactPath: "/contact/",
    category: "media",
    template: "media",
    priority: 3,
    rationale: "Média industriel FR. Section santé suivie par dirigeants biotech FR.",
    status: "pending",
    estimatedDa: 75
  },
  {
    name: "FierceBiotech",
    url: "https://www.fiercebiotech.com/",
    contactPath: "/about/contact",
    category: "media",
    template: "media",
    priority: 1,
    rationale: "Média biotech US. Plus difficile (audience global) mais haut DA.",
    status: "pending",
    estimatedDa: 73
  },
  // ─────────── Tier 4 — Académique ───────────
  {
    name: "Master Biology & Health — Paris-Saclay",
    url: "https://www.universite-paris-saclay.fr/formation/master/biologie-sante",
    contactPath: "/contact",
    category: "academic",
    template: "academic",
    priority: 3,
    rationale:
      "Georges intervient déjà dans ce master. Demander une mention 'partenaire carrière' sur la page formations + lien depuis la page intervenants.",
    status: "pending",
    estimatedDa: 70
  },
  {
    name: "ESSEC — Master Biotech & Pharma Management",
    url: "https://www.essec.edu/fr/program/masters-of-science-in-management/specialisation-biotech-pharma-management/",
    contactPath: "/contact/",
    category: "academic",
    template: "academic",
    priority: 2,
    rationale: "Programme MBA santé — alumni = futurs dirigeants biotech.",
    status: "pending",
    estimatedDa: 78
  },
  {
    name: "AgroParisTech — Filière Animal-Vétérinaire",
    url: "https://www.agroparistech.fr/",
    contactPath: "/contact",
    category: "academic",
    template: "academic",
    priority: 2,
    rationale: "Pour l'expertise Animal Health / Petfood. Forum carrière + page partenaires.",
    status: "pending",
    estimatedDa: 65
  },
  // ─────────── Tier 5 — Annuaires sectoriels ───────────
  {
    name: "Les Échos Solutions — Annuaire Cabinets RH",
    url: "https://solutions.lesechos.fr/",
    contactPath: "/contact/",
    category: "directory",
    template: "directory",
    priority: 2,
    rationale: "Annuaire éditorial Les Échos. Mention SKS Talents dans la rubrique cabinets exec search.",
    status: "pending",
    estimatedDa: 72
  },
  {
    name: "Annuaire Syntec Conseil",
    url: "https://syntec-conseil.fr/",
    contactPath: "/devenir-adherent/",
    category: "directory",
    template: "directory",
    priority: 2,
    rationale: "Syndicat des cabinets de conseil. Annuaire membres = lien dofollow autorité.",
    status: "pending",
    estimatedDa: 50
  }
];

export const backlinkTargetsByCategory = backlinkTargets.reduce(
  (acc, t) => {
    (acc[t.category] = acc[t.category] || []).push(t);
    return acc;
  },
  {} as Record<BacklinkCategory, BacklinkTarget[]>
);

export const totalBacklinkTargets = backlinkTargets.length;
export const topTierBacklinkTargets = backlinkTargets.filter((t) => t.priority === 3).length;
