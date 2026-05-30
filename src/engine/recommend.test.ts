import { describe, it, expect } from "vitest";
import { recommend } from "./recommend.ts";
import type { Issue } from "./types.ts";

const heartIssue: Issue = {
  seat: {
    id: "heart",
    label: "Heart / upper back / spine",
    rulingSign: "Leo",
    rulingPlanet: "Sun",
    quality: { temperature: "hot", moisture: "dry" },
    citation: "Culpeper, Astrological Judgement of Diseases",
    system: "classical-western",
  },
  quality: { temperature: "hot", moisture: "dry" },
};

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
    expect(sympathy.citations).toContain(heartIssue.seat.citation);
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
