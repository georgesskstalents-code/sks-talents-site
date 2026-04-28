export type ResourceItem = {
  slug: string;
  title: string;
  summary: string;
  sector: string;
  location?: string;
  dateLabel?: string;
  href?: string;
  logoUrl?: string;
};

export type ExternalResourceLink = {
  name: string;
  href: string;
  summary: string;
  meta: string;
  logoUrl: string;
};

const favicon = (url: string) => {
  return `https://www.google.com/s2/favicons?sz=256&domain_url=${encodeURIComponent(url)}`;
};

const schoolDirectory: Record<string, string> = {
  "universite-strasbourg-life-sciences": "https://www.unistra.fr/",
  "universite-paris-saclay-biology": "https://www.universite-paris-saclay.fr/",
  "universite-paris-saclay": "https://www.universite-paris-saclay.fr/",
  "insa-lyon-bioengineering": "https://www.insa-lyon.fr/",
  supbiotech: "https://www.supbiotech.fr/",
  "utc-biomed": "https://www.utc.fr/",
  "esigen-bioinformatique": "https://www.u-bourgogne.fr/",
  "universite-evry-paris-saclay-genomics": "https://www.univ-evry.fr/",
  "genopole-campus-evry": "https://www.genopole.fr/",
  "centrale-supelec-health": "https://www.centralesupelec.fr/",
  "universite-montpellier-pharma": "https://www.umontpellier.fr/",
  "universite-lille-biotech": "https://www.univ-lille.fr/",
  "em-lyon-healthcare": "https://em-lyon.com/",
  "essec-healthcare": "https://www.essec.edu/",
  "audencia-animal-health": "https://www.audencia.com/",
  "isa-lille-nutrition": "https://www.junia.com/",
  "agrocampus-ouest": "https://www.institut-agro-rennes-angers.fr/",
  "ecole-biologie-industrielle-cergy": "https://www.ebi-edu.com/",
  "universite-angers-veterinary-sciences": "https://www.univ-angers.fr/",
  "skema-life-sciences-business": "https://www.skema.edu/",
  "iuem-ubo-plouzane": "https://www-iuem.univ-brest.fr/",
  "mines-nancy": "https://mines-nancy.univ-lorraine.fr/",
  "institut-littoral-urbain-durable-intelligent-la-rochelle": "https://www.univ-larochelle.fr/",
  "icap-montpellier": "https://www.umontpellier.fr/",
  "mines-paris-tech": "https://www.minesparis.psl.eu/",
  "telecom-paris-tech": "https://www.telecom-paris.fr/",
  "isae-supaero": "https://www.isae-supaero.fr/",
  enpc: "https://www.ecoledesponts.fr/",
  epita: "https://www.epita.fr/",
  "grenoble-inp-ensimag": "https://ensimag.grenoble-inp.fr/",
  "imt-atlantique": "https://www.imt-atlantique.fr/",
  "topcos-nantes": "https://pharmacie.univ-nantes.fr/",
  "faculte-pharmacie-universite-strasbourg": "https://pharma.unistra.fr/",
  esilv: "https://www.esilv.fr/",
  "grenoble-inp-phelma": "https://phelma.grenoble-inp.fr/",
  "faculte-sciences-et-ingenieur-lorient": "https://www.univ-ubs.fr/",
  "ensta-paris-tech": "https://www.ensta-paris.fr/",
  espci: "https://www.espci.psl.eu/",
  "efrei-paris": "https://www.efrei.fr/",
  "centrale-nantes": "https://www.ec-nantes.fr/",
  "cesi-ecole-ingenieurs": "https://ecole-ingenieurs.cesi.fr/",
  "uco-biotechnologies-produits-cosmetiques": "https://www.uco.fr/",
  "centrale-lyon": "https://www.ec-lyon.fr/",
  "chimie-paris-tech": "https://www.chimieparistech.psl.eu/",
  "esbs-strasbourg": "https://esbs.unistra.fr/",
  centralesupelec: "https://www.centralesupelec.fr/",
  "arpac-le-havre": "https://www.univ-lehavre.fr/",
  "sciences-agro-bordeaux": "https://www.agro-bordeaux.fr/",
  "institut-agro-dijon": "https://institut-agro-dijon.fr/",
  "iut-orleans": "https://www.univ-orleans.fr/fr/iut-orleans",
  "institut-agro-rennes-angers": "https://www.institut-agro-rennes-angers.fr/",
  "uco-guingamp": "https://www.uco.fr/",
  "institut-agro-montpellier": "https://www.institut-agro-montpellier.fr/",
  ensat: "https://www.ensat.fr/",
  itech: "https://www.itech.fr/",
  "escom-compiegne": "https://www.escom.fr/",
  "enscmu-mulhouse": "https://www.enscmu.uha.fr/",
  "essec-cergy": "https://www.essec.edu/",
  "cif-lille": "https://www.univ-lille.fr/",
  ensaia: "https://ensaia.univ-lorraine.fr/",
  "master-sciences-du-medicament-orleans": "https://www.univ-orleans.fr/",
  "ecole-superieure-du-parfum": "https://www.ecole-parfum.com/",
  "esepac-saint-germain-laprade": "https://www.esepac.com/",
  "ipil-lyon": "https://www.ipil.fr/",
  "foqual-nice": "https://univ-cotedazur.fr/",
  "ubs-vannes": "https://www.univ-ubs.fr/",
  "universite-d-angers": "https://www.univ-angers.fr/",
  "master-formulation-data-mining-cergy": "https://www.cyu.fr/",
  "isipca-versailles": "https://www.isipca.fr/",
  polytechnique: "https://www.polytechnique.edu/"
};

