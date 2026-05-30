import type { KnowledgeBase } from "../engine/knowledgeBase.ts";
import type { HumoralQuality, Issue } from "../engine/types.ts";

/** A selectable "nature of the complaint" for the picker's second level. */
export type ComplaintNature = {
  label: string;
  quality: HumoralQuality;
};

/** The four humoral natures a complaint can take, with plain-language labels. */
export const COMPLAINT_NATURES: ComplaintNature[] = [
  { label: "Hot & dry (inflamed, red, feverish)", quality: { temperature: "hot", moisture: "dry" } },
  { label: "Hot & wet (swollen, feverish, sweating)", quality: { temperature: "hot", moisture: "wet" } },
  { label: "Cold & dry (stiff, withered, melancholic)", quality: { temperature: "cold", moisture: "dry" } },
  { label: "Cold & wet (watery, swollen, sluggish)", quality: { temperature: "cold", moisture: "wet" } },
];

/**
 * Map a two-level picker selection — the affected seat plus the chosen nature
 * of the complaint — to an Issue. The quality comes from the user's choice, not
 * the seat's own resting quality.
 */
export function selectIssue(
  kb: KnowledgeBase,
  seatId: string,
  quality: HumoralQuality,
): Issue {
  const seat = kb.getSeat(seatId);
  if (!seat) {
    throw new Error(`Unknown seat: ${seatId}`);
  }
  return { seat, quality };
}
