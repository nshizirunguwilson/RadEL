"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  FiUser,
  FiShoppingBag,
  FiMapPin,
  FiHeart,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth";
import { useHasHydrated } from "@/stores/useHasHydrated";
import { Button } from "@/components/ui";

const ITEMS = [
  { href: "/account", key: "profile", icon: FiUser },
  { href: "/account/orders", key: "orders", icon: FiShoppingBag },
  { href: "/account/addresses", key: "addresses", icon: FiMapPin },
  { href: "/wishlist", key: "wishlist", icon: FiHeart },
  { href: "/account/settings", key: "settings", icon: FiSettings },
] as const;

export function AccountShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations("account");
  const router = useRouter();
  const pathname = usePathname();
  const hydrated = useHasHydrated();
  const user = useAuthStore((s) => s.user);
  const signedIn = useAuthStore((s) => s.isSignedIn);
  const signOut = useAuthStore((s) => s.signOut);

  if (!hydrated) {
    return (
      <main id="main" className="container-wide py-16">
        <div className="h-64 animate-pulse rounded-sm bg-surface" />
      </main>
    );
  }

  if (!signedIn || !user) {
    return (
      <main
        id="main"
        className="container-editorial py-24 text-center min-h-[60dvh] flex flex-col items-center justify-center"
      >
        <p className="eyebrow">{t("title")}</p>
        <h1 className="mt-4 font-display text-3xl text-ink-strong">
          Sign in to continue.
        </h1>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link href="/sign-in">
            <Button size="md">Sign in</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="outline" size="md">
              Create account
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  function handleSignOut() {
    signOut();
    router.push("/");
  }

  return (
    <main id="main" className="container-wide py-12 md:py-16">
      <header className="mb-10">
        <p className="eyebrow">{t("title")}</p>
        <h1 className="mt-3 font-display text-3xl md:text-4xl text-ink-strong">
          {t("greeting", { firstName: user.firstName })}
        </h1>
      </header>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Account navigation">
          <ul className="space-y-1">
            {ITEMS.map((item) => {
              const active =
                item.href === "/account"
                  ? pathname?.endsWith("/account")
                  : pathname?.includes(item.href);
              const Icon = item.icon;
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors",
                      active
                        ? "bg-surface text-ink-strong"
                        : "text-meta hover:bg-surface/60 hover:text-ink-strong",
                    )}
                  >
                    <Icon aria-hidden className="h-4 w-4" />
                    <span>{t(`sidebar.${item.key}`)}</span>
                  </Link>
                </li>
              );
            })}
            <li className="pt-2 mt-2 border-t border-divider">
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-meta hover:bg-surface/60 hover:text-ink-strong"
              >
                <FiLogOut aria-hidden className="h-4 w-4" />
                {t("sidebar.signOut")}
              </button>
            </li>
          </ul>
        </nav>
        <section>{children}</section>
      </div>
    </main>
  );
}
