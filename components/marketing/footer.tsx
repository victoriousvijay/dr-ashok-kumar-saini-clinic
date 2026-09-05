import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/seo/site";
import { services } from "@/lib/data/services";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950 text-slate-300">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg text-cream-50">
            {siteConfig.doctorName}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Services
          </p>
          <ul className="mt-4 space-y-2.5">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm text-slate-300 transition-colors hover:text-teal-300"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Clinic Timings
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
            {siteConfig.timings.map((slot) => (
              <li key={slot.hours}>
                <span className="block text-slate-400">{slot.days}</span>
                {slot.hours}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Location
          </p>
          <address className="mt-4 text-sm not-italic leading-relaxed text-slate-300">
            {siteConfig.address.line1}
            <br />
            {siteConfig.address.line2}
          </address>
          <p className="mt-4 text-sm text-slate-400">
            Phone: {siteConfig.contact.phone}
          </p>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.shortName}. All rights
            reserved.
          </p>
          <p>
            Information on this site is educational and does not replace
            professional medical advice.
          </p>
        </Container>
      </div>
    </footer>
  );
}
