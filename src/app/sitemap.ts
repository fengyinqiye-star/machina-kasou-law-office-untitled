import { MetadataRoute } from "next";

const BASE_URL = "https://kasou-law.vercel.app";
const locales = ["ja", "en"];
const practiceAreaSlugs = [
  "divorce",
  "inheritance",
  "labor",
  "corporate",
  "traffic",
  "real-estate",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/practice-areas",
    "/lawyers",
    "/office",
    "/fees",
    "/contact",
    "/privacy-policy",
    "/disclaimer",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
      });
    }

    for (const slug of practiceAreaSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/practice-areas/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
