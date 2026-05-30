import type { Planet, Sign } from "./types.ts";

/** The signs in which a planet is essentially strong (CONTEXT.md: Dignity). */
export type Dignities = {
  domicile: Sign[];
  exaltation: Sign[];
};

// Classical essential dignities (domicile + exaltation) for all seven planets.
const DIGNITY_TABLE: Partial<Record<Planet, Dignities>> = {
  Sun: { domicile: ["Leo"], exaltation: ["Aries"] },
  Moon: { domicile: ["Cancer"], exaltation: ["Taurus"] },
  Mercury: { domicile: ["Gemini", "Virgo"], exaltation: ["Virgo"] },
  Venus: { domicile: ["Taurus", "Libra"], exaltation: ["Pisces"] },
  Mars: { domicile: ["Aries", "Scorpio"], exaltation: ["Capricorn"] },
  Jupiter: { domicile: ["Sagittarius", "Pisces"], exaltation: ["Cancer"] },
  Saturn: { domicile: ["Capricorn", "Aquarius"], exaltation: ["Libra"] },
};

/** The dignified signs for a planet — its domicile(s) and exaltation(s). */
export function dignitiesOf(planet: Planet): Dignities {
  const entry = DIGNITY_TABLE[planet];
  if (!entry) {
    throw new Error(`No dignities defined for ${planet}`);
  }
  return entry;
}
