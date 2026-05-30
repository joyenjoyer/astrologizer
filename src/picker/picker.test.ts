import { describe, it, expect } from "vitest";
import { loadKnowledgeBase } from "../engine/knowledgeBase.ts";
import { selectSeat } from "./picker.ts";

const kb = loadKnowledgeBase([
  {
    id: "heart",
    label: "Heart / upper back / spine",
    rulingSign: "Leo",
    rulingPlanet: "Sun",
    quality: { temperature: "hot", moisture: "dry" },
    citation: "Culpeper, Astrological Judgement of Diseases",
    system: "classical-western",
  },
]);

describe("selectSeat", () => {
  it("builds an issue for the selected seat", () => {
    const issue = selectSeat(kb, "heart");
    expect(issue.seat.id).toBe("heart");
  });

  it("defaults the issue quality to the seat's own quality (no quality step yet)", () => {
    const issue = selectSeat(kb, "heart");
    expect(issue.quality).toEqual({ temperature: "hot", moisture: "dry" });
  });

  it("throws when the seat is not in the knowledge base", () => {
    expect(() => selectSeat(kb, "nope")).toThrow(/unknown seat/i);
  });
});
