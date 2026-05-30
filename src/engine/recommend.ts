import type { Configuration, ConfigurationEntry, Issue, Recommendation } from "./types.ts";
import { dignitiesOf } from "./dignities.ts";

/**
 * The core deep module. Given an issue (seat + humoral quality), derive the
 * recommended configurations by sympathy and by antipathy.
 *
 * Pure and deterministic: no DOM, no network, no clock. See docs/PRD.md for
 * the derivation rules. Slice 1 implements the by-sympathy path only.
 */
export function recommend(issue: Issue): Recommendation {
  return {
    issue,
    sympathy: bySympathy(issue),
    antipathy: emptyAntipathy(),
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

function emptyAntipathy(): Configuration {
  return {
    method: "antipathy",
    system: "classical-western",
    entries: [],
    rationale: "",
    citations: [],
  };
}
