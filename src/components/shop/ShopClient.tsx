"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";
import { useTranslations } from "next-intl";

import { PRODUCTS } from "@/data/products";
import type { Category, SortOption } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui";
import {
  EMPTY_FILTERS,
  applyFilters,
  applySort,
  countActiveFilters,
  priceBounds,
  type ShopFilterState,
} from "@/lib/shop-filters";

import { ShopFilters } from "./ShopFilters";
import { ShopSort } from "./ShopSort";

const PAGE_SIZE = 12;

interface Props {
  initialCategory?: Category;
}

export function ShopClient({ initialCategory }: Props) {
  const t = useTranslations("shop");
  const [filters, setFilters] = useState<ShopFilterState>({
    ...EMPTY_FILTERS,
    categories: initialCategory ? [initialCategory] : [],
  });
  const [sort, setSort] = useState<SortOption>("featured");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [sheetOpen, setSheetOpen] = useState(false);

  const bounds = useMemo(() => priceBounds(PRODUCTS), []);

  const filtered = useMemo(() => {
    const next = applyFilters(PRODUCTS, filters);
    return applySort(next, sort);
  }, [filters, sort]);

  const activeCount = countActiveFilters(filters);
  const showing = filtered.slice(0, visible);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) {
          setVisible((v) => Math.min(filtered.length, v + PAGE_SIZE));
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [filtered.length]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [filters, sort]);

  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      <div className="hidden lg:block">
        <ShopFilters
          filters={filters}
          onChange={setFilters}
          bounds={bounds}
          activeCount={activeCount}
        />
      </div>
      <div>
        <div className="flex items-center justify-between gap-4 pb-5 border-b border-divider">
          <p className="text-sm text-meta tabular-nums">
            {t("resultCount", { count: filtered.length })}
          </p>
          <div className="flex items-center gap-3">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="lg:hidden inline-flex items-center gap-2 h-9 px-3 rounded-sm border border-divider text-sm text-ink-strong"
                >
                  <FiFilter aria-hidden className="h-4 w-4" />
                  {t("filters.title")}
                  {activeCount > 0 ? (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-medium text-ink-strong">
                      {activeCount}
                    </span>
                  ) : null}
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>{t("filters.title")}</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <ShopFilters
                    filters={filters}
                    onChange={setFilters}
                    bounds={bounds}
                    activeCount={activeCount}
                  />
                </div>
                <div className="mt-8">
                  <Button
                    type="button"
                    onClick={() => setSheetOpen(false)}
                    className="w-full"
                  >
                    {t("filters.apply")}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <ShopSort value={sort} onChange={setSort} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="font-display text-2xl text-ink-strong">
              {t("empty.title")}
            </h3>
            <p className="mt-3 max-w-md mx-auto text-sm text-meta">
              {t("empty.body")}
            </p>
            <Button
              variant="outline"
              size="md"
              className="mt-6"
              onClick={() => setFilters(EMPTY_FILTERS)}
            >
              <FiX aria-hidden className="h-4 w-4" />
              {t("empty.reset")}
            </Button>
          </div>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10">
              {showing.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div ref={sentinelRef} className="h-12" aria-hidden />
            {visible < filtered.length ? (
              <div className="mt-4 text-center">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() =>
                    setVisible((v) => Math.min(filtered.length, v + PAGE_SIZE))
                  }
                >
                  Load more
                </Button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
