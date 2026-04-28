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
    "Hub SEO et LLM pour structuration RH, recrutement Life Sciences, automatisation RH, scale-up et performance organisationnelle : checklist, erreurs, diagnostic, FAQ et 3 guides à télécharger.",
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
    { label: "0–2", verdict: "Chaos", copy: "Vous avancez surtout en réaction et en urgence." },
    { label: "3–4", verdict: "Fragile", copy: "Une partie de la mécanique tient, mais elle cassera en phase de scale." },
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
    "If you hesitate, you are likely under-structured.",
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
        "Ensemble des méthodes utilisées pour attirer, qualifier et intégrer des talents dans les environnements biotech, diagnostic, healthtech ou animal health.",
        "Le marché est spécialisé, pénurique et rapide ; un process générique y perd beaucoup de temps.",
        "Structurer le recrutement Life Sciences permet de réduire la friction dirigeant et d’augmenter la qualité de décision."
      ),
      concept(
        "Approche directe",
        "Méthode de chasse qui consiste à contacter des profils ciblés, souvent déjà en poste et peu visibles sur le marché.",
        "Quand les meilleurs profils ne postulent pas, l’approche directe devient une capacité d’exécution, pas un luxe.",
        "Une structuration RH solide sait quand sortir du recrutement entrant pour aller chercher les talents critiques."
      ),
      concept(
        "Talent mapping",
        "Cartographie des entreprises, fonctions, profils et mouvements de marché avant l’ouverture ou pendant la conduite d’un poste.",
        "Elle évite de recruter à l’aveugle et raccourcit la phase de ciblage.",
        "Le talent mapping améliore la performance du recrutement et nourrit ensuite vos scénarios d’automatisation du sourcing."
      ),
      concept(
        "Job intake",
        "Session de cadrage initial entre dirigeant, hiring manager et RH pour définir le besoin, les critères et les signaux d’exclusion.",
        "Sans intake robuste, la fiche de poste reste floue et le process s’allonge.",
        "Un bon job intake réduit les allers-retours et protège le temps du CEO dès le départ."
      ),
      concept(
        "Scorecard candidat",
        "Grille d’évaluation commune qui permet de juger les candidats sur des critères décidés avant les entretiens.",
        "Elle limite les biais, améliore la qualité des débriefs et accélère la décision.",
        "La scorecard est un point de rencontre entre structuration RH, performance et automatisation utile."
      ),
      concept(
        "Pipeline candidat",
        "Vue structurée des candidats par étape, du sourcing jusqu’à l’offre.",
        "Sans pipeline, le recrutement devient une suite d’actions dispersées et non pilotées.",
        "Un pipeline clair rend le recrutement mesurable et facilite ensuite le reporting dirigeant."
      ),
      concept(
        "Time-to-hire",
        "Durée nécessaire entre l’ouverture d’un poste et l’acceptation d’une offre par un candidat.",
        "C’est un indicateur simple du niveau de friction de votre processus.",
        "Quand le time-to-hire explose, le problème vient souvent de la structure et des validations, pas seulement du marché."
      ),
      concept(
        "Sourcing passif",
        "Recherche ciblée de profils qui ne sont pas activement en recherche, mais ouverts à une proposition crédible.",
        "Dans les marchés de niche, le sourcing passif est souvent la vraie source de talents stratégiques.",
        "Plus votre organisation est claire, plus votre message devient convaincant auprès de talents rares."
      ),
      concept(
        "Entretien structuré",
        "Format d’entretien où les questions, les critères et l’ordre de passage sont définis à l’avance.",
        "Il améliore la comparabilité des profils et réduit le poids de l’impression subjective.",
        "L’entretien structuré transforme le recrutement en système de décision, pas en intuition isolée."
      ),
      concept(
        "EVP",
        "Employer Value Proposition : la promesse employeur perçue par le candidat sur le rôle, la mission et l’environnement.",
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
        "Organisation des rôles, des décisions, des process et des outils RH de manière lisible et scalable.",
        "Sans structuration RH, ce qui fonctionne à 10 casse vite à 30.",
        "La structuration RH protège le temps dirigeant et rend l’automatisation réellement utile."
      ),
      concept(
        "Fiche de poste",
        "Document qui clarifie finalité du rôle, responsabilités, périmètre, critères de réussite et interfaces clés.",
        "Une fiche floue crée des attentes contradictoires et ralentit le recrutement.",
        "Mieux cadrer un poste améliore la qualité d’exécution avant même le premier entretien."
      ),
      concept(
        "Référentiel de compétences",
        "Cadre partagé qui décrit les compétences attendues par fonction, niveau et contexte.",
        "Il aide à recruter, onboarder et faire progresser avec une logique cohérente.",
        "Un référentiel évite de refaire à chaque fois les mêmes arbitrages et soutient la performance d’équipe."
      ),
      concept(
        "Headcount planning",
        "Planification des recrutements par rôle, timing, priorité et contrainte business.",
        "Elle limite les ouvertures de postes opportunistes et les urgences coûteuses.",
        "Le headcount planning relie la croissance, le cash et l’organisation réelle."
      ),
      concept(
        "Workforce planning",
        "Vision plus large qui aligne besoins d’effectifs, compétences critiques et trajectoire de croissance.",
        "Elle évite de recruter trop tard, trop tôt ou sur les mauvais périmètres.",
        "Le workforce planning transforme le recrutement en levier de performance organisationnelle."
      ),
      concept(
        "RACI",
        "Matrice qui clarifie qui décide, qui contribue, qui valide et qui est informé.",
        "Elle évite que le CEO ou le COO restent bloqués sur des sujets qui devraient déjà être distribués.",
        "Un RACI simple diminue les frictions de coordination et accélère les cycles de décision."
      ),
      concept(
        "Onboarding",
        "Process d’intégration qui rend le nouveau collaborateur rapidement opérationnel et aligné.",
        "Sans onboarding structuré, le coût d’un bon recrutement continue après la signature.",
        "L’onboarding est un chantier de structuration RH à fort impact sur la performance."
      ),
      concept(
        "Offboarding",
        "Process de sortie d’un collaborateur, incluant transfert d’informations, conformité et continuité.",
        "Un offboarding mal géré fragilise l’organisation et alimente les erreurs récurrentes.",
        "Une structure mature traite l’entrée et la sortie avec le même niveau de rigueur."
      ),
      concept(
        "Matrice de décision",
        "Cadre qui définit les critères et le niveau d’urgence des décisions à prendre.",
        "Elle évite les arbitrages émotionnels ou improvisés sur les postes critiques.",
        "La matrice de décision réduit la dépendance au CEO et améliore la vitesse d’exécution."
      ),
      concept(
        "Operating model RH",
        "Façon dont les responsabilités RH sont réparties entre direction, managers, RH et outils.",
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
        "Automatisation des tâches répétitives liées au recrutement, au suivi et à l’administration RH.",
        "Elle libère du temps, mais seulement si les étapes automatisées sont déjà claires.",
        "Automatiser sans structurer ne sert à rien ; automatiser un bon process augmente la performance."
      ),
      concept(
        "Automatisation recrutement",
        "Mise en place de séquences ou de règles qui accélèrent sourcing, tri, relances et coordination d’entretiens.",
        "Elle réduit la charge manuelle quand le volume ou la complexité augmentent.",
        "Une automatisation bien pensée raccourcit le time-to-hire sans appauvrir l’expérience candidat."
      ),
      concept(
        "Workflow RH",
        "Suite d’étapes définies et déclenchées automatiquement ou semi-automatiquement pour faire avancer un processus RH.",
        "Le workflow rend les opérations répétables et auditables.",
        "C’est la base pour relier outils, structuration RH et gain de temps dirigeant."
      ),
      concept(
        "No-code",
        "Approche qui permet de créer des automatisations ou des interfaces sans développement complexe.",
        "Très utile pour tester et déployer vite des gains opérationnels.",
        "Le no-code devient un accélérateur quand les responsabilités et les données à manipuler sont déjà claires."
      ),
      concept(
        "ATS",
        "Applicant Tracking System : outil de pilotage du recrutement, des candidatures et des étapes du pipeline.",
        "Il centralise l’information au lieu de la laisser dispersée entre mails, tableurs et messages.",
        "Un ATS améliore la performance seulement s’il sert un process décidé, pas un désordre numérisé."
      ),
      concept(
        "CRM candidats",
        "Base structurée pour conserver, segmenter et réactiver des profils déjà identifiés.",
        "Il évite de repartir de zéro à chaque poste ouvert.",
        "Le CRM candidats réduit le coût du recrutement et soutient la logique de pipeline long terme."
      ),
      concept(
        "Parsing CV",
        "Lecture automatique et extraction de données contenues dans un CV.",
        "Le parsing fait gagner du temps sur le tri initial, surtout en volume.",
        "Ce type d’automatisation n’a de valeur que si les critères de tri ont été définis en amont."
      ),
      concept(
        "Relance automatisée",
        "Envoi programmé de messages ou de rappels à des candidats, managers ou recruteurs.",
        "Elle réduit la friction opérationnelle et améliore le suivi.",
        "Une simple relance automatisée peut déjà rendre un process plus fluide sans alourdir l’organisation."
      ),
      concept(
        "SIRH",
        "Système d’information RH qui centralise données, processus et documents liés aux collaborateurs.",
        "Le SIRH évite la fragmentation des données RH entre plusieurs sources peu fiables.",
        "Bien utilisé, il soutient la performance organisationnelle et simplifie le pilotage."
      ),
      concept(
        "Dashboard RH",
        "Interface de suivi des indicateurs clés de recrutement, de rétention et d’efficacité opérationnelle.",
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
        "Situation où trop de décisions critiques restent bloquées ou arbitrées par le CEO.",
        "Elle ralentit la croissance et augmente la fatigue dirigeant.",
        "Réduire la dépendance au CEO est une étape centrale de la structuration RH."
      ),
      concept(
        "COO alignment",
        "Alignement entre opérations, recrutement et priorités de croissance.",
        "Sans cet alignement, les recrutements ne servent pas toujours les goulots réels de l’entreprise.",
        "Un bon alignement COO améliore la qualité des arbitrages et de la mise en œuvre."
      ),
      concept(
        "CPO / DRH",
        "Fonction chargée d’aligner organisation, recrutement, management et développement des équipes.",
        "Elle devient critique dès que l’entreprise doit structurer plutôt qu’improviser.",
        "Le bon rôle RH agit comme accélérateur de croissance, pas comme centre administratif."
      ),
      concept(
        "Hiring manager",
        "Manager directement impliqué dans le recrutement d’un poste pour son équipe.",
        "S’il n’est pas cadré, il peut ralentir ou désaligner tout le process.",
        "Former les hiring managers est un levier direct de performance recrutement."
      ),
      concept(
        "Cadence de décision",
        "Rythme auquel les décisions de recrutement ou d’organisation sont prises et clôturées.",
        "Une cadence faible allonge tout, même lorsque le marché répond bien.",
        "Structurer la cadence réduit les coûts cachés de l’attente et protège le temps dirigeant."
      ),
      concept(
        "Ownership",
        "Responsabilité explicite sur un périmètre, une décision ou un résultat.",
        "L’absence d’ownership crée des trous de coordination et des doublons.",
        "Nommer un owner clair est souvent plus puissant qu’ajouter un outil supplémentaire."
      ),
      concept(
        "Span of control",
        "Nombre de personnes ou de sujets qu’un manager peut piloter efficacement.",
        "Un span trop large fragilise le management, surtout en phase de croissance rapide.",
        "Adapter le span de control améliore la rétention et la qualité d’exécution."
      ),
      concept(
        "Management layer",
        "Niveau intermédiaire de management qui relie la stratégie à l’exécution.",
        "Le créer trop tard ou trop tôt peut coûter cher.",
        "La bonne couche managériale soutient la structuration RH sans créer d’usine à gaz."
      ),
      concept(
        "Operating rhythm",
        "Ensemble des rituels et séquences qui font avancer l’organisation de manière prévisible.",
        "Un rythme clair diminue le bruit et les arbitrages de dernière minute.",
        "L’operating rhythm fait gagner du temps aux dirigeants tout en renforçant la qualité de coordination."
      ),
      concept(
        "Change management",
        "Méthode pour faire accepter et tenir une évolution d’outils, d’organisation ou de process.",
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
        "Capacité d’une entreprise à transformer sa stratégie en exécution fluide, lisible et reproductible.",
        "Elle dépend autant des process et des rôles que des personnes recrutées.",
        "Recrutement, structuration RH et automatisation sont trois leviers concrets de performance organisationnelle."
      ),
      concept(
        "Quality of hire",
        "Mesure de la qualité d’un recrutement à travers intégration, performance et tenue dans le temps.",
        "Recruter vite ne suffit pas si la qualité chute ensuite.",
        "Une bonne structuration RH permet d’améliorer la quality of hire sans allonger inutilement les délais."
      ),
      concept(
        "Offer acceptance rate",
        "Taux d’acceptation des offres émises par l’entreprise.",
        "Il révèle la qualité de votre proposition, de votre process et de votre timing.",
        "Un taux faible peut signaler un problème d’alignement plus qu’un problème de marché."
      ),
      concept(
        "Rétention 12 mois",
        "Part des recrutements encore présents un an après leur arrivée.",
        "Elle révèle si le recrutement, l’onboarding et le management tiennent ensemble.",
        "La rétention est un indicateur business, pas seulement RH."
      ),
      concept(
        "Time to productivity",
        "Temps nécessaire pour qu’un nouveau collaborateur devienne réellement opérationnel.",
        "Ce délai impacte directement l’exécution et le ROI d’un recrutement.",
        "Structurer l’onboarding et clarifier les attentes réduit ce délai plus sûrement qu’une simple intensification du suivi."
      ),
      concept(
        "Source effectiveness",
        "Capacité d’une source de candidats à produire des profils qualifiés et convertis.",
        "Toutes les sources ne se valent pas selon le poste, le marché et le niveau d’urgence.",
        "Suivre l’efficacité des sources permet de concentrer l’effort là où il produit vraiment."
      ),
      concept(
        "Funnel conversion",
        "Taux de passage des candidats d’une étape à la suivante dans le pipeline.",
        "Le funnel montre où le process se bloque réellement.",
        "Un funnel lisible guide les priorités d’automatisation et de simplification."
      ),
      concept(
        "SLA recrutement",
        "Engagement de délai ou de niveau de service entre RH, managers et direction.",
        "Sans SLA, chacun projette son propre rythme et les retards deviennent invisibles.",
        "Le SLA aide à professionnaliser la relation entre structuration RH et business."
      ),
      concept(
        "Forecast recrutement",
        "Projection des besoins, délais et charges de recrutement à horizon donné.",
        "Elle réduit l’effet de surprise et le pilotage à court terme.",
        "Le forecast permet de relier le recrutement à la réalité opérationnelle et financière."
      ),
      concept(
        "Vacancy cost",
        "Coût lié à un poste critique resté vacant trop longtemps.",
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
        "Entreprise qui ne cherche plus seulement à valider son marché mais à absorber de la croissance.",
        "À ce stade, les intuitions initiales ne suffisent plus à faire tenir l’organisation.",
        "La scale-up réussie structure ses RH juste assez tôt pour ne pas ralentir sa croissance."
      ),
      concept(
        "Hypercroissance",
        "Phase de croissance rapide où les besoins de recrutement, de coordination et de priorisation s’intensifient fortement.",
        "L’hypercroissance amplifie tous les défauts de structure déjà présents.",
        "Automatiser et clarifier les rôles devient alors un sujet de survie opérationnelle."
      ),
      concept(
        "10-to-30 gap",
        "Moment où une organisation fonctionne encore par proximité, mais commence à perdre en lisibilité.",
        "C’est souvent là que les premiers coûts cachés RH apparaissent.",
        "Ce qui marche à 10 casse à 30 : le 10-to-30 gap doit être anticipé, pas subi."
      ),
      concept(
        "30-to-50 transition",
        "Passage à une taille où les rituels, les décisions et les process doivent être plus explicites.",
        "À ce stade, la dépendance au CEO devient souvent trop coûteuse.",
        "La transition 30-to-50 demande moins d’héroïsme et plus de système."
      ),
      concept(
        "Founders trap",
        "Situation où les fondateurs continuent à absorber trop de décisions au lieu de structurer la délégation.",
        "Elle peut freiner la vitesse de croissance plus que le marché lui-même.",
        "Sortir du founders trap demande une meilleure structuration RH et opérationnelle."
      ),
      concept(
        "Hiring burst",
        "Période de recrutements accélérés sur plusieurs rôles en même temps.",
        "Sans pipeline ni priorisation, elle consomme énormément de bande passante.",
        "Préparer un hiring burst oblige à clarifier vos priorités business et vos capacités internes."
      ),
      concept(
        "Mission critical role",
        "Poste dont l’absence ralentit directement la performance ou le déploiement d’une stratégie.",
        "Tous les recrutements ne se valent pas ; les rôles critiques doivent être traités différemment.",
        "Identifier ces rôles permet de mieux arbitrer cash, délai et attention dirigeant."
      ),
      concept(
        "Organisation debt",
        "Dette créée par des choix de structure, de rôle ou de process repoussés trop longtemps.",
        "Comme une dette technique, elle finit par freiner tout le système.",
        "Traiter l’organisation debt tôt réduit le besoin de corrections lourdes plus tard."
      ),
      concept(
        "Process debt",
        "Accumulation de bricolages et d’exceptions qui rendent les process de moins en moins fiables.",
        "La process debt fait perdre du temps à tous sans être toujours visible dans les chiffres.",
        "L’automatisation intelligente commence par réduire cette dette avant de la reproduire."
      ),
      concept(
        "Delegation maturity",
        "Niveau de capacité d’une entreprise à distribuer les responsabilités sans perdre la qualité d’exécution.",
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
        "Nombre de mois pendant lesquels l’entreprise peut continuer à opérer avec sa trésorerie disponible.",
        "Un runway sous tension réduit votre marge d’erreur sur les recrutements.",
        "Quand le cash est compté, structurer vos priorités RH devient indispensable."
      ),
      concept(
        "Burn rate",
        "Vitesse à laquelle l’entreprise consomme sa trésorerie.",
        "Elle conditionne votre capacité à recruter sereinement ou à corriger une erreur.",
        "Le burn rate rappelle que le temps perdu en RH coûte aussi du cash."
      ),
      concept(
        "Tension de trésorerie",
        "Situation où les ressources financières disponibles limitent les choix opérationnels à court terme.",
        "Avec 41% de tensions de trésorerie, les erreurs de recrutement deviennent encore plus coûteuses.",
        "La tension cash impose des process plus lisibles et des décisions plus disciplinées."
      ),
      concept(
        "Cycle de levée",
        "Durée nécessaire pour préparer, mener et clôturer une levée de fonds.",
        "Avec une durée moyenne de 10 mois, il faut tenir l’organisation avant, pendant et après la levée.",
        "Le recrutement et la structuration RH ne peuvent pas attendre la fin du cycle pour s’améliorer."
      ),
      concept(
        "Series A readiness",
        "Niveau de préparation de l’entreprise à absorber une première phase forte de croissance financée.",
        "Elle dépend autant de la structure d’équipe que du produit ou du marché.",
        "La readiness Series A commence souvent par une meilleure discipline organisationnelle."
      ),
      concept(
        "Series B pressure",
        "Pression de performance et d’exécution ressentie après une phase d’accélération financée.",
        "À ce stade, les recrutements ratés ou trop lents ont un impact encore plus visible.",
        "La structure RH doit alors servir la vitesse, pas l’encombrer."
      ),
      concept(
        "Capital efficiency",
        "Capacité à transformer les ressources financières en résultats tangibles avec peu de gaspillage.",
        "Elle ne dépend pas seulement du produit, mais aussi de l’organisation.",
        "Des RH plus structurées améliorent directement l’efficacité du capital investi."
      ),
      concept(
        "ROI RH",
        "Retour observable des investissements réalisés dans le recrutement, les outils ou l’organisation RH.",
        "Le ROI RH rend visibles des gains souvent cachés : temps, fiabilité, rétention, exécution.",
        "Mesurer ce ROI aide à parler RH avec un langage dirigeant et non administratif."
      ),
      concept(
        "Externalisation",
        "Choix de confier à un partenaire externe certaines activités de recrutement ou d’exécution.",
        "Elle peut soulager vite, mais elle ne remplace pas la structuration interne.",
        "Vous externalisez souvent parce que vos processus internes ne sont pas encore optimisés."
      ),
      concept(
        "RPO",
        "Recruitment Process Outsourcing : externalisation structurée de tout ou partie du processus de recrutement.",
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
        "Ensemble des entreprises qui développent des solutions technologiques pour la santé.",
        "Le marché est jeune, exigeant et concurrentiel, ce qui augmente la tension sur les talents critiques.",
        "Comprendre la HealthTech aide à positionner le recrutement comme levier de croissance et non simple support."
      ),
      concept(
        "Deeptech santé",
        "Société dont l’innovation repose sur une base scientifique ou technologique complexe appliquée à la santé.",
        "Les cycles y sont plus longs et les profils plus rares.",
        "La deeptech santé exige une structuration RH plus exigeante car les erreurs coûtent longtemps."
      ),
      concept(
        "E-santé",
        "Solutions numériques destinées aux usages, services ou parcours de santé.",
        "L’e-santé mélange vitesse produit, enjeux réglementaires et pénurie de profils hybrides.",
        "Recruter en e-santé demande de mieux articuler business, tech et organisation."
      ),
      concept(
        "Robotique santé",
        "Technologies robotiques appliquées aux usages médicaux, cliniques ou de soins.",
        "Les profils y sont à l’intersection de plusieurs marchés déjà pénuriques.",
        "La robotique santé renforce l’intérêt d’un recrutement ciblé et d’une priorisation stricte."
      ),
      concept(
        "IVD",
        "Diagnostic in vitro : activité de diagnostic réalisée hors du corps humain via prélèvements ou analyses.",
        "Les compétences y sont spécifiques et le marché concurrentiel.",
        "Structurer les critères d’évaluation est indispensable pour éviter de longues recherches floues."
      ),
      concept(
        "NGS",
        "Next-Generation Sequencing : technologies de séquençage à haut débit utilisées en génomique et diagnostic.",
        "Le niveau de spécialisation renforce la nécessité d’un sourcing précis.",
        "Dans un marché de niche, le pipeline candidat doit être piloté avec davantage de rigueur."
      ),
      concept(
        "Affaires médicales",
        "Fonction qui relie données, usage clinique, contenu scientifique et alignement stratégique.",
        "Elle fait partie des compétences critiques les plus sensibles.",
        "Les rôles d’affaires médicales montrent pourquoi le recrutement devient un avantage compétitif."
      ),
      concept(
        "Marketing digital santé",
        "Compétence marketing appliquée à des environnements santé, souvent plus réglementés et plus techniques.",
        "La tension sur ces profils augmente avec l’internationalisation du marché.",
        "Bien cadrer ces postes évite des recrutements hybrides trop flous et donc trop lents."
      ),
      concept(
        "IA de tri",
        "Usage de l’intelligence artificielle pour aider à organiser, lire ou hiérarchiser des candidatures.",
        "2/3 des entreprises utilisent déjà l’IA, mais peu l’exploitent réellement pour gagner du temps.",
        "L’IA apporte de la valeur quand elle s’insère dans un process clair et supervisé."
      ),
      concept(
        "Human in the loop",
        "Principe qui maintient une validation humaine sur les moments critiques d’un process automatisé.",
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
        "Capacité à recruter au-delà du marché local, sur plusieurs pays ou zones de talents.",
        "Avec 75% d’entreprises qui ciblent l’international, la compétition dépasse largement la ville ou le pays.",
        "Vous ne recrutez pas seulement contre vos concurrents locaux, mais contre le monde entier."
      ),
      concept(
        "Geo expansion",
        "Déploiement d’une activité sur de nouveaux marchés ou territoires.",
        "Chaque expansion crée de nouveaux besoins en rôles, coordination et conformité.",
        "Une structure RH légère mais claire aide à absorber cette complexité sans alourdir l’organisation."
      ),
      concept(
        "Employer competitiveness",
        "Capacité d’une entreprise à rester attractive face à d’autres employeurs plus visibles ou mieux dotés.",
        "La concurrence ne se joue plus uniquement sur le salaire.",
        "Clarté du projet, vitesse de décision et structuration font partie de la compétitivité employeur."
      ),
      concept(
        "Talent mobility",
        "Capacité des talents à changer de pays, de secteur ou de projet pour de meilleures opportunités.",
        "Elle accroît la pression sur les marchés spécialisés.",
        "Une entreprise mieux structurée réagit plus vite à ces mouvements et sécurise ses recrutements."
      ),
      concept(
        "Compliance RH",
        "Respect des règles sociales, contractuelles et opérationnelles dans la gestion des talents.",
        "La conformité mal traitée ralentit vite les recrutements et l’internationalisation.",
        "Un process structuré réduit le risque de blocages tardifs sur des sujets évitables."
      ),
      concept(
        "Data privacy recrutement",
        "Gestion des données candidat de manière conforme et sécurisée.",
        "La confiance et la conformité deviennent vite critiques avec plus d’outils et d’automatisation.",
        "Une automatisation RH sérieuse doit intégrer la protection des données dès le design."
      ),
      concept(
        "Cross-border offer",
        "Proposition de rôle faite à un candidat dans un contexte multi-pays ou multi-entités.",
        "Ce type d’offre demande plus de préparation et d’alignement interne.",
        "Mieux cadrer ces offres évite des cycles plus longs et des renoncements tardifs."
      ),
      concept(
        "English-first process",
        "Process de recrutement ou de coordination pensé d’emblée pour des parties prenantes internationales.",
        "Utile dès que le marché, les candidats ou les investisseurs dépassent le cadre francophone.",
        "Structurer un process english-first évite de réinventer le système au moment où l’entreprise s’internationalise."
      ),
      concept(
        "Market benchmarking",
        "Comparaison régulière de vos pratiques, délais, packages ou structures avec le marché.",
        "Le benchmark évite de piloter uniquement à l’intuition.",
        "Un bon benchmark rend les décisions RH plus rapides, plus réalistes et plus crédibles."
      ),
      concept(
        "Concurrence mondiale des talents",
        "Pression concurrentielle exercée par des entreprises internationales sur les mêmes profils.",
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
        "Perception vécue par un collaborateur de son arrivée, de son quotidien et de ses interactions internes.",
        "Elle influence fortement la rétention, surtout dans les contextes de pénurie.",
        "La structuration RH améliore cette expérience en rendant l’organisation plus lisible et moins chaotique."
      ),
      concept(
        "Manager enablement",
        "Soutien concret donné aux managers pour recruter, intégrer, piloter et développer leur équipe.",
        "Des managers mal équipés deviennent un frein silencieux à la croissance.",
        "Le manager enablement réduit les erreurs de recrutement et améliore l’exécution collective."
      ),
      concept(
        "Feedback loop",
        "Boucle de retour d’information régulière entre équipes, managers et direction.",
        "Sans feedback, les problèmes d’organisation restent longtemps invisibles.",
        "Créer des feedback loops simples aide à corriger plus tôt les frictions RH ou opérationnelles."
      ),
      concept(
        "Talent density",
        "Concentration de profils à fort impact dans une équipe donnée.",
        "Une forte densité de talent soutient la vitesse d’exécution et la qualité des décisions.",
        "Le recrutement de profils rares doit être pensé comme levier stratégique, pas simple remplissage."
      ),
      concept(
        "Mobilité interne",
        "Capacité à faire évoluer un collaborateur vers un autre périmètre ou niveau de responsabilité.",
        "Elle réduit certains besoins de recrutement externe et améliore la rétention.",
        "Structurer la mobilité interne augmente la performance sans nécessairement augmenter les coûts RH."
      ),
      concept(
        "Learning path",
        "Chemin de montée en compétences prévu pour un rôle ou un collaborateur.",
        "Sans learning path, les équipes dépendent trop de l’apprentissage informel.",
        "Documenter la progression limite la perte de temps et accélère l’autonomie."
      ),
      concept(
        "Succession planning",
        "Préparation des relais possibles sur des rôles critiques en cas de départ ou de croissance.",
        "Elle sécurise l’organisation au lieu de la laisser dépendre d’un seul individu.",
        "Le succession planning est un outil de résilience et de performance à long terme."
      ),
      concept(
        "Clarté culturelle",
        "Niveau de compréhension partagé des comportements et arbitrages valorisés dans l’entreprise.",
        "Une culture floue complexifie autant le recrutement que la rétention.",
        "Clarifier la culture améliore la qualité du matching et réduit les erreurs d’intégration."
      ),
      concept(
        "Team operating model",
        "Mode de fonctionnement concret d’une équipe : rituels, responsabilités, coordination et priorités.",
        "Sans modèle explicite, les tensions viennent vite du fonctionnement et non des personnes.",
        "Mieux définir ce modèle réduit le besoin de supervision dirigeant."
      ),
      concept(
        "Performance review",
        "Moment structuré d’évaluation et d’alignement sur la contribution, les attentes et la progression.",
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
        "Temps passé par les dirigeants sur des sujets RH, de coordination ou d’arbitrage qui pourraient être mieux structurés.",
        "Le vrai coût RH n’est pas seulement l’argent : c’est souvent le temps dirigeant perdu.",
        "Mesurer ce temps aide à justifier un diagnostic, une structuration RH ou une automatisation."
      ),
      concept(
        "Priorisation des rôles clés",
        "Capacité à distinguer les postes critiques des postes simplement utiles.",
        "Elle évite d’ouvrir trop de chantiers en même temps.",
        "Une bonne priorisation protège le cash et améliore la performance organisationnelle."
      ),
      concept(
        "Charge administrative",
        "Part de l’énergie d’une équipe absorbée par des tâches répétitives ou peu structurées.",
        "Quand elle est trop élevée, la qualité de décision baisse.",
        "Automatiser ou simplifier cette charge est un levier direct de productivité."
      ),
      concept(
        "Standard operating procedure",
        "Instruction ou séquence formalisée qui rend une opération reproductible.",
        "Les SOP évitent que tout repose sur la mémoire ou l’habitude.",
        "Documenter les opérations critiques aide à scaler sans recruter massivement."
      ),
      concept(
        "Single source of truth",
        "Source principale et fiable pour une information donnée : candidats, rôles, indicateurs ou documents.",
        "Sans source de vérité, les équipes perdent du temps à vérifier et recroiser.",
        "Créer une single source of truth est l’un des gains les plus rapides de l’automatisation bien cadrée."
      ),
      concept(
        "Hand-off",
        "Moment où un sujet ou un candidat passe d’une personne ou d’une étape à une autre.",
        "Les hand-offs mal préparés créent retards, erreurs et perte d’information.",
        "Structurer les hand-offs fluidifie le process et réduit la surcharge coordination."
      ),
      concept(
        "Bottleneck",
        "Point de blocage qui ralentit l’ensemble du système.",
        "En RH, le bottleneck est souvent un manque de clarté, de capacité ou de décision.",
        "Identifier le vrai bottleneck évite d’automatiser au mauvais endroit."
      ),
      concept(
        "Throughput recrutement",
        "Volume de recrutements que l’organisation peut réellement absorber avec qualité sur une période donnée.",
        "Le throughput protège contre les ambitions irréalistes ou les ouvertures de postes mal séquencées.",
        "Mieux connaître votre throughput vous aide à scaler sans casser vos équipes."
      ),
      concept(
        "Design organisationnel",
        "Architecture des rôles, des niveaux de décision et des interfaces au sein de l’entreprise.",
        "Un mauvais design organisationnel rend les meilleurs talents moins efficaces.",
        "Le design organisationnel est un chantier central quand la croissance crée des doublons ou des angles morts."
      ),
      concept(
        "Levier stratégique RH",
        "Vision des RH comme moteur de performance, de vitesse et de croissance plutôt que comme fonction support.",
        "Dans un marché pénurique et sous pression, cette bascule devient décisive.",
        "Le recrutement n’est plus une fonction support : c’est un levier stratégique."
      )
    ]
  }
];

export const glossaryConcepts = glossaryGroups.flatMap((group) => group.concepts);
