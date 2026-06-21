-- ───────────────────────────────────────────────────────────────────────────
-- Seed data for carnivale-web (Phase 0).
--   • Always seeds a placeholder event.
--   • If at least one auth user exists, seeds 10 sample 'active' listings owned by
--     the earliest user (so Browse/detail render from the DB too). The app also
--     ships these same samples as static data (src/lib/sample-listings.ts), so the
--     marketplace renders even before any user/listings exist.
-- ───────────────────────────────────────────────────────────────────────────

insert into public.events (name, city, venue, is_placeholder)
values ('CARNIVALE — Minneapolis (Summer 2026)', 'Minneapolis, MN',
        'Dunwoody College of Technology (target lot)', true)
on conflict do nothing;

do $$
declare
  seller uuid;
begin
  select id into seller from auth.users order by created_at asc limit 1;
  if seller is null then
    raise notice 'No auth users yet — skipping sample listing seed. Create a user, then re-run.';
    return;
  end if;

  insert into public.listings
    (seller_id, year, make, model, trim, mileage, vin, zip, category, price, description, photo_paths, status)
  values
    (seller, 2011, 'Nissan', 'Frontier', 'SV', 19700, '1N6AD0EV5BC400001', '55403', 'truck_large', 14250, 'One-owner Frontier SV, garage-kept, all service records. Tow package, bed liner, new tires.', '{}', 'active'),
    (seller, 2018, 'Honda', 'Civic', 'EX', 51200, '2HGFC2F77JH500002', '55408', 'standard', 16900, 'Reliable commuter, sunroof, Apple CarPlay, new brakes. Clean title, non-smoker.', '{}', 'active'),
    (seller, 2016, 'Ford', 'F-150', 'XLT 4x4', 88400, '1FTEW1EF0GF600003', '55104', 'truck_large', 22500, '5.0L V8, crew cab, trailer brake controller, spray-in liner.', '{}', 'active'),
    (seller, 2019, 'Honda', 'CR-V', 'LX AWD', 43800, '5J6RW6H37KL700004', '55416', 'standard', 21300, 'AWD, very clean interior, recent oil change and cabin filter.', '{}', 'active'),
    (seller, 2015, 'Chevrolet', 'Corvette', 'Stingray Z51', 28100, '1G1YK2D70F5800005', '55405', 'premium', 44900, 'Z51 package, 7-speed manual, two sets of wheels. Adult-owned, never tracked.', '{}', 'active'),
    (seller, 2017, 'Chevrolet', 'Tahoe', 'LT', 96200, '1GNSKBKC5HR900006', '55102', 'truck_large', 27800, '3-row family hauler, rear entertainment, tow package, fresh brakes.', '{}', 'active'),
    (seller, 2020, 'Toyota', 'Camry', 'SE', 38600, '4T1G11AK0LU100007', '55407', 'standard', 23400, 'One owner, factory warranty remaining, blind-spot monitoring.', '{}', 'active'),
    (seller, 2014, 'Jeep', 'Wrangler', 'Sport 4x4', 79900, '1C4AJWAG0EL200008', '55411', 'truck_large', 19900, 'Hardtop + soft top, lift kit, 33s, well cared for.', '{}', 'active'),
    (seller, 2021, 'Tesla', 'Model 3', 'Long Range', 31200, '5YJ3E1EB0MF300009', '55401', 'premium', 32900, 'Dual motor AWD, premium interior, recent tires, clean Carfax.', '{}', 'active'),
    (seller, 2017, 'Subaru', 'Outback', '2.5i Premium', 102400, '4S4BSACC8H3401010', '55109', 'standard', 15800, 'AWD, heated seats, new battery, timing serviced.', '{}', 'active')
  on conflict do nothing;
end $$;