const rawSchools: ResourceItem[] = [
  { slug: "agroparistech", title: "AgroParisTech", summary: "Grande école de référence pour les sciences du vivant, l’agroalimentaire et l’innovation.", sector: "Life Sciences", location: "Paris", href: "https://www.agroparistech.fr/", logoUrl: favicon("https://www.agroparistech.fr/") },
  { slug: "oniris", title: "Oniris", summary: "École nationale vétérinaire et agroalimentaire, vivier de talents santé animale.", sector: "Animal Health", location: "Nantes", href: "https://www.oniris-nantes.fr/", logoUrl: favicon("https://www.oniris-nantes.fr/") },
  { slug: "vetagro-sup", title: "VetAgro Sup", summary: "Formation vétérinaire, agronomie et santé publique vétérinaire.", sector: "Animal Health", location: "Lyon", href: "https://www.vetagro-sup.fr/", logoUrl: favicon("https://www.vetagro-sup.fr/") },
  { slug: "enva", title: "ENVA", summary: "École nationale vétérinaire d’Alfort, reconnue pour la médecine vétérinaire clinique.", sector: "Animal Health", location: "Maisons-Alfort", href: "https://www.vet-alfort.fr/", logoUrl: favicon("https://www.vet-alfort.fr/") },
  { slug: "envt", title: "ENVT", summary: "École nationale vétérinaire de Toulouse, référence en médecine vétérinaire, santé publique et productions animales.", sector: "Animal Health", location: "Toulouse", href: "https://envt.fr/", logoUrl: favicon("https://envt.fr/") },
  { slug: "unilasalle-rouen-veterinaire", title: "UniLaSalle Rouen - École vétérinaire", summary: "Cinquième établissement formant des vétérinaires en France, école privée accessible via Parcoursup.", sector: "Animal Health", location: "Mont-Saint-Aignan", href: "https://www.unilasalle.fr/formations/ecole-veterinaire", logoUrl: favicon("https://www.unilasalle.fr/") },
  { slug: "universite-strasbourg-life-sciences", title: "Université de Strasbourg - Life Sciences", summary: "Écosystème fort en biologie, génomique et recherche translationnelle.", sector: "Life Sciences", location: "Strasbourg" },
  { slug: "universite-paris-saclay-biology", title: "Université Paris-Saclay - Biology", summary: "Pôle scientifique majeur pour biotech, data et innovation santé.", sector: "Life Sciences", location: "Île-de-France" },
  { slug: "universite-paris-saclay", title: "Université Paris-Saclay", summary: "Université de référence pour sciences du vivant, biotechnologies, santé, data et recherche translationnelle.", sector: "Life Sciences", location: "Île-de-France" },
  { slug: "insa-lyon-bioengineering", title: "INSA Lyon Bioengineering", summary: "Formation d’ingénieurs pour biomédical, biotech industrielle et procédés.", sector: "Biotech", location: "Lyon" },
  { slug: "supbiotech", title: "Sup'Biotech", summary: "École d’ingénieurs centrée sur les biotechnologies, l’innovation santé et les applications industrielles du vivant.", sector: "Biotech", location: "Villejuif" },
  { slug: "utc-biomed", title: "UTC Biomédical", summary: "Compétences en ingénierie biomédicale, dispositifs et data santé.", sector: "Diagnostic", location: "Compiègne" },
  { slug: "esigen-bioinformatique", title: "ESIGEN Bioinformatique", summary: "Formation orientée data science, bioinformatique et applications NGS.", sector: "Diagnostic", location: "Dijon" },
  { slug: "universite-evry-paris-saclay-genomics", title: "Université d’Évry Paris-Saclay - Génomique", summary: "Viviers utiles pour génomique, biologie moléculaire, bioinformatique et environnements multi-omiques.", sector: "Biotech", location: "Évry-Courcouronnes" },
  { slug: "genopole-campus-evry", title: "Genopole Campus Évry", summary: "Écosystème biotech majeur mêlant recherche, startups et formation autour de la génomique et des biothérapies.", sector: "Biotech", location: "Évry-Courcouronnes" },
  { slug: "centrale-supelec-health", title: "CentraleSupélec Health", summary: "Profils ingénieurs capables d’évoluer à l’interface healthtech et IA.", sector: "Diagnostic", location: "Gif-sur-Yvette" },
  { slug: "universite-montpellier-pharma", title: "Université de Montpellier - Pharmacie", summary: "Écosystème solide en pharmacologie, réglementaire et biotech.", sector: "Biotech", location: "Montpellier" },
  { slug: "universite-lille-biotech", title: "Université de Lille - Biotech", summary: "Bassins de talents orientés R&D, bioprocédés et qualité.", sector: "Biotech", location: "Lille" },
  { slug: "em-lyon-healthcare", title: "EM Lyon Healthcare", summary: "Profils business pour croissance, marketing et stratégie en santé.", sector: "Life Sciences", location: "Lyon" },
  { slug: "essec-healthcare", title: "ESSEC Healthcare", summary: "Compétences management et transformation pour entreprises healthtech.", sector: "Life Sciences", location: "Cergy" },
  { slug: "audencia-animal-health", title: "Audencia Animal Health", summary: "Profils marketing, commerce et direction pour santé animale et petcare.", sector: "Animal Health", location: "Nantes" },
  { slug: "isa-lille-nutrition", title: "ISA Lille Nutrition", summary: "Formation liée aux enjeux nutrition, formulation et innovation produit.", sector: "Petfood", location: "Lille" },
  { slug: "agrocampus-ouest", title: "Agrocampus Ouest", summary: "Talents en nutrition, agriculture et innovation appliquée au petfood.", sector: "Petfood", location: "Rennes" },
  { slug: "ecole-biologie-industrielle-cergy", title: "EBI Cergy", summary: "Ingénieurs pour bioproduction, qualité et développement industriel.", sector: "Biotech", location: "Cergy" },
  { slug: "universite-angers-veterinary-sciences", title: "Université d’Angers - Veterinary Sciences", summary: "Compétences connexes en santé animale, nutrition et data.", sector: "Animal Health", location: "Angers" },
  { slug: "skema-life-sciences-business", title: "SKEMA Life Sciences Business", summary: "Profils hybrides business et innovation pour marchés santé et biotech.", sector: "Life Sciences", location: "Lille / Paris" },
  { slug: "iuem-ubo-plouzane", title: "IUEM, Université de Bretagne Occidentale", summary: "Institut universitaire orienté mer, environnement, observation et ingénierie des systèmes complexes.", sector: "Green Engineering", location: "Plouzané", dateLabel: "17 avr. 2023" },
  { slug: "mines-nancy", title: "Mines Nancy", summary: "Grande école d’ingénieurs mobilisable pour les industries, procédés, matériaux et transitions technologiques.", sector: "Green Engineering", location: "Nancy", dateLabel: "17 avr. 2023" },
  { slug: "institut-littoral-urbain-durable-intelligent-la-rochelle", title: "Institut littoral urbain durable intelligent", summary: "Écosystème de formation croisant durabilité, data, ingénierie et transformation des territoires.", sector: "Green Engineering", location: "La Rochelle", dateLabel: "17 avr. 2023" },
  { slug: "icap-montpellier", title: "Ingénierie des Cosmétiques (ICAP)", summary: "Programme ciblé sur la formulation, l’innovation cosmétique et les interfaces réglementation / produit.", sector: "Cosmétique", location: "Montpellier", dateLabel: "17 avr. 2023" },
  { slug: "mines-paris-tech", title: "Mines ParisTech", summary: "Grande école d’ingénieurs historiquement forte sur les systèmes complexes, l’industrie et l’innovation.", sector: "Green Engineering", location: "Paris", dateLabel: "17 avr. 2023" },
  { slug: "telecom-paris-tech", title: "Télécom Paris", summary: "Viviers pertinents pour data santé, IA, logiciels scientifiques et medtech.", sector: "MedTech", location: "Paris", dateLabel: "17 avr. 2023" },
  { slug: "isae-supaero", title: "ISAE-Supaéro", summary: "Profils d’ingénierie très robustes pour modélisation, systèmes critiques, data et technologies deeptech.", sector: "Green Engineering", location: "Toulouse", dateLabel: "17 avr. 2023" },
  { slug: "enpc", title: "ENPC", summary: "L’École des Ponts nourrit des profils d’ingénierie, systèmes et innovation utiles aux industries techniques.", sector: "Green Engineering", location: "Champs-sur-Marne", dateLabel: "17 avr. 2023" },
  { slug: "epita", title: "EPITA", summary: "Talents en informatique, IA, cybersécurité et logiciels mobilisables dans les environnements medtech et data santé.", sector: "MedTech", location: "Paris", dateLabel: "17 avr. 2023" },
  { slug: "grenoble-inp-ensimag", title: "Grenoble INP - Ensimag", summary: "École de référence pour mathématiques appliquées, informatique, data et systèmes complexes.", sector: "MedTech", location: "Grenoble", dateLabel: "17 avr. 2023" },
  { slug: "imt-atlantique", title: "IMT Atlantique", summary: "Profils solides en numérique, procédés, industrie et technologies pour santé et ingénierie durable.", sector: "MedTech", location: "Nantes / Brest", dateLabel: "17 avr. 2023" },
  { slug: "topcos-nantes", title: "Sciences du Médicament (TopCos)", summary: "Parcours articulant médicament, formulation, qualité et industries à forte technicité.", sector: "Cosmétique", location: "Nantes", dateLabel: "17 avr. 2023" },
  { slug: "faculte-pharmacie-universite-strasbourg", title: "Faculté de pharmacie, Université de Strasbourg", summary: "Viviers de profils pharmacie, développement, réglementaire et sciences du médicament.", sector: "Biotech", location: "Strasbourg", dateLabel: "17 avr. 2023" },
  { slug: "esilv", title: "ESILV", summary: "École d’ingénieurs hybride utile pour medtech, data produit et innovation technologique.", sector: "MedTech", location: "Paris La Défense", dateLabel: "17 avr. 2023" },
  { slug: "grenoble-inp-phelma", title: "Grenoble INP - Phelma", summary: "Profils d’ingénierie en physique, électronique, matériaux et technologies avancées.", sector: "MedTech", location: "Grenoble", dateLabel: "17 avr. 2023" },
  { slug: "faculte-sciences-et-ingenieur-lorient", title: "Faculté des sciences et sciences de l’ingénieur", summary: "Parcours scientifiques et ingénierie utiles pour industries durables et environnements techniques.", sector: "Green Engineering", location: "Lorient", dateLabel: "17 avr. 2023" },
  { slug: "ensta-paris-tech", title: "ENSTA Paris", summary: "École d’ingénieurs pour systèmes complexes, modélisation, matériaux et innovation technologique.", sector: "Green Engineering", location: "Palaiseau", dateLabel: "17 avr. 2023" },
  { slug: "espci", title: "ESPCI Paris", summary: "École de référence pour physique, chimie, matériaux et sciences à forte intensité R&D.", sector: "Biotech", location: "Paris", dateLabel: "17 avr. 2023" },
  { slug: "efrei-paris", title: "EFREI Paris", summary: "Profils tech, data et systèmes d’information mobilisables dans les secteurs healthtech et medtech.", sector: "MedTech", location: "Villejuif", dateLabel: "17 avr. 2023" },
  { slug: "centrale-nantes", title: "Centrale Nantes", summary: "Grande école d’ingénieurs utile pour procédés, industrie, data et transitions technologiques.", sector: "Green Engineering", location: "Nantes", dateLabel: "17 avr. 2023" },
  { slug: "cesi-ecole-ingenieurs", title: "CESI École d’Ingénieurs", summary: "Parcours professionnalisants en ingénierie, industrie et performance opérationnelle.", sector: "Green Engineering", location: "France", dateLabel: "17 avr. 2023" },
  { slug: "uco-biotechnologies-produits-cosmetiques", title: "Biotechnologies Ingénierie des Produits Cosmétiques", summary: "Parcours UCO orienté formulation, innovation produit et interfaces biotechnologies / cosmétique.", sector: "Cosmétique", location: "Angers", dateLabel: "17 avr. 2023" },
  { slug: "centrale-lyon", title: "Centrale Lyon", summary: "Grande école d’ingénieurs mobilisable pour industrie, systèmes complexes et transitions technologiques.", sector: "Green Engineering", location: "Écully", dateLabel: "17 avr. 2023" },
  { slug: "chimie-paris-tech", title: "Chimie ParisTech", summary: "Écosystème très pertinent pour formulation, chimie fine, procédés et innovation cosmétique / biotech.", sector: "Cosmétique", location: "Paris", dateLabel: "17 avr. 2023" },
  { slug: "esbs-strasbourg", title: "École supérieure de biotechnologie Strasbourg", summary: "Formation spécialisée en biotechnologies, innovation et interfaces scientifiques européennes.", sector: "Biotech", location: "Strasbourg", dateLabel: "17 avr. 2023" },
  { slug: "centralesupelec", title: "CentraleSupélec", summary: "Profils ingénieurs pour santé numérique, data, systèmes et innovation industrielle.", sector: "MedTech", location: "Gif-sur-Yvette", dateLabel: "17 avr. 2023" },
  { slug: "arpac-le-havre", title: "ARPAC, Le Havre", summary: "Centre / parcours lié aux univers sciences appliquées et environnement industriel.", sector: "Agro-industrie", location: "Le Havre", dateLabel: "17 avr. 2023" },
  { slug: "sciences-agro-bordeaux", title: "Sciences Agro Bordeaux", summary: "Profils agronomie, agro-industrie, nutrition et innovation appliquée.", sector: "Agro-industrie", location: "Bordeaux", dateLabel: "17 avr. 2023" },
  { slug: "institut-agro-dijon", title: "Institut Agro, Dijon", summary: "Institution spécialisée en agronomie, alimentation, bioprocédés et filières industrielles du vivant.", sector: "Agro-industrie", location: "Dijon", dateLabel: "17 avr. 2023" },
  { slug: "iut-orleans", title: "IUT d’Orléans", summary: "Viviers techniques et universitaires utiles pour qualité, formulation et industries du médicament.", sector: "MedTech", location: "Orléans", dateLabel: "17 avr. 2023" },
  { slug: "institut-agro-rennes-angers", title: "Institut Agro Rennes Angers", summary: "Grande source de talents agronomie, nutrition, agroalimentaire et innovation durable.", sector: "Agro-industrie", location: "Rennes / Angers", dateLabel: "17 avr. 2023" },
  { slug: "uco-guingamp", title: "UCO, Guingamp", summary: "Campus utile pour des parcours appliqués en sciences, agro-industrie et technologies associées.", sector: "Agro-industrie", location: "Guingamp", dateLabel: "17 avr. 2023" },
  { slug: "institut-agro-montpellier", title: "Institut Agro, Montpellier", summary: "Référence pour agronomie, alimentation, biotechnologies et sciences du vivant appliquées.", sector: "Agro-industrie", location: "Montpellier", dateLabel: "17 avr. 2023" },
  { slug: "ensat", title: "ENSAT", summary: "École d’agronomie pour agriculture, nutrition, procédés et durabilité des filières.", sector: "Agro-industrie", location: "Toulouse", dateLabel: "17 avr. 2023" },
  { slug: "itech", title: "ITECH", summary: "Formation orientée matériaux, formulation, chimie appliquée et industries de spécialité.", sector: "Cosmétique", location: "Lyon", dateLabel: "17 avr. 2023" },
  { slug: "escom-compiegne", title: "ESCOM, Compiègne", summary: "École de chimie utile pour formulation, qualité, procédés et innovation cosmétique / pharma.", sector: "Cosmétique", location: "Compiègne", dateLabel: "17 avr. 2023" },
  { slug: "enscmu-mulhouse", title: "ENSCMu, Mulhouse", summary: "Profils de chimie, matériaux et procédés utiles aux industries du vivant et de la formulation.", sector: "Cosmétique", location: "Mulhouse", dateLabel: "17 avr. 2023" },
  { slug: "essec-cergy", title: "ESSEC, Cergy", summary: "Profils business et stratégie adaptés aux environnements healthtech, biotech et croissance.", sector: "Life Sciences", location: "Cergy", dateLabel: "17 avr. 2023" },
  { slug: "cif-lille", title: "CIF, Lille", summary: "Référence de formation complémentaire utile pour industries chimiques, formulation et filières techniques.", sector: "Cosmétique", location: "Lille", dateLabel: "17 avr. 2023" },
  { slug: "ensaia", title: "ENSAIA", summary: "École d’agronomie et industries alimentaires avec vraie pertinence pour nutrition, agro et qualité.", sector: "Agro-industrie", location: "Nancy", dateLabel: "17 avr. 2023" },
  { slug: "master-sciences-du-medicament-orleans", title: "Master Sciences du Médicament, IUT d’Orléans", summary: "Parcours ciblé sur médicament, qualité, développement et environnements réglementés.", sector: "Biotech", location: "Orléans", dateLabel: "17 avr. 2023" },
  { slug: "ecole-superieure-du-parfum", title: "ESP, Paris, Grasse", summary: "École supérieure du parfum, pertinente pour aromatique, cosmétique et industries de formulation.", sector: "Cosmétique", location: "Paris / Grasse", dateLabel: "17 avr. 2023" },
  { slug: "esepac-saint-germain-laprade", title: "ESEPAC", summary: "École spécialisée packaging, très utile pour produit, industrialisation et mise sur le marché.", sector: "Agro-industrie", location: "Saint-Germain-Laprade", dateLabel: "17 avr. 2023" },
  { slug: "ipil-lyon", title: "IPIL, Lyon", summary: "Institut de pharmacie industrielle mobilisable pour formulation, production et réglementaire.", sector: "Biotech", location: "Lyon", dateLabel: "17 avr. 2023" },
  { slug: "foqual-nice", title: "FOQUAL, Nice", summary: "Parcours qualité et formulation utiles pour industries techniques, pharma et agroalimentaire.", sector: "Agro-industrie", location: "Nice", dateLabel: "17 avr. 2023" },
  { slug: "ubs-vannes", title: "UBS, Vannes", summary: "Université de Bretagne Sud, vivier complémentaire en sciences, ingénierie et développement territorial.", sector: "Green Engineering", location: "Vannes", dateLabel: "17 avr. 2023" },
  { slug: "universite-d-angers", title: "Université d’Angers", summary: "Écosystème universitaire intéressant pour sciences du vivant, santé et industries associées.", sector: "Biotech", location: "Angers", dateLabel: "17 avr. 2023" },
  { slug: "master-formulation-data-mining-cergy", title: "Master formulation et data mining, Cergy", summary: "Programme hybride entre formulation, data et innovation produit.", sector: "Cosmétique", location: "Cergy", dateLabel: "17 avr. 2023" },
  { slug: "isipca-versailles", title: "ISIPCA", summary: "Référence pour parfum, cosmétique et aromatique alimentaire avec très forte lisibilité secteur.", sector: "Cosmétique", location: "Versailles", dateLabel: "17 avr. 2023" },
  { slug: "polytechnique", title: "École Polytechnique", summary: "Profils d’excellence pour deeptech, data, medtech, biotech et innovation scientifique.", sector: "MedTech", location: "Palaiseau", dateLabel: "17 avr. 2023" }
];

