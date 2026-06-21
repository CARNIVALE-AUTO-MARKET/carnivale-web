/**
 * Types for the shared Comps Service contract.
 * Source of truth: carnivale-ops/contracts/comps-contract.md (CANONICAL).
 * carnivale-web consumes EXACTLY this shape; any change starts as an ops Issue.
 *
 * Endpoint: GET /comps?year&make&model&trim&mileage&zip[&price]
 */

export interface CompsVehicle {
  year: number;
  make: string;
  model: string;
  trim: string;
  mileage: number;
  zip: string;
}

export interface DealerRetail {
  low: number;
  median: number;
  high: number;
}

export interface ComparableDealerListing {
  price: number;
  mileage: number;
  dealer: string;
  distanceMi: number;
  url: string;
  source: string;
}

export interface EstimatedSavings {
  /** dealerRetail.median - price (when price supplied) else vs privatePartyValue */
  vsMedian: number;
  range: [number, number];
}

export interface CompsResponse {
  vehicle: CompsVehicle;
  privatePartyValue: number;
  dealerRetail: DealerRetail;
  comparableDealerListings: ComparableDealerListing[];
  estimatedSavings: EstimatedSavings;
  source: string;
  /** ISO date */
  asOf: string;
  disclaimer: string;
}

export interface CompsQuery {
  year: number;
  make: string;
  model: string;
  trim: string;
  mileage: number;
  zip: string;
  /** Seller's asking price, if known. */
  price?: number;
}
