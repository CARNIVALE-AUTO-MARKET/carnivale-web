import { describe, expect, it } from "vitest";
import { computeSavings } from "./savings";

describe("computeSavings", () => {
  it("uses price as the basis when supplied (contract rule)", () => {
    const s = computeSavings({
      dealerMedian: 18200,
      dealerLow: 16800,
      dealerHigh: 20200,
      privatePartyValue: 14250,
      price: 14250,
    });
    expect(s.vsMedian).toBe(3950);
    expect(s.range).toEqual([2550, 5950]);
  });

  it("falls back to privatePartyValue when price is absent", () => {
    const s = computeSavings({
      dealerMedian: 18200,
      dealerLow: 16800,
      dealerHigh: 20200,
      privatePartyValue: 15000,
    });
    expect(s.vsMedian).toBe(3200);
  });

  it("never returns negative savings", () => {
    const s = computeSavings({
      dealerMedian: 10000,
      dealerLow: 9000,
      dealerHigh: 11000,
      privatePartyValue: 9000,
      price: 12000,
    });
    expect(s.vsMedian).toBe(0);
    expect(s.range[0]).toBeGreaterThanOrEqual(0);
  });
});
