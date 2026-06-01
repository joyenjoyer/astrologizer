import type { Planet } from "../engine/types.ts";

/** A bundled, credited engraving for a planet. */
export type PlanetImage = {
  src: string;
  credit: string;
};

// The classical astrological glyphs — always available, offline, deterministic.
// This is the fallback visual mark for every planet.
const PLANET_GLYPH: Record<Planet, string> = {
  Sun: "☉",
  Moon: "☽",
  Mercury: "☿",
  Venus: "♀",
  Mars: "♂",
  Jupiter: "♃",
  Saturn: "♄",
};

/** The classical glyph for a planet — the always-available visual fallback. */
export function planetGlyph(planet: Planet): string {
  return PLANET_GLYPH[planet];
}

// Registry of bundled public-domain (pre-1900) deity engravings, keyed by
// planet. Empty for now: per the project's "nothing fake ships" ethos, no
// engraving is wired until a real, credited, locally-bundled asset exists.
// Sourcing/bundling the artwork is a documented TODO (see
// docs/citations-verification.md). The UI falls back to planetGlyph() whenever
// this returns undefined.
const PLANET_IMAGE: Partial<Record<Planet, PlanetImage>> = {};

/** The bundled engraving for a planet, or undefined if none is available. */
export function planetImage(planet: Planet): PlanetImage | undefined {
  return PLANET_IMAGE[planet];
}
