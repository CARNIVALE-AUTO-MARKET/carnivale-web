import type { Metadata } from "next";
import { Fraunces, Anton, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BRAND } from "@/lib/constants";

// Display / headlines — warm vintage-leaning serif (fairground-poster character).
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});
// Marquee / big numbers — condensed.
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marquee",
  display: "swap",
});
// Body / UI.
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "CARNIVALE · The Park-it Market",
    template: "%s · CARNIVALE — The Park-it Market",
  },
  description: BRAND.tagline,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    type: "website",
    siteName: "CARNIVALE — The Park-it Market",
    title: "CARNIVALE · The Park-it Market",
    description: BRAND.tagline,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CARNIVALE · The Park-it Market",
    description: BRAND.tagline,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${anton.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
