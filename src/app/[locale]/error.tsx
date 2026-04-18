"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errors.generic");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="container-editorial py-28 text-center">
      <p className="eyebrow">Error</p>
      <h1 className="mt-4">{t("title")}</h1>
      <p className="mt-6 text-ink mx-auto max-w-md">{t("body")}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-10 inline-flex h-11 items-center rounded-sm bg-ink-strong px-6 text-sm font-medium text-bg"
      >
        {t("retry")}
      </button>
    </main>
  );
}
