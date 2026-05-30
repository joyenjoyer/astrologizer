import { describe, it, expect } from "vitest";
import { loadKnowledgeBase } from "./knowledgeBase.ts";

const validSeat = {
  id: "heart",
  label: "Heart / upper back / spine",
  rulingSign: "Leo",
  rulingPlanet: "Sun",
  quality: { temperature: "hot", moisture: "dry" },
  citation: "Culpeper, Astrological Judgement of Diseases",
  system: "classical-western",
};

describe("loadKnowledgeBase", () => {
  it("loads valid seat data and exposes it by id", () => {
    const kb = loadKnowledgeBase([validSeat]);
    expect(kb.getSeat("heart")?.rulingPlanet).toBe("Sun");
    expect(kb.listSeats()).toHaveLength(1);
  });

  it("rejects a seat missing its citation", () => {
    const { citation: _omit, ...noCitation } = validSeat;
    expect(() => loadKnowledgeBase([noCitation])).toThrow(/citation/i);
  });

  it("rejects a seat missing its ruling planet", () => {
    const { rulingPlanet: _omit, ...noRuler } = validSeat;
    expect(() => loadKnowledgeBase([noRuler])).toThrow(/ruling planet/i);
  });

  it("rejects a seat missing its humoral quality", () => {
    const { quality: _omit, ...noQuality } = validSeat;
    expect(() => loadKnowledgeBase([noQuality])).toThrow(/quality/i);
  });
});
