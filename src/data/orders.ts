import type { Order } from "@/types/order";

export const MOCK_ORDERS: Order[] = [
  {
    id: "order_1",
    number: "RAD-482901",
    placedAt: "2026-03-18T14:02:00.000Z",
    status: "delivered",
    currency: "USD",
    items: [
      {
        productId: "p001",
        variantId: "p001-v1",
        name: "Mara Gold Hoops",
        variantLabel: "Small · 18k Gold",
        image:
          "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=600&q=80",
        priceUSD: 420,
        quantity: 1,
      },
      {
        productId: "p016",
        variantId: "p016-v1",
        name: "Lune Pendant",
        variantLabel: "18k Gold · Diamond",
        image:
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80",
        priceUSD: 680,
        quantity: 1,
      },
    ],
    subtotalUSD: 1100,
    shippingUSD: 0,
    taxUSD: 82.5,
    totalUSD: 1182.5,
    shippingAddress: {
      fullName: "Wilson Nshizirungu",
      line1: "KG 9 Avenue",
      city: "Kigali",
      postalCode: "00000",
      country: "Rwanda",
      phone: "+250 791 847 408",
    },
    billingAddress: {
      fullName: "Wilson Nshizirungu",
      line1: "KG 9 Avenue",
      city: "Kigali",
      postalCode: "00000",
      country: "Rwanda",
      phone: "+250 791 847 408",
    },
    carrier: "DHL Express",
    tracking: "7741 8820 4419",
    timeline: [
      { status: "placed", at: "2026-03-18T14:02:00.000Z" },
      { status: "packed", at: "2026-03-19T10:20:00.000Z" },
      { status: "shipped", at: "2026-03-20T08:41:00.000Z" },
      { status: "out-for-delivery", at: "2026-03-24T07:15:00.000Z" },
      { status: "delivered", at: "2026-03-24T14:02:00.000Z" },
    ],
  },
  {
    id: "order_2",
    number: "RAD-391227",
    placedAt: "2026-04-10T09:30:00.000Z",
    status: "shipped",
    currency: "USD",
    items: [
      {
        productId: "p031",
        variantId: "p031-v1",
        name: "Solitaire Ring",
        variantLabel: "Size 6 · 18k Gold · Diamond",
        image:
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
        priceUSD: 1180,
        quantity: 1,
      },
    ],
    subtotalUSD: 1180,
    shippingUSD: 0,
    taxUSD: 88.5,
    totalUSD: 1268.5,
    shippingAddress: {
      fullName: "Wilson Nshizirungu",
      line1: "KG 9 Avenue",
      city: "Kigali",
      postalCode: "00000",
      country: "Rwanda",
      phone: "+250 791 847 408",
    },
    billingAddress: {
      fullName: "Wilson Nshizirungu",
      line1: "KG 9 Avenue",
      city: "Kigali",
      postalCode: "00000",
      country: "Rwanda",
      phone: "+250 791 847 408",
    },
    carrier: "DHL Express",
    tracking: "7741 8820 8835",
    timeline: [
      { status: "placed", at: "2026-04-10T09:30:00.000Z" },
      { status: "packed", at: "2026-04-11T11:00:00.000Z" },
      { status: "shipped", at: "2026-04-12T09:15:00.000Z" },
    ],
  },
];

export function getOrderByNumber(number: string): Order | undefined {
  return MOCK_ORDERS.find((o) => o.number === number);
}
