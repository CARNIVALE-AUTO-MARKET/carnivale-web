import type { Metadata } from "next";
import { AlertTriangle, MailWarning, Clock, Users, ShieldCheck, Wallet, TrendingUp, RefreshCw, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { StringLights } from "@/components/carnival/string-lights";
import { EnamelBadge } from "@/components/carnival/enamel-badge";
import { WordStagger } from "@/components/motion/word-stagger";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Section } from "@/components/page";
import { WindowSheet } from "@/components/carnival/window-sheet";
import { getSampleListing } from "@/lib/sample-listings";

export const metadata: Metadata = {
  title: "Register to Sell",
  description:
    "Sell your vehicle the safe way — in front of hundreds of buyers, in one weekend. Flat fee, never a commission.",
};

// Copy from carnivale-ops/briefs/register-to-sell-copy.md (approved).
const PROBLEMS = [
  [MailWarning, "Scammers, spam, and lowballers flooding your inbox."],
  [AlertTriangle, "Strangers wanting to meet at your house — or you driving across town for a no-show."],
  [Clock, "Your listing sitting for weeks with no serious offer."],
] as const;

const WAY = [
  [Users, "Hundreds of in-person buyers", "In one place, every weekend — where the buyers actually are."],
  [ShieldCheck, "Safe & hands-off", "Drop it off; we display and watch it. You never meet a stranger at your home."],
  [Wallet, "Keep 100%", "A low flat display fee, never a commission. You pocket the whole sale price."],
  [TrendingUp, "More than a dealer trade-in", "Private sellers routinely net thousands more."],
  [RefreshCw, "Show it 'til it sells", "Doesn't sell the first weekend? Bring it back free."],
] as const;

const STEPS = [
  "Register your vehicle online (2 minutes).",
  "Drop it off Friday evening at the Dunwoody lot.",
  "We display & secure it all weekend; serious buyers contact you (through a masked number — your real phone stays private).",
  "You deal direct and get paid — keep every dollar.",
];

export default function SellPitchPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden night-sky text-cream">
        <StringLights count={30} height={38} className="absolute inset-x-0 top-0" />
        <div className="container relative py-20 text-center sm:py-24">
          <p className="font-marquee text-sm uppercase tracking-[0.32em] text-marquee-500">
            Register to sell · Dunwoody College, Minneapolis
          </p>
          <WordStagger
            text="Sell your vehicle the safe way — in front of hundreds of buyers, in one weekend."
            highlight={["safe"]}
            highlightClassName="text-marquee-500"
            className="mx-auto mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.08] sm:text-5xl"
          />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            CARNIVALE is a weekend car market at Dunwoody College in Minneapolis. Drop your car off,
            we show it to a crowd of serious buyers, and you deal direct — no strangers at your home,
            no scammers, no commission.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/sell/new" variant="amber" size="lg">
              List my vehicle <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Eligibility — private-party only (surfaced prominently) */}
      <div className="bg-marquee-500">
        <div className="container flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-3 text-center text-sm font-semibold text-navy-950">
          <EnamelBadge tone="navy">Private-party only</EnamelBadge>
          <span>
            The vehicle&rsquo;s title must be in an individual&rsquo;s name — no dealer inventory.
          </span>
        </div>
      </div>

      {/* The problem */}
      <Section>
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-navy-900">
            What selling a car looks like today
          </h2>
        </Reveal>
        <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-3">
          {PROBLEMS.map(([Icon, text]) => {
            const I = Icon as typeof MailWarning;
            return (
              <RevealItem
                key={text}
                className="rounded-2xl border border-navy-900/10 bg-[#FFFCF4] p-5 shadow-card"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-carnival-600/10 text-carnival-600">
                  <I className="h-5 w-5" />
                </span>
                <p className="mt-3 text-sm text-navy-800/85">{text}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      {/* The CARNIVALE way */}
      <section className="bg-white">
        <div className="container py-14">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-navy-900">The CARNIVALE way</h2>
          </Reveal>
          <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WAY.map(([Icon, title, body]) => {
              const I = Icon as typeof Users;
              return (
                <RevealItem
                  key={title}
                  className="rounded-2xl border border-navy-900/10 p-6 shadow-card"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-pine-600/10 text-pine-700">
                    <I className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">{title}</h3>
                  <p className="mt-1 text-sm text-navy-800/80">{body}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* How it works — 4 steps */}
      <Section>
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-navy-900">How it works</h2>
        </Reveal>
        <RevealGroup className="mt-6 space-y-4">
          {STEPS.map((s, i) => (
            <RevealItem
              key={i}
              className="flex gap-4 rounded-2xl border border-navy-900/10 bg-[#FFFCF4] p-5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-carnival-600 font-marquee text-lg text-white">
                {i + 1}
              </span>
              <p className="self-center text-navy-800/85">{s}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* What you get — sample window sheet */}
      <section className="bg-white">
        <div className="container py-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-marquee text-sm uppercase tracking-[0.3em] text-carnival-600">
                What you get
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-navy-900">
                Your car&rsquo;s official window sheet
              </h2>
              <p className="mt-3 max-w-md text-navy-800/80">
                Every vehicle gets a printed CARNIVALE window sheet on its glass all weekend — the
                price, the specs, how it compares to dealer listings, and a QR + masked relay number
                so buyers reach you without ever seeing your real phone. Here&rsquo;s a sample:
              </p>
              <ul className="mt-5 space-y-2 text-sm text-navy-800/85">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-pine-700" /> VIN-verified, clean-title trust pins
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-pine-700" /> Private price vs. comparable dealer listings — data, not advice
                </li>
                <li className="flex items-start gap-2">
                  <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-pine-700" /> Masked relay number — your real phone stays private
                </li>
              </ul>
            </div>

            {(() => {
              const sample = getSampleListing("corvette-2015-z51");
              if (!sample) return null;
              return (
                <WindowSheet
                  listing={sample}
                  sample
                  relay="(612) 555-0147"
                  details={{
                    transmission: "7-speed manual",
                    drivetrain: "RWD",
                    fuel: "Gasoline",
                    extColor: "Torch Red",
                    intColor: "Black",
                    owners: "1 owner",
                  }}
                />
              );
            })()}
          </div>
          <p className="mt-6 text-center text-xs font-medium text-navy-800/55 lg:text-left">
            SAMPLE — your vehicle&rsquo;s window sheet will look like this.
          </p>
        </div>
      </section>

      {/* Primary CTA */}
      <section className="night-sky text-cream">
        <StringLights count={28} height={30} />
        <div className="container pb-14 pt-6 text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            List your vehicle for the next CARNIVALE
          </h2>
          <p className="mt-2 font-marquee uppercase tracking-wide text-marquee-500">
            First weekend free for early sellers
          </p>
          <div className="mt-7 flex justify-center">
            <ButtonLink href="/sell/new" variant="amber" size="lg">
              Create my listing <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-xs leading-relaxed text-slate-300/80">
            CARNIVALE is an advertising and event service, not a dealer. All vehicles are sold by
            private owners. CARNIVALE is not a party to any transaction and is not liable for any
            error, omission, or misrepresentation. Vehicle details are supplied by the seller.
          </p>
        </div>
      </section>
    </>
  );
}
