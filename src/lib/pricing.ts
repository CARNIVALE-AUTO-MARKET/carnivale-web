/**
 * CARNIVALE pricing v2 — the "Show-Up Deposit" model.
 * Source of truth: carnivale-ops/CANONICAL.md (Pricing locked).
 *
 * Every reservation = a flat display fee by VEHICLE TYPE (never % of sale price),
 * charged upfront together with a flat $100 Show-Up Deposit. The deposit is refunded
 * the moment the seller drops the car off Friday (forfeited on a no-show; refunded on
 * 72h+ advance cancellation). "Net for the weekend" = the display fee (+ optional
 * non-refundable Premium add-on), i.e. what the seller keeps having spent.
 */

export type LaneKey = "powersports" | "standard" | "large";

export interface Lane {
  key: LaneKey;
  label: string;
  /** Vehicle types in this lane (lanes are by TYPE, not value). */
  types: string;
  blurb: string;
  /** Display fee in USD cents = the net weekend cost (deposit is refunded). */
  displayFeeCents: number;
}

/** Flat, fully-refundable Show-Up Deposit charged on every reservation. */
export const DEPOSIT_CENTS = 10000; // $100

/** Optional Premium Seller add-on — non-refundable, no deposit. */
export const PREMIUM_ADDON = {
  key: "premium_seller",
  label: "Premium Seller",
  feeCents: 9900, // +$99
  blurb: "Marquee + homepage feature, social spotlight, and a prime spot on the lot.",
} as const;

/** Charity (CANONICAL): 10% of every reservation, split 50/50. % is a starting figure. */
export const CHARITY_PERCENT = 10;
export const CHARITY_LINE =
  "10% of every reservation supports Dunwoody scholarships and a rotating community charity (split 50/50).";

export const LANES: Lane[] = [
  {
    key: "powersports",
    label: "Powersports",
    types: "ATV · motorcycle · PWC · snowmobile",
    blurb: "Two wheels, side-by-sides, and water/snow toys.",
    displayFeeCents: 9900, // net $99  → pay today $199
  },
  {
    key: "standard",
    label: "Car / Truck / SUV / Van",
    types: "Car · truck · SUV · van",
    blurb: "Everyday cars, trucks, SUVs, and vans.",
    displayFeeCents: 14900, // net $149 → pay today $249
  },
  {
    key: "large",
    label: "RV / Boat / Trailer / Large",
    types: "RV · boat · trailer · oversized",
    blurb: "RVs, boats, trailers, and oversized rigs.",
    displayFeeCents: 24900, // net $249 → pay today $349
  },
];

export function laneByKey(key: string): Lane | undefined {
  return LANES.find((l) => l.key === key);
}

export interface Quote {
  laneKey: LaneKey;
  displayFeeCents: number;
  premiumCents: number;
  depositCents: number;
  /** Charged upfront today. */
  payTodayCents: number;
  /** Refunded at Friday drop-off (the deposit). */
  refundedAtDropoffCents: number;
  /** Net cost for the weekend after the deposit refund. */
  netCents: number;
}

/** Compute the full price breakdown for a lane (+ optional Premium add-on). */
export function quote(laneKey: LaneKey, premium = false): Quote {
  const lane = laneByKey(laneKey) ?? LANES[1];
  const premiumCents = premium ? PREMIUM_ADDON.feeCents : 0;
  const displayFeeCents = lane.displayFeeCents;
  const payTodayCents = displayFeeCents + premiumCents + DEPOSIT_CENTS;
  return {
    laneKey: lane.key,
    displayFeeCents,
    premiumCents,
    depositCents: DEPOSIT_CENTS,
    payTodayCents,
    refundedAtDropoffCents: DEPOSIT_CENTS,
    netCents: displayFeeCents + premiumCents,
  };
}
