"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { FaGoogle, FaApple } from "react-icons/fa6";

import { Button, Input, Label } from "@/components/ui";
import { useAuthStore } from "@/stores/auth";
import { toast } from "@/stores/toast";

export function SignInForm() {
  const t = useTranslations("auth.signIn");
  const router = useRouter();
  const signIn = useAuthStore((s) => s.signIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    signIn(email);
    toast.success("Welcome back.");
    router.push("/account");
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div>
        <Label htmlFor="email" className="text-xs uppercase tracking-[0.12em] text-meta">
          {t("email")}
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="mt-1.5"
        />
      </div>
      <div>
        <div className="flex items-baseline justify-between">
          <Label htmlFor="password" className="text-xs uppercase tracking-[0.12em] text-meta">
            {t("password")}
          </Label>
          <Link
            href="/forgot-password"
            className="text-xs text-meta hover:text-ink-strong underline underline-offset-4"
          >
            {t("forgot")}
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="mt-1.5"
        />
      </div>
      {error ? <p className="text-sm text-sale">{error}</p> : null}
      <Button type="submit" size="md" className="w-full">
        {t("submit")}
      </Button>
      <div className="flex items-center gap-3 py-2 text-xs text-meta">
        <span className="flex-1 h-px bg-divider" />
        {t("orContinue")}
        <span className="flex-1 h-px bg-divider" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => toast.info(t("comingSoon"))}
        >
          <FaGoogle aria-hidden className="h-4 w-4" />
          {t("google")}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => toast.info(t("comingSoon"))}
        >
          <FaApple aria-hidden className="h-4 w-4" />
          {t("apple")}
        </Button>
      </div>
      <p className="pt-4 text-center text-sm text-meta">
        {t("noAccount")}{" "}
        <Link
          href="/sign-up"
          className="text-ink-strong underline underline-offset-4 hover:text-accent"
        >
          {t("signUp")}
        </Link>
      </p>
    </form>
  );
}
