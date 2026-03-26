"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import PhoneLink from "@/components/common/PhoneLink";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const navLinks = [
    { label: tNav("home"), href: "/" },
    { label: tNav("practiceAreas"), href: "/practice-areas" },
    { label: tNav("lawyers"), href: "/lawyers" },
    { label: tNav("office"), href: "/office" },
    { label: tNav("fees"), href: "/fees" },
    { label: tNav("contact"), href: "/contact" },
  ];

  const legalLinks = [
    { label: tNav("privacyPolicy"), href: "/privacy-policy" },
    { label: tNav("disclaimer"), href: "/disclaimer" },
  ];

  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Office Info */}
          <div>
            <h3 className="font-serif-en text-xl font-bold mb-4 text-gold">
              {tCommon("officeNameEn")}
            </h3>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              {t("description")}
            </p>
            <div className="space-y-2 text-sm text-white/80">
              <p>{tCommon("address")}</p>
              <p>
                <PhoneLink className="text-white/80 hover:text-gold transition-colors" showIcon />
              </p>
              <p>{tCommon("businessHours")}</p>
              <p>{tCommon("closedDays")}</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-gold mb-4 uppercase tracking-wider">
              {t("navigation")}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-gold mb-4 uppercase tracking-wider">
              {t("legal")}
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/40">
            &copy; {tCommon("copyright")}
          </p>
          <p className="text-sm text-white/40 mt-1">
            {locale === "en"
              ? "Phone: +81-3-1234-5678"
              : "TEL: 03-1234-5678"}
          </p>
        </div>
      </div>
    </footer>
  );
}
