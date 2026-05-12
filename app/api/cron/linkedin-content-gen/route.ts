/**
 * Cron dimanche 18h UTC : genere 5 posts LinkedIn pour la semaine a venir.
 * Pioche dans la veille sectorielle accumulee (Supabase linkedin_veille) + connaissance metier
 * pour generer 3 posts perso + 2 posts page entreprise.
 *
 * Outputs : insertions dans la DB Notion "LinkedIn Queue Validation" pour validation CEO lundi matin.
 * Modele : claude-sonnet-4-20250514 (qualite editoriale > vitesse).
 */
import { NextResponse } from "next/server";
import { noStoreJson } from "@/lib/requestSecurity";
import { isAuthorizedCronRequest } from "@/lib/cronAuth";
import { createPage } from "@/lib/notionClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

type VeilleItem = {
  title: string;
  url: string;
  summary: string;
  source: string;
  category?: string;
};

async function fetchRecentVeille(): Promise<VeilleItem[]> {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  try {
    const response = await fetch(
      `${url}/rest/v1/linkedin_veille?detected_at=gte.${encodeURIComponent(since)}&status=eq.nouveau&limit=20&select=title,url,summary,source,category`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: "no-store" }
    );
    if (!response.ok) return [];
    return (await response.json()) as VeilleItem[];
  } catch {
    return [];
  }
}

type GeneratedPost = {
  pillar: "marche" | "metier" | "conseil" | "cas-concret" | "prise-position";
  network: "profile" | "page";
  format: "texte" | "carousel" | "video" | "repost";
  angle: string;
  brief: string;
};

async function generatePostsViaClaude(veille: VeilleItem[]): Promise<GeneratedPost[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return [];
  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514";

  const veilleSummary = veille
    .slice(0, 10)
    .map((v, i) => `${i + 1}. [${v.source}] ${v.title} - ${v.summary.slice(0, 200)}`)
    .join("\n");

  const systemPrompt = `Tu es l'expert contenu LinkedIn de Georges Kengue, fondateur de SKS Talents (cabinet executive search Life Sciences & Sante animale en France).

Tu produis chaque semaine 5 angles de posts LinkedIn calibres :
- 3 posts profil perso Georges (lundi insight marche, mercredi cas concret, vendredi prise de position)
- 2 posts page entreprise SKS Talents (mardi relais marche, jeudi cas anonymise)

Pillars de contenu :
- marche : tendances Life Sciences / Animal Health avec data
- metier : recrutement C-level (Head of CMC, VP Sales biotech, etc.)
- conseil : structuration CODIR, timing recrutements
- cas-concret : missions SKS anonymisees ("comment on a clos un VP Sales en 12 jours")
- prise-position : controverse, contre-intuitif

REGLES STRICTES :
- Pas d'em-dashes (—) ou en-dashes (–). Toujours hyphen (-).
- Chiffres verifiables uniquement (pas d'invention).
- Ton direct, factuel, premium. Pas d'emoji.
- Format de sortie : JSON array de 5 objets avec champs : pillar, network ('profile'|'page'), format ('texte'|'carousel'|'video'|'repost'), angle (titre court), brief (3 phrases describing the angle + hook + chiffre cle).`;

  const userPrompt = `Voici la veille sectorielle de la semaine (${veille.length} items) :

${veilleSummary || "(aucune veille disponible cette semaine - genere a partir des piliers metier sans actu specifique)"}

Produit le JSON des 5 posts pour la semaine prochaine. Reponse uniquement le JSON array, rien d'autre.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        max_tokens: 2000,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }]
      }),
      cache: "no-store"
    });
    if (!response.ok) {
      console.error("Claude generation failed", response.status, await response.text().catch(() => ""));
      return [];
    }
    const data = (await response.json()) as { content?: Array<{ type?: string; text?: string }> };
    const text = (data.content ?? [])
      .filter((b) => b.type === "text")
      .map((b) => b.text ?? "")
      .join("\n");

    // Extraire le JSON (Claude peut wrapper dans ```json ... ```)
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return [];
    const parsed = JSON.parse(jsonMatch[0]) as GeneratedPost[];
    return parsed.filter((p) => p.pillar && p.network && p.angle && p.brief);
  } catch (err) {
    console.error("Content gen error", err);
    return [];
  }
}

export async function GET(request: Request) {
  const authorized = isAuthorizedCronRequest({
    authorization: request.headers.get("authorization"),
    userAgent: request.headers.get("user-agent"),
    url: request.url,
    env: {
      cronSecret: process.env.CRON_SECRET,
      dashboardToken: process.env.DASHBOARD_PRIVATE_TOKEN
    }
  });
  if (!authorized) {
    return noStoreJson({ ok: false, message: "Unauthorized" }, 401);
  }

  // 1) Recupere la veille recente
  const veille = await fetchRecentVeille();

  // 2) Genere 5 posts via Claude
  const posts = await generatePostsViaClaude(veille);
  if (posts.length === 0) {
    return NextResponse.json({
      ok: false,
      message: "Aucun post genere - verifier ANTHROPIC_API_KEY et logs",
      veilleCount: veille.length
    });
  }

  // 3) Inserer dans Notion Queue Validation
  const notionDbId = process.env.NOTION_DB_POSTS_QUEUE;
  if (!notionDbId) {
    return NextResponse.json({
      ok: false,
      message: "NOTION_DB_POSTS_QUEUE missing",
      postsGenerated: posts.length
    });
  }

  const dueDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const errors: string[] = [];
  let inserted = 0;
  for (const post of posts) {
    try {
      await createPage(notionDbId, {
        "Item à valider": { type: "title", value: post.angle },
        "Contenu": { type: "rich_text", value: post.brief },
        "Type": { type: "select", value: post.format },
        "Agent producteur": { type: "select", value: `claude-${post.network}` },
        "Statut": { type: "status", value: "À valider" },
        "Date limite": { type: "date", value: dueDate }
      });
      inserted += 1;
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }

  return NextResponse.json({
    ok: errors.length === 0,
    veilleCount: veille.length,
    postsGenerated: posts.length,
    insertedInNotion: inserted,
    errors
  });
}
