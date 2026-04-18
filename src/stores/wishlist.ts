"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  productIds: string[];
  toggle: (productId: string) => boolean;
  remove: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],
      toggle: (productId) => {
        const isIn = get().productIds.includes(productId);
        if (isIn) {
          set((s) => ({ productIds: s.productIds.filter((id) => id !== productId) }));
          return false;
        }
        set((s) => ({ productIds: [productId, ...s.productIds] }));
        return true;
      },
      remove: (productId) =>
        set((s) => ({ productIds: s.productIds.filter((id) => id !== productId) })),
      has: (productId) => get().productIds.includes(productId),
      clear: () => set({ productIds: [] }),
    }),
    { name: "radel:wishlist", version: 1 },
  ),
);
