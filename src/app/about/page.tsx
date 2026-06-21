import type { Metadata } from "next";
import { PageHeader, PlaceholderNote, Section } from "@/components/page";

export const metadata: Metadata = { title: "About / Dunwoody" };

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A safer, more fun way to buy and sell cars"
        subtitle="CARNIVALE is a weekend car carnival — a staffed, public marketplace where private owners sell directly to private buyers, and everybody has a good time doing it."
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-6 prose-carnivale">
          <p>
            We&rsquo;re a <strong>venue and promoter</strong>, not a dealer. We never take title,
            never take a commission, and never touch the buyer&rsquo;s money. Sellers pay one flat
            fee, set their own price, and keep their whole sale. Buyers get to walk a lot full of
            real, owner-sold cars — with a clear view of how each one compares to the dealer lots.
          </p>
          <p>
            Our model improves on the classic weekend car-corral playbook: safer for sellers
            (no strangers at your house, masked relay numbers), more transparent for buyers
            (private price vs. comparable dealer listings), and genuinely fun for everyone —
            food, vendors, and a carnival atmosphere.
          </p>

          <h2 className="text-2xl font-bold text-navy-900">First lot: Dunwoody College of Technology</h2>
          <p>
            Our first target location is <strong>Dunwoody College of Technology</strong> in
            Minneapolis — a fitting home for a hands-on, community-rooted car event. We&rsquo;ll run
            Minneapolis in the summer and fall, then expand to Dallas–Fort Worth year-round.
          </p>
          <div>
            <PlaceholderNote>partnership details with Dunwoody not yet finalized</PlaceholderNote>
          </div>

          <h2 className="text-2xl font-bold text-navy-900">What we stand for</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Sellers keep 100% of their sale — flat fee, never a commission.</li>
            <li>Privacy by default — masked relay numbers, never your real phone.</li>
            <li>Honest comparisons — comps are data, not advice.</li>
            <li>Open when buyers are free — including Sundays.</li>
          </ul>
        </div>
      </Section>
    </>
  );
}
