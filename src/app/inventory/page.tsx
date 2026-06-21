import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section } from "@/components/page";
import { ListingCard } from "@/components/listing-card";
import { SAMPLE_LISTINGS } from "@/lib/sample-listings";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Browse Inventory" };

export default function InventoryPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const active = searchParams.category;
  const listings = active
    ? SAMPLE_LISTINGS.filter((l) => l.category === active)
    : SAMPLE_LISTINGS;

  const filters = [{ key: undefined, label: "All" }, ...CATEGORIES.map((c) => ({ key: c.key, label: c.label }))];

  return (
    <>
      <PageHeader
        eyebrow="Browse inventory"
        title="This weekend's lineup"
        subtitle="Private-party vehicles, each with a clear view of how the price compares to dealer listings. Sample inventory shown during Phase 0."
      />
      <Section>
        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((f) => {
            const isActive = active === f.key || (!active && !f.key);
            return (
              <Link
                key={f.label}
                href={f.key ? `/inventory?category=${f.key}` : "/inventory"}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium ring-1 transition-colors",
                  isActive
                    ? "bg-navy-900 text-white ring-navy-900"
                    : "bg-white text-navy-800 ring-navy-900/15 hover:bg-navy-50",
                )}
              >
                {f.label}
              </Link>
            );
          })}
        </div>

        {listings.length === 0 ? (
          <p className="text-navy-800/70">No vehicles in this category this weekend.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
