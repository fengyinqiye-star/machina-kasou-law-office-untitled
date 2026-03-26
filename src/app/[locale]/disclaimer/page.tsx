import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/common/Breadcrumb";
import ScrollFadeSection from "@/components/common/ScrollFadeSection";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "metadata.disclaimer",
  });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${params.locale}/disclaimer/`,
      languages: { ja: "/ja/disclaimer/", en: "/en/disclaimer/" },
    },
  };
}

export default function DisclaimerPage({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations("disclaimer");
  const tNav = useTranslations("nav");

  const sections = [];
  for (let i = 0; i < 5; i++) {
    try {
      sections.push({
        title: t(`sections.${i}.title`),
        content: t(`sections.${i}.content`),
      });
    } catch {
      break;
    }
  }

  return (
    <>
      <div className="pt-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Breadcrumb items={[{ label: tNav("disclaimer") }]} />
        </div>
      </div>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-serif-jp text-3xl md:text-4xl font-bold text-navy-dark mb-8 text-center">
            {t("title")}
          </h1>

          <ScrollFadeSection>
            <div className="space-y-10">
              {sections.map((section, i) => (
                <div key={i}>
                  <h2 className="font-serif-jp text-xl font-bold text-navy-dark mb-3">
                    {section.title}
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </ScrollFadeSection>
        </div>
      </section>
    </>
  );
}
