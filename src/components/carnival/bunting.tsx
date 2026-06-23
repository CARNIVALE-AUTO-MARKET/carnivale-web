import { cn } from "@/lib/utils";

/**
 * Triangular pennant string — a section divider. Static SVG (used sparingly).
 */
export function Bunting({ className }: { className?: string }) {
  const colors = ["#C0392B", "#E0A800", "#FBF6EC", "#1E7B45"];
  const count = 16;
  const width = 1200;
  const step = width / count;

  return (
    <div className={cn("pointer-events-none w-full overflow-hidden", className)} aria-hidden>
      <svg viewBox={`0 0 ${width} 40`} preserveAspectRatio="none" className="h-8 w-full">
        <path d={`M0,6 L${width},6`} stroke="#0d1a28" strokeWidth="1.5" opacity="0.5" />
        {Array.from({ length: count }, (_, i) => {
          const x = i * step;
          return (
            <path
              key={i}
              d={`M${x + 2},6 L${x + step - 2},6 L${x + step / 2},34 Z`}
              fill={colors[i % colors.length]}
              stroke="#0d1a28"
              strokeWidth="0.75"
              opacity="0.95"
            />
          );
        })}
      </svg>
    </div>
  );
}
