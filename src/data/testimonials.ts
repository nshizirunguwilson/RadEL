export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  city: string;
  productSlug?: string;
  rating: 4 | 5;
}

// TODO(owner): replace placeholder quotes with real customer testimonials once collected.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "The Mara hoops have become the only earrings I reach for. The weight is right, the finish has held, and the hinge still clicks the way it did on day one.",
    author: "Amara K.",
    role: "Architect",
    city: "Kigali",
    productSlug: "mara-hoops-e001",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "Ordered a ring across a time zone and was back on a call with the atelier the next morning. The sizing advice was specific, not generic, and the piece arrived fitting exactly right.",
    author: "Sofia R.",
    role: "Journalist",
    city: "Lisbon",
    productSlug: "solitaire-sol-r001",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "I gave the Meridian bar necklace to my sister with a date engraved on the back. The engraving looks hand-set, not machine-done; that is the detail she noticed first.",
    author: "Nadia O.",
    role: "Pediatrician",
    city: "Nairobi",
    productSlug: "meridian-bar-n004",
    rating: 5,
  },
  {
    id: "t4",
    quote:
      "Cassia chain for everyday, Kivu paperclip for when I want the chain to be the outfit. Two years in, both still read new.",
    author: "Clara M.",
    role: "Graphic designer",
    city: "Paris",
    productSlug: "kivu-paperclip-n006",
    rating: 5,
  },
  {
    id: "t5",
    quote:
      "The Lune pendant was a gift to myself after a long year. I wear it layered with a Cassia chain and it catches light the way the photographs showed it would.",
    author: "Beatrice N.",
    role: "Literature student",
    city: "Kigali",
    productSlug: "lune-crescent-n003",
    rating: 4,
  },
  {
    id: "t6",
    quote:
      "RadEl's packaging is the first signal. The piece inside lived up to the presentation — and that is much rarer than it should be.",
    author: "Isabelle D.",
    role: "Hospitality director",
    city: "Brussels",
    rating: 5,
  },
];
