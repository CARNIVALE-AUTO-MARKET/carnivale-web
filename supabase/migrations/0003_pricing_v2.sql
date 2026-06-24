-- ───────────────────────────────────────────────────────────────────────────
-- Pricing v2 — type lanes, Premium add-on, Show-Up Deposit lifecycle
-- ───────────────────────────────────────────────────────────────────────────

-- Listings: lanes are now by VEHICLE TYPE (not value).
alter table public.listings drop constraint if exists listings_category_check;
alter table public.listings
  add constraint listings_category_check
  check (category in ('powersports','standard','large'));

-- Payments: track the Premium add-on and the deposit lifecycle.
alter table public.payments
  add column if not exists premium_cents int not null default 0;

alter table public.payments
  add column if not exists deposit_status text not null default 'held'
  check (deposit_status in ('held','refunded_dropoff','refunded_cancel','forfeited'));

-- Deposit is refunded at Friday drop-off (kiosk check-in) or a 72h+ advance cancel;
-- forfeited on a no-show or a <72h cancel. Refund is processed off the Stripe payment.
