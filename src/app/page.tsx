import Link from "next/link";
import {
  ShieldCheck,
  Tag,
  RefreshCw,
  Phone,
  BadgeCheck,
  Utensils,
  Music,
  Users,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { HomeHero } from "@/components/home/hero";
import { TicketCard } from "@/components/carnival/ticket-card";
import { MarqueeBoard } from "@/components/carnival/marquee-board";
import { Bunting } from "@/components/carnival/bunting";
import { EnamelBadge } from "@/components/carnival/enamel-badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Section } from "@/components/page";
import { SAMPLE_LISTINGS } from "@/lib/sample-listings";

const STEPS = [
  ["Register online", "Pick your category, set your price, add photos — about 2 minutes."],
  ["Drop off Friday", "Bring your car to the Dunwoody lot. We stage it with its window profile + QR."],
  ["We run the weekend", "Buyers browse Sat & Sun and reach you on a masked relay number."],
  ["You get paid direct", "The buyer pays you and you sign your own title. Keep every dollar."],
];

const TRUST = [
  [ShieldCheck, "Safe drop-off"],
  [Phone, "Masked number"],
  [Tag, "Flat fee, no commission"],
  [RefreshCw, "Show it 'til it sells"],
  [BadgeCheck, "VIN verified listings"],
] as const;

export default function HomePage() {
  const featured = SAMPLE_LISTINGS.filter((l) => l.featured).slice(0, 3);

  return (
    <>
      <HomeHero />

      {/* Marquee board */}
      <Section className="-mt-10 sm:-mt-12">
        <Reveal>
          <MarqueeBoard />
        </Reveal>
      </Section>

      {/* How it works — 4 ticket steps */}
      <Section className="pt-2">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-semibold text-navy-900">
            How CARNIVALE works
          </h2>
        </Reveal>
        <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([t, b], i) => (
            <RevealItem
              key={t}
              className="relative rounded-2xl bg-[#FFFCF4] p-5 shadow-card ring-1 ring-navy-900/10"
            >
              <div aria-hidden className="absolute inset-x-4 top-9 border-t-2 border-dashed border-navy-900/15" />
              <span className="font-marquee text-sm uppercase tracking-[0.2em] text-carnival-600">
                Step {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-6 font-display text-lg font-semibold text-navy-900">{t}</p>
              <p className="mt-1 text-sm text-navy-800/80">{b}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-7 text-center" delay={0.1}>
          <Link href="/how-it-works" className="font-semibold text-carnival-600 hover:underline">
            See the full playbook →
          </Link>
        </Reveal>
      </Section>

      <Bunting className="opacity-90" />

      {/* This weekend's lineup */}
      <Section className="pt-10">
        <div className="flex items-end justify-between">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-navy-900">
              This weekend&rsquo;s lineup
            </h2>
          </Reveal>
          <Link href="/inventory" className="text-sm font-semibold text-carnival-600 hover:underline">
            View all →
          </Link>
        </div>
        <RevealGroup className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l) => (
            <RevealItem key={l.id}>
              <TicketCard listing={l} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Trust strip */}
      <section className="bg-navy-900 py-12 text-cream">
        <div className="container">
          <Reveal>
            <p className="text-center font-marquee text-sm uppercase tracking-[0.3em] text-marquee-500">
              Trusted by sellers &amp; buyers
            </p>
          </Reveal>
          <RevealGroup className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {TRUST.map(([Icon, label]) => (
              <RevealItem key={label}>
                <EnamelBadge icon={Icon} tone="gold">
                  {label}
                </EnamelBadge>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Food-truck / family-festival strip */}
      <Section>
        <Reveal>
          <div className="rounded-3xl bg-cream p-8 ring-1 ring-navy-900/10 sm:p-12">
            <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center">
              <div>
                <h2 className="font-display text-3xl font-semibold text-navy-900">
                  More carnival than car lot
                </h2>
                <p className="mt-3 max-w-lg text-navy-800/80">
                  Food trucks, coffee carts, live music, and a family-friendly weekend out — buying
                  or selling a car has never felt less like a chore. Bring the kids.
                </p>
                <div className="mt-6">
                  <ButtonLink href="/vendors" variant="secondary">
                    Vendors &amp; sponsors
                  </ButtonLink>
                </div>
              </div>
              <RevealGroup className="grid grid-cols-3 gap-3">
                {[
                  [Utensils, "Food trucks"],
                  [Music, "Live music"],
                  [Users, "Family friendly"],
                ].map(([Icon, label]) => {
                  const I = Icon as typeof Utensils;
                  return (
                    <RevealItem
                      key={label as string}
                      className="flex flex-col items-center gap-2 rounded-2xl bg-[#FFFCF4] p-4 text-center shadow-card ring-1 ring-navy-900/10"
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-marquee-500/15 text-carnival-600">
                        <I className="h-6 w-6" />
                      </span>
                      <span className="text-sm font-medium text-navy-900">{label as string}</span>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <section className="bg-carnival-600 text-white">
        <div className="container flex flex-col items-start gap-4 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Ready for your spot under the lights?
            </h2>
            <p className="mt-1 text-white/85">
              List your vehicle for the next CARNIVALE — first weekend free for early sellers.
            </p>
          </div>
          <ButtonLink href="/sell" variant="amber" size="lg">
            Register to sell
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