export const schools: ResourceItem[] = rawSchools.map((item) => {
  const href = item.href ?? schoolDirectory[item.slug];

  return {
    ...item,
    href,
    logoUrl: item.logoUrl ?? (href ? favicon(href) : undefined)
  };
});

export const institutionalPartners: ExternalResourceLink[] = [
  { name: "Business France", href: "https://www.businessfrance.fr/", summary: "Attractivité, export et accompagnement des entreprises françaises à l’international.", meta: "Partenaire institutionnel", logoUrl: favicon("https://www.businessfrance.fr/") },
  { name: "Conférence des DG de CHRU", href: "https://www.dg-chru.fr/la-conference/", summary: "Conférence des directeurs généraux de CHRU, interface importante entre hôpital, recherche et innovation.", meta: "Partenaire institutionnel", logoUrl: favicon("https://www.dg-chru.fr/") },
  { name: "La French Care", href: "https://lafrenchcare.fr/", summary: "Mouvement de rayonnement de l’excellence française en santé et innovation.", meta: "Partenaire institutionnel", logoUrl: favicon("https://lafrenchcare.fr/") }
];

export const financialPartners: ExternalResourceLink[] = [
  { name: "Angels Santé", href: "https://www.angelssante.fr/", summary: "Réseau de business angels spécialisé santé et biotech.", meta: "Partenaire financier", logoUrl: favicon("https://www.angelssante.fr/") },
  { name: "Next Innov - Banque Populaire", href: "https://www.banquepopulaire.fr/entreprises/next-innov/", summary: "Dispositif Banque Populaire dédié aux entreprises innovantes, avec ingénierie financière et réseau partenaires.", meta: "Partenaire financier", logoUrl: favicon("https://www.banquepopulaire.fr/entreprises/next-innov/") },
  { name: "Bpifrance", href: "https://www.bpifrance.fr/", summary: "Acteur clé du financement, de l’investissement et de l’accompagnement des entreprises innovantes.", meta: "Partenaire financier", logoUrl: favicon("https://www.bpifrance.fr/") },
  { name: "Euronext", href: "https://www.euronext.com/fr", summary: "Référence marchés financiers pour croissance, cotation et visibilité capital marchés.", meta: "Partenaire financier", logoUrl: favicon("https://www.euronext.com/fr") }
];

