"use client";

import { useTranslations } from "next-intl";

import type { SortOption } from "@/types/product";

interface Props {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function ShopSort({ value, onChange }: Props) {
  const t = useTranslations("shop.sort");
  const options: Array<{ value: SortOption; label: string }> = [
    { value: "featured", label: t("featured") },
    { value: "newest", label: t("newest") },
    { value: "price-asc", label: t("priceAsc") },
    { value: "price-desc", label: t("priceDesc") },
    { value: "rating", label: t("rating") },
    { value: "bestseller", label: t("bestseller") },
  ];
  return (
    <label className="inline-flex items-center gap-2 text-sm text-meta">
      <span className="sr-only md:not-sr-only">{t("label")}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="h-9 rounded-sm border border-divider bg-bg px-3 text-sm text-ink-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
