"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const spring = { type: "spring", stiffness: 320, damping: 28, mass: 0.7 } as const;

/** A single scroll-reveal element: fade + rise, spring physics, reduced-motion safe. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...spring, delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers its <RevealItem> children as they enter the viewport. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : stagger } },
  };
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  y = 18,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "span";
}) {
  const MotionTag = motion[as];
  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: spring },
  };
  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
