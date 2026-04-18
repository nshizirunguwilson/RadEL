"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { Button, Input, Label } from "@/components/ui";
import { useAuthStore } from "@/stores/auth";
import { toast } from "@/stores/toast";

export function SignUpForm() {
  const t = useTranslations("auth.signUp");
  const router = useRouter();
  const signUp = useAuthStore((s) => s.signUp);
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password)) {
      setError(t("passwordHint"));
      return;
    }
    signUp(firstName.trim(), lastName.trim(), email);
    toast.success("Account created.");
    router.push("/account");
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label
            htmlFor="first"
            className="text-xs uppercase tracking-[0.12em] text-meta"
          >
            {t("firstName")}
          </Label>
          <Input
            id="first"
            value={firstName}
            onChange={(e) => setFirst(e.target.value)}
            autoComplete="given-name"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label
            htmlFor="last"
            className="text-xs uppercase tracking-[0.12em] text-meta"
          >
            {t("lastName")}
          </Label>
          <Input
            id="last"
            value={lastName}
            onChange={(e) => setLast(e.target.value)}
            autoComplete="family-name"
            className="mt-1.5"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="su-email" className="text-xs uppercase tracking-[0.12em] text-meta">
          {t("email")}
        </Label>
        <Input
          id="su-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="su-pass" className="text-xs uppercase tracking-[0.12em] text-meta">
          {t("password")}
        </Label>
        <Input
          id="su-pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          className="mt-1.5"
        />
        <p className="mt-1.5 text-xs text-meta">{t("passwordHint")}</p>
      </div>
      {error ? <p className="text-sm text-sale">{error}</p> : null}
      <Button type="submit" size="md" className="w-full">
        {t("submit")}
      </Button>
      <p className="pt-4 text-center text-sm text-meta">
        {t("haveAccount")}{" "}
        <Link
          href="/sign-in"
          className="text-ink-strong underline underline-offset-4 hover:text-accent"
        >
          {t("signIn")}
        </Link>
      </p>
    </form>
  );
}
