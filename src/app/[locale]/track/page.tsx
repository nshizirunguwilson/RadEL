import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { TrackClient } from "@/components/track/TrackClient";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("track");
  return {
    title: t("title"),
    description: t("body"),
  };
}

export default async function TrackPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Suspense>
      <TrackClient />
    </Suspense>
  );
}
