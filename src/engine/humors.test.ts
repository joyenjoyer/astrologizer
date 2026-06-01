import { describe, it, expect } from "vitest";
import { contraryPlanetsOf, contraryCitation, temperamentCitationOf } from "./humors.ts";
import { validateCitation } from "./knowledgeBase.ts";

const ALL_PLANETS = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"] as const;

describe("contraryPlanetsOf", () => {
  it("pairs Mars with its contrary planet Venus (opposing rulership)", () => {
    expect(contraryPlanetsOf("Mars")).toEqual(["Venus"]);
  });

  it("pairs each luminary with Saturn, and Saturn with both luminaries", () => {
    // The case the old humoral recomputation got wrong: it paired the hot/dry
    // Sun with cold/wet planets, where Culpeper pairs it with Saturn.
    expect(contraryPlanetsOf("Sun")).toEqual(["Saturn"]);
    expect(contraryPlanetsOf("Moon")).toEqual(["Saturn"]);
    expect(contraryPlanetsOf("Saturn").sort()).toEqual(["Moon", "Sun"]);
  });

  it("gives every classical planet at least one contrary", () => {
    for (const planet of ALL_PLANETS) {
      expect(contraryPlanetsOf(planet).length).toBeGreaterThan(0);
    }
  });
});

describe("contrary-pairing and temperament citations", () => {
  it("backs the contrary-pairing doctrine with a well-formed Culpeper citation", () => {
    const citation = contraryCitation();
    expect(() => validateCitation(citation, "contrary doctrine")).not.toThrow();
    expect(citation.source).toMatch(/culpeper/i);
  });

  it("backs every planet's temperament with a well-formed Ptolemy citation", () => {
    for (const planet of ALL_PLANETS) {
      const citation = temperamentCitationOf(planet);
      expect(() => validateCitation(citation, planet)).not.toThrow();
      expect(citation.source).toMatch(/ptolemy|tetrabiblos/i);
    }
  });
});
