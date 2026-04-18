"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button, Input, Label, Textarea } from "@/components/ui";
import { toast } from "@/stores/toast";

type Subject = "general" | "order" | "commission" | "press";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<Subject>("general");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Invalid email";
    if (message.trim().length < 10) next.message = "Please give us a few more words";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setName("");
      setEmail("");
      setSubject("general");
      setMessage("");
      toast.success(t("success"));
    }, 500);
  }

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label className="text-xs uppercase tracking-[0.12em] text-meta">
            {t("name")}
          </Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="mt-1.5"
          />
          {errors.name ? (
            <p className="mt-1 text-xs text-sale">{errors.name}</p>
          ) : null}
        </div>
        <div>
          <Label className="text-xs uppercase tracking-[0.12em] text-meta">
            {t("email")}
          </Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="mt-1.5"
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-sale">{errors.email}</p>
          ) : null}
        </div>
      </div>
      <div>
        <Label className="text-xs uppercase tracking-[0.12em] text-meta">
          {t("subject")}
        </Label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value as Subject)}
          className="mt-1.5 h-11 w-full rounded-sm border border-divider bg-bg px-3 text-sm text-ink-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {(["general", "order", "commission", "press"] as const).map((s) => (
            <option key={s} value={s}>
              {t(`subjects.${s}`)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label className="text-xs uppercase tracking-[0.12em] text-meta">
          {t("message")}
        </Label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="mt-1.5"
        />
        {errors.message ? (
          <p className="mt-1 text-xs text-sale">{errors.message}</p>
        ) : null}
      </div>
      <Button type="submit" size="md" disabled={sending}>
        {sending ? "Sending…" : t("submit")}
      </Button>
    </form>
  );
}
