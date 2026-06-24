import { describe, expect, it } from "vitest";
import { quote } from "./pricing";

// Locks the CANONICAL pricing: pay today (incl. $100 deposit) / net for the weekend.
describe("quote (Show-Up Deposit pricing)", () => {
  it("Powersports: $199 today → $100 back → net $99", () => {
    const q = quote("powersports");
    expect(q.payTodayCents).toBe(19900);
    expect(q.refundedAtDropoffCents).toBe(10000);
    expect(q.netCents).toBe(9900);
  });

  it("Car/Truck/SUV/Van: $249 today → $100 back → net $149", () => {
    const q = quote("standard");
    expect(q.payTodayCents).toBe(24900);
    expect(q.netCents).toBe(14900);
  });

  it("RV/Boat/Trailer/Large: $349 today → $100 back → net $249", () => {
    const q = quote("large");
    expect(q.payTodayCents).toBe(34900);
    expect(q.netCents).toBe(24900);
  });

  it("Premium add-on (+$99) is non-refundable: adds to today and net", () => {
    const base = quote("standard");
    const prem = quote("standard", true);
    expect(prem.payTodayCents).toBe(base.payTodayCents + 9900);
    expect(prem.netCents).toBe(base.netCents + 9900);
    expect(prem.refundedAtDropoffCents).toBe(10000); // deposit unchanged
  });
});
