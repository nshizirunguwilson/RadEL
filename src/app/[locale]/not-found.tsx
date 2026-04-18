import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("errors.notFound");
  return (
    <main id="main" className="container-editorial py-28 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4">{t("title")}</h1>
      <p className="mt-6 text-ink mx-auto max-w-md">{t("body")}</p>
      <Link
        href="/"
        className="mt-10 inline-flex h-11 items-center rounded-sm bg-ink-strong px-6 text-sm font-medium text-bg"
      >
        {t("home")}
      </Link>
    </main>
  );
}
