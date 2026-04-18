"use client";

import { FiX } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { useUiStore } from "@/stores/ui";
import { useHasHydrated } from "@/stores/useHasHydrated";

export function AnnouncementBar() {
  const t = useTranslations("announcement");
  const dismissed = useUiStore((s) => s.announcementDismissed);
  const dismiss = useUiStore((s) => s.dismissAnnouncement);
  const hydrated = useHasHydrated();

  if (hydrated && dismissed) return null;

  return (
    <div className="w-full bg-ink-strong text-bg">
      <div className="container-wide relative flex items-center justify-center py-2.5 text-xs tracking-[0.08em]">
        <p className="uppercase">{t("copy")}</p>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t("dismiss")}
          className="absolute right-3 inline-flex h-7 w-7 items-center justify-center rounded-sm text-bg/80 hover:text-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <FiX aria-hidden className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
