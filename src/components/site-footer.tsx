import Link from "next/link";
import { Heart } from "lucide-react";
import { Logo } from "./logo";
import { StringLights } from "./carnival/string-lights";
import { DISCLAIMER, FOOTER_NAV } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="mt-20 night-sky text-cream/90 no-print">
      {/* Garland strung across the top of the footer. */}
      <StringLights count={34} height={30} />
      <div className="container grid gap-10 pb-12 pt-6 md:grid-cols-[1.2fr_2fr]">
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
          <p className="mb-3 flex items-center gap-2 text-xs font-medium text-marquee-500">
            <Heart className="h-3.5 w-3.5" /> 10% of every reservation supports Dunwoody scholarships
            and a rotating community charity.
          </p>
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
