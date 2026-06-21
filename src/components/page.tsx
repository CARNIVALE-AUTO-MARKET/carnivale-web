import * as React from "react";
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
    <header className={cn("border-b border-navy-900/10 bg-white", className)}>
      <div className="container py-12 sm:py-16">
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-carnival-600">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-bold text-navy-900 sm:text-4xl">{title}</h1>
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
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-600 ring-1 ring-amber-500/30">
      <span aria-hidden>⚑</span> Placeholder — {children}
    </span>
  );
}
