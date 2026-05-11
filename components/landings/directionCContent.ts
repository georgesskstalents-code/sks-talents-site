// SKS Talents - content for /life-sciences and /animal-health
// Texte VERBATIM depuis le bundle Direction C (Marketing Agency).
// URLs internes converties en chemins relatifs pour le routing Next.js.

export type Metric = { value: string; label: string };
export type Vertical = {
  badge: string;
  title: string;
  subtitle: string;
  roles: string[];
  url: string;
};
export type MethodStep = { n: number; title: string; body: string; time: string };
export type DifferentiationItem = { label: string; value: string; body: string };
export type RhBoardItem = { label: string; kpi: string; body: string };
export type Testimonial = { quote: string; name: string; role: string };
export type Path = {
  eyebrow: string;
  title: string;
  body: string;
  statValue: string;
  statLabel: string;
  cta: { label: string; url: string };
  secondary?: { label: string; url: string };
  icon: "target" | "chip";
};

export type DirectionCSector = {
  slug: "life-sciences" | "animal-health";
  eyebrow: string;
  titleLead: string;
  titleTag: string;
  subtitle: string;
  description: string;
  primaryCta: { label: string; url: string };
  secondaryCta: { label: string; url: string };
  heroCaption: string;
  metricsEyebrow: string;
  metrics: Metric[];
  logosEyebrow: string;
  logosCounter: string;
  trustedBy: string[];
  verticalsEyebrow: string;
  verticalsTitle: string;
  verticalsIntro: string;
  verticals: Vertical[];
  methodEyebrow: string;
  methodTitle: string;
  method: MethodStep[];
  differentiationEyebrow: string;
  differentiationTitle: string;
  differentiation: DifferentiationItem[];
  rhBoardEyebrow: string;
  rhBoardTitle: string;
  rhBoardLede: string;
  rhBoard: RhBoardItem[];
  testimonial: Testimonial;
  paths: Path[];
  finalTitle: string;
  finalPrimary: { label: string; url: string };
  finalSecondary: { label: string; url: string };
  finalCaption: string;
  programIaUrl: string;
};

export type TrustpilotReview = {
  rating: number;
  quote: string;
  name: string;
  role: string;
  date: string;
};

export const trustpilot = {
  eyebrow: "Trustpilot · ★ 4,5 / 5",
  title: "Ce que nos clients et candidats disent de nous.",
  lede: "Notes vérifiées · Recrutements C-level Life Sciences & Animal Health · 100+ placements depuis 2018.",
  cta: { label: "Voir tous les avis Trustpilot →", url: "https://fr.trustpilot.com/review/skstalents.fr" },
  reviews: [
    {
      rating: 5,
      quote: "Georges m'a accompagné pendant plusieurs années sur des recrutements sensibles en EMEA. Rigueur dans le cadrage, finesse dans la lecture des profils, tenue du calendrier : un partenaire rare sur un marché où la confidentialité compte autant que la vitesse.",
      name: "Baldo",
      role: "Genomics · EMEA Commercial Director",
      date: "Il y a 2 mois"
    },
    {
      rating: 5,
      quote: "Le mapping marché et la qualité des shortlists nous ont fait gagner 4 mois sur une recherche VP Operations. Process exécuté à la lettre, suivi onboarding au-delà des standards du marché.",
      name: "Sophie M.",
      role: "DRH · Biotech Series B",
      date: "Il y a 3 mois"
    },
    {
      rating: 5,
      quote: "Approche très différente du recrutement classique. SKS a refusé deux missions qui ne correspondaient pas à leur secteur. Ce niveau de sélectivité crée immédiatement de la confiance.",
      name: "Thomas L.",
      role: "CEO · Deeptech biomatériaux",
      date: "Il y a 4 mois"
    },
    {
      rating: 5,
      quote: "Recrutement d'un Directeur Médical complexe : besoin scientifique, contraintes MDR, exigence M&A. Shortlist de 5 profils en 12 jours, candidat retenu en poste depuis 18 mois.",
      name: "Catherine D.",
      role: "COO · IVD Animal Health",
      date: "Il y a 5 mois"
    },
    {
      rating: 5,
      quote: "Confidentialité tenue, calendrier tenu, qualité tenue. Trois remplacements C-level sur 2 ans, zéro fuite, zéro brief écrit. Georges sait lire entre les lignes mieux que personne sur ce marché.",
      name: "Renaud P.",
      role: "Président · Groupe vétérinaire",
      date: "Il y a 6 mois"
    },
    {
      rating: 5,
      quote: "Au-delà du recrutement, SKS nous a aidé à structurer notre comité de direction. Vision RH executive-grade, lecture sectorielle Life Sciences, sens politique. Un vrai partenaire de pilotage.",
      name: "Anne-Laure V.",
      role: "CEO · Petfood premium",
      date: "Il y a 7 mois"
    }
  ] as TrustpilotReview[]
};

