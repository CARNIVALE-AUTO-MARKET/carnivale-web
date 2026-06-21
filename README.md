# carnivale-web

CARNIVALE marketing site + marketplace app — **VPS project**.
Stack: Next.js (App Router) + TypeScript + Tailwind + shadcn-style UI + Supabase + Stripe.

> CARNIVALE is a **venue / promoter**, not a dealer. We never take title, commission, or the
> buyer's money. See `CANONICAL.md` in `carnivale-ops` (the source of truth).

## Phase 0 (this branch)

- Marketing site (Home, How It Works, Register to Sell, Pricing, Browse, Tips, Buying,
  Vendors, Dates & Location, FAQ, About/Dunwoody, Contact) — on-brand, mobile-first.
- Supabase auth + schema (`events`, `profiles`, `listings`, `payments`) with RLS.
- Register-to-Sell → create-listing flow: photo upload, category/price/VIN, Stripe
  (display fee + refundable deposit), confirmation + placeholder QR.
- Browse + listing detail from seeded sample listings.
- "Private price vs. comparable dealer listings + You save ~$X" block, fed by a typed
  `getComps()` client matching `carnivale-ops/contracts/comps-contract.md` (MOCK data
  until carnivale-comps is live).

## Local development

```bash
npm install
cp .env.example .env.local   # fill in values (or leave Stripe/Supabase blank for mock/demo)
npm run dev
npm test                     # unit tests (comps savings logic)
```

The app degrades gracefully: with no Supabase/Stripe env it still renders all pages and
the seed inventory, and the checkout step uses a mock fallback.

## Database

SQL lives in `supabase/migrations/` (schema + RLS) and `supabase/seed.sql` (sample data).
Apply with the Supabase CLI or MCP once the dedicated `carnivale-web` project exists.

## Deploy

Push the branch / open a PR — Vercel builds a preview automatically (see
`carnivale-ops/docs/deploy.md`). Do **not** deploy via the Vercel CLI/MCP.
Set all secrets in Vercel project settings, never in the repo.
