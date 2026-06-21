import Link from "next/link";
import { Logo } from "./logo";
import { DISCLAIMER, FOOTER_NAV } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-navy-900/10 bg-navy-900 text-cream/90 no-print">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo light />
          <p className="mt-3 max-w-xs text-sm text-cream/70">
            The safest way to sell your vehicle — and the most fun place to buy one.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
          {FOOTER_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-cream/80 hover:text-amber-500"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-cream/10">
        <div className="container py-6">
          <p className="text-xs leading-relaxed text-cream/60">{DISCLAIMER}</p>
          <p className="mt-3 text-xs text-cream/50">
            © {2026} CARNIVALE (working name). Minneapolis · Dallas–Fort Worth. All product names
            and dealer references shown for comparison are property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
