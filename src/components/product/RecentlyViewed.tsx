"use client";

import { useTranslations } from "next-intl";

import { useRecentlyViewedStore } from "@/stores/recentlyViewed";
import { useHasHydrated } from "@/stores/useHasHydrated";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const t = useTranslations("product");
  const ids = useRecentlyViewedStore((s) => s.productIds);
  const hydrated = useHasHydrated();

  if (!hydrated) return null;
  const items = ids
    .filter((id) => id !== excludeId)
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section className="container-wide py-16 border-t border-divider">
      <h2 className="mb-8 font-display text-2xl text-ink-strong">
        {t("recentlyViewed")}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
