import type { Metadata } from "next";
import { ShieldCheck, Phone, Tag, RefreshCw, CalendarDays, Camera } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader, Section } from "@/components/page";
import { CATEGORIES } from "@/lib/constants";
import { formatUSD } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Register to Sell",
  description: "The safest way to sell your vehicle. Flat fee, you keep the sale.",
};

const REASONS = [
  [ShieldCheck, "Sell without the danger", "No strangers at your house, no solo test drives. Meet buyers at a staffed, public weekend event."],
  [Tag, "Keep every dollar", "You set the price and collect the full amount. We charge a flat fee — never a commission."],
  [Phone, "Your number stays private", "We print a masked relay number on your window profile. Buyers never see your real phone."],
  [RefreshCw, "Show it 'til it sells", "One fee covers free returning weekends for 90 days."],
  [CalendarDays, "Open when buyers are free", "Saturday and Sunday, 9am–6pm — including Sunday, when dealers are closed."],
  [Camera, "We make it look good", "A clean window profile with your photos, price, and how it compares to dealer listings."],
];

export default function SellPitchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Register to sell"
        title="The safest way to sell your vehicle"
        subtitle="Bring your car to a weekend carnival of buyers. You set the price, you keep the sale, and you never hand a stranger your phone number or meet them alone."
      />

      <Section className="pt-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(([Icon, t, b]) => {
            const I = Icon as typeof ShieldCheck;
            return (
              <div key={t as string} className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-carnival-600/10 text-carnival-600">
                  <I className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-navy-900">{t as string}</h3>
                <p className="mt-1.5 text-sm text-navy-800/80">{b as string}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <section className="bg-white">
        <div className="container py-14">
          <div className="rounded-3xl bg-navy-900 p-8 text-cream sm:p-12">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Ready to list?</h2>
            <p className="mt-2 max-w-xl text-cream/80">
              It takes a few minutes: choose your category, add photos and your price, and pay a
              flat display fee plus a refundable deposit. Starting fees:
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {CATEGORIES.map((c) => (
                <li
                  key={c.key}
                  className="rounded-full bg-cream/10 px-4 py-1.5 text-sm ring-1 ring-cream/15"
                >
                  {c.label}: <strong>{formatUSD(c.feeCents, { cents: true })}</strong>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/sell/new" variant="amber" size="lg">
                Create my listing
              </ButtonLink>
              <ButtonLink href="/pricing" variant="outline" size="lg" className="bg-white">
                See pricing details
              </ButtonLink>
            </div>
            <p className="mt-4 text-xs text-cream/60">
              You&rsquo;ll create a free account first. CARNIVALE is an advertising and event
              service, not a dealer — you sell your own vehicle and keep the proceeds.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
