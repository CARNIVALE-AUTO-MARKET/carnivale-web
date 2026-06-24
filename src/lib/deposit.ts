import { DEPOSIT_CENTS } from "./pricing";

/**
 * Show-Up Deposit lifecycle (CANONICAL).
 * The $100 deposit is:
 *   • held       — charged upfront at reservation;
 *   • refunded   — at Friday drop-off (kiosk check-in), OR on a 72h+ advance cancellation;
 *   • forfeited  — on a no-show, OR a late (<72h) cancellation.
 */
export type DepositStatus = "held" | "refunded_dropoff" | "refunded_cancel" | "forfeited";

export const ADVANCE_CANCEL_HOURS = 72;

export type DepositAction =
  | { type: "checkin" } // Friday drop-off / kiosk check-in
  | { type: "cancel"; hoursBeforeDropoff: number }
  | { type: "noshow" };

export interface DepositResolution {
  status: DepositStatus;
  refundCents: number;
  reason: string;
}

/** Pure transition from `held` given an action. Idempotent on terminal states. */
export function resolveDeposit(action: DepositAction): DepositResolution {
  switch (action.type) {
    case "checkin":
      return {
        status: "refunded_dropoff",
        refundCents: DEPOSIT_CENTS,
        reason: "Refunded at Friday drop-off.",
      };
    case "cancel":
      if (action.hoursBeforeDropoff >= ADVANCE_CANCEL_HOURS) {
        return {
          status: "refunded_cancel",
          refundCents: DEPOSIT_CENTS,
          reason: `Refunded — cancelled ${ADVANCE_CANCEL_HOURS}h+ in advance.`,
        };
      }
      return {
        status: "forfeited",
        refundCents: 0,
        reason: `Forfeited — cancelled less than ${ADVANCE_CANCEL_HOURS}h before drop-off.`,
      };
    case "noshow":
      return {
        status: "forfeited",
        refundCents: 0,
        reason: "Forfeited — vehicle was not dropped off (no-show).",
      };
  }
}

export const DEPOSIT_TERMS = {
  short:
    "The $100 Show-Up Deposit is refunded the moment you drop your car off Friday. It's only forfeited if you no-show or cancel within 72 hours.",
  bullets: [
    "Charged upfront with your display fee.",
    "Refunded in full at Friday drop-off (kiosk check-in).",
    "Refunded if you cancel 72+ hours in advance.",
    "Forfeited only on a no-show or a cancellation within 72 hours.",
  ],
  why:
    "The deposit guarantees the cars we advertise actually show up — so buyers can come to the event for specific vehicles.",
} as const;
