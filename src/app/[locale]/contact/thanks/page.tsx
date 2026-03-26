import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import PhoneLink from "@/components/common/PhoneLink";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "metadata.thanks",
  });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function ThanksPage({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations("thanks");

  return (
    <div className="pt-20">
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          {/* Check icon */}
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="font-serif-jp text-3xl md:text-4xl font-bold text-navy-dark mb-6">
            {t("title")}
          </h1>

          <p className="text-base text-gray-600 leading-relaxed mb-8">
            {t("message")}
          </p>

          {/* Urgent call */}
          <div className="p-6 bg-[#F7F7F5] rounded-sm mb-8">
            <p className="text-base text-navy-dark font-semibold mb-2">
              {t("urgent")}
            </p>
            <PhoneLink
              className="text-xl font-bold text-gold-cta hover:text-[#A67E2E] transition-colors"
              showIcon
            />
          </div>

          {/* Change/Cancel info */}
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-sm mb-8">
            <p className="text-base text-gray-700 leading-relaxed">
              {t("changeCancel")}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {t("email")}: {t("emailAddress")}
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-navy-dark hover:text-gold-cta transition-colors font-semibold"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t("backToTop")}
          </Link>
        </div>
      </section>
    </div>
  );
}