export const lifeSciencesContent: DirectionCSector = {
  slug: "life-sciences",
  eyebrow: "Life Sciences",
  titleLead: "Recruter, cadrer, structurer.",
  titleTag: "Life Sciences.",
  subtitle: "Pour les CEO, COO, CPO et DRH en biotech, diagnostic, deeptech, e-santé et robotique.",
  description: "Nous intervenons au cœur des organisations des Life Sciences : rôles critiques clarifiés, décisions sécurisées, digitalisation des processus par l'automatisation, exécution fiabilisée. Chaque mois de retard coûte. Nous éliminons ce qui ralentit. Moins de délais. Moins d'erreurs. Plus d'impact.",
  primaryCta: { label: "Je réserve un call - 15 min →", url: "https://calendly.com/g-kengue/talentconsulting" },
  secondaryCta: { label: "Voir notre Studio IA RH →", url: "/life-sciences/structuration-ia" },
  heroCaption: "Confidentiel par défaut · Réponse sous 24h · Sans brief écrit",

  metricsEyebrow: "Résultats observés",
  metrics: [
    { value: "10 j", label: "1re shortlist qualifiée" },
    { value: "60 j", label: "De l'intake à la signature" },
    { value: "92%", label: "Missions satisfaites" },
    { value: "100+", label: "Placements / mandats" }
  ],

  logosEyebrow: "Environnements déjà visibles sur le site",
  logosCounter: "6 marques accompagnées",
  trustedBy: [
    "Faircraft.bio", "Roche Diagnostics", "Beckman Coulter",
    "Miltenyi Biotec", "Solabia", "ELITechGroup"
  ],

  verticalsEyebrow: "Marchés focus",
  verticalsTitle: "Ce que nous faisons en Life Sciences",
  verticalsIntro: "Nous menons une executive search ciblée sur les quatre verticaux qui définissent les Life Sciences européennes. Un associé dédié par secteur. Une shortlist référencée. Une seule promesse : nous vous présentons des candidats qualifiés, pas des CV.",
  verticals: [
    {
      badge: "Series A → C",
      title: "Biotech",
      subtitle: "Series A → C",
      roles: [
        "CTO, VP Technologie, Plant Director, BD Manager, Account Manager EMEA, Technico-Commercial.",
        "Thérapeutique, plateformes, R&D intensive.",
        "Recrutements critiques en phase de scale-up européen."
      ],
      url: "/life-sciences/biotech"
    },
    {
      badge: "Scale-up industriel",
      title: "Deeptech biomatériaux",
      subtitle: "Scale-up industriel",
      roles: [
        "Head of Engineering, Lab Operations Manager.",
        "Bioprocédés, transferts d'échelle et industrialisation des biomatériaux."
      ],
      url: "/life-sciences/biotech/deeptech-startups"
    }
  ],

  methodEyebrow: "Notre méthode",
  methodTitle: "De l'intake à la signature - 60 jours.",
  method: [
    { n: 1, title: "Intake stratégique", body: "Cadrage du rôle, contexte, profil-cible et critères éliminatoires. Pas de brief écrit exigé.", time: "Jour 0 · 45 min" },
    { n: 2, title: "Mapping & shortlist", body: "Cartographie du marché, approche directe, qualification. Vous recevez 4 à 6 profils référencés.", time: "Jour 1 → 10" },
    { n: 3, title: "Entretiens & closing", body: "Coordination d'agenda, débriefs structurés, négociation, références approfondies.", time: "Jour 10 → 45" },
    { n: 4, title: "Onboarding & garantie", body: "Accompagnement à la prise de poste, suivi des signaux faibles et garantie si besoin.", time: "Jour 45 → 60" }
  ],

  differentiationEyebrow: "Différenciation",
  differentiationTitle: "Notre travail ne s'arrête pas à la signature.",
  differentiation: [
    { label: "Rétention long terme", value: "75%", body: "Des candidats placés restent 5 ans ou plus. Le placement est jugé sur la durée, pas sur la signature." },
    { label: "Suivi onboarding", value: "90 j", body: "Accompagnement structuré de la prise de poste : signaux faibles, calage avec le CODIR, alertes précoces." },
    { label: "Garantie de remplacement", value: "1", body: "Une garantie contractuelle si le candidat quitte le poste dans les 12 mois. Vous n'êtes jamais seul." }
  ],

  rhBoardEyebrow: "Studio IA RH · Offre séparée",
  rhBoardTitle: "Exemples d'agents que nous concevons. Un agent, un résultat.",
  rhBoardLede: "Le recrutement et le Studio IA RH sont deux offres distinctes. Voici, à titre d'exemple, des agents que nous pouvons concevoir pour les dirigeants Life Sciences - et le résultat business associé à chacun.",
  rhBoard: [
    { label: "Reporting investisseurs", kpi: "Board pack auto", body: "L'agent consolide pipeline, burn, hiring plan et risques réglementaires. Résultat : board deck prêt en 1 clic chaque mois." },
    { label: "CEO Copilot stratégique", kpi: "Décision hebdo", body: "L'agent croise données RH, finance et opérations pour produire une lecture hebdomadaire. Résultat : une décision data-driven par semaine." }
  ],

  testimonial: {
    quote: "Georges m'a accompagné pendant plusieurs années sur des recrutements sensibles en EMEA. Rigueur dans le cadrage, finesse dans la lecture des profils, tenue du calendrier : un partenaire rare sur un marché où la confidentialité compte autant que la vitesse.",
    name: "Baldo",
    role: "Genomics · EMEA Commercial Director"
  },

  paths: [
    {
      eyebrow: "Voie A · 01",
      title: "Vous recrutez un C-level",
      body: "CEO, COO, VP, DRH pour Life Sciences. 92% missions satisfaites.",
      statValue: "92%",
      statLabel: "missions satisfaites",
      cta: { label: "Je réserve un call - 15 min", url: "https://calendly.com/g-kengue/talentconsulting" },
      icon: "target"
    },
    {
      eyebrow: "Voie B · 02",
      title: "Vos process RH ne suivent plus votre croissance",
      body: "Nos agents IA Life Sciences automatisent reporting investisseurs, CEO Copilot stratégique, talent intelligence, onboarding & rétention.",
      statValue: "60 jours",
      statLabel: "intake → signature, en moyenne",
      cta: { label: "Programme Life Sciences", url: "/life-sciences/structuration-ia" },
      secondary: { label: "Diagnostic agents →", url: "/diagnostic" },
      icon: "chip"
    }
  ],

  finalTitle: "On regarde votre poste ensemble ?",
  finalPrimary: { label: "Je réserve un call - 15 min →", url: "https://calendly.com/g-kengue/talentconsulting" },
  finalSecondary: { label: "Écrivez-nous", url: "/contact" },
  finalCaption: "Réponse sous 24h · Échange de cadrage 15 min · Même URL de booking sur toute la page",

  programIaUrl: "/life-sciences/structuration-ia"
};

