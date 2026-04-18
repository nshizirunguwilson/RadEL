"use client";

import { useTranslations } from "next-intl";
import { FiMapPin } from "react-icons/fi";

import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui";

export function AddressesPanel() {
  const t = useTranslations("account.addresses");
  const user = useAuthStore((s) => s.user);
  const addresses = user?.addresses ?? [];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl text-ink-strong">{t("title")}</h2>
        <Button variant="outline" size="sm">
          {t("add")}
        </Button>
      </div>
      {addresses.length === 0 ? (
        <div className="rounded-sm border border-divider p-10 text-center">
          <FiMapPin aria-hidden className="h-8 w-8 mx-auto text-meta" />
          <p className="mt-4 text-sm text-meta">No saved addresses yet.</p>
          <p className="mt-1 text-xs text-meta">
            Addresses are added automatically when you place an order.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {addresses.map((a, i) => (
            <li
              key={i}
              className="rounded-sm border border-divider p-5 flex items-start justify-between gap-4"
            >
              <div>
                <p className="font-medium text-ink-strong">{a.fullName}</p>
                <p className="mt-1 text-sm text-ink">
                  {a.line1}
                  {a.line2 ? `, ${a.line2}` : ""}
                </p>
                <p className="text-sm text-ink">
                  {a.city}
                  {a.region ? `, ${a.region}` : ""} {a.postalCode}
                </p>
                <p className="text-sm text-meta">{a.country}</p>
              </div>
              <div className="flex gap-2 text-xs">
                <button className="text-meta hover:text-ink-strong underline underline-offset-4">
                  {t("edit")}
                </button>
                <button className="text-meta hover:text-sale underline underline-offset-4">
                  {t("delete")}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
