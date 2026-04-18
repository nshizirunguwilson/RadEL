import { getTranslations, setRequestLocale } from "next-intl/server";

import { FAQS } from "@/data/faqs";
import { FaqClient } from "@/components/faqs/FaqClient";

type Params = Promise<{ locale: string }>;

export const metadata = {
  title: "FAQ",
  description:
    "Everything you'd want to know about RadEl — orders, shipping, returns, materials, sizing, and care.",
};

export default async function FaqPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faqs");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="container-editorial py-16 md:py-24 text-center">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="mt-4 max-w-xl mx-auto">{t("title")}</h1>
        <p className="mt-5 max-w-md mx-auto text-ink leading-relaxed">
          {t("body")}
        </p>
      </section>
      <section className="container-editorial pb-24">
        <FaqClient />
      </section>
    </main>
  );
}
