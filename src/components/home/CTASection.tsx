"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import ScrollFadeSection from "@/components/common/ScrollFadeSection";
import PhoneLink from "@/components/common/PhoneLink";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="py-24 md:py-32 bg-navy">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <ScrollFadeSection>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-8" />
          <h2 className="font-serif-jp text-3xl md:text-4xl font-bold text-white mb-6">
            {t("title")}
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-10 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-gold-cta text-navy-dark font-semibold rounded-sm hover:bg-[#A67E2E] transition-colors duration-200 min-h-[44px] text-base"
            >
              {t("button")}
            </Link>
          </div>
          <p className="mt-6 text-white/50 text-sm">
            {t("orCall")}{" "}
            <PhoneLink className="text-gold hover:text-gold-light transition-colors" />
          </p>
        </ScrollFadeSection>
      </div>
    </section>
  );
}
