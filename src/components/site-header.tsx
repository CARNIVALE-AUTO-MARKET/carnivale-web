"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ButtonLink } from "./ui/button";
import { PRIMARY_NAV } from "@/lib/constants";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-navy-900/10 bg-cream/90 backdrop-blur no-print">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-navy-800 hover:text-carnival-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ButtonLink href="/login" variant="ghost" size="sm">
            Sign in
          </ButtonLink>
          <ButtonLink href="/sell" variant="primary" size="sm">
            List your car
          </ButtonLink>
        </div>
        <button
          className="rounded-lg p-2 text-navy-900 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-navy-900/10 bg-cream md:hidden">
          <nav className="container flex flex-col py-3" aria-label="Mobile">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 text-navy-800"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <ButtonLink href="/login" variant="outline" size="sm" className="flex-1">
                Sign in
              </ButtonLink>
              <ButtonLink href="/sell" variant="primary" size="sm" className="flex-1">
                List your car
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
