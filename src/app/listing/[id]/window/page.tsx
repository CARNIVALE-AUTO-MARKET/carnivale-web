import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Logo } from "@/components/logo";
import { CompsBlock } from "@/components/comps-block";
import { PlaceholderQR } from "@/components/placeholder-qr";
import { PrintButton } from "./print-button";
import { getSampleListing, SAMPLE_LISTINGS } from "@/lib/sample-listings";
import { getComps } from "@/lib/comps/client";
import { categoryByKey, DISCLAIMER } from "@/lib/constants";
import { formatMiles, formatUSD, maskedRelay } from "@/lib/utils";

export function generateStaticParams() {
  return SAMPLE_LISTINGS.map((l) => ({ id: l.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const l = getSampleListing(params.id);
  return { title: l ? `Window profile — ${l.year} ${l.make} ${l.model}` : "Window profile" };
}

export default async function WindowProfilePage({ params }: { params: { id: string } }) {
  const listing = getSampleListing(params.id);
  if (!listing) notFound();

  const comps = await getComps({
    year: listing.year,
    make: listing.make,
    model: listing.model,
    trim: listing.trim,
    mileage: listing.mileage,
    zip: listing.zip,
    price: listing.price,
  });
  const cat = categoryByKey(listing.category);
  const relay = maskedRelay(listing.id);

  return (
    <div className="min-h-screen bg-navy-50 py-8 print:bg-white print:py-0">
      <div className="container max-w-3xl">
        <div className="no-print mb-4 flex items-center justify-between">
          <p className="text-sm text-navy-800/70">Printable window profile — Phase 0 preview.</p>
          <PrintButton />
        </div>

        {/* The printed sheet */}
        <div className="rounded-2xl border-2 border-navy-900 bg-white p-8 shadow-card print:rounded-none print:border-0 print:shadow-none">
          <div className="flex items-center justify-between border-b-2 border-navy-900 pb-4">
            <Logo />
            <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-navy-950">
              {cat?.label}
            </span>
          </div>

          <div className="mt-6 flex items-start justify-between gap-6">
            <div>
              <h1 className="font-display text-3xl font-bold text-navy-900">
                {listing.year} {listing.make} {listing.model}
              </h1>
              <p className="text-lg text-navy-800/75">{listing.trim}</p>
              <p className="mt-4 font-display text-5xl font-bold text-carnival-600">
                {formatUSD(listing.price)}
              </p>
              <p className="text-sm font-medium text-navy-800/70">Private-party price</p>
            </div>
            <div className="text-center">
              <PlaceholderQR seed={listing.id} size={132} />
              <p className="mt-1 text-xs text-navy-800/60">Scan to view online</p>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Spec label="Mileage" value={formatMiles(listing.mileage)} />
            <Spec label="VIN" value={listing.vin} />
            <Spec label="Location" value={listing.zip} />
            <Spec label="Category" value={cat?.label ?? "—"} />
          </dl>

          <div className="mt-6 rounded-xl border-2 border-navy-900 p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-navy-800/60">
              Contact the seller (masked relay — call or text)
            </p>
            <p className="font-display text-3xl font-bold tracking-wider text-navy-900">{relay}</p>
            <p className="text-xs text-navy-800/55">The seller&rsquo;s real number is never shown.</p>
          </div>

          <div className="mt-6">
            <CompsBlock comps={comps} price={listing.price} />
          </div>

          <p className="mt-6 border-t border-navy-900/15 pt-4 text-[11px] leading-relaxed text-navy-800/60">
            {DISCLAIMER}
          </p>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-navy-900/15 p-2.5">
      <dt className="text-[10px] uppercase tracking-wide text-navy-800/55">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-navy-900">{value}</dd>
    </div>
  );
}
