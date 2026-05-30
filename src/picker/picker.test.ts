import { describe, it, expect } from "vitest";
import { loadKnowledgeBase } from "../engine/knowledgeBase.ts";
import { selectIssue, COMPLAINT_NATURES } from "./picker.ts";

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

describe("selectIssue", () => {
  it("builds an issue for the selected seat", () => {
    const issue = selectIssue(kb, "heart", { temperature: "hot", moisture: "dry" });
    expect(issue.seat.id).toBe("heart");
  });

  it("uses the chosen complaint quality, not the seat's own quality", () => {
    const issue = selectIssue(kb, "heart", { temperature: "cold", moisture: "wet" });
    expect(issue.quality).toEqual({ temperature: "cold", moisture: "wet" });
  });

  it("throws when the seat is not in the knowledge base", () => {
    expect(() =>
      selectIssue(kb, "nope", { temperature: "hot", moisture: "dry" }),
    ).toThrow(/unknown seat/i);
  });
});

describe("COMPLAINT_NATURES", () => {
  it("offers a labeled humoral quality for every temperature/moisture combination", () => {
    expect(COMPLAINT_NATURES).toHaveLength(4);
    for (const nature of COMPLAINT_NATURES) {
      expect(nature.label).toBeTruthy();
      expect(nature.quality).toHaveProperty("temperature");
      expect(nature.quality).toHaveProperty("moisture");
    }
  });
});
