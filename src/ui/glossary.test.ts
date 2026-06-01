import { describe, it, expect } from "vitest";
import { defineTerm, GLOSSARY_TERMS } from "./glossary.ts";

describe("defineTerm", () => {
  it("returns a plain-language definition for a known term", () => {
    expect(defineTerm("sympathy")).toMatch(/\S/);
  });

  it("is case-insensitive (the UI underlines terms mid-sentence)", () => {
    expect(defineTerm("Sympathy")).toBe(defineTerm("sympathy"));
  });

  it("returns undefined for a term it does not define", () => {
    expect(defineTerm("decumbiture")).toBeUndefined();
  });
});

describe("glossary completeness", () => {
  // Every jargon term the result view underlines must resolve to a popover
  // definition — no underlined term should be left without one.
  const underlinedTerms = [
    "sympathy",
    "antipathy",
    "dignity",
    "domicile",
    "exaltation",
    "condition",
    "dignified",
    "unafflicted",
    "waxing",
    "humoral quality",
    "contrary planet",
    "seat",
    "configuration",
  ];

  it("defines every term the UI underlines", () => {
    for (const term of underlinedTerms) {
      expect(defineTerm(term), `missing definition for "${term}"`).toMatch(/\S/);
    }
  });

  it("exposes its full term list, covering the underlined set", () => {
    for (const term of underlinedTerms) {
      expect(GLOSSARY_TERMS).toContain(term);
    }
  });
});
