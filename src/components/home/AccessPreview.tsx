"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import ScrollFadeSection from "@/components/common/ScrollFadeSection";
import SectionHeading from "@/components/common/SectionHeading";
import PhoneLink from "@/components/common/PhoneLink";

export default function AccessPreview() {
  const t = useTranslations("office");
  const tCommon = useTranslations("common");

  return (
    <section className="py-24 md:py-32 bg-navy-dark">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title={t("sectionTitle")}
          subtitle={t("sectionSubtitle")}
          light
        />
        <ScrollFadeSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4 text-white/80">
                <p className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {tCommon("address")}
                </p>
                <p className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {tCommon("businessHours")} / {tCommon("closedDays")}
                </p>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <PhoneLink className="text-white/80 hover:text-white transition-colors" />
                </div>
              </div>
              <Link
                href="/office"
                className="inline-flex items-center text-gold hover:text-gold-light transition-colors font-semibold gap-2"
              >
                {tCommon("learnMore")}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="aspect-video bg-navy rounded-sm overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.828030551774!2d139.76454931525862!3d35.68124038019432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bfbd89f700b%3A0x277c49ba34ed38!2z5Li444OO5YaF44OT44Or!5e0!3m2!1sja!2sjp!4v1710000000000!5m2!1sja!2sjp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kasou Law Office Map"
              />
            </div>
          </div>
        </ScrollFadeSection>
      </div>
    </section>
  );
}
