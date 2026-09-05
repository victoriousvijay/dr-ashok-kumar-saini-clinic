import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Mental Health Services in Jaipur",
  description:
    "Explore psychiatric consultation, psychotherapy and related mental health services offered in Jaipur.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <section className="bg-cream-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Areas of Care"
          title="Mental health services in Jaipur"
          description="Each service page explains what it involves and who it may help. If you're unsure where to start, submit a general enquiry and the clinic team will guide you."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>
              <Card className="group flex h-full flex-col justify-between">
                <div>
                  <h2 className="font-display text-xl text-ink-950">
                    {service.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {service.shortDescription}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 transition-transform group-hover:translate-x-0.5">
                  Learn more
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
