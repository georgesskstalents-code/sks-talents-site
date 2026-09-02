import { describe, expect, it } from "vitest";
import { articles } from "@/data/articles";
import { jobRoles } from "@/data/jobRoles";
import { schools } from "@/data/resources";
import {
  getDanglingManualAliases,
  getJobRoleAliases,
  MANUAL_JOB_ROLE_ALIASES
} from "@/lib/jobRoleAliases";
import {
  resolveArticleSlug,
  resolveJobRoleSlug,
  resolveSchoolSlug
} from "@/lib/slugRescueRegistry";
import { canonicalize, normalizeSlug, rankCandidates } from "@/lib/slugRescue";

describe("normalizeSlug", () => {
  it("aplatit casse, accents et separateurs", () => {
    expect(normalizeSlug("Key Account Manager Santé Animale")).toBe(
      "key-account-manager-sante-animale"
    );
    expect(normalizeSlug("devenir-vétérinaire--france")).toBe("devenir-veterinaire-france");
  });

  it("decode les slugs percent-encodes", () => {
    expect(normalizeSlug("devenir-v%C3%A9t%C3%A9rinaire-france")).toBe(
      "devenir-veterinaire-france"
    );
  });
});

describe("canonicalize", () => {
  it("rapproche les formulations FR et EN", () => {
    expect(canonicalize("sante-animale")).toBe("animal-health");
    expect(canonicalize("responsable-qualite")).toBe("manager-quality");
    expect(canonicalize("grand-compte")).toBe("key-account");
  });
});

describe("resolveJobRoleSlug", () => {
  it("laisse passer les slugs reels sans redirection", () => {
    for (const role of jobRoles) {
      expect(resolveJobRoleSlug(role.slug)).toEqual({ status: "exact", slug: role.slug });
    }
  });

  it("rattrape le cas reel observe en production", () => {
    const result = resolveJobRoleSlug("key-account-manager-animal-health");
    expect(result.status).toBe("redirect");
    expect(result.status === "redirect" && result.slug).toBe(
      "medical-vet-key-account-manager-large-accounts"
    );
  });

  it("honore chaque alias explicite", () => {
    for (const [alias, target] of Object.entries(MANUAL_JOB_ROLE_ALIASES)) {
      const result = resolveJobRoleSlug(alias);
      expect(result.status, `alias ${alias}`).toBe("redirect");
      expect(result.status === "redirect" && result.slug, `alias ${alias}`).toBe(target);
    }
  });

  it("ne contient aucun alias explicite pointant vers une fiche disparue", () => {
    expect(getDanglingManualAliases()).toEqual([]);
  });

  it("ne redirige jamais un alias vers un slug inexistant", () => {
    const known = new Set(jobRoles.map((role) => role.slug));
    for (const target of getJobRoleAliases().values()) {
      expect(known.has(target)).toBe(true);
    }
  });

  it("rend un 404 avec suggestions quand aucune fiche ne colle", () => {
    const result = resolveJobRoleSlug("plombier-chauffagiste-lyon");
    expect(result.status).toBe("suggest");
  });

  it("refuse de rediriger quand deux fiches sont equivalentes", () => {
    // Aucune fiche "Chief Marketing Officer Petfood" n'existe : le score reste
    // trop bas et trop serre pour justifier un 308.
    expect(resolveJobRoleSlug("chief-marketing-officer-petfood").status).toBe("suggest");
  });
});

describe("resolveArticleSlug", () => {
  it("laisse passer les slugs reels", () => {
    for (const article of articles) {
      expect(resolveArticleSlug(article.slug).status).toBe("exact");
    }
  });

  it("rattrape un slug accentue", () => {
    const result = resolveArticleSlug("devenir-v%C3%A9t%C3%A9rinaire-france");
    expect(result.status).toBe("redirect");
    expect(result.status === "redirect" && result.slug).toBe("devenir-veterinaire-france");
  });
});

describe("resolveSchoolSlug", () => {
  it("laisse passer les slugs reels", () => {
    for (const school of schools) {
      expect(resolveSchoolSlug(school.slug).status).toBe("exact");
    }
  });
});

describe("rankCandidates", () => {
  it("classe la fiche la plus proche en tete", () => {
    const ranked = rankCandidates(
      "responsable-production-biotech",
      jobRoles.map((role) => ({ slug: role.slug, title: role.title })),
      5
    );
    expect(ranked[0].slug).toBe("biotech-production-manager");
    expect(ranked).toHaveLength(5);
  });
});
