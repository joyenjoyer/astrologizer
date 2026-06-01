import { describe, it, expect } from "vitest";
import { loadKnowledgeBase } from "./knowledgeBase.ts";

const validSeat = {
  id: "heart",
  label: "Heart / upper back / spine",
  rulingSign: "Leo",
  rulingPlanet: "Sun",
  citation: {
    source: "Culpeper, Astrological Judgement of Diseases (1655)",
    locator: "The Sign Leo",
    quote: "Leo governeth the heart and back.",
  },
  system: "classical-western",
};

describe("loadKnowledgeBase", () => {
  it("loads valid seat data and exposes it by id", () => {
    const kb = loadKnowledgeBase([validSeat]);
    expect(kb.getSeat("heart")?.rulingPlanet).toBe("Sun");
    expect(kb.listSeats()).toHaveLength(1);
  });

  it("rejects a seat missing its ruling planet", () => {
    const { rulingPlanet: _omit, ...noRuler } = validSeat;
    expect(() => loadKnowledgeBase([noRuler])).toThrow(/ruling planet/i);
  });

  it("no longer requires a humoral quality (a seat is just a seat)", () => {
    expect(() => loadKnowledgeBase([validSeat])).not.toThrow();
  });

  it("rejects a seat whose citation is missing its verbatim quote", () => {
    const noQuote = { ...validSeat, citation: { ...validSeat.citation, quote: "" } };
    expect(() => loadKnowledgeBase([noQuote])).toThrow(/quote/i);
  });

  it("rejects a seat whose citation is missing its source", () => {
    const noSource = { ...validSeat, citation: { ...validSeat.citation, source: "" } };
    expect(() => loadKnowledgeBase([noSource])).toThrow(/source/i);
  });

  it("rejects a seat whose citation is missing its locator", () => {
    const noLocator = { ...validSeat, citation: { ...validSeat.citation, locator: "" } };
    expect(() => loadKnowledgeBase([noLocator])).toThrow(/locator/i);
  });

  it("rejects a seat with no citation at all", () => {
    const { citation: _omit, ...noCitation } = validSeat;
    expect(() => loadKnowledgeBase([noCitation])).toThrow(/citation/i);
  });
});
