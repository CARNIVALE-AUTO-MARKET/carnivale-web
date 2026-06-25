import type { Metadata } from "next";
import Link from "next/link";
import {
  Info,
  Search,
  FolderOpen,
  FileSignature,
  Repeat,
  BadgeCheck,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader, Section } from "@/components/page";
import { EnamelBadge } from "@/components/carnival/enamel-badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "How to Sell a Car in Minnesota",
  description:
    "A plain-English guide to selling your vehicle privately in Minnesota — inspection, documents, bill of sale, title transfer and tax, plates, and reporting the sale. General information, not legal or tax advice.",
};

const STEPS = [
  {
    icon: Search,
    title: "Step 1 — Let the buyer inspect it",
    body: [
      "Serious buyers want a look under the hood — welcome it. The buyer pays for a mechanic of their choice to inspect the vehicle, and at CARNIVALE that can happen right on-site during the weekend.",
      "Hand over what you have — service records, receipts — and let the inspection speak for itself. Keep a copy of any report; a clean inspection is the fastest way to a confident buyer and a fair price.",
    ],
  },
  {
    icon: FolderOpen,
    title: "Step 2 — Gather your documents",
    body: [
      "Have these ready before the weekend: your Minnesota title (if it's lost, request a duplicate with form PS2067A), maintenance records, the owner's manual, and — if you still owe on a loan — a lien release from your lender showing the loan is paid.",
      "Good news for Minnesota sellers: there's no state emissions or smog test to pass before you sell.",
    ],
  },
  {
    icon: FileSignature,
    title: "Step 3 — Write a bill of sale (recommended)",
    body: [
      "Minnesota does not require a separate bill of sale, but we recommend one — it's a clean record for both sides. Include the year, make, model, and VIN; the date and the sale price; the odometer reading; and both parties' legal names, addresses, and signatures.",
      "You can also use the state's Application to Title & Register a Vehicle (form PS2000) to capture the same details. No notarization is required in Minnesota.",
    ],
  },
  {
    icon: Repeat,
    title: "Step 4 — Transfer the title and handle the tax",
    body: [
      "The transfer happens on the title itself and is filed at any of Minnesota's ~200 deputy registrar offices. As the seller you print and sign your name and record the sale price, the date, and the odometer disclosure (required for vehicles under 10 years old / model year 2011 and newer) plus a damage disclosure (vehicles under 6 years old). The buyer provides their legal name, date of birth, and signature.",
      "Minnesota's motor-vehicle sales tax is 6.5%, calculated on the sale price or the vehicle's fair-market value (whichever is higher), and it's paid by the buyer at registration. Qualifying older vehicles (10+ years old and selling for under $3,000) may use a $10 in-lieu tax instead, and certain family transfers and gifts are non-taxable.",
    ],
  },
  {
    icon: BadgeCheck,
    title: "Step 5 — Leave the plates, then report the sale",
    body: [
      "In Minnesota the license plates and registration stay with the vehicle and transfer to the buyer — only remove personalized or specialty plates you want to keep.",
      "Then report the sale to Minnesota DVS within 10 days, either online or with the Record-of-Sale stub on the title. Reporting protects you from anything the new owner does before they register it. The buyer does not file this report — only you do.",
    ],
  },
];

const FAQS: [string, string][] = [
  ["Do I remove the license plates?", "No — in Minnesota plates and registration transfer with the vehicle to the buyer. Only take personalized or specialty plates you want to keep."],
  ["Is a bill of sale required?", "No, it's not required in Minnesota — but it's recommended as a clean record for both buyer and seller."],
  ["Do I need a notary?", "No. Minnesota does not require notarization to transfer a vehicle title."],
  ["What paperwork do I actually need?", "The signed title, your maintenance records, a lien release if you had a loan, and the odometer disclosure on the title (for vehicles under 10 years old / model year 2011+)."],
  ["Is there an emissions test?", "No. Minnesota has no state emissions or smog inspection requirement to sell a vehicle."],
  ["Who pays the sales tax?", "The buyer pays the 6.5% motor-vehicle sales tax at registration, on the price or fair-market value (whichever is higher). Some older or family/gift transfers qualify for a reduced or non-taxable rate."],
];

const LINKS: { label: string; href: string; note: string }[] = [
  { label: "Minnesota Driver & Vehicle Services (DVS)", href: "https://dps.mn.gov/divisions/dvs", note: "Titling, registration, and reporting the sale of a vehicle." },
  { label: "DVS forms & documents", href: "https://dps.mn.gov/divisions/dvs/forms-documents", note: "Find form PS2000 (Application to Title & Register) and PS2067A (Duplicate Title)." },
  { label: "MN Dept. of Revenue — Motor Vehicle Sales Tax", href: "https://www.revenue.state.mn.us/motor-vehicle-sales-tax", note: "The 6.5% tax, exemptions, and in-lieu options." },
  { label: "NHTSA — odometer disclosure", href: "https://www.nhtsa.gov/", note: "Federal odometer-disclosure background." },
];

