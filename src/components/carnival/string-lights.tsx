"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Swooping wire of glowing bulbs — the signature CARNIVALE motif.
 * Bulbs switch on in sequence on load, then gently twinkle (CSS, per-bulb delay).
 * Reduced motion: bulbs appear lit, no twinkle.
 */
export function StringLights({
  count = 26,
  className,
  height = 46,
}: {
  count?: number;
  className?: string;
  height?: number;
}) {
  const reduce = useReducedMotion();
  const gid = useId().replace(/:/g, "");
  const width = 1200;
  const swoops = Math.max(2, Math.round(count / 6));
  const amp = height * 0.42;
  const baseY = height * 0.3;

  const bulbs = Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const x = 12 + t * (width - 24);
    // scalloped sag: sine across the full width creating gentle swoops
    const y = baseY + amp * (0.5 - 0.5 * Math.cos(t * Math.PI * 2 * swoops)) + amp * 0.15;
    return { x, y, i };
  });

  // wire path through the bulb tops
  const wire = bulbs
    .map((b, i) => `${i === 0 ? "M" : "L"}${b.x.toFixed(1)},${(b.y - 6).toFixed(1)}`)
    .join(" ");

  return (
    <div className={cn("pointer-events-none w-full overflow-hidden", className)} aria-hidden>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="h-[var(--h)] w-full"
        style={{ ["--h" as string]: `${height}px` }}
      >
        <defs>
          <radialGradient id={`g-${gid}`} cx="50%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#FFF4D6" />
            <stop offset="45%" stopColor="#F4C75A" />
            <stop offset="100%" stopColor="#E0A800" />
          </radialGradient>
          <filter id={`glow-${gid}`} x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="3.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path d={wire} fill="none" stroke="#0d1a28" strokeWidth="1.6" opacity="0.55" />

        {bulbs.map((b) => (
          <motion.g
            key={b.i}
            initial={reduce ? false : { opacity: 0.18 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ delay: reduce ? 0 : 0.25 + b.i * 0.05, duration: 0.28 }}
          >
            {/* socket cap */}
            <rect x={b.x - 1.6} y={b.y - 8} width="3.2" height="3.6" rx="1" fill="#0d1a28" />
            <circle
              cx={b.x}
              cy={b.y}
              r="4.4"
              fill={`url(#g-${gid})`}
              filter={`url(#glow-${gid})`}
              className={reduce ? undefined : "animate-twinkle"}
              style={reduce ? undefined : { animationDelay: `${(b.i % 6) * 0.45}s`, transformBox: "fill-box", transformOrigin: "center" }}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
