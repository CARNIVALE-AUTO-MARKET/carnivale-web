import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/page";

export const metadata: Metadata = { title: "Tips for Sellers" };

const TIPS: [string, string][] = [
  ["Clean it like it's a date", "A wash, vacuum, and wipe-down is the cheapest value you'll ever add. First impressions sell cars."],
  ["Price it where the comps are", "Your window profile shows comparable dealer listings. Price a little under dealer retail and your car looks like the deal of the weekend."],
  ["Bring the paperwork", "Title in hand, maintenance records, and any receipts. Buyers pay more when the story checks out."],
  ["Take honest photos", "Shoot in daylight, show the scuffs too. Trust closes deals; surprises kill them."],
  ["Know your bottom line", "Decide your lowest number before the weekend so you can negotiate calmly on the lot."],
  ["Let the relay number work", "Buyers reach you through your masked relay line. Reply quickly — weekend buyers are ready buyers."],
];

export default function TipsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tips for sellers"
        title="Sell faster, for more, with less stress"
        subtitle="A few field-tested habits that help private sellers move metal at the CARNIVALE."
      />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2">
          {TIPS.map(([t, b], i) => (
            <div key={t} className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card">
              <span className="font-display text-2xl font-bold text-amber-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 font-semibold text-navy-900">{t}</h3>
              <p className="mt-1 text-sm text-navy-800/80">{b}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
