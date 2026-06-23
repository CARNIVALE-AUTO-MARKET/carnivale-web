import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "pine" | "gold" | "red" | "navy";

const TONES: Record<Tone, string> = {
  pine: "bg-pine-600 text-white ring-pine-700/40",
  gold: "bg-marquee-500 text-navy-950 ring-marquee-600/50",
  red: "bg-carnival-600 text-white ring-carnival-700/40",
  navy: "bg-navy-900 text-cream ring-navy-950/50",
};

/**
 * Enamel-pin trust badge (VIN verified, clean title, etc).
 * Glossy enamel look via a soft top highlight. Lucide icons only — no emoji.
 */
export function EnamelBadge({
  icon: Icon,
  children,
  tone = "pine",
  className,
}: {
  icon?: LucideIcon;
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center gap-1.5 overflow-hidden rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide shadow-sm ring-1",
        TONES[tone],
        className,
      )}
    >
      {/* enamel gloss */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-white/25"
      />
      {Icon ? <Icon className="relative h-3.5 w-3.5" strokeWidth={2.5} /> : null}
      <span className="relative">{children}</span>
    </span>
  );
}
