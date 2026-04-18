"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FiLock } from "react-icons/fi";

import { Button, Input, Label } from "@/components/ui";
import { useCheckoutStore, type CheckoutPayment } from "@/stores/checkout";

function formatCard(v: string): string {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function formatExpiry(v: string): string {
  const digits = v.replace(/\D/g, "").slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function PaymentStep() {
  const t = useTranslations("checkout.payment");
  const payment = useCheckoutStore((s) => s.payment);
  const setPayment = useCheckoutStore((s) => s.setPayment);
  const setStep = useCheckoutStore((s) => s.setStep);
  const [form, setForm] = useState<CheckoutPayment>(payment);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutPayment, string>>>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (form.cardNumber.replace(/\s/g, "").length < 13) next.cardNumber = "Invalid";
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) next.expiry = "MM/YY";
    if (!/^\d{3,4}$/.test(form.cvc)) next.cvc = "3–4 digits";
    if (!form.nameOnCard.trim()) next.nameOnCard = "Required";
    setErrors(next);
    if (Object.keys(next).length) return;
    setPayment(form);
    setStep("review");
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <h2 className="font-display text-2xl text-ink-strong">{t("title")}</h2>

      <div className="inline-flex items-center gap-2 rounded-sm bg-surface px-3 py-2 text-xs text-meta">
        <FiLock aria-hidden className="h-3.5 w-3.5" />
        Demo only — no real payment is processed.
      </div>

      <div className="grid gap-4">
        <Field label={t("cardNumber")} error={errors.cardNumber}>
          <Input
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="4242 4242 4242 4242"
            value={form.cardNumber}
            onChange={(e) =>
              setForm((s) => ({ ...s, cardNumber: formatCard(e.target.value) }))
            }
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label={t("expiry")} error={errors.expiry}>
            <Input
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              value={form.expiry}
              onChange={(e) =>
                setForm((s) => ({ ...s, expiry: formatExpiry(e.target.value) }))
              }
            />
          </Field>
          <Field label={t("cvc")} error={errors.cvc}>
            <Input
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="123"
              maxLength={4}
              value={form.cvc}
              onChange={(e) =>
                setForm((s) => ({
                  ...s,
                  cvc: e.target.value.replace(/\D/g, "").slice(0, 4),
                }))
              }
            />
          </Field>
        </div>
        <Field label={t("nameOnCard")} error={errors.nameOnCard}>
          <Input
            autoComplete="cc-name"
            value={form.nameOnCard}
            onChange={(e) => setForm((s) => ({ ...s, nameOnCard: e.target.value }))}
          />
        </Field>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep("shipping")}
          className="text-sm text-meta hover:text-ink-strong underline underline-offset-4"
        >
          Back
        </button>
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
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="text-xs uppercase tracking-[0.12em] text-meta">
        {label}
      </Label>
      <div className="mt-1.5">{children}</div>
      {error ? <p className="mt-1 text-xs text-sale">{error}</p> : null}
    </div>
  );
}
