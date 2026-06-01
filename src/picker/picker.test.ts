import { describe, it, expect } from "vitest";
import { loadKnowledgeBase } from "../engine/knowledgeBase.ts";
import { selectIssue } from "./picker.ts";

const kb = loadKnowledgeBase([
  {
    id: "heart",
    label: "Heart / upper back / spine",
    rulingSign: "Leo",
    rulingPlanet: "Sun",
    citation: {
      source: "Culpeper, Astrological Judgement of Diseases (1655)",
      locator: "Leo",
      quote: "Leo governeth the heart and back.",
    },
    system: "classical-western",
  },
]);

describe("selectIssue", () => {
  it("builds an issue for the selected seat", () => {
    const issue = selectIssue(kb, "heart");
    expect(issue.seat.id).toBe("heart");
  });

  it("returns a seat-only issue with no humoral-quality field", () => {
    const issue = selectIssue(kb, "heart");
    expect(issue).toEqual({ seat: kb.getSeat("heart") });
    expect(issue).not.toHaveProperty("quality");
  });

  it("throws when the seat is not in the knowledge base", () => {
    expect(() => selectIssue(kb, "nope")).toThrow(/unknown seat/i);
  });
});