export const associationsAndNetworks: ExternalResourceLink[] = [
  { name: "Abidjanaises In Tech", href: "https://www.abidjanaisesintech.ci/", summary: "Réseau d’expertise et club d’affaires basé à Abidjan, dédié à l’inclusion, à l’excellence des femmes dans la tech et au développement de l’écosystème numérique en Côte d’Ivoire et en Afrique francophone.", meta: "Écosystème Afrique francophone", logoUrl: favicon("https://www.abidjanaisesintech.ci/") },
  { name: "Femmes de Santé", href: "https://www.femmesdesante.fr/", summary: "Réseau d’influence et de leadership dans la santé.", meta: "Réseau professionnel", logoUrl: favicon("https://www.femmesdesante.fr/") },
  { name: "FemTech France", href: "https://www.femtechfrance.org/", summary: "Association dédiée à l’innovation en santé des femmes.", meta: "Réseau professionnel", logoUrl: favicon("https://www.femtechfrance.org/") },
  { name: "France Deeptech", href: "https://www.francedeeptech.org/", summary: "Communauté qui rassemble les acteurs de la deeptech française.", meta: "Réseau professionnel", logoUrl: favicon("https://www.francedeeptech.org/") },
  { name: "France Digitale", href: "https://francedigitale.org/", summary: "Association d’entrepreneurs et d’investisseurs tech en France.", meta: "Réseau professionnel", logoUrl: favicon("https://francedigitale.org/") },
  { name: "French Healthcare", href: "https://frenchhealthcare.fr/", summary: "Initiative public-privé pour promouvoir les expertises françaises de santé à l’international.", meta: "Réseau professionnel", logoUrl: favicon("https://frenchhealthcare.fr/") },
  { name: "La French Tech", href: "https://lafrenchtech.gouv.fr/fr/", summary: "La Mission French Tech déploie les politiques publiques en faveur des start-up françaises, fédère l’écosystème et anime un réseau de Capitales et Communautés en France et à l’international.", meta: "Mission & réseau public", logoUrl: favicon("https://lafrenchtech.gouv.fr/fr/") },
  { name: "Leem", href: "https://www.leem.org/", summary: "Organisation professionnelle des entreprises du médicament en France.", meta: "Fédération", logoUrl: favicon("https://www.leem.org/") },
  { name: "MabDesign", href: "https://mabdesign.fr/", summary: "Réseau industriel et expert des biothérapies et biomédicaments.", meta: "Réseau professionnel", logoUrl: favicon("https://mabdesign.fr/") },
  { name: "MedTech in France", href: "https://www.medtechinfrance.fr/", summary: "Association des entreprises françaises des technologies médicales.", meta: "Association MedTech", logoUrl: favicon("https://www.medtechinfrance.fr/") },
  { name: "Resah", href: "https://www.resah.fr/", summary: "Réseau d’achats et de coopération pour les acteurs de santé.", meta: "Réseau professionnel", logoUrl: favicon("https://www.resah.fr/") },
  { name: "SNITEM", href: "https://www.snitem.fr/", summary: "Syndicat national de l’industrie des technologies médicales.", meta: "Fédération", logoUrl: favicon("https://www.snitem.fr/") },
  { name: "Start Industrie", href: "https://www.startindustrie.org/", summary: "Organisation représentative des startups et scale-ups industrielles françaises.", meta: "Réseau professionnel", logoUrl: favicon("https://www.startindustrie.org/") }
];

