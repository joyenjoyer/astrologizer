import { describe, it, expect } from "vitest";
import { dignitiesOf } from "./dignities.ts";

describe("dignitiesOf", () => {
  it("returns the Sun's domicile (Leo) and exaltation (Aries)", () => {
    expect(dignitiesOf("Sun")).toEqual({
      domicile: ["Leo"],
      exaltation: ["Aries"],
    });
  });

  it("throws for a planet with no dignities defined yet", () => {
    expect(() => dignitiesOf("Saturn")).toThrow(/no dignities/i);
  });
});
