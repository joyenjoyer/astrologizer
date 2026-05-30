import { describe, it, expect } from "vitest";
import { PICKER_TREE } from "../data/pickerTree.ts";
import { flattenSeatIds } from "./picker.ts";
import type { PickerNode } from "./picker.ts";
import { SEATS } from "../data/seats.ts";
import { loadKnowledgeBase } from "../engine/knowledgeBase.ts";

const kb = loadKnowledgeBase(SEATS);

describe("the picker tree", () => {
  it("offers body, mind and emotions at the top level", () => {
    const topLabels = PICKER_TREE.map((n) => n.label.toLowerCase());
    expect(topLabels.some((l) => l.includes("body"))).toBe(true);
    expect(topLabels.some((l) => l.includes("mind"))).toBe(true);
    expect(topLabels.some((l) => l.includes("emotion"))).toBe(true);
  });

  it("makes every seat in the knowledge base reachable", () => {
    const reachable = new Set(flattenSeatIds(PICKER_TREE));
    for (const seat of kb.listSeats()) {
      expect(reachable.has(seat.id)).toBe(true);
    }
  });

  it("never points to a seat that is not in the knowledge base", () => {
    for (const seatId of flattenSeatIds(PICKER_TREE)) {
      expect(kb.getSeat(seatId)).toBeDefined();
    }
  });

  it("drills the broad 'Back' branch down to the upper- and lower-back seats", () => {
    const back = findBranch(PICKER_TREE, /back/i);
    expect(back).toBeDefined();
    const seatIds = flattenSeatIds([back!]);
    expect(seatIds).toContain("heart"); // upper back & spine
    expect(seatIds).toContain("lower-back");
  });
});

// Local traversal helper for the test (finds the first branch matching a label).
function findBranch(nodes: PickerNode[], pattern: RegExp): PickerNode | undefined {
  for (const node of nodes) {
    if (node.kind === "branch") {
      if (pattern.test(node.label)) return node;
      const nested = findBranch(node.children, pattern);
      if (nested) return nested;
    }
  }
  return undefined;
}
