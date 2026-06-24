import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * CARNIVALE brand lockup — wordmark over the "The Park-it Market" subheading.
 * Clean typographic lockup (no image asset yet). `light` for dark backgrounds;
 * `subhead={false}` for cramped contexts.
 */
export function Logo({
  className,
  light = false,
  subhead = true,
}: {
  className?: string;
  light?: boolean;
  subhead?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="CARNIVALE — The Park-it Market"
      className={cn("group inline-flex flex-col leading-none", className)}
    >
      <span
        className={cn(
          "font-display text-xl font-bold tracking-tight transition-colors",
          light ? "text-cream" : "text-navy-900",
        )}
      >
        CARNI<span className="text-carnival-600">VALE</span>
      </span>
      {subhead && (
        <span
          className={cn(
            "mt-0.5 font-marquee text-[10px] uppercase tracking-[0.34em]",
            light ? "text-marquee-500" : "text-navy-800/65",
          )}
        >
          The Park-it Market
        </span>
      )}
    </Link>
  );
}
