import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui";

export async function Hero() {
  const t = await getTranslations("home.hero");
  return (
    <section className="container-wide pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1 className="mt-6 max-w-xl">{t("title")}</h1>
          <p className="mt-6 max-w-lg text-base text-ink leading-relaxed">
            {t("body")}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/shop">{t("primaryCta")}</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/about">{t("secondaryCta")}</Link>
            </Button>
          </div>
        </div>
        <div className="relative aspect-[4/5] md:aspect-[5/6] overflow-hidden rounded-sm bg-surface">
          <Image
            src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1600&q=80"
            alt="Hand-finished gold jewelry on a warm neutral backdrop"
            fill
            priority
            sizes="(min-width:768px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
