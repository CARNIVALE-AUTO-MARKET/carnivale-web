import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUSD(amount: number, opts: { cents?: boolean } = {}) {
  const value = opts.cents ? amount / 100 : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatMiles(mi: number) {
  return new Intl.NumberFormat("en-US").format(mi) + " mi";
}

/**
 * Mask a phone number so the seller's real number is NEVER printed.
 * CANONICAL: window profile shows a masked relay number only.
 * In production this maps to a per-listing relay (e.g. Twilio) number.
 */
export function maskedRelay(seed: string) {
  // Deterministic placeholder relay extension from the listing id.
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const ext = String(1000 + (h % 9000));
  return `(844) 555-${ext.slice(0, 2)}${ext.slice(2)}`;
}