export const animalHealthContent: DirectionCSector = {
  slug: "animal-health",
  eyebrow: "Animal Health",
  titleLead: "Recruter, cadrer, structurer.",
  titleTag: "Animal Health.",
  subtitle: "Pour les CEO, COO, CPO et DRH en diagnostic animal health, cliniques vétérinaires et petfood premium.",
  description: "Nous intervenons au cœur des organisations de la Santé Animale : rôles critiques clarifiés, décisions sécurisées, digitalisation des processus par l'automatisation, exécution fiabilisée. Chaque mois de retard coûte. Nous éliminons ce qui ralentit. Moins de délais. Moins d'erreurs. Plus d'impact.",
  primaryCta: { label: "Je réserve un call - 15 min →", url: "https://calendly.com/g-kengue/talentconsulting" },
  secondaryCta: { label: "Voir notre Studio IA RH →", url: "/animal-health/structuration-ia" },
  heroCaption: "Confidentiel par défaut · Réponse sous 24h · Sans brief écrit",

  metricsEyebrow: "Résultats observés",
  metrics: [
    { value: "10 j", label: "1re shortlist qualifiée" },
    { value: "60 j", label: "De l'intake à la signature" },
    { value: "92%", label: "Missions satisfaites" },
    { value: "100+", label: "Placements / mandats" }
  ],

  logosEyebrow: "Environnements déjà visibles sur le site",
  logosCounter: "6 marques accompagnées",
  trustedBy: [
    "Affinity Petcare", "Saga Nutrition", "Qovetia",
    "Wolf Learning", "Connex Sante", "France Biotech"
  ],

  verticalsEyebrow: "Marchés focus",
  verticalsTitle: "Ce que nous faisons en Animal Health",
  verticalsIntro: "Nous accompagnons la santé animale sur trois verticales déjà présentes sur le site : Diagnostic Animal Health, Groupes de cliniques vétérinaires et Petfood. Un cadrage lisible. Une exécution serrée. Une seule promesse : nous faisons gagner du temps aux équipes sur des recrutements qui ne pardonnent pas l'approximation.",
  verticals: [
    {
      badge: "IVD vétérinaire · Biologie",
      title: "Diagnostic Animal Health",
      subtitle: "IVD vétérinaire · Biologie",
      roles: ["HR / CODIR roles (CEO, COO, CPO)", "Manufacturing", "Scale-up"],
      url: "/animal-health/veterinary/diagnostic-vet"
    },
    {
      badge: "Multi-sites · Consolidation",
      title: "Groupes de cliniques vétérinaires",
      subtitle: "Multi-sites · Consolidation",
      roles: ["HR / CODIR roles (CEO, COO, CPO)", "Operations", "Telemedecine", "Coordinateurs régionaux", "Marketing"],
      url: "/animal-health/veterinary/cliniques"
    },
    {
      badge: "Nutrition · Industrialisation",
      title: "Petfood",
      subtitle: "Nutrition · Industrialisation",
      roles: ["HR / CODIR roles (CEO, COO, CPO)", "Innovation", "Industrialisation", "Commercial growth"],
      url: "/animal-health/petfood"
    }
  ],

  methodEyebrow: "Notre méthode",
  methodTitle: "De l'intake à la signature - 60 jours.",
  method: [
    { n: 1, title: "Intake stratégique", body: "Cadrage du rôle, contexte, profil-cible et critères éliminatoires. Pas de brief écrit exigé.", time: "Jour 0 · 45 min" },
    { n: 2, title: "Mapping & shortlist", body: "Cartographie du marché, approche directe, qualification. Vous recevez 4 à 6 profils référencés.", time: "Jour 1 → 10" },
    { n: 3, title: "Entretiens & closing", body: "Coordination d'agenda, débriefs structurés, négociation, références approfondies.", time: "Jour 10 → 45" },
    { n: 4, title: "Onboarding & garantie", body: "Accompagnement à la prise de poste, suivi des signaux faibles et garantie si besoin.", time: "Jour 45 → 60" }
  ],

  differentiationEyebrow: "Différenciation",
  differentiationTitle: "Notre travail ne s'arrête pas à la signature.",
  differentiation: [
    { label: "Rétention long terme", value: "75%", body: "Des candidats placés restent 5 ans ou plus. Le placement est jugé sur la durée, pas sur la signature." },
    { label: "Suivi onboarding", value: "90 j", body: "Accompagnement structuré de la prise de poste : signaux faibles, calage avec le CODIR, alertes précoces." },
    { label: "Garantie de remplacement", value: "1", body: "Une garantie contractuelle si le candidat quitte le poste dans les 12 mois. Vous n'êtes jamais seul." }
  ],

  rhBoardEyebrow: "Studio IA RH · Offre séparée",
  rhBoardTitle: "Exemples d'agents que nous concevons. Un agent, un résultat.",
  rhBoardLede: "Le recrutement et le Studio IA RH sont deux offres distinctes. Voici, à titre d'exemple, des agents que nous pouvons concevoir pour les dirigeants Animal Health - et le résultat business associé à chacun.",
  rhBoard: [
    { label: "Reporting multi-sites", kpi: "Vision consolidée", body: "L'agent agrège KPI cliniques, marges, occupation des plannings vétérinaires. Résultat : un cockpit unique pour piloter le groupe." },
    { label: "COO Copilot opérations", kpi: "Pilotage temps réel", body: "L'agent croise données terrain, finance et planning pour produire une lecture hebdomadaire. Résultat : une décision data-driven par semaine." }
  ],

  testimonial: {
    quote: "Georges m'a accompagné pendant plusieurs années sur des recrutements sensibles en EMEA. Rigueur dans le cadrage, finesse dans la lecture des profils, tenue du calendrier : un partenaire rare sur un marché où la confidentialité compte autant que la vitesse.",
    name: "Baldo",
    role: "Genomics · EMEA Commercial Director"
  },

  paths: [
    {
      eyebrow: "Voie A · 01",
      title: "Vous recrutez un C-level",
      body: "CEO, COO, DG pour Animal Health. 92% missions satisfaites.",
      statValue: "92%",
      statLabel: "missions satisfaites",
      cta: { label: "Je réserve un call - 15 min", url: "https://calendly.com/g-kengue/talentconsulting" },
      icon: "target"
    },
    {
      eyebrow: "Voie B · 02",
      title: "Vos process RH ne suivent plus votre croissance",
      body: "Nos agents IA Animal Health automatisent reporting dirigeant, CFO Copilot, M&A pipeline vétérinaire, lead catcher 24/7, sales closer vétérinaire.",
      statValue: "60 jours",
      statLabel: "intake → signature, en moyenne",
      cta: { label: "Programme Animal Health", url: "/animal-health/structuration-ia" },
      secondary: { label: "Diagnostic agents →", url: "/diagnostic" },
      icon: "chip"
    }
  ],

  finalTitle: "On regarde votre poste ensemble ?",
  finalPrimary: { label: "Je réserve un call - 15 min →", url: "https://calendly.com/g-kengue/talentconsulting" },
  finalSecondary: { label: "Écrivez-nous", url: "/contact" },
  finalCaption: "Réponse sous 24h · Échange de cadrage 15 min · Même URL de booking sur toute la page",

  programIaUrl: "/animal-health/structuration-ia"
};
