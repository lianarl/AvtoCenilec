import { describe, expect, it } from "vitest";
import { calculateValuation, getBrands, getModels, type CarInput } from "@/lib/valuation";

describe("valuation data helpers", () => {
  it("returns a non-empty, alphabetically sorted brand list", () => {
    const brands = getBrands();
    expect(brands.length).toBeGreaterThan(0);

    const sortedBrands = [...brands].sort((a, b) => a.localeCompare(b));
    expect(brands).toEqual(sortedBrands);
  });

  it("returns an empty model list for an unknown brand", () => {
    expect(getModels("__unknown_brand__")).toEqual([]);
  });
});

describe("calculateValuation", () => {
  it("returns a valid valuation shape with consistent range values", () => {
    const input: CarInput = {
      brand: "Toyota",
      model: "Corolla",
      year: 2020,
      mileage: 50000,
      transmission: "manual",
      fuelType: "gasoline",
    };

    const result = calculateValuation(input);

    expect(Number.isFinite(result.estimatedPrice)).toBe(true);
    expect(Number.isFinite(result.rangeLow)).toBe(true);
    expect(Number.isFinite(result.rangeHigh)).toBe(true);
    expect(result.rangeLow).toBeLessThanOrEqual(result.estimatedPrice);
    expect(result.rangeHigh).toBeGreaterThanOrEqual(result.estimatedPrice);
    expect(result.factors.length).toBeGreaterThan(0);
    expect(result.explanation.trim().length).toBeGreaterThan(0);

    for (const factor of result.factors) {
      expect(factor.name.trim().length).toBeGreaterThan(0);
      expect(factor.description.trim().length).toBeGreaterThan(0);
      expect(Number.isFinite(factor.percentage)).toBe(true);
    }
  });
});
