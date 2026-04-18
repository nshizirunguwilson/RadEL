"use client";

import { create } from "zustand";

export interface ToastPayload {
  id: string;
  title: string;
  description?: string;
  tone?: "default" | "success" | "error";
  action?: { label: string; onClick: () => void };
  durationMs?: number;
}

interface ToastState {
  toasts: ToastPayload[];
  push: (payload: Omit<ToastPayload, "id">) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (payload) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const toast: ToastPayload = { id, durationMs: 4000, tone: "default", ...payload };
    set((state) => ({ toasts: [...state.toasts, toast] }));
    if (toast.durationMs) {
      setTimeout(() => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
      }, toast.durationMs);
    }
    return id;
  },
  dismiss: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
  clear: () => set({ toasts: [] }),
}));

export const toast = {
  success: (title: string, description?: string) =>
    useToastStore.getState().push({ title, description, tone: "success" }),
  error: (title: string, description?: string) =>
    useToastStore.getState().push({ title, description, tone: "error" }),
  info: (title: string, description?: string) =>
    useToastStore.getState().push({ title, description, tone: "default" }),
};
