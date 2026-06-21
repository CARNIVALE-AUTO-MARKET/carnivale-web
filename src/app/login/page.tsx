import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader, Section } from "@/components/page";
import { LoginForm } from "./login-form";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Sign in to CARNIVALE"
        subtitle="Create a free account to list your vehicle. You keep your sale — we just run the show."
      />
      <Section>
        <div className="mx-auto max-w-md">
          {!isSupabaseConfigured && (
            <div className="mb-5 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-navy-800/85">
              <strong>Demo mode:</strong> Supabase isn&rsquo;t connected in this preview yet. Set the
              Supabase env vars in Vercel to enable real accounts. You can still explore the listing
              flow below.
            </div>
          )}
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </Section>
    </>
  );
}
