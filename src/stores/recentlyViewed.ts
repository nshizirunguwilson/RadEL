"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentlyViewedState {
  productIds: string[];
  push: (productId: string) => void;
  clear: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      productIds: [],
      push: (productId) =>
        set((state) => {
          const next = [productId, ...state.productIds.filter((id) => id !== productId)].slice(0, 10);
          return { productIds: next };
        }),
      clear: () => set({ productIds: [] }),
    }),
    { name: "radel:recently-viewed", version: 1 },
  ),
);
