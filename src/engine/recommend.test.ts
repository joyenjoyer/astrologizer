import { describe, it, expect } from "vitest";
import { recommend } from "./recommend.ts";
import type { Issue, Seat } from "./types.ts";

const heartSeat: Seat = {
  id: "heart",
  label: "Heart / upper back / spine",
  rulingSign: "Leo",
  rulingPlanet: "Sun",
  citation: {
    source: "Culpeper, Astrological Judgement of Diseases (1655)",
    locator: "melothesia",
    quote: "the part of the body governed by the sign.",
  },
  system: "classical-western",
};
const heartIssue: Issue = { seat: heartSeat };

const chestSeat: Seat = {
  id: "chest",
  label: "Chest & stomach",
  rulingSign: "Cancer",
  rulingPlanet: "Moon",
  citation: {
    source: "Culpeper, Astrological Judgement of Diseases (1655)",
    locator: "melothesia",
    quote: "the part of the body governed by the sign.",
  },
  system: "classical-western",
};
const chestIssue: Issue = { seat: chestSeat };

const headSeat: Seat = {
  id: "head",
  label: "Head, face & brain",
  rulingSign: "Aries",
  rulingPlanet: "Mars",
  citation: {
    source: "Culpeper, Astrological Judgement of Diseases (1655)",
    locator: "Aries",
    quote: "Aries governeth the head and face.",
  },
  system: "classical-western",
};
const headIssue: Issue = { seat: headSeat };

describe("recommend — by sympathy", () => {
  it("strengthens the seat's ruling planet", () => {
    const rec = recommend(heartIssue);
    const planets = rec.sympathy.entries.map((e) => e.planet);
    expect(planets).toContain("Sun");
  });

  it("lists the ruling planet's dignified signs, labeled domicile or exaltation", () => {
    const rec = recommend(heartIssue);
    const sun = rec.sympathy.entries.find((e) => e.planet === "Sun")!;
    expect(sun.signs).toContainEqual({ sign: "Leo", dignity: "domicile" });
    expect(sun.signs).toContainEqual({ sign: "Aries", dignity: "exaltation" });
  });

  it("carries a rationale, a citation, and the system", () => {
    const { sympathy } = recommend(heartIssue);
    expect(sympathy.rationale).not.toBe("");
    expect(sympathy.citations.length).toBeGreaterThan(0);
    expect(sympathy.system).toBe("classical-western");
  });

  it("requires the strengthened planet to be dignified and unafflicted", () => {
    const { sympathy } = recommend(heartIssue);
    const sun = sympathy.entries.find((e) => e.planet === "Sun")!;
    expect(sun.conditions).toContain("dignified");
    expect(sun.conditions).toContain("unafflicted");
  });

  it("returns the same recommendation for the same issue (deterministic)", () => {
    expect(recommend(heartIssue)).toEqual(recommend(heartIssue));
  });
});

describe("recommend — by antipathy", () => {
  it("strengthens the contrary planet of the seat's ruler, by opposing rulership", () => {
    // Sun-ruled seat: the contrary of the Sun is Saturn (Culpeper), NOT the
    // cold/wet planets the old humoral recomputation produced.
    const rec = recommend(heartIssue);
    const planets = rec.antipathy.entries.map((e) => e.planet);
    expect(planets).toEqual(["Saturn"]);
  });

  it("does not enlist the seat's own ruling planet", () => {
    const rec = recommend(heartIssue);
    const planets = rec.antipathy.entries.map((e) => e.planet);
    expect(planets).not.toContain("Sun");
  });

  it("places each contrary planet in its dignified signs, labeled", () => {
    const { antipathy } = recommend(heartIssue);
    const saturn = antipathy.entries.find((e) => e.planet === "Saturn")!;
    expect(saturn.signs).toContainEqual({ sign: "Capricorn", dignity: "domicile" });
    expect(saturn.signs).toContainEqual({ sign: "Libra", dignity: "exaltation" });
  });

  it("carries the antipathy method, a rationale, a citation, and the system", () => {
    const { antipathy } = recommend(heartIssue);
    expect(antipathy.method).toBe("antipathy");
    expect(antipathy.rationale).not.toBe("");
    expect(antipathy.citations.length).toBeGreaterThan(0);
    expect(antipathy.system).toBe("classical-western");
  });
});

describe("recommend — citations aggregate the units actually used", () => {
  it("sympathy cites the seat's melothesia (Culpeper) and the ruler's dignities (Ptolemy)", () => {
    const { sympathy } = recommend(heartIssue);
    expect(sympathy.citations).toContainEqual(heartSeat.citation);
    const dignity = sympathy.citations.find((c) => /ptolemy|tetrabiblos/i.test(c.source));
    expect(dignity).toBeDefined();
  });

  it("antipathy cites the contrary-pairing doctrine (Culpeper) and the contrary's dignities (Ptolemy)", () => {
    const { antipathy } = recommend(heartIssue);
    const sources = antipathy.citations.map((c) => c.source);
    expect(sources).toContain("Culpeper, Astrological Judgement of Diseases (1655)");
    expect(sources.some((s) => /ptolemy|tetrabiblos/i.test(s))).toBe(true);
    // The contrary-pairing citation, not the seat's melothesia, justifies antipathy.
    expect(antipathy.citations).not.toContainEqual(heartSeat.citation);
  });

  it("cites the planetary temperaments only when the rationale invokes them (clean humoral opposite)", () => {
    // Mars ↔ Venus is a clean opposite (hot/dry vs cold/wet): the rationale
    // names both temperaments, so both are cited.
    const marsAntipathy = recommend(headIssue).antipathy;
    const temperamentCited = marsAntipathy.citations.some((c) =>
      /Of the Power of the Planets/i.test(c.locator),
    );
    expect(temperamentCited).toBe(true);

    // Sun ↔ Saturn is NOT a clean opposite (both dry): the rationale states
    // opposing rulership and names no temperament, so none is cited.
    const sunAntipathy = recommend(heartIssue).antipathy;
    const noTemperament = sunAntipathy.citations.every(
      (c) => !/Of the Power of the Planets/i.test(c.locator),
    );
    expect(noTemperament).toBe(true);
  });

  it("de-duplicates citations and gives every one a non-empty quote", () => {
    const { sympathy, antipathy } = recommend(headIssue);
    for (const config of [sympathy, antipathy]) {
      const keys = config.citations.map((c) => `${c.source}|${c.locator}|${c.quote}`);
      expect(new Set(keys).size).toBe(keys.length);
      for (const c of config.citations) {
        expect(c.quote).not.toBe("");
      }
    }
  });
});

describe("recommend — the Moon carries waxing", () => {
  it("adds the waxing condition to a Moon entry but not to other planets", () => {
    // Sympathy on a Moon-ruled seat strengthens the Moon itself.
    const moon = recommend(chestIssue).sympathy.entries.find((e) => e.planet === "Moon")!;
    expect(moon.conditions).toContain("waxing");

    // Saturn, the antipathy planet for a Sun seat, must not carry waxing.
    const saturn = recommend(heartIssue).antipathy.entries.find((e) => e.planet === "Saturn")!;
    expect(saturn.conditions).not.toContain("waxing");
  });
});
