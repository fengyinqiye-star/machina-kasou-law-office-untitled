import { Link } from "@/i18n/routing";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
}: CTAButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-sm transition-colors duration-200 min-h-[44px]";

  const variantClasses =
    variant === "primary"
      ? "bg-gold-cta text-navy-dark hover:bg-[#A67E2E]"
      : "border border-white text-white hover:bg-white/10";

  return (
    <Link href={href} className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </Link>
  );
}
