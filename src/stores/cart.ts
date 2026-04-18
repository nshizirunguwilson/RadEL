"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  variantLabel: string;
  image: string;
  priceUSD: number;
  compareAtUSD?: number;
  quantity: number;
}

export interface PromoCode {
  code: string;
  percentOff: number;
}

interface CartState {
  items: CartItem[];
  promo: PromoCode | null;
  add: (item: CartItem) => void;
  remove: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clear: () => void;
  applyPromo: (code: string) => PromoCode | null;
  clearPromo: () => void;
}

const PROMO_CODES: Record<string, PromoCode> = {
  RADEL25: { code: "RADEL25", percentOff: 25 },
  ATELIER10: { code: "ATELIER10", percentOff: 10 },
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      promo: null,
      add: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.variantId === item.variantId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      remove: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        })),
      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.variantId !== variantId)
              : state.items.map((i) =>
                  i.variantId === variantId ? { ...i, quantity } : i,
                ),
        })),
      clear: () => set({ items: [], promo: null }),
      applyPromo: (code) => {
        const normalized = code.trim().toUpperCase();
        const match = PROMO_CODES[normalized] ?? null;
        set({ promo: match });
        return match;
      },
      clearPromo: () => set({ promo: null }),
    }),
    { name: "radel:cart", version: 1 },
  ),
);

export const selectLineCount = (state: CartState): number =>
  state.items.reduce((acc, item) => acc + item.quantity, 0);

export const selectSubtotalUSD = (state: CartState): number =>
  state.items.reduce((acc, item) => acc + item.priceUSD * item.quantity, 0);

export const selectDiscountUSD = (state: CartState): number => {
  if (!state.promo) return 0;
  const subtotal = state.items.reduce(
    (acc, item) => acc + item.priceUSD * item.quantity,
    0,
  );
  return (subtotal * state.promo.percentOff) / 100;
};

export const selectShippingUSD = (state: CartState): number => {
  const subtotal = state.items.reduce(
    (acc, item) => acc + item.priceUSD * item.quantity,
    0,
  );
  if (state.items.length === 0) return 0;
  return subtotal >= 250 ? 0 : 18;
};

export const selectTotalUSD = (state: CartState): number => {
  const subtotal = selectSubtotalUSD(state);
  const discount = selectDiscountUSD(state);
  const shipping = selectShippingUSD(state);
  const taxable = Math.max(0, subtotal - discount);
  const tax = Math.round(taxable * 0.075 * 100) / 100;
  return Math.round((taxable + shipping + tax) * 100) / 100;
};
