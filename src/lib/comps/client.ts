import { COMPS_DISCLAIMER } from "@/lib/constants";
import { computeSavings } from "./savings";
import type { CompsQuery, CompsResponse, ComparableDealerListing } from "./types";

/**
 * Typed client for the Comps Service (contracts/comps-contract.md).
 *
 * If COMPS_API_URL is set, calls the live carnivale-comps service (Laptop's project).
 * Otherwise returns realistic MOCK data behind the SAME interface so the UI works today.
 * The shape is identical in both modes — swapping in the live service is config-only.
 */
export async function getComps(query: CompsQuery): Promise<CompsResponse> {
  const base = process.env.COMPS_API_URL?.trim();
  if (base) {
    const url = new URL("/comps", base);
    url.searchParams.set("year", String(query.year));
    url.searchParams.set("make", query.make);
    url.searchParams.set("model", query.model);
    url.searchParams.set("trim", query.trim);
    url.searchParams.set("mileage", String(query.mileage));
    url.searchParams.set("zip", query.zip);
    if (typeof query.price === "number") url.searchParams.set("price", String(query.price));

    const res = await fetch(url, { next: { revalidate: 60 * 60 } });
    if (!res.ok) throw new Error(`comps service ${res.status}`);
    return (await res.json()) as CompsResponse;
  }
  return mockComps(query);
}

/** Deterministic pseudo-random in [0,1) from a string seed (stable across renders). */
function seeded(seed: string): () => number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    const t = (h ^= h >>> 16) >>> 0;
    return t / 4294967296;
  };
}

const MOCK_DEALERS = [
  "Lakeside Auto Group",
  "Twin Cities Motors",
  "Northland Pre-Owned",
  "Meridian Auto Mall",
  "Greenway Certified",
  "Riverside Motor Co.",
];

/** Realistic sample comps. Private price is typically well below dealer retail. */
export function mockComps(query: CompsQuery): CompsResponse {
  const rand = seeded(
    `${query.year}|${query.make}|${query.model}|${query.trim}|${query.mileage}`,
  );

  // Anchor to the asking price if we have one, else synthesize a plausible value.
  const askingOrPrivate =
    query.price ?? Math.round(8000 + rand() * 26000);
  const privatePartyValue = query.price
    ? Math.round(query.price * (0.97 + rand() * 0.04))
    : askingOrPrivate;

  // Dealer retail sits ~14–30% above private-party.
  const markup = 1.14 + rand() * 0.16;
  const median = Math.round((privatePartyValue * markup) / 50) * 50;
  const low = Math.round((median * (0.9 + rand() * 0.03)) / 50) * 50;
  const high = Math.round((median * (1.08 + rand() * 0.05)) / 50) * 50;

  const listings: ComparableDealerListing[] = Array.from({ length: 4 }).map((_, i) => {
    const price = Math.round((low + rand() * (high - low)) / 5) * 5;
    const mileage = Math.max(
      1000,
      Math.round((query.mileage * (0.8 + rand() * 0.5)) / 100) * 100,
    );
    return {
      price,
      mileage,
      dealer: MOCK_DEALERS[(i + Math.floor(rand() * MOCK_DEALERS.length)) % MOCK_DEALERS.length],
      distanceMi: Math.round(3 + rand() * 45),
      url: "https://example-dealer.test/listing/" + (1000 + Math.floor(rand() * 9000)),
      source: "MarketCheck (sample)",
    };
  });

  const savings = computeSavings({
    dealerMedian: median,
    dealerLow: low,
    dealerHigh: high,
    privatePartyValue,
    price: query.price,
  });

  return {
    vehicle: {
      year: query.year,
      make: query.make,
      model: query.model,
      trim: query.trim,
      mileage: query.mileage,
      zip: query.zip,
    },
    privatePartyValue,
    dealerRetail: { low, median, high },
    comparableDealerListings: listings,
    estimatedSavings: savings,
    source: "MarketCheck (sample)",
    asOf: "2026-06-20",
    disclaimer: COMPS_DISCLAIMER,
  };
}
