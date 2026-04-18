import { setRequestLocale } from "next-intl/server";

import { AccountShell } from "@/components/account/AccountShell";
import { AddressesPanel } from "@/components/account/AddressesPanel";

type Params = Promise<{ locale: string }>;

export const metadata = { title: "Addresses" };

export default async function AddressesPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <AccountShell>
      <AddressesPanel />
    </AccountShell>
  );
}