export default function HowToSellMnPage() {
  return (
    <>
      <PageHeader
        eyebrow="Minnesota seller's guide"
        title="How to Sell a Car in Minnesota"
        subtitle="Selling privately in Minnesota is simpler than people think — and you keep more than a dealer trade-in. CARNIVALE gives you the safe venue and serious buyers; you handle the simple paperwork directly with your buyer. Here's the whole process, start to finish."
      />

      <Section>
        {/* Not-legal-advice note (visible) */}
        <Reveal>
          <div className="mb-8 flex items-start gap-3 rounded-2xl bg-marquee-500/12 p-4 ring-1 ring-marquee-500/35">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-marquee-600" />
            <p className="text-sm text-navy-900">
              <strong>General information, not legal or tax advice</strong> — verify the current
              rules with Minnesota DVS and the Department of Revenue. CARNIVALE is a venue for{" "}
              <strong>private-party</strong> sellers, not a dealer.
            </p>
          </div>
        </Reveal>

        <Reveal className="mb-10 max-w-3xl">
          <p className="text-lg leading-relaxed text-navy-800/85">
            You don&rsquo;t need a dealer or a middleman to sell your own vehicle. Bring it to a
            CARNIVALE weekend, meet real buyers in a safe, staffed setting, and close the deal
            directly — keeping the difference a trade-in would have cost you. The paperwork below is
            straightforward, and we&rsquo;re here to make the rest easy.
          </p>
        </Reveal>

        {/* Steps */}
        <RevealGroup className="space-y-5">
          {STEPS.map((s) => {
            const I = s.icon;
            return (
              <RevealItem
                key={s.title}
                className="rounded-2xl bg-[#FFFCF4] p-6 shadow-card ring-1 ring-navy-900/10"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-carnival-600/10 text-carnival-600">
                    <I className="h-6 w-6" />
                  </span>
                  <h2 className="font-display text-xl font-semibold text-navy-900">{s.title}</h2>
                </div>
                <div className="mt-3 space-y-2">
                  {s.body.map((p, i) => (
                    <p key={i} className="text-navy-800/85">
                      {p}
                    </p>
                  ))}
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* FAQ */}
        <div className="mt-12">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-navy-900">Quick FAQ</h2>
          </Reveal>
          <div className="mt-4 max-w-3xl divide-y divide-navy-900/10">
            {FAQS.map(([q, a]) => (
              <details key={q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy-900">
                  {q}
                  <span className="text-carnival-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-navy-800/80">{a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Official links */}
        <div className="mt-12">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-navy-900">
              Official Minnesota resources
            </h2>
            <p className="mt-1 text-sm text-navy-800/70">
              Always confirm the current forms and rates on the state&rsquo;s own pages.
            </p>
          </Reveal>
          <RevealGroup className="mt-4 grid gap-3 sm:grid-cols-2">
            {LINKS.map((l) => (
              <RevealItem key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full items-start gap-3 rounded-2xl border border-navy-900/10 bg-white p-4 shadow-card transition-shadow hover:shadow-lift"
                >
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-carnival-600" />
                  <span>
                    <span className="font-semibold text-navy-900">{l.label}</span>
                    <span className="mt-0.5 block text-xs text-navy-800/70">{l.note}</span>
                  </span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* CTA */}
        <Reveal className="mt-12">
          <div className="flex flex-col items-start gap-4 rounded-3xl bg-navy-900 p-8 text-cream sm:flex-row sm:items-center sm:justify-between">
            <div>
              <EnamelBadge tone="gold">Ready to sell?</EnamelBadge>
              <h2 className="mt-2 font-display text-2xl font-semibold">
                Reserve your spot at CARNIVALE
              </h2>
              <p className="mt-1 text-slate-300">
                A safe weekend venue, hundreds of buyers, and you keep the whole sale.
              </p>
            </div>
            <ButtonLink href="/sell" variant="amber" size="lg">
              Register to sell <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Reveal>

        <p className="mt-6 text-xs text-navy-800/55">
          This guide is original CARNIVALE content for general information only and reflects public
          Minnesota DVS, Department of Revenue, and NHTSA guidance as we understand it. It is not
          legal or tax advice — verify specifics with the agencies linked above.{" "}
          <Link href="/sell" className="font-medium text-carnival-600 hover:underline">
            Register to sell →
          </Link>
        </p>
      </Section>
    </>
  );
}
