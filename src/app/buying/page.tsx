import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader, Section } from "@/components/page";

export const metadata: Metadata = { title: "Buying a Vehicle" };

const STEPS: [string, string][] = [
  ["Browse before you come", "Scan the weekend lineup online, then see the cars in person Saturday or Sunday."],
  ["Read the window profile", "Every car shows its private price next to comparable dealer listings, so you can see the savings at a glance. It's data, not advice — do your own diligence."],
  ["Contact the owner directly", "Scan the QR code or call the masked relay number on the window profile."],
  ["Inspect and test drive", "You're buying from the actual owner. Ask for records, bring a mechanic, take your time."],
  ["Close the deal yourself", "You pay the seller directly and they sign over the title. CARNIVALE is the venue, never the middleman or a party to the sale."],
];

export default function BuyingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Buying a vehicle"
        title="Buy from real owners — and have fun doing it"
        subtitle="No dealer markup, no commission, no pressure. Just a weekend full of private-party cars and a clear view of how each one compares to the dealer lots."
      />
      <Section>
        <ol className="space-y-4">
          {STEPS.map(([t, b], i) => (
            <li key={t} className="flex gap-4 rounded-2xl border border-navy-900/10 bg-white p-5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy-900 font-bold text-white">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-navy-900">{t}</p>
                <p className="mt-1 text-sm text-navy-800/80">{b}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <ButtonLink href="/inventory" variant="primary" size="lg">
            Browse this weekend&rsquo;s inventory
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
