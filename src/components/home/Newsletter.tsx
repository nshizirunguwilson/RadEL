"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui";
import { toast } from "@/stores/toast";

export function Newsletter() {
  const t = useTranslations("home.newsletter");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      toast.error(t("emailInvalid"));
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      toast.success(t("success"));
      setEmail("");
      setSubmitting(false);
    }, 400);
  }

  return (
    <section className="container-editorial py-24 text-center">
      <p className="eyebrow">{t("eyebrow")}</p>
      <h2 className="mt-3 max-w-xl mx-auto">{t("title")}</h2>
      <p className="mt-4 max-w-lg mx-auto text-ink">{t("body")}</p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 mx-auto flex max-w-md items-center gap-2"
      >
        <label className="sr-only" htmlFor="newsletter-email">
          {t("placeholder")}
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("placeholder")}
          className="flex-1 h-12 bg-bg border border-divider px-4 text-sm text-ink-strong rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-ink-strong"
        />
        <Button type="submit" size="md" disabled={submitting}>
          {t("submit")}
        </Button>
      </form>
    </section>
  );
}
