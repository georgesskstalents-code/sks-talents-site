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
        question: "Comment anticiper vos recrutements en phase de croissance ?",
        answerHtml:
          'En alignant votre plan de recrutement sur votre roadmap (produit → industrialisation → commercialisation) et en sécurisant en amont les rôles clés : <strong>Head of Engineering, CTO, Direction commerciale</strong>.',
        punchline: "Attendre le besoin réel, c'est déjà ralentir l'exécution."
      },
      {
        id: "ls-decision",
        category: "Décision",
        question:
          "Pourquoi vos recrutements de leadership (Engineering, Sales, Direction) prennent-ils du temps ?",
        answerHtml:
          'Parce que le besoin évolue plus vite que sa définition : <strong>attentes floues, priorités mouvantes, manque d\'alignement interne</strong>.',
        punchline:
          "Le blocage n'est pas l'accès aux profils, mais la capacité à décider vite et clairement."
      },
      {
        id: "ls-cost",
        category: "Coût caché",
        question: "Quel est le coût d'un onboarding mal structuré sur ces rôles clés ?",
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
        category: "Profils pénuriques",
        question:
          "Comment recruter des profils pénuriques en Animal Health ? (vétérinaire développement, réseau, commercial, growth…)",
        answerHtml:
          'Ces profils ne répondent pas aux offres. Ils se recrutent par <strong>approche directe et projection dans votre projet</strong>.',
        punchline: "Sans vision claire, les meilleurs profils ne bougent pas."
      },
      {
        id: "ah-hybrides",
        category: "Rôles hybrides",
        question: "Pourquoi vos recrutements terrain et réseau sont-ils difficiles ?",
        answerHtml:
          'Parce que ces rôles sont hybrides : <strong>business, terrain, relationnel</strong>. L\'enjeu n\'est pas seulement le poste, mais <strong>l\'adhésion au modèle</strong> (groupe, réseau, croissance).',
        punchline: "Ces postes ne se vendent pas, ils se font choisir."
      },
      {
        id: "ah-securisation",
        category: "Sécurisation",
        question:
          "Comment sécuriser vos rôles clés (Direction commerciale, développement, growth) ?",
        answerHtml:
          'En clarifiant les attentes dès le départ : <strong>exécution court terme vs structuration long terme</strong>.',
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
