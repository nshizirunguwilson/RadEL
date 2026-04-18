"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui";
import {
  SHIPPING_COST_USD,
  useCheckoutStore,
  type ShippingMethod,
} from "@/stores/checkout";
import { formatPrice } from "@/lib/currency";
import { useUiStore } from "@/stores/ui";
import { cn } from "@/lib/utils";

const METHODS: ShippingMethod[] = ["standard", "express", "signature"];

export function ShippingStep() {
  const t = useTranslations("checkout.shipping");
  const currency = useUiStore((s) => s.currency);
  const method = useCheckoutStore((s) => s.shippingMethod);
  const setMethod = useCheckoutStore((s) => s.setShippingMethod);
  const setStep = useCheckoutStore((s) => s.setStep);

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl text-ink-strong">{t("title")}</h2>
      <div className="space-y-3">
        {METHODS.map((m) => {
          const cost = SHIPPING_COST_USD[m];
          const selected = method === m;
          return (
            <button
              key={m}
              type="button"
              onClick={() => setMethod(m)}
              className={cn(
                "w-full flex items-start gap-4 p-5 rounded-sm border text-left transition-colors",
                selected
                  ? "border-ink-strong bg-surface/60"
                  : "border-divider hover:border-ink-strong",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 h-4 w-4 rounded-full border-2 shrink-0 flex items-center justify-center",
                  selected ? "border-ink-strong" : "border-divider",
                )}
              >
                {selected ? (
                  <span className="h-2 w-2 rounded-full bg-ink-strong" />
                ) : null}
              </span>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-medium text-ink-strong">
                    {t(`options.${m}.label`)}
                  </p>
                  <p className="text-sm text-ink-strong tabular-nums">
                    {cost === 0 ? t(`options.${m}.price`) : formatPrice(cost, currency)}
                  </p>
                </div>
                <p className="mt-1 text-xs text-meta">
                  {t(`options.${m}.eta`)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep("address")}
          className="text-sm text-meta hover:text-ink-strong underline underline-offset-4"
        >
          Back
        </button>
        <Button onClick={() => setStep("payment")} size="md">
          {t("continue")}
        </Button>
      </div>
    </div>
  );
}
