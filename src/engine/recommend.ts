import type { Configuration, ConfigurationEntry, HumoralQuality, Issue, Recommendation } from "./types.ts";
import { dignitiesOf } from "./dignities.ts";
import { contraryOf, planetsWithQuality } from "./humors.ts";

/**
 * The core deep module. Given an issue (seat + humoral quality), derive the
 * recommended configurations by sympathy and by antipathy.
 *
 * Pure and deterministic: no DOM, no network, no clock. See docs/PRD.md for
 * the derivation rules.
 */
export function recommend(issue: Issue): Recommendation {
  return {
    issue,
    sympathy: bySympathy(issue),
    antipathy: byAntipathy(issue),
  };
}

/** Strengthen the planet that governs the affected seat. */
function bySympathy(issue: Issue): Configuration {
  const { rulingPlanet, label, citation } = issue.seat;
  return {
    method: "sympathy",
    system: issue.seat.system,
    entries: [strengthen(rulingPlanet)],
    rationale: `The ${label.toLowerCase()} is governed by ${rulingPlanet}; strengthening it supports the affected part.`,
    citations: [citation],
  };
}

/** Build a configuration entry that places a planet in its dignified signs. */
function strengthen(planet: ConfigurationEntry["planet"]): ConfigurationEntry {
  const { domicile, exaltation } = dignitiesOf(planet);
  return {
    planet,
    signs: [
      ...domicile.map((sign) => ({ sign, dignity: "domicile" as const })),
      ...exaltation.map((sign) => ({ sign, dignity: "exaltation" as const })),
    ],
    conditions: ["dignified", "unafflicted"],
  };
}

/** Counter the affliction with planets of the contrary humoral nature. */
function byAntipathy(issue: Issue): Configuration {
  const contrary = contraryOf(issue.quality);
  const planets = planetsWithQuality(contrary);
  return {
    method: "antipathy",
    system: issue.seat.system,
    entries: planets.map(strengthen),
    rationale: `The complaint is ${describe(issue.quality)}; ${describe(contrary)} planets counter it.`,
    citations: [issue.seat.citation],
  };
}

/** Phrase a humoral quality for a rationale, e.g. "hot and dry". */
function describe(quality: HumoralQuality): string {
  return `${quality.temperature} and ${quality.moisture}`;
}
