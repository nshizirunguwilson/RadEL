import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { SearchPageClient } from "@/components/search/SearchPageClient";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("search");
  return {
    title: t("title"),
    description: t("placeholder"),
  };
}

export default async function SearchPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Suspense>
      <SearchPageClient />
    </Suspense>
  );
}
