/**
 * Brand + business constants.
 * Business rules trace to carnivale-ops/CANONICAL.md. Anything marked PLACEHOLDER
 * is not yet locked in canonical and is clearly surfaced as such in the UI.
 */

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
 * Flat fee by vehicle category (CANONICAL: flat fee by category, never % of sale price;
 * plus a Large/Premium lane + a Premium Seller upsell). Amounts are PLACEHOLDER until
 * Brian locks pricing in CANONICAL.
 */
export type CategoryKey = "standard" | "truck_large" | "premium";

export interface VehicleCategory {
  key: CategoryKey;
  label: string;
  blurb: string;
  /** Display fee in USD cents. PLACEHOLDER. */
  feeCents: number;
  examples: string;
}

export const CATEGORIES: VehicleCategory[] = [
  {
    key: "standard",
    label: "Standard",
    blurb: "Most cars, sedans, and compact SUVs.",
    feeCents: 5900,
    examples: "Civic, Camry, CR-V, Escape",
  },
  {
    key: "truck_large",
    label: "Truck / Large SUV / Van",
    blurb: "Full-size trucks, 3-row SUVs, vans.",
    feeCents: 8900,
    examples: "F-150, Silverado, Tahoe, Odyssey",
  },
  {
    key: "premium",
    label: "Premium / Large lane",
    blurb: "Luxury, performance, and high-value vehicles.",
    feeCents: 12900,
    examples: "BMW M, Corvette, Range Rover",
  },
];

/** Optional add-on: Premium Seller upsell (featured placement, pro photos). PLACEHOLDER. */
export const PREMIUM_SELLER_ADDON = {
  key: "premium_seller",
  label: "Premium Seller",
  feeCents: 4900,
  blurb: "Featured placement, banner spot, and pro photo touch-ups.",
} as const;

/** Refundable deposit held at listing time, in USD cents (env-overridable). PLACEHOLDER amount. */
export const DEFAULT_DEPOSIT_CENTS = Number(
  process.env.STRIPE_DEPOSIT_AMOUNT_CENTS ?? 10000,
);

export function categoryByKey(key: string): VehicleCategory | undefined {
  return CATEGORIES.find((c) => c.key === key);
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
