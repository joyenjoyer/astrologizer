import { describe, it, expect } from "vitest";
import { dignitiesOf } from "./dignities.ts";

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

  it("throws for a planet with no dignities defined yet", () => {
    expect(() => dignitiesOf("Saturn")).toThrow(/no dignities/i);
  });
});
