import { getTranslations, setRequestLocale } from "next-intl/server";

import { AuthCard } from "@/components/auth/AuthCard";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

type Params = Promise<{ locale: string }>;

export const metadata = { title: "Reset password" };

export default async function ForgotPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth.forgot");
  return (
    <AuthCard title={t("title")} body={t("body")}>
      <ForgotPasswordForm />
    </AuthCard>
  );
}
