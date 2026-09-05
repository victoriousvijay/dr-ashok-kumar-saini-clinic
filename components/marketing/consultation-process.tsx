import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    step: "01",
    title: "Share your enquiry",
    description:
      "Tell us what's bringing you in — briefly, and only what you're comfortable sharing.",
  },
  {
    step: "02",
    title: "Clinic gets in touch",
    description:
      "Our team contacts you to confirm details and schedule a consultation slot.",
  },
  {
    step: "03",
    title: "Initial consultation",
    description:
      "A structured conversation with the doctor to understand your concerns and history.",
  },
  {
    step: "04",
    title: "Care plan & follow-up",
    description:
      "Next steps are discussed together, with follow-up scheduled as clinically appropriate.",
  },
];

export function ConsultationProcess() {
  return (
    <section id="process" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What to Expect"
          title="A clear, structured path to consultation"
          align="center"
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <div key={item.step} className="relative pl-1">
              <span className="font-display text-4xl text-teal-100">
                {item.step}
              </span>
              <h3 className="mt-3 font-display text-lg text-ink-950">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
