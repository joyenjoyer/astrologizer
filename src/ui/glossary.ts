// Plain-language definitions for the jargon the result view underlines. These
// mirror the canonical glossary in CONTEXT.md (the single source of truth for
// the vocabulary) — keep the two aligned so the in-app help can't drift from
// the domain language.

const GLOSSARY: Record<string, string> = {
  sympathy:
    "Treatment by sympathy strengthens the planet that governs the affected part, supporting it directly.",
  antipathy:
    "Treatment by antipathy strengthens the contrary planet — the one that rules the opposite signs — to counter the affliction.",
  dignity:
    "A sign in which a planet is essentially strong: its domicile (rulership) or its exaltation. To strengthen a planet you place it in one of its dignities.",
  domicile: "The sign a planet rules — its home, where it is strongest.",
  exaltation: "A sign, other than its home, where a planet is held in special honour and strength.",
  condition:
    "A required state of a planet in the prescription, such as dignified, unafflicted, or (for the Moon) waxing.",
  dignified: "Placed in its domicile or exaltation — essentially strong.",
  unafflicted: "Free of hard aspects from the malefic planets (Mars and Saturn).",
  waxing: "Growing in light, between new and full — a condition asked of the Moon.",
  "humoral quality":
    "The Galenic hot/cold and wet/dry nature of a planet (Ptolemy). Here it is explanatory commentary, not the computation: antipathy pairs planets by opposing rulership, not by humoral opposite.",
  "contrary planet":
    "The planet paired to another by opposing rulership (it rules the opposite signs): Sun↔Saturn, Moon↔Saturn, Mars↔Venus, Mercury↔Jupiter.",
  seat:
    "What an issue afflicts — a body part, a faculty, or a vital function. Each seat maps to one ruling sign and planet.",
  configuration:
    "The core output: a set of planets, each with a recommended sign and condition, prescribed to address an issue.",
};

/** The full list of defined terms (lower-case keys). */
export const GLOSSARY_TERMS = Object.keys(GLOSSARY);

/** Look up a term's plain-language definition (case-insensitive). */
export function defineTerm(term: string): string | undefined {
  return GLOSSARY[term.toLowerCase()];
}
