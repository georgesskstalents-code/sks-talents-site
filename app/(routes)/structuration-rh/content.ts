/**
 * Contenu de la page pilier /structuration-rh.
 *
 * Sources autorisees : /services, /life-sciences/structuration-ia,
 * /animal-health/structuration-ia et les articles du blog consacres a
 * l'automatisation RH. Tout paragraphe affirmant quelque chose d'absent de ces
 * sources porte un marqueur [[A_RELIRE]].
 */

export const STRUCTURATION_RH_CANONICAL = "https://www.skstalents.fr/structuration-rh";

export const structurationRhFaqs = [
  {
    question: "Quelle différence avec un DRH externalisé ?",
    answer:
      "Un DRH externalisé occupe une fonction dans la durée et prend en charge l'administratif courant. Une mission de structuration a un début, une fin et des livrables : organisation cible, process de recrutement et d'onboarding, grille de rémunération, outillage. L'objectif est que votre équipe puisse tenir le cadre sans nous une fois la mission terminée. Les deux formats se combinent : une mission de structuration, puis un temps partagé pour installer les rituels."
  },
  {
    question: "Combien de temps dure une mission de structuration RH ?",
    answer:
      "La durée dépend du périmètre et du nombre de sites concernés. Sur le volet outillage et automatisation, les pilotes décrits sur nos pages de digitalisation par l'IA sont généralement opérationnels en 4 à 6 semaines. Le calendrier complet est fixé lors du cadrage, avant tout engagement."
  },
  {
    question: "À partir de quelle taille cela devient utile ?",
    answer:
      "Le besoin apparaît rarement avant 20 personnes, et devient difficile à repousser au-delà de 50. Le déclencheur n'est pas seulement l'effectif : une levée de fonds, une acquisition, un regroupement de cliniques ou une ouverture à l'international créent le même effet de seuil, parce qu'ils multiplient les décisions RH sans multiplier les personnes pour les prendre."
  },
  {
    question: "Comment démarrer ?",
    answer:
      "Par un échange de 15 minutes pour qualifier le besoin, puis une réunion de cadrage qui fixe le périmètre, les livrables et le calendrier. Vous pouvez aussi passer par notre diagnostic en ligne, qui restitue une première lecture de vos points de friction avant même de nous parler."
  }
];

export const deliverables = [
  {
    title: "Audit RH",
    body:
      "Lecture de l'existant : organigramme réel, process de recrutement en place, outils utilisés, points de rupture. Le livrable est une cartographie des frictions, hiérarchisée par coût pour l'organisation."
  },
  {
    title: "Organigramme cible",
    body:
      "L'organisation dont vous avez besoin dans douze mois, avec les rôles à créer, ceux à faire évoluer et l'ordre dans lequel les ouvrir. C'est le document qui permet de dire non à un recrutement opportuniste."
  },
  {
    title: "Process de recrutement et d'onboarding",
    body:
      "Job intake structuré, scorecard candidat définie avant les entretiens, trame d'entretien, circuit de décision. Côté onboarding, un parcours des 90 premiers jours qui ne repose pas sur la disponibilité du manager."
  },
  {
    title: "Grille de rémunération",
    body:
      "Fourchettes par fonction et par niveau, cohérentes entre elles et situées par rapport au marché. Sans grille, chaque recrutement renégocie l'ensemble de l'échelle salariale."
  },
  {
    title: "Outillage et automatisation",
    body:
      "Centralisation des documents RH, automatisation du reporting et des tâches répétitives. C'est le volet détaillé sur nos pages de digitalisation par l'IA, en Life Sciences comme en santé animale."
  },
  {
    title: "Gouvernance IA",
    body:
      "Cadre d'usage des outils d'IA dans les process RH : ce qui peut être automatisé, ce qui reste une décision humaine, ce qui doit être tracé. Le sujet devient réglementaire avec l'AI Act."
  }
];

export const triggers = [
  {
    title: "Après une série A",
    body:
      "Le plan de recrutement passe de quelques embauches par an à plusieurs par trimestre. Les process qui tenaient à dix personnes ne tiennent plus, et le temps du/de la CEO part dans l'arbitrage RH au lieu du produit et des investisseurs."
  },
  {
    title: "Le passage de 20 à 50 personnes",
    body:
      "C'est le seuil où le management informel cesse de fonctionner. Les décisions de rémunération deviennent incohérentes entre équipes, l'onboarding dépend de la disponibilité de chacun, et les premiers départs surviennent sans signal préalable."
  },
  {
    title: "Un rachat ou un regroupement de cliniques",
    body:
      "L'intégration met face à face des pratiques RH hétérogènes : contrats, grilles, plannings, outils. Nos pages santé animale décrivent le cas d'une due diligence RH ramenée à 48 heures contre deux semaines, une fois les documents centralisés."
  },
  {
    title: "L'internationalisation",
    body:
      "Un premier recrutement hors de France impose de formaliser ce qui était implicite : niveaux, bandes salariales, process d'entretien. Sans référentiel commun, chaque pays réinvente ses propres règles."
  }
];