export const clustersAndIncubators: ExternalResourceLink[] = [
  { name: "ALLIS-NA", href: "https://allis-na.fr/", summary: "Alliance Innovation Santé Nouvelle-Aquitaine pour biotech, medtech, cosmétique et santé.", meta: "Pôle / Cluster", logoUrl: favicon("https://allis-na.fr/") },
  { name: "Atlanpole Biotherapies", href: "https://www.atlanpolebiotherapies.com/", summary: "Pôle de compétitivité santé du Grand Ouest: biothérapies, medtech, numérique santé.", meta: "Pôle / Cluster", logoUrl: favicon("https://www.atlanpolebiotherapies.com/") },
  { name: "BioValley France", href: "https://www.biovalley-france.com/", summary: "Cluster santé et innovations biotech / medtech du Grand Est.", meta: "Pôle / Cluster", logoUrl: favicon("https://www.biovalley-france.com/") },
  { name: "Clubster NSL", href: "https://www.clubster-nsl.com/", summary: "Pôle à l’interface nutrition, santé, longévité et innovation.", meta: "Pôle / Cluster", logoUrl: favicon("https://www.clubster-nsl.com/") },
  { name: "Enosis Santé", href: "https://enosis-sante.fr/", summary: "Alliance française des pôles santé réunissant BioValley, Eurobiomed, Lyonbiopole et Medicen.", meta: "Alliance de clusters", logoUrl: favicon("https://enosis-sante.fr/") },
  { name: "Eurobiomed", href: "https://www.eurobiomed.org/", summary: "Cluster santé du Sud et d’Occitanie, biotech, medtech et e-santé.", meta: "Pôle / Cluster", logoUrl: favicon("https://www.eurobiomed.org/") },
  { name: "Lyonbiopôle", href: "https://www.lyonbiopole.com/", summary: "Pôle de compétitivité santé en Auvergne-Rhône-Alpes.", meta: "Pôle / Cluster", logoUrl: favicon("https://www.lyonbiopole.com/") },
  { name: "Medicen Paris Region", href: "https://medicen.org/", summary: "Pôle de compétitivité santé de référence en Île-de-France.", meta: "Pôle / Cluster", logoUrl: favicon("https://medicen.org/") },
  { name: "Medicalps", href: "https://www.medicalps.eu/", summary: "Communauté des technologies de santé de l’arc alpin.", meta: "Cluster", logoUrl: favicon("https://www.medicalps.eu/") },
  { name: "Novéka", href: "https://noveka.org/", summary: "Cluster collaboratif dispositif médical et e-santé de Saint-Étienne.", meta: "Cluster", logoUrl: favicon("https://noveka.org/") },
  { name: "Paris Santé Campus", href: "https://parisantecampus.fr/", summary: "Campus et écosystème pour l’innovation en santé numérique.", meta: "Campus / Hub", logoUrl: favicon("https://parisantecampus.fr/") },
  { name: "PMT - Pôle des Microtechniques", href: "https://www.pmt-innovation.com/", summary: "Pôle de compétitivité autour des microtechniques, medtech et bioproduction.", meta: "Pôle / Cluster", logoUrl: favicon("https://www.pmt-innovation.com/") },
  { name: "Quest for Health", href: "https://questforhealth.eu/", summary: "Incubateur santé du Grand Est pour biotech, medtech et e-santé.", meta: "Incubateur", logoUrl: favicon("https://questforhealth.eu/") },
  { name: "SEMIA", href: "https://www.startup-semia.com/", summary: "Incubateur d’excellence du Grand Est avec filières santé, industrie et bioéconomie.", meta: "Incubateur", logoUrl: favicon("https://www.startup-semia.com/") },
  { name: "Wilco", href: "https://www.wilco-startup.com/", summary: "Accélérateur et communauté startup avec accompagnement à la croissance et au financement.", meta: "Incubateur / Accélérateur", logoUrl: favicon("https://www.wilco-startup.com/") }
];

