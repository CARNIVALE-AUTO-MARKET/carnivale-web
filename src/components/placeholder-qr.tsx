import { cn } from "@/lib/utils";

/**
 * Deterministic QR-style placeholder (no external dep). Phase 0 only — a real QR
 * encoding the listing/window URL is wired in a later phase.
 */
export function PlaceholderQR({ seed, size = 120 }: { seed: string; size?: number }) {
  const cells = 11;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 33 + seed.charCodeAt(i)) >>> 0;
  const on: boolean[] = [];
  for (let i = 0; i < cells * cells; i++) {
    h = (h * 1103515245 + 12345) & 0x7fffffff;
    on.push((h & 1) === 1);
  }
  const cell = size / cells;
  return (
    <div className={cn("inline-block rounded-lg bg-white p-2 ring-1 ring-navy-900/15")}>
      <svg width={size} height={size} role="img" aria-label="Placeholder QR code">
        <rect width={size} height={size} fill="#fff" />
        {on.map((v, i) => {
          if (!v) return null;
          const x = (i % cells) * cell;
          const y = Math.floor(i / cells) * cell;
          return <rect key={i} x={x} y={y} width={cell} height={cell} fill="#14283C" />;
        })}
        {/* finder squares */}
        {[
          [0, 0],
          [cells - 3, 0],
          [0, cells - 3],
        ].map(([fx, fy], idx) => (
          <rect
            key={`f${idx}`}
            x={fx * cell}
            y={fy * cell}
            width={cell * 3}
            height={cell * 3}
            fill="none"
            stroke="#C0392B"
            strokeWidth={cell * 0.7}
          />
        ))}
      </svg>
    </div>
  );
}
