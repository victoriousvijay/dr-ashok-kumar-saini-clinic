import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getServiceBySlug, services } from "@/lib/data/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.name,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <article className="bg-cream-50 py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Badge>Area of Care</Badge>
        <h1 className="mt-4 font-display text-3xl leading-tight text-ink-950 sm:text-4xl">
          {service.name}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">
          {service.description}
        </p>

        <h2 className="mt-10 font-display text-xl text-ink-950">
          Who this may help
        </h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
          {service.whoItMayHelp.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true" className="text-teal-600">
                —
              </span>
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-slate-500">
          This page is educational and does not replace a professional
          consultation or diagnosis.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href={`/appointment?service=${encodeURIComponent(service.name)}`} size="lg">
            Book an Appointment
          </Button>
          <Button href="/services" variant="secondary" size="lg">
            View all services
          </Button>
        </div>

        <p className="mt-10 text-sm text-slate-500">
          <Link href="/services" className="text-teal-600 hover:underline">
            ← Back to all services
          </Link>
        </p>
      </Container>
    </article>
  );
}
