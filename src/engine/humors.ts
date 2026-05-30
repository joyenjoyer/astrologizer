import type { HumoralQuality, Planet } from "./types.ts";

/**
 * The Galenic humoral nature of each classical planet. Treatment by antipathy
 * (CONTEXT.md) leans on these temperaments: an affliction is countered by the
 * planets whose nature is its contrary.
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

/** The contrary quality: both axes flipped (hot⇄cold, wet⇄dry). */
export function contraryOf(quality: HumoralQuality): HumoralQuality {
  return {
    temperature: quality.temperature === "hot" ? "cold" : "hot",
    moisture: quality.moisture === "wet" ? "dry" : "wet",
  };
}

/** The planets whose temperament matches the given quality on both axes. */
export function planetsWithQuality(quality: HumoralQuality): Planet[] {
  return (Object.keys(PLANET_TEMPERAMENT) as Planet[]).filter((planet) => {
    const t = PLANET_TEMPERAMENT[planet];
    return t.temperature === quality.temperature && t.moisture === quality.moisture;
  });
}
