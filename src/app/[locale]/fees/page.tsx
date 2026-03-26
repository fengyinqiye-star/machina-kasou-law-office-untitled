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
    namespace: "metadata.fees",
  });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${params.locale}/fees/`,
      languages: { ja: "/ja/fees/", en: "/en/fees/" },
    },
  };
}

const feeCategories = [
  "divorce",
  "inheritance",
  "labor",
  "corporate",
  "traffic",
  "real-estate",
] as const;

export default function FeesPage({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations("fees");
  const tNav = useTranslations("nav");
  const locale = params.locale;

  return (
    <>
      <div className="pt-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Breadcrumb items={[{ label: tNav("fees") }]} />
        </div>
      </div>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            title={t("sectionTitle")}
            subtitle={t("sectionSubtitle")}
          />

          <ScrollFadeSection>
            {/* Introduction */}
            <div className="mb-16">
              <h2 className="font-serif-jp text-2xl font-bold text-navy-dark mb-4">
                {t("introTitle")}
              </h2>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                {t("introText")}
              </p>
              <div className="p-4 bg-gold/10 border border-gold-light rounded-sm">
                <p className="text-base text-navy-dark font-semibold">
                  {t("freeConsultation")}
                </p>
              </div>
            </div>
          </ScrollFadeSection>

          <ScrollFadeSection>
            {/* Fee Table */}
            <div className="mb-16">
              <h2 className="font-serif-jp text-2xl font-bold text-navy-dark mb-8">
                {locale === "ja"
                  ? "業務分野別の費用目安"
                  : "Fee Guidelines by Practice Area"}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-navy-dark text-white">
                      <th className="py-3 px-4 text-left text-sm font-semibold">
                        {locale === "ja" ? "業務分野" : "Practice Area"}
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold">
                        {t("retainerFee")}
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold">
                        {t("successFee")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeCategories.map((cat, i) => (
                      <tr
                        key={cat}
                        className={`border-b border-gray-200 ${
                          i % 2 === 0 ? "bg-white" : "bg-[#F7F7F5]"
                        }`}
                      >
                        <td className="py-3 px-4 text-sm font-semibold text-navy-dark">
                          {t(`categories.${cat}.name`)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-700">
                          {t(`categories.${cat}.retainer`)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-700">
                          {t(`categories.${cat}.success`)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                {t("taxNote")}
              </p>
            </div>
          </ScrollFadeSection>

          <ScrollFadeSection>
            {/* Disclaimer */}
            <div className="p-6 bg-[#F7F7F5] rounded-sm border-l-4 border-gold mb-8">
              <p className="text-base text-gray-700 leading-relaxed">
                {t("disclaimer")}
              </p>
            </div>
          </ScrollFadeSection>

          <ScrollFadeSection>
            {/* Legal Aid */}
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-sm">
              <p className="text-base text-gray-700 leading-relaxed">
                {t("legalAid")}
              </p>
            </div>
          </ScrollFadeSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
