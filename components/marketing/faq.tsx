import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const faqs = [
  {
    question: "Do I need an appointment before visiting the clinic?",
    answer:
      "Appointment requirements are [TO BE VERIFIED]. Please submit an enquiry or contact the clinic directly to confirm the current process.",
  },
  {
    question: "What conditions does the clinic help with?",
    answer:
      "The clinic offers consultation across areas including anxiety and stress, sleep difficulties, child and adolescent psychiatry, geriatric psychiatry, de-addiction, sexual health and headache-related concerns. See the Services section for details.",
  },
  {
    question: "Is my information kept confidential?",
    answer:
      "Yes. Enquiry and patient information is handled with restricted, authenticated staff access and is never published or shared publicly.",
  },
  {
    question: "What are the consultation timings?",
    answer:
      "The clinic sees patients Monday–Saturday, 7:30 AM–9:00 AM and 4:00 PM–8:30 PM.",
  },
  {
    question: "Is this a psychiatric emergency service?",
    answer:
      "No. If you or someone you know is in immediate danger, please contact local emergency services or a crisis helpline right away rather than waiting for a clinic appointment.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Good to Know"
          title="Frequently asked questions"
          align="center"
        />

        <div className="mt-12 divide-y divide-slate-200 rounded-3xl border border-slate-200">
          {faqs.map((item) => (
            <details key={item.question} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base text-ink-950 marker:content-none">
                {item.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-xl text-teal-600 transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
