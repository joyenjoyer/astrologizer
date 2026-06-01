import { describe, it, expect } from "vitest";
import { planetGlyph, planetImage } from "./planetImage.ts";
import type { Planet } from "../engine/types.ts";

const ALL_PLANETS: Planet[] = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"];

describe("planetGlyph", () => {
  it("returns the classical astrological glyph for each planet", () => {
    expect(planetGlyph("Sun")).toBe("☉");
    expect(planetGlyph("Saturn")).toBe("♄");
  });

  it("gives every classical planet a non-empty glyph (the always-available fallback)", () => {
    for (const planet of ALL_PLANETS) {
      expect(planetGlyph(planet)).toMatch(/\S/);
    }
  });
});

describe("planetImage", () => {
  it("returns undefined when no engraving is bundled, so the UI can fall back to the glyph", () => {
    // No engraving assets are bundled yet (see docs/citations-verification.md
    // ethos: nothing fake ships); every planet falls back to its glyph.
    for (const planet of ALL_PLANETS) {
      const image = planetImage(planet);
      if (image !== undefined) {
        // If an engraving is ever added it must carry a credit line.
        expect(image.src).toMatch(/\S/);
        expect(image.credit).toMatch(/\S/);
      }
    }
  });
});
