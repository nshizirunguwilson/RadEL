"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { useCheckoutStore } from "@/stores/checkout";
import { useCartStore } from "@/stores/cart";
import { useHasHydrated } from "@/stores/useHasHydrated";
import { Button } from "@/components/ui";

import { AddressStep } from "./AddressStep";
import { ShippingStep } from "./ShippingStep";
import { PaymentStep } from "./PaymentStep";
import { ReviewStep } from "./ReviewStep";
import { CheckoutSteps } from "./CheckoutSteps";

export function CheckoutClient() {
  const t = useTranslations("checkout");
  const cartT = useTranslations("cart");
  const step = useCheckoutStore((s) => s.step);
  const items = useCartStore((s) => s.items);
  const hydrated = useHasHydrated();

  if (!hydrated) {
    return (
      <main id="main" className="container-editorial py-16">
        <div className="h-64 animate-pulse rounded-sm bg-surface" />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main id="main" className="container-editorial py-24 text-center">
        <p className="eyebrow">{t("title")}</p>
        <h1 className="mt-4 font-display text-3xl md:text-4xl text-ink-strong">
          {cartT("empty.title")}
        </h1>
        <Link href="/shop" className="mt-8 inline-block">
          <Button size="md">{cartT("empty.cta")}</Button>
        </Link>
      </main>
    );
  }

  return (
    <main id="main" className="container-editorial py-12 md:py-16">
      <header className="mb-10">
        <p className="eyebrow">{t("title")}</p>
        <h1 className="mt-3 font-display text-3xl md:text-4xl text-ink-strong">
          Almost there.
        </h1>
        <p className="mt-3 max-w-md text-sm text-meta">{t("demoBanner")}</p>
      </header>

      <div className="mb-10">
        <CheckoutSteps current={step} />
      </div>

      <div className="max-w-2xl">
        {step === "address" ? <AddressStep /> : null}
        {step === "shipping" ? <ShippingStep /> : null}
        {step === "payment" ? <PaymentStep /> : null}
        {step === "review" ? <ReviewStep /> : null}
      </div>
    </main>
  );
}
