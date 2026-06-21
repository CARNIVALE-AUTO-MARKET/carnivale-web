import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageHeader, Section } from "@/components/page";
import { CreateListingForm } from "./create-listing-form";
import { createClient, getUser } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = { title: "Create a listing" };

export default async function NewListingPage() {
  // Auth gate (only when Supabase is configured; demo mode is open for preview).
  if (isSupabaseConfigured) {
    const supabase = createClient();
    if (supabase) {
      const user = await getUser();
      if (!user) redirect("/login?next=/sell/new");
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Register to sell"
        title="Create your listing"
        subtitle="Add your vehicle, set your price, and pay the flat display fee + refundable deposit. You keep 100% of your sale."
      />
      <Section>
        <CreateListingForm demo={!isSupabaseConfigured} />
      </Section>
    </>
  );
}
