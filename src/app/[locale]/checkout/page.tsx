import { setRequestLocale } from "next-intl/server";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";

type Params = Promise<{ locale: string }>;

export const metadata = { title: "Checkout" };

export default async function CheckoutPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CheckoutClient />;
}
