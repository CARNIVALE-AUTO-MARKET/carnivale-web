import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { PageHeader, Section } from "@/components/page";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        subtitle="Selling, buying, or want to bring a food truck or sponsor a weekend? Send us a note."
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <ContactForm />
          <div className="space-y-5">
            <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-carnival-600" />
                <span className="font-semibold text-navy-900">Email</span>
              </div>
              <p className="mt-1 text-sm text-navy-800/80">hello@carnivale.example (placeholder)</p>
            </div>
            <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-carnival-600" />
                <span className="font-semibold text-navy-900">Where</span>
              </div>
              <p className="mt-1 text-sm text-navy-800/80">
                Minneapolis, MN — Dunwoody College of Technology (target lot). Dallas–Fort Worth
                coming later.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
