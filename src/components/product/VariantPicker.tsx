"use client";

import { useMemo, useState } from "react";
import { FiHeart, FiMinus, FiPlus, FiShare2 } from "react-icons/fi";
import { useTranslations } from "next-intl";

import type { Product, ProductVariant } from "@/types/product";
import { useCartStore } from "@/stores/cart";
import { useUiStore } from "@/stores/ui";
import { useWishlistStore } from "@/stores/wishlist";
import { useHasHydrated } from "@/stores/useHasHydrated";
import { toast } from "@/stores/toast";
import { formatPrice } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { MATERIAL_LABEL, GEMSTONE_LABEL } from "@/data/materials";
import { Button } from "@/components/ui";

function uniqueSizes(variants: ProductVariant[]): string[] {
  return Array.from(new Set(variants.map((v) => v.size).filter((s): s is string => Boolean(s))));
}

function uniqueMaterials(variants: ProductVariant[]): ProductVariant["material"][] {
  return Array.from(new Set(variants.map((v) => v.material)));
}

function findVariant(
  variants: ProductVariant[],
  size: string | null,
  material: ProductVariant["material"] | null,
): ProductVariant | undefined {
  return variants.find((v) =>
    (size === null || v.size === size) && (material === null || v.material === material),
  );
}

export function VariantPicker({ product }: { product: Product }) {
  const t = useTranslations("product");
  const toastCopy = useTranslations("toast");
  const currency = useUiStore((s) => s.currency);
  const openCartDrawer = useUiStore((s) => s.openCartDrawer);
  const add = useCartStore((s) => s.add);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const wishIds = useWishlistStore((s) => s.productIds);
  const hydrated = useHasHydrated();
  const saved = hydrated && wishIds.includes(product.id);

  const sizes = useMemo(() => uniqueSizes(product.variants), [product]);
  const materials = useMemo(() => uniqueMaterials(product.variants), [product]);

  const firstVariant = product.variants[0];
  const initialSize = firstVariant?.size ?? null;
  const initialMaterial = firstVariant?.material ?? null;

  const [size, setSize] = useState<string | null>(initialSize);
  const [material, setMaterial] = useState<ProductVariant["material"] | null>(initialMaterial);
  const [qty, setQty] = useState(1);

  const selected = useMemo(
    () => findVariant(product.variants, size, material) ?? firstVariant,
    [product.variants, size, material, firstVariant],
  );

  if (!selected) return null;

  const onSale = selected.compareAtUSD && selected.compareAtUSD > selected.priceUSD;
  const stockCopy =
    selected.stock === 0
      ? t("outOfStock")
      : selected.stock <= 3
        ? t("lowStock", { count: selected.stock })
        : t("inStock");

  function add1() {
    if (!selected || selected.stock === 0) return;
    const firstImg = product.images[0];
    add({
      productId: product.id,
      variantId: selected.id,
      slug: product.slug,
      name: product.name,
      variantLabel: `${selected.size ? selected.size + " · " : ""}${MATERIAL_LABEL[selected.material]}`,
      image: firstImg?.src ?? "",
      priceUSD: selected.priceUSD,
      ...(selected.compareAtUSD ? { compareAtUSD: selected.compareAtUSD } : {}),
      quantity: qty,
    });
    toast.success(toastCopy("addedToCart"), product.name);
    openCartDrawer();
  }

  function wishToggle() {
    const added = toggleWish(product.id);
    if (added) toast.success(toastCopy("addedToWishlist"));
    else toast.info(toastCopy("removedFromWishlist"));
  }

  async function share() {
    try {
      const url = typeof window !== "undefined" ? window.location.href : "";
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: product.name, url });
        return;
      }
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        toast.success(toastCopy("linkCopied"));
      }
    } catch {
      /* user cancelled or browser unsupported */
    }
  }

  return (
    <div className="space-y-7">
      <div>
        <p className="eyebrow">{product.category}</p>
        <h1 className="mt-3 font-display text-3xl md:text-4xl leading-tight text-ink-strong">
          {product.name}
        </h1>
        <div className="mt-3 flex items-baseline gap-3">
          <span className="font-display text-2xl text-ink-strong tabular-nums">
            {formatPrice(selected.priceUSD, currency)}
          </span>
          {onSale && selected.compareAtUSD ? (
            <span className="text-sm text-meta line-through tabular-nums">
              {formatPrice(selected.compareAtUSD, currency)}
            </span>
          ) : null}
        </div>
        <p className="mt-4 text-sm text-ink leading-relaxed">{product.shortDescription}</p>
      </div>

      {sizes.length > 0 ? (
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.12em] text-meta">
              {t("size")}
            </span>
            <button
              type="button"
              className="text-xs text-meta underline underline-offset-4 hover:text-ink-strong"
            >
              Size guide
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {sizes.map((s) => {
              const match = findVariant(product.variants, s, material);
              const disabled = !match || match.stock === 0;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  disabled={disabled}
                  className={cn(
                    "h-10 min-w-10 px-3 rounded-sm border text-sm transition-colors",
                    size === s
                      ? "border-ink-strong bg-ink-strong text-bg"
                      : "border-divider text-ink-strong hover:border-ink-strong",
                    disabled &&
                      "opacity-40 cursor-not-allowed line-through hover:border-divider",
                  )}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {materials.length > 1 ? (
        <div>
          <span className="text-xs uppercase tracking-[0.12em] text-meta">
            {t("material")}
          </span>
          <div className="mt-3 flex flex-wrap gap-2">
            {materials.map((m) => {
              const match = findVariant(product.variants, size, m);
              const disabled = !match || match.stock === 0;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMaterial(m)}
                  disabled={disabled}
                  className={cn(
                    "h-10 px-4 rounded-sm border text-sm transition-colors",
                    material === m
                      ? "border-ink-strong bg-ink-strong text-bg"
                      : "border-divider text-ink-strong hover:border-ink-strong",
                    disabled && "opacity-40 cursor-not-allowed",
                  )}
                >
                  {MATERIAL_LABEL[m]}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {selected.gemstone !== "none" ? (
        <div>
          <span className="text-xs uppercase tracking-[0.12em] text-meta">
            {t("stone")}
          </span>
          <p className="mt-2 text-sm text-ink-strong">
            {GEMSTONE_LABEL[selected.gemstone]}
          </p>
        </div>
      ) : null}

      <div className="flex items-center gap-4">
        <div className="inline-flex items-center rounded-sm border border-divider">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="h-11 w-11 inline-flex items-center justify-center text-ink-strong hover:bg-surface"
          >
            <FiMinus aria-hidden className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-sm tabular-nums">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(selected.stock || 10, q + 1))}
            aria-label="Increase quantity"
            className="h-11 w-11 inline-flex items-center justify-center text-ink-strong hover:bg-surface"
          >
            <FiPlus aria-hidden className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-meta">{stockCopy}</p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          size="lg"
          className="flex-1"
          disabled={selected.stock === 0}
          onClick={add1}
        >
          {selected.stock === 0 ? t("outOfStock") : t("addToCart")}
        </Button>
        <button
          type="button"
          onClick={wishToggle}
          aria-label={saved ? t("removeFromWishlist") : t("addToWishlist")}
          className={cn(
            "h-13 w-13 inline-flex items-center justify-center rounded-sm border border-divider text-ink-strong hover:bg-surface",
          )}
        >
          <FiHeart
            aria-hidden
            className={cn("h-5 w-5", saved ? "fill-sale text-sale" : "")}
          />
        </button>
        <button
          type="button"
          onClick={share}
          aria-label="Share product"
          className="h-13 w-13 inline-flex items-center justify-center rounded-sm border border-divider text-ink-strong hover:bg-surface"
        >
          <FiShare2 aria-hidden className="h-5 w-5" />
        </button>
      </div>

      <div className="pt-2 text-xs text-meta tabular-nums">
        {t("sku")} · {selected.sku}
      </div>
    </div>
  );
}
