"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FiSearch, FiX, FiClock } from "react-icons/fi";
import { useTranslations } from "next-intl";

import { useUiStore } from "@/stores/ui";
import { useHasHydrated } from "@/stores/useHasHydrated";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { formatPrice } from "@/lib/currency";

const POPULAR = ["Mara Hoops", "Sol Studs", "Cassia Chain", "Eternity Band"];

export function SearchModal() {
  const t = useTranslations("search");
  const open = useUiStore((s) => s.searchOpen);
  const close = useUiStore((s) => s.closeSearch);
  const currency = useUiStore((s) => s.currency);
  const recent = useUiStore((s) => s.recentSearches);
  const pushRecent = useUiStore((s) => s.pushRecentSearch);
  const hydrated = useHasHydrated();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q),
    ).slice(0, 6);
  }, [query]);

  function handleResultClick() {
    if (query.trim()) pushRecent(query.trim());
    close();
    setQuery("");
  }

  return (
    <DialogPrimitive.Root open={hydrated && open} onOpenChange={(v) => !v && close()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink-strong/55 backdrop-blur-[2px] data-[state=open]:animate-[fade-in_200ms_ease-out]" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-20 z-50 w-[92vw] max-w-2xl -translate-x-1/2 bg-bg border border-divider rounded-sm shadow-[0_30px_60px_-15px_oklch(15%_0.02_215_/_0.25)] data-[state=open]:animate-[fade-up_250ms_cubic-bezier(0.22,1,0.36,1)]"
        >
          <DialogPrimitive.Title className="sr-only">{t("title")}</DialogPrimitive.Title>
          <div className="flex items-center gap-3 border-b border-divider px-4 py-3">
            <FiSearch aria-hidden className="h-5 w-5 text-meta" />
            <input
              type="search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("placeholder")}
              aria-label={t("title")}
              className="flex-1 h-11 bg-transparent text-base text-ink-strong placeholder:text-meta focus:outline-none"
            />
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-ink-strong hover:bg-surface"
            >
              <FiX aria-hidden className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[70vh] overflow-y-auto p-4">
            {query.trim() ? (
              results.length > 0 ? (
                <div>
                  <p className="eyebrow mb-3">{t("resultCount", { count: results.length })}</p>
                  <ul>
                    {results.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/product/${p.slug}`}
                          onClick={handleResultClick}
                          className="flex items-center gap-3 p-2 rounded-sm hover:bg-surface"
                        >
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm bg-surface">
                            {p.images[0] ? (
                              <Image
                                src={p.images[0].src}
                                alt={p.images[0].alt}
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            ) : null}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-ink-strong truncate">{p.name}</p>
                            <p className="text-xs text-meta capitalize">{p.category}</p>
                          </div>
                          <p className="text-sm text-ink tabular-nums shrink-0">
                            {p.variants[0]
                              ? formatPrice(p.variants[0].priceUSD, currency)
                              : null}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/shop?q=${encodeURIComponent(query.trim())}`}
                    onClick={handleResultClick}
                    className="mt-4 inline-block text-sm text-ink-strong underline underline-offset-4 decoration-accent"
                  >
                    {t("viewAll")}
                  </Link>
                </div>
              ) : (
                <p className="py-8 text-center text-sm text-meta">{t("empty", { query })}</p>
              )
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="eyebrow mb-3">{t("popular")}</p>
                  <ul className="space-y-1">
                    {POPULAR.map((term) => (
                      <li key={term}>
                        <button
                          type="button"
                          onClick={() => setQuery(term)}
                          className="w-full text-left px-2 py-2 rounded-sm text-sm text-ink-strong hover:bg-surface"
                        >
                          {term}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow mb-3">Categories</p>
                  <ul className="space-y-1">
                    {CATEGORIES.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/shop/${c.slug}`}
                          onClick={close}
                          className="block px-2 py-2 rounded-sm text-sm text-ink-strong hover:bg-surface"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {hydrated && recent.length > 0 ? (
                  <div className="sm:col-span-2">
                    <p className="eyebrow mb-3">{t("recent")}</p>
                    <ul className="flex flex-wrap gap-2">
                      {recent.map((r) => (
                        <li key={r}>
                          <button
                            type="button"
                            onClick={() => setQuery(r)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-divider text-xs text-ink hover:bg-surface"
                          >
                            <FiClock aria-hidden className="h-3 w-3" /> {r}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
