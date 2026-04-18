import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Button } from "@/components/ui";

type Params = Promise<{ locale: string }>;
type Search = Promise<{ order?: string; email?: string }>;

export const metadata = { title: "Order placed" };

export default async function CheckoutSuccessPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Search;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { order, email } = await searchParams;
  const t = await getTranslations("checkout.success");
  const orderNumber = order ?? "RAD-000000";
  const emailAddress = email ?? "your email";

  return (
    <main
      id="main"
      className="container-editorial py-24 text-center min-h-[70dvh] flex flex-col items-center justify-center"
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
        <FiCheck aria-hidden className="h-7 w-7" />
      </span>
      <h1 className="mt-6 font-display text-3xl md:text-4xl text-ink-strong max-w-lg">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-md text-sm text-meta">
        {t("body", { email: emailAddress, orderNumber })}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link href="/shop">
          <Button variant="primary" size="md">
            {t("continue")}
          </Button>
        </Link>
        <Link href="/account/sign-up">
          <Button variant="outline" size="md">
            {t("account")}
          </Button>
        </Link>
      </div>
    </main>
  );
}
