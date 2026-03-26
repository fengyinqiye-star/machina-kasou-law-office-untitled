import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/common/Breadcrumb";
import ScrollFadeSection from "@/components/common/ScrollFadeSection";
import SectionHeading from "@/components/common/SectionHeading";
import CTASection from "@/components/home/CTASection";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "metadata.lawyers",
  });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${params.locale}/lawyers/`,
      languages: { ja: "/ja/lawyers/", en: "/en/lawyers/" },
    },
  };
}

export default function LawyersPage({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations("lawyers");
  const tNav = useTranslations("nav");
  const locale = params.locale;

  const lawyers = ["ichiro", "hanako"] as const;

  return (
    <>
      <div className="pt-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Breadcrumb items={[{ label: tNav("lawyers") }]} />
        </div>
      </div>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            title={t("sectionTitle")}
            subtitle={t("sectionSubtitle")}
          />
          <div className="space-y-20">
            {lawyers.map((key, i) => (
              <ScrollFadeSection key={key} delay={i * 0.15}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
                  {/* Photo placeholder */}
                  <div className="flex justify-center">
                    <div className="w-48 h-60 bg-gray-100 rounded-sm overflow-hidden flex items-center justify-center">
                      <svg className="w-24 h-24 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="md:col-span-2">
                    <h2 className="font-serif-jp text-2xl md:text-3xl font-bold text-navy-dark">
                      {t(`profiles.${key}.name`)}
                    </h2>
                    {locale === "en" && (
                      <p className="text-sm text-gray-500 mt-1">
                        {t(`profiles.${key}.nameEn`)}
                      </p>
                    )}
                    <p className="text-gold font-semibold mt-1">
                      {t(`profiles.${key}.role`)}
                    </p>

                    <div className="mt-6 space-y-3">
                      <InfoRow
                        label={t("barAssociation")}
                        value={t(`profiles.${key}.barAssociation`)}
                      />
                      <InfoRow
                        label={t("registrationNumber")}
                        value={t(`profiles.${key}.registrationNumber`)}
                      />
                      <InfoRow
                        label={t("experience")}
                        value={`${t(`profiles.${key}.experienceYears`)}${t("years")}`}
                      />
                      <InfoRow
                        label={locale === "ja" ? "学歴" : "Education"}
                        value={t(`profiles.${key}.education`)}
                      />
                      <InfoRow
                        label={t("specialty")}
                        value={t(`profiles.${key}.specialty`)}
                      />
                      <InfoRow
                        label={t("languages")}
                        value={t(`profiles.${key}.languages`)}
                      />
                    </div>

                    <div className="mt-6 p-6 bg-[#F7F7F5] rounded-sm border-l-4 border-gold">
                      <p className="text-base text-gray-700 leading-relaxed italic">
                        &ldquo;{t(`profiles.${key}.message`)}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollFadeSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      {/* Structured data: Attorney */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ichiro Kasou",
              jobTitle: "Managing Partner",
              worksFor: { "@type": "LegalService", name: "Kasou Law Office" },
              knowsLanguage: ["Japanese", "English"],
            },
            {
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hanako Kasou",
              jobTitle: "Attorney",
              worksFor: { "@type": "LegalService", name: "Kasou Law Office" },
              knowsLanguage: ["Japanese", "English"],
            },
          ]),
        }}
      />
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
      <span className="text-sm font-semibold text-navy-dark min-w-[120px]">
        {label}
      </span>
      <span className="text-base text-gray-600">{value}</span>
    </div>
  );
}
