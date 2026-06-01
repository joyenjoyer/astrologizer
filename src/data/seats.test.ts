import { describe, it, expect } from "vitest";
import { SEATS } from "./seats.ts";
import { loadKnowledgeBase } from "../engine/knowledgeBase.ts";
import { selectIssue } from "../picker/picker.ts";
import { recommend } from "../engine/recommend.ts";

const kb = loadKnowledgeBase(SEATS);

describe("the starter seat set", () => {
  it("contains all 14 seats and validates cleanly", () => {
    expect(kb.listSeats()).toHaveLength(14);
  });

  it("gives every seat a unique id", () => {
    const ids = kb.listSeats().map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("includes the two non-physical seats (mind and emotions)", () => {
    expect(kb.getSeat("mind")).toBeDefined();
    expect(kb.getSeat("emotions")).toBeDefined();
  });

  it("produces both a sympathy and an antipathy configuration for every seat", () => {
    for (const seat of kb.listSeats()) {
      const rec = recommend(selectIssue(kb, seat.id));
      expect(rec.sympathy.entries.length).toBeGreaterThan(0);
      expect(rec.antipathy.entries.length).toBeGreaterThan(0);
    }
  });
});
