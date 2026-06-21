import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader, Section } from "@/components/page";

export const metadata: Metadata = { title: "How It Works" };

const SELLER_STEPS = [
  ["Register to sell online", "Pick your vehicle category, set your own price, add photos, VIN, and a description. Pay one flat display fee + a refundable deposit."],
  ["Drop off Friday", "Friday is drop-off only. Bring your car and keys; we stage it on the lot with a printed window profile and a QR code."],
  ["We run the weekend", "Doors open Saturday & Sunday, 9am–6pm. Staff are on-site all weekend. Buyers reach you through a masked relay number — your real number is never shown."],
  ["You close your own sale", "The buyer pays you directly and you sign over your own title. CARNIVALE is never a party to the transaction and never touches the money."],
  ["Didn't sell? Come back free", "Your fee covers free returning weekends for 90 days. Show it 'til it sells."],
];

const BUYER_STEPS = [
  ["Browse the lot", "Walk a weekend full of private-party vehicles — or browse online before you come."],
  ["Compare with confidence", "Every window profile shows the private price next to comparable dealer listings, so you can see the savings. It's data, not advice."],
  ["Contact the seller", "Scan the QR or call the masked relay number to reach the owner directly."],
  ["Buy directly from the owner", "You deal with the person who owns the car. No dealer markup, no commission, no pressure."],
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="A staffed weekend marketplace — you stay in control"
        subtitle="CARNIVALE is a venue and event service. We bring private buyers and sellers together at a fun, safe, public event. We never take title, never take a commission, and never handle the buyer's money."
      />

      <Section>
        <h2 className="text-2xl font-bold text-navy-900">For sellers</h2>
        <ol className="mt-6 space-y-4">
          {SELLER_STEPS.map(([t, b], i) => (
            <li key={t} className="flex gap-4 rounded-2xl border border-navy-900/10 bg-white p-5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-carnival-600 font-bold text-white">
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
          <ButtonLink href="/sell" variant="primary" size="lg">
            Register to sell
          </ButtonLink>
        </div>
      </Section>

      <section className="bg-white">
        <div className="container py-14">
          <h2 className="text-2xl font-bold text-navy-900">For buyers</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {BUYER_STEPS.map(([t, b]) => (
              <div key={t} className="rounded-2xl border border-navy-900/10 p-5">
                <p className="font-semibold text-navy-900">{t}</p>
                <p className="mt-1 text-sm text-navy-800/80">{b}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <ButtonLink href="/inventory" variant="secondary">
              Browse inventory
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
