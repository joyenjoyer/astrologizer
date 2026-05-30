import type { Issue, Recommendation } from "./types.ts";

/**
 * The core deep module. Given an issue (seat + humoral quality), derive the
 * recommended configurations by sympathy and by antipathy.
 *
 * Pure and deterministic: no DOM, no network, no clock. See docs/PRD.md for
 * the derivation rules. Not yet implemented — this scaffolds the boundary.
 */
export function recommend(_issue: Issue): Recommendation {
  throw new Error("recommend() is not implemented yet");
}
