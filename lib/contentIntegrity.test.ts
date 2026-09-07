import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { articles } from "@/data/articles";
import { jobRoles } from "@/data/jobRoles";
import { orientationRecommendations } from "@/data/orientationAgent";
import { schools } from "@/data/resources";
import { getDanglingManualAliases } from "@/lib/jobRoleAliases";

/**
 * Garde-fou d'integrite du contenu.
 *
 * Origine : le 2026-08-25, un lot de 8 articles a ete insere APRES la fermeture
 * du tableau `articles` de data/articles.ts, a l'interieur du corps d'une
 * fonction. Le fichier compilait, `npx next build` sortait en exit 0, et les 8
 * articles etaient pourtant invisibles du site pendant deux semaines.
 *
 * Deuxieme incident, trouve par crawl le 2026-09-07 : trois `jobRoleSlug` de
 * data/orientationAgent.ts ne correspondaient a aucune fiche. Le composant
 * OrientationAgent construit son lien par interpolation directe
 * (`/job-roles/${recommendation.jobRoleSlug}`) sans verifier la cible, donc
 * chaque visiteur qui terminait le quiz recevait un lien vers une 404. Le crawl
 * du sitemap ne pouvait pas le voir : ces liens n'apparaissent qu'apres une
 * interaction cote client.
 *
 * Regle generale : toute reference d'un jeu de donnees vers un autre doit se
 * resoudre, et tout tableau de contenu doit rester un tableau d'objets.
 */

const articleSlugs = new Set(articles.map((article) => article.slug));
const jobRoleSlugs = new Set(jobRoles.map((role) => role.slug));
const schoolSlugs = new Set(schools.map((school) => school.slug));

describe("integrite des tableaux de contenu", () => {
  it("articles ne contient que des objets Article", () => {
    const intruders = articles.filter(
      (entry) => typeof entry !== "object" || entry === null || typeof entry.slug !== "string"
    );
    expect(intruders).toEqual([]);
  });

  it("jobRoles ne contient que des objets JobRole", () => {
    const intruders = jobRoles.filter(
      (entry) => typeof entry !== "object" || entry === null || typeof entry.slug !== "string"
    );
    expect(intruders).toEqual([]);
  });

  it("aucun slug d'article n'est duplique", () => {
    expect(articleSlugs.size).toBe(articles.length);
  });

  it("aucun slug de fiche metier n'est duplique", () => {
    expect(jobRoleSlugs.size).toBe(jobRoles.length);
  });
});

describe("references croisees de l'agent d'orientation", () => {
  it("chaque jobRoleSlug pointe vers une fiche metier existante", () => {
    const dangling = orientationRecommendations
      .filter((reco) => !jobRoleSlugs.has(reco.jobRoleSlug))
      .map((reco) => `${reco.slug} -> /job-roles/${reco.jobRoleSlug}`);
    expect(dangling).toEqual([]);
  });

  it("chaque articleSlug pointe vers un article existant", () => {
    const dangling = orientationRecommendations.flatMap((reco) =>
      reco.articleSlugs
        .filter((slug) => !articleSlugs.has(slug))
        .map((slug) => `${reco.slug} -> /blog/${slug}`)
    );
    expect(dangling).toEqual([]);
  });

  it("chaque ecole citee existe dans le catalogue", () => {
    const dangling = orientationRecommendations.flatMap((reco) =>
      reco.schools
        .filter((slug) => !schoolSlugs.has(slug))
        .map((slug) => `${reco.slug} -> /schools/${slug}`)
    );
    expect(dangling).toEqual([]);
  });
});

describe("alias de fiches metiers", () => {
  it("aucun alias manuel ne pointe vers une cible inexistante", () => {
    // Note : une cible servie par Notion n'est pas dans data/jobRoles.ts. Le
    // helper ne verifie que le referentiel statique, il sert de signal, pas de
    // preuve d'une 404. Les cibles dynamiques connues sont tolerees ici.
    const knownDynamicTargets = new Set([
      "medical-vet-sales-director",
      "medical-vet-regulatory-affairs-manager"
    ]);
    const dangling = getDanglingManualAliases().filter(
      (entry) => !knownDynamicTargets.has(entry.split(" -> ")[1] ?? "")
    );
    expect(dangling).toEqual([]);
  });
});

/**
 * Le bug d'origine : le 2026-08-25, 8 articles ont ete inseres APRES la
 * fermeture du tableau `articles`, dans le corps d'une fonction. Le fichier
 * compilait, `next build` sortait en exit 0, et les 8 articles etaient
 * invisibles du site pendant deux semaines. On compare donc les slugs ecrits
 * dans le fichier source aux slugs reellement exposes.
 */
describe("slugs ecrits hors du tableau exporte", () => {
  function declaredSlugs(relativePath: string) {
    const source = readFileSync(join(__dirname, "..", relativePath), "utf-8");
    return [...source.matchAll(/^ {4}slug: "([^"]+)"/gm)].map((m) => m[1]);
  }

  it("tout article ecrit dans data/articles.ts est expose", () => {
    const exposed = new Set(articles.map((a) => a.slug));
    const orphans = declaredSlugs("data/articles.ts").filter((slug) => !exposed.has(slug));
    expect(
      orphans,
      "Ces articles existent dans le fichier mais pas dans le tableau exporte : ils sont ecrits en dehors du tableau et le site les servira en 404."
    ).toEqual([]);
  });

  it("toute fiche ecrite dans data/jobRoles.ts est exposee", () => {
    const exposed = new Set(jobRoles.map((r) => r.slug));
    const orphans = declaredSlugs("data/jobRoles.ts").filter((slug) => !exposed.has(slug));
    expect(orphans).toEqual([]);
  });
});

/**
 * Les liens ecrits dans le contenu markdown des articles ne sont pas typees :
 * rien n'empeche de citer un slug qui n'existe pas. C'est ce qui envoyait les
 * lecteurs sur une 404 depuis des articles publies.
 */
describe("liens internes cites dans le contenu publie", () => {
  const nextConfig = readFileSync(join(__dirname, "..", "next.config.mjs"), "utf-8");
  const redirectSources = new Set(
    [...nextConfig.matchAll(/source:\s*"([^"]+)"/g)].map((m) => m[1])
  );
  const haystack = articles
    .map((a) => [a.content, JSON.stringify(a.internalLinks ?? [])].join("\n"))
    .join("\n");

  it("ne cite aucun article inexistant", () => {
    const exposed = new Set(articles.map((a) => a.slug));
    const referenced = new Set([...haystack.matchAll(/\/blog\/([a-z0-9-]+)/g)].map((m) => m[1]));
    const broken = [...referenced].filter(
      (slug) => !exposed.has(slug) && !redirectSources.has(`/blog/${slug}`)
    );
    expect(
      broken,
      "Slugs cites dans le contenu publie, inexistants et couverts par aucune redirection."
    ).toEqual([]);
  });
});
