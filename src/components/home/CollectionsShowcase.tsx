import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

const TILES = [
  {
    href: "/shop/necklaces",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1400&q=80",
    alt: "Fine pendant necklace on stone surface",
    label: "Lune · Necklaces",
    detail: "Crescents and chains you layer without thinking.",
  },
  {
    href: "/shop/rings",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=80",
    alt: "Cluster of rings in mixed metals",
    label: "Solitaire · Rings",
    detail: "Quiet centers, hand-set prongs, sized precisely.",
  },
  {
    href: "/shop/earrings",
    image:
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1400&q=80",
    alt: "Gold hoop earrings on warm linen",
    label: "Mara · Hoops",
    detail: "The piece the atelier reaches for first.",
  },
];

export async function CollectionsShowcase() {
  const t = await getTranslations("home.collections");
  return (
    <section className="container-wide py-20">
      <div className="mb-10 max-w-xl">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h2 className="mt-3">{t("title")}</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {TILES.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className="group block"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-surface">
              <Image
                src={tile.image}
                alt={tile.alt}
                fill
                sizes="(min-width:1024px) 30vw, 90vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="mt-4 font-display text-xl text-ink-strong">{tile.label}</p>
            <p className="mt-1 text-sm text-meta leading-relaxed">{tile.detail}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
