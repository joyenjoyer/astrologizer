import type { Seat } from "./types.ts";

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
  if (!seat.quality) throw new Error(`${where} is missing its humoral quality`);
  if (!seat.citation) throw new Error(`${where} is missing its citation`);
  if (!seat.system) throw new Error(`${where} is missing its system`);
  return seat as Seat;
}
