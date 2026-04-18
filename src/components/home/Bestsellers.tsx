"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { PRODUCTS } from "@/data/products";
import type { Category } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";

type TabKey = "all" | Category;

const TABS: TabKey[] = ["all", "earrings", "rings", "necklaces", "bracelets"];

export function Bestsellers() {
  const t = useTranslations("home.bestsellers");
  const [tab, setTab] = useState<TabKey>("all");

  const items = useMemo(() => {
    const bestsellers = PRODUCTS.filter((p) => p.tags.includes("bestseller"));
    const filtered = tab === "all" ? bestsellers : bestsellers.filter((p) => p.category === tab);
    return filtered.slice(0, 8);
  }, [tab]);

  return (
    <section className="container-wide py-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="mt-3 max-w-xl">{t("title")}</h2>
        </div>
        <div className="flex flex-wrap gap-1 border-b border-divider md:border-0">
          {TABS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              className={cn(
                "px-3 py-2 text-sm transition-colors border-b-2 -mb-px md:mb-0",
                tab === k
                  ? "text-ink-strong border-ink-strong md:border-accent"
                  : "text-meta border-transparent hover:text-ink-strong",
              )}
            >
              {t(`tabs.${k}`)}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
