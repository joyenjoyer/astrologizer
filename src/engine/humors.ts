import type { Citation, HumoralQuality, Planet } from "./types.ts";

/**
 * The contrary planet of each classical planet, paired by **opposing
 * rulership** (opposite domiciles). This is Culpeper's practiced antipathy
 * rule — diseases of one planet are met by its contrary's remedies — and,
 * unlike a recomputed humoral opposite, it is directly citable. Note Saturn
 * is the contrary of both luminaries. See docs/adr/0003-antipathy-by-contrary-planet.md.
 */
const CONTRARY_PLANETS: Record<Planet, Planet[]> = {
  Sun: ["Saturn"],
  Moon: ["Saturn"],
  Saturn: ["Sun", "Moon"],
  Mars: ["Venus"],
  Venus: ["Mars"],
  Mercury: ["Jupiter"],
  Jupiter: ["Mercury"],
};

/** The planet(s) contrary to the given planet by opposing rulership. */
export function contraryPlanetsOf(planet: Planet): Planet[] {
  return CONTRARY_PLANETS[planet];
}

// The cure-by-contraries doctrine — treat a planet's diseases with its
// contrary's remedies — is Culpeper's. It is a single knowledge unit shared by
// every antipathy recommendation.
//
// NOTE: Culpeper's text could not be sourced freely online; the quote below is
// an UNVERIFIED PLACEHOLDER paraphrase, not a transcription. It must be
// replaced with a verbatim passage. See docs/citations-verification.md.
const CONTRARY_CITATION: Citation = {
  source: "Culpeper, Astrological Judgement of Diseases (1655)",
  locator: "Of the Cure of Diseases by Antipathy",
  quote:
    "[unverified placeholder — needs real Culpeper passage] Diseases of one planet are cured by the herbs of the planet opposite to it: the diseases of the Luminaries by the herbs of Saturn, the diseases of Mars by those of Venus, and the contrary.",
};

/** The Culpeper citation backing the contrary-pairing (antipathy) doctrine. */
export function contraryCitation(): Citation {
  return CONTRARY_CITATION;
}

/**
 * The Galenic humoral nature of each classical planet (Ptolemy). Retained as
 * sourced data purely to flavor the rationale — it no longer computes the
 * antipathy set (that is contraryPlanetsOf). See ADR-0003.
 */
const PLANET_TEMPERAMENT: Record<Planet, HumoralQuality> = {
  Sun: { temperature: "hot", moisture: "dry" },
  Moon: { temperature: "cold", moisture: "wet" },
  Mercury: { temperature: "cold", moisture: "dry" },
  Venus: { temperature: "cold", moisture: "wet" },
  Mars: { temperature: "hot", moisture: "dry" },
  Jupiter: { temperature: "hot", moisture: "wet" },
  Saturn: { temperature: "cold", moisture: "dry" },
};

/** The humoral temperament of a planet, for explanatory commentary only. */
export function temperamentOf(planet: Planet): HumoralQuality {
  return PLANET_TEMPERAMENT[planet];
}

// The planetary temperaments are Ptolemy's (Tetrabiblos Book I, ch. 4 "Of the
// Power of the Planets"). Each is a knowledge unit and carries its own verbatim
// quote. Provenance and verification status are tracked in
// docs/citations-verification.md (the translation/edition still needs review).
const PTOLEMY = (quote: string): Citation => ({
  source: "Ptolemy, Tetrabiblos",
  locator: "Book I, ch. 4 (Of the Power of the Planets)",
  quote,
});

const TEMPERAMENT_CITATIONS: Record<Planet, Citation> = {
  Sun: PTOLEMY("The active power of the sun's essential nature is found to be heating and, to a certain degree, drying."),
  Moon: PTOLEMY("Most of the moon's power consists of humidifying, clearly because it is close to the earth and because of the moist exhalations therefrom."),
  Saturn: PTOLEMY("It is Saturn's quality chiefly to cool and [moderately] to dry, probably because he is furthest removed both from the sun's heat and the moist exhalations about the earth."),
  Mars: PTOLEMY("The nature of Mars is chiefly to dry and to burn, in conformity with his fiery colour and by reason of his nearness to the sun."),
  Jupiter: PTOLEMY("Jupiter has a temperate active force because his movement takes place between the cooling influence of Saturn and the burning power of Mars. He both heats and humidifies."),
  Venus: PTOLEMY("Venus has the same powers and tempered nature as Jupiter, but acts in the opposite way; for she warms moderately because of her nearness to the sun, but chiefly humidifies, like the moon."),
  Mercury: PTOLEMY("Mercury in general is found at certain times alike to be drying and absorptive of moisture … and again humidifying … and to change quickly from one to the other."),
};

/** The Ptolemy citation backing a planet's humoral temperament. */
export function temperamentCitationOf(planet: Planet): Citation {
  return TEMPERAMENT_CITATIONS[planet];
}
