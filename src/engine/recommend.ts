import type { Citation, Condition, Configuration, ConfigurationEntry, HumoralQuality, Issue, Planet, Recommendation } from "./types.ts";
import { dignitiesOf, dignityCitationOf } from "./dignities.ts";
import { contraryPlanetsOf, contraryCitation, temperamentCitationOf, temperamentOf } from "./humors.ts";

/**
 * The core deep module. Given an issue (a seat), derive the recommended
 * configurations by sympathy and by antipathy.
 *
 * Pure and deterministic: no DOM, no network, no clock. Each configuration's
 * citations are aggregated from exactly the knowledge units used to derive it
 * (docs/adr/0002-citations-on-knowledge-units.md), so a skeptic who checks a
 * citation finds it genuinely backs the claim.
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
    // The seat→ruler mapping (melothesia) and the ruler's dignities are the
    // two units a sympathy recommendation rests on.
    citations: dedupe([citation, dignityCitationOf(rulingPlanet)]),
  };
}

/** Strengthen the contrary planet(s) of the seat's ruler (opposing rulership). */
function byAntipathy(issue: Issue): Configuration {
  const { rulingPlanet } = issue.seat;
  const contraries = contraryPlanetsOf(rulingPlanet);
  const cleanOpposite = isCleanOpposite(rulingPlanet, contraries[0]);

  // The contrary-pairing doctrine plus each contrary planet's dignities.
  const citations: Citation[] = [
    contraryCitation(),
    ...contraries.map(dignityCitationOf),
  ];
  // Cite the temperaments only when the rationale actually invokes them — i.e.
  // when the pair is a clean humoral opposite and the commentary names them.
  if (cleanOpposite) {
    citations.push(temperamentCitationOf(rulingPlanet), ...contraries.map(temperamentCitationOf));
  }

  return {
    method: "antipathy",
    system: issue.seat.system,
    entries: contraries.map(strengthen),
    rationale: antipathyRationale(rulingPlanet, contraries, cleanOpposite),
    citations: dedupe(citations),
  };
}

/** Build a configuration entry that places a planet in its dignified signs. */
function strengthen(planet: Planet): ConfigurationEntry {
  const { domicile, exaltation } = dignitiesOf(planet);
  const conditions: Condition[] = ["dignified", "unafflicted"];
  if (planet === "Moon") {
    conditions.push("waxing");
  }
  return {
    planet,
    signs: [
      ...domicile.map((sign) => ({ sign, dignity: "domicile" as const })),
      ...exaltation.map((sign) => ({ sign, dignity: "exaltation" as const })),
    ],
    conditions,
  };
}

/** Whether two planets are opposite on both humoral axes (e.g. Mars ↔ Venus). */
function isCleanOpposite(a: Planet, b: Planet): boolean {
  const ta = temperamentOf(a);
  const tb = temperamentOf(b);
  return ta.temperature !== tb.temperature && ta.moisture !== tb.moisture;
}

/**
 * Phrase the antipathy rationale. For a clean humoral opposite the commentary
 * leans on the temperaments; otherwise (e.g. Sun ↔ Saturn, both dry) it states
 * the opposing-rulership basis and names no temperament.
 */
function antipathyRationale(ruler: Planet, contraries: Planet[], cleanOpposite: boolean): string {
  const list = contraries.join(" and ");
  if (cleanOpposite) {
    const rt = temperamentOf(ruler);
    const ct = temperamentOf(contraries[0]);
    return `${ruler} is ${describe(rt)}; ${list}, being ${describe(ct)}, counter it.`;
  }
  return `${list} is the contrary of ${ruler} by opposing rulership; strengthening it counters the affliction.`;
}

/** Phrase a humoral quality for a rationale, e.g. "hot and dry". */
function describe(quality: HumoralQuality): string {
  return `${quality.temperature} and ${quality.moisture}`;
}

/** Drop citations that are identical in source, locator, and quote. */
function dedupe(citations: Citation[]): Citation[] {
  const seen = new Set<string>();
  return citations.filter((c) => {
    const key = `${c.source}|${c.locator}|${c.quote}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
