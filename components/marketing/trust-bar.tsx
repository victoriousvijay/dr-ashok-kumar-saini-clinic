import { Container } from "@/components/ui/container";

const values = [
  {
    title: "Patient-first approach",
    description:
      "Consultations centred on listening first, so care plans reflect your actual concerns.",
  },
  {
    title: "Structured evaluation",
    description:
      "A consistent clinical process for assessment, from first consultation to follow-up.",
  },
  {
    title: "Confidential by design",
    description:
      "Every consultation and record is treated as private, with access limited to clinic staff.",
  },
];

export function TrustBar() {
  return (
    <section className="bg-cream-50 py-16 sm:py-20">
      <Container>
        <div className="grid gap-8 sm:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="border-t-2 border-teal-500 pt-5"
            >
              <h3 className="font-display text-lg text-ink-950">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
