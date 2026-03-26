"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";

const categories = [
  "divorce",
  "inheritance",
  "labor",
  "corporate",
  "traffic",
  "real-estate",
  "other",
] as const;

function useContactSchema() {
  const t = useTranslations("contact.form.errors");

  return z.object({
    name: z
      .string()
      .min(1, t("nameRequired"))
      .max(50, t("nameMax")),
    phone: z
      .string()
      .min(1, t("phoneRequired"))
      .regex(/^[\d\-+() ]+$/, t("phoneInvalid"))
      .min(10, t("phoneInvalid"))
      .max(20, t("phoneInvalid")),
    email: z
      .string()
      .min(1, t("emailRequired"))
      .email(t("emailInvalid")),
    category: z.enum(categories, {
      errorMap: () => ({ message: t("categoryRequired") }),
    }),
    preferredDate: z
      .string()
      .min(1, t("preferredDateRequired"))
      .max(100),
    message: z
      .string()
      .min(10, t("messageMin"))
      .max(2000, t("messageMax")),
    privacyAgreed: z.literal(true, {
      errorMap: () => ({ message: t("privacyRequired") }),
    }),
  });
}

type FormValues = z.infer<ReturnType<typeof useContactSchema>>;

export default function ConsultationForm() {
  const t = useTranslations("contact.form");
  const tErrors = useTranslations("contact.form.errors");
  const locale = useLocale();
  const router = useRouter();
  const schema = useContactSchema();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const selectedCategory = watch("category");

  const onSubmit = async (data: FormValues) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });

      if (res.status === 429) {
        setServerError(tErrors("tooManyRequests"));
        return;
      }

      if (!res.ok) {
        throw new Error("Failed");
      }

      router.push("/contact/thanks");
    } catch {
      setServerError(tErrors("serverError"));
    }
  };

  const inputClasses =
    "w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-base min-h-[44px] font-sans-jp";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-xl mx-auto"
      noValidate
    >
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-navy-dark mb-1">
          {t("name")} <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder={t("namePlaceholder")}
          className={inputClasses}
          {...register("name")}
        />
        {errors.name && <ErrorMessage message={errors.name.message!} />}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-navy-dark mb-1">
          {t("phone")} <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          placeholder={t("phonePlaceholder")}
          className={inputClasses}
          {...register("phone")}
        />
        {errors.phone && <ErrorMessage message={errors.phone.message!} />}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-navy-dark mb-1">
          {t("email")} <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder={t("emailPlaceholder")}
          className={inputClasses}
          {...register("email")}
        />
        {errors.email && <ErrorMessage message={errors.email.message!} />}
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-navy-dark mb-1">
          {t("category")} <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          className={`${inputClasses} appearance-none bg-white`}
          defaultValue=""
          {...register("category")}
        >
          <option value="" disabled>
            {t("categoryPlaceholder")}
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {t(`categoryOptions.${cat}`)}
            </option>
          ))}
        </select>
        {errors.category && <ErrorMessage message={errors.category.message!} />}
      </div>

      {/* Preferred Date */}
      <div>
        <label htmlFor="preferredDate" className="block text-sm font-medium text-navy-dark mb-1">
          {t("preferredDate")} <span className="text-red-500">*</span>
        </label>
        <input
          id="preferredDate"
          type="text"
          placeholder={t("preferredDatePlaceholder")}
          className={inputClasses}
          {...register("preferredDate")}
        />
        <p className="mt-1 text-sm text-gray-500">{t("preferredDateHelper")}</p>
        {errors.preferredDate && (
          <ErrorMessage message={errors.preferredDate.message!} />
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-navy-dark mb-1">
          {t("message")} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder={
            selectedCategory === "other"
              ? t("messageOtherPlaceholder")
              : t("messagePlaceholder")
          }
          className={`${inputClasses} resize-none`}
          {...register("message")}
        />
        {errors.message && <ErrorMessage message={errors.message.message!} />}
      </div>

      {/* Privacy */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 w-5 h-5 rounded border-gray-300 text-gold-cta focus:ring-gold min-w-[20px]"
            {...register("privacyAgreed")}
          />
          <span className="text-sm text-gray-600">
            <Link
              href="/privacy-policy"
              className="text-gold-cta hover:underline"
              target="_blank"
            >
              {t("privacyLink")}
            </Link>
            {t("privacyAgree")}
          </span>
        </label>
        {errors.privacyAgreed && (
          <ErrorMessage message={errors.privacyAgreed.message!} />
        )}
      </div>

      {serverError && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-gold-cta text-navy-dark font-semibold rounded-sm hover:bg-[#A67E2E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] text-base"
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
      <svg
        className="w-4 h-4 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {message}
    </p>
  );
}
