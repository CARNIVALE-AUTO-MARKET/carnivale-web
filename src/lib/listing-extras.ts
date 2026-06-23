import { mockComps } from "@/lib/comps/client";
import type { SampleListing } from "@/lib/sample-listings";

/**
 * Lightweight, synchronous derivations used by ticket cards (no async comps call).
 * `mockComps` is a pure function, so the card's "save ~$X" matches the detail page.
 */
export function listingSavings(listing: SampleListing): number {
  const comps = mockComps({
    year: listing.year,
    make: listing.make,
    model: listing.model,
    trim: listing.trim,
    mileage: listing.mileage,
    zip: listing.zip,
    price: listing.price,
  });
  return comps.estimatedSavings.vsMedian;
}

export interface ListingQuality {
  score: number; // 0–100 (sample/demo)
  label: string;
  vinVerified: boolean;
  cleanTitle: boolean;
}

/** Deterministic demo "condition" score from age + mileage. Sample data only. */
export function listingQuality(listing: SampleListing): ListingQuality {
  const age = Math.max(0, 2026 - listing.year);
  const milesPerYear = listing.mileage / Math.max(1, age);
  let score = 92 - age * 1.4 - Math.max(0, (milesPerYear - 9000) / 1200);
  score = Math.round(Math.min(98, Math.max(68, score)));
  const label = score >= 90 ? "Excellent" : score >= 82 ? "Great" : score >= 74 ? "Clean" : "Solid";
  return { score, label, vinVerified: true, cleanTitle: true };
}
