"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, Phone, Tag } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { StringLights } from "@/components/carnival/string-lights";
import { WordStagger } from "@/components/motion/word-stagger";

export function HomeHero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden night-sky text-cream">
      <StringLights count={32} height={40} className="absolute inset-x-0 top-0" />
      {/* faint stars */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] lights"
        style={{ backgroundSize: "44px 44px" }}
      />

      <div className="container relative flex flex-col items-center pb-20 pt-24 text-center sm:pt-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="font-display text-2xl font-bold tracking-tight text-cream sm:text-3xl">
            CARNI<span className="text-carnival-600">VALE</span>
          </p>
          <p className="mt-1 font-marquee text-sm uppercase tracking-[0.4em] text-marquee-500">
            The Park-it Market · Minneapolis
          </p>
        </motion.div>

        <WordStagger
          text="Sell your car safely. Buy one for the fun of it."
          highlight={["safely.", "fun"]}
          highlightClassName="text-marquee-500"
          delay={0.15}
          className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] sm:text-6xl"
        />

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 max-w-xl text-lg text-slate-300"
        >
          A staffed, public weekend market where private owners sell direct — you set the
          price, keep every dollar, and never meet a stranger at your home.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.82, type: "spring", stiffness: 300, damping: 24 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <ButtonLink href="/sell" variant="amber" size="lg">
            List your car <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/inventory" variant="outline" size="lg" className="bg-white/95">
            Browse the lot
          </ButtonLink>
        </motion.div>

        <motion.ul
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-300"
        >
          <li className="inline-flex items-center gap-1.5">
            <Tag className="h-4 w-4 text-bulb" /> Flat fee, never a commission
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Phone className="h-4 w-4 text-bulb" /> Masked number — your phone stays private
          </li>
          <li className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-bulb" /> Staffed &amp; safe all weekend
          </li>
        </motion.ul>
      </div>
    </section>
  );
}
