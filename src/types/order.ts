import type { CurrencyCode } from "@/data/currencies";

export type OrderStatus =
  | "placed"
  | "packed"
  | "shipped"
  | "out-for-delivery"
  | "delivered"
  | "cancelled";

export interface OrderAddress {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  region?: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface OrderLineItem {
  productId: string;
  variantId: string;
  name: string;
  variantLabel: string;
  image: string;
  priceUSD: number;
  quantity: number;
}

export interface OrderTimelineEntry {
  status: OrderStatus;
  at: string;
  note?: string;
}

export interface Order {
  id: string;
  number: string;
  placedAt: string;
  status: OrderStatus;
  currency: CurrencyCode;
  items: OrderLineItem[];
  subtotalUSD: number;
  shippingUSD: number;
  taxUSD: number;
  totalUSD: number;
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  carrier?: string;
  tracking?: string;
  timeline: OrderTimelineEntry[];
}
