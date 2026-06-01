import type { Citation, Seat } from "./types.ts";

export type KnowledgeBase = {
  getSeat(id: string): Seat | undefined;
  listSeats(): Seat[];
};

/**
 * Load and validate the hand-authored seat data. Throws loudly on any seat
 * missing a required field, so authoring mistakes surface at load time
 * rather than producing silent, un-citable recommendations.
 */
export function loadKnowledgeBase(rawSeats: unknown[]): KnowledgeBase {
  const seats = rawSeats.map(validateSeat);
  return {
    getSeat: (id) => seats.find((s) => s.id === id),
    listSeats: () => [...seats],
  };
}

function validateSeat(raw: unknown): Seat {
  const seat = raw as Partial<Seat>;
  const where = seat.id ? `seat "${seat.id}"` : "a seat";
  if (!seat.id) throw new Error(`${where} is missing its id`);
  if (!seat.label) throw new Error(`${where} is missing its label`);
  if (!seat.rulingSign) throw new Error(`${where} is missing its ruling sign`);
  if (!seat.rulingPlanet) throw new Error(`${where} is missing its ruling planet`);
  if (!seat.citation) throw new Error(`${where} is missing its citation`);
  validateCitation(seat.citation, `${where}'s citation`);
  if (!seat.system) throw new Error(`${where} is missing its system`);
  return seat as Seat;
}

/**
 * Assert a citation carries a verbatim quote, not just a reference. Used for
 * every sourced knowledge unit — seats here, and the engine's dignity,
 * temperament, and contrary-pairing tables. Throws loudly so an un-citable
 * recommendation can never ship (docs/adr/0002-citations-on-knowledge-units.md).
 */
export function validateCitation(citation: Citation, where: string): Citation {
  if (!citation.source) throw new Error(`${where} is missing its source`);
  if (!citation.locator) throw new Error(`${where} is missing its locator`);
  if (!citation.quote) throw new Error(`${where} is missing its verbatim quote`);
  return citation;
}
