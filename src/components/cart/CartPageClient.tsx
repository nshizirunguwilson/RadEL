"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiArrowRight, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useTranslations } from "next-intl";

import { Button, Input } from "@/components/ui";
import {
  selectDiscountUSD,
  selectShippingUSD,
  selectSubtotalUSD,
  selectTotalUSD,
  useCartStore,
} from "@/stores/cart";
import { useUiStore } from "@/stores/ui";
import { useHasHydrated } from "@/stores/useHasHydrated";
import { useWishlistStore } from "@/stores/wishlist";
import { toast } from "@/stores/toast";
import { formatPrice } from "@/lib/currency";

export function CartPageClient() {
  const t = useTranslations("cart");
  const toastT = useTranslations("toast");
  const hydrated = useHasHydrated();
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.remove);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const applyPromo = useCartStore((s) => s.applyPromo);
  const clearPromo = useCartStore((s) => s.clearPromo);
  const promo = useCartStore((s) => s.promo);
  const subtotal = useCartStore(selectSubtotalUSD);
  const discount = useCartStore(selectDiscountUSD);
  const shipping = useCartStore(selectShippingUSD);
  const total = useCartStore(selectTotalUSD);
  const currency = useUiStore((s) => s.currency);
  const wishIds = useWishlistStore((s) => s.productIds);
  const toggleWish = useWishlistStore((s) => s.toggle);

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);

  function tryApply() {
    setCodeError(null);
    const match = applyPromo(code);
    if (!match) setCodeError(t("promo.invalid"));
    else setCode("");
  }

  if (!hydrated) {
    return (
      <main id="main" className="container-wide py-16">
        <div className="h-64 animate-pulse rounded-sm bg-surface" />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main id="main" className="container-editorial py-24 text-center">
        <p className="eyebrow">{t("title")}</p>
        <h1 className="mt-4 font-display text-3xl md:text-4xl text-ink-strong">
          {t("empty.title")}
        </h1>
        <p className="mt-4 max-w-md mx-auto text-sm text-meta">
          {t("empty.body")}
        </p>
        <Link href="/shop" className="mt-8 inline-block">
          <Button size="md">{t("empty.cta")}</Button>
        </Link>
      </main>
    );
  }

  return (
    <main id="main" className="container-wide py-12 md:py-16">
      <header className="mb-10">
        <p className="eyebrow">{t("title")}</p>
        <h1 className="mt-3 font-display text-3xl md:text-4xl text-ink-strong">
          {t("itemCount", { count: items.reduce((a, i) => a + i.quantity, 0) })}
        </h1>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-divider border-y border-divider">
          {items.map((item) => (
            <li key={item.variantId} className="py-6 flex gap-5">
              <Link
                href={`/product/${item.slug}`}
                className="relative aspect-[4/5] w-24 md:w-32 shrink-0 overflow-hidden rounded-sm bg-surface"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-display text-base text-ink-strong hover:underline decoration-accent underline-offset-4"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-xs text-meta">{item.variantLabel}</p>
                  </div>
                  <p className="text-sm text-ink-strong tabular-nums shrink-0">
                    {formatPrice(item.priceUSD * item.quantity, currency)}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="inline-flex items-center rounded-sm border border-divider">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        updateQuantity(item.variantId, item.quantity - 1)
                      }
                      className="h-9 w-9 inline-flex items-center justify-center text-ink-strong hover:bg-surface"
                    >
                      <FiMinus aria-hidden className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() =>
                        updateQuantity(item.variantId, item.quantity + 1)
                      }
                      className="h-9 w-9 inline-flex items-center justify-center text-ink-strong hover:bg-surface"
                    >
                      <FiPlus aria-hidden className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        if (!wishIds.includes(item.productId)) {
                          toggleWish(item.productId);
                        }
                        remove(item.variantId);
                        toast.success(toastT("addedToWishlist"));
                      }}
                      className="text-meta hover:text-ink-strong underline underline-offset-4"
                    >
                      {t("moveToWishlist")}
                    </button>
                    <button
                      type="button"
                      aria-label={t("remove")}
                      onClick={() => remove(item.variantId)}
                      className="text-meta hover:text-sale inline-flex items-center gap-1"
                    >
                      <FiTrash2 aria-hidden className="h-3.5 w-3.5" />
                      {t("remove")}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="bg-surface/40 border border-divider rounded-sm p-6 h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-xl text-ink-strong">{t("title")}</h2>

          <div className="mt-6 space-y-3 text-sm">
            <Row label={t("subtotal")} value={formatPrice(subtotal, currency)} />
            {discount > 0 ? (
              <Row
                label={`${t("promo.label")} · ${promo?.code ?? ""}`}
                value={`- ${formatPrice(discount, currency)}`}
                tone="sale"
              />
            ) : null}
            <Row
              label={t("shipping")}
              value={
                shipping === 0 ? t("shippingFree") : formatPrice(shipping, currency)
              }
            />
          </div>

          <div className="mt-5 pt-5 border-t border-divider flex items-baseline justify-between">
            <span className="font-display text-lg text-ink-strong">
              {t("total")}
            </span>
            <span className="font-display text-lg text-ink-strong tabular-nums">
              {formatPrice(total, currency)}
            </span>
          </div>

          <div className="mt-6">
            <label
              htmlFor="promo"
              className="text-xs uppercase tracking-[0.12em] text-meta"
            >
              {t("promo.label")}
            </label>
            {promo ? (
              <div className="mt-2 flex items-center justify-between rounded-sm bg-surface px-3 py-2 text-sm">
                <span className="text-ink-strong">
                  {t("promo.applied", { percent: promo.percentOff })}
                </span>
                <button
                  type="button"
                  onClick={clearPromo}
                  className="text-xs text-meta hover:text-ink-strong"
                >
                  {t("remove")}
                </button>
              </div>
            ) : (
              <div className="mt-2 flex gap-2">
                <Input
                  id="promo"
                  placeholder={t("promo.placeholder")}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1"
                />
                <Button type="button" variant="outline" size="sm" onClick={tryApply}>
                  {t("promo.apply")}
                </Button>
              </div>
            )}
            {codeError ? (
              <p className="mt-2 text-xs text-sale">{codeError}</p>
            ) : null}
          </div>

          <Link href="/checkout" className="mt-6 block">
            <Button size="md" className="w-full">
              {t("checkout")}
              <FiArrowRight aria-hidden className="h-4 w-4" />
            </Button>
          </Link>
          <Link
            href="/shop"
            className="mt-4 block text-center text-xs text-meta hover:text-ink-strong underline underline-offset-4"
          >
            {t("continue")}
          </Link>
        </aside>
      </div>
    </main>
  );
}

function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "sale";
}) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-meta">{label}</span>
      <span
        className={
          tone === "sale" ? "text-sale tabular-nums" : "text-ink-strong tabular-nums"
        }
      >
        {value}
      </span>
    </div>
  );
}
