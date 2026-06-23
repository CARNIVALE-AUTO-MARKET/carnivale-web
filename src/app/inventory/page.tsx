import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader, Section } from "@/components/page";
import { TicketCard } from "@/components/carnival/ticket-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { BrowseFilters } from "./filters";
import { SAMPLE_LISTINGS, type SampleListing } from "@/lib/sample-listings";
import { listingSavings } from "@/lib/listing-extras";

export const metadata: Metadata = { title: "Browse Inventory" };

function sortListings(list: SampleListing[], sort: string) {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "miles-asc":
      return copy.sort((a, b) => a.mileage - b.mileage);
    case "save-desc":
      return copy.sort((a, b) => listingSavings(b) - listingSavings(a));
    default:
      return copy.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
  }
}

export default function InventoryPage({
  searchParams,
}: {
  searchParams: { category?: string; maxPrice?: string; maxMiles?: string; sort?: string };
}) {
  const { category, maxPrice, maxMiles, sort = "featured" } = searchParams;

  let listings = SAMPLE_LISTINGS.filter((l) => {
    if (category && l.category !== category) return false;
    if (maxPrice && l.price > Number(maxPrice)) return false;
    if (maxMiles && l.mileage > Number(maxMiles)) return false;
    return true;
  });
  listings = sortListings(listings, sort);

  return (
    <>
      <PageHeader
        eyebrow="Browse inventory"
        title="This weekend's lineup"
        subtitle="Private-party vehicles, each with a clear view of how the price compares to dealer listings. Sample inventory shown during Phase 0."
      />
      <Section>
        <Suspense fallback={null}>
          <BrowseFilters />
        </Suspense>

        <p className="mt-5 text-sm text-navy-800/60">
          {listings.length} {listings.length === 1 ? "vehicle" : "vehicles"} showing
        </p>

        {listings.length === 0 ? (
          <p className="mt-8 text-navy-800/70">No vehicles match these filters this weekend.</p>
        ) : (
          <RevealGroup className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((l) => (
              <RevealItem key={l.id}>
                <TicketCard listing={l} />
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </Section>
    </>
  );
}
