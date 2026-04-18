"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type CurrencyCode, DEFAULT_CURRENCY } from "@/data/currencies";

interface UiState {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;

  announcementDismissed: boolean;
  dismissAnnouncement: () => void;

  cartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;

  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  recentSearches: string[];
  pushRecentSearch: (q: string) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      currency: DEFAULT_CURRENCY,
      setCurrency: (currency) => set({ currency }),

      announcementDismissed: false,
      dismissAnnouncement: () => set({ announcementDismissed: true }),

      cartDrawerOpen: false,
      openCartDrawer: () => set({ cartDrawerOpen: true }),
      closeCartDrawer: () => set({ cartDrawerOpen: false }),

      searchOpen: false,
      openSearch: () => set({ searchOpen: true }),
      closeSearch: () => set({ searchOpen: false }),
      recentSearches: [],
      pushRecentSearch: (q) =>
        set((state) => {
          const trimmed = q.trim();
          if (!trimmed) return state;
          const next = [trimmed, ...state.recentSearches.filter((s) => s !== trimmed)].slice(0, 5);
          return { recentSearches: next };
        }),
    }),
    {
      name: "radel:ui",
      version: 1,
      partialize: (state) => ({
        currency: state.currency,
        announcementDismissed: state.announcementDismissed,
        recentSearches: state.recentSearches,
      }),
    },
  ),
);
