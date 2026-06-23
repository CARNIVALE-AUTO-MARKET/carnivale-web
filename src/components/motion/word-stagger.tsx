"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

/**
 * Headline whose words spring in with a stagger on load.
 * Pass the headline as plain text; markup is added per word. Reduced-motion safe.
 */
export function WordStagger({
  text,
  className,
  highlight = [],
  highlightClassName = "text-marquee-500",
  delay = 0,
}: {
  text: string;
  className?: string;
  /** Lowercased words to color with the highlight class. */
  highlight?: string[];
  highlightClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const hi = new Set(highlight.map((w) => w.toLowerCase()));

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: 24, rotate: -2 },
    show: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { type: "spring", stiffness: 380, damping: 26 },
    },
  };

  return (
    <motion.h1
      className={className}
      variants={container}
      initial={reduce ? false : "hidden"}
      animate={reduce ? undefined : "show"}
    >
      {words.map((w, i) => {
        const clean = w.replace(/[^a-z]/gi, "").toLowerCase();
        return (
          <Fragment key={i}>
            <motion.span
              variants={word}
              className={cn("inline-block", hi.has(clean) && highlightClassName)}
            >
              {w}
            </motion.span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </motion.h1>
  );
}
