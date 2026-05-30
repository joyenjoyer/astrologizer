import type { PickerNode } from "../picker/picker.ts";

// The navigable picker tree. Broad, plain-language branches drill down to the
// atomic seats in src/data/seats.ts. Body / Mind / Emotions sit at the top.
// A seat may appear under more than one branch (e.g. the heart seat is reached
// both as "Heart" and as the upper back under "Back").
export const PICKER_TREE: PickerNode[] = [
  {
    kind: "branch",
    label: "Body",
    children: [
      { kind: "seat", label: "Head, face & brain", seatId: "head" },
      { kind: "seat", label: "Neck & throat", seatId: "neck" },
      { kind: "seat", label: "Arms, hands & lungs", seatId: "arms" },
      { kind: "seat", label: "Chest & stomach", seatId: "chest" },
      { kind: "seat", label: "Heart", seatId: "heart" },
      {
        kind: "branch",
        label: "Back",
        children: [
          { kind: "seat", label: "Upper back & spine", seatId: "heart" },
          { kind: "seat", label: "Lower back & kidneys", seatId: "lower-back" },
        ],
      },
      { kind: "seat", label: "Abdomen, intestines & digestion", seatId: "abdomen" },
      { kind: "seat", label: "Genitals & bladder", seatId: "genitals" },
      { kind: "seat", label: "Hips & thighs", seatId: "hips" },
      { kind: "seat", label: "Knees, bones & skin", seatId: "knees" },
      { kind: "seat", label: "Calves, ankles & circulation", seatId: "calves" },
      { kind: "seat", label: "Feet", seatId: "feet" },
    ],
  },
  {
    kind: "branch",
    label: "Mind",
    children: [{ kind: "seat", label: "Mind, intellect & nerves", seatId: "mind" }],
  },
  {
    kind: "branch",
    label: "Emotions",
    children: [{ kind: "seat", label: "Emotions & moods", seatId: "emotions" }],
  },
];
