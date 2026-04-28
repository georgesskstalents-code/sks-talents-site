/** @type {import('next').NextConfig} */
const nextConfig = {
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
