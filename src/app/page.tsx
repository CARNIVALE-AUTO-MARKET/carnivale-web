import Link from "next/link";
import { ArrowRight, ShieldCheck, Tag, CalendarDays, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ListingCard } from "@/components/listing-card";
import { PlaceholderNote, Section } from "@/components/page";
import { SAMPLE_LISTINGS } from "@/lib/sample-listings";
import { NEXT_EVENT, BRAND } from "@/lib/constants";

export default function HomePage() {
  const featured = SAMPLE_LISTINGS.filter((l) => l.featured).slice(0, 3);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-cream">
        <div className="lights absolute inset-x-0 top-0 h-6 opacity-30" aria-hidden />
        <div className="container grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 text-xs font-semibold text-amber-500 ring-1 ring-cream/15">
              <Sparkles className="h-3.5 w-3.5" /> A weekend car carnival — not a dealer lot
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
              Sell your car <span className="text-amber-500">safely.</span>
              <br />
              Buy one <span className="text-carnival-600">for the fun of it.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-cream/80">{BRAND.tagline}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/sell" variant="amber" size="lg">
                List your car <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/inventory" variant="outline" size="lg" className="bg-white">
                Browse inventory
              </ButtonLink>
            </div>
            <p className="mt-5 text-sm text-cream/60">
              You set the price. You keep every dollar of the sale. We just run the show.
            </p>
          </div>

          <div className="rounded-2xl bg-cream/5 p-5 ring-1 ring-cream/10">
            <div className="grid grid-cols-2 gap-3">
              {featured.slice(0, 2).map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-cream/50">
              Sample listings shown during Phase 0.
            </p>
          </div>
        </div>
      </section>

      {/* Value props */}
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          <Value
            icon={<ShieldCheck className="h-6 w-6" />}
            title="The safe way to sell privately"
            body="Meet buyers at a staffed, public weekend event — never alone in a parking lot. We print a masked relay number, never your real phone."
          />
          <Value
            icon={<Tag className="h-6 w-6" />}
            title="One flat fee, by category"
            body="Never a commission, never a cut of your sale. A simple display fee plus a fully refundable deposit — that's it."
          />
          <Value
            icon={<CalendarDays className="h-6 w-6" />}
            title="Show it 'til it sells"
            body="One fee covers free returning weekends for 90 days. Open Saturday & Sunday — yes, Sunday, when the dealers are closed."
          />
        </div>
      </Section>

      {/* How it works strip */}
      <section className="bg-white">
        <div className="container py-14">
          <h2 className="text-2xl font-bold text-navy-900">How CARNIVALE works</h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-4">
            {[
              ["Register to sell", "Create a listing online with photos, price, and your category."],
              ["Drop off Friday", "Bring your car to the lot. We stage it with its window profile + QR."],
              ["We run the weekend", "Buyers browse Sat & Sun. They contact you via a masked relay number."],
              ["You close the sale", "Buyer pays you directly. We're never a party to the transaction."],
            ].map(([t, b], i) => (
              <li key={t} className="relative rounded-2xl border border-navy-900/10 p-5">
                <span className="absolute -top-3 left-5 grid h-7 w-7 place-items-center rounded-full bg-carnival-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="mt-2 font-semibold text-navy-900">{t}</p>
                <p className="mt-1 text-sm text-navy-800/75">{b}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <Link href="/how-it-works" className="font-semibold text-carnival-600 hover:underline">
              See the full playbook →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured inventory */}
      <Section>
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-navy-900">This weekend&rsquo;s lineup</h2>
          <Link href="/inventory" className="text-sm font-semibold text-carnival-600 hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </Section>

      {/* Next event CTA */}
      <section className="bg-carnival-600 text-white">
        <div className="container flex flex-col items-start gap-4 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
              Next CARNIVALE
            </p>
            <h2 className="mt-1 text-2xl font-bold">
              {NEXT_EVENT.city} · {NEXT_EVENT.dateLabel}
            </h2>
            <p className="mt-1 text-white/85">
              {NEXT_EVENT.venue} · {NEXT_EVENT.hours}
            </p>
            {NEXT_EVENT.isPlaceholder && (
              <div className="mt-2">
                <PlaceholderNote>event dates not yet finalized</PlaceholderNote>
              </div>
            )}
          </div>
          <ButtonLink href="/dates-location" variant="amber" size="lg">
            Dates &amp; location
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

function Value({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-amber-500/15 text-carnival-600">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-navy-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-navy-800/80">{body}</p>
    </div>
  );
}
