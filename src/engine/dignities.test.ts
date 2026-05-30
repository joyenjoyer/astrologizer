import { describe, it, expect } from "vitest";
import { dignitiesOf } from "./dignities.ts";
import type { Planet } from "./types.ts";

const ALL_PLANETS: Planet[] = [
  "Sun",
  "Moon",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
];

describe("dignitiesOf", () => {
  it("returns the Sun's domicile (Leo) and exaltation (Aries)", () => {
    expect(dignitiesOf("Sun")).toEqual({
      domicile: ["Leo"],
      exaltation: ["Aries"],
    });
  });

  it("returns the Moon's domicile (Cancer) and exaltation (Taurus)", () => {
    expect(dignitiesOf("Moon")).toEqual({
      domicile: ["Cancer"],
      exaltation: ["Taurus"],
    });
  });

  it("returns Venus's domiciles (Taurus, Libra) and exaltation (Pisces)", () => {
    expect(dignitiesOf("Venus")).toEqual({
      domicile: ["Taurus", "Libra"],
      exaltation: ["Pisces"],
    });
  });

  it("returns Mars's domiciles (Aries, Scorpio) and exaltation (Capricorn)", () => {
    expect(dignitiesOf("Mars")).toEqual({
      domicile: ["Aries", "Scorpio"],
      exaltation: ["Capricorn"],
    });
  });

  it("returns Jupiter's domiciles (Sagittarius, Pisces) and exaltation (Cancer)", () => {
    expect(dignitiesOf("Jupiter")).toEqual({
      domicile: ["Sagittarius", "Pisces"],
      exaltation: ["Cancer"],
    });
  });

  it("returns Saturn's domiciles (Capricorn, Aquarius) and exaltation (Libra)", () => {
    expect(dignitiesOf("Saturn")).toEqual({
      domicile: ["Capricorn", "Aquarius"],
      exaltation: ["Libra"],
    });
  });

  it("returns Mercury's domiciles (Gemini, Virgo) and exaltation (Virgo)", () => {
    expect(dignitiesOf("Mercury")).toEqual({
      domicile: ["Gemini", "Virgo"],
      exaltation: ["Virgo"],
    });
  });

  it("defines at least one domicile for every classical planet", () => {
    for (const planet of ALL_PLANETS) {
      expect(dignitiesOf(planet).domicile.length).toBeGreaterThan(0);
    }
  });

  it("throws for a planet with no dignities defined", () => {
    expect(() => dignitiesOf("Pluto" as never)).toThrow(/no dignities/i);
  });
});
