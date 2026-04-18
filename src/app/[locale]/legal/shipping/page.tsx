import { setRequestLocale } from "next-intl/server";

import { LegalPage } from "@/components/legal/LegalPage";

type Params = Promise<{ locale: string }>;

export const metadata = {
  title: "Shipping",
  description: "How RadEl packs, ships, and delivers your order.",
};

export default async function ShippingPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <LegalPage title="Shipping" updated="April 2026">
      <section>
        <h2 className="font-display text-xl text-ink-strong">Delivery windows</h2>
        <p className="mt-3">
          In-stock pieces ship within two business days of your order. Made-to-order
          pieces take three weeks at the bench. You&apos;ll receive an email the moment
          your parcel leaves the atelier.
        </p>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink-strong">Options and costs</h2>
        <ul className="mt-3 space-y-2 list-disc pl-5">
          <li>Standard — 5 to 7 business days — complimentary over $250.</li>
          <li>Express — 2 to 3 business days — $25.</li>
          <li>Signature — 1 to 2 business days, signed for on delivery — $45.</li>
        </ul>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink-strong">Duties and customs</h2>
        <p className="mt-3">
          International orders may incur import duties upon arrival. These are
          the customer&apos;s responsibility and are not included in the order total.
        </p>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink-strong">Packaging</h2>
        <p className="mt-3">
          Every piece arrives in a cotton pouch inside a recyclable linen box,
          wrapped in tissue. The box is built to be reused — for earrings, for a
          ring, for whatever you keep close.
        </p>
      </section>
    </LegalPage>
  );
}