export const mediaPartners: ExternalResourceLink[] = [
  { name: "Biotech Finances", href: "https://www.biotech-finances.com/", summary: "Média de référence sur financement, biotech et innovation santé.", meta: "Média", logoUrl: favicon("https://www.biotech-finances.com/") },
  { name: "Pharmaceutiques", href: "https://www.pharmaceutiques.com/", summary: "Média spécialisé pharma, industries de santé et innovation.", meta: "Média", logoUrl: favicon("https://www.pharmaceutiques.com/") }
];

export const veterinaryOfficialResources: ExternalResourceLink[] = [
  { name: "Tableau de l’Ordre des vétérinaires", href: "https://extranet.veterinaire.fr/annuaires/tableau-de-lordre", summary: "Annuaire officiel du tableau de l’Ordre des vétérinaires.", meta: "Source officielle", logoUrl: favicon("https://www.veterinaire.fr/") },
  { name: "Devenir vétérinaire", href: "https://www.veterinaire.fr/la-profession-veterinaire/devenir-veterinaire/les-ecoles", summary: "5 établissements forment des vétérinaires en France : 4 écoles publiques et 1 école privée.", meta: "Ordre national des vétérinaires", logoUrl: favicon("https://www.veterinaire.fr/") },
  { name: "Je suis jeune diplômé", href: "https://www.veterinaire.fr/je-suis-veterinaire/mon-exercice-professionnel/je-suis-jeune-diplome", summary: "Ressources Ordre pour les premières étapes professionnelles des jeunes diplômés vétérinaires.", meta: "Ordre national des vétérinaires", logoUrl: favicon("https://www.veterinaire.fr/") },
  { name: "Je suis étudiant vétérinaire", href: "https://www.veterinaire.fr/je-suis-veterinaire/mon-exercice-professionnel/je-suis-etudiant-veterinaire", summary: "Entrée officielle pour les étudiants vétérinaires sur le site de l’Ordre.", meta: "Ordre national des vétérinaires", logoUrl: favicon("https://www.veterinaire.fr/") },
  { name: "Les conditions d'exercice en France", href: "https://www.veterinaire.fr/je-suis-veterinaire/mon-exercice-professionnel/les-conditions-dexercice-en-france", summary: "Règles et conditions d’exercice en France pour les vétérinaires.", meta: "Ordre national des vétérinaires", logoUrl: favicon("https://www.veterinaire.fr/") },
  { name: "L'Observatoire des incivilités", href: "https://www.veterinaire.fr/je-suis-veterinaire/mon-exercice-professionnel/lobservatoire-des-incivilites", summary: "Ressource officielle sur les incivilités et les conduites à tenir.", meta: "Ordre national des vétérinaires", logoUrl: favicon("https://www.veterinaire.fr/") },
  { name: "L'entraide vétérinaire", href: "https://www.veterinaire.fr/je-suis-veterinaire/mon-exercice-professionnel/lentraide-au-sein-de-la-profession", summary: "Dispositifs d’entraide et d’accompagnement au sein de la profession vétérinaire.", meta: "Ordre national des vétérinaires", logoUrl: favicon("https://www.veterinaire.fr/") },
  { name: "L'exercice en société des associés vétérinaires", href: "https://www.veterinaire.fr/je-suis-veterinaire/mon-exercice-professionnel/lexercice-en-societe-des-associes-veterinaires", summary: "Réglementation professionnelle et exercice en société des associés vétérinaires.", meta: "Ordre national des vétérinaires", logoUrl: favicon("https://www.veterinaire.fr/") }
];

