import type { Metadata } from "next";
import { MapPin, Clock, CalendarDays } from "lucide-react";
import { PageHeader, PlaceholderNote, Section } from "@/components/page";
import { NEXT_EVENT } from "@/lib/constants";

export const metadata: Metadata = { title: "Dates & Location" };

export default function DatesLocationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dates & location"
        title="When and where the CARNIVALE rolls in"
        subtitle="Markets: Minneapolis (summer/fall) and Dallas–Fort Worth (year-round, later). Our first target lot is Dunwoody College of Technology."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          <InfoCard icon={<CalendarDays className="h-6 w-6" />} title="Next event">
            <p className="text-navy-900">{NEXT_EVENT.dateLabel}</p>
            <div className="mt-2">
              <PlaceholderNote>dates to be announced</PlaceholderNote>
            </div>
          </InfoCard>
          <InfoCard icon={<MapPin className="h-6 w-6" />} title="Location">
            <p className="text-navy-900">{NEXT_EVENT.city}</p>
            <p className="text-sm text-navy-800/75">{NEXT_EVENT.venue}</p>
            <div className="mt-2">
              <PlaceholderNote>venue not yet confirmed</PlaceholderNote>
            </div>
          </InfoCard>
          <InfoCard icon={<Clock className="h-6 w-6" />} title="Hours">
            <p className="text-navy-900">{NEXT_EVENT.hours}</p>
            <p className="mt-1 text-sm text-navy-800/75">
              Open Sunday — our edge over Minnesota dealers, who are legally closed.
            </p>
          </InfoCard>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-navy-900/10">
          <div className="grid h-64 place-items-center bg-navy-50 text-center">
            <div>
              <MapPin className="mx-auto h-8 w-8 text-carnival-600" />
              <p className="mt-2 font-semibold text-navy-900">Map placeholder</p>
              <p className="text-sm text-navy-800/70">
                Embedded venue map goes here once the lot is confirmed.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-amber-500/15 text-carnival-600">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-navy-900">{title}</h3>
      <div className="mt-2 space-y-1">{children}</div>
    </div>
  );
}
