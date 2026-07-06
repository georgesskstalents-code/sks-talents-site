import { NextResponse } from "next/server";

/**
 * Video sitemap - Google-compatible XML format.
 * Referenced from robots.ts. Regenerated on each request (dynamic).
 *
 * Chaque entree video decrit :
 *   - la page de lecture (loc)
 *   - la video elle-meme (video:content_loc = URL Vimeo player)
 *   - vignette, titre, description, date, duree
 *
 * Add new videos here quand une nouvelle page hero video est publiee.
 */

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const BASE_URL = "https://www.skstalents.fr";
const VIMEO_ID = process.env.NEXT_PUBLIC_VIMEO_VIDEO_ID ?? process.env.VIMEO_VIDEO_ID ?? "851364422";

type VideoEntry = {
  pageUrl: string;
  title: string;
  description: string;
  vimeoId: string;
  durationSeconds: number;
  uploadDate: string;
};

const videos: VideoEntry[] = [
  {
    pageUrl: `${BASE_URL}/`,
    title: "SKS Talents - Executive search Life Sciences et Animal Health",
    description:
      "Presentation SKS Talents en video : cabinet d'executive search dedie aux biotech, diagnostic, medtech, veterinaire et petfood premium. Structuration RH pour scale-ups Series A a C.",
    vimeoId: VIMEO_ID,
    durationSeconds: 60,
    uploadDate: "2026-05-05T00:00:00Z"
  },
  {
    pageUrl: `${BASE_URL}/life-sciences/structuration-ia`,
    title: "Demo Agent CEO Copilot strategique - Life Sciences - SKS Talents",
    description:
      "Demo interactive de 30 secondes. Comment une CEO biotech Series B passe de 2 jours a 5 minutes de preparation board, et anticipe ses recrutements 6 mois a l'avance.",
    vimeoId: VIMEO_ID,
    durationSeconds: 30,
    uploadDate: "2026-05-05T00:00:00Z"
  },
  {
    pageUrl: `${BASE_URL}/animal-health/structuration-ia`,
    title: "Demo Agent CEO Copilot strategique - Animal Health - SKS Talents",
    description:
      "Demo interactive de 30 secondes. Comment un.e dirigeant.e de groupement veterinaire ou de scale-up Animal Health anticipe recrutements et structuration multi-sites.",
    vimeoId: VIMEO_ID,
    durationSeconds: 30,
    uploadDate: "2026-05-05T00:00:00Z"
  },
  {
    pageUrl: `${BASE_URL}/services/website`,
    title: "SKS Talents - Refonte site web et automatisation RH",
    description:
      "Video de presentation du service refonte de site web pour cabinets de recrutement Life Sciences et Animal Health, avec automatisation RH integree.",
    vimeoId: VIMEO_ID,
    durationSeconds: 45,
    uploadDate: "2026-05-05T00:00:00Z"
  }
];

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

function formatDuration(seconds: number): string {
  return `PT${seconds}S`;
}

function buildXml(): string {
  const entries = videos
    .map((v) => {
      const thumbnailUrl = `https://vumbnail.com/${v.vimeoId}.jpg`;
      const playerUrl = `https://player.vimeo.com/video/${v.vimeoId}`;
      return `  <url>
    <loc>${escapeXml(v.pageUrl)}</loc>
    <video:video>
      <video:thumbnail_loc>${escapeXml(thumbnailUrl)}</video:thumbnail_loc>
      <video:title>${escapeXml(v.title)}</video:title>
      <video:description>${escapeXml(v.description)}</video:description>
      <video:player_loc allow_embed="yes">${escapeXml(playerUrl)}</video:player_loc>
      <video:duration>${v.durationSeconds}</video:duration>
      <video:publication_date>${v.uploadDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
      <video:live>no</video:live>
    </video:video>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries}
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
