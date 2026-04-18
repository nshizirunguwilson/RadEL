"use client";

import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiStar } from "react-icons/fi";
import { useTranslations } from "next-intl";

import type { Product } from "@/types/product";
import { useUiStore } from "@/stores/ui";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";
import { useHasHydrated } from "@/stores/useHasHydrated";
import { toast } from "@/stores/toast";
import { formatPrice } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

function variantLabel(v: Product["variants"][number]): string {
  const parts: string[] = [];
  if (v.size) parts.push(v.size);
  parts.push(
    v.material
      .replace("gold-", "")
      .replace("-925", " silver")
      .replace("-", " "),
  );
  return parts.join(" · ");
}

export function ProductCard({ product }: { product: Product }) {
  const t = useTranslations("product");
  const toastCopy = useTranslations("toast");
  const currency = useUiStore((s) => s.currency);
  const add = useCartStore((s) => s.add);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const wishIds = useWishlistStore((s) => s.productIds);
  const hydrated = useHasHydrated();
  const saved = hydrated && wishIds.includes(product.id);

  const firstImg = product.images[0];
  const altImg = product.images[1] ?? product.images[0];
  const firstVariant = product.variants[0];
  const hasStock = product.variants.some((v) => v.stock > 0);
  const onSale = firstVariant?.compareAtUSD && firstVariant.compareAtUSD > firstVariant.priceUSD;

  const badges: string[] = [];
  if (product.tags.includes("new")) badges.push(t("new"));
  if (product.tags.includes("bestseller")) badges.push(t("bestseller"));
  if (product.tags.includes("limited")) badges.push(t("limited"));
  if (product.tags.includes("sale")) badges.push(t("sale"));

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (!firstVariant || !firstImg) return;
    add({
      productId: product.id,
      variantId: firstVariant.id,
      slug: product.slug,
      name: product.name,
      variantLabel: variantLabel(firstVariant),
      image: firstImg.src,
      priceUSD: firstVariant.priceUSD,
      ...(firstVariant.compareAtUSD ? { compareAtUSD: firstVariant.compareAtUSD } : {}),
      quantity: 1,
    });
    toast.success(toastCopy("addedToCart"), product.name);
  }

  function handleWish(e: React.MouseEvent) {
    e.preventDefault();
    const added = toggleWish(product.id);
    if (added) toast.success(toastCopy("addedToWishlist"));
    else toast.info(toastCopy("removedFromWishlist"));
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block focus-visible:outline-none"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface">
        {firstImg ? (
          <Image
            src={firstImg.src}
            alt={firstImg.alt}
            fill
            sizes="(min-width:1024px) 24vw, (min-width:640px) 40vw, 90vw"
            className="object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
        ) : null}
        {altImg ? (
          <Image
            src={altImg.src}
            alt={altImg.alt}
            fill
            sizes="(min-width:1024px) 24vw, (min-width:640px) 40vw, 90vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        ) : null}

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {badges.slice(0, 2).map((b) => (
            <span
              key={b}
              className={cn(
                "inline-flex items-center rounded-sm px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em]",
                b === t("sale") ? "bg-sale text-bg" : "bg-bg/90 text-ink-strong border border-divider",
              )}
            >
              {b}
            </span>
          ))}
          {!hasStock ? (
            <span className="inline-flex items-center rounded-sm bg-bg/90 text-ink-strong border border-divider px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em]">
              {t("outOfStock")}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleWish}
          aria-label={saved ? t("removeFromWishlist") : t("addToWishlist")}
          className={cn(
            "absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-bg/90 backdrop-blur",
            "text-ink-strong hover:bg-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          )}
        >
          <FiHeart
            aria-hidden
            className={cn("h-4 w-4", saved ? "fill-sale text-sale" : "")}
          />
        </button>

        {hasStock ? (
          <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <Button onClick={handleAdd} size="sm" variant="primary" className="w-full">
              {t("addToCart")}
            </Button>
          </div>
        ) : null}
      </div>

      <div className="mt-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-base text-ink-strong leading-tight truncate">
              {product.name}
            </p>
            <p className="text-xs text-meta capitalize mt-0.5">{product.category}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm text-ink-strong tabular-nums">
              {firstVariant ? formatPrice(firstVariant.priceUSD, currency) : null}
            </p>
            {onSale && firstVariant?.compareAtUSD ? (
              <p className="text-xs text-meta line-through tabular-nums">
                {formatPrice(firstVariant.compareAtUSD, currency)}
              </p>
            ) : null}
          </div>
        </div>
        <div className="mt-1.5 flex items-center gap-1 text-xs text-meta">
          <FiStar aria-hidden className="h-3 w-3 fill-accent text-accent" />
          <span className="tabular-nums">{product.rating.toFixed(1)}</span>
          <span>·</span>
          <span className="tabular-nums">{product.reviewCount}</span>
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] rounded-sm bg-surface" />
      <div className="mt-3 h-4 w-2/3 rounded-sm bg-surface" />
      <div className="mt-2 h-3 w-1/3 rounded-sm bg-surface" />
    </div>
  );
}
