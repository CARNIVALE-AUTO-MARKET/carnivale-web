import Stripe from "stripe";

/**
 * Server-side Stripe client. Returns null when STRIPE_SECRET_KEY is unset, in which
 * case the create-listing flow uses a MOCK checkout so the preview stays clickable.
 * Set TEST-MODE keys in Vercel env to enable real Stripe (CANONICAL: CARNIVALE account).
 */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2024-06-20" });
}

export const isStripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY?.trim());
