"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/field";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-600/30 bg-emerald-50 p-8 text-center">
        <p className="text-lg font-semibold text-navy-900">Thanks — message received!</p>
        <p className="mt-1 text-sm text-navy-800/80">
          This is a Phase 0 placeholder form; wiring to email/CRM comes next. We&rsquo;ll be in
          touch.
        </p>
      </div>
    );
  }

  return (
    <form
      className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required placeholder="Your name" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@email.com" />
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="topic">I&rsquo;m reaching out about</Label>
        <Select id="topic" name="topic" defaultValue="selling">
          <option value="selling">Selling a vehicle</option>
          <option value="buying">Buying a vehicle</option>
          <option value="vendor">Becoming a vendor / sponsor</option>
          <option value="other">Something else</option>
        </Select>
      </div>
      <div className="mt-4">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required placeholder="How can we help?" />
      </div>
      <div className="mt-5">
        <Button type="submit" size="lg">
          Send message
        </Button>
      </div>
      <p className="mt-3 text-xs text-navy-800/60">
        Placeholder form — submissions are not yet delivered anywhere in Phase 0.
      </p>
    </form>
  );
}
