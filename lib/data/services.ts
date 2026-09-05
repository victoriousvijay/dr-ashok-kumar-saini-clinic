export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  whoItMayHelp: string[];
};

/**
 * Services listed verbatim from CONTENT.md. Descriptions are written as
 * general, educational overviews — not medical claims or guarantees.
 */
export const services: Service[] = [
  {
    slug: "psychiatric-consultation",
    name: "Psychiatric Consultation",
    shortDescription:
      "Comprehensive psychiatric evaluation and ongoing consultation for mental health concerns.",
    description:
      "A psychiatric consultation involves a structured conversation about your symptoms, history and daily life to help understand what may be affecting your mental health, followed by guidance on next steps.",
    whoItMayHelp: [
      "Anyone experiencing changes in mood, thinking or behaviour",
      "People seeking a professional opinion on mental health concerns",
      "Patients continuing an existing course of psychiatric care",
    ],
  },
  {
    slug: "child-adolescent-psychiatry",
    name: "Child & Adolescent Psychiatric OPD",
    shortDescription:
      "Dedicated psychiatric consultation for children and adolescents, including a child guidance clinic.",
    description:
      "Child and adolescent mental health concerns are assessed with age-appropriate approaches, involving parents and caregivers as part of the process.",
    whoItMayHelp: [
      "Children and teenagers with behavioural or emotional concerns",
      "Parents seeking guidance on a child's development or conduct",
      "Families looking for structured child guidance support",
    ],
  },
  {
    slug: "geriatric-psychiatry",
    name: "Geriatric Psychiatric Consultation",
    shortDescription:
      "Mental health consultation focused on the needs of older adults.",
    description:
      "Older adults can face distinct mental health and cognitive challenges. Consultations consider age-related factors alongside general psychiatric evaluation.",
    whoItMayHelp: [
      "Older adults experiencing mood, memory or behavioural changes",
      "Families supporting an elderly relative's mental wellbeing",
    ],
  },
  {
    slug: "drug-de-addiction",
    name: "Drug De-addiction Services",
    shortDescription:
      "Consultation and support for substance use and de-addiction concerns.",
    description:
      "De-addiction consultations address substance use concerns with a structured, non-judgemental approach aimed at supporting recovery.",
    whoItMayHelp: [
      "Individuals seeking help with substance use",
      "Families looking for guidance on supporting a loved one",
    ],
  },
  {
    slug: "sleep-clinic",
    name: "Sleep Clinic",
    shortDescription: "Consultation for sleep-related difficulties.",
    description:
      "Sleep difficulties can be connected to a range of underlying factors. Consultation looks at sleep patterns alongside overall mental health.",
    whoItMayHelp: [
      "People with persistent difficulty falling or staying asleep",
      "Individuals with disrupted sleep patterns affecting daily life",
    ],
  },
  {
    slug: "sexual-disorder-clinic",
    name: "Sexual Disorder Clinic (Male, Female)",
    shortDescription:
      "Confidential consultation for sexual health concerns for men and women.",
    description:
      "Sexual health concerns are discussed in a private, respectful setting, with attention to both psychological and general wellbeing factors.",
    whoItMayHelp: [
      "Men and women with sexual health concerns",
      "Individuals seeking a confidential professional opinion",
    ],
  },
  {
    slug: "headache-clinic",
    name: "Headache Clinic",
    shortDescription:
      "Consultation for recurring headache concerns with a mental-health-informed approach.",
    description:
      "Recurring headaches can be linked with stress, sleep and other factors. Consultation considers these alongside general evaluation.",
    whoItMayHelp: [
      "People experiencing frequent or persistent headaches",
      "Patients seeking guidance on stress-related headache patterns",
    ],
  },
  {
    slug: "psychotherapy-counselling",
    name: "Psychotherapy & Counselling",
    shortDescription:
      "Talking-therapy approaches including CBT, ERP, IPSRT, IPT and MET, alongside counselling.",
    description:
      "Structured psychotherapy approaches such as CBT, ERP, IPSRT, IPT and MET may be used alongside counselling, depending on individual needs and clinical judgement.",
    whoItMayHelp: [
      "People looking for structured talking-therapy support",
      "Patients continuing therapy as part of a treatment plan",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
