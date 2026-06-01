// Hand-authored seat data (classical Western medical astrology): the full
// melothesia — one atomic seat per sign — plus two non-physical seats for the
// mind and the emotions. Validated at load by loadKnowledgeBase().
//
// An Issue is a seat and nothing more: the humoral nature of the complaint is
// no longer modelled here (see docs/adr/0003-antipathy-by-contrary-planet.md).
//
// Source for the melothesia and rulerships: Culpeper, Astrological Judgement
// of Diseases (1655). Each seat→ruler mapping is a knowledge unit and carries
// its own verbatim citation (docs/adr/0002-citations-on-knowledge-units.md).
//
// NOTE: Culpeper's text could not be sourced freely online, so the quotes below
// are UNVERIFIED PLACEHOLDER paraphrases of the melothesia, not transcriptions.
// Each must be replaced with a verbatim passage before it can ship as cited.
// See docs/citations-verification.md.
import type { Citation } from "../engine/types.ts";

const CULPEPER = (locator: string, quote: string): Citation => ({
  source: "Culpeper, Astrological Judgement of Diseases (1655)",
  locator,
  quote: `[unverified placeholder — needs real Culpeper passage] ${quote}`,
});

export const SEATS = [
  {
    id: "head",
    label: "Head, face & brain",
    rulingSign: "Aries",
    rulingPlanet: "Mars",
    citation: CULPEPER("Aries", "Aries governs the head and face."),
    system: "classical-western",
  },
  {
    id: "neck",
    label: "Neck & throat",
    rulingSign: "Taurus",
    rulingPlanet: "Venus",
    citation: CULPEPER("Taurus", "Taurus governs the neck and throat."),
    system: "classical-western",
  },
  {
    id: "arms",
    label: "Arms, hands & lungs",
    rulingSign: "Gemini",
    rulingPlanet: "Mercury",
    citation: CULPEPER("Gemini", "Gemini governs the arms, hands and shoulders."),
    system: "classical-western",
  },
  {
    id: "chest",
    label: "Chest & stomach",
    rulingSign: "Cancer",
    rulingPlanet: "Moon",
    citation: CULPEPER("Cancer", "Cancer governs the breast and stomach."),
    system: "classical-western",
  },
  {
    id: "heart",
    label: "Heart, upper back & spine",
    rulingSign: "Leo",
    rulingPlanet: "Sun",
    citation: CULPEPER("Leo", "Leo governs the heart and back."),
    system: "classical-western",
  },
  {
    id: "abdomen",
    label: "Abdomen, intestines & digestion",
    rulingSign: "Virgo",
    rulingPlanet: "Mercury",
    citation: CULPEPER("Virgo", "Virgo governs the bowels and belly."),
    system: "classical-western",
  },
  {
    id: "lower-back",
    label: "Lower back & kidneys",
    rulingSign: "Libra",
    rulingPlanet: "Venus",
    citation: CULPEPER("Libra", "Libra governs the reins and kidneys."),
    system: "classical-western",
  },
  {
    id: "genitals",
    label: "Genitals & bladder",
    rulingSign: "Scorpio",
    rulingPlanet: "Mars",
    citation: CULPEPER("Scorpio", "Scorpio governs the secret members and bladder."),
    system: "classical-western",
  },
  {
    id: "hips",
    label: "Hips & thighs",
    rulingSign: "Sagittarius",
    rulingPlanet: "Jupiter",
    citation: CULPEPER("Sagittarius", "Sagittarius governs the hips and thighs."),
    system: "classical-western",
  },
  {
    id: "knees",
    label: "Knees, bones & skin",
    rulingSign: "Capricorn",
    rulingPlanet: "Saturn",
    citation: CULPEPER("Capricorn", "Capricorn governs the knees."),
    system: "classical-western",
  },
  {
    id: "calves",
    label: "Calves, ankles & circulation",
    rulingSign: "Aquarius",
    rulingPlanet: "Saturn",
    citation: CULPEPER("Aquarius", "Aquarius governs the legs and ankles."),
    system: "classical-western",
  },
  {
    id: "feet",
    label: "Feet",
    rulingSign: "Pisces",
    rulingPlanet: "Jupiter",
    citation: CULPEPER("Pisces", "Pisces governs the feet."),
    system: "classical-western",
  },
  {
    id: "mind",
    label: "Mind, intellect & nerves",
    rulingSign: "Gemini",
    rulingPlanet: "Mercury",
    citation: CULPEPER("Mercury / Gemini", "Mercury governs the brain, tongue and the rational faculty."),
    system: "classical-western",
  },
  {
    id: "emotions",
    label: "Emotions & moods",
    rulingSign: "Cancer",
    rulingPlanet: "Moon",
    citation: CULPEPER("Moon / Cancer", "The Moon governs the affections and the moist humours of the body."),
    system: "classical-western",
  },
];
