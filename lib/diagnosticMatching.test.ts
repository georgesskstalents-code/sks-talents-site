import { describe, it, expect } from "vitest";
import { matchDiagnostic, type DiagnosticAnswers } from "./diagnosticMatching";

const baseAnswers: DiagnosticAnswers = { q1: "A", q2: "A", q3: "A", q4: "A", q5: "A" };

describe("matchDiagnostic — Animal Health", () => {
  it("Q3=A (RH éclatée) → Agent Juridique RH", () => {
    const r = matchDiagnostic("animal-health", { ...baseAnswers, q3: "A" });
    expect(r.primary.id).toBe("ah-juridique-rh");
  });

  it("Q3=B (reporting Excel) → Agent Reporting Dirigeant (DÉMO ⭐)", () => {
    const r = matchDiagnostic("animal-health", { ...baseAnswers, q3: "B" });
    expect(r.primary.id).toBe("ah-reporting-dirigeant");
    expect(r.primary.badge).toBe("DÉMO ⭐");
  });

  it("Q3=E (M&A non structuré) → Agent M&A Pipeline (PREMIUM)", () => {
    const r = matchDiagnostic("animal-health", { ...baseAnswers, q3: "E" });
    expect(r.primary.id).toBe("ah-ma-pipeline");
    expect(r.primary.badge).toBe("PREMIUM");
  });

  it("Q3=G (Autre) falls back to the DÉMO ⭐ agent", () => {
    const r = matchDiagnostic("animal-health", { ...baseAnswers, q3: "G" });
    expect(r.primary.id).toBe("ah-reporting-dirigeant");
  });

  it("returns 2 complement agents that are NOT the primary", () => {
    const r = matchDiagnostic("animal-health", { ...baseAnswers, q3: "B" });
    expect(r.complements).toHaveLength(2);
    expect(r.complements[0].id).not.toBe(r.primary.id);
    expect(r.complements[1].id).not.toBe(r.primary.id);
    expect(r.complements[0].id).not.toBe(r.complements[1].id);
  });
});

describe("matchDiagnostic — Life Sciences", () => {
  it("Q3=A (reporting board) → Agent Reporting Investisseurs", () => {
    const r = matchDiagnostic("life-sciences", { ...baseAnswers, q3: "A" });
    expect(r.primary.id).toBe("ls-reporting-investisseurs");
  });

  it("Q3=B (burn rate humain) → Agent CEO Copilot (DÉMO ⭐)", () => {
    const r = matchDiagnostic("life-sciences", { ...baseAnswers, q3: "B" });
    expect(r.primary.id).toBe("ls-ceo-copilot");
    expect(r.primary.badge).toBe("DÉMO ⭐");
  });

  it("Q3=E (onboarding raté) → Agent Onboarding & Rétention (NOUVEAU)", () => {
    const r = matchDiagnostic("life-sciences", { ...baseAnswers, q3: "E" });
    expect(r.primary.id).toBe("ls-onboarding-retention");
    expect(r.primary.badge).toBe("NOUVEAU");
  });

  it("Q3=G (Autre) falls back to CEO Copilot DÉMO ⭐", () => {
    const r = matchDiagnostic("life-sciences", { ...baseAnswers, q3: "G" });
    expect(r.primary.id).toBe("ls-ceo-copilot");
  });
});

describe("matchDiagnostic — friction score", () => {
  it("higher Q4 (more hours/longer board horizon) increases all axis scores", () => {
    const low = matchDiagnostic("animal-health", { ...baseAnswers, q4: "A" });
    const high = matchDiagnostic("animal-health", { ...baseAnswers, q4: "D" });
    const lowAvg = low.frictionScore.reduce((s, a) => s + a.score, 0) / low.frictionScore.length;
    const highAvg = high.frictionScore.reduce((s, a) => s + a.score, 0) / high.frictionScore.length;
    expect(highAvg).toBeGreaterThan(lowAvg);
  });
});

describe("matchDiagnostic — priorities", () => {
  it("returns exactly 3 priorities for any combination", () => {
    const r = matchDiagnostic("animal-health", baseAnswers);
    expect(r.priorities).toHaveLength(3);
    expect(r.priorities[0]).toContain(r.primary.label);
  });
});
