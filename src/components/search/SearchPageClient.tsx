"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { FiSearch } from "react-icons/fi";

import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { ProductCard } from "@/components/product/ProductCard";

const POPULAR = ["Mara Hoops", "Sol Studs", "Cassia Chain", "Eternity Band"];

export function SearchPageClient() {
  const t = useTranslations("search");
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <main id="main" className="container-wide py-16 md:py-20">
      <header className="text-center">
        <p className="eyebrow">{t("title")}</p>
        <h1 className="mt-4 max-w-xl mx-auto">{t("title")}</h1>
      </header>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-10 mx-auto max-w-xl flex items-center gap-3 border border-divider rounded-sm px-4 h-12 focus-within:border-ink-strong"
      >
        <FiSearch aria-hidden className="h-4 w-4 text-meta" />
        <input
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("placeholder")}
          aria-label={t("title")}
          className="flex-1 bg-transparent text-sm text-ink-strong placeholder:text-meta focus:outline-none"
        />
      </form>

      {query.trim() ? (
        results.length > 0 ? (
          <section className="mt-12">
            <p className="eyebrow text-center mb-8">
              {t("resultCount", { count: results.length })}
            </p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        ) : (
          <p className="mt-16 text-center text-sm text-meta">
            {t("empty", { query })}
          </p>
        )
      ) : (
        <div className="mt-16 mx-auto max-w-2xl grid gap-10 sm:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">{t("popular")}</p>
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
            <p className="eyebrow mb-4">Categories</p>
            <ul className="space-y-1">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/shop/${c.slug}`}
                    className="block px-2 py-2 rounded-sm text-sm text-ink-strong hover:bg-surface"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
