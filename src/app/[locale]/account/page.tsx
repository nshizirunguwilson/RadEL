import { setRequestLocale } from "next-intl/server";

import { AccountShell } from "@/components/account/AccountShell";
import { ProfilePanel } from "@/components/account/ProfilePanel";

type Params = Promise<{ locale: string }>;

export const metadata = { title: "Account" };

export default async function AccountPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <AccountShell>
      <ProfilePanel />
    </AccountShell>
  );
}
