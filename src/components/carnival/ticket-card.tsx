"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Gauge } from "lucide-react";
import { categoryByKey } from "@/lib/constants";
import { formatMiles, formatUSD } from "@/lib/utils";
import { listingQuality, listingSavings } from "@/lib/listing-extras";
import type { SampleListing } from "@/lib/sample-listings";

/**
 * Listing card styled as a carnival ticket stub: photo, perforated tear line with
 * punched notches, "ADMIT ONE" microcopy, a Featured marquee tag with a shine sweep,
 * and a spring lift on hover. Reduced motion: no lift/sweep.
 */
export function TicketCard({ listing }: { listing: SampleListing }) {
  const reduce = useReducedMotion();
  const cat = categoryByKey(listing.category);
  const save = useMemo(() => listingSavings(listing), [listing]);
  const quality = useMemo(() => listingQuality(listing), [listing]);

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="group relative"
    >
      <Link
        href={`/inventory/${listing.id}`}
        className="block overflow-hidden rounded-2xl bg-[#FFFCF4] shadow-card ring-1 ring-navy-900/10 transition-shadow group-hover:shadow-lift"
      >
        {/* Photo */}
        <div className="relative aspect-[4/3] overflow-hidden bg-navy-50">
          <Image
            src={listing.photos[0]}
            alt={`${listing.year} ${listing.make} ${listing.model}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />

          {listing.featured && (
            <span className="absolute left-0 top-3 inline-flex items-center overflow-hidden rounded-r-md bg-marquee-500 py-1 pl-3 pr-3 font-marquee text-xs uppercase tracking-wider text-navy-950 shadow">
              Featured
              {!reduce && (
                <span className="pointer-events-none absolute inset-0 -translate-x-[120%] skew-x-[-20deg] bg-white/55 group-hover:animate-shine" />
              )}
            </span>
          )}

          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-pine-600/95 px-2 py-0.5 text-[11px] font-semibold text-white ring-1 ring-pine-700/40">
            <Gauge className="h-3 w-3" strokeWidth={2.5} /> {quality.label} {quality.score}
          </span>
        </div>

        {/* Body */}
        <div className="px-4 pb-2 pt-3">
          <h3 className="font-display text-lg font-semibold leading-tight text-navy-900">
            {listing.year} {listing.make} {listing.model}
          </h3>
          <p className="mt-0.5 text-sm text-navy-800/70">
            {listing.trim} · {formatMiles(listing.mileage)}
          </p>
          {quality.vinVerified && (
            <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-pine-600">
              <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2.5} /> VIN verified · clean title
            </span>
          )}
        </div>

        {/* Tear line with punched notches */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-cream ring-1 ring-navy-900/10"
          />
          <div
            aria-hidden
            className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-cream ring-1 ring-navy-900/10"
          />
          <div className="mx-3 border-t-2 border-dashed border-navy-900/15" />
        </div>

        {/* Stub */}
        <div className="flex items-end justify-between gap-3 px-4 pb-4 pt-3">
          <div>
            <p className="font-marquee text-[11px] uppercase tracking-[0.25em] text-navy-800/55">
              Admit one
            </p>
            <p className="text-xs font-medium text-navy-800/70">{cat?.label}</p>
            {save > 0 && (
              <span className="mt-1.5 inline-block rounded-full bg-mint px-2 py-0.5 text-[11px] font-bold text-pine-700">
                Save ~{formatUSD(save)} vs dealer
              </span>
            )}
          </div>
          <div className="text-right">
            <p className="font-marquee text-2xl leading-none text-carnival-600">
              {formatUSD(listing.price)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
