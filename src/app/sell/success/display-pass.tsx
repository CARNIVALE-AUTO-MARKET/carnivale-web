"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { PartyPopper, Ticket, CheckCircle2, Heart } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { PlaceholderQR } from "@/components/placeholder-qr";
import { fireConfetti } from "@/lib/confetti";
import { maskedRelay, formatUSD } from "@/lib/utils";
import { resolveDeposit, DEPOSIT_TERMS, type DepositStatus } from "@/lib/deposit";
import { DEPOSIT_CENTS, CHARITY_LINE } from "@/lib/pricing";

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
  const [depositStatus, setDepositStatus] = useState<DepositStatus>("held");
  const soldBtn = useRef<HTMLButtonElement>(null);
  const fired = useRef(false);

  const refunded = depositStatus === "refunded_dropoff";

  function checkIn() {
    if (refunded) return;
    const r = resolveDeposit({ type: "checkin" });
    setDepositStatus(r.status);
    fireConfetti({ y: 0.5 });
  }

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

        {/* Show-Up Deposit panel */}
        <div className="mx-6 mb-8 rounded-xl bg-cream/70 p-4 ring-1 ring-navy-900/10 sm:mx-10">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-marquee text-[11px] uppercase tracking-[0.2em] text-navy-800/55">
                Show-Up Deposit · {formatUSD(DEPOSIT_CENTS, { cents: true })}
              </p>
              <p
                className={
                  "mt-0.5 text-sm font-semibold " +
                  (refunded ? "text-pine-700" : "text-navy-900")
                }
              >
                {refunded
                  ? `Refunded ${formatUSD(DEPOSIT_CENTS, { cents: true })} at drop-off ✓`
                  : "Held — refunded the moment you drop off Friday"}
              </p>
            </div>
            {refunded ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-pine-600 px-3 py-1 text-xs font-semibold text-white">
                <CheckCircle2 className="h-4 w-4" /> Checked in
              </span>
            ) : (
              <button
                onClick={checkIn}
                className="shrink-0 rounded-full bg-navy-900 px-3 py-1.5 text-xs font-semibold text-cream hover:bg-navy-800"
              >
                Simulate Friday drop-off
              </button>
            )}
          </div>
          <p className="mt-2 text-[11px] leading-snug text-navy-800/60">{DEPOSIT_TERMS.short}</p>
          <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-pine-700">
            <Heart className="h-3.5 w-3.5" /> {CHARITY_LINE}
          </p>
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
