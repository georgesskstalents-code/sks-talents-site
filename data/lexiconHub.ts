export type GlossaryConcept = {
  term: string;
  definition: string;
  whyItMatters: string;
  businessInsight: string;
};

export type GlossaryGroup = {
  title: string;
  description: string;
  concepts: GlossaryConcept[];
};

export type WhitepaperGuideSection = {
  title: string;
  bullets: string[];
};

export type WhitepaperGuide = {
  id: string;
  slug: string;
  title: string;
  description: string;
  benefit: string;
  problem: string;
  ctaLabel: string;
  successMessage: string;
  audience: string[];
  highlights: string[];
  sections: WhitepaperGuideSection[];
};

const concept = (
  term: string,
  definition: string,
  whyItMatters: string,
  businessInsight: string
): GlossaryConcept => ({
  term,
  definition,
  whyItMatters,
  businessInsight
});

export const lexiconHubPage = {
  slug: "lexique-life-sciences-rh",
  title: "Lexique Life Sciences & RH : structurer vos équipes et accélérer votre croissance",
  metaTitle:
    "Lexique Life Sciences & RH | Structuration RH, automatisation RH et recrutement Life Sciences",
  metaDescription:
    "Hub Life Sciences & RH : structuration RH, recrutement, automatisation, scale-up et performance organisationnelle. Checklist, erreurs fréquentes, diagnostic, FAQ et 3 guides à télécharger.",
  introQuestion:
    "Pourquoi les entreprises Life Sciences ont des difficultés à recruter et structurer leurs équipes ?",
  introAnswer:
    "Parce que le marché reste jeune, sous pression et souvent sous-structuré. En France, ~2 800 entreprises HealthTech coexistent avec plus de 50% de TPE de moins de 10 salariés, une moyenne de 29 collaborateurs et seulement 35% d’entreprises qui déclarent recruter efficacement. Quand 64% des dépenses et 39% des effectifs restent concentrés sur la R&D, le vrai coût ne vient pas d’un manque de candidats : il vient du temps perdu à recruter, arbitrer et coordonner sans structure claire.",
  heroSubtitle:
    "Dans les Life Sciences, la croissance ne ralentit pas seulement à cause du recrutement. Elle ralentit quand la structuration RH, l’automatisation utile et la prise de décision dirigeant ne sont pas alignées.",
  heroSignals: [
    "~2 800 entreprises HealthTech",
    "+50% de TPE de moins de 10 salariés",
    "35% recrutent efficacement",
    "75% ciblent l’international"
  ],
  mandatoryInsights: [
    "Le problème n’est pas le manque de candidats.",
    "Le vrai coût est le temps perdu.",
    "Ce qui marche à 10 casse à 30.",
    "Automatiser sans structurer ne sert à rien."
  ],
  problemBlocks: [
    {
      title: "Recrutement inefficace",
      copy:
        "68% des entreprises recrutent encore pendant que 13% licencient. Le sujet n’est donc pas seulement d’ouvrir des postes, mais d’éviter les cycles de recrutement qui consomment du temps sans sécuriser la décision."
    },
    {
      title: "Manque de structuration",
      copy:
        "Plus de 50% des structures restent très petites et 1/3 ont moins de 5 ans. Dans ce contexte, les process sont souvent implicites, dépendants des fondateurs et rarement documentés."
    },
    {
      title: "Perte de temps dirigeant",
      copy:
        "Avec des levées qui durent en moyenne 10 mois et 41% de tensions de trésorerie, chaque semaine perdue en arbitrages RH, en relances manuelles ou en recrutements mal cadrés a un coût direct."
    },
    {
      title: "Organisation sous-optimisée",
      copy:
        "Quand 64% des dépenses et 39% des effectifs restent absorbés par la R&D, l’organisation support doit être nette, légère et pilotée. Sinon, l’exécution ralentit avant même que le marché ne manque."
    }
  ],
  checklistItems: [
    "Votre process de recrutement est écrit, partagé et utilisé.",
    "Votre time-to-hire est suivi et discuté, pas seulement subi.",
    "Les rôles critiques sont définis avant l’ouverture des postes.",
    "Les tâches répétitives sont automatisées quand elles n’apportent pas de valeur humaine.",
    "Le recrutement ne dépend pas du CEO pour chaque validation."
  ],
  checklistScores: [
    { label: "0-2", verdict: "Chaos", copy: "Vous avancez surtout en réaction et en urgence." },
    { label: "3-4", verdict: "Fragile", copy: "Une partie de la mécanique tient, mais elle cassera en phase de scale." },
    { label: "5+", verdict: "Structuré", copy: "Votre organisation peut absorber davantage de croissance avec moins de friction." }
  ],
  topErrors: [
    "Recruter sans process commun entre dirigeant, hiring manager et RH.",
    "Recruter trop tard, quand le besoin est déjà devenu urgent.",
    "Laisser le CEO arbitrer chaque détail du recrutement.",
    "Oublier l’automatisation des tâches répétitives.",
    "Ne pas construire de pipeline candidat avant l’ouverture du poste.",
    "Ignorer les données utiles : délai, conversion, sources, rétention.",
    "Recruter dans l’urgence plutôt qu’en logique de plan.",
    "Sous-estimer l’impact d’une fiche de poste floue.",
    "Confondre accumulation d’outils et structuration RH.",
    "Penser qu’un marché pénurique se traite uniquement par le salaire."
  ],
  autoDiagnosticQuestions: [
    "Vos recrutements dépassent régulièrement le délai que vous jugez acceptable.",
    "Les erreurs ou allers-retours sont fréquents entre direction, RH et managers.",
    "Vos équipes RH ou opérationnelles se sentent surchargées par l’administratif.",
    "Vous manquez d’outils ou vos outils n’améliorent pas réellement l’exécution."
  ],
  autoDiagnosticConclusion:
    "Si vous hésitez sur l'un de ces 4 signaux, c'est qu'il est probablement temps de structurer.",
  faqs: [
    {
      question: "Comment recruter plus vite dans les Life Sciences ?",
      answer:
        "En cadrant mieux le besoin, en structurant le process et en réduisant la dépendance aux CV entrants. Le marché ne manque pas seulement de candidats : il manque surtout de process de sélection lisibles, de pipeline actif et de décisions rapides."
    },
    {
      question: "Pourquoi mon recrutement est lent ?",
      answer:
        "Parce que le ralentissement vient souvent de la structure, pas du volume de candidatures. Quand le besoin est flou, que la validation dépend du CEO et que la relance reste manuelle, le time-to-hire s’allonge mécaniquement."
    },
    {
      question: "Comment structurer ses RH sans alourdir l’organisation ?",
      answer:
        "En partant des moments qui bloquent réellement la croissance : recrutement, onboarding, rôles critiques, reporting utile et responsabilités claires. La bonne structuration RH simplifie, elle n’ajoute pas de bureaucratie."
    },
    {
      question: "Comment automatiser ses RH intelligemment ?",
      answer:
        "En automatisant les tâches répétitives et à faible valeur humaine : relances, tri initial, synchronisation d’informations, reporting, suivi de pipeline. Automatiser sans structure ne sert à rien ; automatiser un process clair libère du temps dirigeant."
    },
    {
      question: "Pourquoi les entreprises Life Sciences sous-investissent-elles dans leur organisation ?",
      answer:
        "Parce qu’une grande partie des ressources part vers la R&D, alors que la capacité à recruter, intégrer et exécuter conditionne la vitesse réelle de croissance. Vous investissez dans le produit, mais pas toujours dans l’organisation qui doit le porter."
    },
    {
      question: "Qu’est-ce qui change quand on passe de 10 à 30 collaborateurs ?",
      answer:
        "Ce qui fonctionnait par proximité, intuition et arbitrage direct ne suffit plus. À partir de cette taille, le manque de structuration RH, de priorisation des rôles clés et d’automatisation commence à coûter du temps, de la qualité de décision et parfois du cash."
    }
  ]
} as const;

