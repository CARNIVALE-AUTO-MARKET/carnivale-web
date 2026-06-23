import * as React from "react";
import { Flag } from "lucide-react";
import { cn } from "@/lib/utils";

/** Standard page hero/header for marketing + app pages. */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <header className={cn("relative overflow-hidden bg-cream", className)}>
      {/* candy-stripe hairline along the bottom edge */}
      <div aria-hidden className="candy-stripe absolute inset-x-0 bottom-0 h-1 opacity-70" />
      <div className="container py-12 sm:py-16">
        {eyebrow && (
          <p className="mb-2 font-marquee text-sm uppercase tracking-[0.3em] text-carnival-600">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-lg text-navy-800/80">{subtitle}</p>}
      </div>
    </header>
  );
}

export function Section({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <section className={cn("container py-12 sm:py-16", className)}>{children}</section>;
}

/** Clearly marks placeholder content (e.g. event dates) per the issue's requirement. */
export function PlaceholderNote({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-marquee-500/15 px-2.5 py-0.5 text-xs font-semibold text-marquee-600 ring-1 ring-marquee-500/30">
      <Flag className="h-3 w-3" strokeWidth={2.5} /> Placeholder — {children}
    </span>
  );
}
