// Domain types for the recommendation engine. These encode the data-shape
// decisions from docs/PRD.md and the vocabulary in CONTEXT.md. They are
// intentionally UI- and framework-free.

/** The seven classical planets. */
export type Planet =
  | "Sun"
  | "Moon"
  | "Mercury"
  | "Venus"
  | "Mars"
  | "Jupiter"
  | "Saturn";

/** The twelve zodiac signs. */
export type Sign =
  | "Aries"
  | "Taurus"
  | "Gemini"
  | "Cancer"
  | "Leo"
  | "Virgo"
  | "Libra"
  | "Scorpio"
  | "Sagittarius"
  | "Capricorn"
  | "Aquarius"
  | "Pisces";

/** Galenic hot/cold/wet/dry classification (CONTEXT.md: Humoral quality). */
export type HumoralQuality = {
  temperature: "hot" | "cold";
  moisture: "wet" | "dry";
};

/** A named astrological tradition (ADR-0001). Only one is populated for now. */
export type System = "classical-western";

/** A seat is atomic for now: it maps to exactly one ruling sign + planet. */
export type Seat = {
  id: string;
  label: string;
  rulingSign: Sign;
  rulingPlanet: Planet;
  quality: HumoralQuality;
  citation: string;
  system: System;
};

/** What the person is addressing: a seat plus the quality of the complaint. */
export type Issue = {
  seat: Seat;
  quality: HumoralQuality;
};

export type TreatmentMethod = "sympathy" | "antipathy";

export type Condition = "dignified" | "unafflicted" | "waxing";

export type Dignity = "domicile" | "exaltation";

/** A planet placed in a dignified sign within a configuration. */
export type ConfigurationEntry = {
  planet: Planet;
  signs: Array<{ sign: Sign; dignity: Dignity }>;
  conditions: Condition[];
};

/** The core output: a prescription derived by one treatment method. */
export type Configuration = {
  method: TreatmentMethod;
  system: System;
  entries: ConfigurationEntry[];
  rationale: string;
  citations: string[];
};

export type Recommendation = {
  issue: Issue;
  sympathy: Configuration;
  antipathy: Configuration;
};
