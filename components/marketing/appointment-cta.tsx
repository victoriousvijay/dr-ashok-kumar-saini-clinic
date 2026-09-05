import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function AppointmentCta() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(20,143,134,0.25),transparent_60%)]"
      />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl font-display text-3xl leading-tight text-cream-50 sm:text-4xl">
          Ready to take the first step toward better mental health?
        </h2>
        <p className="max-w-xl text-base text-slate-300 sm:text-lg">
          Share a few details and the clinic team will get back to you to
          schedule a consultation.
        </p>
        <Button href="/appointment" variant="onDark" size="lg">
          Book an Appointment
        </Button>
      </Container>
    </section>
  );
}
