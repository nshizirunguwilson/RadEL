import { setRequestLocale } from "next-intl/server";

import { LegalPage } from "@/components/legal/LegalPage";

type Params = Promise<{ locale: string }>;

export const metadata = {
  title: "Returns",
  description: "How to return or exchange a piece from RadEl.",
};

export default async function ReturnsPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <LegalPage title="Returns & Exchanges" updated="April 2026">
      <section>
        <h2 className="font-display text-xl text-ink-strong">Thirty days to decide</h2>
        <p className="mt-3">
          You have thirty days from delivery to return an unworn piece for a
          full refund. We cover return shipping on defective items; otherwise,
          a flat $15 label is deducted from your refund.
        </p>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink-strong">What we can&apos;t accept</h2>
        <p className="mt-3">
          Made-to-order pieces, engraved pieces, and earrings (for hygiene) are
          final sale unless defective. If anything arrives damaged, write to us
          the same day and we&apos;ll make it right.
        </p>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink-strong">How to start a return</h2>
        <ol className="mt-3 space-y-2 list-decimal pl-5">
          <li>
            Write to{" "}
            <a className="underline decoration-accent underline-offset-4" href="mailto:returns@rad-el.com">
              returns@rad-el.com
            </a>{" "}
            with your order number.
          </li>
          <li>We send a prepaid label within one business day.</li>
          <li>
            Drop the parcel at any carrier point. Refunds arrive within five
            business days of receipt.
          </li>
        </ol>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink-strong">Lifetime care</h2>
        <p className="mt-3">
          Separately from returns: every piece comes with complimentary
          resizing, cleaning, and tightening at our Kigali atelier — for as long
          as you wear it.
        </p>
      </section>
    </LegalPage>
  );
}
