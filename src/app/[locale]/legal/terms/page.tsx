import { setRequestLocale } from "next-intl/server";

import { LegalPage } from "@/components/legal/LegalPage";

type Params = Promise<{ locale: string }>;

export const metadata = {
  title: "Terms",
  description: "The terms that govern use of the RadEl storefront and services.",
};

export default async function TermsPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <LegalPage title="Terms of Service" updated="April 2026">
      <section>
        <h2 className="font-display text-xl text-ink-strong">Using the site</h2>
        <p className="mt-3">
          By visiting rad-el.com you agree to these terms. If you don&apos;t, please
          don&apos;t use the site. The site and its contents are provided as-is,
          without warranties of any kind.
        </p>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink-strong">Orders and pricing</h2>
        <p className="mt-3">
          Prices are shown in your selected currency and may be converted at
          checkout. We reserve the right to correct errors and to decline or
          cancel orders in rare cases — you&apos;ll be notified and refunded promptly.
        </p>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink-strong">Intellectual property</h2>
        <p className="mt-3">
          All designs, photographs, and copy on this site belong to RadEl or
          are used with permission. You may share images and link to pages for
          personal use — please ask before reposting commercially.
        </p>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink-strong">Governing law</h2>
        <p className="mt-3">
          These terms are governed by the laws of the Republic of Rwanda.
          Questions? Write to{" "}
          <a className="underline decoration-accent underline-offset-4" href="mailto:hello@rad-el.com">
            hello@rad-el.com
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
