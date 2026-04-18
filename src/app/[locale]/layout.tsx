import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { Toaster } from "@/components/ui";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { SearchModal } from "@/components/layout/SearchModal";
import { routing } from "@/i18n/routing";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--next-font-display",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--next-font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#FAF6EE",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rad-el.vercel.app"),
  title: {
    default: "RadEl — Radiance Redefined, Elegance Delivered",
    template: "%s · RadEl",
  },
  description:
    "Fine jewelry crafted in small runs. Recycled 18k gold, conflict-free stones, and a lifetime of care from our Kigali atelier.",
  openGraph: {
    type: "website",
    siteName: "RadEl",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.ico" },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${fraunces.variable} ${poppins.variable}`}>
      <body className="min-h-dvh bg-bg text-ink antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <AnnouncementBar />
          <Header />
          {children}
          <Footer />
          <CartDrawer />
          <SearchModal />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
