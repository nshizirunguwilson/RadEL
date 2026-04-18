import { getTranslations, setRequestLocale } from "next-intl/server";

import { AuthCard } from "@/components/auth/AuthCard";
import { SignInForm } from "@/components/auth/SignInForm";

type Params = Promise<{ locale: string }>;

export const metadata = { title: "Sign in" };

export default async function SignInPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth.signIn");
  return (
    <AuthCard title={t("title")} body={t("body")}>
      <SignInForm />
    </AuthCard>
  );
}
