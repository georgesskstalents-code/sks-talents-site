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
        source: "/job-roles/directeur-des-operations-learning-sante-animale",
        destination: "/job-roles/medical-vet-directeur-operations-learning",
        permanent: true
      },
      {
        source: "/blog/index-egalite-femmes-hommes-2026-obligations-employeurs",
        destination: "/blog/egalite-remuneration-femmes-hommes-obligations-employeurs-france-2026",
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
      { source: "/blog/comment-structurer-equipes-forte-croissance-sans-exploser-co%C3%BBts-rh", destination: "/blog/comment-structurer-equipes-forte-croissance-sans-exploser-couts-rh", permanent: true }
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
      `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com https://static.senja.io https://widget.trustpilot.com https://app.chatwoot.com https://translate.google.com https://translate.googleapis.com https://elfsightcdn.com https://*.elfsight.com${
        dashboard ? " https://unpkg.com" : ""
      }`,
      `style-src 'self' 'unsafe-inline'${dashboard ? " https://fonts.googleapis.com" : ""}`,
      `font-src 'self' data: https://*.elfsight.com${dashboard ? " https://fonts.gstatic.com" : ""}`,
      "connect-src 'self' https://player.vimeo.com https://*.vimeo.com https://*.vimeocdn.com https://calendly.com https://assets.calendly.com https://fr.trustpilot.com https://widget.trustpilot.com https://static.senja.io https://www.google-analytics.com https://region1.google-analytics.com https://challenges.cloudflare.com https://app.chatwoot.com https://*.chatwoot.com wss://app.chatwoot.com wss://*.chatwoot.com https://translate.google.com https://translate.googleapis.com https://elfsightcdn.com https://*.elfsight.com",
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
        value: "camera=(), microphone=(), geolocation=()"
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