export const events: ResourceItem[] = [
  {
    slug: "france-biotech-medecine-nucleaire-riv-paris-sante-campus",
    title:
      "France Biotech : médecine nucléaire et radiothérapie interne vectorisée à PariSanté Campus",
    summary:
      "Événement France Biotech consacré aux enjeux, perspectives et à la structuration de la filière médecine nucléaire et RIV en France.",
    sector: "Médecine nucléaire",
    location: "Paris",
    dateLabel: "4 avril 2025",
    href: "https://france-biotech.fr/wp-content/uploads/2025/06/France-Biotech-CP-Etat-des-Lieux-med-nucleaire-VDEF-1.pdf"
  },
  {
    slug: "bpifrance-le-hub-ia-agentique-modele-operatoire",
    title: "Bpifrance Le Hub : IA agentique et modèle opératoire",
    summary:
      "Événement Le Hub sur l’IA agentique et la transformation des modèles opératoires des grands groupes.",
    sector: "Tech & Innovation",
    location: "Paris",
    dateLabel: "17 mars 2026",
    href: "https://lehub.bpifrance.fr/"
  },
  {
    slug: "bpifrance-le-hub-ia-au-feminin",
    title: "Bpifrance Le Hub : l’IA au féminin",
    summary:
      "Événement Le Hub consacré aux leviers concrets pour renforcer la parité dans la tech et l’IA.",
    sector: "Écosystème Tech",
    location: "Paris",
    dateLabel: "24 mars 2026",
    href: "https://lehub.bpifrance.fr/"
  },
  {
    slug: "bpifrance-le-hub-trend-up-tendances-tech",
    title: "Bpifrance Le Hub : Trend’Up, les tendances tech décryptées",
    summary:
      "Rendez-vous Le Hub pour suivre les signaux tech, innovation et croissance utiles aux dirigeants et DRH.",
    sector: "Tech & Innovation",
    location: "Paris",
    dateLabel: "31 mars 2026",
    href: "https://lehub.bpifrance.fr/"
  },
  {
    slug: "business-france-vie-webinaire-apec-france-travail",
    title: "Business France / V.I.E : webinaire avec l’APEC et France Travail",
    summary:
      "Webinaire digital Business France autour du dispositif V.I.E pour accélérer le recrutement et l’internationalisation.",
    sector: "International RH",
    location: "Digital",
    dateLabel: "12 janvier 2026",
    href: "https://vie.businessfrance.fr/evenements/2026-01-12/"
  },
  {
    slug: "business-france-vie-connect-2026",
    title: "Business France / V.I.E Connect 2026",
    summary:
      "Événement Business France dédié au recrutement international V.I.E, avec journée réseau à Paris et relais digital.",
    sector: "International RH",
    location: "Paris",
    dateLabel: "3 novembre 2026",
    href: "https://vie.businessfrance.fr/evenements/v-i-e-connect-2026/"
  },
  {
    slug: "centre-europeen-medecine-nucleaire-abidjan-annonce",
    title: "Abidjan : annonce du Centre européen de médecine nucléaire",
    summary:
      "Annonce institutionnelle du futur centre de médecine nucléaire d’Abidjan, présenté comme une première en Afrique de l’Ouest.",
    sector: "Médecine nucléaire",
    location: "Abidjan",
    dateLabel: "14 avril 2026",
    href: "https://dominiqueouattara.ci/"
  },
  { slug: "france-vet", title: "France Vet", summary: "Le rendez-vous des vétérinaires praticiens, réseaux et fournisseurs.", sector: "Animal Health", location: "Paris", dateLabel: "Juin 2026" },
  { slug: "forum-labo", title: "Forum Labo", summary: "Salon de référence pour laboratoires, instrumentation et diagnostic.", sector: "Diagnostic", location: "Paris", dateLabel: "Mars 2026" },
  { slug: "biofit", title: "BioFIT", summary: "Événement majeur pour partenariats biotech, licensing et innovation santé.", sector: "Biotech", location: "Lille", dateLabel: "Décembre 2026" },
  { slug: "jib", title: "JIB", summary: "Journées francophones de biologie clinique et innovation diagnostic.", sector: "Diagnostic", location: "Paris", dateLabel: "Novembre 2026" },
  { slug: "animal-health-innovation-europe", title: "Animal Health Innovation Europe", summary: "Écosystème investisseurs, startups et grands groupes santé animale.", sector: "Animal Health", location: "Londres", dateLabel: "Février 2026" },
  { slug: "nutrevent", title: "NutrEvent", summary: "Rencontres autour de la nutrition, biotech et santé préventive.", sector: "Life Sciences", location: "Lille", dateLabel: "Octobre 2026" },
  { slug: "medfit", title: "MEDFIT", summary: "Convention pour innovation medtech, diagnostic et collaborations.", sector: "Diagnostic", location: "Strasbourg", dateLabel: "Septembre 2026" },
  { slug: "bioproduction-congress", title: "Bioproduction Congress", summary: "Conférence dédiée aux bioprocédés, CMC et industrialisation.", sector: "Biotech", location: "Lyon", dateLabel: "Avril 2026" },
  { slug: "future-of-diagnostics-summit", title: "Future of Diagnostics Summit", summary: "Perspectives marché sur IA, diagnostic moléculaire et POCT.", sector: "Diagnostic", location: "Amsterdam", dateLabel: "Mai 2026" },
  { slug: "vet-nurse-congress", title: "Vet Nurse Congress", summary: "Événement ciblé sur les ASV, opérations cliniques et parcours care.", sector: "Vet Services", location: "Paris", dateLabel: "Octobre 2026" },
  { slug: "petfood-forum-europe", title: "Petfood Forum Europe", summary: "Innovation produit, formulation, supply chain et premiumisation.", sector: "Petfood", location: "Bruxelles", dateLabel: "Juin 2026" },
  { slug: "one-health-conference", title: "One Health Conference", summary: "Point de rencontre entre santé humaine, animale et data.", sector: "Life Sciences", location: "Lyon", dateLabel: "Novembre 2026" },
  { slug: "ngs-world", title: "NGS World", summary: "Conférence dédiée au séquençage, pipelines et applications cliniques.", sector: "Diagnostic", location: "Berlin", dateLabel: "Septembre 2026" },
  { slug: "immunotherapy-world", title: "Immunotherapy World", summary: "Panorama talents et innovation sur immunothérapie et cell therapy.", sector: "Biotech", location: "Boston", dateLabel: "Mai 2026" },
  { slug: "deeptech-founders-day", title: "DeepTech Founders Day", summary: "Rencontres fondateurs, talents et investisseurs deeptech.", sector: "Biotech", location: "Paris", dateLabel: "Janvier 2026" },
  { slug: "veterinary-group-leaders-forum", title: "Veterinary Group Leaders Forum", summary: "Forum pour dirigeants de groupes de cliniques vétérinaires.", sector: "Vet Services", location: "Madrid", dateLabel: "Avril 2026" },
  { slug: "animal-nutrition-summit", title: "Animal Nutrition Summit", summary: "Marché, formulation et innovation nutrition animale.", sector: "Petfood", location: "Barcelone", dateLabel: "Mars 2026" },
  { slug: "clinical-data-europe", title: "Clinical Data Europe", summary: "Données cliniques, RWE et trajectoires data en santé.", sector: "Diagnostic", location: "Copenhague", dateLabel: "Septembre 2026" },
  { slug: "regulatory-affairs-live", title: "Regulatory Affairs Live", summary: "Affaires réglementaires pour biotech, diagnostic et santé animale.", sector: "Life Sciences", location: "Paris", dateLabel: "Juillet 2026" },
  { slug: "petcare-brand-growth-summit", title: "Petcare Brand Growth Summit", summary: "Croissance de marques petcare et leadership marketing premium.", sector: "Petfood", location: "Milan", dateLabel: "Octobre 2026" },
  { slug: "vaccine-manufacturing-days", title: "Vaccine Manufacturing Days", summary: "Expertise process, qualité et talents industriels vaccins.", sector: "Medical Vet", location: "Tours", dateLabel: "Juin 2026" },
  { slug: "bioinformatics-recruitment-forum", title: "Bioinformatics Recruitment Forum", summary: "Marché emploi des bioinformaticiens et organisations data-driven.", sector: "Diagnostic", location: "Paris", dateLabel: "Décembre 2026" },
  { slug: "healthcare-ai-forum", title: "Healthcare AI Forum", summary: "Nouveaux rôles à l’interface IA, produit et validation clinique.", sector: "Diagnostic", location: "Lisbonne", dateLabel: "Mai 2026" },
  { slug: "executive-search-life-sciences-roundtable", title: "Executive Search Life Sciences Roundtable", summary: "Échanges dirigeants autour des recrutements critiques en life sciences.", sector: "Life Sciences", location: "Paris", dateLabel: "Février 2026" },
  { slug: "petfood-innovation-lab-day", title: "Petfood Innovation Lab Day", summary: "R&D, formulation, protéines alternatives et industrialisation petfood.", sector: "Petfood", location: "Lyon", dateLabel: "Novembre 2026" }
];

export const newsHubs: ResourceItem[] = [
  { slug: "mouvements-dirigeants-biotech", title: "Mouvements dirigeants biotech", summary: "Veille sur les nominations, promotions et mobilités dans les biotech et medtech.", sector: "Biotech" },
  { slug: "financements-series-a-b", title: "Financements et séries A/B", summary: "Suivre les tours de table qui annoncent des vagues de recrutement.", sector: "Life Sciences" },
  { slug: "consolidation-veterinaire", title: "Consolidation vétérinaire", summary: "Actualités sur les groupes de cliniques, acquisitions et intégrations.", sector: "Vet Services" },
  { slug: "tendances-petfood-premium", title: "Tendances petfood premium", summary: "Mouvements marché, innovation produit et croissance des marques premium.", sector: "Petfood" },
  { slug: "reglementation-diagnostic", title: "Réglementation diagnostic", summary: "Impacts réglementaires et organisationnels pour les acteurs du diagnostic.", sector: "Diagnostic" }
];
