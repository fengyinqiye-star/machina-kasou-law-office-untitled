import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PRACTICE_AREA_SLUGS } from "@/types";
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
    namespace: "metadata.practiceAreas",
  });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${params.locale}/practice-areas/`,
      languages: { ja: "/ja/practice-areas/", en: "/en/practice-areas/" },
    },
  };
}

export default function PracticeAreasPage({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations("practiceAreas");
  const tNav = useTranslations("nav");

  return (
    <>
      <div className="pt-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Breadcrumb items={[{ label: tNav("practiceAreas") }]} />
        </div>
      </div>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            title={t("sectionTitle")}
            subtitle={t("sectionSubtitle")}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRACTICE_AREA_SLUGS.map((slug, i) => (
              <ScrollFadeSection key={slug} delay={i * 0.1}>
                <Link href={`/practice-areas/${slug}`}>
                  <div className="bg-[#F7F7F5] p-8 rounded-sm border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 group cursor-pointer h-full">
                    <h3 className="font-serif-jp text-xl font-bold text-navy-dark mb-3 group-hover:text-gold-cta transition-colors">
                      {t(`categories.${slug}.name`)}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {t(`categories.${slug}.summary`)}
                    </p>
                  </div>
                </Link>
              </ScrollFadeSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
