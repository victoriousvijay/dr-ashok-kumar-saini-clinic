import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { EnquiryForm } from "@/components/marketing/enquiry-form";
import { siteConfig } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Request a psychiatric consultation appointment with the clinic team in Jaipur.",
  alternates: { canonical: "/appointment" },
};

export default async function AppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <section className="bg-cream-50 py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div>
          <Badge>Book an Appointment</Badge>
          <h1 className="mt-4 font-display text-3xl leading-tight text-ink-950 sm:text-4xl">
            Request a consultation
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            Share your details below and the clinic team will contact you to
            confirm a consultation slot.
          </p>

          <dl className="mt-10 space-y-6 border-t border-slate-200 pt-8">
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-400">
                Clinic Timings
              </dt>
              {siteConfig.timings.map((slot) => (
                <dd key={slot.hours} className="mt-1 text-sm text-slate-700">
                  {slot.days}: {slot.hours}
                </dd>
              ))}
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-400">
                Address
              </dt>
              <dd className="mt-1 text-sm text-slate-700">
                {siteConfig.address.line1}, {siteConfig.address.line2}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-400">
                Phone
              </dt>
              <dd className="mt-1 text-sm text-slate-700">
                {siteConfig.contact.phone}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_1px_2px_rgba(16,24,32,0.04),0_18px_40px_-24px_rgba(16,24,32,0.18)] sm:p-10">
          <EnquiryForm defaultService={service} />
        </div>
      </Container>
    </section>
  );
}
