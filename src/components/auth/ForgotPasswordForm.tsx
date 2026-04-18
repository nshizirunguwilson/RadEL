"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button, Input, Label } from "@/components/ui";

export function ForgotPasswordForm() {
  const t = useTranslations("auth.forgot");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="space-y-6">
        <p className="rounded-sm border border-divider bg-surface/60 p-4 text-sm text-ink-strong">
          {t("success")}
        </p>
        <Link
          href="/sign-in"
          className="inline-block text-sm text-meta hover:text-ink-strong underline underline-offset-4"
        >
          {t("back")}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div>
        <Label htmlFor="fp-email" className="text-xs uppercase tracking-[0.12em] text-meta">
          {t("email")}
        </Label>
        <Input
          id="fp-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="mt-1.5"
        />
      </div>
      {error ? <p className="text-sm text-sale">{error}</p> : null}
      <Button type="submit" size="md" className="w-full">
        {t("submit")}
      </Button>
      <p className="text-center">
        <Link
          href="/sign-in"
          className="text-sm text-meta hover:text-ink-strong underline underline-offset-4"
        >
          {t("back")}
        </Link>
      </p>
    </form>
  );
}
