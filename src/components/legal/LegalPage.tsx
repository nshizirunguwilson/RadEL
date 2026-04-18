import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  const t = useTranslations("legal");
  return (
    <main id="main" className="container-editorial py-16 md:py-20">
      <header className="text-center">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 max-w-xl mx-auto">{title}</h1>
        <p className="mt-4 text-xs text-meta tracking-[0.1em] uppercase">
          Last updated {updated}
        </p>
      </header>

      <div className="mt-12 mx-auto max-w-prose prose-custom space-y-6 text-sm text-ink leading-relaxed">
        {children}
      </div>

      <p className="mt-16 mx-auto max-w-prose text-xs text-meta italic">
        {t("disclaimer")}
      </p>
    </main>
  );
}
