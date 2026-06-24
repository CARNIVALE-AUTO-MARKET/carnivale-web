"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, FileCheck2, Gauge, ScanLine, TrendingDown, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { EnamelBadge } from "@/components/carnival/enamel-badge";
import { PlaceholderQR } from "@/components/placeholder-qr";
import { mockComps } from "@/lib/comps/client";
import { listingQuality } from "@/lib/listing-extras";
import { categoryByKey, COMPS_DISCLAIMER, DISCLAIMER, NEXT_EVENT } from "@/lib/constants";
import { formatMiles, formatUSD, maskedRelay } from "@/lib/utils";
import type { SampleListing } from "@/lib/sample-listings";

/** Extra vehicle details not in the seed/DB row (real listings supply these later). */
export interface WindowSheetDetails {
  transmission: string;
  drivetrain: string;
  fuel: string;
  extColor: string;
  intColor: string;
  owners: string;
}

/**
 * The OFFICIAL WINDOW SHEET — exactly what CARNIVALE prints and puts on a car's
 * window at the event. Portrait, print-friendly, Display-Pass/ticket aesthetic.
 *
 * Reusable: pass a listing (price/specs match Browse + detail via the same mockComps),
 * optional extra `details`, and a `relay` masked number. Guardrails: masked relay only
 * (never a real phone), comps = data not advice, private-party framing, not-a-dealer
 * footer. `sample` adds the clear SAMPLE label + watermark.
 */
export function WindowSheet({
  listing,
  details,
  relay,
  sample = false,
}: {
  listing: SampleListing;
  details: WindowSheetDetails;
  relay?: string;
  sample?: boolean;
}) {
  const reduce = useReducedMotion();
  const cat = categoryByKey(listing.category);
  const quality = listingQuality(listing);
  const comps = mockComps({
    year: listing.year,
    make: listing.make,
    model: listing.model,
    trim: listing.trim,
    mileage: listing.mileage,
    zip: listing.zip,
    price: listing.price,
  });
  const vinLast4 = listing.vin.slice(-4);
  const relayNumber = relay ?? maskedRelay(listing.id);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18, rotate: -0.6 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl bg-[#FFFCF4] shadow-lift ring-1 ring-navy-900/15"
    >
      {/* SAMPLE watermark */}
      {sample && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-20 grid place-items-center overflow-hidden">
          <span className="rotate-[-24deg] font-marquee text-5xl uppercase tracking-widest text-carnival-600/10 sm:text-6xl">
            Sample · Sample
          </span>
        </div>
      )}

      {/* Header band */}
      <div className="relative bg-navy-900 px-5 pb-4 pt-4 text-cream">
        <div aria-hidden className="candy-stripe absolute inset-x-0 top-0 h-1.5" />
        <div className="flex items-center justify-between pt-1">
          <Logo light />
          <span className="font-marquee text-[11px] uppercase tracking-[0.22em] text-marquee-500">
            Official Window Sheet
          </span>
        </div>
        <p className="mt-1 text-center text-[11px] uppercase tracking-wide text-slate-300">
          {NEXT_EVENT.venue.split(" (")[0]} · CARNIVALE weekend
        </p>
      </div>

      {/* perforation + notches */}
      <div className="relative">
        <div aria-hidden className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-cream ring-1 ring-navy-900/10" />
        <div aria-hidden className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-cream ring-1 ring-navy-900/10" />
        <div className="mx-4 border-t-2 border-dashed border-navy-900/15" />
      </div>

      <div className="relative z-10 px-5 py-5">
        {/* Vehicle title */}
        <p className="font-marquee text-xs uppercase tracking-[0.2em] text-carnival-600">
          {cat?.label}
        </p>
        <h3 className="mt-0.5 font-display text-2xl font-semibold leading-tight text-navy-900">
          {listing.year} {listing.make} {listing.model} {listing.trim}
        </h3>

        {/* Price block */}
        <div className="mt-4 rounded-xl bg-navy-900 px-4 py-3 text-center">
          <p className="font-marquee text-4xl leading-none text-marquee-500">
            {formatUSD(listing.price)}
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-wide text-slate-300">
            Private seller asking price
          </p>
        </div>

        {/* Spec grid */}
        <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <Spec label="Mileage" value={formatMiles(listing.mileage)} />
          <Spec label="Transmission" value={details.transmission} />
          <Spec label="Drivetrain" value={details.drivetrain} />
          <Spec label="Fuel" value={details.fuel} />
          <Spec label="Exterior" value={details.extColor} />
          <Spec label="Interior" value={details.intColor} />
          <Spec label="Owners" value={details.owners} />
          <Spec label="Title" value="Clean" />
          <Spec label="VIN" value={`••••${vinLast4} · verified`} className="col-span-2" />
        </dl>

        {/* Enamel trust pins */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          <EnamelBadge icon={BadgeCheck} tone="pine">VIN Verified</EnamelBadge>
          <EnamelBadge icon={FileCheck2} tone="pine">Clean Title</EnamelBadge>
          <EnamelBadge icon={TrendingDown} tone="gold">Market-Priced</EnamelBadge>
          <EnamelBadge icon={Gauge} tone="navy">Quality {quality.score}</EnamelBadge>
        </div>

        {/* Private-vs-dealer savings panel */}
        <div className="mt-4 rounded-xl bg-mint p-4 ring-1 ring-pine-600/20">
          <p className="font-marquee text-xs uppercase tracking-[0.18em] text-pine-700">
            Private vs. dealer
          </p>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            <SaveStat label="This private price" value={formatUSD(listing.price)} />
            <SaveStat
              label="Comparable dealer"
              value={`${formatUSD(comps.dealerRetail.low)}–${formatUSD(comps.dealerRetail.high)}`}
            />
            <SaveStat
              label="You save ~"
              value={formatUSD(comps.estimatedSavings.vsMedian)}
              accent
            />
          </div>
          <p className="mt-2 text-[10px] leading-snug text-navy-800/60">
            {COMPS_DISCLAIMER}
          </p>
        </div>

        {/* Contact block — QR + masked relay only */}
        <div className="mt-4 flex items-center gap-4 rounded-xl border border-navy-900/15 bg-white p-3">
          <PlaceholderQR seed={listing.id} size={84} />
          <div className="min-w-0">
            <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-navy-800/60">
              <ScanLine className="h-3.5 w-3.5" /> Scan for full listing, photos &amp; history
            </p>
            <p className="mt-1 flex items-center gap-1.5 font-marquee text-xl text-navy-900">
              <Phone className="h-4 w-4 text-carnival-600" /> {relayNumber}
            </p>
            <p className="text-[10px] leading-snug text-navy-800/60">
              CARNIVALE relay; the seller&rsquo;s real number stays private.
            </p>
          </div>
        </div>

        {/* Footer disclaimer */}
        <p className="mt-4 border-t border-navy-900/10 pt-3 text-[9px] leading-snug text-navy-800/55">
          {DISCLAIMER}
        </p>
      </div>
    </motion.div>
  );
}

function Spec({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={"rounded-lg bg-cream/70 px-2.5 py-1.5 ring-1 ring-navy-900/5 " + (className ?? "")}>
      <dt className="text-[10px] uppercase tracking-wide text-navy-800/55">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-navy-900">{value}</dd>
    </div>
  );
}

function SaveStat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-navy-800/55">{label}</p>
      <p className={"font-marquee text-base leading-tight " + (accent ? "text-pine-700" : "text-navy-900")}>
        {value}
      </p>
    </div>
  );
}
