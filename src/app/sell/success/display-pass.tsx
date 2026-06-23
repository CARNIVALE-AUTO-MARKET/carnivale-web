"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { PartyPopper, Ticket } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { PlaceholderQR } from "@/components/placeholder-qr";
import { fireConfetti } from "@/lib/confetti";
import { maskedRelay } from "@/lib/utils";

export function DisplayPass({
  listing,
  demo,
  mock,
  vehicle,
  seed,
}: {
  listing?: string;
  demo?: boolean;
  mock?: boolean;
  vehicle?: string;
  seed: string;
}) {
  const reduce = useReducedMotion();
  const [sold, setSold] = useState(false);
  const soldBtn = useRef<HTMLButtonElement>(null);
  const fired = useRef(false);

  // Confetti + stamp on registration complete (once).
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    fireConfetti({ y: 0.4 });
  }, []);

  function markSold() {
    if (sold) return;
    setSold(true);
    const rect = soldBtn.current?.getBoundingClientRect();
    const origin = rect
      ? { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight }
      : undefined;
    fireConfetti(origin);
  }

  return (
    <div className="relative mx-auto max-w-2xl">
      {/* The Display Pass ticket */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24, rotate: -1 }}
        animate={reduce ? undefined : { opacity: 1, y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative overflow-hidden rounded-3xl bg-[#FFFCF4] shadow-lift ring-1 ring-navy-900/10"
      >
        <div aria-hidden className="candy-stripe h-2 w-full" />
        <div className="flex items-center justify-between px-6 pt-5 sm:px-10">
          <Logo />
          <span className="font-marquee text-sm uppercase tracking-[0.25em] text-navy-800/55">
            Display Pass
          </span>
        </div>

        {/* Stamp */}
        <div className="px-6 pt-6 text-center sm:px-10">
          <motion.div
            initial={reduce ? false : { scale: 1.7, opacity: 0, rotate: -20 }}
            animate={reduce ? undefined : { scale: 1, opacity: 1, rotate: -7 }}
            transition={{ type: "spring", stiffness: 220, damping: 12, delay: 0.25 }}
            className="mx-auto inline-flex items-center gap-2 rounded-xl border-4 border-pine-600 px-4 py-1.5 font-marquee text-xl uppercase tracking-widest text-pine-700"
          >
            <Ticket className="h-5 w-5" /> Confirmed
          </motion.div>

          <h1 className="mt-5 font-display text-3xl font-semibold text-navy-900">
            Your listing is in the show!
          </h1>
          <p className="mt-2 text-navy-800/80">
            {demo
              ? "Phase 0 demo confirmation — nothing was persisted and no payment was taken."
              : mock
                ? "Payment recorded in test mode. Your listing is now active."
                : "Payment received. Your listing is now active."}
          </p>
          {vehicle && <p className="mt-1 font-marquee text-lg text-carnival-600">{vehicle}</p>}
        </div>

        {/* tear line */}
        <div className="relative my-6">
          <div aria-hidden className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-cream ring-1 ring-navy-900/10" />
          <div aria-hidden className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-cream ring-1 ring-navy-900/10" />
          <div className="mx-6 border-t-2 border-dashed border-navy-900/15 sm:mx-10" />
        </div>

        <div className="grid gap-6 px-6 pb-8 sm:grid-cols-[1fr_auto] sm:items-center sm:px-10">
          <div>
            <p className="font-marquee text-[11px] uppercase tracking-[0.25em] text-navy-800/55">
              Admit one · masked relay
            </p>
            <p className="mt-1 font-marquee text-2xl text-navy-900">{maskedRelay(seed)}</p>
            <p className="mt-1 text-xs text-navy-800/60">
              Buyers reach you on this line — your real number is never shown.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {listing && !demo ? (
                <>
                  <ButtonLink href={`/listing/${listing}/window`} variant="primary">
                    View window profile
                  </ButtonLink>
                  <ButtonLink href={`/inventory/${listing}`} variant="outline">
                    View listing
                  </ButtonLink>
                </>
              ) : (
                <ButtonLink href="/inventory" variant="primary">
                  Browse inventory
                </ButtonLink>
              )}
            </div>
          </div>

          <div className="text-center">
            <PlaceholderQR seed={seed} size={132} />
            <p className="mt-1 text-xs text-navy-800/60">Scan to view online</p>
          </div>
        </div>

        {/* SOLD overlay */}
        <AnimatePresence>
          {sold && (
            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pointer-events-none absolute inset-0 grid place-items-center bg-navy-950/30"
            >
              <motion.span
                initial={reduce ? false : { scale: 2, rotate: -24, opacity: 0 }}
                animate={reduce ? undefined : { scale: 1, rotate: -12, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 11 }}
                className="rounded-2xl border-[6px] border-carnival-600 bg-cream/95 px-8 py-3 font-marquee text-5xl uppercase tracking-widest text-carnival-600 shadow-lift"
              >
                Sold!
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* I SOLD IT carnival button */}
      <div className="mt-6 text-center">
        <button
          ref={soldBtn}
          onClick={markSold}
          disabled={sold}
          className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-carnival-600 px-7 py-3 font-marquee text-lg uppercase tracking-wider text-white shadow-lift ring-2 ring-carnival-700/30 transition-transform hover:-translate-y-0.5 disabled:opacity-70"
        >
          <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-white/20" />
          <PartyPopper className="relative h-5 w-5" />
          <span className="relative">{sold ? "Marked sold — congrats!" : "I sold it"}</span>
        </button>
        <p className="mt-2 text-xs text-navy-800/55">
          Tap when your car sells to close out your spot (demo celebration).
        </p>
      </div>
    </div>
  );
}
