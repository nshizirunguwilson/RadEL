import { CURRENCIES, type CurrencyCode } from "@/data/currencies";

export function convert(amountUSD: number, to: CurrencyCode): number {
  return amountUSD * CURRENCIES[to].rateFromUSD;
}

export function formatPrice(
  amountUSD: number,
  currency: CurrencyCode = "USD",
  locale = "en-US",
): string {
  const converted = convert(amountUSD, currency);
  const { fractionDigits } = CURRENCIES[currency];
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(converted);
}

export function formatPriceCompact(
  amountUSD: number,
  currency: CurrencyCode = "USD",
  locale = "en-US",
): string {
  const converted = convert(amountUSD, currency);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation: converted >= 100_000 ? "compact" : "standard",
    maximumFractionDigits: 0,
  }).format(converted);
}
