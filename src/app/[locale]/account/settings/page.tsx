import { setRequestLocale } from "next-intl/server";

import { AccountShell } from "@/components/account/AccountShell";
import { SettingsPanel } from "@/components/account/SettingsPanel";

type Params = Promise<{ locale: string }>;

export const metadata = { title: "Settings" };

export default async function SettingsPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <AccountShell>
      <SettingsPanel />
    </AccountShell>
  );
}
