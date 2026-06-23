"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const PRICE_OPTS = [
  ["", "Any price"],
  ["20000", "Under $20k"],
  ["30000", "Under $30k"],
  ["45000", "Under $45k"],
];
const MILES_OPTS = [
  ["", "Any mileage"],
  ["40000", "Under 40k mi"],
  ["80000", "Under 80k mi"],
  ["120000", "Under 120k mi"],
];
const SORT_OPTS = [
  ["featured", "Featured"],
  ["price-asc", "Price: low to high"],
  ["price-desc", "Price: high to low"],
  ["miles-asc", "Lowest mileage"],
  ["save-desc", "Biggest savings"],
];

export function BrowseFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [params, pathname, router],
  );

  const category = params.get("category") ?? "";
  const maxPrice = params.get("maxPrice") ?? "";
  const maxMiles = params.get("maxMiles") ?? "";
  const sort = params.get("sort") ?? "featured";

  const chips = [{ key: "", label: "All" }, ...CATEGORIES.map((c) => ({ key: c.key, label: c.label }))];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => {
          const active = category === c.key;
          return (
            <button
              key={c.label}
              onClick={() => setParam("category", c.key)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium ring-1 transition-colors",
                active
                  ? "bg-navy-900 text-cream ring-navy-900"
                  : "bg-[#FFFCF4] text-navy-800 ring-navy-900/15 hover:bg-white",
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        <FilterSelect label="Price" value={maxPrice} options={PRICE_OPTS} onChange={(v) => setParam("maxPrice", v)} />
        <FilterSelect label="Mileage" value={maxMiles} options={MILES_OPTS} onChange={(v) => setParam("maxMiles", v)} />
        <FilterSelect label="Sort" value={sort} options={SORT_OPTS} onChange={(v) => setParam("sort", v)} />
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[][];
  onChange: (v: string) => void;
}) {
  return (
    <label className="inline-flex items-center gap-2 rounded-xl border border-navy-900/15 bg-[#FFFCF4] px-3 py-1.5 text-sm">
      <span className="text-navy-800/55">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent font-medium text-navy-900 focus:outline-none"
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}
