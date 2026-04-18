"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button, Input, Label } from "@/components/ui";
import { useCheckoutStore, type CheckoutAddress } from "@/stores/checkout";

export function AddressStep() {
  const t = useTranslations("checkout.address");
  const address = useCheckoutStore((s) => s.address);
  const setAddress = useCheckoutStore((s) => s.setAddress);
  const setStep = useCheckoutStore((s) => s.setStep);
  const [form, setForm] = useState<CheckoutAddress>(address);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutAddress, string>>>({});

  function field<K extends keyof CheckoutAddress>(key: K) {
    return {
      value: form[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((s) => ({ ...s, [key]: e.target.value })),
    };
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.fullName.trim()) next.fullName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Required";
    if (!form.phone.trim()) next.phone = "Required";
    if (!form.line1.trim()) next.line1 = "Required";
    if (!form.city.trim()) next.city = "Required";
    if (!form.postalCode.trim()) next.postalCode = "Required";
    if (!form.country.trim()) next.country = "Required";
    setErrors(next);
    if (Object.keys(next).length) return;
    setAddress(form);
    setStep("shipping");
  }

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      <h2 className="font-display text-2xl text-ink-strong">{t("title")}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label={t("fullName")} error={errors.fullName}>
          <Input {...field("fullName")} autoComplete="name" />
        </Field>
        <Field label={t("email")} error={errors.email}>
          <Input type="email" {...field("email")} autoComplete="email" />
        </Field>
        <Field label={t("phone")} error={errors.phone}>
          <Input type="tel" {...field("phone")} autoComplete="tel" />
        </Field>
        <Field label={t("country")} error={errors.country}>
          <Input {...field("country")} autoComplete="country-name" />
        </Field>
        <Field label={t("line1")} error={errors.line1} className="md:col-span-2">
          <Input {...field("line1")} autoComplete="address-line1" />
        </Field>
        <Field label={t("line2")} className="md:col-span-2">
          <Input {...field("line2")} autoComplete="address-line2" />
        </Field>
        <Field label={t("city")} error={errors.city}>
          <Input {...field("city")} autoComplete="address-level2" />
        </Field>
        <Field label={t("region")}>
          <Input {...field("region")} autoComplete="address-level1" />
        </Field>
        <Field label={t("postalCode")} error={errors.postalCode}>
          <Input {...field("postalCode")} autoComplete="postal-code" />
        </Field>
      </div>
      <div className="flex justify-end">
        <Button type="submit" size="md">
          {t("continue")}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label className="text-xs uppercase tracking-[0.12em] text-meta">
        {label}
      </Label>
      <div className="mt-1.5">{children}</div>
      {error ? <p className="mt-1 text-xs text-sale">{error}</p> : null}
    </div>
  );
}
