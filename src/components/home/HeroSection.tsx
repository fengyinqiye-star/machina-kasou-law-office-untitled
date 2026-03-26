"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

export default function HeroSection() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isEn = locale === "en";
  const tel = isEn ? "tel:+81312345678" : "tel:0312345678";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-dark">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-dark" />
      {/* Decorative gold line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-block text-gold text-sm md:text-base tracking-[0.3em] uppercase font-serif-en">
            {tCommon("officeNameEn")}
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-serif-jp whitespace-pre-line"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {t("title")}
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-gold-cta text-navy-dark font-semibold rounded-sm hover:bg-[#A67E2E] transition-colors duration-200 min-h-[44px] text-base"
          >
            {t("cta")}
          </Link>
          <a
            href={tel}
            className="inline-flex items-center justify-center px-8 py-4 border border-white text-white font-semibold rounded-sm hover:bg-white/10 transition-colors duration-200 min-h-[44px] text-base gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {t("callCta")}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/30 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
