import { getTranslations, setRequestLocale } from "next-intl/server";

import { AuthCard } from "@/components/auth/AuthCard";
import { SignUpForm } from "@/components/auth/SignUpForm";

type Params = Promise<{ locale: string }>;

export const metadata = { title: "Create account" };

export default async function SignUpPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth.signUp");
  return (
    <AuthCard title={t("title")} body={t("body")}>
      <SignUpForm />
    </AuthCard>
  );
}
