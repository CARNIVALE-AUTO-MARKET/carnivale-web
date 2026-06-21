import type { CompsResponse, EstimatedSavings } from "./types";

/**
 * Contract rule (CANONICAL):
 *   estimatedSavings.vsMedian = dealerRetail.median - price  (when price supplied)
 *                             = dealerRetail.median - privatePartyValue  (otherwise)
 *
 * Pure + unit-tested so the UI's "You save ~$X" figure always matches the contract.
 */
export function computeSavings(args: {
  dealerMedian: number;
  dealerLow: number;
  dealerHigh: number;
  privatePartyValue: number;
  price?: number;
}): EstimatedSavings {
  const { dealerMedian, dealerLow, dealerHigh, privatePartyValue, price } = args;
  const basis = typeof price === "number" ? price : privatePartyValue;
  const vsMedian = Math.max(0, Math.round(dealerMedian - basis));
  const low = Math.max(0, Math.round(dealerLow - basis));
  const high = Math.max(0, Math.round(dealerHigh - basis));
  const range: [number, number] = low <= high ? [low, high] : [high, low];
  return { vsMedian, range };
}

/** Convenience for the UI. */
export function savingsFromComps(comps: CompsResponse): EstimatedSavings {
  return comps.estimatedSavings;
}
