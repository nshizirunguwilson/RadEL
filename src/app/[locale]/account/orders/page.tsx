import { setRequestLocale } from "next-intl/server";

import { AccountShell } from "@/components/account/AccountShell";
import { OrdersPanel } from "@/components/account/OrdersPanel";

type Params = Promise<{ locale: string }>;

export const metadata = { title: "Orders" };

export default async function OrdersPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <AccountShell>
      <OrdersPanel />
    </AccountShell>
  );
}
