/**
 * Brand + business constants.
 * Business rules trace to carnivale-ops/CANONICAL.md. Anything marked PLACEHOLDER
 * is not yet locked in canonical and is clearly surfaced as such in the UI.
 */
import { LANES, laneByKey, type Lane, type LaneKey, DEPOSIT_CENTS, PREMIUM_ADDON } from "./pricing";

export const BRAND = {
  name: "CARNIVALE",
  tagline: "The safest way to sell your vehicle — and the most fun place to buy one.",
  navy: "#14283C",
  red: "#C0392B",
  amber: "#E0A800",
} as const;

/** CANONICAL legal disclaimer — must appear in the footer and on every listing. */
export const DISCLAIMER =
  "CARNIVALE is an advertising and event service, not a dealer. All vehicles are sold by " +
  "private owners. CARNIVALE is not a party to any transaction, never takes title or " +
  "possession, and never handles the buyer's funds. Comparable-price information is shown " +
  "for reference only and is data, not advice.";

export const COMPS_DISCLAIMER =
  "Comparable dealer listings shown for reference; individual prices and conditions vary. " +
  "Comps are data, not advice.";

/**
 * Pricing v2 lanes (CANONICAL: flat display fee by VEHICLE TYPE, never % of sale price).
 * The canonical numbers live in `pricing.ts`; these aliases keep listing/browse code
 * (which calls a vehicle's "category") working against the type lanes.
 */
export type CategoryKey = LaneKey;
export type VehicleCategory = Lane & { examples: string; feeCents: number };

export const CATEGORIES: VehicleCategory[] = LANES.map((l) => ({
  ...l,
  examples: l.types,
  feeCents: l.displayFeeCents,
}));

/** Optional add-on: Premium Seller (marquee + homepage feature, social spotlight, prime spot). */
export const PREMIUM_SELLER_ADDON = PREMIUM_ADDON;

/** Flat Show-Up Deposit in USD cents (env-overridable for Stripe). */
export const DEFAULT_DEPOSIT_CENTS = Number(
  process.env.STRIPE_DEPOSIT_AMOUNT_CENTS ?? DEPOSIT_CENTS,
);

export function categoryByKey(key: string): VehicleCategory | undefined {
  const lane = laneByKey(key);
  return lane ? { ...lane, examples: lane.types, feeCents: lane.displayFeeCents } : undefined;
}

/** Placeholder event — real dates/location set later (clearly marked in UI). */
export const NEXT_EVENT = {
  city: "Minneapolis, MN",
  venue: "Dunwoody College of Technology (target lot)",
  // PLACEHOLDER dates — not yet locked.
  dateLabel: "Summer 2026 — dates to be announced",
  hours: "Saturday & Sunday, 9am–6pm (Friday: drop-off only)",
  isPlaceholder: true,
} as const;

export const PRIMARY_NAV: { href: string; label: string }[] = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/inventory", label: "Browse" },
  { href: "/sell", label: "Sell Your Car" },
  { href: "/pricing", label: "Pricing" },
  { href: "/dates-location", label: "Dates & Location" },
];

export const FOOTER_NAV: { href: string; label: string }[] = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/sell", label: "Register to Sell" },
  { href: "/pricing", label: "Pricing & Categories" },
  { href: "/inventory", label: "Browse Inventory" },
  { href: "/tips", label: "Tips for Sellers" },
  { href: "/buying", label: "Buying a Vehicle" },
  { href: "/vendors", label: "Vendors & Sponsors" },
  { href: "/dates-location", label: "Dates & Location" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About / Dunwoody" },
  { href: "/contact", label: "Contact" },
];
