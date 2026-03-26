import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { PRACTICE_AREA_SLUGS, type PracticeAreaSlugType } from "@/types";
import { Link } from "@/i18n/routing";
import Breadcrumb from "@/components/common/Breadcrumb";
import ScrollFadeSection from "@/components/common/ScrollFadeSection";
import CTASection from "@/components/home/CTASection";

type Props = {
  params: { locale: string; slug: string };
};

export function generateStaticParams() {
  const locales = ["ja", "en"];
  return locales.flatMap((locale) =>
    PRACTICE_AREA_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props) {
  if (!PRACTICE_AREA_SLUGS.includes(params.slug as PracticeAreaSlugType)) {
    return {};
  }
  const t = await getTranslations({
    locale: params.locale,
    namespace: "practiceAreas",
  });
  const tMeta = await getTranslations({
    locale: params.locale,
    namespace: "metadata.practiceAreas",
  });
  const name = t(`categories.${params.slug}.name`);
  return {
    title: `${name} | ${tMeta("title")}`,
    description: t(`categories.${params.slug}.summary`),
    alternates: {
      canonical: `/${params.locale}/practice-areas/${params.slug}/`,
      languages: {
        ja: `/ja/practice-areas/${params.slug}/`,
        en: `/en/practice-areas/${params.slug}/`,
      },
    },
  };
}

export default function PracticeAreaDetailPage({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  const slug = params.slug as PracticeAreaSlugType;
  if (!PRACTICE_AREA_SLUGS.includes(slug)) {
    notFound();
  }

  const t = useTranslations("practiceAreas");
  const tNav = useTranslations("nav");

  const name = t(`categories.${slug}.name`);
  const description = t(`categories.${slug}.description`);

  // Get cases and steps arrays
  const cases: string[] = [];
  for (let i = 0; i < 5; i++) {
    try {
      cases.push(t(`categories.${slug}.cases.${i}`));
    } catch {
      break;
    }
  }

  const steps: { title: string; description: string }[] = [];
  for (let i = 0; i < 5; i++) {
    try {
      steps.push({
        title: t(`categories.${slug}.steps.${i}.title`),
        description: t(`categories.${slug}.steps.${i}.description`),
      });
    } catch {
      break;
    }
  }

  return (
    <>
      <div className="pt-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Breadcrumb
            items={[
              { label: tNav("practiceAreas"), href: "/practice-areas" },
              { label: name },
            ]}
          />
        </div>
      </div>

      {/* Hero banner */}
      <section className="bg-navy-dark py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
          <h1 className="font-serif-jp text-3xl md:text-5xl font-bold text-white">
            {name}
          </h1>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollFadeSection>
            <p className="text-base leading-loose text-gray-700">
              {description}
            </p>
          </ScrollFadeSection>
        </div>
      </section>

      {/* Cases */}
      <section className="py-16 md:py-24 bg-[#F7F7F5]">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollFadeSection>
            <h2 className="font-serif-jp text-2xl md:text-3xl font-bold text-navy-dark mb-8 text-center">
              {params.locale === "ja"
                ? "よくあるご相談事例"
                : "Common Consultation Cases"}
            </h2>
            <ul className="space-y-4">
              {cases.map((c, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-white p-4 rounded-sm border border-gray-100"
                >
                  <span className="text-gold font-bold mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base text-gray-700 leading-relaxed">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollFadeSection>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollFadeSection>
            <h2 className="font-serif-jp text-2xl md:text-3xl font-bold text-navy-dark mb-12 text-center">
              {params.locale === "ja"
                ? "解決までの流れ"
                : "Steps to Resolution"}
            </h2>
            <div className="space-y-8">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-navy-dark text-white flex items-center justify-center font-bold text-lg">
                    {i + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-serif-jp text-lg font-bold text-navy-dark mb-2">
                      {step.title}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollFadeSection>
        </div>
      </section>

      {/* Fee link */}
      <section className="py-12 bg-[#F7F7F5]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link
            href="/fees"
            className="inline-flex items-center gap-2 text-navy-dark hover:text-gold-cta transition-colors font-semibold"
          >
            {t("feeLinkText")}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <CTASection />

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            name: `Kasou Law Office - ${name}`,
            description: description,
            url: `https://kasou-law.vercel.app/${params.locale}/practice-areas/${slug}`,
            provider: {
              "@type": "LegalService",
              name: "Kasou Law Office",
            },
          }),
        }}
      />
    </>
  );
}
