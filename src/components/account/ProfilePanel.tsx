"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button, Input, Label } from "@/components/ui";
import { useAuthStore } from "@/stores/auth";
import { toast } from "@/stores/toast";

export function ProfilePanel() {
  const t = useTranslations("account.profile");
  const user = useAuthStore((s) => s.user);
  const update = useAuthStore((s) => s.updateProfile);
  const [firstName, setFirst] = useState(user?.firstName ?? "");
  const [lastName, setLast] = useState(user?.lastName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    update({ firstName, lastName, email, phone });
    toast.success(t("saved"));
  }

  return (
    <form onSubmit={submit} className="max-w-xl space-y-5">
      <h2 className="font-display text-2xl text-ink-strong">{t("title")}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-xs uppercase tracking-[0.12em] text-meta">
            {t("firstName")}
          </Label>
          <Input
            value={firstName}
            onChange={(e) => setFirst(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-[0.12em] text-meta">
            {t("lastName")}
          </Label>
          <Input
            value={lastName}
            onChange={(e) => setLast(e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>
      <div>
        <Label className="text-xs uppercase tracking-[0.12em] text-meta">
          {t("email")}
        </Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label className="text-xs uppercase tracking-[0.12em] text-meta">
          {t("phone")}
        </Label>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1.5"
        />
      </div>
      <Button type="submit" size="md">
        {t("save")}
      </Button>
    </form>
  );
}
