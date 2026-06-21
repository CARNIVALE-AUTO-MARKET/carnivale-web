-- ───────────────────────────────────────────────────────────────────────────
-- CARNIVALE — carnivale-web Phase 0 schema
-- Tables: events, profiles, listings, payments  (+ RLS)
-- Apply to the dedicated carnivale-web Supabase project.
-- ───────────────────────────────────────────────────────────────────────────

create extension if not exists pgcrypto;

-- ── events ──────────────────────────────────────────────────────────────────
create table if not exists public.events (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  city           text not null,
  venue          text not null,
  starts_on      date,
  ends_on        date,
  is_placeholder boolean not null default true,
  created_at     timestamptz not null default now()
);

-- ── profiles (1:1 with auth.users) ──────────────────────────────────────────
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text,
  phone      text,                 -- the seller's REAL phone (never printed publicly)
  created_at timestamptz not null default now()
);

-- ── listings ────────────────────────────────────────────────────────────────
create table if not exists public.listings (
  id           uuid primary key default gen_random_uuid(),
  seller_id    uuid not null references auth.users(id) on delete cascade,
  year         int  not null,
  make         text not null,
  model        text not null,
  trim         text,
  mileage      int  not null default 0,
  vin          text,
  zip          text not null,
  category     text not null check (category in ('standard','truck_large','premium')),
  price        int  not null check (price >= 0),
  description  text,
  photo_paths  text[] not null default '{}',
  status       text not null default 'draft'
                 check (status in ('draft','pending_payment','active','sold','withdrawn')),
  relay_number text,               -- masked relay shown publicly; real phone stays in profiles
  created_at   timestamptz not null default now()
);
create index if not exists listings_status_idx on public.listings(status);
create index if not exists listings_seller_idx on public.listings(seller_id);

-- ── payments ────────────────────────────────────────────────────────────────
create table if not exists public.payments (
  id                uuid primary key default gen_random_uuid(),
  listing_id        uuid not null references public.listings(id) on delete cascade,
  seller_id         uuid not null references auth.users(id) on delete cascade,
  stripe_session_id text,
  fee_cents         int not null default 0,      -- flat display fee (never a commission)
  deposit_cents     int not null default 0,      -- refundable deposit
  status            text not null default 'created'
                      check (status in ('created','requires_payment','paid','failed','refunded')),
  created_at        timestamptz not null default now()
);
create index if not exists payments_listing_idx on public.payments(listing_id);

-- ── new-user trigger: auto-create a profile row ─────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Row Level Security ──────────────────────────────────────────────────────
alter table public.events   enable row level security;
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.payments enable row level security;

-- events: world-readable, no public writes
drop policy if exists events_read on public.events;
create policy events_read on public.events for select using (true);

-- profiles: a user sees/edits only their own
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles for select using (auth.uid() = id);
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles for update using (auth.uid() = id);
drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles for insert with check (auth.uid() = id);

-- listings: active listings are public; owners see/manage their own (any status)
drop policy if exists listings_public_read on public.listings;
create policy listings_public_read on public.listings
  for select using (status = 'active' or auth.uid() = seller_id);
drop policy if exists listings_insert_own on public.listings;
create policy listings_insert_own on public.listings
  for insert with check (auth.uid() = seller_id);
drop policy if exists listings_update_own on public.listings;
create policy listings_update_own on public.listings
  for update using (auth.uid() = seller_id);
drop policy if exists listings_delete_own on public.listings;
create policy listings_delete_own on public.listings
  for delete using (auth.uid() = seller_id);

-- payments: owner-only (the Stripe webhook uses the service role, bypassing RLS)
drop policy if exists payments_select_own on public.payments;
create policy payments_select_own on public.payments for select using (auth.uid() = seller_id);
drop policy if exists payments_insert_own on public.payments;
create policy payments_insert_own on public.payments for insert with check (auth.uid() = seller_id);
drop policy if exists payments_update_own on public.payments;
create policy payments_update_own on public.payments for update using (auth.uid() = seller_id);
