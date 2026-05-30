// Hand-authored seat data (classical Western medical astrology): the full
// melothesia — one atomic seat per sign — plus two non-physical seats for the
// mind and the emotions. Validated at load by loadKnowledgeBase().
//
// Humoral quality follows the triplicity of each seat's ruling sign:
//   Fire (Aries/Leo/Sagittarius) hot & dry · Earth (Taurus/Virgo/Capricorn) cold & dry
//   Air (Gemini/Libra/Aquarius) hot & wet · Water (Cancer/Scorpio/Pisces) cold & wet
//
// Source for the melothesia and rulerships: Culpeper, Astrological Judgement
// of Diseases (1655).
const CULPEPER = "Culpeper, Astrological Judgement of Diseases (1655)";

export const SEATS = [
  {
    id: "head",
    label: "Head, face & brain",
    rulingSign: "Aries",
    rulingPlanet: "Mars",
    quality: { temperature: "hot", moisture: "dry" },
    citation: CULPEPER,
    system: "classical-western",
  },
  {
    id: "neck",
    label: "Neck & throat",
    rulingSign: "Taurus",
    rulingPlanet: "Venus",
    quality: { temperature: "cold", moisture: "dry" },
    citation: CULPEPER,
    system: "classical-western",
  },
  {
    id: "arms",
    label: "Arms, hands & lungs",
    rulingSign: "Gemini",
    rulingPlanet: "Mercury",
    quality: { temperature: "hot", moisture: "wet" },
    citation: CULPEPER,
    system: "classical-western",
  },
  {
    id: "chest",
    label: "Chest & stomach",
    rulingSign: "Cancer",
    rulingPlanet: "Moon",
    quality: { temperature: "cold", moisture: "wet" },
    citation: CULPEPER,
    system: "classical-western",
  },
  {
    id: "heart",
    label: "Heart, upper back & spine",
    rulingSign: "Leo",
    rulingPlanet: "Sun",
    quality: { temperature: "hot", moisture: "dry" },
    citation: CULPEPER,
    system: "classical-western",
  },
  {
    id: "abdomen",
    label: "Abdomen, intestines & digestion",
    rulingSign: "Virgo",
    rulingPlanet: "Mercury",
    quality: { temperature: "cold", moisture: "dry" },
    citation: CULPEPER,
    system: "classical-western",
  },
  {
    id: "lower-back",
    label: "Lower back & kidneys",
    rulingSign: "Libra",
    rulingPlanet: "Venus",
    quality: { temperature: "hot", moisture: "wet" },
    citation: CULPEPER,
    system: "classical-western",
  },
  {
    id: "genitals",
    label: "Genitals & bladder",
    rulingSign: "Scorpio",
    rulingPlanet: "Mars",
    quality: { temperature: "cold", moisture: "wet" },
    citation: CULPEPER,
    system: "classical-western",
  },
  {
    id: "hips",
    label: "Hips & thighs",
    rulingSign: "Sagittarius",
    rulingPlanet: "Jupiter",
    quality: { temperature: "hot", moisture: "dry" },
    citation: CULPEPER,
    system: "classical-western",
  },
  {
    id: "knees",
    label: "Knees, bones & skin",
    rulingSign: "Capricorn",
    rulingPlanet: "Saturn",
    quality: { temperature: "cold", moisture: "dry" },
    citation: CULPEPER,
    system: "classical-western",
  },
  {
    id: "calves",
    label: "Calves, ankles & circulation",
    rulingSign: "Aquarius",
    rulingPlanet: "Saturn",
    quality: { temperature: "hot", moisture: "wet" },
    citation: CULPEPER,
    system: "classical-western",
  },
  {
    id: "feet",
    label: "Feet",
    rulingSign: "Pisces",
    rulingPlanet: "Jupiter",
    quality: { temperature: "cold", moisture: "wet" },
    citation: CULPEPER,
    system: "classical-western",
  },
  {
    id: "mind",
    label: "Mind, intellect & nerves",
    rulingSign: "Gemini",
    rulingPlanet: "Mercury",
    quality: { temperature: "hot", moisture: "wet" },
    citation: CULPEPER,
    system: "classical-western",
  },
  {
    id: "emotions",
    label: "Emotions & moods",
    rulingSign: "Cancer",
    rulingPlanet: "Moon",
    quality: { temperature: "cold", moisture: "wet" },
    citation: CULPEPER,
    system: "classical-western",
  },
];
