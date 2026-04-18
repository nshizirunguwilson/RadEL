import { setRequestLocale } from "next-intl/server";
import { WishlistClient } from "@/components/wishlist/WishlistClient";

type Params = Promise<{ locale: string }>;

export const metadata = { title: "Wishlist" };

export default async function WishlistPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <WishlistClient />;
}
