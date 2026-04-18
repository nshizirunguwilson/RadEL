"use client";

import { CURRENCIES, type CurrencyCode } from "@/data/currencies";
import { useUiStore } from "@/stores/ui";
import { useHasHydrated } from "@/stores/useHasHydrated";

export function CurrencySwitcher({ className }: { className?: string }) {
  const currency = useUiStore((s) => s.currency);
  const setCurrency = useUiStore((s) => s.setCurrency);
  const hydrated = useHasHydrated();

  return (
    <label className={`inline-flex items-center gap-2 text-xs text-meta ${className ?? ""}`}>
      <span className="sr-only">Currency</span>
      <select
        value={hydrated ? currency : "USD"}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        className="h-9 bg-transparent text-ink-strong text-xs tracking-[0.1em] uppercase px-2 pr-6 border border-divider rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {Object.values(CURRENCIES).map((c) => (
          <option key={c.code} value={c.code}>
            {c.code}
          </option>
        ))}
      </select>
    </label>
  );
}
