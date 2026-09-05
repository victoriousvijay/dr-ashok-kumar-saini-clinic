import { Clock, MapPin, Bus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/seo/site";

export function LocationTimings() {
  return (
    <section id="location" className="scroll-mt-24 bg-cream-100 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Visit the Clinic"
          title="Location & consultation timings"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Card>
            <MapPin className="h-6 w-6 text-teal-600" aria-hidden="true" />
            <h3 className="mt-4 font-display text-lg text-ink-950">
              Address
            </h3>
            <address className="mt-2 text-sm not-italic leading-relaxed text-slate-600">
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.line2}
            </address>
          </Card>

          <Card>
            <Clock className="h-6 w-6 text-teal-600" aria-hidden="true" />
            <h3 className="mt-4 font-display text-lg text-ink-950">
              Consultation Timings
            </h3>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-600">
              {siteConfig.timings.map((slot) => (
                <li key={slot.hours}>
                  <span className="font-medium text-ink-900">
                    {slot.days}:
                  </span>{" "}
                  {slot.hours}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <Bus className="h-6 w-6 text-teal-600" aria-hidden="true" />
            <h3 className="mt-4 font-display text-lg text-ink-950">
              Getting Here
            </h3>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-600">
              {siteConfig.transit.map((route) => (
                <li key={route}>{route}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Container>
    </section>
  );
}
