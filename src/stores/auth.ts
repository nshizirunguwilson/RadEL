"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MockUser } from "@/types/user";
import type { OrderAddress } from "@/types/order";

// NOT REAL AUTH — demo flag only. No credentials stored or transmitted.

interface AuthState {
  user: MockUser | null;
  isSignedIn: boolean;
  signIn: (email: string) => void;
  signUp: (firstName: string, lastName: string, email: string) => void;
  signOut: () => void;
  updateProfile: (patch: Partial<MockUser>) => void;
  addAddress: (address: OrderAddress) => string;
  updateAddress: (id: string, patch: Partial<OrderAddress>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const buildMockUser = (firstName: string, lastName: string, email: string): MockUser => ({
  id: `user_${Date.now()}`,
  firstName,
  lastName,
  email,
  phone: "",
  addresses: [],
  createdAt: new Date().toISOString(),
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isSignedIn: false,
      signIn: (email) => {
        const existing = get().user;
        if (existing && existing.email === email) {
          set({ isSignedIn: true });
          return;
        }
        const guess = email.split("@")[0] ?? "friend";
        const firstName = guess.charAt(0).toUpperCase() + guess.slice(1);
        set({ user: buildMockUser(firstName, "", email), isSignedIn: true });
      },
      signUp: (firstName, lastName, email) => {
        set({ user: buildMockUser(firstName, lastName, email), isSignedIn: true });
      },
      signOut: () => set({ isSignedIn: false }),
      updateProfile: (patch) =>
        set((state) =>
          state.user ? { user: { ...state.user, ...patch } } : state,
        ),
      addAddress: (address) => {
        const id = `addr_${Date.now()}`;
        set((state) =>
          state.user
            ? {
                user: {
                  ...state.user,
                  addresses: [...state.user.addresses, { ...address }],
                  defaultAddressId: state.user.defaultAddressId ?? id,
                },
              }
            : state,
        );
        return id;
      },
      updateAddress: (id, patch) =>
        set((state) => {
          if (!state.user) return state;
          const addresses = state.user.addresses.map((a, idx) =>
            `addr_${idx}` === id ? { ...a, ...patch } : a,
          );
          return { user: { ...state.user, addresses } };
        }),
      removeAddress: (id) =>
        set((state) => {
          if (!state.user) return state;
          const addresses = state.user.addresses.filter((_, idx) => `addr_${idx}` !== id);
          return { user: { ...state.user, addresses } };
        }),
      setDefaultAddress: (id) =>
        set((state) =>
          state.user ? { user: { ...state.user, defaultAddressId: id } } : state,
        ),
    }),
    { name: "radel:auth", version: 1 },
  ),
);
