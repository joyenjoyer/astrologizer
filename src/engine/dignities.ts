import type { Planet, Sign } from "./types.ts";

/** The signs in which a planet is essentially strong (CONTEXT.md: Dignity). */
export type Dignities = {
  domicile: Sign[];
  exaltation: Sign[];
};

// Classical essential dignities. Filled in as planets come into use.
const DIGNITY_TABLE: Partial<Record<Planet, Dignities>> = {
  Sun: { domicile: ["Leo"], exaltation: ["Aries"] },
};

/** The dignified signs for a planet — its domicile(s) and exaltation(s). */
export function dignitiesOf(planet: Planet): Dignities {
  const entry = DIGNITY_TABLE[planet];
  if (!entry) {
    throw new Error(`No dignities defined for ${planet}`);
  }
  return entry;
}
