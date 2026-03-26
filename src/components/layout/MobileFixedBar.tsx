"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

export default function MobileFixedBar() {
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isEn = locale === "en";
  const tel = isEn ? "tel:+81312345678" : "tel:0312345678";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-navy-dark border-t border-navy-light flex h-16">
      <a
        href={tel}
        className="flex-1 flex items-center justify-center text-white text-sm font-semibold gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        {tCommon("callUs")}
      </a>
      <div className="w-px bg-navy-light" />
      <Link
        href="/contact"
        className="flex-1 flex items-center justify-center bg-gold-cta text-navy-dark text-sm font-semibold gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        {tCommon("freeConsultation")}
      </Link>
    </div>
  );
}
