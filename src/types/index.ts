export type Locale = "ja" | "en";

export interface PracticeAreaSlug {
  slug: "divorce" | "inheritance" | "labor" | "corporate" | "traffic" | "real-estate";
}

export const PRACTICE_AREA_SLUGS = [
  "divorce",
  "inheritance",
  "labor",
  "corporate",
  "traffic",
  "real-estate",
] as const;

export type PracticeAreaSlugType = (typeof PRACTICE_AREA_SLUGS)[number];

export interface NavigationItem {
  label: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  category: string;
  preferredDate: string;
  message: string;
  privacyAgreed: boolean;
  locale: Locale;
}
