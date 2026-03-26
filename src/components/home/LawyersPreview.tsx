"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import ScrollFadeSection from "@/components/common/ScrollFadeSection";
import SectionHeading from "@/components/common/SectionHeading";

export default function LawyersPreview() {
  const t = useTranslations("lawyers");
  const tCommon = useTranslations("common");

  const lawyers = [
    { key: "ichiro" },
    { key: "hanako" },
  ] as const;

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title={t("sectionTitle")}
          subtitle={t("sectionSubtitle")}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {lawyers.map(({ key }, i) => (
            <ScrollFadeSection key={key} delay={i * 0.15}>
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                  <svg className="w-20 h-20 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <h3 className="font-serif-jp text-2xl font-bold text-navy-dark">
                  {t(`profiles.${key}.name`)}
                </h3>
                <p className="text-gold text-sm mt-1 mb-3">
                  {t(`profiles.${key}.role`)}
                </p>
                <p className="text-base text-gray-600 leading-relaxed max-w-md mx-auto">
                  {t(`profiles.${key}.message`)}
                </p>
              </div>
            </ScrollFadeSection>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/lawyers"
            className="inline-flex items-center text-navy-dark hover:text-gold-cta transition-colors font-semibold gap-2"
          >
            {tCommon("learnMore")}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
