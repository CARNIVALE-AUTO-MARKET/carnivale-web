import type { Metadata } from "next";
import { Check, ShieldCheck, RefreshCw, Heart, ArrowDownRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader, Section } from "@/components/page";
import { EnamelBadge } from "@/components/carnival/enamel-badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { LANES, quote, PREMIUM_ADDON, DEPOSIT_CENTS, CHARITY_LINE } from "@/lib/pricing";
import { DEPOSIT_TERMS } from "@/lib/deposit";
import { formatUSD } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One flat fee by vehicle type plus a $100 Show-Up Deposit — refunded the moment you drop your car off. Never a commission.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="One flat fee by vehicle type. Never a commission."
        subtitle="Every reservation is a flat display fee plus a $100 Show-Up Deposit, charged upfront. You get the deposit back the moment you drop your car off Friday — so your net is just the display fee."
      />

      <Section>
        {/* Charity line */}
        <Reveal>
          <div className="mb-8 flex items-start gap-2.5 rounded-2xl bg-pine-600/10 p-4 ring-1 ring-pine-600/20">
            <Heart className="mt-0.5 h-5 w-5 shrink-0 text-pine-700" />
            <p className="text-sm font-medium text-navy-900">{CHARITY_LINE}</p>
          </div>
        </Reveal>

        {/* Lane cards — 3 columns each: Pay today / Refunded at drop-off / Net */}
        <RevealGroup className="grid gap-6 lg:grid-cols-3">
          {LANES.map((lane) => {
            const q = quote(lane.key);
            return (
              <RevealItem
                key={lane.key}
                className="flex flex-col rounded-2xl bg-[#FFFCF4] p-6 shadow-card ring-1 ring-navy-900/10"
              >
                <h3 className="font-display text-xl font-semibold text-navy-900">{lane.label}</h3>
                <p className="mt-1 text-sm text-navy-800/65">{lane.types}</p>

                <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                  <Col label="Pay today" value={formatUSD(q.payTodayCents, { cents: true })} />
                  <Col
                    label="Back at Friday drop-off"
                    value={`–${formatUSD(q.refundedAtDropoffCents, { cents: true })}`}
                    tone="pine"
                  />
                  <Col
                    label="Net for the weekend"
                    value={formatUSD(q.netCents, { cents: true })}
                    big
                  />
                </div>

                <p className="mt-4 text-xs text-navy-800/60">
                  ${(q.payTodayCents / 100).toFixed(0)} charged upfront ={" "}
                  {formatUSD(q.displayFeeCents, { cents: true })} display fee +{" "}
                  {formatUSD(DEPOSIT_CENTS, { cents: true })} refundable deposit.
                </p>

                <ul className="mt-4 space-y-2 text-sm text-navy-800/85">
                  <li className="flex gap-2"><Check className="h-4 w-4 text-pine-700" /> Weekend spot + printed window sheet</li>
                  <li className="flex gap-2"><Check className="h-4 w-4 text-pine-700" /> Masked relay number</li>
                  <li className="flex gap-2"><Check className="h-4 w-4 text-pine-700" /> Free returning weekends (90 days)</li>
                </ul>

                <div className="mt-5 pt-1">
                  <ButtonLink href="/sell/new" variant="primary" className="w-full">
                    List in this lane
                  </ButtonLink>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Premium add-on + deposit explainer */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-marquee-500/40 bg-marquee-500/10 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-navy-900">
                {PREMIUM_ADDON.label} add-on
              </h3>
              <span className="font-marquee text-2xl text-carnival-600">
                +{formatUSD(PREMIUM_ADDON.feeCents, { cents: true })}
              </span>
            </div>
            <p className="mt-2 text-sm text-navy-800/80">{PREMIUM_ADDON.blurb}</p>
            <p className="mt-2 text-xs font-medium text-navy-800/60">
              Non-refundable · no deposit.
            </p>
          </Reveal>

          <Reveal className="rounded-2xl bg-navy-900 p-6 text-cream">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-marquee-500" />
              <h3 className="font-display text-lg font-semibold">Why the $100 deposit?</h3>
            </div>
            <p className="mt-2 text-sm text-slate-300">{DEPOSIT_TERMS.why}</p>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
              {DEPOSIT_TERMS.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <ArrowDownRight className="h-4 w-4 shrink-0 text-marquee-500" /> {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Show it 'til it sells */}
        <Reveal className="mt-8 flex flex-col items-start gap-3 rounded-2xl bg-white p-6 ring-1 ring-navy-900/10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <RefreshCw className="mt-0.5 h-6 w-6 shrink-0 text-carnival-600" />
            <div>
              <h3 className="font-display text-lg font-semibold text-navy-900">
                Show it &rsquo;til it sells
              </h3>
              <p className="text-sm text-navy-800/80">
                Didn&rsquo;t sell this weekend? Your flat fee covers free returning weekends for 90
                days — never an extra display fee, never a commission.
              </p>
            </div>
          </div>
          <EnamelBadge tone="pine">90-day window</EnamelBadge>
        </Reveal>

        <p className="mt-8 max-w-3xl text-sm text-navy-800/70">
          <strong>What we never do:</strong> charge a percentage of your sale price, take a
          commission or a cut of the deal, take title or handle the buyer&rsquo;s money, or take a
          cut from insurers, lenders, or title vendors. Lanes are priced by{" "}
          <strong>vehicle type, not value</strong>. CARNIVALE is an advertising and event service,
          not a dealer.
        </p>
      </Section>
    </>
  );
}

function Col({
  label,
  value,
  big,
  tone,
}: {
  label: string;
  value: string;
  big?: boolean;
  tone?: "pine";
}) {
  return (
    <div className={"rounded-xl p-2.5 " + (big ? "bg-mint ring-1 ring-pine-600/20" : "bg-cream/70")}>
      <p className="text-[10px] font-medium uppercase leading-tight tracking-wide text-navy-800/55">
        {label}
      </p>
      <p
        className={
          "mt-1 font-marquee leading-none " +
          (big ? "text-2xl text-pine-700" : tone === "pine" ? "text-lg text-pine-700" : "text-lg text-navy-900")
        }
      >
        {value}
      </p>
    </div>
  );
}
