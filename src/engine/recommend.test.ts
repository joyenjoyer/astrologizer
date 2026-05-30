import { describe, it, expect } from "vitest";
import { recommend } from "./recommend.ts";
import type { Issue } from "./types.ts";

const eyesHotDry: Issue = {
  seat: {
    id: "eyes",
    label: "Eyes",
    rulingSign: "Aries",
    rulingPlanet: "Sun",
    quality: { temperature: "hot", moisture: "dry" },
    citation: "placeholder",
    system: "classical-western",
  },
  quality: { temperature: "hot", moisture: "dry" },
};

describe("recommend", () => {
  // The boundary exists; behaviour is implemented in a later step.
  it("is not implemented yet", () => {
    expect(() => recommend(eyesHotDry)).toThrow(/not implemented/);
  });

  // Planned behaviour tests (see docs/PRD.md → Testing Decisions):
  it.todo("strengthens the Sun and Moon by sympathy for an eye complaint");
  it.todo("counters a hot & dry affliction with cooling, moist planets by antipathy");
  it.todo("labels each dignified sign as domicile or exaltation");
  it.todo("returns the same recommendation for the same issue (deterministic)");
  it.todo("exercises every planet across the full 14-seat starter set");
});
