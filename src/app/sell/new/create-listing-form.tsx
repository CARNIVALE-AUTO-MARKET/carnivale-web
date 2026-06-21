"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/field";
import { createClient } from "@/lib/supabase/client";
import { CATEGORIES, PREMIUM_SELLER_ADDON, DEFAULT_DEPOSIT_CENTS, categoryByKey } from "@/lib/constants";
import { formatUSD } from "@/lib/utils";

const STORAGE_BUCKET = "listing-photos";

export function CreateListingForm({ demo }: { demo: boolean }) {
  const [category, setCategory] = useState(CATEGORIES[0].key);
  const [premium, setPremium] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const cat = categoryByKey(category)!;
  const feeCents = cat.feeCents + (premium ? PREMIUM_SELLER_ADDON.feeCents : 0);
  const totalDueCents = feeCents + DEFAULT_DEPOSIT_CENTS;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    const form = new FormData(e.currentTarget);

    try {
      let photoPaths: string[] = [];

      const supabase = createClient();
      if (supabase) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error("Please sign in again.");

        // Upload photos to Supabase Storage under the seller's folder.
        for (const file of files.slice(0, 8)) {
          const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
          const path = `${user.id}/${Date.now()}-${safe}`;
          const { error: upErr } = await supabase.storage
            .from(STORAGE_BUCKET)
            .upload(path, file, { upsert: false });
          if (upErr) throw new Error(`Photo upload failed: ${upErr.message}`);
          const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
          photoPaths.push(data.publicUrl);
        }
      }

      const payload = {
        category,
        premium,
        year: Number(form.get("year")),
        make: String(form.get("make") ?? "").trim(),
        model: String(form.get("model") ?? "").trim(),
        trim: String(form.get("trim") ?? "").trim(),
        mileage: Number(form.get("mileage")),
        vin: String(form.get("vin") ?? "").trim(),
        zip: String(form.get("zip") ?? "").trim(),
        price: Number(form.get("price")),
        description: String(form.get("description") ?? "").trim(),
        photoPaths,
      };

      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error ?? "Could not create listing.");
      window.location.href = data.url;
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      <div className="space-y-6">
        {demo && (
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-navy-800/85">
            <strong>Demo mode:</strong> Supabase/Stripe aren&rsquo;t connected in this preview.
            You can fill out the form and see the confirmation + QR, but nothing is persisted and no
            real payment is taken.
          </div>
        )}

        {/* Category */}
        <fieldset className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card">
          <legend className="px-2 font-semibold text-navy-900">Vehicle category</legend>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            {CATEGORIES.map((c) => (
              <label
                key={c.key}
                className={
                  "cursor-pointer rounded-xl border p-3 text-sm transition-colors " +
                  (category === c.key
                    ? "border-carnival-600 bg-carnival-600/5"
                    : "border-navy-900/15 hover:bg-navy-50")
                }
              >
                <input
                  type="radio"
                  name="category"
                  value={c.key}
                  checked={category === c.key}
                  onChange={() => setCategory(c.key)}
                  className="sr-only"
                />
                <span className="font-semibold text-navy-900">{c.label}</span>
                <span className="mt-0.5 block text-xs text-navy-800/65">{c.blurb}</span>
                <span className="mt-1 block font-bold text-carnival-600">
                  {formatUSD(c.feeCents, { cents: true })}
                </span>
              </label>
            ))}
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm text-navy-800/85">
            <input
              type="checkbox"
              checked={premium}
              onChange={(e) => setPremium(e.target.checked)}
              className="h-4 w-4 rounded border-navy-900/30"
            />
            Add <strong>{PREMIUM_SELLER_ADDON.label}</strong> (+
            {formatUSD(PREMIUM_SELLER_ADDON.feeCents, { cents: true })}) — {PREMIUM_SELLER_ADDON.blurb}
          </label>
        </fieldset>

        {/* Vehicle details */}
        <fieldset className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card">
          <legend className="px-2 font-semibold text-navy-900">Vehicle details</legend>
          <div className="mt-2 grid gap-4 sm:grid-cols-3">
            <Field name="year" label="Year" type="number" required placeholder="2018" />
            <Field name="make" label="Make" required placeholder="Honda" />
            <Field name="model" label="Model" required placeholder="Civic" />
            <Field name="trim" label="Trim" placeholder="EX" />
            <Field name="mileage" label="Mileage" type="number" required placeholder="51200" />
            <Field name="zip" label="ZIP" required placeholder="55403" />
            <Field name="vin" label="VIN" placeholder="2HGFC2F77JH500002" className="sm:col-span-2" />
            <div>
              <Label htmlFor="price">Your price (USD)</Label>
              <Input id="price" name="price" type="number" required min={1} placeholder="16900" />
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Tell buyers what makes your car great — records, condition, why you're selling."
            />
          </div>
        </fieldset>

        {/* Photos */}
        <fieldset className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card">
          <legend className="px-2 font-semibold text-navy-900">Photos</legend>
          <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-navy-900/20 p-8 text-center hover:bg-navy-50">
            <UploadCloud className="h-8 w-8 text-carnival-600" />
            <span className="mt-2 text-sm font-medium text-navy-900">
              Click to add photos (up to 8)
            </span>
            <span className="text-xs text-navy-800/60">
              {files.length > 0 ? `${files.length} selected` : "JPG / PNG"}
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            />
          </label>
        </fieldset>
      </div>

      {/* Order summary */}
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card">
          <h3 className="font-semibold text-navy-900">Order summary</h3>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label={`${cat.label} display fee`} value={formatUSD(cat.feeCents, { cents: true })} />
            {premium && (
              <Row
                label={PREMIUM_SELLER_ADDON.label}
                value={formatUSD(PREMIUM_SELLER_ADDON.feeCents, { cents: true })}
              />
            )}
            <Row
              label="Refundable deposit"
              value={formatUSD(DEFAULT_DEPOSIT_CENTS, { cents: true })}
              sub
            />
            <div className="my-2 border-t border-navy-900/10" />
            <Row label="Due today" value={formatUSD(totalDueCents, { cents: true })} bold />
          </dl>
          <p className="mt-3 text-xs text-navy-800/60">
            The deposit is fully refundable after the event. The display fee is a flat fee — never a
            commission or a cut of your sale.
          </p>

          {err && <p className="mt-3 text-sm text-carnival-600">{err}</p>}

          <Button type="submit" size="lg" className="mt-4 w-full" disabled={busy}>
            {busy ? "Processing…" : "Continue to payment"}
          </Button>
          <p className="mt-2 text-center text-xs text-navy-800/55">
            Test mode — no real card is charged in Phase 0.
          </p>
        </div>
      </aside>
    </form>
  );
}

function Field({
  name,
  label,
  className,
  ...rest
}: { name: string; label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} {...rest} />
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  sub,
}: {
  label: string;
  value: string;
  bold?: boolean;
  sub?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className={sub ? "text-navy-800/70" : "text-navy-800"}>{label}</dt>
      <dd className={bold ? "font-display text-lg font-bold text-navy-900" : "font-medium text-navy-900"}>
        {value}
      </dd>
    </div>
  );
}
