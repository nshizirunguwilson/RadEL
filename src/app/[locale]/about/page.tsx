import Image from "next/image";
import { FiPlay } from "react-icons/fi";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { FeaturesStrip } from "@/components/home/FeaturesStrip";

type Params = Promise<{ locale: string }>;

export const metadata = {
  title: "About",
  description:
    "RadEl began at a bench in Kigali in 2022. One person, one torch, and a conviction that fine jewelry should be quiet enough to live in.",
};

export default async function AboutPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const values = ["materials", "stones", "craft", "care"] as const;

  return (
    <main id="main">
      <section className="container-editorial py-20 md:py-28 text-center">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="mt-4 max-w-3xl mx-auto">{t("title")}</h1>
        <p className="mt-6 max-w-xl mx-auto text-ink leading-relaxed">
          {t("body")}
        </p>
      </section>

      <section className="container-wide pb-24">
        <div className="grid gap-10 md:grid-cols-[2fr_3fr] items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface">
            <Image
              src="/about/founder-wilson.jpg"
              alt="Wilson Nshizirungu at the RadEl bench in Kigali"
              fill
              sizes="(min-width:768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">{t("founderTitle")}</p>
            <h2 className="mt-3 max-w-lg">A bench, a torch, a long conversation.</h2>
            <p className="mt-6 text-ink leading-relaxed max-w-prose">
              I founded RadEl in 2022 with a single bench and a specific belief:
              that fine jewelry should be quiet enough to live in. Every piece
              is drawn in Kigali, cast in recycled metal, and finished by the
              same two hands before it leaves the atelier.
            </p>
            <p className="mt-5 text-ink leading-relaxed max-w-prose">
              We keep runs small — no style exceeds forty pieces — and we offer
              complimentary resizing, cleaning, and tightening for as long as
              you wear the piece. A thing made to be lived in should be
              maintained that way.
            </p>
            <button
              type="button"
              className="mt-8 inline-flex items-center gap-2 text-sm text-ink-strong hover:text-accent"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-divider">
                <FiPlay aria-hidden className="h-3.5 w-3.5 translate-x-0.5" />
              </span>
              {t("video")}
            </button>
          </div>
        </div>
      </section>

      <section className="bg-surface/40 border-y border-divider">
        <div className="container-wide py-20">
          <div className="max-w-xl mb-12">
            <p className="eyebrow">{t("values.eyebrow")}</p>
            <h2 className="mt-3">Four small commitments.</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v}>
                <h3 className="font-display text-xl text-ink-strong">
                  {t(`values.items.${v}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink">
                  {t(`values.items.${v}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturesStrip />
    </main>
  );
}
