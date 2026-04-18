"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { FiCheckCircle, FiCircle, FiPackage, FiTruck } from "react-icons/fi";

import { Button, Input, Label } from "@/components/ui";
import { getOrderByNumber } from "@/data/orders";
import type { Order } from "@/types/order";
import { formatDate } from "@/lib/utils";

const TIMELINE_ICON: Record<string, typeof FiPackage> = {
  placed: FiPackage,
  packed: FiPackage,
  shipped: FiTruck,
  "out-for-delivery": FiTruck,
  delivered: FiCheckCircle,
  cancelled: FiCircle,
};

const TIMELINE_LABEL: Record<string, string> = {
  placed: "Order placed",
  packed: "Packed at the atelier",
  shipped: "Shipped",
  "out-for-delivery": "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function TrackClient() {
  const t = useTranslations("track");
  const search = useSearchParams();
  const initial = search.get("number") ?? "";
  const [number, setNumber] = useState(initial);
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  function lookup(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    const match = getOrderByNumber(number.trim().toUpperCase());
    if (!match) {
      setOrder(null);
      setError(t("notFound"));
      return;
    }
    setOrder(match);
  }

  useEffect(() => {
    if (initial) {
      const match = getOrderByNumber(initial.trim().toUpperCase());
      if (match) setOrder(match);
    }
  }, [initial]);

  return (
    <main id="main" className="container-editorial py-16 md:py-20">
      <header className="text-center">
        <p className="eyebrow">{t("title")}</p>
        <h1 className="mt-4 max-w-xl mx-auto">{t("title")}</h1>
        <p className="mt-4 max-w-md mx-auto text-sm text-meta">{t("body")}</p>
      </header>

      <form onSubmit={lookup} className="mt-10 grid gap-4 md:grid-cols-[2fr_2fr_auto] md:items-end">
        <div>
          <Label className="text-xs uppercase tracking-[0.12em] text-meta">
            {t("orderNumber")}
          </Label>
          <Input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="RAD-482901"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-[0.12em] text-meta">
            {t("email")}
          </Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <Button type="submit" size="md">
          {t("submit")}
        </Button>
      </form>

      <p className="mt-3 text-xs text-meta">
        Try <span className="tabular-nums text-ink-strong">RAD-482901</span> or{" "}
        <span className="tabular-nums text-ink-strong">RAD-391227</span> — demo orders.
      </p>

      {error ? (
        <p className="mt-8 rounded-sm border border-divider bg-surface/60 p-4 text-sm text-sale">
          {error}
        </p>
      ) : null}

      {order ? (
        <section className="mt-12 rounded-sm border border-divider p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-[10px]">Order {order.number}</p>
              <h2 className="mt-2 font-display text-2xl text-ink-strong capitalize">
                {TIMELINE_LABEL[order.status] ?? order.status}
              </h2>
              <p className="mt-1 text-xs text-meta">
                Placed {formatDate(order.placedAt)}
              </p>
            </div>
            {order.carrier ? (
              <div className="text-right">
                <p className="text-xs text-meta uppercase tracking-[0.1em]">
                  {order.carrier}
                </p>
                <p className="mt-1 text-sm text-ink-strong tabular-nums">
                  {order.tracking}
                </p>
              </div>
            ) : null}
          </div>

          <ol className="mt-8 space-y-4">
            {order.timeline.map((entry) => {
              const Icon = TIMELINE_ICON[entry.status] ?? FiCircle;
              return (
                <li key={entry.status + entry.at} className="flex gap-4">
                  <span className="mt-0.5 h-6 w-6 shrink-0 inline-flex items-center justify-center rounded-full bg-success/15 text-success">
                    <Icon aria-hidden className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="text-sm text-ink-strong">
                      {TIMELINE_LABEL[entry.status] ?? entry.status}
                    </p>
                    <p className="text-xs text-meta">
                      {formatDate(entry.at)}
                    </p>
                    {entry.note ? (
                      <p className="mt-1 text-xs text-meta">{entry.note}</p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ) : null}
    </main>
  );
}
