export type FaqVertical = "life-sciences" | "animal-health";

export type FaqQuestion = {
  id: string;
  category: string;
  question: string;
  answerHtml: string;
  punchline: string;
  costBox?: {
    figure: string;
    label: string;
    caption: string;
    bulletsIntro: string;
    bullets: string[];
    source: string;
  };
};

export type FaqTab = {
  vertical: FaqVertical;
  label: string;
  emoji: string;
  questions: FaqQuestion[];
};

export const FAQ_HOME_TABS: ReadonlyArray<FaqTab> = [
  {
    vertical: "life-sciences",
    label: "Life Sciences",
    emoji: "🧬",
    questions: [
      {
        id: "ls-anticipation",
        category: "Anticipation",
        question:
          "Comment aligner votre plan de recrutement sur votre roadmap R&D et clinique (préclinique → clinique → industrialisation) ?",
        answerHtml:
          'En séquençant vos recrutements sur vos jalons scientifiques : sécuriser les rôles clés <strong>plusieurs mois avant</strong> chaque transition de phase, pas au moment où le besoin devient critique.',
        punchline: "Attendre le besoin réel, c'est déjà ralentir l'exécution."
      },
      {
        id: "ls-decision",
        category: "Décision",
        question:
          "Pourquoi vos recrutements de profils clés (CMC, Affaires réglementaires, VP R&D, Manufacturing) prennent-ils autant de temps ?",
        answerHtml:
          'Parce que ces profils sont rares et que le besoin évolue plus vite que sa définition : <strong>attentes floues, priorités mouvantes, manque d\'alignement interne</strong>.',
        punchline:
          "Le blocage n'est pas l'accès aux profils, mais la capacité à décider vite et clairement."
      },
      {
        id: "ls-cost",
        category: "Coût caché",
        question:
          "Quel est le coût d'un onboarding mal structuré sur ces rôles critiques en phase de levée ?",
        answerHtml: "",
        costBox: {
          figure: "1,5 à 2x",
          label: "Du salaire annuel",
          caption: "le coût d'un onboarding raté.",
          bulletsIntro: "Mais surtout, il crée :",
          bullets: [
            "Un décalage d'exécution",
            "Une perte de traction produit ou commerciale",
            "Un effet domino sur les équipes"
          ],
          source: "Source : Loocatme (2026)"
        },
        punchline:
          "Sur ces postes, un mauvais onboarding ralentit directement votre croissance."
      }
    ]
  },
  {
    vertical: "animal-health",
    label: "Animal Health",
    emoji: "🐾",
    questions: [
      {
        id: "ah-penuriques",
        category: "Anticipation",
        question:
          "Comment anticiper vos recrutements de vétérinaires et ASV en phase de regroupement ?",
        answerHtml:
          'En anticipant les besoins de chaque site avant l\'intégration : ces profils pénuriques se sécurisent par <strong>approche directe et projection dans votre projet de groupe</strong>, pas par annonce.',
        punchline: "Sans vision claire, les meilleurs profils ne bougent pas."
      },
      {
        id: "ah-hybrides",
        category: "Décision",
        question:
          "Pourquoi vos recrutements de profils clés (vétérinaires associés, direction de site) prennent-ils autant de temps ?",
        answerHtml:
          'Parce que ces rôles sont hybrides : <strong>clinique, management, business</strong>. L\'enjeu n\'est pas seulement le poste, mais <strong>l\'adhésion au modèle de groupe</strong>.',
        punchline: "Ces postes ne se vendent pas, ils se font choisir."
      },
      {
        id: "ah-securisation",
        category: "Coût caché",
        question:
          "Quel est le coût d'un onboarding mal structuré lors de l'intégration d'une nouvelle clinique ?",
        answerHtml:
          'Un départ précoce, une équipe déstabilisée et une intégration qui prend du retard : <strong>la valeur du rachat se dégrade dès les premiers mois</strong>.',
        punchline:
          "Un mauvais recrutement ou un onboarding mal cadré ralentit immédiatement votre croissance."
      }
    ]
  }
];

export function getFaqJsonLd() {
  const stripHtml = (html: string) => html.replace(/<[^>]+>/g, "");
  const mainEntity = FAQ_HOME_TABS.flatMap((tab) =>
    tab.questions.map((q) => {
      let answerText = stripHtml(q.answerHtml);
      if (q.costBox) {
        const cb = q.costBox;
        answerText = `${cb.figure} ${cb.label} - ${cb.caption} ${cb.bulletsIntro} ${cb.bullets.join(" / ")}`;
      }
      answerText = `${answerText} ${q.punchline}`.trim();
      return {
        "@type": "Question",
        name: q.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answerText
        }
      };
    })
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity
  };
}
