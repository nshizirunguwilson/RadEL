export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  topic: "orders" | "shipping" | "returns" | "care" | "materials" | "sizing";
}

export const FAQS: FaqItem[] = [
  {
    id: "f1",
    topic: "orders",
    question: "How long does it take to prepare my order?",
    answer:
      "Pieces that are in stock leave the atelier within two business days. Made-to-order and engraved pieces take seven to ten business days before shipping.",
  },
  {
    id: "f2",
    topic: "orders",
    question: "Can I change or cancel an order after placing it?",
    answer:
      "You can edit or cancel an order within four hours of placement. After that the piece has been assigned to the atelier and cannot be changed; you may still return it once delivered.",
  },
  {
    id: "f3",
    topic: "orders",
    question: "Do you offer engraving?",
    answer:
      "Engraving is available on the Meridian bar, rectangle signets, and ID bracelets. It is free with purchase and adds two business days to preparation time.",
  },
  {
    id: "f4",
    topic: "shipping",
    question: "Which countries do you ship to?",
    answer:
      "RadEl ships worldwide with insured tracked delivery. East Africa and EU destinations arrive in three to five business days; North America and the rest of the world in five to seven.",
  },
  {
    id: "f5",
    topic: "shipping",
    question: "Is shipping free?",
    answer:
      "Shipping is complimentary on orders over $250 USD equivalent. Below that threshold a flat $18 rate applies. Duties and import taxes are paid by the recipient.",
  },
  {
    id: "f6",
    topic: "shipping",
    question: "Will I need to sign for my delivery?",
    answer:
      "Yes. All RadEl shipments require a signature on delivery. You can redirect the package to a different address from the tracking link before the first delivery attempt.",
  },
  {
    id: "f7",
    topic: "returns",
    question: "What is your returns policy?",
    answer:
      "Unworn pieces in their original packaging can be returned within 30 days for a full refund. Return shipping is free within East Africa and the EU; a flat $20 applies elsewhere.",
  },
  {
    id: "f8",
    topic: "returns",
    question: "Can I return engraved or made-to-order pieces?",
    answer:
      "Engraved pieces and sized rings outside the stocked range are final sale, as each piece is made specifically for your order. You may still request a resize under our free-for-life policy.",
  },
  {
    id: "f9",
    topic: "returns",
    question: "How long do refunds take?",
    answer:
      "Refunds are issued within three business days of receiving the returned piece. Banks typically take another two to five business days to post the refund to your statement.",
  },
  {
    id: "f10",
    topic: "care",
    question: "How do I care for my pieces?",
    answer:
      "Avoid chlorine, salt water, and lotions. Wipe pieces gently with a soft cloth after wear and store them flat in the provided pouch, away from harder stones that could scratch the finish.",
  },
  {
    id: "f11",
    topic: "care",
    question: "Do you offer repairs and repolishing?",
    answer:
      "Yes. Professional repolishing is free for life on every piece. Repairs for general wear are offered at cost; impact damage is quoted after inspection.",
  },
  {
    id: "f12",
    topic: "materials",
    question: "Do you use recycled gold?",
    answer:
      "All our gold is recycled and refined to hallmark standards. We work with 14k and 18k in yellow, rose, and white gold, plus 925 sterling silver and platinum for selected pieces.",
  },
  {
    id: "f13",
    topic: "materials",
    question: "Are your diamonds ethically sourced?",
    answer:
      "We use lab-grown diamonds in most pieces and conflict-free natural diamonds with SCS certification in the remainder. Each piece's product page specifies which it carries.",
  },
  {
    id: "f14",
    topic: "sizing",
    question: "How do I know my ring size?",
    answer:
      "Order a free at-home sizing kit at checkout. Measurement takes under a minute; sizing is the single most common cause of return, so we encourage every first-time customer to use it.",
  },
  {
    id: "f15",
    topic: "sizing",
    question: "Can I resize a ring after purchase?",
    answer:
      "Rings are resized free for life at the atelier within two sizes up or down. Engraved signet rings are resized from the shank to preserve the engraving.",
  },
  {
    id: "f16",
    topic: "sizing",
    question: "What necklace length should I choose?",
    answer:
      "Sixteen inches sits at the collarbone on most wearers; eighteen inches falls just below. Twenty and twenty-two are worn with longer necklines. When in doubt, order two and layer.",
  },
];
