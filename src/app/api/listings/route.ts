import { NextResponse } from "next/server";
import { createClient, getUser } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";
import { laneByKey, quote, LANES, type LaneKey } from "@/lib/pricing";

interface Body {
  category: string;
  premium?: boolean;
  year: number;
  make: string;
  model: string;
  trim?: string;
  mileage: number;
  vin?: string;
  zip: string;
  price: number;
  description?: string;
  photoPaths?: string[];
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const lane = laneByKey(body.category) ?? LANES[1];
  const q = quote(lane.key as LaneKey, Boolean(body.premium));
  const feeCents = q.displayFeeCents;
  const premiumCents = q.premiumCents;
  const depositCents = q.depositCents;

  // Basic validation.
  if (!body.make || !body.model || !body.year || !body.price || !body.zip) {
    return NextResponse.json({ error: "Missing required vehicle fields." }, { status: 400 });
  }

  const origin = new URL(request.url).origin;
  const supabase = createClient();

  // ── Demo mode: no backend configured. Return a mock confirmation. ──────────
  if (!supabase) {
    const q = new URLSearchParams({
      mock: "1",
      demo: "1",
      y: String(body.year),
      mk: body.make,
      md: body.model,
      price: String(body.price),
    });
    return NextResponse.json({ url: `${origin}/sell/success?${q.toString()}` });
  }

  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  // ── Persist the listing (pending payment) ─────────────────────────────────
  const { data: listing, error: listErr } = await supabase
    .from("listings")
    .insert({
      seller_id: user.id,
      year: body.year,
      make: body.make,
      model: body.model,
      trim: body.trim || null,
      mileage: body.mileage,
      vin: body.vin || null,
      zip: body.zip,
      category: lane.key,
      price: body.price,
      description: body.description || null,
      photo_paths: body.photoPaths ?? [],
      status: "pending_payment",
    })
    .select("id")
    .single();

  if (listErr || !listing) {
    return NextResponse.json(
      { error: `Could not save listing: ${listErr?.message ?? "unknown"}` },
      { status: 500 },
    );
  }

  const { data: payment, error: payErr } = await supabase
    .from("payments")
    .insert({
      listing_id: listing.id,
      seller_id: user.id,
      fee_cents: feeCents,
      premium_cents: premiumCents,
      deposit_cents: depositCents,
      deposit_status: "held",
      status: "created",
    })
    .select("id")
    .single();

  if (payErr || !payment) {
    return NextResponse.json(
      { error: `Could not create payment: ${payErr?.message ?? "unknown"}` },
      { status: 500 },
    );
  }

  const stripe = getStripe();

  // ── Stripe not configured: mock-complete so the preview flow finishes. ─────
  if (!stripe) {
    await supabase.from("payments").update({ status: "paid" }).eq("id", payment.id);
    await supabase.from("listings").update({ status: "active" }).eq("id", listing.id);
    return NextResponse.json({
      url: `${origin}/sell/success?listing=${listing.id}&mock=1`,
    });
  }

  // ── Real Stripe Checkout (TEST mode): display fee + Premium + Show-Up Deposit ─
  try {
    const lineItems: Array<{
      quantity: number;
      price_data: { currency: string; unit_amount: number; product_data: { name: string } };
    }> = [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: feeCents,
          product_data: { name: `CARNIVALE ${lane.label} display fee` },
        },
      },
    ];
    if (premiumCents > 0) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: premiumCents,
          product_data: { name: "Premium Seller add-on (non-refundable)" },
        },
      });
    }
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: depositCents,
        product_data: { name: "Show-Up Deposit (refunded at Friday drop-off)" },
      },
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      metadata: { listing_id: listing.id, payment_id: payment.id, seller_id: user.id },
      success_url: `${origin}/sell/success?listing=${listing.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/sell/new?canceled=1`,
    });

    await supabase
      .from("payments")
      .update({ status: "requires_payment", stripe_session_id: session.id })
      .eq("id", payment.id);

    if (!session.url) throw new Error("Stripe did not return a checkout URL.");
    return NextResponse.json({ url: session.url });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Stripe error." },
      { status: 500 },
    );
  }
}
