"use client";

import { useLocale } from "next-intl";

interface PhoneLinkProps {
  className?: string;
  showIcon?: boolean;
}

export default function PhoneLink({
  className = "",
  showIcon = false,
}: PhoneLinkProps) {
  const locale = useLocale();
  const isEn = locale === "en";
  const phone = isEn ? "+81-3-1234-5678" : "03-1234-5678";
  const tel = isEn ? "tel:+81312345678" : "tel:0312345678";

  return (
    <a href={tel} className={`inline-flex items-center gap-2 ${className}`}>
      {showIcon && (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      )}
      {phone}
    </a>
  );
}
