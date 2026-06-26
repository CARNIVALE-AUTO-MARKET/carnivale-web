-- ───────────────────────────────────────────────────────────────────────────
-- Pricing lanes v2 — split Boat & Watercraft into its own lane
-- ───────────────────────────────────────────────────────────────────────────
-- Four type lanes now: powersports ($99), standard ($149), boat ($119, incl. PWC
-- — moved out of powersports), large ($199, RV/Trailer). Lanes are by VEHICLE
-- TYPE, never value. Canonical: carnivale-ops/CANONICAL.md (Pricing locked).

alter table public.listings drop constraint if exists listings_category_check;
alter table public.listings
  add constraint listings_category_check
  check (category in ('powersports','standard','boat','large'));
