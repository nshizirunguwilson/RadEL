"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { PRODUCTS } from "@/data/products";
import { useWishlistStore } from "@/stores/wishlist";
import { useHasHydrated } from "@/stores/useHasHydrated";
import { useCartStore } from "@/stores/cart";
import { useUiStore } from "@/stores/ui";
import { toast } from "@/stores/toast";
import { formatPrice } from "@/lib/currency";
import { Button } from "@/components/ui";
import { MATERIAL_LABEL } from "@/data/materials";
import Image from "next/image";

export function WishlistClient() {
  const t = useTranslations("wishlist");
  const toastT = useTranslations("toast");
  const hydrated = useHasHydrated();
  const ids = useWishlistStore((s) => s.productIds);
  const remove = useWishlistStore((s) => s.remove);
  const add = useCartStore((s) => s.add);
  const openCart = useUiStore((s) => s.openCartDrawer);
  const currency = useUiStore((s) => s.currency);

  if (!hydrated) {
    return (
      <main id="main" className="container-wide py-16">
        <div className="h-64 animate-pulse rounded-sm bg-surface" />
      </main>
    );
  }

  const items = ids
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

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
          {items.length} piece{items.length === 1 ? "" : "s"} saved.
        </h1>
      </header>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((p) => {
          const variant = p.variants[0];
          const img = p.images[0];
          return (
            <li
              key={p.id}
              className="flex gap-5 p-5 rounded-sm border border-divider"
            >
              <Link
                href={`/product/${p.slug}`}
                className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden rounded-sm bg-surface"
              >
                {img ? (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                ) : null}
              </Link>
              <div className="flex-1 min-w-0 flex flex-col">
                <Link
                  href={`/product/${p.slug}`}
                  className="font-display text-base text-ink-strong hover:underline decoration-accent underline-offset-4"
                >
                  {p.name}
                </Link>
                <p className="mt-1 text-xs text-meta capitalize">{p.category}</p>
                {variant ? (
                  <p className="mt-3 text-sm text-ink-strong tabular-nums">
                    {formatPrice(variant.priceUSD, currency)}
                  </p>
                ) : null}
                <div className="mt-auto pt-4 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      if (!variant || !img) return;
                      add({
                        productId: p.id,
                        variantId: variant.id,
                        slug: p.slug,
                        name: p.name,
                        variantLabel: `${variant.size ? variant.size + " · " : ""}${MATERIAL_LABEL[variant.material]}`,
                        image: img.src,
                        priceUSD: variant.priceUSD,
                        ...(variant.compareAtUSD
                          ? { compareAtUSD: variant.compareAtUSD }
                          : {}),
                        quantity: 1,
                      });
                      toast.success(toastT("addedToCart"), p.name);
                      openCart();
                    }}
                  >
                    {t("moveToCart")}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      remove(p.id);
                      toast.info(toastT("removedFromWishlist"));
                    }}
                  >
                    {t("remove")}
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
