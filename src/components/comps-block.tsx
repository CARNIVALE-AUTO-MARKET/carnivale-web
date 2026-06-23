import { formatMiles, formatUSD } from "@/lib/utils";
import { CountUp } from "@/components/motion/count-up";
import type { CompsResponse } from "@/lib/comps/types";

/**
 * "Private price vs. comparable dealer listings + You save ~$X" block.
 * CANONICAL: show private price vs comparable dealer listings + savings; comps are
 * DATA, NOT ADVICE — the source + disclaimer are always shown.
 */
export function CompsBlock({
  comps,
  price,
  compact = false,
}: {
  comps: CompsResponse;
  price: number;
  compact?: boolean;
}) {
  const { dealerRetail, estimatedSavings, comparableDealerListings, source, asOf } = comps;

  return (
    <section
      aria-label="Private price vs. comparable dealer listings"
      className="rounded-2xl border border-navy-900/10 bg-white shadow-card"
    >
      <div className="rounded-t-2xl bg-navy-900 px-5 py-4 text-cream">
        <h3 className="font-display text-lg font-bold">Private price vs. dealer listings</h3>
        <p className="text-xs text-cream/70">
          Source: {source} · as of {asOf}
        </p>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-3">
        <Stat label="This private price" value={formatUSD(price)} accent="navy" />
        <Stat
          label="Comparable dealer median"
          value={formatUSD(dealerRetail.median)}
          sub={`Range ${formatUSD(dealerRetail.low)}–${formatUSD(dealerRetail.high)}`}
        />
        <Stat
          label="You save ~"
          countValue={estimatedSavings.vsMedian}
          sub={`Est. ${formatUSD(estimatedSavings.range[0])}–${formatUSD(
            estimatedSavings.range[1],
          )}`}
          accent="green"
        />
      </div>

      {!compact && (
        <div className="px-5 pb-5">
          <p className="mb-2 text-sm font-semibold text-navy-900">Comparable dealer listings</p>
          <div className="overflow-hidden rounded-xl border border-navy-900/10">
            <table className="w-full text-sm">
              <thead className="bg-navy-50 text-left text-xs uppercase tracking-wide text-navy-800/70">
                <tr>
                  <th className="px-3 py-2 font-medium">Dealer</th>
                  <th className="px-3 py-2 font-medium">Price</th>
                  <th className="px-3 py-2 font-medium">Mileage</th>
                  <th className="px-3 py-2 font-medium">Distance</th>
                </tr>
              </thead>
              <tbody>
                {comparableDealerListings.map((c, i) => (
                  <tr key={i} className="border-t border-navy-900/5">
                    <td className="px-3 py-2 text-navy-900">{c.dealer}</td>
                    <td className="px-3 py-2 font-medium">{formatUSD(c.price)}</td>
                    <td className="px-3 py-2 text-navy-800/80">{formatMiles(c.mileage)}</td>
                    <td className="px-3 py-2 text-navy-800/80">{c.distanceMi} mi</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="border-t border-navy-900/10 px-5 py-3 text-xs leading-relaxed text-navy-800/60">
        {comps.disclaimer}
      </p>
    </section>
  );
}

function Stat({
  label,
  value,
  countValue,
  sub,
  accent = "navy",
}: {
  label: string;
  value?: string;
  countValue?: number;
  sub?: string;
  accent?: "navy" | "green";
}) {
  const isGreen = accent === "green";
  return (
    <div
      className={
        "rounded-xl p-3 ring-1 " +
        (isGreen ? "bg-mint ring-pine-600/20" : "bg-cream/60 ring-navy-900/5")
      }
    >
      <p className="text-xs font-medium uppercase tracking-wide text-navy-800/60">{label}</p>
      <p
        className={
          "mt-1 font-marquee text-3xl leading-none " +
          (isGreen ? "text-pine-700" : "text-navy-900")
        }
      >
        {typeof countValue === "number" ? (
          <CountUp value={countValue} prefix="$" />
        ) : (
          value
        )}
      </p>
      {sub && <p className="mt-1 text-xs text-navy-800/60">{sub}</p>}
    </div>
  );
}
