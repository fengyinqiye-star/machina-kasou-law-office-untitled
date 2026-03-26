"use client";

import { useTranslations } from "next-intl";
import ScrollFadeSection from "@/components/common/ScrollFadeSection";
import SectionHeading from "@/components/common/SectionHeading";

const icons = [
  // Free consultation
  <svg key="free" className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>,
  // Experience
  <svg key="exp" className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  // Bilingual
  <svg key="lang" className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
  </svg>,
];

export default function StrengthsSection() {
  const t = useTranslations("strengths");

  const items = [
    { title: t("items.0.title"), description: t("items.0.description") },
    { title: t("items.1.title"), description: t("items.1.description") },
    { title: t("items.2.title"), description: t("items.2.description") },
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title={t("sectionTitle")} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {items.map((item, i) => (
            <ScrollFadeSection key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-gold mx-auto mb-6 flex justify-center">
                  {icons[i]}
                </div>
                <h3 className="font-serif-jp text-xl font-bold text-navy-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollFadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}
