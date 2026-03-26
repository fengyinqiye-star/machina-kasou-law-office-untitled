"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const t = useTranslations("breadcrumb");

  const allItems = [{ label: t("home"), href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
        {allItems.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-gold-cta transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-navy-dark font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
