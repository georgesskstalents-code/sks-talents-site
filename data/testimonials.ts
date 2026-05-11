/**
 * Vrais temoignages Trustpilot SKS Talents (https://fr.trustpilot.com/review/skstalents.fr).
 * IMPORTANT: ne jamais ajouter de noms ou citations inventes. Voir feedback memory.
 * Source verifiee: Trustpilot - copie integrale par le CEO le 2026-05-11.
 * Ordre: du plus recent au plus ancien (Trustpilot par defaut).
 */
export type Testimonial = {
  name: string;
  role?: string;
  date: string;
  quote: string;
  rating?: number;
};

export const realTestimonials: Testimonial[] = [
  {
    name: "Héloïse Dreau",
    date: "7 janv. 2026",
    rating: 5,
    quote:
      "Merci Georges pour notre échange et tes conseils. Tu as su me mettre à l'aise et m'accompagner pour être en succès lors de mes entretiens suivants, qui se sont terminés par une offre. Je suis super heureuse d'avoir trouvé le job parfaitement aligné avec mes valeurs et mes compétences."
  },
  {
    name: "Sylvain Lassabliere",
    date: "13 nov. 2025",
    rating: 5,
    quote:
      "Malgré une issue malheureuse (je n'ai pas été recruté au poste proposé), j'ai beaucoup apprécié le process de recrutement clair, cadré, ainsi que le professionnalisme et les qualités humaines de Georges. Je n'aurais aucune hésitation à faire appel aux services de SKS Talents en tant qu'employeur !"
  },
  {
    name: "Juliette Girard",
    date: "10 nov. 2025",
    rating: 5,
    quote:
      "Georges m'a accompagné lors du processus de recrutement pour un emploi qu'il m'a conseillé. C'est un réel accompagnement du début à la fin, entre chaque entretien il donne conseils et astuces. Il vous aide aussi à négocier votre salaire en fonction du marché. Merci encore pour votre accompagnement."
  },
  {
    name: "Diana Try",
    date: "6 nov. 2025",
    rating: 5,
    quote:
      "Le recrutement n'a pas abouti pour moi, néanmoins, cela a été un plaisir d'échanger avec Georges, qui a des qualités humaines indéniables : j'ai eu des retours détaillés sur ma candidature et cela aide à continuer de se motiver et aller de l'avant ! Merci Georges !"
  },
  {
    name: "Farida Badry",
    date: "4 nov. 2025",
    rating: 5,
    quote:
      "Grâce à Georges je me sens vraiment à ma place et j'ai trouvé le CDI qui me correspond. Georges est toujours à l'écoute et vient souvent pour prendre des nouvelles. Il donne aussi des petits tips pour s'assurer que tout se passe bien!"
  },
  {
    name: "Marie-Dorothée Barbey",
    date: "3 nov. 2025",
    rating: 5,
    quote:
      "George sait immédiatement créer un lien de confiance avec ses candidats et les mettre à l'aise pour qu'ils expriment pleinement ce qu'ils sont. Il s'assure ainsi du bon match entre les candidats et ses clients ! Grâce à lui j'ai trouvé le poste idéal pour moi et je suis très épanouie !"
  },
  {
    name: "Sarah",
    role: "Ingénieure d'affaires Biomedical",
    date: "19 sept. 2023",
    rating: 5,
    quote:
      "Je vous partage une très belle expérience. Cela fait 4 ans que je suis en CDI dans la même société. Ça n'aurait pas été possible sans Georges qui s'est battu pour que je puisse avoir ce poste qui était une énorme opportunité dans ma carrière à ne pas rater. Au delà de son professionnalisme, Georges est quelqu'un de très humain et empathique. Il est à l'écoute et sait cibler le match parfait entre le candidat et le recruteur. Je le recommande les yeux fermés."
  },
  {
    name: "Victor Spinatii",
    date: "26 juil. 2023",
    rating: 5,
    quote:
      "On peut avoir 100% confiance en George, le processus de recrutement c'est très bien passé et le suivi au top. Merci George !"
  },
  {
    name: "Hugo Foxx",
    role: "Ingénieur support système - Logiciels de laboratoire",
    date: "25 juil. 2023",
    rating: 5,
    quote:
      "Très belle expérience ! En 2017 j'ai obtenu une licence professionnelle Technologie des Équipements Médicaux à l'IUT de Lyon 1. Après mon diplôme j'ai travaillé pendant 1 an comme Technicien Biomédical et je pensais faire ce métier encore longtemps. Rencontrer Georges a été un tournant dans ma carrière professionnelle car il a su me conseiller et m'accompagner pendant 6 ans. Grâce à ces conseils avisés j'ai pu atteindre mes objectifs professionnels. Aujourd'hui je suis Ingénieur support système spécialiste de logiciels de laboratoire. Merci SKS, Merci Georges."
  },
  {
    name: "Clément Adam",
    date: "21 juin 2023",
    rating: 5,
    quote:
      "Georges a été un excellent coach lors de mon processus de recrutement ! Il m'a donné des conseils pertinents pour me préparer au mieux et réussir les différents entretiens pour décrocher le poste. Rajoutez à cela une grande sympathie et un dynamisme à toutes épreuves !"
  }
];
