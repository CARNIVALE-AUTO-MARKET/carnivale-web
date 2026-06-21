"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";
import { createClient } from "@/lib/supabase/client";

type Mode = "signin" | "signup";

export function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") ?? "/sell/new";

  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    const supabase = createClient();

    if (!supabase) {
      // Demo mode: no backend — let the user continue to the (mock) listing flow.
      router.push(next);
      return;
    }

    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${next}` },
        });
        if (error) throw error;
        // If email confirmation is off, a session exists immediately.
        const { data } = await supabase.auth.getSession();
        if (data.session) router.push(next);
        else setMsg("Check your email to confirm your account, then sign in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push(next);
        router.refresh();
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card"
    >
      <div className="mb-4 flex rounded-xl bg-navy-50 p-1 text-sm font-medium">
        {(["signup", "signin"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={
              "flex-1 rounded-lg py-2 transition-colors " +
              (mode === m ? "bg-white text-navy-900 shadow-sm" : "text-navy-800/60")
            }
          >
            {m === "signup" ? "Create account" : "Sign in"}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
      </div>

      {err && <p className="mt-3 text-sm text-carnival-600">{err}</p>}
      {msg && <p className="mt-3 text-sm text-emerald-600">{msg}</p>}

      <Button type="submit" size="lg" className="mt-5 w-full" disabled={busy}>
        {busy ? "Please wait…" : mode === "signup" ? "Create account & continue" : "Sign in"}
      </Button>
    </form>
  );
}
