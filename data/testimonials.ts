/**
 * Vrais temoignages clients/candidats SKS Talents.
 * Source: collectes manuelles Trustpilot + Senja + entretiens directs.
 * IMPORTANT: ne jamais ajouter de noms ou citations inventes. Voir feedback memory.
 */
export type Testimonial = {
  name: string;
  role: string;
  date: string;
  quote: string;
  rating?: number;
};

export const realTestimonials: Testimonial[] = [
  {
    name: "Sarah",
    role: "Ingénieure d'affaires - Biomedical",
    date: "Sep 17, 2023",
    rating: 5,
    quote:
      "Je vous partage une très belle expérience. Cela fait 4 ans que je suis en CDI dans la même société. Ça n'aurait pas été possible sans Georges qui s'est battu pour que je puisse avoir ce poste qui était une énorme opportunité dans ma carrière."
  },
  {
    name: "Biyang ZHOU",
    role: "Chef de produits - Biokar diagnostics",
    date: "Sep 2, 2023",
    rating: 5,
    quote:
      "Georges m'a contacté pour un poste qui me correspondait parfaitement. Il a assuré l'accompagnement tout au long du process de recrutement et même après l'embauche. Je recommande sans hésitation."
  },
  {
    name: "Lina Dawod",
    role: "Ingénieure de recherche - Biokar",
    date: "Aug 7, 2023",
    rating: 5,
    quote:
      "J'ai été contactée par Georges pour un poste d'ingénieure en R&D en Microbiologie. Son suivi tout au long du process de recrutement a été excellent. Ses conseils pertinents ainsi que nos échanges transparents et motivants m'ont été d'une aide précieuse."
  },
  {
    name: "Baldo",
    role: "Genomics EMEA Commercial Director",
    date: "Jul 30, 2023",
    rating: 5,
    quote:
      "Georges m'a accompagné pendant plusieurs années dans le recrutement de profils spécialisés en Life Sciences / In Vitro Diagnostics. Il fait preuve d'une grande agilité et d'une rapide compréhension des challenges de l'entreprise et des besoins ciblés."
  }
];
