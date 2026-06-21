import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { categoryByKey } from "@/lib/constants";
import { formatMiles, formatUSD } from "@/lib/utils";
import type { SampleListing } from "@/lib/sample-listings";

export function ListingCard({ listing }: { listing: SampleListing }) {
  const cat = categoryByKey(listing.category);
  return (
    <Link
      href={`/inventory/${listing.id}`}
      className="group block overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-card transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-50">
        <Image
          src={listing.photos[0]}
          alt={`${listing.year} ${listing.make} ${listing.model}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {listing.featured && (
          <span className="absolute left-3 top-3">
            <Badge tone="amber">Featured</Badge>
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-semibold text-navy-900">
            {listing.year} {listing.make} {listing.model}
          </h3>
          <span className="font-display text-lg font-bold text-carnival-600">
            {formatUSD(listing.price)}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-navy-800/70">
          {listing.trim} · {formatMiles(listing.mileage)}
        </p>
        <p className="mt-2 text-xs font-medium text-navy-800/60">{cat?.label}</p>
      </div>
    </Link>
  );
}
