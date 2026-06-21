import Link from "next/link";
import { cn } from "@/lib/utils";

/** Wordmark logo — a little carnival flair without an image asset. */
export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2", className)}>
      <span
        aria-hidden
        className="grid h-8 w-8 place-items-center rounded-lg bg-carnival-600 text-white shadow-card transition-transform group-hover:-rotate-6"
      >
        <span className="text-lg">★</span>
      </span>
      <span
        className={cn(
          "font-display text-xl font-bold tracking-tight",
          light ? "text-white" : "text-navy-900",
        )}
      >
        CARNI<span className="text-carnival-600">VALE</span>
      </span>
    </Link>
  );
}
