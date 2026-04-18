"use client";

import { useTranslations } from "next-intl";
import { FiStar } from "react-icons/fi";

import { CATEGORIES } from "@/data/categories";
import {
  GEMSTONE_LABEL,
  GEMSTONE_ORDER,
  MATERIAL_LABEL,
  MATERIAL_ORDER,
} from "@/data/materials";
import type { Category, Gemstone, Material } from "@/types/product";
import { cn } from "@/lib/utils";
import type { ShopFilterState } from "@/lib/shop-filters";

interface Props {
  filters: ShopFilterState;
  onChange: (next: ShopFilterState) => void;
  bounds: [number, number];
  activeCount: number;
}

export function ShopFilters({ filters, onChange, bounds, activeCount }: Props) {
  const t = useTranslations("shop.filters");

  function toggleIn<T>(list: T[], value: T): T[] {
    return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
  }

  function clear() {
    onChange({
      categories: [],
      materials: [],
      gemstones: [],
      price: null,
      minRating: 0,
      inStockOnly: false,
      tags: [],
    });
  }

  const priceMin = filters.price?.[0] ?? bounds[0];
  const priceMax = filters.price?.[1] ?? bounds[1];

  return (
    <aside className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg text-ink-strong">{t("title")}</h2>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={clear}
            className="text-xs text-meta underline underline-offset-4 hover:text-ink-strong"
          >
            {t("clearAll")}
          </button>
        ) : null}
      </div>

      <FilterGroup title={t("category")}>
        {CATEGORIES.map((c) => (
          <Checkbox
            key={c.slug}
            label={c.name}
            checked={filters.categories.includes(c.slug)}
            onChange={() =>
              onChange({
                ...filters,
                categories: toggleIn<Category>(filters.categories, c.slug),
              })
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title={t("material")}>
        {MATERIAL_ORDER.map((m) => (
          <Checkbox
            key={m}
            label={MATERIAL_LABEL[m]}
            checked={filters.materials.includes(m)}
            onChange={() =>
              onChange({
                ...filters,
                materials: toggleIn<Material>(filters.materials, m),
              })
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title={t("gemstone")}>
        {GEMSTONE_ORDER.map((g) => (
          <Checkbox
            key={g}
            label={GEMSTONE_LABEL[g]}
            checked={filters.gemstones.includes(g)}
            onChange={() =>
              onChange({
                ...filters,
                gemstones: toggleIn<Gemstone>(filters.gemstones, g),
              })
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title={t("price")}>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-meta tabular-nums">
            <span>${priceMin}</span>
            <span className="flex-1 text-center">—</span>
            <span>${priceMax}</span>
          </div>
          <input
            type="range"
            min={bounds[0]}
            max={bounds[1]}
            value={priceMax}
            onChange={(e) => {
              const max = Number(e.target.value);
              onChange({ ...filters, price: [bounds[0], max] });
            }}
            className="w-full accent-accent"
            aria-label="Maximum price"
          />
        </div>
      </FilterGroup>

      <FilterGroup title={t("rating")}>
        <div className="flex flex-col gap-1">
          {[4, 3, 2, 0].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onChange({ ...filters, minRating: r })}
              className={cn(
                "flex items-center gap-2 rounded-sm px-2 py-1.5 text-left text-xs",
                filters.minRating === r
                  ? "bg-surface text-ink-strong"
                  : "text-ink hover:bg-surface/60",
              )}
            >
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar
                    key={i}
                    aria-hidden
                    className={cn(
                      "h-3 w-3",
                      i < r ? "fill-accent text-accent" : "text-divider",
                    )}
                  />
                ))}
              </span>
              <span>{r === 0 ? "Any" : `${r}+`}</span>
            </button>
          ))}
        </div>
      </FilterGroup>

      <div className="flex items-center justify-between rounded-sm border border-divider px-3 py-2.5">
        <label htmlFor="in-stock" className="text-sm text-ink cursor-pointer">
          {t("inStock")}
        </label>
        <input
          id="in-stock"
          type="checkbox"
          checked={filters.inStockOnly}
          onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
          className="h-4 w-4 accent-accent"
        />
      </div>
    </aside>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow text-[10px] mb-3">{title}</p>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink hover:text-ink-strong cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-accent"
      />
      <span>{label}</span>
    </label>
  );
}
