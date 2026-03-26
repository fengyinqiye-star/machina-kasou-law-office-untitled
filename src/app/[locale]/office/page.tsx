import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/common/Breadcrumb";
import ScrollFadeSection from "@/components/common/ScrollFadeSection";
import SectionHeading from "@/components/common/SectionHeading";
import GoogleMap from "@/components/common/GoogleMap";
import PhoneLink from "@/components/common/PhoneLink";
import CTASection from "@/components/home/CTASection";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "metadata.office",
  });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${params.locale}/office/`,
      languages: { ja: "/ja/office/", en: "/en/office/" },
    },
  };
}

export default function OfficePage({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations("office");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");

  const infoRows = [
    { label: t("infoTable.name"), value: tCommon("officeName") },
    { label: t("infoTable.representative"), value: t("representativeName") },
    { label: t("infoTable.address"), value: tCommon("address") },
    { label: t("infoTable.businessHours"), value: tCommon("businessHours") },
    { label: t("infoTable.closedDays"), value: tCommon("closedDays") },
    { label: t("infoTable.established"), value: t("established") },
  ];

  return (
    <>
      <div className="pt-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Breadcrumb items={[{ label: tNav("office") }]} />
        </div>
      </div>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            title={t("sectionTitle")}
            subtitle={t("sectionSubtitle")}
          />

          <ScrollFadeSection>
            {/* Info Table */}
            <div className="overflow-x-auto mb-16">
              <table className="w-full border-collapse">
                <tbody>
                  {infoRows.map((row, i) => (
                    <tr key={i} className="border-b border-gray-200">
                      <th className="py-4 px-4 text-left text-sm font-semibold text-navy-dark bg-[#F7F7F5] w-1/3">
                        {row.label}
                      </th>
                      <td className="py-4 px-4 text-base text-gray-700">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-4 text-left text-sm font-semibold text-navy-dark bg-[#F7F7F5]">
                      {t("infoTable.phone")}
                    </th>
                    <td className="py-4 px-4 text-base">
                      <PhoneLink className="text-navy-dark hover:text-gold-cta transition-colors font-semibold" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ScrollFadeSection>

          <ScrollFadeSection>
            {/* Access Info */}
            <div className="mb-12">
              <h2 className="font-serif-jp text-2xl font-bold text-navy-dark mb-6">
                {t("accessTitle")}
              </h2>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                {t("accessDescription")}
              </p>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-sm mb-4">
                <p className="text-base text-amber-800 font-semibold">
                  {t("emergencyNote")}
                </p>
              </div>
              <p className="text-sm text-gray-500">
                {t("afterHoursNote")}
              </p>
            </div>
          </ScrollFadeSection>

          <ScrollFadeSection>
            {/* Map */}
            <div>
              <h2 className="font-serif-jp text-2xl font-bold text-navy-dark mb-6">
                {t("mapTitle")}
              </h2>
              <GoogleMap />
            </div>
          </ScrollFadeSection>
        </div>
      </section>

      <CTASection />

      {/* Structured data: LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://kasou-law.vercel.app",
            name: "Kasou Law Office / カソウ法律事務所",
            telephone: "+81-3-1234-5678",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Marunouchi Building 10F, 1-1-1 Marunouchi",
              addressLocality: "Chiyoda-ku",
              addressRegion: "Tokyo",
              postalCode: "100-0005",
              addressCountry: "JP",
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "18:00",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 35.6812,
              longitude: 139.7671,
            },
          }),
        }}
      />
    </>
  );
}
