"use client";

import { useEffect } from "react";
import { useRecentlyViewedStore } from "@/stores/recentlyViewed";

export function RecentlyViewedTracker({ productId }: { productId: string }) {
  const push = useRecentlyViewedStore((s) => s.push);
  useEffect(() => {
    push(productId);
  }, [productId, push]);
  return null;
}
