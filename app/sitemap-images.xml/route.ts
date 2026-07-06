import { NextResponse } from "next/server";
import { articles } from "@/data/articles";
import { heroImageCatalog, getEditorialHeroImage } from "@/lib/editorialHeroImage";

/**
 * Image sitemap - Google-compatible XML format.
 * Referenced from robots.ts. Cached 1h.
 *
 * Chaque entree URL liste la page + ses images clefs (hero editorial pour
 * articles, brand logos pour homepage). Google associe ensuite chaque image
 * a la page ou elle apparait pour Google Images.
 *
 * Google Images best-practices :
 *   - image:loc = URL absolue de l'image
 *   - image:caption = alt text descriptif (contexte)
 *   - image:title = titre de la page ou de l'image
 */

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const BASE_URL = "https://www.skstalents.fr";

type ImageRef = {
  loc: string;
  caption?: string;
  title?: string;
};

type UrlEntry = {
  pageUrl: string;
  images: ImageRef[];
};

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

function toAbsolute(src: string): string {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return `${BASE_URL}${src.startsWith("/") ? "" : "/"}${src}`;
}

function buildEntries(): UrlEntry[] {
  const entries: UrlEntry[] = [];

  // 1. Home page - brand logo + hero background
  entries.push({
    pageUrl: `${BASE_URL}/`,
    images: [
      {
        loc: `${BASE_URL}/brand/logo-sks-talents.svg`,
        caption: "Logo SKS Talents - cabinet d'executive search Life Sciences et Animal Health",
        title: "SKS Talents"
      },
      {
        loc: `${BASE_URL}/opengraph-image`,
        caption: "SKS Talents - Executive search Life Sciences et Animal Health, structuration RH pour scale-ups",
        title: "SKS Talents"
      }
    ]
  });

  // 2. About and other key branded pages
  const brandedPages = ["/about", "/services", "/references", "/press"];
  for (const p of brandedPages) {
    entries.push({
      pageUrl: `${BASE_URL}${p}`,
      images: [
        {
          loc: `${BASE_URL}/brand/logo-sks-talents.svg`,
          caption: "Logo SKS Talents",
          title: "SKS Talents"
        }
      ]
    });
  }

  // 3. Editorial hero catalog - one representative page (blog index)
  const catalogImages: ImageRef[] = [];
  const seenSrcs = new Set<string>();
  for (const key of Object.keys(heroImageCatalog)) {
    const img = heroImageCatalog[key];
    if (seenSrcs.has(img.src)) continue;
    seenSrcs.add(img.src);
    catalogImages.push({
      loc: toAbsolute(img.src),
      caption: img.alt,
      title: "SKS Talents - Bibliotheque editoriale"
    });
  }
  entries.push({
    pageUrl: `${BASE_URL}/blog`,
    images: catalogImages
  });

  // 4. Each article page with its hero image (from getEditorialHeroImage)
  for (const article of articles) {
    if (!article.slug) continue;
    try {
      const hero = getEditorialHeroImage({
        slug: article.slug,
        title: article.title,
        topicLabel: article.topic,
        verticalLabel: article.vertical
      });
      if (!hero || !hero.src) continue;
      entries.push({
        pageUrl: `${BASE_URL}/blog/${article.slug}`,
        images: [
          {
            loc: toAbsolute(hero.src),
            caption: hero.alt || article.title,
            title: article.title
          }
        ]
      });
    } catch {
      // Skip on failure - keep sitemap generation robust.
    }
  }

  return entries;
}

function buildXml(): string {
  const entries = buildEntries();
  const urls = entries
    .map((entry) => {
      const images = entry.images
        .map((img) => {
          const caption = img.caption ? `\n      <image:caption>${escapeXml(img.caption)}</image:caption>` : "";
          const title = img.title ? `\n      <image:title>${escapeXml(img.title)}</image:title>` : "";
          return `    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>${caption}${title}
    </image:image>`;
        })
        .join("\n");
      return `  <url>
    <loc>${escapeXml(entry.pageUrl)}</loc>
${images}
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
}

export async function GET() {
  const xml = buildXml();
  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600"
    }
  });
}
