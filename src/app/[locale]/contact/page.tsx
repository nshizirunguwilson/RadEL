import { FiInstagram, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ContactForm } from "@/components/contact/ContactForm";

type Params = Promise<{ locale: string }>;

export const metadata = {
  title: "Contact",
  description:
    "Questions, commissions, or a conversation — we answer every message within one business day from our Kigali atelier.",
};

// Kigali, Rwanda — coordinates for the atelier area
const MAP_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=30.0550%2C-1.9600%2C30.0800%2C-1.9400&layer=mapnik&marker=-1.9500%2C30.0675";

export default async function ContactPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <main id="main">
      <section className="container-editorial py-20 md:py-24 text-center">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="mt-4 max-w-2xl mx-auto">{t("title")}</h1>
        <p className="mt-5 max-w-md mx-auto text-ink leading-relaxed">
          {t("body")}
        </p>
      </section>

      <section className="container-wide pb-20">
        <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
          <ContactForm />
          <aside className="space-y-6 md:border-l md:border-divider md:pl-10">
            <div>
              <p className="eyebrow text-[10px] mb-3">{t("info.title")}</p>
              <ul className="space-y-3 text-sm text-ink">
                <li className="flex items-start gap-3">
                  <FiMapPin
                    aria-hidden
                    className="h-4 w-4 mt-0.5 text-meta shrink-0"
                  />
                  <span>{t("info.address")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <FiMail
                    aria-hidden
                    className="h-4 w-4 mt-0.5 text-meta shrink-0"
                  />
                  <a
                    href={`mailto:${t("info.email")}`}
                    className="hover:text-accent"
                  >
                    {t("info.email")}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <FiPhone
                    aria-hidden
                    className="h-4 w-4 mt-0.5 text-meta shrink-0"
                  />
                  <a
                    href={`tel:${t("info.phone").replace(/\s/g, "")}`}
                    className="hover:text-accent"
                  >
                    {t("info.phone")}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <FiInstagram
                    aria-hidden
                    className="h-4 w-4 mt-0.5 text-meta shrink-0"
                  />
                  <a
                    href="https://instagram.com/nshizirungu.w"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent"
                  >
                    {t("info.instagram")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow text-[10px] mb-3">Hours</p>
              <p className="text-sm text-ink">{t("info.hours")}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-divider">
        <div className="relative aspect-[21/9] md:aspect-[16/5] bg-surface">
          <iframe
            src={MAP_SRC}
            className="absolute inset-0 h-full w-full border-0"
            title="Map of the RadEl atelier in Kigali"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