export const whitepaperGuides: WhitepaperGuide[] = [
  {
    id: "100-concepts-cles",
    slug: "100-concepts-cles-structuration-rh-life-sciences-animal-health",
    title: "100 concepts clés pour structurer vos RH et accélérer votre croissance (Life Sciences & Animal Health)",
    description:
      "Guide complet pour comprendre les concepts essentiels du recrutement, de la structuration RH et de l’automatisation. Pensé pour les dirigeants, les COO, les CPO et les RH qui veulent gagner du temps, clarifier leurs priorités et éviter la désorganisation à mesure que l’entreprise grandit.",
    benefit: "Comprendre et structurer efficacement vos RH.",
    problem:
      "Vous avancez vite, mais vos décisions RH reposent encore sur l’intuition, l’urgence ou des outils mal alignés.",
    ctaLabel: "Recevoir le guide",
    successMessage:
      "Votre guide est prêt. Ouvrez-le maintenant ou réservez un échange si vous voulez transformer ce lexique en plan d’action.",
    audience: ["CEO", "COO", "CPO", "DRH"],
    highlights: [
      "100 notions utiles, expliquées sans jargon inutile",
      "Une lecture orientée croissance, pas administration RH",
      "Des liens clairs entre structuration, automatisation et performance"
    ],
    sections: [
      {
        title: "Ce que vous allez clarifier",
        bullets: [
          "Les concepts qui ralentissent le plus souvent une équipe sans être nommés.",
          "Les mots-clés à maîtriser pour piloter recrutement, onboarding et performance.",
          "Les notions qui comptent vraiment quand on passe de 10 à 30 puis à 50 collaborateurs."
        ]
      },
      {
        title: "Ce que vous allez éviter",
        bullets: [
          "Accumuler des outils sans structurer vos process.",
          "Confondre activité RH et efficacité organisationnelle.",
          "Perdre du temps dirigeant sur des arbitrages qui devraient être cadrés."
        ]
      },
      {
        title: "Ce que ce guide déclenche",
        bullets: [
          "Un vocabulaire commun entre direction, RH et managers.",
          "Une meilleure priorisation des chantiers RH à traiter d’abord.",
          "Des bases plus solides pour automatiser ce qui doit l’être."
        ]
      }
    ]
  },
  {
    id: "guide-dirigeants-scale",
    slug: "guide-dirigeants-recruter-structurer-scaler-life-sciences",
    title: "Le guide des dirigeants pour recruter, structurer et scaler dans les Life Sciences",
    description:
      "Guide stratégique pour dirigeants confrontés à des enjeux de croissance, de structuration et d’exécution. Il remet le recrutement, la structuration RH et l’automatisation dans une logique business : gagner du temps, sécuriser les rôles clés et faire tenir l’organisation quand le marché accélère.",
    benefit: "Structurer vos équipes pour accompagner votre croissance.",
    problem:
      "Votre produit avance, mais l’organisation support suit mal : arbitrages longs, rôles flous, dépendance forte au CEO et manque de visibilité sur les vrais priorités RH.",
    ctaLabel: "Recevoir le guide dirigeant",
    successMessage:
      "Le guide dirigeant est disponible. Vous pouvez l’ouvrir tout de suite puis demander un diagnostic si vous voulez prioriser les chantiers réellement critiques.",
    audience: ["CEO", "COO", "CPO", "Head of People"],
    highlights: [
      "Une lecture pensée pour les dirigeants, pas pour un service RH isolé",
      "Des scénarios concrets de passage de 10 à 50 collaborateurs",
      "Une approche structurée pour recruter, automatiser et décider plus vite"
    ],
    sections: [
      {
        title: "Les signaux à reconnaître",
        bullets: [
          "Le recrutement ralentit alors que les besoins deviennent plus critiques.",
          "Le CEO reste le point de passage de trop nombreuses décisions.",
          "Les outils existent, mais la structure ne suit pas."
        ]
      },
      {
        title: "Les arbitrages à poser",
        bullets: [
          "Quoi automatiser sans déshumaniser.",
          "Quels rôles sécuriser avant d’ouvrir de nouveaux chantiers.",
          "Comment faire tenir performance, cash et recrutement dans le même cadre."
        ]
      },
      {
        title: "Le résultat visé",
        bullets: [
          "Moins de friction dirigeant.",
          "Une meilleure lisibilité des rôles et des responsabilités.",
          "Une organisation qui accompagne la croissance au lieu de la freiner."
        ]
      }
    ]
  },
  {
    id: "recrutement-vous-ralentit",
    slug: "pourquoi-votre-recrutement-vous-ralentit-concepts-a-corriger",
    title: "Pourquoi votre recrutement vous ralentit (et les concepts à comprendre pour corriger ça)",
    description:
      "Analyse directe des erreurs de recrutement et des leviers d’optimisation. Ce livre blanc met des mots sur ce qui bloque vraiment : process inexistants, dépendance au dirigeant, urgence permanente, absence de pipeline et automatisation mal pensée.",
    benefit: "Identifier et corriger vos blocages rapidement.",
    problem:
      "Vous avez le sentiment de recruter souvent, mais sans gagner en vitesse, en lisibilité ou en qualité de décision.",
    ctaLabel: "Recevoir l’analyse",
    successMessage:
      "L’analyse est prête. Ouvrez-la maintenant pour repérer vos blocages, puis demandez un diagnostic si vous voulez un plan d’action priorisé.",
    audience: ["CEO", "COO", "CPO", "RH leaders"],
    highlights: [
      "Les erreurs qui coûtent du temps avant même de coûter de l’argent",
      "Des leviers simples pour réduire la friction et clarifier le process",
      "Un angle orienté performance organisationnelle et non simple recrutement"
    ],
    sections: [
      {
        title: "Ce que ce livre blanc révèle",
        bullets: [
          "Pourquoi les meilleurs candidats ne sont qu’une partie du problème.",
          "Comment l’absence de structure rallonge le recrutement.",
          "Pourquoi automatiser un process flou ne fait qu’accélérer le désordre."
        ]
      },
      {
        title: "Les erreurs les plus coûteuses",
        bullets: [
          "Recruter dans l’urgence.",
          "Ne pas documenter le besoin avant l’ouverture du poste.",
          "Mesurer l’activité plutôt que l’efficacité."
        ]
      },
      {
        title: "Ce que vous pouvez corriger vite",
        bullets: [
          "Créer un pipeline simple mais piloté.",
          "Retirer au CEO les validations qui n’ont pas besoin de lui.",
          "Automatiser les étapes répétitives une fois le process cadré."
        ]
      }
    ]
  }
];

export function getWhitepaperGuideById(id: string) {
  return whitepaperGuides.find((guide) => guide.id === id);
}

export function getWhitepaperGuideBySlug(slug: string) {
  return whitepaperGuides.find((guide) => guide.slug === slug);
}

