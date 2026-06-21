import type { Metadata } from "next";
import { PageHeader, PlaceholderNote, Section } from "@/components/page";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Vendors & Sponsors" };

const VENDOR_TYPES = [
  ["Food & drink", "Trucks, coffee carts, and treats that turn a car sale into a weekend out."],
  ["Detailers & wraps", "Show sellers how to make their car shine; meet buyers fresh off a purchase."],
  ["Inspection & service", "Mobile mechanics and inspection services buyers actually want on-site."],
  ["Insurance & lending", "Be discoverable to buyers — but we never take a percentage from you."],
  ["Local makers & sponsors", "Banners, booths, and brand moments at a high-traffic weekend event."],
];

export default function VendorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Vendors & sponsors"
        title="Set up shop where the buyers are"
        subtitle="CARNIVALE is a weekend event, not just a lot. Food, services, and sponsors make it a destination — and put you in front of a crowd of engaged local buyers."
      />
      <Section>
        <div className="mb-6">
          <PlaceholderNote>vendor pricing &amp; application flow finalized later</PlaceholderNote>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VENDOR_TYPES.map(([t, b]) => (
            <div key={t} className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card">
              <h3 className="font-semibold text-navy-900">{t}</h3>
              <p className="mt-1 text-sm text-navy-800/80">{b}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl bg-amber-500/10 p-6 ring-1 ring-amber-500/30">
          <p className="text-sm text-navy-800/85">
            <strong>Our promise to partners:</strong> free at launch, then a simple flat fee. We
            never take a percentage from insurers, lenders, or title/paperwork vendors.
          </p>
        </div>
        <div className="mt-6">
          <ButtonLink href="/contact" variant="primary">
            Become a vendor or sponsor
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
