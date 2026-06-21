import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/page";

export const metadata: Metadata = { title: "FAQ" };

const FAQS: [string, string][] = [
  ["Is CARNIVALE a dealer?", "No. CARNIVALE is an advertising and event service — a venue and promoter. We never take title or possession of a vehicle, never take a commission, and never handle the buyer's money. Every car is sold by its private owner."],
  ["How much does it cost to sell?", "A flat display fee based on your vehicle category, plus a fully refundable deposit. Never a percentage of your sale. See the Pricing page for current categories. (Fee amounts are sample placeholders during launch.)"],
  ["What does \"show it 'til it sells\" mean?", "Your one flat fee includes free returning weekends for 90 days. If it doesn't sell this weekend, bring it back — no extra display fee."],
  ["Will my phone number be public?", "Never. Your window profile shows a masked relay number. Buyers call or text that line and it reaches you, without ever exposing your real number."],
  ["How do the price comparisons work?", "Each listing shows the private price next to comparable dealer listings and an estimated savings figure, sourced from licensed market data. It's reference data, not advice — always do your own research."],
  ["Who handles the money and the title?", "You do. The buyer pays you directly and you sign over your own title. CARNIVALE is never a party to the transaction."],
  ["When and where is it?", "Markets are Minneapolis (summer/fall) and Dallas–Fort Worth (later), with Dunwoody College of Technology as the first target lot. Open Saturday & Sunday, 9am–6pm; Friday is drop-off only. Specific dates are announced on the Dates & Location page."],
  ["Why are you open on Sunday?", "Minnesota dealers are legally closed on Sundays — we're not a dealer, so we can open when buyers are actually free. That's our edge."],
];

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Questions, answered"
        subtitle="The short version: you stay in control, you keep your sale, and we keep it safe and fun."
      />
      <Section>
        <div className="mx-auto max-w-3xl divide-y divide-navy-900/10">
          {FAQS.map(([q, a]) => (
            <details key={q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy-900">
                {q}
                <span className="text-carnival-600 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-navy-800/80">{a}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
