"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NewsletterState {
  email: string | null;
  subscribedAt: string | null;
  subscribe: (email: string) => void;
  unsubscribe: () => void;
}

export const useNewsletterStore = create<NewsletterState>()(
  persist(
    (set) => ({
      email: null,
      subscribedAt: null,
      subscribe: (email) =>
        set({ email: email.trim().toLowerCase(), subscribedAt: new Date().toISOString() }),
      unsubscribe: () => set({ email: null, subscribedAt: null }),
    }),
    { name: "radel:newsletter", version: 1 },
  ),
);
