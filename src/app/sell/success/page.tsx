import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/page";
import { DisplayPass } from "./display-pass";

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
    <Section>
      <DisplayPass
        listing={listing}
        demo={Boolean(demo)}
        mock={Boolean(mock)}
        vehicle={vehicle || undefined}
        seed={seed}
      />
      <p className="mt-8 text-center text-xs text-navy-800/55">
        Need to make a change?{" "}
        <Link href="/contact" className="font-medium text-carnival-600 hover:underline">
          Contact us
        </Link>
        .
      </p>
    </Section>
  );
}
