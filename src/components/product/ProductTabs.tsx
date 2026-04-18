"use client";

import { useTranslations } from "next-intl";

import type { Product } from "@/types/product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";

export function ProductTabs({ product }: { product: Product }) {
  const t = useTranslations("product.tabs");
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList>
        <TabsTrigger value="description">{t("description")}</TabsTrigger>
        <TabsTrigger value="materials">{t("materialsAndCare")}</TabsTrigger>
        <TabsTrigger value="shipping">{t("shippingAndReturns")}</TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        <p className="max-w-3xl text-sm leading-relaxed text-ink whitespace-pre-line">
          {product.description}
        </p>
      </TabsContent>
      <TabsContent value="materials">
        <p className="max-w-3xl text-sm leading-relaxed text-ink whitespace-pre-line">
          {product.materialsAndCare}
        </p>
      </TabsContent>
      <TabsContent value="shipping">
        <p className="max-w-3xl text-sm leading-relaxed text-ink whitespace-pre-line">
          {product.shippingAndReturns}
        </p>
      </TabsContent>
    </Tabs>
  );
}
