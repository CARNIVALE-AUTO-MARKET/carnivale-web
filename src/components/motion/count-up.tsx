"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Spring count-up that triggers once it scrolls into view. Used for the
 * "You save ~$X vs dealer" number. Reduced-motion shows the final value instantly.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  durationMs = 1100,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setDisplay(value);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const animate = (t: number) => {
      if (start === null) start = t;
      const progress = Math.min(1, (t - start) / durationMs);
      // easeOutExpo for a springy settle
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(value * eased));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
