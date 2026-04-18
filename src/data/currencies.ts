export type CurrencyCode = "USD" | "EUR" | "RWF";

export interface CurrencyInfo {
  code: CurrencyCode;
  label: string;
  symbol: string;
  rateFromUSD: number;
  fractionDigits: number;
}

// Fixed mock rates, dated 2026-04-17. Not for real transactions.
export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: "USD", label: "US Dollar", symbol: "$", rateFromUSD: 1, fractionDigits: 2 },
  EUR: { code: "EUR", label: "Euro", symbol: "€", rateFromUSD: 0.92, fractionDigits: 2 },
  RWF: { code: "RWF", label: "Rwandan Franc", symbol: "FRw", rateFromUSD: 1_325, fractionDigits: 0 },
};

export const DEFAULT_CURRENCY: CurrencyCode = "USD";
export const CURRENCY_CODES = Object.keys(CURRENCIES) as CurrencyCode[];
