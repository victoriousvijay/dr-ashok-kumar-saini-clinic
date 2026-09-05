/**
 * Single source of truth for clinic facts used across metadata, structured
 * data, and page content. Only verified information from CONTENT.md belongs
 * here — anything unconfirmed must stay a "[TO BE VERIFIED]" placeholder
 * rather than an invented value.
 */

export const siteConfig = {
  name: "Dr. Ashok Kumar Saini — Psychiatric Clinic",
  shortName: "Dr. Ashok Kumar Saini Clinic",
  doctorName: "Dr. Ashok Kumar Saini",
  tagline: "Specialist Mental Health Care, Built Around You.",
  description:
    "Psychiatric consultation, psychotherapy and mental health services in Jaipur with a patient-first approach.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.example.com"),
  locale: "en_IN",
  address: {
    line1: "17, 18, First Floor, Near Union Bank, Engineers Colony",
    line2: "Panchyawala, Sirsi Road, Jaipur",
    city: "Jaipur",
    region: "Rajasthan",
    country: "IN",
    postalCode: "[TO BE VERIFIED]",
  },
  timings: [
    { days: "Monday – Saturday", hours: "7:30 AM – 9:00 AM" },
    { days: "Monday – Saturday", hours: "4:00 PM – 8:30 PM" },
  ],
  transit: [
    "AC 8 bus from Railway Station / Sindhi Camp",
    "7 No. Bus — SMS Psychiatric Center",
    "14 No. Bus / 19 No. Tempo from Chomu Puliya",
  ],
  contact: {
    phone: "[TO BE VERIFIED]",
    whatsapp: "[TO BE VERIFIED]",
    email: "[TO BE VERIFIED]",
  },
} as const;

export type SiteConfig = typeof siteConfig;
