import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AmbientDepth } from "@/components/3d/ambient-depth";
import { siteConfig } from "@/lib/seo/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <AmbientDepth />
      <Container className="relative flex flex-col items-start gap-8 py-28 sm:py-32 lg:py-40">
        <Badge variant="onDark">Psychiatric Care in Jaipur</Badge>

        <h1 className="max-w-3xl font-display text-4xl leading-[1.08] text-cream-50 sm:text-5xl lg:text-6xl">
          {siteConfig.tagline}
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
          {siteConfig.description}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/appointment" variant="onDark" size="lg">
            Book an Appointment
          </Button>
          <Button href="/#services" variant="secondaryOnDark" size="lg">
            Explore Services
          </Button>
        </div>

        <dl className="mt-6 grid w-full max-w-xl grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">
              Areas of Care
            </dt>
            <dd className="mt-1 font-display text-2xl text-cream-50">9+</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">
              Consultation Days
            </dt>
            <dd className="mt-1 font-display text-2xl text-cream-50">
              Mon–Sat
            </dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="text-xs uppercase tracking-wide text-slate-400">
              Location
            </dt>
            <dd className="mt-1 font-display text-2xl text-cream-50">
              Sirsi Road, Jaipur
            </dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
