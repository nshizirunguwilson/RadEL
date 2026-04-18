"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui";
import { useUiStore } from "@/stores/ui";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";
import { useRecentlyViewedStore } from "@/stores/recentlyViewed";
import { CURRENCIES, type CurrencyCode } from "@/data/currencies";
import { toast } from "@/stores/toast";

export function SettingsPanel() {
  const t = useTranslations("account.settings");
  const currency = useUiStore((s) => s.currency);
  const setCurrency = useUiStore((s) => s.setCurrency);
  const signOut = useAuthStore((s) => s.signOut);
  const cartClear = useCartStore((s) => s.clear);
  const wishClear = useWishlistStore((s) => s.clear);
  const rvClear = useRecentlyViewedStore((s) => s.clear);

  function deleteAccount() {
    if (!confirm(t("confirmDelete"))) return;
    cartClear();
    wishClear();
    rvClear();
    signOut();
    toast.success("Demo data cleared.");
  }

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="font-display text-2xl text-ink-strong">{t("title")}</h2>
      <div>
        <label
          htmlFor="currency"
          className="text-xs uppercase tracking-[0.12em] text-meta"
        >
          {t("currency")}
        </label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
          className="mt-1.5 h-11 w-full rounded-sm border border-divider bg-bg px-3 text-sm text-ink-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {Object.values(CURRENCIES).map((c) => (
            <option key={c.code} value={c.code}>
              {c.label} ({c.symbol})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.12em] text-meta">
          {t("language")}
        </label>
        <p className="mt-1.5 text-sm text-meta">
          Switch languages from the footer. English and French are currently supported.
        </p>
      </div>
      <div className="pt-6 border-t border-divider">
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={deleteAccount}
        >
          {t("delete")}
        </Button>
      </div>
    </div>
  );
}