export const glossaryGroups: GlossaryGroup[] = [
  {
    title: "Recrutement & sourcing",
    description:
      "Les notions à maîtriser pour recruter mieux, plus vite et avec moins de dépendance aux CV entrants.",
    concepts: [
      concept(
        "Recrutement Life Sciences",
        "Le recrutement Life Sciences regroupe les methodes d'attraction, de qualification et d'integration de talents specialises dans les environnements biotech, diagnostic, healthtech ou animal health. Il s'appuie sur une cartographie fine d'un marche penurique et rapide, ou un.e candidat.e cle peut basculer en quelques semaines, et exige un process structure que tout schema generique fragilise immediatement.",
        "Le marché est spécialisé, pénurique et rapide ; un process générique y perd beaucoup de temps.",
        "Structurer le recrutement Life Sciences permet de réduire la friction dirigeant et d’augmenter la qualité de décision."
      ),
      concept(
        "Approche directe",
        "L'approche directe est une methode de chasse qui consiste a contacter des profils cibles, souvent deja en poste et peu visibles sur le marche. En Life Sciences, HealthTech et Animal Health, elle devient incontournable pour les fonctions critiques (CSO, CMO, VP Clinical, Head of Regulatory) que le ou la candidat.e ne cherche jamais activement via les canaux entrants classiques.",
        "Quand les meilleurs profils ne postulent pas, l’approche directe devient une capacité d’exécution, pas un luxe.",
        "Une structuration RH solide sait quand sortir du recrutement entrant pour aller chercher les talents critiques."
      ),
      concept(
        "Talent mapping",
        "Le talent mapping designe la cartographie structuree des entreprises cibles, fonctions cles, profils disponibles et mouvements de marche, realisee avant l'ouverture d'un poste ou pendant sa conduite. En Life Sciences, HealthTech et Animal Health, il couvre les viviers R&D, affaires reglementaires, medical et commercial, et permet a un.e DRH ou CEO d'anticiper les recrutements critiques sur un marche etroit.",
        "Elle évite de recruter à l’aveugle et raccourcit la phase de ciblage.",
        "Le talent mapping améliore la performance du recrutement et nourrit ensuite vos scénarios d’automatisation du sourcing."
      ),
      concept(
        "Job intake",
        "Le job intake designe la session de cadrage initial reunissant le/la dirigeant.e, le/la hiring manager et la RH pour aligner le besoin reel, les criteres mesurables, les signaux d'exclusion et le profil cible. En Life Sciences et HealthTech, ou les profils combinent science, reglementaire et scale-up, cet alignement amont conditionne la qualite du shortlist et la vitesse du process.",
        "Sans intake robuste, la fiche de poste reste floue et le process s’allonge.",
        "Un bon job intake réduit les allers-retours et protège le temps du CEO dès le départ."
      ),
      concept(
        "Scorecard candidat",
        "La scorecard candidat designe une grille d'evaluation commune, definie avant les entretiens, qui note chaque profil sur des criteres precis (competences scientifiques, posture managériale, fit culturel). En Life Sciences et HealthTech, elle structure les debriefs entre le/la DRH, le/la CEO et les experts metier, reduit les biais et accelere la decision sur des postes cadres rares.",
        "Elle limite les biais, améliore la qualité des débriefs et accélère la décision.",
        "La scorecard est un point de rencontre entre structuration RH, performance et automatisation utile."
      ),
      concept(
        "Pipeline candidat",
        "Le pipeline candidat designe la vue structuree des profils par etape, du sourcing initial jusqu'a la signature de l'offre. En Life Sciences et HealthTech, ou un.e VP Clinical ou un.e Head of Regulatory se recrute sur viviers etroits, ce pipeline rend chaque etape mesurable, pilotable et facilite le reporting dirigeant attendu en comite executif.",
        "Sans pipeline, le recrutement devient une suite d’actions dispersées et non pilotées.",
        "Un pipeline clair rend le recrutement mesurable et facilite ensuite le reporting dirigeant."
      ),
      concept(
        "Time-to-hire",
        "Le time-to-hire designe la duree entre l'ouverture d'un poste et l'acceptation d'une offre par un.e candidat.e. En Life Sciences, HealthTech et Animal Health, il reflete le niveau de friction du processus : nombre d'etapes, delais de validation board, alignement CEO/DRH. Un time-to-hire qui s'allonge signale souvent un defaut de structure interne, pas seulement une penurie marche.",
        "C’est un indicateur simple du niveau de friction de votre processus.",
        "Quand le time-to-hire explose, le problème vient souvent de la structure et des validations, pas seulement du marché."
      ),
      concept(
        "Sourcing passif",
        "Le sourcing passif designe la recherche ciblee de profils cadres qui ne sont pas activement en recherche d'emploi, mais restent ouverts a une proposition credible. En Life Sciences, HealthTech et Animal Health, ou les expertises (affaires reglementaires, CMC, medical affairs) sont rares, il/elle constitue souvent la vraie source de talents strategiques pour un.e dirigeant.e.",
        "Dans les marchés de niche, le sourcing passif est souvent la vraie source de talents stratégiques.",
        "Plus votre organisation est claire, plus votre message devient convaincant auprès de talents rares."
      ),
      concept(
        "Entretien structuré",
        "L'entretien structuré désigne un format de recrutement où les questions, les critères d'évaluation et l'ordre de passage sont définis avant la rencontre, identiques pour chaque candidat.e. En Life Sciences et HealthTech, il sécurise les recrutements cadres (DRH, CMO, VP Clinical) en rendant les profils comparables et en réduisant le poids de l'impression subjective lors des décisions de comité.",
        "Il améliore la comparabilité des profils et réduit le poids de l’impression subjective.",
        "L’entretien structuré transforme le recrutement en système de décision, pas en intuition isolée."
      ),
      concept(
        "EVP",
        "L'EVP (Employer Value Proposition) designe la promesse employeur percue par le/la candidat.e sur le role, la mission, la remuneration et l'environnement de travail. En Life Sciences et HealthTech, ou la concurrence sur les profils scientifiques et reglementaires est forte, une EVP claire raccourcit le time-to-hire et fiabilise la projection de croissance.",
        "Une EVP floue rallonge le recrutement même avec une bonne marque.",
        "Structurer votre EVP revient à relier recrutement, performance organisationnelle et projection business."
      )
    ]
  },
  {
    title: "Structuration RH",
    description:
      "Les notions qui évitent que la croissance repose uniquement sur l’énergie du dirigeant.",
    concepts: [
      concept(
        "Structuration RH",
        "La structuration RH designe la mise en lisibilite des roles, decisions, process et outils RH d'une organisation, de maniere scalable. En Life Sciences et HealthTech, elle conditionne le passage de 10 a 50 collaborateurs sans casse operationnelle, protege le temps du ou de la dirigeant.e et rend toute automatisation ulterieure reellement exploitable.",
        "Sans structuration RH, ce qui fonctionne à 10 casse vite à 30.",
        "La structuration RH protège le temps dirigeant et rend l’automatisation réellement utile."
      ),
      concept(
        "Fiche de poste",
        "La fiche de poste est le document qui cadre un.e cadre avant recrutement : finalite du role, responsabilites, perimetre, criteres de reussite a 12 mois et interfaces cles (R&D, Affaires reglementaires, Medical, Commercial). En Life Sciences et Animal Health, elle aligne le/la dirigeant.e, le board et les investisseurs sur ce que la personne doit livrer concretement.",
        "Une fiche floue crée des attentes contradictoires et ralentit le recrutement.",
        "Mieux cadrer un poste améliore la qualité d’exécution avant même le premier entretien."
      ),
      concept(
        "Référentiel de compétences",
        "Le référentiel de compétences désigne un cadre partagé qui décrit les compétences attendues par fonction, niveau et contexte. En Life Sciences et HealthTech, il structure les arbitrages de recrutement, d'onboarding et de progression pour un.e VP Clinical, un.e CMO ou un.e Head of CMC, et soutient la performance d'équipe sans rejouer les mêmes débats à chaque cycle.",
        "Il aide à recruter, onboarder et faire progresser avec une logique cohérente.",
        "Un référentiel évite de refaire à chaque fois les mêmes arbitrages et soutient la performance d’équipe."
      ),
      concept(
        "Headcount planning",
        "Le headcount planning designe la planification structuree des recrutements par role, timing, priorite et contrainte business. En Life Sciences et HealthTech, il aligne les ouvertures de postes sur les jalons cliniques, reglementaires et de financement, et relie la croissance, le cash et l'organisation reelle pour eviter les recrutements opportunistes ou les urgences couteuses.",
        "Elle limite les ouvertures de postes opportunistes et les urgences coûteuses.",
        "Le headcount planning relie la croissance, le cash et l’organisation réelle."
      ),
      concept(
        "Workforce planning",
        "Le workforce planning designe la demarche strategique qui aligne besoins d'effectifs, competences critiques et trajectoire de croissance d'une organisation. En Life Sciences et HealthTech, ou les cycles de developpement clinique et reglementaire imposent des jalons longs, il permet a la direction d'anticiper les recrutements R&D, affaires reglementaires ou commerciales sans subir le tempo du marche.",
        "Elle évite de recruter trop tard, trop tôt ou sur les mauvais périmètres.",
        "Le workforce planning transforme le recrutement en levier de performance organisationnelle."
      ),
      concept(
        "RACI",
        "Le RACI est une matrice de responsabilites qui clarifie, pour chaque decision ou livrable, qui est Responsable de l'execution, qui en Assume la decision finale (Accountable), qui est Consulte en amont et qui est Informe en aval. Dans une biotech ou medtech en scale-up, il evite que le/la CEO ou le/la COO restent goulots sur des arbitrages deja distribuables.",
        "Elle évite que le CEO ou le COO restent bloqués sur des sujets qui devraient déjà être distribués.",
        "Un RACI simple diminue les frictions de coordination et accélère les cycles de décision."
      ),
      concept(
        "Onboarding",
        "L'onboarding designe le process d'integration structure qui rend un.e nouveau ou nouvelle collaboratrice rapidement operationnel.le et aligne.e sur la culture, les objectifs et les rituels de l'entreprise. En Life Sciences, biotech et HealthTech, il conditionne la montee en competence sur des sujets reglementaires complexes (AMM, GxP, pharmacovigilance) et securise la retention des profils cadres rares.",
        "Sans onboarding structuré, le coût d’un bon recrutement continue après la signature.",
        "L’onboarding est un chantier de structuration RH à fort impact sur la performance."
      ),
      concept(
        "Offboarding",
        "L'offboarding designe le processus structure de sortie d'un.e collaborateur.rice, incluant transfert documente des dossiers, restitution des acces, conformite reglementaire et continuite operationnelle. En Life Sciences et HealthTech, ou la tracabilite GxP et la propriete intellectuelle sont critiques, un offboarding rigoureux protege les essais cliniques en cours, securise le savoir scientifique et limite la perte de competences rares.",
        "Un offboarding mal géré fragilise l’organisation et alimente les erreurs récurrentes.",
        "Une structure mature traite l’entrée et la sortie avec le même niveau de rigueur."
      ),
      concept(
        "Matrice de décision",
        "La matrice de decision est un cadre qui formalise les criteres d'arbitrage et le niveau d'urgence associe a chaque type de decision, notamment sur les postes critiques. En Life Sciences et HealthTech, elle clarifie qui tranche entre CEO, COO, DRH et board, reduit les arbitrages emotionnels et accelere l'execution sur les recrutements strategiques.",
        "Elle évite les arbitrages émotionnels ou improvisés sur les postes critiques.",
        "La matrice de décision réduit la dépendance au CEO et améliore la vitesse d’exécution."
      ),
      concept(
        "Operating model RH",
        "L'operating model RH designe la repartition formalisee des responsabilites RH entre direction generale, managers de proximite, equipe RH et outils (SIRH, ATS, paie). Dans une scale-up Life Sciences ou HealthTech qui passe de 30 a 150 collaborateurs, ce modele clarifie qui decide, qui execute, qui automatise, pour eviter la dilution operationnelle et fiabiliser le pilotage social.",
        "Sans operating model, chacun fait un peu de tout et rien n’est vraiment piloté.",
        "Clarifier ce modèle permet d’automatiser proprement et de rendre l’organisation plus légère."
      )
    ]
  },
  {
    title: "Automatisation & outils",
    description:
      "Les notions qui permettent de gagner du temps sans déshumaniser les moments clés.",
    concepts: [
      concept(
        "Automatisation RH",
        "L'automatisation RH designe l'usage d'outils logiciels et d'IA pour executer les taches repetitives du recrutement, du suivi candidat et de l'administration du personnel (relances, scoring, onboarding, reporting). Dans une biotech ou medtech en scale-up, elle libere du temps au/a la DRH seulement si les process sous-jacents sont deja clarifies et documentes.",
        "Elle libère du temps, mais seulement si les étapes automatisées sont déjà claires.",
        "Automatiser sans structurer ne sert à rien ; automatiser un bon process augmente la performance."
      ),
      concept(
        "Automatisation recrutement",
        "L'automatisation recrutement designe la mise en place de sequences, regles ou workflows qui accelerent le sourcing, le tri des candidatures, les relances et la coordination des entretiens. En Life Sciences et HealthTech, ou les profils CMC, affaires reglementaires ou medical affairs sont rares, elle libere le temps du cabinet pour la qualification scientifique et l'evaluation culturelle, sans appauvrir l'experience candidat.",
        "Elle réduit la charge manuelle quand le volume ou la complexité augmentent.",
        "Une automatisation bien pensée raccourcit le time-to-hire sans appauvrir l’expérience candidat."
      ),
      concept(
        "Workflow RH",
        "Le workflow RH designe une suite d'etapes definies, declenchees automatiquement ou semi-automatiquement, pour faire avancer un processus RH (recrutement, onboarding, revue de performance, offboarding). En Life Sciences et HealthTech, il rend les operations repetables, tracables et auditables, condition indispensable pour passer un audit investisseur, ATMP ou ISO sans reconstruire l'historique a la main.",
        "Le workflow rend les opérations répétables et auditables.",
        "C’est la base pour relier outils, structuration RH et gain de temps dirigeant."
      ),
      concept(
        "No-code",
        "Le no-code designe une approche logicielle permettant de construire des automatisations, workflows ou interfaces metier sans ecrire de code, via des outils visuels type Make, n8n ou Airtable. En Life Sciences et HealthTech, il accelere le deploiement de gains operationnels RH, regulatoires ou commerciaux, quand le perimetre fonctionnel et les donnees manipulees sont deja clairement structures en amont.",
        "Très utile pour tester et déployer vite des gains opérationnels.",
        "Le no-code devient un accélérateur quand les responsabilités et les données à manipuler sont déjà claires."
      ),
      concept(
        "ATS",
        "L'ATS (Applicant Tracking System) designe l'outil logiciel de pilotage du recrutement qui centralise candidatures, etapes du pipeline et interactions avec les candidat.e.s. Dans une biotech ou HealthTech en scale-up, il remplace les mails, tableurs et messages disperses, et conditionne la tracabilite reglementaire ainsi que la qualite du reporting RH transmis au.a la CEO ou DRH.",
        "Il centralise l’information au lieu de la laisser dispersée entre mails, tableurs et messages.",
        "Un ATS améliore la performance seulement s’il sert un process décidé, pas un désordre numérisé."
      ),
      concept(
        "CRM candidats",
        "Le CRM candidats designe une base structuree pour conserver, segmenter et reactiver des profils deja identifies sur un secteur (biotech, medtech, animal health, diagnostic). Il evite de repartir de zero a chaque ouverture de poste, reduit le cout par recrutement et alimente une logique de pipeline long terme sur fonctions cadres rares (un.e VP R&D, un.e CMO, un.e Head of Quality).",
        "Il évite de repartir de zéro à chaque poste ouvert.",
        "Le CRM candidats réduit le coût du recrutement et soutient la logique de pipeline long terme."
      ),
      concept(
        "Parsing CV",
        "Le parsing CV designe la lecture automatique d'un CV par un logiciel qui extrait les donnees structurees (coordonnees, experiences, diplomes, competences) pour alimenter un ATS ou un vivier. En Life Sciences et Animal Health, il accelere le tri initial sur des volumes eleves, mais sa valeur depend entierement de la qualite des criteres definis en amont par le/la recruteur.",
        "Le parsing fait gagner du temps sur le tri initial, surtout en volume.",
        "Ce type d’automatisation n’a de valeur que si les critères de tri ont été définis en amont."
      ),
      concept(
        "Relance automatisée",
        "La relance automatisée désigne l'envoi programmé de messages ou rappels à des candidat.e.s, managers ou recruteurs via un ATS ou un outil de séquençage. En recrutement Life Sciences et HealthTech, où le/la CSO ou DRH jongle avec des cycles longs, elle fluidifie le suivi, réduit la friction opérationnelle et limite les pertes de candidat.e.s entre deux étapes du process.",
        "Elle réduit la friction opérationnelle et améliore le suivi.",
        "Une simple relance automatisée peut déjà rendre un process plus fluide sans alourdir l’organisation."
      ),
      concept(
        "SIRH",
        "Le SIRH (Systeme d'Information Ressources Humaines) designe la plateforme logicielle qui centralise donnees, processus et documents lies aux collaborateurs : paie, contrats, temps, formation, entretiens, recrutement. Dans une biotech ou medtech en scale-up, il evite la fragmentation entre tableurs et outils isoles, et donne au.a la DRH une base fiable pour piloter effectifs, masse salariale et conformite.",
        "Le SIRH évite la fragmentation des données RH entre plusieurs sources peu fiables.",
        "Bien utilisé, il soutient la performance organisationnelle et simplifie le pilotage."
      ),
      concept(
        "Dashboard RH",
        "Le Dashboard RH designe une interface de pilotage qui consolide les indicateurs cles de recrutement, retention et efficacite operationnelle d'une organisation. Dans une biotech, medtech ou scale-up Animal Health, il permet au/a la CEO, DRH ou COO de lire en continu le time-to-hire, le turnover cadre et la couverture des fonctions critiques sans dependre d'extractions manuelles.",
        "Sans tableau de bord, les décisions se prennent sur ressenti plutôt que sur signal.",
        "Le dashboard RH donne aux dirigeants une lecture plus rapide des priorités à traiter."
      )
    ]
  },
  {
    title: "Leadership & organisation",
    description:
      "Les notions qui déterminent si la croissance repose sur un système ou sur une poignée d’arbitrages dirigeants.",
    concepts: [
      concept(
        "CEO dependency",
        "La CEO dependency designe la situation ou trop de decisions critiques (recrutement cadre, arbitrages R&D, signature commerciale) restent bloquees ou arbitrees par le/la CEO. Frequente dans les biotech et HealthTech en phase de scale-up post-Serie A, elle ralentit la croissance, sature le comite executif et fragilise la continuite operationnelle en cas d'absence.",
        "Elle ralentit la croissance et augmente la fatigue dirigeant.",
        "Réduire la dépendance au CEO est une étape centrale de la structuration RH."
      ),
      concept(
        "COO alignment",
        "Le COO alignment designe la coherence entre les operations, le plan de recrutement et les priorites de croissance d'une entreprise Life Sciences ou HealthTech. Il garantit que chaque embauche (production GMP, affaires reglementaires, commercial) reduit un goulot reel identifie par le/la COO, et non un besoin theorique porte par un budget annuel fige.",
        "Sans cet alignement, les recrutements ne servent pas toujours les goulots réels de l’entreprise.",
        "Un bon alignement COO améliore la qualité des arbitrages et de la mise en œuvre."
      ),
      concept(
        "CPO / DRH",
        "Le ou la CPO (Chief People Officer) ou DRH designe la fonction cadre chargee d'aligner organisation, recrutement, management et developpement des equipes. En Life Sciences, HealthTech et Animal Health, il/elle structure la montee en charge d'une biotech ou medtech apres une serie A, en arbitrant entre culture scientifique, conformite reglementaire et velocite commerciale exigees par les investisseurs.",
        "Elle devient critique dès que l’entreprise doit structurer plutôt qu’improviser.",
        "Le bon rôle RH agit comme accélérateur de croissance, pas comme centre administratif."
      ),
      concept(
        "Hiring manager",
        "Le hiring manager designe le ou la responsable operationnel.le qui pilote directement un recrutement pour son equipe (R&D, Affaires reglementaires, Medical, Commercial). En Life Sciences et HealthTech, il/elle cadre le brief, valide les competences scientifiques, arbitre les short-lists et porte la decision finale, en lien etroit avec la DRH et le cabinet partenaire.",
        "S’il n’est pas cadré, il peut ralentir ou désaligner tout le process.",
        "Former les hiring managers est un levier direct de performance recrutement."
      ),
      concept(
        "Cadence de décision",
        "La cadence de decision designe le rythme auquel un comite executif Life Sciences ou Animal Health prend et clot ses arbitrages de recrutement ou d'organisation. Une cadence faible allonge chaque mission, meme quand le marche repond vite, et alourdit les couts caches portes par le/la CEO, le/la COO et le/la DRH.",
        "Une cadence faible allonge tout, même lorsque le marché répond bien.",
        "Structurer la cadence réduit les coûts cachés de l’attente et protège le temps dirigeant."
      ),
      concept(
        "Ownership",
        "L'ownership designe la responsabilite explicite et nominative d'un.e collaborateur.rice sur un perimetre, une decision ou un resultat mesurable. Dans une biotech ou medtech en scale-up, ou les equipes croisent R&D, affaires reglementaires et commercial, nommer un.e owner unique par sujet evite les trous de coordination, les doublons d'effort et accelere l'execution operationnelle au quotidien.",
        "L’absence d’ownership crée des trous de coordination et des doublons.",
        "Nommer un owner clair est souvent plus puissant qu’ajouter un outil supplémentaire."
      ),
      concept(
        "Span of control",
        "Le span of control designe le nombre de collaborateurs ou de sujets qu'un.e manager peut piloter efficacement sans degrader la qualite d'execution. Dans les scale-ups Life Sciences, HealthTech et Animal Health, ce ratio devient critique en phase de croissance rapide : un span trop large fragilise le coaching, la retention et la fiabilite operationnelle des equipes R&D et commerciales.",
        "Un span trop large fragilise le management, surtout en phase de croissance rapide.",
        "Adapter le span de control améliore la rétention et la qualité d’exécution."
      ),
      concept(
        "Management layer",
        "Le management layer designe la couche intermediaire de cadres (Heads, Directors, VPs) qui relie la strategie executive a l'execution terrain. En biotech ou medtech en scale-up, le/la CEO l'installe souvent entre 30 et 80 collaborateurs, pour absorber la croissance sans saturer le comex ni perdre la traction operationnelle sur les programmes R&D.",
        "Le créer trop tard ou trop tôt peut coûter cher.",
        "La bonne couche managériale soutient la structuration RH sans créer d’usine à gaz."
      ),
      concept(
        "Operating rhythm",
        "L'operating rhythm designe l'ensemble structure des rituels, instances et sequences (revues hebdo, comites mensuels, points trimestriels) qui font avancer une organisation de maniere previsible. Dans une biotech ou medtech en scale-up, il synchronise R&D, affaires reglementaires, commercial et finance, reduit les arbitrages de derniere minute et libere du temps cadre pour le/la CEO et son comite executif.",
        "Un rythme clair diminue le bruit et les arbitrages de dernière minute.",
        "L’operating rhythm fait gagner du temps aux dirigeants tout en renforçant la qualité de coordination."
      ),
      concept(
        "Change management",
        "Le change management designe la methode structuree pour faire accepter, ancrer et tenir dans la duree une evolution d'outils, d'organisation ou de process. En biotech, medtech ou Animal Health, il conditionne l'adoption reelle d'un ERP qualite, d'un CRM commercial ou d'une reorganisation R&D, et evite qu'une bonne automatisation echoue faute d'accompagnement terrain.",
        "Même une bonne automatisation échoue si elle n’est pas accompagnée.",
        "Le change management relie technologie, structure et adoption réelle sur le terrain."
      )
    ]
  },
  {
    title: "Performance & indicateurs",
    description:
      "Les mesures qui transforment un ressenti RH en décision business plus claire.",
    concepts: [
      concept(
        "Performance organisationnelle",
        "La performance organisationnelle designe la capacite d'une entreprise Life Sciences, HealthTech ou Animal Health a transformer sa strategie en execution fluide, lisible et reproductible. Elle repose sur la clarte des roles cadres, la robustesse des process RH et scientifiques, et la qualite des recrutements qui soutiennent la croissance reglementee du secteur.",
        "Elle dépend autant des process et des rôles que des personnes recrutées.",
        "Recrutement, structuration RH et automatisation sont trois leviers concrets de performance organisationnelle."
      ),
      concept(
        "Quality of hire",
        "Le quality of hire mesure la reussite d'un recrutement au-dela de la signature : qualite d'integration, performance dans la fonction, tenue dans la duree et impact sur l'equipe. En Life Sciences et HealthTech, ou un.e Head of Clinical ou un.e CMO engage la roadmap produit, ce KPI prime sur le simple time-to-hire.",
        "Recruter vite ne suffit pas si la qualité chute ensuite.",
        "Une bonne structuration RH permet d’améliorer la quality of hire sans allonger inutilement les délais."
      ),
      concept(
        "Offer acceptance rate",
        "L'offer acceptance rate designe le pourcentage d'offres signees parmi celles emises par l'entreprise. En Life Sciences et HealthTech, ou un.e candidat.e cadre arbitre souvent entre plusieurs scale-ups concurrentes, cet indicateur mesure la qualite de la proposition (remuneration, projet, equity), la fluidite du process et la pertinence du timing de closing.",
        "Il révèle la qualité de votre proposition, de votre process et de votre timing.",
        "Un taux faible peut signaler un problème d’alignement plus qu’un problème de marché."
      ),
      concept(
        "Rétention 12 mois",
        "La rétention 12 mois désigne la part des recrutements encore en poste un an après leur arrivée. Cet indicateur croise la qualité du sourcing, la solidité de l'onboarding et la maturité managériale. En Life Sciences et HealthTech, où chaque cadre porte un.e projet critique (clinique, réglementaire, industriel), un départ avant 12 mois pèse directement sur la roadmap.",
        "Elle révèle si le recrutement, l’onboarding et le management tiennent ensemble.",
        "La rétention est un indicateur business, pas seulement RH."
      ),
      concept(
        "Time to productivity",
        "Le time to productivity designe le delai entre l'arrivee d'un.e collaborateur.rice et le moment ou il/elle delivre pleinement sur son perimetre. En Life Sciences, HealthTech et Animal Health, ce delai depend de la complexite reglementaire, scientifique et terrain. Un onboarding structure et des attentes clarifiees le reduisent plus surement qu'une intensification du suivi.",
        "Ce délai impacte directement l’exécution et le ROI d’un recrutement.",
        "Structurer l’onboarding et clarifier les attentes réduit ce délai plus sûrement qu’une simple intensification du suivi."
      ),
      concept(
        "Source effectiveness",
        "La source effectiveness mesure la capacite d'un canal de sourcing (LinkedIn, cooptation, vivier cabinet, jobboards specialises Life Sciences) a produire des profils qualifies, presentes et recrutes. En biotech ou medtech, ou un.e Head of CMC ou un.e VP Clinical se trouve sur 3 a 5 canaux maximum, ce pilotage evite de disperser le budget sourcing.",
        "Toutes les sources ne se valent pas selon le poste, le marché et le niveau d’urgence.",
        "Suivre l’efficacité des sources permet de concentrer l’effort là où il produit vraiment."
      ),
      concept(
        "Funnel conversion",
        "Le funnel de conversion designe le taux de passage des candidat.e.s d'une etape a la suivante dans le pipeline de recrutement (sourcing, screening, entretiens, offre, signature). En Life Sciences et HealthTech, il revele ou le process se bloque reellement, qu'il s'agisse de pertes au screening scientifique, de delais d'entretien trop longs ou d'offres refusees sur package.",
        "Le funnel montre où le process se bloque réellement.",
        "Un funnel lisible guide les priorités d’automatisation et de simplification."
      ),
      concept(
        "SLA recrutement",
        "Le SLA recrutement designe un engagement formel de delai et de niveau de service entre RH, managers operationnels et direction generale. En Life Sciences et HealthTech, il cadre le time-to-hire sur les fonctions critiques (un.e VP Clinical, un.e Head of Regulatory, un.e CFO scaleup) et rend visibles les retards qui, sans lui, restent silencieux.",
        "Sans SLA, chacun projette son propre rythme et les retards deviennent invisibles.",
        "Le SLA aide à professionnaliser la relation entre structuration RH et business."
      ),
      concept(
        "Forecast recrutement",
        "Le forecast recrutement designe la projection des besoins, des delais et des charges de recrutement sur un horizon donne (6, 12 ou 24 mois). En Life Sciences, biotech et HealthTech, il relie la roadmap clinique, R&D et commerciale au plan de hiring, anticipe les fonctions critiques et arbitre entre interne, externe et executive search.",
        "Elle réduit l’effet de surprise et le pilotage à court terme.",
        "Le forecast permet de relier le recrutement à la réalité opérationnelle et financière."
      ),
      concept(
        "Vacancy cost",
        "Le vacancy cost designe le cout reel d'un poste critique reste vacant trop longtemps : revenus differes, projets ralentis, surcharge des equipes en place et perte d'opportunites commerciales. En Life Sciences et HealthTech, un.e Head of Clinical ou un.e VP Regulatory non pourvu.e peut decaler un dossier AMM de plusieurs mois, bien au-dela du budget RH visible.",
        "Ce coût est souvent supérieur à ce qui apparaît dans le budget RH.",
        "Parler de vacancy cost aide à repositionner le recrutement comme sujet de performance et non simple support."
      )
    ]
  },
  {
    title: "Scale-up & croissance",
    description:
      "Les notions qui deviennent critiques quand l’entreprise change de vitesse.",
    concepts: [
      concept(
        "Scale-up",
        "Le scale-up designe une entreprise sortie de la phase de validation marche et entree en absorption de croissance rapide. En Life Sciences, HealthTech et Animal Health, ce stade impose de structurer finance, operations et RH avant que le volume ne fragilise l'execution. Les intuitions initiales du fondateur ne suffisent plus a tenir l'organisation.",
        "À ce stade, les intuitions initiales ne suffisent plus à faire tenir l’organisation.",
        "La scale-up réussie structure ses RH juste assez tôt pour ne pas ralentir sa croissance."
      ),
      concept(
        "Hypercroissance",
        "L'hypercroissance designe une phase d'expansion rapide d'une biotech, medtech ou scaleup HealthTech, ou les besoins de recrutement, de coordination et de priorisation s'intensifient simultanement. Elle amplifie les defauts de structure deja presents (process flous, roles ambigus, dette managériale) et transforme la clarification des perimetres et l'automatisation RH en enjeu de survie operationnelle pour le/la CEO.",
        "L’hypercroissance amplifie tous les défauts de structure déjà présents.",
        "Automatiser et clarifier les rôles devient alors un sujet de survie opérationnelle."
      ),
      concept(
        "10-to-30 gap",
        "Le 10-to-30 gap designe le palier de croissance ou une biotech, medtech ou scaleup HealthTech fonctionne encore par proximite directe entre fondateurs et equipes, mais commence a perdre en lisibilite operationnelle. Les rituels informels saturent, les decisions ralentissent, et le/la CEO voit apparaitre les premiers couts caches RH avant d'avoir structure ses fonctions cadres.",
        "C’est souvent là que les premiers coûts cachés RH apparaissent.",
        "Ce qui marche à 10 casse à 30 : le 10-to-30 gap doit être anticipé, pas subi."
      ),
      concept(
        "30-to-50 transition",
        "La 30-to-50 transition designe le passage d'une biotech ou HealthTech de 30 a 50 collaborateur.rice.s, seuil ou les rituels informels, les decisions implicites et les process orales atteignent leur limite. La dependance au CEO devient couteuse, l'organisation doit expliciter ses rituels, formaliser ses arbitrages et installer un middle management capable de relayer.",
        "À ce stade, la dépendance au CEO devient souvent trop coûteuse.",
        "La transition 30-to-50 demande moins d’héroïsme et plus de système."
      ),
      concept(
        "Founders trap",
        "Le founders trap designe la situation ou les fondateurs et fondatrices d'une biotech ou medtech continuent d'absorber l'essentiel des decisions operationnelles au lieu de structurer la delegation vers un comite executif. En phase de scale-up Life Sciences, ce goulot ralentit le time-to-hire, fragilise la levee Serie B et empeche le ou la CEO de tenir son role d'arbitre strategique.",
        "Elle peut freiner la vitesse de croissance plus que le marché lui-même.",
        "Sortir du founders trap demande une meilleure structuration RH et opérationnelle."
      ),
      concept(
        "Hiring burst",
        "Le hiring burst designe une periode de recrutements acceleres ou une scaleup Life Sciences, HealthTech ou Animal Health ouvre plusieurs roles cles en parallele, souvent apres une levee de fonds ou un closing serie B. Sans pipeline qualifie ni priorisation des fonctions critiques, il sature la bande passante du ou de la DRH et du comite executif.",
        "Sans pipeline ni priorisation, elle consomme énormément de bande passante.",
        "Préparer un hiring burst oblige à clarifier vos priorités business et vos capacités internes."
      ),
      concept(
        "Mission critical role",
        "Le mission critical role designe un poste dont l'absence ou la vacance ralentit directement la performance ou le deploiement d'une strategie. En Life Sciences, HealthTech et Animal Health, il s'agit typiquement du ou de la VP Clinical, CSO, Head of Regulatory ou CFO scale-up : leur recrutement conditionne le cash, le calendrier reglementaire et l'attention du board.",
        "Tous les recrutements ne se valent pas ; les rôles critiques doivent être traités différemment.",
        "Identifier ces rôles permet de mieux arbitrer cash, délai et attention dirigeant."
      ),
      concept(
        "Organisation debt",
        "L'organisation debt designe la dette structurelle accumulee par une biotech, medtech ou scaleup Animal Health quand les choix de structure, de role ou de process sont repousses. Comme la dette technique, elle finit par freiner le scaling, alourdir les recrutements cadres et obliger le/la CEO a des corrections couteuses bien plus tard.",
        "Comme une dette technique, elle finit par freiner tout le système.",
        "Traiter l’organisation debt tôt réduit le besoin de corrections lourdes plus tard."
      ),
      concept(
        "Process debt",
        "Le process debt designe l'accumulation de bricolages, exceptions et contournements qui erodent progressivement la fiabilite des process internes. Dans une biotech ou medtech en scale-up, cette dette invisible ralentit le time-to-hire, fragilise la conformite reglementaire et complique l'onboarding d'un.e DRH ou COO sans apparaitre dans les indicateurs financiers classiques.",
        "La process debt fait perdre du temps à tous sans être toujours visible dans les chiffres.",
        "L’automatisation intelligente commence par réduire cette dette avant de la reproduire."
      ),
      concept(
        "Delegation maturity",
        "La delegation maturity designe le niveau de capacite d'une entreprise a distribuer les responsabilites operationnelles sans degrader la qualite d'execution. Dans une biotech ou medtech en scale-up, elle conditionne la vitesse de decision entre le/la CEO, le COMEX et les middle managers, et determine quand structurer, former ou automatiser pour absorber la croissance sans bruit organisationnel.",
        "La délégation mal préparée crée du bruit ; la délégation mûre crée de la vitesse.",
        "Mesurer la maturité de délégation aide à savoir quand structurer, former ou automatiser."
      )
    ]
  },
  {
    title: "Cash, funding & efficacité",
    description:
      "Les notions financières qui expliquent pourquoi la structuration RH devient vite un sujet de performance.",
    concepts: [
      concept(
        "Runway",
        "Le runway designe le nombre de mois pendant lesquels une biotech, medtech ou structure HealthTech peut continuer a operer avec sa tresorerie disponible, au rythme de burn actuel. Il conditionne la fenetre de recrutement d'un.e CSO, CMO ou VP Clinical, et la capacite a tenir jusqu'au prochain jalon clinique ou tour de table.",
        "Un runway sous tension réduit votre marge d’erreur sur les recrutements.",
        "Quand le cash est compté, structurer vos priorités RH devient indispensable."
      ),
      concept(
        "Burn rate",
        "Le burn rate designe la vitesse mensuelle a laquelle une biotech, medtech ou scale-up HealthTech consomme sa tresorerie nette avant rentabilite. Indicateur cle pour le/la CEO et le/la CFO, il conditionne le runway disponible, la fenetre de levee de fonds, et la marge de manoeuvre sur les recrutements cadres critiques en phase clinique ou pre-commerciale.",
        "Elle conditionne votre capacité à recruter sereinement ou à corriger une erreur.",
        "Le burn rate rappelle que le temps perdu en RH coûte aussi du cash."
      ),
      concept(
        "Tension de trésorerie",
        "La tension de tresorerie designe une situation ou les ressources financieres disponibles limitent les choix operationnels a court terme. En Life Sciences et HealthTech, elle touche 41% des biotechs francaises (Source : France Biotech x EY 2025), imposant au/a la CEO et CFO des process de recrutement plus lisibles, disciplines, et des arbitrages cash rigoureux.",
        "Avec 41% de tensions de trésorerie, les erreurs de recrutement deviennent encore plus coûteuses.",
        "La tension cash impose des process plus lisibles et des décisions plus disciplinées."
      ),
      concept(
        "Cycle de levée",
        "Le cycle de levée désigne la durée totale nécessaire pour préparer, mener et clôturer un tour de financement (Seed, Série A, B, C) dans une biotech, medtech ou HealthTech. Il couvre la structuration du deck, les roadshows investisseurs, la due diligence et le closing juridique, mobilisant le/la CEO et le/la CFO sur plusieurs mois consécutifs.",
        "Avec une durée moyenne de 10 mois, il faut tenir l’organisation avant, pendant et après la levée.",
        "Le recrutement et la structuration RH ne peuvent pas attendre la fin du cycle pour s’améliorer."
      ),
      concept(
        "Series A readiness",
        "La Series A readiness designe le niveau de preparation d'une biotech, medtech ou HealthTech a absorber un premier tour de croissance institutionnel (souvent 10 a 30 millions d'euros). Elle combine maturite clinique ou produit, traction commerciale, gouvernance, et surtout solidite de l'equipe dirigeante (CEO, CSO, CMO, CFO) capable de scaler sans casser la culture fondatrice.",
        "Elle dépend autant de la structure d’équipe que du produit ou du marché.",
        "La readiness Series A commence souvent par une meilleure discipline organisationnelle."
      ),
      concept(
        "Series B pressure",
        "La Series B pressure designe la tension de performance et d'execution qui pese sur une biotech, medtech ou healthtech apres une levee de Series B. Le board attend une acceleration commerciale, clinique ou industrielle rapide, et chaque recrutement cadre rate ou retarde pese directement sur le runway et la trajectoire vers la Series C.",
        "À ce stade, les recrutements ratés ou trop lents ont un impact encore plus visible.",
        "La structure RH doit alors servir la vitesse, pas l’encombrer."
      ),
      concept(
        "Capital efficiency",
        "Le capital efficiency designe la capacite d'une entreprise a convertir chaque euro leve en jalons tangibles (essais cliniques, AMM, revenus recurrents) avec un minimum de gaspillage. En Life Sciences et HealthTech, ou les cycles R&D sont longs et capitalistiques, ce ratio depend autant de la rigueur scientifique que de la structuration RH et operationnelle de l'organisation.",
        "Elle ne dépend pas seulement du produit, mais aussi de l’organisation.",
        "Des RH plus structurées améliorent directement l’efficacité du capital investi."
      ),
      concept(
        "ROI RH",
        "Le ROI RH designe le retour observable des investissements realises dans le recrutement, les outils et l'organisation RH. En Life Sciences et HealthTech, il rend visibles les gains souvent caches (time-to-hire, fiabilite des recrutements cadres, retention, qualite d'execution sur les jalons cliniques ou reglementaires) et traduit la fonction RH en langage dirigeant, finance et operations.",
        "Le ROI RH rend visibles des gains souvent cachés : temps, fiabilité, rétention, exécution.",
        "Mesurer ce ROI aide à parler RH avec un langage dirigeant et non administratif."
      ),
      concept(
        "Externalisation",
        "L'externalisation est le choix de confier a un partenaire externe certaines activites de recrutement ou d'execution RH (sourcing, pre-qualification, onboarding). En Life Sciences et HealthTech, elle soulage vite les equipes scaleup sous tension, mais ne remplace pas la structuration interne des processus, qui reste prerequis a une croissance saine du capital humain.",
        "Elle peut soulager vite, mais elle ne remplace pas la structuration interne.",
        "Vous externalisez souvent parce que vos processus internes ne sont pas encore optimisés."
      ),
      concept(
        "RPO",
        "Le RPO (Recruitment Process Outsourcing) designe l'externalisation structuree de tout ou partie du processus de recrutement vers un partenaire dedie. En Life Sciences et HealthTech, il devient pertinent quand le volume de postes ouverts (R&D, affaires reglementaires, commercial) ou la complexite des profils depasse les capacites internes du ou de la DRH, sans justifier un renfort permanent.",
        "Le RPO devient utile quand le volume ou la complexité dépassent vos capacités actuelles.",
        "Bien cadré, le RPO agit comme un levier de structuration et de gain de temps dirigeant."
      )
    ]
  },
  {
    title: "IA, data & spécialisation santé",
    description:
      "Les notions qui croisent transformation du marché, compétences critiques et besoin de structuration.",
    concepts: [
      concept(
        "HealthTech",
        "La HealthTech designe l'ensemble des entreprises qui developpent des solutions technologiques appliquees a la sante : dispositifs medicaux connectes, logiciels cliniques, diagnostic numerique, e-sante, intelligence artificielle medicale. Ecosysteme jeune et tres concurrentiel, il combine exigences reglementaires fortes et croissance rapide, ce qui tend fortement le marche des talents critiques (Source : Panorama France HealthTech 2026).",
        "Le marché est jeune, exigeant et concurrentiel, ce qui augmente la tension sur les talents critiques.",
        "Comprendre la HealthTech aide à positionner le recrutement comme levier de croissance et non simple support."
      ),
      concept(
        "Deeptech santé",
        "La deeptech santé désigne une société dont l'innovation repose sur une base scientifique ou technologique complexe (biologie computationnelle, IA médicale, nouveaux vecteurs thérapeutiques, dispositifs implantables) appliquée à la santé humaine ou animale. Les cycles de développement y dépassent souvent dix ans et mobilisent des profils rares, ce qui impose une structuration RH précoce et rigoureuse.",
        "Les cycles y sont plus longs et les profils plus rares.",
        "La deeptech santé exige une structuration RH plus exigeante car les erreurs coûtent longtemps."
      ),
      concept(
        "E-santé",
        "L'e-santé regroupe les solutions numériques appliquées aux usages, services et parcours de santé : telemedecine, dispositifs medicaux logiciels (SaMD), plateformes patients, IA diagnostique, objets connectes. Ce segment, a la croisee de la HealthTech et du soin, combine vitesse produit, contraintes reglementaires (MDR, RGPD, HDS) et penurie de profils hybrides medical, tech et acces marche.",
        "L’e-santé mélange vitesse produit, enjeux réglementaires et pénurie de profils hybrides.",
        "Recruter en e-santé demande de mieux articuler business, tech et organisation."
      ),
      concept(
        "Robotique santé",
        "La robotique santé designe l'ensemble des technologies robotiques appliquees aux usages medicaux, cliniques, chirurgicaux ou de soins, incluant assistance operatoire, reeducation, logistique hospitaliere et dispositifs autonomes. Le secteur mobilise des profils rares a l'intersection MedTech, mecatronique, IA embarquee et affaires reglementaires, ce qui rend la priorisation du recrutement et le sourcing cible particulierement strategiques pour un.e dirigeant.e.",
        "Les profils y sont à l’intersection de plusieurs marchés déjà pénuriques.",
        "La robotique santé renforce l’intérêt d’un recrutement ciblé et d’une priorisation stricte."
      ),
      concept(
        "IVD",
        "L'IVD (In Vitro Diagnostic) designe l'activite de diagnostic medical realisee hors du corps humain, via prelevements sanguins, tissulaires ou analyses biologiques. Le secteur, regule par l'IVDR europeen, mobilise des profils tres specifiques (affaires reglementaires, R&D assay, qualite, commercial hospitalier) sur un marche concurrentiel ou la rarete des competences impose de structurer finement les criteres d'evaluation.",
        "Les compétences y sont spécifiques et le marché concurrentiel.",
        "Structurer les critères d’évaluation est indispensable pour éviter de longues recherches floues."
      ),
      concept(
        "NGS",
        "Le NGS (Next-Generation Sequencing) designe l'ensemble des technologies de sequencage a haut debit qui lisent en parallele des millions de fragments d'ADN ou d'ARN. Pilier des biotechs, du diagnostic moleculaire et de la genomique animale, il structure les pipelines de R&D, les essais cliniques et les plateformes de medecine de precision en Life Sciences.",
        "Le niveau de spécialisation renforce la nécessité d’un sourcing précis.",
        "Dans un marché de niche, le pipeline candidat doit être piloté avec davantage de rigueur."
      ),
      concept(
        "Affaires médicales",
        "Les Affaires médicales designent la fonction qui relie donnees cliniques, usage terrain, contenu scientifique et alignement strategique d'un laboratoire ou biotech. Elles articulent MSL, medical advisors et direction medicale autour du cycle de vie produit. En Life Sciences et HealthTech, le/la directeur.trice medical.e arbitre publications, evidence generation et dialogue KOL, devenant un pivot competitif rare.",
        "Elle fait partie des compétences critiques les plus sensibles.",
        "Les rôles d’affaires médicales montrent pourquoi le recrutement devient un avantage compétitif."
      ),
      concept(
        "Marketing digital santé",
        "Le marketing digital santé designe l'ensemble des competences marketing appliquees a des environnements Life Sciences, MedTech et HealthTech, structurellement plus reglementes (HAS, EMA, FDA, codes de deontologie) et plus techniques que le BtoC classique. Il couvre acquisition, contenu medical, SEO scientifique, marketing automation et pilotage omnicanal aupres de professionnels de sante, payeurs et patients.",
        "La tension sur ces profils augmente avec l’internationalisation du marché.",
        "Bien cadrer ces postes évite des recrutements hybrides trop flous et donc trop lents."
      ),
      concept(
        "IA de tri",
        "L'IA de tri designe l'usage de l'intelligence artificielle pour lire, organiser et hierarchiser des candidatures sur un poste cadre Life Sciences ou HealthTech. Elle accelere le screening initial (CV, lettres, profils LinkedIn) mais ne remplace ni la qualification metier, ni l'evaluation culturelle, ni la decision finale d'un.e recruteur.se ou DRH.",
        "2/3 des entreprises utilisent déjà l’IA, mais peu l’exploitent réellement pour gagner du temps.",
        "L’IA apporte de la valeur quand elle s’insère dans un process clair et supervisé."
      ),
      concept(
        "Human in the loop",
        "Le Human in the loop designe un principe d'architecture ou un.e operateur.rice humain.e valide les moments critiques d'un process automatise (scoring de candidat.e, shortlist, decision d'embauche). En recrutement Life Sciences et Animal Health, il garantit que l'IA accelere le tri et la structuration, mais que le jugement final reste porte par le/la recruteur.se ou le/la DRH.",
        "Indispensable pour ne pas déshumaniser la décision et limiter les erreurs.",
        "Le meilleur système RH automatise l’exécution répétitive et garde l’humain sur le jugement."
      )
    ]
  },
  {
    title: "International, marché & conformité",
    description:
      "Les notions qui reflètent la concurrence mondiale et les contraintes de déploiement.",
    concepts: [
      concept(
        "International hiring",
        "L'international hiring designe la capacite d'un.e employeur a sourcer, attirer et integrer des talents au-dela du marche local, sur plusieurs pays ou bassins de competences. En Life Sciences et HealthTech, ou les profils rares (CMC, affaires reglementaires, biostatistique) se concentrent dans quelques hubs europeens et nord-americains, cette ouverture geographique conditionne directement la vitesse de scale-up.",
        "Avec 75% d’entreprises qui ciblent l’international, la compétition dépasse largement la ville ou le pays.",
        "Vous ne recrutez pas seulement contre vos concurrents locaux, mais contre le monde entier."
      ),
      concept(
        "Geo expansion",
        "La geo expansion designe le deploiement d'une activite sur de nouveaux marches ou territoires, frequent en Life Sciences et HealthTech lors d'un passage Europe, US ou APAC. Chaque ouverture cree des besoins en roles cles (Country Manager, Medical Affairs, QA/RA locale), en coordination siege-filiale et en conformite reglementaire propre a chaque juridiction.",
        "Chaque expansion crée de nouveaux besoins en rôles, coordination et conformité.",
        "Une structure RH légère mais claire aide à absorber cette complexité sans alourdir l’organisation."
      ),
      concept(
        "Employer competitiveness",
        "L'employer competitiveness designe la capacite d'une entreprise a rester attractive face a d'autres employeurs plus visibles ou mieux dotes. En Life Sciences et HealthTech, ou les biotechs et scale-ups rivalisent avec big pharma et MedTech etablis, elle repose autant sur la clarte du projet scientifique, la vitesse de decision et la structuration RH que sur le package salarial.",
        "La concurrence ne se joue plus uniquement sur le salaire.",
        "Clarté du projet, vitesse de décision et structuration font partie de la compétitivité employeur."
      ),
      concept(
        "Talent mobility",
        "La talent mobility designe la capacite des profils cadres et experts a changer de pays, de secteur ou de projet pour saisir de meilleures opportunites. En Life Sciences, HealthTech et Animal Health, elle intensifie la concurrence sur les fonctions rares (R&D, affaires reglementaires, bioproduction) et accelere les cycles de recrutement entre scale-ups europeennes et groupes etablis.",
        "Elle accroît la pression sur les marchés spécialisés.",
        "Une entreprise mieux structurée réagit plus vite à ces mouvements et sécurise ses recrutements."
      ),
      concept(
        "Compliance RH",
        "La Compliance RH designe le respect des regles sociales, contractuelles et operationnelles encadrant la gestion des talents : droit du travail, conventions collectives, RGPD, mobilite internationale, equite salariale. En Life Sciences et HealthTech, elle couvre aussi les clauses de propriete intellectuelle, de non-concurrence et les obligations specifiques aux postes reglementes (Pharmacien.ne responsable, QA, affaires reglementaires).",
        "La conformité mal traitée ralentit vite les recrutements et l’internationalisation.",
        "Un process structuré réduit le risque de blocages tardifs sur des sujets évitables."
      ),
      concept(
        "Data privacy recrutement",
        "La data privacy recrutement designe la gestion conforme et securisee des donnees candidat (CV, evaluations, scoring IA) tout au long du process. En Life Sciences et HealthTech, secteurs sensibles aux audits investisseurs et partenaires pharma, elle impose RGPD, minimisation, base legale claire et tracabilite des outils ATS, sourcing et automatisations RH des leur design.",
        "La confiance et la conformité deviennent vite critiques avec plus d’outils et d’automatisation.",
        "Une automatisation RH sérieuse doit intégrer la protection des données dès le design."
      ),
      concept(
        "Cross-border offer",
        "Le cross-border offer designe une proposition de role formulee a un.e candidat.e dans un contexte multi-pays ou multi-entites, frequente en Life Sciences ou HealthTech quand un siege europeen recrute pour une filiale. Elle implique d'aligner package, droit du travail local, mobilite et rattachement hierarchique avant emission, sous peine d'allonger le cycle et de provoquer des renoncements tardifs.",
        "Ce type d’offre demande plus de préparation et d’alignement interne.",
        "Mieux cadrer ces offres évite des cycles plus longs et des renoncements tardifs."
      ),
      concept(
        "English-first process",
        "Le English-first process designe un process de recrutement, de gouvernance ou de coordination pense d'emblee en anglais, pour des parties prenantes internationales. En Life Sciences et HealthTech, ou investisseurs US, board members europeens et candidats cadres operent en anglais, structurer ce reflexe en amont evite de refondre le systeme RH au moment ou la scaleup s'internationalise.",
        "Utile dès que le marché, les candidats ou les investisseurs dépassent le cadre francophone.",
        "Structurer un process english-first évite de réinventer le système au moment où l’entreprise s’internationalise."
      ),
      concept(
        "Market benchmarking",
        "Le market benchmarking designe la comparaison reguliere des pratiques RH d'une entreprise (delais de recrutement, packages, structures d'equipe, organigrammes) avec les references du marche Life Sciences, HealthTech ou Animal Health. Il permet a un.e CEO ou DRH d'ajuster ses decisions sur des reperes sectoriels verifiables, plutot que sur l'intuition ou les retours informels du reseau.",
        "Le benchmark évite de piloter uniquement à l’intuition.",
        "Un bon benchmark rend les décisions RH plus rapides, plus réalistes et plus crédibles."
      ),
      concept(
        "Concurrence mondiale des talents",
        "La concurrence mondiale des talents designe la pression exercee par des entreprises internationales (biotech US, pharma europeenne, scale-ups HealthTech asiatiques) sur un meme vivier restreint de profils cadres et scientifiques. En Life Sciences et Animal Health, elle touche surtout les fonctions R&D, affaires reglementaires, medical et data, ou le/la candidat.e compare offres, remuneration et projet a l'echelle continentale.",
        "Elle explique pourquoi certains postes ne peuvent plus être traités comme des recrutements locaux classiques.",
        "La réponse la plus robuste reste une structure claire, un message lisible et un process rapide."
      )
    ]
  },
  {
    title: "Rétention, culture & exécution",
    description:
      "Les notions qui font tenir la performance après la signature du contrat.",
    concepts: [
      concept(
        "Expérience collaborateur",
        "L'expérience collaborateur désigne la perception vécue par un.e salarié.e de son parcours dans l'entreprise, depuis l'onboarding jusqu'aux interactions quotidiennes avec son équipe, son manager et les processus internes. Dans les biotech, medtech et HealthTech en forte croissance, elle conditionne directement la rétention des profils scientifiques rares et la capacité à scaler sans turnover destructeur.",
        "Elle influence fortement la rétention, surtout dans les contextes de pénurie.",
        "La structuration RH améliore cette expérience en rendant l’organisation plus lisible et moins chaotique."
      ),
      concept(
        "Manager enablement",
        "Le manager enablement designe l'ensemble des outils, formations et rituels qui equipent un.e manager pour recruter, integrer, piloter et faire grandir son equipe. En Life Sciences et HealthTech, ou la croissance impose des promotions rapides de scientifiques vers des roles d'encadrement, il conditionne la qualite d'execution collective et reduit les erreurs de casting.",
        "Des managers mal équipés deviennent un frein silencieux à la croissance.",
        "Le manager enablement réduit les erreurs de recrutement et améliore l’exécution collective."
      ),
      concept(
        "Feedback loop",
        "Le feedback loop designe une boucle de retour d'information reguliere entre equipes, managers et direction, permettant de detecter tot les frictions RH ou operationnelles. Dans une biotech ou medtech en scale-up, ou la pression sur le time-to-market est forte, ces boucles courtes evitent que des problemes d'organisation ne restent invisibles plusieurs trimestres.",
        "Sans feedback, les problèmes d’organisation restent longtemps invisibles.",
        "Créer des feedback loops simples aide à corriger plus tôt les frictions RH ou opérationnelles."
      ),
      concept(
        "Talent density",
        "La talent density designe la concentration de profils a fort impact dans une equipe donnee, rapportee a l'effectif total. En biotech, medtech ou Animal Health, ou chaque recrutement cadre pese sur la vitesse de developpement clinique ou reglementaire, elle conditionne la qualite des decisions strategiques et la capacite du COO ou de la DRH a tenir les jalons de financement.",
        "Une forte densité de talent soutient la vitesse d’exécution et la qualité des décisions.",
        "Le recrutement de profils rares doit être pensé comme levier stratégique, pas simple remplissage."
      ),
      concept(
        "Mobilité interne",
        "La mobilité interne désigne la capacité d'une organisation à faire évoluer un.e collaborateur.rice vers un autre périmètre, métier ou niveau de responsabilité sans recrutement externe. En Life Sciences et HealthTech, où les profils réglementaires, cliniques ou industriels sont rares, elle sécurise la rétention, accélère le time-to-fill et capitalise sur la connaissance scientifique déjà acquise en interne.",
        "Elle réduit certains besoins de recrutement externe et améliore la rétention.",
        "Structurer la mobilité interne augmente la performance sans nécessairement augmenter les coûts RH."
      ),
      concept(
        "Learning path",
        "Le learning path designe le parcours structure de montee en competences prevu pour un.e collaborateur.trice ou un role donne, jalonne d'etapes, de ressources et de validations. En Life Sciences et HealthTech, il securise la maitrise des protocoles qualite, reglementaires et scientifiques, et reduit la dependance a l'apprentissage informel qui ralentit l'autonomie des nouveaux entrants.",
        "Sans learning path, les équipes dépendent trop de l’apprentissage informel.",
        "Documenter la progression limite la perte de temps et accélère l’autonomie."
      ),
      concept(
        "Succession planning",
        "Le succession planning designe l'identification et la preparation anticipee des relais internes sur les roles critiques (CEO, CSO, VP Clinical, Head of Quality) en cas de depart, de levee de fonds ou de scale-up. En Life Sciences et Animal Health, il securise la continuite reglementaire, projets cliniques et relations investisseurs, evitant qu'un.e dirigeant.e unique concentre le risque organisationnel.",
        "Elle sécurise l’organisation au lieu de la laisser dépendre d’un seul individu.",
        "Le succession planning est un outil de résilience et de performance à long terme."
      ),
      concept(
        "Clarté culturelle",
        "La clarté culturelle désigne le niveau de compréhension partagée, au sein d'une entreprise Life Sciences ou HealthTech, des comportements, valeurs et arbitrages réellement valorisés au quotidien. Dans une biotech ou medtech en scale-up, elle conditionne la qualité du matching à l'embauche, la rétention des cadres et la cohésion entre équipes R&D, clinique et commerciales.",
        "Une culture floue complexifie autant le recrutement que la rétention.",
        "Clarifier la culture améliore la qualité du matching et réduit les erreurs d’intégration."
      ),
      concept(
        "Team operating model",
        "Le team operating model designe le mode de fonctionnement concret d'une equipe : rituels, responsabilites, circuits de decision, coordination et priorites. Dans une biotech ou medtech en scale-up, ou le/la CEO arbitre R&D, clinique et commercial en parallele, formaliser ce modele reduit les frictions internes et limite le besoin de supervision dirigeante au quotidien.",
        "Sans modèle explicite, les tensions viennent vite du fonctionnement et non des personnes.",
        "Mieux définir ce modèle réduit le besoin de supervision dirigeant."
      ),
      concept(
        "Performance review",
        "La performance review designe un moment structure d'evaluation et d'alignement entre un.e manager et son collaborateur sur la contribution, les attentes et la progression. En Life Sciences et HealthTech, ou les cycles produit sont longs et les talents rares, elle securise la retention, clarifie les trajectoires et connecte structuration RH, developpement individuel et execution durable.",
        "Une revue claire améliore la rétention et la qualité de management.",
        "La performance review connecte structuration RH, développement et exécution durable."
      )
    ]
  },
  {
    title: "Organisation avancée & productivité",
    description:
      "Les notions finales à maîtriser pour transformer la croissance en système reproductible.",
    concepts: [
      concept(
        "Temps dirigeant",
        "Le temps dirigeant designe les heures que le/la CEO, COO ou DRH consacre a des sujets RH, de coordination ou d'arbitrage qui pourraient etre mieux structures. En biotech, medtech ou Animal Health, ce temps capte sur la strategie scientifique ou commerciale represente un cout cache souvent superieur au cout salarial des recrutements differes.",
        "Le vrai coût RH n’est pas seulement l’argent : c’est souvent le temps dirigeant perdu.",
        "Mesurer ce temps aide à justifier un diagnostic, une structuration RH ou une automatisation."
      ),
      concept(
        "Priorisation des rôles clés",
        "La priorisation des rôles clés désigne la capacité à distinguer, dans une organisation Life Sciences ou HealthTech, les postes réellement critiques pour la trajectoire (CSO, VP Clinical, Head of Quality) des postes simplement utiles. Elle évite d'ouvrir trop de chantiers en parallèle, protège le cash de la scaleup et concentre l'énergie du CODIR sur les recrutements à fort levier.",
        "Elle évite d’ouvrir trop de chantiers en même temps.",
        "Une bonne priorisation protège le cash et améliore la performance organisationnelle."
      ),
      concept(
        "Charge administrative",
        "La charge administrative designe la part d'energie d'une equipe absorbee par des taches repetitives, peu structurees ou a faible valeur ajoutee (reporting, saisie, relances, mise en forme de dossiers). Dans une biotech ou medtech en scale-up, elle pese surtout sur le/la DRH, le/la CFO et les fonctions support, et grignote le temps de decision strategique.",
        "Quand elle est trop élevée, la qualité de décision baisse.",
        "Automatiser ou simplifier cette charge est un levier direct de productivité."
      ),
      concept(
        "Standard operating procedure",
        "Le Standard Operating Procedure (SOP) designe une instruction ou sequence formalisee qui rend une operation reproductible, independamment de la personne qui l'execute. En Life Sciences, Animal Health et HealthTech, les SOP encadrent production, qualite, pharmacovigilance et essais cliniques, garantissent la conformite reglementaire (GMP, GLP, ISO) et permettent a un.e dirigeant.e de scaler sans dependre de la memoire individuelle.",
        "Les SOP évitent que tout repose sur la mémoire ou l’habitude.",
        "Documenter les opérations critiques aide à scaler sans recruter massivement."
      ),
      concept(
        "Single source of truth",
        "Le single source of truth designe le referentiel unique et fiable d'une information donnee (candidats, roles cadres, indicateurs RH, documents reglementaires). En Life Sciences et HealthTech, ou les donnees circulent entre ATS, CRM, dossiers cliniques et reporting investisseurs, il evite que le/la DRH, le/la COO et le/la CFO travaillent sur des chiffres divergents.",
        "Sans source de vérité, les équipes perdent du temps à vérifier et recroiser.",
        "Créer une single source of truth est l’un des gains les plus rapides de l’automatisation bien cadrée."
      ),
      concept(
        "Hand-off",
        "Le hand-off designe le moment ou un sujet, un dossier ou un.e candidat.e passe d'une personne ou d'une etape a une autre dans un process RH ou operationnel. En Life Sciences et HealthTech, ou les cycles de recrutement cadre impliquent souvent CEO, DRH, hiring manager et board, un hand-off mal prepare genere retards, perte d'information et friction sur la decision finale.",
        "Les hand-offs mal préparés créent retards, erreurs et perte d’information.",
        "Structurer les hand-offs fluidifie le process et réduit la surcharge coordination."
      ),
      concept(
        "Bottleneck",
        "Le bottleneck designe le point de blocage qui ralentit l'ensemble d'un systeme et plafonne la vitesse d'execution. En contexte RH biotech ou medtech, il prend souvent la forme d'un manque de clarte sur la fiche de poste, d'une capacite de sourcing insuffisante ou d'une decision finale qui stagne chez le/la CEO ou la DRH.",
        "En RH, le bottleneck est souvent un manque de clarté, de capacité ou de décision.",
        "Identifier le vrai bottleneck évite d’automatiser au mauvais endroit."
      ),
      concept(
        "Throughput recrutement",
        "Le throughput recrutement designe le volume de recrutements qu'une organisation peut reellement absorber avec qualite sur une periode donnee, en tenant compte de la bande passante des managers, de l'onboarding et du time-to-productivity. En Life Sciences et HealthTech, ou chaque profil senior R&D ou affaires reglementaires mobilise plusieurs semaines d'integration, il borne la vitesse de scale-up soutenable.",
        "Le throughput protège contre les ambitions irréalistes ou les ouvertures de postes mal séquencées.",
        "Mieux connaître votre throughput vous aide à scaler sans casser vos équipes."
      ),
      concept(
        "Design organisationnel",
        "Le design organisationnel designe l'architecture des roles, des niveaux de decision et des interfaces entre equipes au sein de l'entreprise. Dans une biotech ou une HealthTech en croissance, il conditionne la vitesse d'execution scientifique et commerciale. Un.e CEO ou DRH le revisite quand le scaling cree des doublons, des angles morts ou ralentit les arbitrages cles.",
        "Un mauvais design organisationnel rend les meilleurs talents moins efficaces.",
        "Le design organisationnel est un chantier central quand la croissance crée des doublons ou des angles morts."
      ),
      concept(
        "Levier stratégique RH",
        "Le levier stratégique RH désigne la bascule par laquelle la fonction Ressources Humaines cesse d'être un support administratif pour devenir un moteur direct de performance, de vitesse d'exécution et de croissance. En Life Sciences, HealthTech et Animal Health, cette posture conditionne la capacité d'un.e CEO ou DRH à sécuriser les expertises rares dans un marché sous tension.",
        "Dans un marché pénurique et sous pression, cette bascule devient décisive.",
        "Le recrutement n’est plus une fonction support : c’est un levier stratégique."
      )
    ]
  }
];

export const glossaryConcepts = glossaryGroups.flatMap((group) => group.concepts);
