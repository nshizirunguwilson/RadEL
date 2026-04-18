"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ShippingMethod = "standard" | "express" | "signature";

export const SHIPPING_COST_USD: Record<ShippingMethod, number> = {
  standard: 0,
  express: 25,
  signature: 45,
};

export interface CheckoutAddress {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  line1: string;
  line2: string;
  city: string;
  region: string;
  postalCode: string;
}

export interface CheckoutPayment {
  cardNumber: string;
  expiry: string;
  cvc: string;
  nameOnCard: string;
}

interface CheckoutState {
  step: "address" | "shipping" | "payment" | "review";
  address: CheckoutAddress;
  shippingMethod: ShippingMethod;
  payment: CheckoutPayment;
  setStep: (step: CheckoutState["step"]) => void;
  setAddress: (address: CheckoutAddress) => void;
  setShippingMethod: (method: ShippingMethod) => void;
  setPayment: (payment: CheckoutPayment) => void;
  reset: () => void;
}

const EMPTY_ADDRESS: CheckoutAddress = {
  fullName: "",
  email: "",
  phone: "",
  country: "Rwanda",
  line1: "",
  line2: "",
  city: "",
  region: "",
  postalCode: "",
};

const EMPTY_PAYMENT: CheckoutPayment = {
  cardNumber: "",
  expiry: "",
  cvc: "",
  nameOnCard: "",
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      step: "address",
      address: EMPTY_ADDRESS,
      shippingMethod: "standard",
      payment: EMPTY_PAYMENT,
      setStep: (step) => set({ step }),
      setAddress: (address) => set({ address }),
      setShippingMethod: (shippingMethod) => set({ shippingMethod }),
      setPayment: (payment) => set({ payment }),
      reset: () =>
        set({
          step: "address",
          address: EMPTY_ADDRESS,
          shippingMethod: "standard",
          payment: EMPTY_PAYMENT,
        }),
    }),
    {
      name: "radel:checkout",
      version: 1,
      partialize: (state) => ({
        address: state.address,
        shippingMethod: state.shippingMethod,
      }),
    },
  ),
);
