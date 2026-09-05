import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/seo/site";

export function DoctorIntro() {
  return (
    <section id="doctor" className="scroll-mt-24 bg-ink-950 py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
        <div className="relative">
          <div className="aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950">
            <div className="flex h-full items-center justify-center p-10 text-center text-sm text-slate-400">
              Professional photograph — [TO BE VERIFIED]
            </div>
          </div>
        </div>

        <div>
          <Badge variant="onDark">About the Doctor</Badge>
          <h2 className="mt-4 font-display text-3xl leading-tight text-cream-50 sm:text-4xl">
            {siteConfig.doctorName}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {siteConfig.doctorName} provides psychiatric consultation,
            psychotherapy and related mental health services in Jaipur,
            covering care across childhood, adulthood and older age.
          </p>

          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                Qualifications
              </dt>
              <dd className="mt-1 text-sm text-slate-300">
                [TO BE VERIFIED]
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                Registration
              </dt>
              <dd className="mt-1 text-sm text-slate-300">
                [TO BE VERIFIED]
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                Years in Practice
              </dt>
              <dd className="mt-1 text-sm text-slate-300">
                [TO BE VERIFIED]
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                Affiliations
              </dt>
              <dd className="mt-1 text-sm text-slate-300">
                [TO BE VERIFIED]
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}
