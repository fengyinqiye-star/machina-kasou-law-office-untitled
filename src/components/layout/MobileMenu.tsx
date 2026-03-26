"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import PhoneLink from "@/components/common/PhoneLink";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { label: string; href: string }[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  navItems,
}: MobileMenuProps) {
  const tCommon = useTranslations("common");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-navy-dark"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-6 h-20">
              <span className="font-serif-en text-xl font-bold text-white">
                {tCommon("officeNameEn")}
              </span>
              <button
                onClick={onClose}
                className="text-white p-2"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 flex flex-col items-center justify-center gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="text-2xl text-white font-serif-jp hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-6 pb-8 flex flex-col items-center gap-4">
              <PhoneLink className="text-white text-lg" showIcon />
              <p className="text-white/50 text-sm">{tCommon("businessHours")}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
