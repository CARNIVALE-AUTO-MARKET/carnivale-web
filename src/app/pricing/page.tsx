import type { Metadata } from "next";
import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader, PlaceholderNote, Section } from "@/components/page";
import { CATEGORIES, PREMIUM_SELLER_ADDON, DEFAULT_DEPOSIT_CENTS } from "@/lib/constants";
import { formatUSD } from "@/lib/utils";

export const metadata: Metadata = { title: "Pricing & Categories" };

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing & categories"
        title="One flat fee. Never a commission."
        subtitle="You set your price and keep every dollar of the sale. CARNIVALE charges a flat display fee by vehicle category — never a percentage — plus a fully refundable deposit."
      />

      <Section>
        <div className="mb-6">
          <PlaceholderNote>fee amounts below are samples pending final pricing</PlaceholderNote>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {CATEGORIES.map((c) => (
            <div
              key={c.key}
              className="flex flex-col rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card"
            >
              <h3 className="text-lg font-semibold text-navy-900">{c.label}</h3>
              <p className="mt-1 text-sm text-navy-800/70">{c.blurb}</p>
              <p className="mt-4 font-display text-3xl font-bold text-carnival-600">
                {formatUSD(c.feeCents, { cents: true })}
                <span className="text-base font-medium text-navy-800/60"> display fee</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-navy-800/85">
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-emerald-600" /> Weekend spot on the lot
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-emerald-600" /> Printed window profile + QR
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-emerald-600" /> Masked relay number
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-emerald-600" /> Free returning weekends (90 days)
                </li>
              </ul>
              <p className="mt-3 text-xs text-navy-800/60">e.g. {c.examples}</p>
              <div className="mt-5">
                <ButtonLink href="/sell" variant="primary" className="w-full">
                  List in this category
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-6">
            <h3 className="text-lg font-semibold text-navy-900">
              {PREMIUM_SELLER_ADDON.label} upsell
              <span className="ml-2 align-middle text-base font-bold text-carnival-600">
                +{formatUSD(PREMIUM_SELLER_ADDON.feeCents, { cents: true })}
              </span>
            </h3>
            <p className="mt-2 text-sm text-navy-800/80">{PREMIUM_SELLER_ADDON.blurb}</p>
          </div>
          <div className="rounded-2xl border border-navy-900/10 bg-white p-6">
            <h3 className="text-lg font-semibold text-navy-900">Refundable deposit</h3>
            <p className="mt-2 text-sm text-navy-800/80">
              A {formatUSD(DEFAULT_DEPOSIT_CENTS, { cents: true })} deposit is collected at listing
              and refunded after the event (covers no-shows and lot logistics). It is never a
              commission and never a cut of your sale.
            </p>
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-sm text-navy-800/70">
          <strong>What we never do:</strong> take title or possession, take a commission or a
          percentage of your sale, handle the buyer&rsquo;s money, or take a cut from insurers,
          lenders, or title vendors. CARNIVALE is an advertising and event service, not a dealer.
        </p>
      </Section>
    </>
  );
}
