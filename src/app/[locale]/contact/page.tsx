import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/common/Breadcrumb";
import SectionHeading from "@/components/common/SectionHeading";
import ConsultationForm from "@/components/contact/ConsultationForm";
import PhoneLink from "@/components/common/PhoneLink";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "metadata.contact",
  });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${params.locale}/contact/`,
      languages: { ja: "/ja/contact/", en: "/en/contact/" },
    },
  };
}

export default function ContactPage({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");

  return (
    <>
      <div className="pt-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Breadcrumb items={[{ label: tNav("contact") }]} />
        </div>
      </div>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            title={t("sectionTitle")}
            subtitle={t("sectionSubtitle")}
          />

          <div className="mb-12 text-center">
            <p className="text-base text-gray-600">
              {tCommon("callUs")}:{" "}
              <PhoneLink className="font-semibold text-navy-dark hover:text-gold-cta transition-colors" showIcon />
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {tCommon("businessHours")}
            </p>
          </div>

          <ConsultationForm />
        </div>
      </section>
    </>
  );
}
