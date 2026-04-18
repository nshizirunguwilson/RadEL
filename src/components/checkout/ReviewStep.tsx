"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui";
import { useCheckoutStore, SHIPPING_COST_USD } from "@/stores/checkout";
import {
  selectDiscountUSD,
  selectSubtotalUSD,
  useCartStore,
} from "@/stores/cart";
import { useUiStore } from "@/stores/ui";
import { formatPrice } from "@/lib/currency";

function makeOrderNumber(): string {
  const n = Math.floor(Math.random() * 900000 + 100000);
  return `RAD-${n}`;
}

export function ReviewStep() {
  const t = useTranslations("checkout");
  const router = useRouter();
  const address = useCheckoutStore((s) => s.address);
  const method = useCheckoutStore((s) => s.shippingMethod);
  const payment = useCheckoutStore((s) => s.payment);
  const setStep = useCheckoutStore((s) => s.setStep);
  const resetCheckout = useCheckoutStore((s) => s.reset);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(selectSubtotalUSD);
  const discount = useCartStore(selectDiscountUSD);
  const clear = useCartStore((s) => s.clear);
  const currency = useUiStore((s) => s.currency);
  const [placing, setPlacing] = useState(false);

  const shippingCost = SHIPPING_COST_USD[method];
  const taxable = Math.max(0, subtotal - discount);
  const tax = Math.round(taxable * 0.075 * 100) / 100;
  const total = Math.round((taxable + shippingCost + tax) * 100) / 100;
  const cardTail = payment.cardNumber.replace(/\s/g, "").slice(-4);

  function place() {
    if (placing) return;
    setPlacing(true);
    const orderNumber = makeOrderNumber();
    const email = encodeURIComponent(address.email || "");
    window.setTimeout(() => {
      clear();
      resetCheckout();
      router.push(`/checkout/success?order=${orderNumber}&email=${email}`);
    }, 700);
  }

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl text-ink-strong">{t("review.title")}</h2>

      <Section
        title="Address"
        edit={t("review.editAddress")}
        onEdit={() => setStep("address")}
      >
        <p>{address.fullName}</p>
        <p>{address.line1}{address.line2 ? `, ${address.line2}` : ""}</p>
        <p>
          {address.city}{address.region ? `, ${address.region}` : ""} {address.postalCode}
        </p>
        <p>{address.country}</p>
        <p className="text-meta">{address.email} · {address.phone}</p>
      </Section>

      <Section
        title="Shipping"
        edit={t("review.editShipping")}
        onEdit={() => setStep("shipping")}
      >
        <p>
          {t(`shipping.options.${method}.label`)} · {t(`shipping.options.${method}.eta`)}
        </p>
      </Section>

      <Section
        title="Payment"
        edit={t("review.editPayment")}
        onEdit={() => setStep("payment")}
      >
        <p>
          Card ending in <span className="tabular-nums">{cardTail || "····"}</span> ·{" "}
          <span className="tabular-nums">{payment.expiry || "MM/YY"}</span>
        </p>
        <p className="text-meta">{payment.nameOnCard}</p>
      </Section>

      <section className="border border-divider rounded-sm">
        <h3 className="px-5 py-4 border-b border-divider text-xs uppercase tracking-[0.12em] text-meta">
          Your order
        </h3>
        <ul className="divide-y divide-divider">
          {items.map((item) => (
            <li key={item.variantId} className="px-5 py-4 flex gap-4 text-sm">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-surface">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-ink-strong truncate">{item.name}</p>
                <p className="text-xs text-meta">
                  {item.variantLabel} · Qty {item.quantity}
                </p>
              </div>
              <p className="text-ink-strong tabular-nums shrink-0">
                {formatPrice(item.priceUSD * item.quantity, currency)}
              </p>
            </li>
          ))}
        </ul>
        <div className="px-5 py-4 border-t border-divider space-y-2 text-sm">
          <Row label="Subtotal" value={formatPrice(subtotal, currency)} />
          {discount > 0 ? (
            <Row label="Discount" value={`- ${formatPrice(discount, currency)}`} />
          ) : null}
          <Row
            label="Shipping"
            value={
              shippingCost === 0 ? "Complimentary" : formatPrice(shippingCost, currency)
            }
          />
          <Row label="Taxes (est.)" value={formatPrice(tax, currency)} />
          <div className="pt-3 border-t border-divider flex items-baseline justify-between font-display text-lg">
            <span className="text-ink-strong">Total</span>
            <span className="text-ink-strong tabular-nums">
              {formatPrice(total, currency)}
            </span>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep("payment")}
          className="text-sm text-meta hover:text-ink-strong underline underline-offset-4"
        >
          Back
        </button>
        <Button onClick={place} disabled={placing || items.length === 0} size="md">
          {placing ? "Placing…" : t("review.place")}
        </Button>
      </div>
    </div>
  );
}

function Section({
  title,
  edit,
  onEdit,
  children,
}: {
  title: string;
  edit: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-divider rounded-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs uppercase tracking-[0.12em] text-meta">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs text-meta hover:text-ink-strong underline underline-offset-4"
        >
          {edit}
        </button>
      </div>
      <div className="text-sm text-ink space-y-0.5">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-meta">{label}</span>
      <span className="text-ink-strong tabular-nums">{value}</span>
    </div>
  );
}
