"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiPackage } from "react-icons/fi";

import { MOCK_ORDERS } from "@/data/orders";
import { useUiStore } from "@/stores/ui";
import { formatPrice } from "@/lib/currency";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<string, string> = {
  placed: "Placed",
  packed: "Packed",
  shipped: "Shipped",
  "out-for-delivery": "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function OrdersPanel() {
  const t = useTranslations("account.orders");
  const currency = useUiStore((s) => s.currency);
  const orders = MOCK_ORDERS;

  if (orders.length === 0) {
    return (
      <div className="rounded-sm border border-divider p-10 text-center">
        <FiPackage aria-hidden className="h-8 w-8 mx-auto text-meta" />
        <p className="mt-4 text-sm text-meta">{t("empty")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h2 className="font-display text-2xl text-ink-strong">{t("title")}</h2>
      <ul className="space-y-4">
        {orders.map((o) => (
          <li
            key={o.id}
            className="rounded-sm border border-divider p-5 hover:border-ink-strong/40 transition-colors"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-display text-lg text-ink-strong">
                  {t("orderNumber", { number: o.number })}
                </p>
                <p className="mt-0.5 text-xs text-meta">
                  {t("placed", { date: formatDate(o.placedAt) })}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={cn(
                    "inline-flex items-center rounded-sm px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em]",
                    o.status === "delivered"
                      ? "bg-success/15 text-success"
                      : o.status === "cancelled"
                        ? "bg-sale/15 text-sale"
                        : "bg-surface text-ink-strong",
                  )}
                >
                  {STATUS_LABEL[o.status] ?? o.status}
                </span>
                <p className="mt-2 text-sm text-ink-strong tabular-nums">
                  {t("total", { amount: formatPrice(o.totalUSD, currency) })}
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto">
              {o.items.map((it) => (
                <div
                  key={it.variantId}
                  className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-sm bg-surface"
                >
                  <Image
                    src={it.image}
                    alt={it.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Link
                href={`/track?number=${o.number}`}
                className="text-xs text-ink-strong underline underline-offset-4 hover:text-accent"
              >
                Track package
              </Link>
              <span className="text-xs text-meta">
                {o.items.length} {o.items.length === 1 ? "piece" : "pieces"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
