"use client";

import Image from "next/image";
import Link from "next/link";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { useTranslations } from "next-intl";

import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Button,
} from "@/components/ui";
import { useUiStore } from "@/stores/ui";
import {
  useCartStore,
  selectLineCount,
  selectSubtotalUSD,
  selectShippingUSD,
  selectDiscountUSD,
  selectTotalUSD,
} from "@/stores/cart";
import { formatPrice } from "@/lib/currency";
import { useHasHydrated } from "@/stores/useHasHydrated";

export function CartDrawer() {
  const t = useTranslations("cart");
  const open = useUiStore((s) => s.cartDrawerOpen);
  const close = useUiStore((s) => s.closeCartDrawer);
  const currency = useUiStore((s) => s.currency);
  const hydrated = useHasHydrated();

  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const remove = useCartStore((s) => s.remove);
  const count = useCartStore(selectLineCount);
  const subtotal = useCartStore(selectSubtotalUSD);
  const discount = useCartStore(selectDiscountUSD);
  const shipping = useCartStore(selectShippingUSD);
  const total = useCartStore(selectTotalUSD);

  return (
    <Sheet open={hydrated && open} onOpenChange={(v) => !v && close()}>
      <SheetContent side="right" className="max-w-md">
        <SheetHeader>
          <SheetTitle>{t("drawer.title", { count })}</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <SheetBody className="flex flex-col items-center justify-center text-center">
            <p className="font-display text-2xl text-ink-strong">{t("empty.title")}</p>
            <p className="mt-3 text-sm text-meta max-w-xs">{t("empty.body")}</p>
            <Button asChild className="mt-8">
              <Link href="/shop" onClick={close}>
                {t("empty.cta")}
              </Link>
            </Button>
          </SheetBody>
        ) : (
          <>
            <SheetBody>
              <ul className="divide-y divide-divider">
                {items.map((item) => (
                  <li key={item.variantId} className="flex gap-4 py-5">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-sm bg-surface">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={close}
                            className="font-medium text-ink-strong text-sm leading-tight"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-meta mt-0.5">{item.variantLabel}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(item.variantId)}
                          aria-label={t("remove")}
                          className="text-meta hover:text-ink-strong"
                        >
                          <FiX aria-hidden className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="inline-flex items-center rounded-sm border border-divider">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            aria-label="Decrease"
                            className="h-8 w-8 inline-flex items-center justify-center hover:bg-surface"
                          >
                            <FiMinus aria-hidden className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-3 text-sm tabular-nums">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            aria-label="Increase"
                            className="h-8 w-8 inline-flex items-center justify-center hover:bg-surface"
                          >
                            <FiPlus aria-hidden className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="text-sm text-ink-strong tabular-nums">
                          {formatPrice(item.priceUSD * item.quantity, currency)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </SheetBody>
            <SheetFooter>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-meta">
                  <dt>{t("subtotal")}</dt>
                  <dd className="tabular-nums text-ink">{formatPrice(subtotal, currency)}</dd>
                </div>
                {discount > 0 ? (
                  <div className="flex justify-between text-meta">
                    <dt>Discount</dt>
                    <dd className="tabular-nums text-sale">−{formatPrice(discount, currency)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between text-meta">
                  <dt>{t("shipping")}</dt>
                  <dd className="tabular-nums text-ink">
                    {shipping === 0 ? t("shippingFree") : formatPrice(shipping, currency)}
                  </dd>
                </div>
                <div className="flex justify-between pt-2 border-t border-divider text-ink-strong font-medium">
                  <dt>{t("total")}</dt>
                  <dd className="tabular-nums">{formatPrice(total, currency)}</dd>
                </div>
              </dl>
              <div className="mt-4 flex flex-col gap-2">
                <Button asChild size="lg">
                  <Link href="/checkout" onClick={close}>
                    {t("checkout")}
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/cart" onClick={close}>
                    {t("viewFull")}
                  </Link>
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
