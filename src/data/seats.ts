// Hand-authored seat data (classical Western medical astrology). One seat in
// this slice; later slices grow this to the full 14-seat starter set.
// Validated at load by loadKnowledgeBase().
export const SEATS = [
  {
    id: "heart",
    label: "Heart / upper back / spine",
    rulingSign: "Leo",
    rulingPlanet: "Sun",
    quality: { temperature: "hot", moisture: "dry" },
    citation: "Culpeper, Astrological Judgement of Diseases (1655)",
    system: "classical-western",
  },
];
