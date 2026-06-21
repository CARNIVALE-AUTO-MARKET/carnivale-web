import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Stripe webhook — marks the payment paid + activates the listing.
 * Configure the endpoint + STRIPE_WEBHOOK_SECRET in the CARNIVALE Stripe dashboard.
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Stripe not configured." }, { status: 503 });
  }

  const sig = request.headers.get("stripe-signature");
  const raw = await request.text();
  if (!sig) return NextResponse.json({ error: "Missing signature." }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, webhookSecret);
  } catch (e) {
    return NextResponse.json(
      { error: `Signature verification failed: ${e instanceof Error ? e.message : ""}` },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const listingId = session.metadata?.listing_id;
    const paymentId = session.metadata?.payment_id;
    const admin = createAdminClient();

    if (admin && paymentId && listingId) {
      await admin.from("payments").update({ status: "paid" }).eq("id", paymentId);
      await admin.from("listings").update({ status: "active" }).eq("id", listingId);
    }
  }

  return NextResponse.json({ received: true });
}
