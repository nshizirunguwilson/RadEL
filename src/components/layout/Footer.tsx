"use client";

import Link from "next/link";
import { useState } from "react";
import { FiInstagram, FiChevronRight } from "react-icons/fi";
import { FaTiktok, FaPinterestP } from "react-icons/fa6";
import { useTranslations } from "next-intl";

import { FOOTER_GROUPS, SOCIAL_LINKS } from "@/data/footerLinks";
import { CurrencySwitcher } from "@/components/common/CurrencySwitcher";
import { toast } from "@/stores/toast";

function SocialIcon({ icon }: { icon: "instagram" | "tiktok" | "pinterest" }) {
  const cls = "h-4 w-4";
  if (icon === "instagram") return <FiInstagram className={cls} aria-hidden />;
  if (icon === "tiktok") return <FaTiktok className={cls} aria-hidden />;
  return <FaPinterestP className={cls} aria-hidden />;
}

export function Footer() {
  const t = useTranslations("footer");
  const toastCopy = useTranslations("toast");
  const [email, setEmail] = useState("");
  const year = new Date().getFullYear();

  const groupTitles = {
    shop: t("shop"),
    company: t("company"),
    support: t("support"),
    legal: t("legal"),
  } as const;

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || email.length < 5) {
      toast.error(toastCopy("genericError"));
      return;
    }
    toast.success(toastCopy("subscribed"));
    setEmail("");
  }

  return (
    <footer className="mt-24 border-t border-divider bg-surface/40">
      <div className="container-wide py-16 grid gap-12 lg:grid-cols-[1.2fr_2fr_1.2fr]">
        <div>
          <p className="font-display text-3xl tracking-[-0.02em] text-ink-strong">RadEl</p>
          <p className="mt-3 text-sm text-meta max-w-xs leading-relaxed">{t("tagline")}</p>
          <div className="mt-6 flex items-center gap-2">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-divider text-ink-strong hover:bg-surface"
              >
                <SocialIcon icon={s.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {FOOTER_GROUPS.map((group) => (
            <div key={group.titleKey}>
              <p className="eyebrow mb-4">{groupTitles[group.titleKey]}</p>
              <ul className="space-y-2.5">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-ink hover:text-ink-strong">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <p className="eyebrow mb-4">{t("newsletter.title")}</p>
          <p className="text-sm text-meta leading-relaxed mb-4">{t("newsletter.body")}</p>
          <form onSubmit={handleSubscribe} className="flex items-center gap-0 border-b border-divider focus-within:border-ink-strong transition-colors">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletter.placeholder")}
              aria-label={t("newsletter.placeholder")}
              className="flex-1 bg-transparent h-10 text-sm text-ink-strong placeholder:text-meta focus:outline-none"
            />
            <button
              type="submit"
              aria-label={t("newsletter.submit")}
              className="inline-flex h-10 w-10 items-center justify-center text-ink-strong hover:text-accent"
            >
              <FiChevronRight aria-hidden className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-divider">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-meta">{t("copyright", { year })}</p>
          <CurrencySwitcher />
        </div>
      </div>
    </footer>
  );
}
