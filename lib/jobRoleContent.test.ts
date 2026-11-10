import { describe, expect, it } from "vitest";
import { parseJobRoleContent } from "./jobRoleContent";

// Extrait reel d'une fiche Notion (assurance sterilite), format du champ Main Content.
const sample = [
  "\\## Brief SEO",
  "- Mot-clé principal : responsable assurance stérilité biotech pharma",
  "- Niveau de sensibilité : moyen",
  "## Réponse directe",
  "Le responsable assurance stérilité pilote la maîtrise du risque de contamination.",
  "## Missions clés",
  "- Définir la contamination control strategy.",
  "- Piloter l'environmental monitoring.",
  "- Sécuriser les media fills.",
  "## Compétences",
  "### Techniques",
  "- Maîtrise des GMP applicables aux médicaments stériles.",
  "### Soft skills",
  "- Exigence et discernement.",
  "## Liens internes SKS TALENTS",
  "- [https://www.skstalents.fr/services](https://www.skstalents.fr/services)",
  "## Meta description",
  "Responsable assurance stérilité biotech pharma : missions.",
  "## Alt text visuel",
  "Responsable observant une ligne aseptique.",
  "## Faits vérifiés",
  "- Annexe 1 pleinement applicable depuis le 25 août 2024.",
  "## Estimations / hypothèses",
  "- La pénurie est surtout qualitative.",
  "## Lecture SKS TALENTS",
  "Ce poste doit être cadré comme un rôle de décision transverse."
].join("<br />");

describe("parseJobRoleContent", () => {
  const parsed = parseJobRoleContent(sample)!;

  it("extrait les missions en liste", () => {
    expect(parsed.missions).toEqual([
      "Définir la contamination control strategy.",
      "Piloter l'environmental monitoring.",
      "Sécuriser les media fills."
    ]);
  });

  it("ne laisse passer aucune note interne", () => {
    for (const internal of [
      "Brief SEO",
      "Niveau de sensibilité",
      "Meta description",
      "Alt text",
      "Estimations",
      "pénurie est surtout qualitative",
      "Liens internes"
    ]) {
      expect(parsed.body).not.toContain(internal);
    }
  });

  it("garde le texte destine au lecteur, sous-sections comprises", () => {
    for (const kept of [
      "## Réponse directe",
      "## Compétences",
      "### Techniques",
      "### Soft skills",
      "## Faits vérifiés",
      "## Lecture SKS TALENTS"
    ]) {
      expect(parsed.body).toContain(kept);
    }
    expect(parsed.body).not.toContain("## Missions clés");
  });

  it("laisse intactes les fiches sans structure en sections", () => {
    expect(parseJobRoleContent("Protege donnees et equipements. Missions: Evaluer les risques.")).toBeNull();
    expect(parseJobRoleContent("")).toBeNull();
  });
});

describe("parseJobRoleContent, formats de travail varies", () => {
  const numbered = [
    "## Avant rédaction (SEO)",
    "- Mot-clé principal : responsable CSV",
    "- Sensibilité du contenu : moyen",
    "---",
    "## 1) Réponse directe (exploitable)",
    "Le responsable CSV sécurise la conformité.",
    "## 2) Missions clés",
    "- Cartographier les systèmes GxP",
    "- Définir la stratégie de validation",
    "- Piloter la documentation CSV",
    "## 10) Meta description (prête SEO)",
    "Responsable CSV : missions.",
    "## 11) Visuel (option)",
    "- Alt text : Responsable validation.",
    "## Mot-clé principal",
    "Responsable Data Integrity",
    "## Niveau de sensibilité du contenu",
    "moyen",
    "# Responsable Data Integrity (GxP)",
    "## 7) Rémunération (repères)",
    "Dépend de la séniorité."
  ].join("\n");
  const parsed = parseJobRoleContent(numbered)!;

  it("retire numerotation et consignes des titres", () => {
    expect(parsed.body).toContain("## Réponse directe\n");
    expect(parsed.body).toContain("## Rémunération\n");
    expect(parsed.body).not.toMatch(/\d\)\s/);
    expect(parsed.body).not.toContain("(exploitable)");
  });

  it("retire toutes les notes de travail, quel que soit leur titre", () => {
    for (const internal of ["Avant rédaction", "Mot-clé", "Sensibilité", "Meta description", "Visuel", "Alt text", "---", "# Responsable"]) {
      expect(parsed.body).not.toContain(internal);
    }
    expect(parsed.missions).toHaveLength(3);
  });
});
