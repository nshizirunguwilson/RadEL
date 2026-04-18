"use client";

import { useTranslations } from "next-intl";
import { FiCheck } from "react-icons/fi";

import { cn } from "@/lib/utils";

const ORDER = ["address", "shipping", "payment", "review"] as const;
type Step = (typeof ORDER)[number];

export function CheckoutSteps({ current }: { current: Step }) {
  const t = useTranslations("checkout.steps");
  const idx = ORDER.indexOf(current);
  return (
    <ol className="flex items-center gap-2 text-xs">
      {ORDER.map((s, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <li key={s} className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-medium tabular-nums",
                done && "bg-ink-strong border-ink-strong text-bg",
                active && "border-ink-strong text-ink-strong",
                !done && !active && "border-divider text-meta",
              )}
            >
              {done ? <FiCheck aria-hidden className="h-3 w-3" /> : i + 1}
            </span>
            <span
              className={cn(
                "hidden md:inline",
                active ? "text-ink-strong" : "text-meta",
              )}
            >
              {t(s)}
            </span>
            {i < ORDER.length - 1 ? (
              <span aria-hidden className="w-8 h-px bg-divider mx-1" />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
