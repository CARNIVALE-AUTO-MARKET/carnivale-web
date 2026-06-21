import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { PlaceholderQR } from "@/components/placeholder-qr";
import { Section } from "@/components/page";
import { maskedRelay } from "@/lib/utils";

export const metadata: Metadata = { title: "Listing confirmed" };

export default function SuccessPage({
  searchParams,
}: {
  searchParams: {
    listing?: string;
    session_id?: string;
    mock?: string;
    demo?: string;
    y?: string;
    mk?: string;
    md?: string;
    price?: string;
  };
}) {
  const { listing, mock, demo, y, mk, md } = searchParams;
  const seed = listing || `${y ?? ""}-${mk ?? ""}-${md ?? ""}` || "preview";
  const vehicle = [y, mk, md].filter(Boolean).join(" ");

  return (
    <Section className="max-w-2xl">
      <div className="rounded-3xl border border-emerald-600/25 bg-white p-8 text-center shadow-card sm:p-12">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
        <h1 className="mt-4 font-display text-3xl font-bold text-navy-900">
          Your listing is in the show!
        </h1>
        <p className="mt-2 text-navy-800/80">
          {demo
            ? "This is a Phase 0 demo confirmation — nothing was persisted and no payment was taken."
            : mock
              ? "Payment recorded in test mode. Your listing is now active."
              : "Payment received. Your listing is now active."}
        </p>
        {vehicle && <p className="mt-1 font-medium text-navy-900">{vehicle}</p>}

        <div className="mt-8 flex flex-col items-center gap-2">
          <PlaceholderQR seed={seed} size={140} />
          <p className="text-xs text-navy-800/60">
            Placeholder QR for your window profile (real QR comes in a later phase).
          </p>
        </div>

        <div className="mt-6 rounded-xl bg-navy-50 p-4 text-sm text-navy-800/80">
          Buyers will reach you on your masked relay number{" "}
          <strong className="text-navy-900">{maskedRelay(seed)}</strong> — your real number is never
          shown.
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {listing && !demo ? (
            <>
              <ButtonLink href={`/listing/${listing}/window`} variant="primary" size="lg">
                View window profile
              </ButtonLink>
              <ButtonLink href={`/inventory/${listing}`} variant="outline" size="lg">
                View listing
              </ButtonLink>
            </>
          ) : (
            <ButtonLink href="/inventory" variant="primary" size="lg">
              Browse inventory
            </ButtonLink>
          )}
        </div>

        <p className="mt-6 text-xs text-navy-800/55">
          Need to make a change?{" "}
          <Link href="/contact" className="font-medium text-carnival-600 hover:underline">
            Contact us
          </Link>
          .
        </p>
      </div>
    </Section>
  );
}
