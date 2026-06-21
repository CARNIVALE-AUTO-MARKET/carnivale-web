import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "navy",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: "navy" | "amber" | "red" | "green" }) {
  const tones: Record<string, string> = {
    navy: "bg-navy-900 text-white",
    amber: "bg-amber-500 text-navy-950",
    red: "bg-carnival-600 text-white",
    green: "bg-emerald-600 text-white",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
