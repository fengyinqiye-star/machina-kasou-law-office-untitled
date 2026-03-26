import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import StrengthsSection from "@/components/home/StrengthsSection";
import PracticeCardsSection from "@/components/home/PracticeCardsSection";
import LawyersPreview from "@/components/home/LawyersPreview";
import AccessPreview from "@/components/home/AccessPreview";
import CTASection from "@/components/home/CTASection";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "metadata.home",
  });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${params.locale}/`,
      languages: { ja: "/ja/", en: "/en/" },
    },
  };
}

export default function HomePage({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  return (
    <>
      <HeroSection />
      <StrengthsSection />
      <PracticeCardsSection />
      <LawyersPreview />
      <AccessPreview />
      <CTASection />

      {/* Structured data: LegalService */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            name: "Kasou Law Office / カソウ法律事務所",
            url: "https://kasou-law.vercel.app",
            telephone: "+81-3-1234-5678",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Marunouchi Building 10F, 1-1-1 Marunouchi",
              addressLocality: "Chiyoda-ku",
              addressRegion: "Tokyo",
              postalCode: "100-0005",
              addressCountry: "JP",
            },
            openingHours: "Mo-Fr 09:00-18:00",
            priceRange: "$$",
            areaServed: "Tokyo, Japan",
            knowsLanguage: ["Japanese", "English"],
          }),
        }}
      />
    </>
  );
}
