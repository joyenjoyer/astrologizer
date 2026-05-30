import type { KnowledgeBase } from "../engine/knowledgeBase.ts";
import type { Issue } from "../engine/types.ts";

/**
 * Map a picker selection to an Issue. In this slice there is no second-level
 * quality step yet, so the issue's quality defaults to the seat's own quality.
 * A later slice adds the "nature of the complaint" choice.
 */
export function selectSeat(kb: KnowledgeBase, seatId: string): Issue {
  const seat = kb.getSeat(seatId);
  if (!seat) {
    throw new Error(`Unknown seat: ${seatId}`);
  }
  return { seat, quality: seat.quality };
}
