"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import PhoneLink from "@/components/common/PhoneLink";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: t("practiceAreas"), href: "/practice-areas" },
    { label: t("lawyers"), href: "/lawyers" },
    { label: t("office"), href: "/office" },
    { label: t("fees"), href: "/fees" },
    { label: t("contact"), href: "/contact" },
  ];

  const switchLocale = () => {
    const newLocale = locale === "ja" ? "en" : "ja";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-navy-dark/95 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0">
            <span className="font-serif-en text-xl md:text-2xl font-bold text-white tracking-wider">
              {tCommon("officeNameEn")}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/80 hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <PhoneLink
              className="text-sm text-white/80 hover:text-white transition-colors"
              showIcon
            />
            <button
              onClick={switchLocale}
              className="text-sm text-white/80 hover:text-white border border-white/30 px-3 py-1.5 rounded-sm transition-colors"
            >
              {locale === "ja" ? "EN" : "JP"}
            </button>
            <Link
              href="/contact"
              className="bg-gold-cta text-navy-dark px-5 py-2.5 text-sm font-semibold rounded-sm hover:bg-[#A67E2E] transition-colors"
            >
              {tCommon("freeConsultation")}
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={switchLocale}
              className="text-sm text-white/80 border border-white/30 px-2 py-1 rounded-sm"
            >
              {locale === "ja" ? "EN" : "JP"}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="text-white p-2"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
