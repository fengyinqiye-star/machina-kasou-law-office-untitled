"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import ScrollFadeSection from "@/components/common/ScrollFadeSection";
import SectionHeading from "@/components/common/SectionHeading";
import { PRACTICE_AREA_SLUGS } from "@/types";

const practiceIcons: Record<string, React.ReactNode> = {
  divorce: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  inheritance: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  labor: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  corporate: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  traffic: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  "real-estate": (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
};

export default function PracticeCardsSection() {
  const t = useTranslations("practiceAreas");

  return (
    <section className="py-24 md:py-32 bg-[#F7F7F5]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title={t("sectionTitle")}
          subtitle={t("sectionSubtitle")}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRACTICE_AREA_SLUGS.map((slug, i) => (
            <ScrollFadeSection key={slug} delay={i * 0.1}>
              <Link href={`/practice-areas/${slug}`}>
                <div className="bg-white p-8 rounded-sm border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 group cursor-pointer h-full">
                  <div className="text-gold mb-4">
                    {practiceIcons[slug]}
                  </div>
                  <h3 className="font-serif-jp text-xl font-bold text-navy-dark mb-3 group-hover:text-gold-cta transition-colors">
                    {t(`categories.${slug}.name`)}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {t(`categories.${slug}.summary`)}
                  </p>
                </div>
              </Link>
            </ScrollFadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}
