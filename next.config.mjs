/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  },
  async headers() {
    const contentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "block-all-mixed-content",
      "upgrade-insecure-requests",
      "img-src 'self' data: blob: https://images.unsplash.com https://i.vimeocdn.com https://*.vimeocdn.com https://image.trustpilot.com https://fr.trustpilot.com https://widget.trustpilot.com https://www.google-analytics.com",
      "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com https://static.senja.io https://widget.trustpilot.com",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "connect-src 'self' https://player.vimeo.com https://*.vimeo.com https://*.vimeocdn.com https://calendly.com https://assets.calendly.com https://fr.trustpilot.com https://widget.trustpilot.com https://static.senja.io https://www.google-analytics.com https://region1.google-analytics.com https://challenges.cloudflare.com",
      "frame-src 'self' https://player.vimeo.com https://calendly.com https://assets.calendly.com https://challenges.cloudflare.com https://widget.trustpilot.com https://*.trustpilot.com https://*.senja.io",
      "form-action 'self' https://calendly.com"
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin"
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
        ]
      }
    ];
  }
};

export default nextConfig;
