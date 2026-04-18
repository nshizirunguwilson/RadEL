import Image from "next/image";
import { FiInstagram } from "react-icons/fi";
import { getTranslations } from "next-intl/server";

const IG_TILES = [
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=700&q=80",
];

export async function InstagramStrip() {
  const t = await getTranslations("home.instagram");
  return (
    <section className="container-wide py-20">
      <div className="mb-8 flex flex-col items-start md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="mt-3">{t("title")}</h2>
          <p className="mt-3 text-sm text-meta">{t("body")}</p>
        </div>
        <a
          href="https://instagram.com/nshizirungu.w"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-ink-strong hover:text-accent"
        >
          <FiInstagram aria-hidden className="h-4 w-4" />
          @nshizirungu.w
        </a>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {IG_TILES.map((src, i) => (
          <a
            key={src}
            href="https://instagram.com/nshizirungu.w"
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden rounded-sm bg-surface group"
          >
            <Image
              src={src}
              alt={`Instagram gallery image ${i + 1}`}
              fill
              sizes="(min-width:768px) 15vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
