import { FiTruck, FiShield, FiHeart } from "react-icons/fi";
import { getTranslations } from "next-intl/server";

export async function FeaturesStrip() {
  const t = await getTranslations("home.features");
  const items = [
    { icon: FiTruck, key: "shipping" as const },
    { icon: FiShield, key: "payment" as const },
    { icon: FiHeart, key: "care" as const },
  ];
  return (
    <section className="border-y border-divider bg-surface/50">
      <div className="container-wide py-10 grid gap-6 md:grid-cols-3">
        {items.map(({ icon: Icon, key }) => (
          <div key={key} className="flex items-start gap-4">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-bg border border-divider text-ink-strong shrink-0">
              <Icon aria-hidden className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-ink-strong">{t(`${key}.title`)}</p>
              <p className="text-sm text-meta mt-0.5 leading-relaxed">{t(`${key}.body`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
