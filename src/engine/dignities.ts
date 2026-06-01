import type { Citation, Planet, Sign } from "./types.ts";

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

// The classical source for the essential dignities is Ptolemy's Tetrabiblos
// (Book I, ch. 17 "Of the Houses of the Several Planets" and ch. 19 "Of
// Exaltations"). Each planet's dignities are a knowledge unit and carry their
// own verbatim quote. Provenance and verification status are tracked in
// docs/citations-verification.md (the translation/edition still needs review).
const PTOLEMY = (quote: string): Citation => ({
  source: "Ptolemy, Tetrabiblos",
  locator: "Book I, chs. 17 (Houses) & 19 (Exaltations)",
  quote,
});

const DIGNITY_CITATIONS: Record<Planet, Citation> = {
  Sun: PTOLEMY("Leo, which is masculine, [was assigned] to the sun … they have fittingly assigned Aries to him as his exaltation."),
  Moon: PTOLEMY("Cancer, feminine, [was assigned] to the moon … the first sign of her own triangle, Taurus, this was called her exaltation."),
  Saturn: PTOLEMY("To Saturn … were assigned the signs opposite Cancer and Leo, namely Capricorn and Aquarius … [Saturn took] Libra as his exaltation."),
  Jupiter: PTOLEMY("To Jupiter … were assigned the two signs next to the foregoing, windy and fecund, Sagittarius and Pisces … they therefore made this sign [Cancer] his exaltation."),
  Mars: PTOLEMY("To Mars … there were assigned again the two signs … Scorpio and Aries … [Mars] naturally received Capricorn as his exaltation."),
  Venus: PTOLEMY("To Venus … were given the next two signs, which are extremely fertile, Libra and Taurus … [Venus] has her exaltation in Pisces."),
  Mercury: PTOLEMY("There were given to Mercury … the remaining signs, Gemini and Virgo … [Mercury] naturally is exalted, as it were, in Virgo."),
};

/** The classical citation backing a planet's dignities (the dignity knowledge unit). */
export function dignityCitationOf(planet: Planet): Citation {
  const citation = DIGNITY_CITATIONS[planet];
  if (!citation) {
    throw new Error(`No dignity citation defined for ${planet}`);
  }
  return citation;
}
