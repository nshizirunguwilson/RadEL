import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/home/Hero";
import { FeaturesStrip } from "@/components/home/FeaturesStrip";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { Bestsellers } from "@/components/home/Bestsellers";
import { FlashSale } from "@/components/home/FlashSale";
import { NewArrivals } from "@/components/home/NewArrivals";
import { CollectionsShowcase } from "@/components/home/CollectionsShowcase";
import { Testimonials } from "@/components/home/Testimonials";
import { BlogPreview } from "@/components/home/BlogPreview";
import { InstagramStrip } from "@/components/home/InstagramStrip";
import { Newsletter } from "@/components/home/Newsletter";

type Params = Promise<{ locale: string }>;

export default async function HomePage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">
      <Hero />
      <FeaturesStrip />
      <CategoriesGrid />
      <Bestsellers />
      <FlashSale />
      <NewArrivals />
      <CollectionsShowcase />
      <Testimonials />
      <BlogPreview />
      <InstagramStrip />
      <Newsletter />
    </main>
  );
}
