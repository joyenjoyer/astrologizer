import { describe, it, expect } from "vitest";
import { contraryOf, planetsWithQuality } from "./humors.ts";

describe("contraryOf", () => {
  it("flips both the temperature and the moisture axes", () => {
    expect(contraryOf({ temperature: "hot", moisture: "dry" })).toEqual({
      temperature: "cold",
      moisture: "wet",
    });
    expect(contraryOf({ temperature: "cold", moisture: "wet" })).toEqual({
      temperature: "hot",
      moisture: "dry",
    });
  });
});

describe("planetsWithQuality", () => {
  it("returns the planets whose temperament matches the given quality on both axes", () => {
    // Cold & wet: Moon and Venus.
    expect(planetsWithQuality({ temperature: "cold", moisture: "wet" }).sort()).toEqual(
      ["Moon", "Venus"],
    );
  });

  it("returns the hot & dry planets (Sun, Mars)", () => {
    expect(planetsWithQuality({ temperature: "hot", moisture: "dry" }).sort()).toEqual(
      ["Mars", "Sun"],
    );
  });
});
