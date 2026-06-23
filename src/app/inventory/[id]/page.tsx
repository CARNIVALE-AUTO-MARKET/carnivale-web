import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, Printer, ShieldCheck, BadgeCheck, FileCheck2, Gauge } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { CompsBlock } from "@/components/comps-block";
import { EnamelBadge } from "@/components/carnival/enamel-badge";
import { Section } from "@/components/page";
import { getSampleListing, SAMPLE_LISTINGS } from "@/lib/sample-listings";
import { getComps } from "@/lib/comps/client";
import { listingQuality } from "@/lib/listing-extras";
import { categoryByKey, DISCLAIMER } from "@/lib/constants";
import { formatMiles, formatUSD, maskedRelay } from "@/lib/utils";

export function generateStaticParams() {
  return SAMPLE_LISTINGS.map((l) => ({ id: l.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const l = getSampleListing(params.id);
  if (!l) return { title: "Listing" };
  return { title: `${l.year} ${l.make} ${l.model} ${l.trim}` };
}

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
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
  const quality = listingQuality(listing);
  const relay = maskedRelay(listing.id);

  return (
    <Section className="pt-8">
      <Link href="/inventory" className="text-sm font-medium text-carnival-600 hover:underline">
        ← Back to inventory
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-navy-50 ring-1 ring-navy-900/10">
            <Image
              src={listing.photos[0]}
              alt={`${listing.year} ${listing.make} ${listing.model}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            {listing.featured && (
              <span className="absolute left-0 top-4 rounded-r-md bg-marquee-500 py-1 pl-4 pr-3 font-marquee text-xs uppercase tracking-wider text-navy-950 shadow">
                Featured
              </span>
            )}
          </div>
          {listing.photos.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {listing.photos.slice(1, 5).map((p, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-navy-50">
                  <Image src={p} alt="" fill sizes="20vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary + contact */}
        <div>
          <p className="font-marquee text-sm uppercase tracking-[0.25em] text-carnival-600">
            {cat?.label}
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-navy-900">
            {listing.year} {listing.make} {listing.model}
          </h1>
          <p className="text-navy-800/70">{listing.trim}</p>
          <p className="mt-4 font-marquee text-5xl leading-none text-carnival-600">
            {formatUSD(listing.price)}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <EnamelBadge icon={BadgeCheck} tone="pine">
              VIN verified
            </EnamelBadge>
            <EnamelBadge icon={FileCheck2} tone="pine">
              Clean title
            </EnamelBadge>
            <EnamelBadge icon={Gauge} tone="navy">
              {quality.label} {quality.score}
            </EnamelBadge>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <Spec label="Mileage" value={formatMiles(listing.mileage)} />
            <Spec label="Category" value={cat?.label ?? "—"} />
            <Spec label="VIN" value={listing.vin} />
            <Spec label="Location" value={listing.zip} />
          </dl>

          {/* Masked relay — styled as a little ticket stub */}
          <div className="relative mt-6 overflow-hidden rounded-2xl bg-[#FFFCF4] p-5 shadow-card ring-1 ring-navy-900/10">
            <div aria-hidden className="candy-stripe absolute left-0 top-0 h-full w-1.5" />
            <div className="flex items-center gap-2 text-navy-900">
              <Phone className="h-5 w-5 text-carnival-600" />
              <span className="font-semibold">Contact the seller</span>
            </div>
            <p className="mt-1 font-marquee text-2xl tracking-wide text-navy-900">{relay}</p>
            <p className="mt-1 text-xs text-navy-800/60">
              Masked relay number — connects you to {listing.sellerFirstName} without revealing their
              real phone.
            </p>
          </div>

          <div className="mt-4 flex gap-3">
            <ButtonLink href={`/listing/${listing.id}/window`} variant="secondary" className="flex-1">
              <Printer className="h-4 w-4" /> Window profile
            </ButtonLink>
            <ButtonLink href="/buying" variant="outline" className="flex-1">
              How buying works
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Description + comps */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="font-display text-xl font-semibold text-navy-900">About this vehicle</h2>
          <p className="mt-2 leading-relaxed text-navy-800/85">{listing.description}</p>
          <div className="mt-4 flex items-start gap-2 rounded-xl bg-navy-50 p-4 text-sm text-navy-800/80">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-carnival-600" />
            <span>{DISCLAIMER}</span>
          </div>
        </div>
        <div>
          <CompsBlock comps={comps} price={listing.price} />
        </div>
      </div>
    </Section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-cream/70 p-3 ring-1 ring-navy-900/5">
      <dt className="text-xs uppercase tracking-wide text-navy-800/55">{label}</dt>
      <dd className="mt-0.5 font-medium text-navy-900">{value}</dd>
    </div>
  );
}
