import { setRequestLocale } from "next-intl/server";

import { LegalPage } from "@/components/legal/LegalPage";

type Params = Promise<{ locale: string }>;

export const metadata = {
  title: "Privacy",
  description: "How RadEl collects, uses, and protects your information.",
};

export default async function PrivacyPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <LegalPage title="Privacy" updated="April 2026">
      <section>
        <h2 className="font-display text-xl text-ink-strong">What we collect</h2>
        <p className="mt-3">
          When you place an order, create an account, or subscribe to our letters,
          we collect the information you give us — name, email, shipping address,
          and payment details. We also collect basic device and usage information
          to keep the site working and improve it over time.
        </p>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink-strong">How we use it</h2>
        <p className="mt-3">
          We use your information to fulfill orders, answer your messages, send
          letters you asked for, and occasionally to tell you about new work.
          We do not sell or trade personal data to third parties for marketing.
        </p>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink-strong">Your choices</h2>
        <p className="mt-3">
          You can unsubscribe from letters at the bottom of any email. You can
          request a copy or deletion of your data by writing to{" "}
          <a className="underline decoration-accent underline-offset-4" href="mailto:hello@rad-el.com">
            hello@rad-el.com
          </a>
          .
        </p>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink-strong">Cookies</h2>
        <p className="mt-3">
          We use a small number of cookies and local-storage keys to remember
          your bag, wishlist, currency, and recent searches. These never leave
          your device.
        </p>
      </section>
    </LegalPage>
  );
}
