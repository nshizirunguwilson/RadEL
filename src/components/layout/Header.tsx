"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiSearch,
  FiShoppingBag,
  FiHeart,
  FiUser,
  FiMenu,
} from "react-icons/fi";
import { useTranslations } from "next-intl";

import { PRIMARY_NAV } from "@/data/navigation";
import { CATEGORIES } from "@/data/categories";
import { useCartStore, selectLineCount } from "@/stores/cart";
import { useUiStore } from "@/stores/ui";
import { useHasHydrated } from "@/stores/useHasHydrated";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui";

import { CurrencySwitcher } from "@/components/common/CurrencySwitcher";

export function Header() {
  const t = useTranslations("nav");
  const lineCount = useCartStore(selectLineCount);
  const openCart = useUiStore((s) => s.openCartDrawer);
  const openSearch = useUiStore((s) => s.openSearch);
  const hydrated = useHasHydrated();
  const [mobileOpen, setMobileOpen] = useState(false);

  const catLabels = t.raw("categories") as Record<string, string>;

  return (
    <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur border-b border-divider">
      <div className="container-wide flex items-center justify-between h-16 md:h-20 gap-4">
        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink-strong hover:bg-surface"
          onClick={() => setMobileOpen(true)}
          aria-label={t("menu")}
        >
          <FiMenu aria-hidden className="h-5 w-5" />
        </button>

        <Link href="/" className="font-display text-2xl md:text-3xl tracking-[-0.02em] text-ink-strong">
          RadEl
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {PRIMARY_NAV.map((item) => (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className="text-sm text-ink hover:text-ink-strong transition-colors"
              >
                {t(item.labelKey)}
              </Link>
              {item.labelKey === "shop" ? (
                <div
                  className="absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity"
                >
                  <div className="min-w-[220px] bg-bg border border-divider rounded-sm shadow-[0_20px_40px_-12px_oklch(15%_0.02_215_/_0.18)] p-2">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/shop/${cat.slug}`}
                        className="block px-3 py-2 text-sm text-ink-strong rounded-sm hover:bg-surface"
                      >
                        {catLabels[cat.slug] ?? cat.name}
                      </Link>
                    ))}
                    <Link
                      href="/shop"
                      className="block px-3 py-2 text-sm eyebrow hover:bg-surface rounded-sm"
                    >
                      {catLabels.viewAll}
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <CurrencySwitcher className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={openSearch}
            aria-label={t("search")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink-strong hover:bg-surface"
          >
            <FiSearch aria-hidden className="h-5 w-5" />
          </button>
          <Link
            href="/account"
            aria-label={t("account")}
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink-strong hover:bg-surface"
          >
            <FiUser aria-hidden className="h-5 w-5" />
          </Link>
          <Link
            href="/wishlist"
            aria-label={t("wishlist")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink-strong hover:bg-surface"
          >
            <FiHeart aria-hidden className="h-5 w-5" />
          </Link>
          <button
            type="button"
            onClick={openCart}
            aria-label={t("cart")}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink-strong hover:bg-surface"
          >
            <FiShoppingBag aria-hidden className="h-5 w-5" />
            {hydrated && lineCount > 0 ? (
              <span
                className={cn(
                  "absolute -top-0.5 -right-0.5 min-w-[1.25rem] h-5 px-1 inline-flex items-center justify-center",
                  "rounded-full bg-accent text-accent-ink text-[10px] font-semibold",
                )}
              >
                {lineCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="max-w-[20rem]">
          <SheetHeader>
            <SheetTitle>RadEl</SheetTitle>
          </SheetHeader>
          <SheetBody>
            <nav aria-label="Mobile" className="flex flex-col">
              {PRIMARY_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-base text-ink-strong border-b border-divider"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>
            <div className="mt-6">
              <p className="eyebrow mb-3">{catLabels.viewAll}</p>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-sm text-ink"
                >
                  {catLabels[cat.slug] ?? cat.name}
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-divider flex items-center justify-between">
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-ink-strong"
              >
                {t("signIn")}
              </Link>
              <CurrencySwitcher />
            </div>
          </SheetBody>
        </SheetContent>
      </Sheet>
    </header>
  );
}
