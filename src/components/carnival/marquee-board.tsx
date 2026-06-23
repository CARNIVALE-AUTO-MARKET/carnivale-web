import { MapPin, CalendarDays } from "lucide-react";
import { NEXT_EVENT } from "@/lib/constants";
import { PlaceholderNote } from "@/components/page";
import { cn } from "@/lib/utils";

function BulbRow({ count, className }: { count: number; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between px-3", className)} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="block h-2 w-2 rounded-full bg-bulb shadow-bulb animate-twinkle"
          style={{ animationDelay: `${(i % 6) * 0.4}s` }}
        />
      ))}
    </div>
  );
}

/**
 * "Now showing this weekend" marquee board — bulb border + next event + Dunwoody.
 */
export function MarqueeBoard({ className, bulbs = 16 }: { className?: string; bulbs?: number }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border-2 border-marquee-500/70 bg-navy-900 text-cream shadow-lift",
        className,
      )}
    >
      <BulbRow count={bulbs} className="pt-3" />
      <div className="px-6 pb-2 pt-2 text-center sm:px-10">
        <p className="font-marquee text-sm uppercase tracking-[0.35em] text-marquee-500">
          Now showing this weekend
        </p>
        <p className="mt-2 flex flex-wrap items-center justify-center gap-x-3 font-marquee text-2xl uppercase leading-tight tracking-wide sm:text-3xl">
          <CalendarDays className="h-6 w-6 text-bulb" strokeWidth={2.5} />
          {NEXT_EVENT.city}
          <span className="text-marquee-500">·</span>
          {NEXT_EVENT.dateLabel}
        </p>
        <p className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-300">
          <MapPin className="h-4 w-4 text-bulb" /> {NEXT_EVENT.venue} · {NEXT_EVENT.hours}
        </p>
        {NEXT_EVENT.isPlaceholder && (
          <div className="mt-3">
            <PlaceholderNote>event dates not yet finalized</PlaceholderNote>
          </div>
        )}
      </div>
      <BulbRow count={bulbs} className="pb-3" />
    </div>
  );
}
