import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "required").max(50),
  phone: z
    .string()
    .min(1, "required")
    .regex(/^[\d\-+() ]+$/)
    .min(10)
    .max(20),
  email: z.string().min(1, "required").email(),
  category: z.enum([
    "divorce",
    "inheritance",
    "labor",
    "corporate",
    "traffic",
    "real-estate",
    "other",
  ]),
  preferredDate: z.string().min(1, "required").max(100),
  message: z.string().min(10).max(2000),
  privacyAgreed: z.literal(true),
  locale: z.enum(["ja", "en"]),
});

export type ContactFormInput = z.infer<typeof contactSchema>;
