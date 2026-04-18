import { setRequestLocale } from "next-intl/server";
import { CartPageClient } from "@/components/cart/CartPageClient";

type Params = Promise<{ locale: string }>;

export const metadata = { title: "Your bag" };

export default async function CartPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CartPageClient />;
}
