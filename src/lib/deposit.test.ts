import { describe, expect, it } from "vitest";
import { resolveDeposit, ADVANCE_CANCEL_HOURS } from "./deposit";
import { DEPOSIT_CENTS } from "./pricing";

describe("resolveDeposit", () => {
  it("refunds in full at Friday drop-off (check-in)", () => {
    const r = resolveDeposit({ type: "checkin" });
    expect(r.status).toBe("refunded_dropoff");
    expect(r.refundCents).toBe(DEPOSIT_CENTS);
  });

  it("refunds on a 72h+ advance cancellation", () => {
    const r = resolveDeposit({ type: "cancel", hoursBeforeDropoff: ADVANCE_CANCEL_HOURS });
    expect(r.status).toBe("refunded_cancel");
    expect(r.refundCents).toBe(DEPOSIT_CENTS);
  });

  it("forfeits on a late (<72h) cancellation", () => {
    const r = resolveDeposit({ type: "cancel", hoursBeforeDropoff: 24 });
    expect(r.status).toBe("forfeited");
    expect(r.refundCents).toBe(0);
  });

  it("forfeits on a no-show", () => {
    const r = resolveDeposit({ type: "noshow" });
    expect(r.status).toBe("forfeited");
    expect(r.refundCents).toBe(0);
  });
});
