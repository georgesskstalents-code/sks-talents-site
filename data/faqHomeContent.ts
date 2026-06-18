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
          "Comment planifier vos recrutements Plant Director et Head of Engineering sur votre roadmap préclinique → industrialisation BPF/GMP ?",
        answerHtml:
          'La règle : un profil industrialisation senior se recrute <strong>4 à 6 mois avant le jalon</strong>, pas au moment où le besoin devient visible. Plant Director, Head of Engineering, VP Manufacturing : ces rôles structurent la phase suivante. On les cartographie avec vous sur votre roadmap et on ouvre le sourcing au bon moment.',
        punchline: "Au bon moment, pas en urgence."
      },
      {
        id: "ls-decision",
        category: "Décision",
        question:
          "Qu'est-ce qui rallonge réellement le time-to-hire sur vos profils techniques senior : le marché ou votre process interne ?",
        answerHtml:
          'Dans la majorité des cas : <strong>le process interne</strong>. Brief trop vague au départ, validation multi-niveaux non synchronisée, contre-offre acceptée faute de décision rapide. On audite votre process de décision dès le lancement de la mission et on co-construit un circuit court.',
        punchline: "Le délai se réduit structurellement, pas par chance."
      },
      {
        id: "ls-cost",
        category: "Coût caché",
        question:
          "Combien coûte réellement un Plant Director ou VP Sales qui repart avant 18 mois en phase de levée ?",
        answerHtml: "",
        costBox: {
          figure: "1 à 1,5x",
          label: "Du salaire annuel",
          caption: "en coût direct, hors impact roadmap.",
          bulletsIntro: "Mais le coût réel dépasse le chiffre :",
          bullets: [
            "Jalon décalé",
            "Équipe déstabilisée",
            "Signal négatif au board au pire moment"
          ],
          source: "Sur un profil à 120-150 k€ : 150 à 220 k€ perdus."
        },
        punchline:
          "La prévention coûte moins cher que le remplacement : chaque mission SKS Talents inclut un cadrage onboarding 30/60/90 jours."
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
          "Comment anticiper vos recrutements de profils clés (direction des opérations, M&A, coordination régionale) en phase de regroupement ?",
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
