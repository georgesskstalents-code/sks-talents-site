export const dashboardDemoData = {
  client: {
    name: "SKS Talents",
    subtitle: "Executive search · Life Sciences & Animal Health",
    period: "20 mars - 20 avril 2026",
    comparedTo: "17 fév - 19 mars 2026"
  },

  kpis: [
    {
      id: "sessions",
      label: "Sessions",
      value: 184230,
      delta: +0.142,
      format: "number",
      spark: [62, 68, 71, 74, 72, 78, 81, 84, 88, 92, 96, 101, 108, 115, 122, 128, 134, 140, 146, 152, 158, 164, 170, 176, 178, 182, 184]
    },
    {
      id: "users",
      label: "Utilisateurs uniques",
      value: 126840,
      delta: +0.118,
      format: "number",
      spark: [48, 51, 54, 57, 58, 62, 65, 68, 71, 74, 77, 81, 85, 89, 93, 97, 101, 105, 109, 113, 116, 119, 121, 123, 124, 125, 126]
    },
    {
      id: "conversions",
      label: "Leads qualifiés",
      value: 3842,
      delta: +0.231,
      format: "number",
      spark: [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.9, 2.0, 2.2, 2.3, 2.5, 2.6, 2.8, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.7, 3.8, 3.8, 3.8, 3.84, 3.84]
    },
    {
      id: "revenue",
      label: "Pipeline influencé",
      value: 284920,
      delta: +0.186,
      format: "currency",
      spark: [110, 118, 125, 132, 140, 148, 156, 164, 172, 180, 188, 196, 204, 212, 220, 228, 236, 244, 252, 260, 268, 274, 278, 281, 283, 284, 285]
    },
    {
      id: "cpa",
      label: "Coût par lead",
      value: 42.3,
      delta: -0.094,
      format: "currency-dec",
      spark: [52, 51, 50, 50, 49, 49, 48, 48, 47, 47, 46, 46, 46, 45, 45, 44, 44, 44, 44, 43, 43, 43, 43, 42, 42, 42, 42],
      inverse: true
    },
    {
      id: "roas",
      label: "ROAS",
      value: 4.2,
      delta: +0.087,
      format: "multiple",
      spark: [3.4, 3.5, 3.5, 3.6, 3.6, 3.7, 3.7, 3.8, 3.8, 3.8, 3.9, 3.9, 3.9, 4.0, 4.0, 4.0, 4.1, 4.1, 4.1, 4.1, 4.1, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2]
    }
  ],

  dailySeries: [
    { d: "Mar 20", sessions: 5420, prev: 4810, conv: 118 },
    { d: "Mar 21", sessions: 5810, prev: 5020, conv: 124 },
    { d: "Mar 22", sessions: 4920, prev: 4410, conv: 102 },
    { d: "Mar 23", sessions: 6120, prev: 5340, conv: 138 },
    { d: "Mar 24", sessions: 6540, prev: 5610, conv: 142 },
    { d: "Mar 25", sessions: 6810, prev: 5820, conv: 151 },
    { d: "Mar 26", sessions: 7120, prev: 6040, conv: 158 },
    { d: "Mar 27", sessions: 6980, prev: 6120, conv: 148 },
    { d: "Mar 28", sessions: 5840, prev: 5210, conv: 122 },
    { d: "Mar 29", sessions: 5210, prev: 4810, conv: 108 },
    { d: "Mar 30", sessions: 6430, prev: 5580, conv: 134 },
    { d: "Mar 31", sessions: 7240, prev: 6210, conv: 162 },
    { d: "Apr 01", sessions: 7810, prev: 6540, conv: 174 },
    { d: "Apr 02", sessions: 8120, prev: 6810, conv: 182 },
    { d: "Apr 03", sessions: 8340, prev: 7020, conv: 188 },
    { d: "Apr 04", sessions: 7520, prev: 6540, conv: 164 },
    { d: "Apr 05", sessions: 6810, prev: 6020, conv: 142 },
    { d: "Apr 06", sessions: 7920, prev: 6810, conv: 178 },
    { d: "Apr 07", sessions: 8640, prev: 7240, conv: 194 },
    { d: "Apr 08", sessions: 8920, prev: 7410, conv: 204 },
    { d: "Apr 09", sessions: 9120, prev: 7620, conv: 212 },
    { d: "Apr 10", sessions: 9340, prev: 7810, conv: 218 },
    { d: "Apr 11", sessions: 8620, prev: 7320, conv: 192 },
    { d: "Apr 12", sessions: 7920, prev: 6940, conv: 174 },
    { d: "Apr 13", sessions: 9240, prev: 7810, conv: 214 },
    { d: "Apr 14", sessions: 9640, prev: 8020, conv: 226 },
    { d: "Apr 15", sessions: 9820, prev: 8120, conv: 232 }
  ],

  channels: [
    { id: "organic", name: "Recherche organique", sessions: 68420, share: 0.371, delta: +0.164, color: "accent" },
    { id: "direct", name: "Accès direct", sessions: 42180, share: 0.229, delta: +0.082, color: "ink" },
    { id: "social", name: "Réseaux sociaux", sessions: 31240, share: 0.17, delta: +0.241, color: "warm" },
    { id: "paid", name: "Recherche payante", sessions: 22840, share: 0.124, delta: +0.118, color: "cool" },
    { id: "referral", name: "Référents & backlinks", sessions: 12680, share: 0.069, delta: -0.032, color: "mute" },
    { id: "email", name: "E-mail", sessions: 6870, share: 0.037, delta: +0.054, color: "mute2" }
  ],

  seoKeywords: [
    { term: "cabinet recrutement biotech", pos: 3, prev: 6, vol: 12100, clicks: 2840, trend: [6, 6, 5, 5, 4, 4, 3, 3] },
    { term: "executive search life sciences", pos: 5, prev: 8, vol: 8800, clicks: 1920, trend: [9, 8, 8, 7, 7, 6, 5, 5] },
    { term: "benchmark salaire biotech", pos: 2, prev: 2, vol: 6200, clicks: 2140, trend: [2, 2, 2, 3, 2, 2, 2, 2] },
    { term: "recrutement santé animale", pos: 8, prev: 14, vol: 5400, clicks: 640, trend: [14, 13, 12, 11, 10, 9, 9, 8] },
    { term: "sks talents", pos: 1, prev: 1, vol: 4800, clicks: 3820, trend: [1, 1, 1, 1, 1, 1, 1, 1] },
    { term: "cabinet recrutement diagnostic", pos: 4, prev: 7, vol: 4100, clicks: 1120, trend: [8, 7, 7, 6, 5, 5, 4, 4] },
    { term: "rpo life sciences", pos: 11, prev: 18, vol: 3600, clicks: 320, trend: [18, 17, 16, 15, 14, 13, 12, 11] },
    { term: "talent advisory biotech", pos: 6, prev: 9, vol: 2900, clicks: 420, trend: [10, 9, 9, 8, 7, 7, 6, 6] }
  ],

  seoPositionBuckets: [
    { bucket: "1-3", count: 142, prev: 118 },
    { bucket: "4-10", count: 284, prev: 246 },
    { bucket: "11-20", count: 318, prev: 342 },
    { bucket: "21-50", count: 612, prev: 684 },
    { bucket: "51+", count: 428, prev: 472 }
  ],

  conversions: [
    { id: "call", name: "Call réservé", count: 1842, value: 184200, delta: +0.284 },
    { id: "callback", name: "Rappel demandé", count: 984, value: 0, delta: +0.142 },
    { id: "newsletter", name: "Inscription newsletter", count: 624, value: 0, delta: +0.068 },
    { id: "study", name: "Téléchargement livre blanc", count: 292, value: 0, delta: +0.318 },
    { id: "orientation", name: "Orientation / mini-formation", count: 100, value: 100720, delta: +0.214 }
  ],

  funnel: [
    { stage: "Site visité", count: 184230 },
    { stage: "Page service consultée", count: 82640 },
    { stage: "Article ou étude ouverte", count: 38420 },
    { stage: "Formulaire démarré", count: 7840 },
    { stage: "Lead qualifié", count: 3842 }
  ],

  topPages: [
    { path: "/", title: "Accueil", sessions: 42180, avgTime: 142, bounce: 0.34, convRate: 0.028 },
    { path: "/services", title: "Services", sessions: 28640, avgTime: 218, bounce: 0.22, convRate: 0.041 },
    {
      path: "/studies/recrutement-life-sciences-animal-health-2026",
      title: "Étude signature 2026",
      sessions: 18920,
      avgTime: 284,
      bounce: 0.18,
      convRate: 0.062
    },
    {
      path: "/blog/deeptech-startup-talent-war",
      title: "DeepTech Startup Talent War",
      sessions: 14240,
      avgTime: 246,
      bounce: 0.21,
      convRate: 0.048
    },
    {
      path: "/salary-benchmarks",
      title: "Benchmarks salaires",
      sessions: 11820,
      avgTime: 194,
      bounce: 0.28,
      convRate: 0.038
    },
    {
      path: "/orientation",
      title: "Orientation & mini-formation",
      sessions: 9640,
      avgTime: 312,
      bounce: 0.16,
      convRate: 0.071
    },
    {
      path: "/contact",
      title: "Contact",
      sessions: 7840,
      avgTime: 198,
      bounce: 0.12,
      convRate: 0.142
    },
    { path: "/references", title: "Références", sessions: 6420, avgTime: 124, bounce: 0.42, convRate: 0.014 },
    { path: "/newsletter", title: "Newsletter", sessions: 4820, avgTime: 168, bounce: 0.38, convRate: 0.022 }
  ],

  paidCampaigns: [
    { name: "Marque - SKS Talents", channel: "Google Ads", spend: 8420, clicks: 4820, conv: 184, roas: 6.8, delta: +0.124 },
    { name: "Non-brand - cabinet recrutement biotech", channel: "Google Ads", spend: 12840, clicks: 6420, conv: 142, roas: 3.2, delta: +0.082 },
    { name: "Retargeting études & livres blancs", channel: "Meta", spend: 6840, clicks: 8240, conv: 98, roas: 4.1, delta: +0.214 },
    { name: "Notoriété marque - dirigeant RH", channel: "Meta", spend: 5210, clicks: 12640, conv: 62, roas: 2.8, delta: -0.042 },
    { name: "LinkedIn - dirigeants Life Sciences", channel: "LinkedIn", spend: 4180, clicks: 2120, conv: 42, roas: 5.2, delta: +0.168 },
    { name: "YouTube - lecture marché", channel: "YouTube", spend: 2840, clicks: 3820, conv: 24, roas: 1.8, delta: +0.318 }
  ],

  geo: [
    { code: "US", name: "États-Unis", sessions: 84620, share: 0.459, intensity: 1.0 },
    { code: "GB", name: "Royaume-Uni", sessions: 18240, share: 0.099, intensity: 0.62 },
    { code: "CA", name: "Canada", sessions: 14820, share: 0.08, intensity: 0.54 },
    { code: "FR", name: "France", sessions: 11240, share: 0.061, intensity: 0.44 },
    { code: "AU", name: "Australia", sessions: 9840, share: 0.053, intensity: 0.38 },
    { code: "DE", name: "Allemagne", sessions: 8420, share: 0.046, intensity: 0.33 },
    { code: "AE", name: "UAE", sessions: 6840, share: 0.037, intensity: 0.28 },
    { code: "JP", name: "Japon", sessions: 5420, share: 0.029, intensity: 0.22 },
    { code: "BR", name: "Brésil", sessions: 4820, share: 0.026, intensity: 0.2 },
    { code: "IN", name: "Inde", sessions: 3840, share: 0.021, intensity: 0.16 }
  ],

  notes: [
    {
      date: "Apr 14",
      author: "Équipe Strategy",
      tag: "Lancement",
      title: "La newsletter SKS est prête à être industrialisée",
      body: "Deux créneaux éditoriaux mensuels sont en place. Il reste à brancher l’inscription, l’archive consultable et la séquence d’accueil pour transformer l’autorité éditoriale en leads plus réguliers."
    },
    {
      date: "Apr 08",
      author: "Équipe SEO",
      tag: "Gain",
      title: "Le bloc salaire / benchmark attire une intention très chaude",
      body: "Les recherches liées aux benchmarks salaires, aux fiches métiers et aux comparatifs montrent la meilleure densité d’intention. Ces zones doivent rester des portes d’entrée prioritaires vers call, rappel et livres blancs."
    },
    {
      date: "Apr 02",
      author: "Équipe Paid",
      tag: "Risque",
      title: "Le paid non-brand doit rester piloté par les pages les plus utiles",
      body: "Le trafic froid doit être orienté vers les pages qui rassurent vraiment : étude signature, services, benchmarks et orientation. Sinon le coût par lead remonte sans améliorer la qualité des prises de contact."
    },
    {
      date: "Mar 26",
      author: "Équipe Strategy",
      tag: "Insight",
      title: "Les contenus éditoriaux préparent mieux la vente que la home seule",
      body: "Les visiteurs qui lisent un article, une étude ou un comparatif avant de contacter SKS arrivent mieux qualifiés. L’enjeu n’est plus seulement d’attirer : il faut faire avancer chaque profil dans un tunnel plus clair."
    }
  ]
};

export type DashboardDemoData = typeof dashboardDemoData;
