/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "skstalents.fr" }],
        destination: "https://www.skstalents.fr/:path*",
        permanent: true
      },
      {
        source: "/job-roles/directeur-des-operations-learning-sante-animale",
        destination: "/job-roles/medical-vet-directeur-operations-learning",
        permanent: true
      },
      {
        source: "/blog/index-egalite-femmes-hommes-2026-obligations-employeurs",
        // Cible corrigee 2026-09-02 : l'ancienne destination n'existe pas dans
        // data/articles.ts, la redirection tombait sur un 404.
        destination: "/blog/aon-remuneration-life-sciences-2025-2026",
        permanent: true
      },
      {
        // Newsletter index moved to internal process (Copilot/Process/Newsletter-Production.md)
        // Individual editions /newsletter/[slug] remain public (not affected by this redirect).
        source: "/newsletter",
        destination: "/blog",
        permanent: true
      },
      {
        // Media kit page is internal/owner-facing only - not for visitors.
        source: "/media-kit",
        destination: "/press",
        permanent: true
      },
      {
        // Studies index page exposed CEO email + was SEO-bait. Individual study pages /studies/[slug] still work.
        source: "/studies",
        destination: "/blog",
        permanent: true
      },
      {
        // /rejoignez-nous masque: pas de missions affichees publiquement. Renvoie vers /job-roles (Fiches metiers).
        source: "/rejoignez-nous",
        destination: "/job-roles",
        permanent: true
      },
      // Wildcard : tout chemin /job-r%C3%B4les/{slug} (ancien lien indexable) to /job-roles/{slug}
      { source: "/job-r%C3%B4les/:slug*", destination: "/job-roles/:slug*", permanent: true },
      // Slugs accentes (causent 404 en prod) to ASCII. Genere 2026-05-12.
      { source: "/blog/diagnostic-ai-cyber-application-r%C3%B4les", destination: "/blog/diagnostic-ai-cyber-application-roles", permanent: true },
      { source: "/blog/medtech-maintenance-field-service-r%C3%B4les", destination: "/blog/medtech-maintenance-field-service-roles", permanent: true },
      { source: "/blog/cosm%C3%A9tique-formulation-safety-regulatory-r%C3%B4les", destination: "/blog/cosmetique-formulation-safety-regulatory-roles", permanent: true },
      { source: "/blog/animal-health-veterinary-leadership-r%C3%B4les", destination: "/blog/animal-health-veterinary-leadership-roles", permanent: true },
      { source: "/blog/petfood-rd-quality-manufacturing-r%C3%B4les", destination: "/blog/petfood-rd-quality-manufacturing-roles", permanent: true },
      { source: "/blog/crispr-gene-editing-r%C3%B4les", destination: "/blog/crispr-gene-editing-roles", permanent: true },
      { source: "/blog/ivd-testing-laboratory-r%C3%B4les", destination: "/blog/ivd-testing-laboratory-roles", permanent: true },
      { source: "/blog/devenir-v%C3%A9t%C3%A9rinaire-france", destination: "/blog/devenir-veterinaire-france", permanent: true },
      { source: "/blog/conditions-exercice-v%C3%A9t%C3%A9rinaire-france", destination: "/blog/conditions-exercice-veterinaire-france", permanent: true },
      { source: "/blog/aon-r%C3%A9mun%C3%A9ration-life-sciences-2025-2026", destination: "/blog/aon-remuneration-life-sciences-2025-2026", permanent: true },
      { source: "/blog/assurance-qualit%C3%A9-business-dev-salaires-healthtech", destination: "/blog/assurance-qualite-business-dev-salaires-healthtech", permanent: true },
      { source: "/blog/sterility-assurance-bioproduction-r%C3%B4les", destination: "/blog/sterility-assurance-bioproduction-roles", permanent: true },
      { source: "/blog/pharmacovigilance-sante-animale-r%C3%B4le", destination: "/blog/pharmacovigilance-sante-animale-role", permanent: true },
      { source: "/blog/talent-acquisition-emea-r%C3%B4les-penuriques", destination: "/blog/talent-acquisition-emea-roles-penuriques", permanent: true },
      { source: "/blog/quel-est-le-vrai-co%C3%BBt-mauvais-recrutement", destination: "/blog/quel-est-le-vrai-cout-mauvais-recrutement", permanent: true },
      { source: "/blog/aligner-recrutement-performance-strat%C3%A9gie-entreprise", destination: "/blog/aligner-recrutement-performance-strategie-entreprise", permanent: true },
      { source: "/blog/comment-structurer-equipes-forte-croissance-sans-exploser-co%C3%BBts-rh", destination: "/blog/comment-structurer-equipes-forte-croissance-sans-exploser-couts-rh", permanent: true },

      // Legacy WordPress URLs (causent 404 dans GSC). Ajout 2026-06-05.
      { source: "/qui_sommes-nous", destination: "/about", permanent: true },
      { source: "/contactez-nous", destination: "/contact", permanent: true },
      { source: "/legal/cgv-CGV", destination: "/legal/cgv", permanent: true },
      { source: "/legal/cgu-CGU", destination: "/legal/cgu", permanent: true },
      { source: "/orientation-Orientation", destination: "/orientation", permanent: true },
      { source: "/comparatifs-Comparatifs-m", destination: "/comparatifs", permanent: true },
      { source: "/blog-Articles-m", destination: "/blog", permanent: true },
      { source: "/offres_emploi", destination: "/job-roles", permanent: true },
      // Slugs job-roles obsoletes (GSC 404, jamais publies). Ajout 2026-07-06.
      { source: "/job-roles/veterinary-referral-coordinator", destination: "/job-roles", permanent: true },
      { source: "/job-roles/veterinary-hospital-operations-manager", destination: "/job-roles", permanent: true },
      { source: "/job-roles/biotech-procurement-manager-critical-materials", destination: "/job-roles", permanent: true },
      { source: "/references-Références", destination: "/references", permanent: true },
      { source: "/afrique", destination: "/", permanent: true },
      { source: "/seminaires", destination: "/events", permanent: true },
      { source: "/article", destination: "/blog", permanent: true },
      { source: "/faq_entreprises", destination: "/contact", permanent: true },
      { source: "/faq_candidats", destination: "/contact", permanent: true },
      { source: "/diagnostic-Diagnostic-m", destination: "/diagnostic", permanent: true },
      { source: "/politique_de_gestion_de_cookies", destination: "/legal/politique-cookies", permanent: true },
      { source: "/job_details/:slug", destination: "/job-roles", permanent: true },
      { source: "/fiche_metier/:slug", destination: "/job-roles", permanent: true },
      { source: "/fiche_salon_seminaire/:slug", destination: "/events", permanent: true },
      { source: "/flUW7AcgBiicCMqb4JgItuKPidWEQMIY0B9v9jLFYk=", destination: "/", permanent: true },
      { source: "/blogArticles", destination: "/blog", permanent: true },
      { source: "/lexique-life-sciences-rhLexique", destination: "/lexique-life-sciences-rh", permanent: true },
      { source: "/orientation-Orientation-m", destination: "/orientation", permanent: true },
      // Contenu /article/* legacy (WordPress) = supprime, hors positionnement.
      // On consolide vers l'index /blog : les anciens slugs (accents/apostrophes,
      // ex. agroindustrie-cote-d'ivoire) n'ont pas d'equivalent /blog/{slug} => re-404.
      // Ajuste 2026-07-06 (avant: -> /blog/:slug* qui renvoyait vers des slugs inexistants).
      { source: "/article/:slug*", destination: "/blog", permanent: true },

      // Sprint SKS Autonomous Cabinet v3 - Chantier 2 (Agent 1, 2026-08-26).
      // Slugs blog cites en interne dans plusieurs articles mais absents de data/articles.ts.
      // Cible : 0 URL 404. On redirige vers l'article existant le plus proche pour ne pas casser la lecture ni le SEO.
      {
        source: "/blog/cyber-ia-animal-health-cas-verifies",
        destination: "/blog/ot-cybersecurity-lab-medtech",
        permanent: true
      },
      {
        source: "/blog/panorama-life-sciences-2026",
        destination: "/blog/france-healthtech-2026-emploi-recrutement",
        permanent: true
      },
      {
        source: "/blog/salaires-biotech-france-2026",
        destination: "/blog/aon-remuneration-life-sciences-2025-2026",
        permanent: true
      },

      // Slugs job-roles cites en interne (articles.relatedRoles) mais absents de data/jobRoles.ts.
      // Redirect vers la fiche existante la plus proche, ou fallback /job-roles.
      {
        source: "/job-roles/biotech-assay-development-scientist",
        destination: "/job-roles/biotech-senior-scientist-arn-therapeutics",
        permanent: true
      },
      {
        source: "/job-roles/biotech-msat-engineer-single-use",
        destination: "/job-roles/biotech-msat-engineer",
        permanent: true
      },
      {
        source: "/job-roles/biotech-qa-release-manager",
        destination: "/job-roles/biotech-qa-batch-release-manager",
        permanent: true
      },
      {
        source: "/job-roles/diagnostic-clinical-affairs-project-manager",
        destination: "/job-roles/diagnostic-clinical-affairs-manager",
        permanent: true
      },
      {
        source: "/job-roles/diagnostic-field-service-engineer-africa",
        destination: "/job-roles/diagnostic-field-service-manager",
        permanent: true
      },
      {
        source: "/job-roles/diagnostic-hl7-interoperability-architect",
        destination: "/job-roles/diagnostic-data-engineer-clinical",
        permanent: true
      },
      {
        source: "/job-roles/diagnostic-installation-qualification-validation-engineer",
        destination: "/job-roles/diagnostic-service-operations-director",
        permanent: true
      },
      {
        source: "/job-roles/diagnostic-technical-support-scientist-molecular",
        destination: "/job-roles/diagnostic-customer-success-manager",
        permanent: true
      },
      {
        source: "/job-roles/medical-vet-customer-education-manager",
        destination: "/job-roles/medical-vet-commercial-training-manager",
        permanent: true
      },
      {
        source: "/job-roles/medical-vet-demand-planning-manager",
        destination: "/job-roles/medical-vet-supply-planning-lead",
        permanent: true
      },
      // 2026-09-02 : les redirects sur /job-roles/medical-vet-regulatory-affairs-manager
      // et /job-roles/petfood-regulatory-affairs-manager ont ete retires. Ces deux
      // fiches sont desormais reellement generees par data/jobRoles.ts et figurent
      // dans le sitemap : la redirection masquait une page valide.
      {
        source: "/job-roles/medical-vet-veterinary-rd-scientist",
        destination: "/job-roles",
        permanent: true
      },
      {
        source: "/job-roles/petfood-demand-planner",
        destination: "/job-roles/petfood-technical-services-manager",
        permanent: true
      },
      {
        source: "/job-roles/petfood-formulation-scientist",
        destination: "/job-roles/petfood-palatability-scientist",
        permanent: true
      },
      {
        source: "/job-roles/veterinary-practice-integration-manager",
        destination: "/job-roles/veterinary-clinic-operations-director",
        permanent: true
      },
      {
        source: "/job-roles/cross-sector-ai-quality-manager-health",
        destination: "/job-roles",
        permanent: true
      },
      {
        source: "/job-roles/cross-sector-health-data-governance-lead",
        destination: "/job-roles",
        permanent: true
      },

      // Sprint v3 fix-404-audit (Agent 2, 2026-08-27).
      // ChloeLiveWidget pointait vers /mentions-legales (source corrigee dans le composant).
      // Redirect defensif pour tout backlink externe ou bookmark ayant capture l'ancien lien.
      {
        source: "/mentions-legales",
        destination: "/legal/mentions-legales",
        permanent: true
      }
    ];
  },
  async headers() {
    const buildContentSecurityPolicy = ({ dashboard = false } = {}) =>
      [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      dashboard
        ? "frame-ancestors 'self' https://www.notion.so https://*.notion.so https://www.notion.site https://*.notion.site"
        : "frame-ancestors 'none'",
      "block-all-mixed-content",
      "upgrade-insecure-requests",
      "img-src 'self' data: blob: https://images.unsplash.com https://upload.wikimedia.org https://i.vimeocdn.com https://*.vimeocdn.com https://image.trustpilot.com https://fr.trustpilot.com https://widget.trustpilot.com https://www.google-analytics.com https://app.chatwoot.com https://www.google.com https://*.google.com https://*.googleusercontent.com https://logo.clearbit.com https://*.elfsight.com",
      `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com https://static.senja.io https://widget.trustpilot.com https://app.chatwoot.com https://translate.google.com https://translate.googleapis.com https://elfsightcdn.com https://*.elfsight.com https://plausible.io${
        dashboard ? " https://unpkg.com" : ""
      }`,
      `style-src 'self' 'unsafe-inline'${dashboard ? " https://fonts.googleapis.com" : ""}`,
      `font-src 'self' data: https://*.elfsight.com${dashboard ? " https://fonts.gstatic.com" : ""}`,
      "connect-src 'self' https://player.vimeo.com https://*.vimeo.com https://*.vimeocdn.com https://calendly.com https://assets.calendly.com https://fr.trustpilot.com https://widget.trustpilot.com https://static.senja.io https://www.google-analytics.com https://region1.google-analytics.com https://challenges.cloudflare.com https://app.chatwoot.com https://*.chatwoot.com wss://app.chatwoot.com wss://*.chatwoot.com https://translate.google.com https://translate.googleapis.com https://elfsightcdn.com https://*.elfsight.com https://plausible.io",
      "frame-src 'self' https://player.vimeo.com https://calendly.com https://assets.calendly.com https://challenges.cloudflare.com https://widget.trustpilot.com https://*.trustpilot.com https://*.senja.io https://app.chatwoot.com https://*.chatwoot.com https://translate.google.com https://*.elfsight.com",
      "form-action 'self' https://calendly.com"
    ].join("; ");

    const dashboardContentSecurityPolicy = buildContentSecurityPolicy({ dashboard: true });
    const contentSecurityPolicy = buildContentSecurityPolicy();

    const sharedHeaders = [
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin"
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff"
      },
      {
        key: "Cross-Origin-Resource-Policy",
        value: "same-site"
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(self), geolocation=()"
      },
      {
        key: "X-Permitted-Cross-Domain-Policies",
        value: "none"
      },
      {
        key: "X-DNS-Prefetch-Control",
        value: "off"
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload"
      }
    ];

    return [
      {
        source: "/dashboard/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: dashboardContentSecurityPolicy
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups"
          },
          ...sharedHeaders
        ]
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin"
          },
          ...sharedHeaders,
          {
            key: "X-Frame-Options",
            value: "DENY"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
