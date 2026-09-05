import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/data/services";

export function ServicesGrid() {
  return (
    <section id="services" className="scroll-mt-24 bg-cream-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Areas of Care"
          title="Mental health services for every stage of life"
          description="From first consultation to ongoing therapy, each service below is a starting point — the exact approach is decided during your consultation."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>
              <Card className="group flex h-full flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl text-ink-950">
                    {service.name}
                  </h3>
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
