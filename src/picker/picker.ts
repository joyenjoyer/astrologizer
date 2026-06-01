import type { KnowledgeBase } from "../engine/knowledgeBase.ts";
import type { Issue } from "../engine/types.ts";

/**
 * A node in the picker tree: either a branch the user drills into, or a leaf
 * that selects an atomic seat. A seat may be reachable by more than one path
 * (e.g. the heart seat appears under both "Heart" and "Back").
 */
export type PickerNode =
  | { kind: "branch"; label: string; children: PickerNode[] }
  | { kind: "seat"; label: string; seatId: string };

/** Every seat id reachable as a leaf anywhere in the given tree. */
export function flattenSeatIds(nodes: PickerNode[]): string[] {
  return nodes.flatMap((node) =>
    node.kind === "seat" ? [node.seatId] : flattenSeatIds(node.children),
  );
}

/**
 * Map a picker selection — the affected seat — to an Issue. An Issue is a seat
 * and nothing more; the humoral nature of the complaint is no longer asked for
 * (see docs/adr/0003-antipathy-by-contrary-planet.md).
 */
export function selectIssue(kb: KnowledgeBase, seatId: string): Issue {
  const seat = kb.getSeat(seatId);
  if (!seat) {
    throw new Error(`Unknown seat: ${seatId}`);
  }
  return { seat };
}
