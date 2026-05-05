/**
 * Snapshot test that locks the typography tokens in tailwind.config.ts.
 *
 * Why: prevents accidental drift. If anyone changes the type scale,
 * line-heights, letter-spacing, or font weights, this test fails CI
 * and the PR gets a visible diff. Update this snapshot ONLY when
 * intentionally changing the design system.
 *
 * Companion: app/dashboard/typo for visual reference + Copilot/Typo-System.md.
 */
import { describe, it, expect } from "vitest";
import config from "../tailwind.config";

const theme = config.theme?.extend ?? {};

describe("Typography tokens — locked design system", () => {
  it("font families resolve to the next/font CSS variables", () => {
    expect(theme.fontFamily).toBeDefined();
    const sans = (theme.fontFamily as Record<string, string[]>).sans;
    const display = (theme.fontFamily as Record<string, string[]>).display;
    expect(sans[0]).toBe("var(--font-sans)");
    expect(display[0]).toBe("var(--font-display)");
  });

  it("type scale matches the locked snapshot", () => {
    expect(theme.fontSize).toMatchInlineSnapshot(`
      {
        "body": [
          "15px",
          {
            "lineHeight": "1.7",
          },
        ],
        "body-l": [
          "16px",
          {
            "lineHeight": "1.7",
          },
        ],
        "caption": [
          "13px",
          {
            "lineHeight": "1.5",
          },
        ],
        "display-l": [
          "32px",
          {
            "letterSpacing": "-0.02em",
            "lineHeight": "1.08",
          },
        ],
        "display-xl": [
          "40px",
          {
            "letterSpacing": "-0.02em",
            "lineHeight": "1.05",
          },
        ],
        "eyebrow": [
          "11px",
          {
            "letterSpacing": "0.18em",
            "lineHeight": "1",
          },
        ],
        "h1": [
          "28px",
          {
            "letterSpacing": "-0.01em",
            "lineHeight": "1.15",
          },
        ],
        "h2": [
          "22px",
          {
            "letterSpacing": "-0.01em",
            "lineHeight": "1.2",
          },
        ],
        "h3": [
          "18px",
          {
            "lineHeight": "1.25",
          },
        ],
      }
    `);
  });

  it("line-height tokens match the locked snapshot", () => {
    expect(theme.lineHeight).toMatchInlineSnapshot(`
      {
        "loose": "1.85",
        "normal": "1.5",
        "relaxed": "1.7",
        "snug": "1.25",
        "tight": "1.1",
      }
    `);
  });

  it("letter-spacing tokens match the locked snapshot", () => {
    expect(theme.letterSpacing).toMatchInlineSnapshot(`
      {
        "eyebrow": "0.22em",
        "normal": "0",
        "snug": "-0.01em",
        "tight": "-0.02em",
        "wide": "0.18em",
      }
    `);
  });
});
