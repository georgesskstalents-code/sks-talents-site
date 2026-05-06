import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"]
      }
    ],
    sitemap: [
      "https://www.skstalents.fr/sitemap.xml",
      "https://www.skstalents.fr/feed.xml"
    ],
    host: "https://www.skstalents.fr"
  };
}
