import { z } from "zod";

export const contactMethods = ["Call", "WhatsApp", "Email"] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s-]{7,15}$/, "Please enter a valid phone number."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .optional()
    .or(z.literal("")),
  interestedService: z.string().trim().max(120).optional().or(z.literal("")),
  preferredContact: z.enum(contactMethods).optional(),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  source: z.string().trim().max(60).default("website"),
});

export type LeadInput = z.infer<typeof leadSchema>;
