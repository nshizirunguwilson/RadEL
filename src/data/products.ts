import type {
  Category,
  Gemstone,
  Material,
  Product,
  ProductImage,
  ProductTag,
  ProductVariant,
} from "@/types/product";

const IMG = [
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1606623546924-a4f3a5b1ab3c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1612932851248-6f4e54edf0b6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1612270043812-2ac5af30efee?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1570891836654-d4961a7b6e9c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522318988-b26fb3c08d64?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1633810254405-bfcf4ffa4b93?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1641894252231-1e6bf1b18ef0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1585521551086-51c7e8a4f63d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=1200&q=80",
] as const;

function image(i: number, alt: string): ProductImage {
  const src = IMG[i % IMG.length] ?? IMG[0]!;
  return { src, alt };
}

type VariantInput = {
  size?: string;
  material: Material;
  gemstone: Gemstone;
  priceUSD: number;
  compareAtUSD?: number;
  stock: number;
};

function variants(productId: string, items: VariantInput[]): ProductVariant[] {
  return items.map((v, i) => ({
    id: `${productId}-v${i + 1}`,
    sku: `RD-${productId.toUpperCase()}-${i + 1}`,
    ...v,
  }));
}

type ProductInput = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  shortDescription: string;
  description: string;
  materialsAndCare: string;
  shippingAndReturns: string;
  imgIdxs: [number, number, number];
  imgAlts: [string, string, string];
  v: VariantInput[];
  rating: number;
  reviewCount: number;
  tags: ProductTag[];
  relatedIds: string[];
  publishedAt: string;
};

const SHIP_COPY =
  "Complimentary shipping on orders over $250, with insured tracked delivery worldwide. Returns are accepted within 30 days on unworn pieces in their original packaging.";

function make(p: ProductInput): Product {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    shortDescription: p.shortDescription,
    description: p.description,
    materialsAndCare: p.materialsAndCare,
    shippingAndReturns: p.shippingAndReturns,
    images: [
      image(p.imgIdxs[0], p.imgAlts[0]),
      image(p.imgIdxs[1], p.imgAlts[1]),
      image(p.imgIdxs[2], p.imgAlts[2]),
    ],
    variants: variants(p.id, p.v),
    rating: p.rating,
    reviewCount: p.reviewCount,
    tags: p.tags,
    relatedIds: p.relatedIds,
    publishedAt: p.publishedAt,
  };
}

// ============================================================================
// EARRINGS (18)
// ============================================================================

const EARRINGS: Product[] = [
  make({
    id: "e001",
    slug: "mara-hoops-e001",
    name: "Mara Hoops",
    category: "earrings",
    shortDescription: "Polished 25mm hoops in recycled 18k gold, weighted to sit forward.",
    description:
      "The Mara hoop is the piece the atelier reaches for first. A hand-polished tube of recycled 18k gold, finished with a hinged click closure that settles flush against the lobe.",
    materialsAndCare:
      "Recycled 18k yellow gold with a high-polish finish. Avoid chlorine and lotions; restore shine with a soft jeweler's cloth.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [8, 0, 2],
    imgAlts: [
      "Pair of Mara hoop earrings in polished 18k gold",
      "Mara hoops photographed on warm linen",
      "Close crop of the Mara hoop hinge detail",
    ],
    v: [
      { material: "gold-18k", gemstone: "none", priceUSD: 420, stock: 14 },
      { material: "rose-gold", gemstone: "none", priceUSD: 420, stock: 9 },
    ],
    rating: 4.9,
    reviewCount: 286,
    tags: ["bestseller", "handcrafted"],
    relatedIds: ["e002", "e005", "e011", "e014"],
    publishedAt: "2024-08-12",
  }),
  make({
    id: "e002",
    slug: "lune-drops-e002",
    name: "Lune Drops",
    category: "earrings",
    shortDescription: "Crescent drop earrings in 14k gold with a single pearl accent.",
    description:
      "Lune pairs a brushed crescent with a freshwater pearl that sways with the wearer. The posts are solid 14k gold and finished with push-back closures for everyday use.",
    materialsAndCare:
      "Recycled 14k yellow gold and AAA-grade freshwater pearl. Wipe gently with a dry cloth; never submerge or expose to perfume.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [0, 11, 15],
    imgAlts: [
      "Lune crescent drop earrings with pearl detail",
      "Lune drops against warm neutral background",
      "Profile view of Lune drop earring",
    ],
    v: [
      { material: "gold-14k", gemstone: "pearl", priceUSD: 285, stock: 11 },
      { material: "white-gold", gemstone: "pearl", priceUSD: 305, stock: 6 },
    ],
    rating: 4.7,
    reviewCount: 142,
    tags: ["new", "handcrafted"],
    relatedIds: ["e001", "e006", "e010", "e017"],
    publishedAt: "2026-02-18",
  }),
  make({
    id: "e003",
    slug: "sol-studs-e003",
    name: "Sol Studs",
    category: "earrings",
    shortDescription: "Round brilliant diamond studs set in six-prong 18k white gold.",
    description:
      "A quiet classic. Each Sol stud cradles a 0.25ct round brilliant diamond in a low, six-prong basket, letting the stone catch light from every angle.",
    materialsAndCare:
      "Recycled 18k white gold with conflict-free round brilliant diamonds, SI1 clarity, G-H color. Rinse in warm soapy water and dry with a lint-free cloth.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [4, 3, 16],
    imgAlts: [
      "Sol diamond stud earrings",
      "Sol studs in a paper-lined jewelry tray",
      "Side view of the six-prong Sol stud setting",
    ],
    v: [
      { material: "white-gold", gemstone: "diamond", priceUSD: 895, stock: 7 },
      { material: "gold-18k", gemstone: "diamond", priceUSD: 895, stock: 4 },
      { material: "platinum", gemstone: "diamond", priceUSD: 1250, stock: 2 },
    ],
    rating: 4.9,
    reviewCount: 204,
    tags: ["bestseller"],
    relatedIds: ["e007", "e013", "e015", "e018"],
    publishedAt: "2024-11-02",
  }),
  make({
    id: "e004",
    slug: "nova-huggies-e004",
    name: "Nova Huggies",
    category: "earrings",
    shortDescription: "Pavé huggie hoops set with 24 round white topaz across the face.",
    description:
      "Nova takes the workhorse huggie and gives it a full line of light. Twenty-four round topaz sit in micro-pavé across the face; the inner channel stays brushed for comfort.",
    materialsAndCare:
      "Recycled 14k yellow gold and white topaz. Store flat in the provided pouch; clean with a soft brush and diluted dish soap once a month.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [8, 2, 0],
    imgAlts: [
      "Nova pavé huggie hoops with white topaz",
      "Nova huggies on neutral fabric",
      "Close crop of the Nova pavé line",
    ],
    v: [
      { material: "gold-14k", gemstone: "topaz", priceUSD: 340, compareAtUSD: 395, stock: 12 },
      { material: "rose-gold", gemstone: "topaz", priceUSD: 340, compareAtUSD: 395, stock: 8 },
    ],
    rating: 4.6,
    reviewCount: 118,
    tags: ["sale", "bestseller"],
    relatedIds: ["e001", "e009", "e012", "e014"],
    publishedAt: "2025-04-21",
  }),
  make({
    id: "e005",
    slug: "aurora-ear-cuffs-e005",
    name: "Aurora Ear Cuffs",
    category: "earrings",
    shortDescription: "Sculpted ear cuff sold as a single piece; slips on, no piercing required.",
    description:
      "A piece to mix with what you already wear. Aurora is a smooth, sculptural ribbon of silver that hugs the upper ear and stays put through the day.",
    materialsAndCare:
      "Sterling silver 925 with a light rhodium flash to resist tarnish. Polish with the included cloth; avoid sleeping in the cuff to keep its shape.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [9, 14, 8],
    imgAlts: [
      "Aurora silver ear cuff, no piercing required",
      "Aurora cuff photographed on its side",
      "Close detail of the Aurora curve",
    ],
    v: [
      { material: "silver-925", gemstone: "none", priceUSD: 85, stock: 18 },
      { material: "gold-14k", gemstone: "none", priceUSD: 180, stock: 10 },
    ],
    rating: 4.5,
    reviewCount: 74,
    tags: ["handcrafted"],
    relatedIds: ["e002", "e011", "e014", "e017"],
    publishedAt: "2025-01-14",
  }),
  make({
    id: "e006",
    slug: "soraya-chandeliers-e006",
    name: "Soraya Chandeliers",
    category: "earrings",
    shortDescription: "Long chandelier earrings with graduated sapphires on a fine 18k chain.",
    description:
      "Designed with evenings in mind. Soraya drops three graduated blue sapphires from a delicate 18k chain, with each stone free to catch the light independently.",
    materialsAndCare:
      "Recycled 18k yellow gold and natural blue sapphires, heat-treated. Store separately to prevent tangling; have the stones checked annually by a jeweler.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [11, 7, 5],
    imgAlts: [
      "Soraya sapphire chandelier earrings",
      "Soraya earrings on a stone tray",
      "Detail of graduated sapphires",
    ],
    v: [
      { material: "gold-18k", gemstone: "sapphire", priceUSD: 1450, stock: 3 },
      { material: "white-gold", gemstone: "sapphire", priceUSD: 1520, stock: 2 },
    ],
    rating: 4.8,
    reviewCount: 52,
    tags: ["limited", "handcrafted"],
    relatedIds: ["e003", "e013", "e015", "e016"],
    publishedAt: "2025-11-30",
  }),
  make({
    id: "e007",
    slug: "jasmine-studs-e007",
    name: "Jasmine Studs",
    category: "earrings",
    shortDescription: "Five-petal flower studs cast from carved wax originals.",
    description:
      "Each Jasmine stud is cast from a wax carved in-house, so every pair carries the small irregularities of a hand-worked original. Smaller than they look, and everyday light.",
    materialsAndCare:
      "Recycled 14k yellow gold with a soft satin finish. Wipe clean with a microfiber cloth; re-polish at the atelier any time, free for life.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [0, 16, 4],
    imgAlts: [
      "Jasmine flower stud earrings in 14k gold",
      "Jasmine studs on soft ecru paper",
      "Close detail of Jasmine petal texture",
    ],
    v: [
      { material: "gold-14k", gemstone: "none", priceUSD: 160, stock: 22 },
      { material: "rose-gold", gemstone: "none", priceUSD: 160, stock: 14 },
      { material: "white-gold", gemstone: "none", priceUSD: 175, stock: 9 },
    ],
    rating: 4.8,
    reviewCount: 198,
    tags: ["bestseller", "handcrafted"],
    relatedIds: ["e003", "e010", "e013", "e018"],
    publishedAt: "2024-09-08",
  }),
  make({
    id: "e008",
    slug: "meridian-bars-e008",
    name: "Meridian Bars",
    category: "earrings",
    shortDescription: "Slim horizontal bar studs, 14mm across, in brushed white gold.",
    description:
      "Meridian is the answer to a second hole that needs a small break from hoops. The bar sits horizontal along the lobe; the post is set off-center so it lays flat.",
    materialsAndCare:
      "Recycled 18k white gold with a fine satin brush. Clean with warm soapy water and a cotton cloth; avoid silver polish, which will alter the finish.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [2, 0, 15],
    imgAlts: [
      "Meridian bar stud earrings in brushed white gold",
      "Meridian bars on linen fabric",
      "Profile of Meridian bar stud",
    ],
    v: [
      { material: "white-gold", gemstone: "none", priceUSD: 240, stock: 0 },
      { material: "gold-18k", gemstone: "none", priceUSD: 240, stock: 0 },
    ],
    rating: 4.5,
    reviewCount: 62,
    tags: ["handcrafted"],
    relatedIds: ["e004", "e005", "e011", "e014"],
    publishedAt: "2024-10-19",
  }),
  make({
    id: "e009",
    slug: "lila-threaders-e009",
    name: "Lila Threaders",
    category: "earrings",
    shortDescription: "Ultra-fine threader earrings with a single emerald accent.",
    description:
      "A whisper of a thing. Lila threads a 0.8mm chain through the lobe and finishes with a bezel-set emerald that rests against the jaw.",
    materialsAndCare:
      "Recycled 14k yellow gold and natural emerald, minor oil treatment. Do not clean with ultrasonic devices; wipe dry after each wear.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [13, 4, 16],
    imgAlts: [
      "Lila emerald threader earrings",
      "Lila threaders in natural light",
      "Detail of bezel-set emerald",
    ],
    v: [
      { material: "gold-14k", gemstone: "emerald", priceUSD: 310, compareAtUSD: 380, stock: 7 },
      { material: "white-gold", gemstone: "emerald", priceUSD: 325, compareAtUSD: 395, stock: 5 },
    ],
    rating: 4.7,
    reviewCount: 89,
    tags: ["sale", "handcrafted"],
    relatedIds: ["e002", "e006", "e013", "e017"],
    publishedAt: "2025-09-04",
  }),
  make({
    id: "e010",
    slug: "muguet-clusters-e010",
    name: "Muguet Clusters",
    category: "earrings",
    shortDescription: "Three-pearl cluster studs inspired by the lily-of-the-valley flower.",
    description:
      "Three rice pearls gathered onto a tiny gold cup. Muguet is the earring that works with linen in summer and merino in winter, without trying.",
    materialsAndCare:
      "Recycled 14k yellow gold and freshwater rice pearls. Store in the provided pouch away from harder stones; wipe pearls gently with a damp cloth.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [4, 11, 0],
    imgAlts: [
      "Muguet three-pearl cluster earrings",
      "Muguet clusters on paper backdrop",
      "Macro of three pearls in a gold cup",
    ],
    v: [
      { material: "gold-14k", gemstone: "pearl", priceUSD: 195, stock: 16 },
      { material: "rose-gold", gemstone: "pearl", priceUSD: 195, stock: 11 },
    ],
    rating: 4.6,
    reviewCount: 104,
    tags: ["new", "handcrafted"],
    relatedIds: ["e002", "e007", "e017", "e018"],
    publishedAt: "2026-03-02",
  }),
  make({
    id: "e011",
    slug: "kivu-hoops-e011",
    name: "Kivu Hoops",
    category: "earrings",
    shortDescription: "Small 15mm everyday hoops in solid 14k gold, tube-cast and polished.",
    description:
      "Named for the lake, Kivu is an everyday hoop at everyday scale. Cast solid rather than hollow, so the weight sits right and the shape holds.",
    materialsAndCare:
      "Recycled 14k yellow gold, tube-cast and polished. Lightly buff with a soft jeweler's cloth; safe for showering, not recommended for swimming.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [8, 2, 0],
    imgAlts: [
      "Kivu small everyday hoops in 14k gold",
      "Kivu hoops on warm neutral surface",
      "Kivu hoop profile and click closure",
    ],
    v: [
      { material: "gold-14k", gemstone: "none", priceUSD: 195, stock: 24 },
      { material: "rose-gold", gemstone: "none", priceUSD: 195, stock: 17 },
      { material: "silver-925", gemstone: "none", priceUSD: 95, stock: 19 },
    ],
    rating: 4.8,
    reviewCount: 322,
    tags: ["bestseller"],
    relatedIds: ["e001", "e004", "e008", "e014"],
    publishedAt: "2024-06-24",
  }),
  make({
    id: "e012",
    slug: "antares-ear-jackets-e012",
    name: "Antares Ear Jackets",
    category: "earrings",
    shortDescription: "Ear jackets that frame a stud from behind with a halo of micro-pavé.",
    description:
      "Wear them over a pair of your own small studs. Antares slides a half-moon of pavé diamonds behind the lobe, so the stone in front seems lit from within.",
    materialsAndCare:
      "Recycled 18k white gold with VS-clarity lab-grown diamonds. Clean with a soft brush and warm soapy water; dry thoroughly.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [3, 16, 15],
    imgAlts: [
      "Antares pavé diamond ear jackets",
      "Antares jackets separated on stone",
      "Close crop of pavé line",
    ],
    v: [
      { material: "white-gold", gemstone: "diamond", priceUSD: 780, compareAtUSD: 950, stock: 4 },
    ],
    rating: 4.7,
    reviewCount: 41,
    tags: ["sale", "limited"],
    relatedIds: ["e003", "e006", "e013", "e015"],
    publishedAt: "2025-07-17",
  }),
  make({
    id: "e013",
    slug: "orchidee-studs-e013",
    name: "Orchidée Studs",
    category: "earrings",
    shortDescription: "Sculptural petal studs in rose gold with a single pink sapphire center.",
    description:
      "Orchidée opens out from the lobe like a small, closed bloom. The pink sapphire center is bezel-set, which keeps the edge soft and the wear hassle-free.",
    materialsAndCare:
      "Recycled 18k rose gold and natural pink sapphire. Wipe clean after each wear; annual professional cleaning recommended.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [0, 4, 16],
    imgAlts: [
      "Orchidée petal studs in rose gold with pink sapphire",
      "Orchidée studs on neutral linen",
      "Close detail of bezel-set pink sapphire",
    ],
    v: [
      { material: "rose-gold", gemstone: "sapphire", priceUSD: 455, stock: 9 },
      { material: "gold-18k", gemstone: "sapphire", priceUSD: 455, stock: 6 },
    ],
    rating: 4.8,
    reviewCount: 67,
    tags: ["new", "handcrafted"],
    relatedIds: ["e003", "e007", "e009", "e018"],
    publishedAt: "2026-01-22",
  }),
  make({
    id: "e014",
    slug: "luxor-thick-hoops-e014",
    name: "Luxor Thick Hoops",
    category: "earrings",
    shortDescription: "Bold 35mm chunky hoops for when you want the hoop to be the outfit.",
    description:
      "The larger sister to Mara. Luxor thickens the tube and widens the diameter, still hand-polished to the same finish, still hinged to sit flat.",
    materialsAndCare:
      "Recycled 18k yellow gold, tube-cast. Restore shine with a soft jeweler's cloth; avoid chlorine and household cleaners.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [2, 8, 14],
    imgAlts: [
      "Luxor thick 35mm hoops in polished gold",
      "Luxor hoops held in hand",
      "Profile of Luxor hoop hinge",
    ],
    v: [
      { material: "gold-18k", gemstone: "none", priceUSD: 620, stock: 7 },
      { material: "rose-gold", gemstone: "none", priceUSD: 620, stock: 3 },
    ],
    rating: 4.6,
    reviewCount: 87,
    tags: ["handcrafted"],
    relatedIds: ["e001", "e004", "e011", "e012"],
    publishedAt: "2024-12-10",
  }),
  make({
    id: "e015",
    slug: "ravello-drops-e015",
    name: "Ravello Drops",
    category: "earrings",
    shortDescription: "Tapered baguette diamond drops suspended from a small pavé bar.",
    description:
      "Ravello comes out of a request for something to wear to weddings. A tapered baguette swings under a small pavé bar; the line is long enough to register, short enough to stay.",
    materialsAndCare:
      "Recycled 18k white gold and VS-clarity diamonds. Clean with a soft brush; do not wear during heavy exercise to protect the settings.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [3, 15, 16],
    imgAlts: [
      "Ravello baguette diamond drop earrings",
      "Ravello drops side by side on stone",
      "Detail of pavé bar and baguette",
    ],
    v: [
      { material: "white-gold", gemstone: "diamond", priceUSD: 1620, stock: 2 },
      { material: "platinum", gemstone: "diamond", priceUSD: 1795, stock: 1 },
    ],
    rating: 4.9,
    reviewCount: 36,
    tags: ["limited"],
    relatedIds: ["e003", "e006", "e012", "e018"],
    publishedAt: "2025-10-08",
  }),
  make({
    id: "e016",
    slug: "dahlia-clusters-e016",
    name: "Dahlia Clusters",
    category: "earrings",
    shortDescription: "Seven-petal cluster earrings set with mixed citrine and topaz.",
    description:
      "A warm cluster for cooler months. Dahlia alternates citrine and white topaz across seven small petals, set in a single continuous frame of yellow gold.",
    materialsAndCare:
      "Recycled 14k yellow gold with natural citrine and white topaz. Avoid prolonged sun exposure; store in the provided pouch away from other pieces.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [4, 0, 11],
    imgAlts: [
      "Dahlia cluster earrings with citrine and topaz",
      "Dahlia earrings on ecru background",
      "Macro of seven-petal cluster setting",
    ],
    v: [
      { material: "gold-14k", gemstone: "citrine", priceUSD: 385, compareAtUSD: 445, stock: 8 },
    ],
    rating: 4.4,
    reviewCount: 54,
    tags: ["sale", "handcrafted"],
    relatedIds: ["e006", "e009", "e010", "e013"],
    publishedAt: "2025-03-12",
  }),
  make({
    id: "e017",
    slug: "cora-pearls-e017",
    name: "Cora Pearls",
    category: "earrings",
    shortDescription: "Single 8mm Akoya pearl studs with a concealed post and low-profile back.",
    description:
      "A quieter pearl stud. Cora uses an 8mm Akoya with a concealed post that runs through the center, so nothing about the setting interrupts the surface of the pearl.",
    materialsAndCare:
      "Recycled 14k yellow gold post and Akoya cultured pearl. Never submerge or expose to perfume; wipe gently with a barely damp cloth.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [11, 4, 0],
    imgAlts: [
      "Cora Akoya pearl stud earrings",
      "Cora pearls on linen surface",
      "Close detail of concealed post setting",
    ],
    v: [
      { material: "gold-14k", gemstone: "pearl", priceUSD: 225, stock: 13 },
      { material: "white-gold", gemstone: "pearl", priceUSD: 245, stock: 8 },
      { material: "rose-gold", gemstone: "pearl", priceUSD: 225, stock: 10 },
    ],
    rating: 4.8,
    reviewCount: 156,
    tags: ["bestseller"],
    relatedIds: ["e002", "e010", "e013", "e018"],
    publishedAt: "2024-07-30",
  }),
  make({
    id: "e018",
    slug: "solitaire-emerald-studs-e018",
    name: "Solitaire Emerald Studs",
    category: "earrings",
    shortDescription: "Bezel-set emerald cabochon studs with a fine milgrain edge.",
    description:
      "Old-world technique on a new-world piece. Each emerald cabochon is bezel-set in 18k yellow gold, with a milgrain edge cut by hand before final polishing.",
    materialsAndCare:
      "Recycled 18k yellow gold and natural emerald cabochon. Emeralds prefer gentle care; wipe dry after wear and avoid ultrasonic cleaning.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [0, 16, 4],
    imgAlts: [
      "Solitaire emerald cabochon stud earrings",
      "Emerald studs on paper backdrop",
      "Macro of milgrain bezel edge",
    ],
    v: [
      { material: "gold-18k", gemstone: "emerald", priceUSD: 720, stock: 5 },
      { material: "white-gold", gemstone: "emerald", priceUSD: 760, stock: 3 },
    ],
    rating: 4.7,
    reviewCount: 72,
    tags: ["handcrafted"],
    relatedIds: ["e003", "e009", "e013", "e015"],
    publishedAt: "2025-05-06",
  }),
];

// ============================================================================
// NECKLACES (15)
// ============================================================================

const NECKLACES: Product[] = [
  make({
    id: "n001",
    slug: "cassia-chain-n001",
    name: "Cassia Chain",
    category: "necklaces",
    shortDescription: "Fine rolo chain in 14k gold with an adjustable lobster clasp.",
    description:
      "The base layer. Cassia is a light rolo chain with an adjustable clasp, sized to sit at the collarbone or, shortened, high on the neck.",
    materialsAndCare:
      "Recycled 14k yellow gold, hand-finished clasp. Avoid sleeping or showering in the piece; store flat to prevent kinking.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [5, 6, 17],
    imgAlts: [
      "Cassia fine rolo chain necklace in 14k gold",
      "Cassia chain coiled on linen",
      "Detail of adjustable lobster clasp",
    ],
    v: [
      { size: "16\"", material: "gold-14k", gemstone: "none", priceUSD: 310, stock: 18 },
      { size: "18\"", material: "gold-14k", gemstone: "none", priceUSD: 335, stock: 22 },
      { size: "20\"", material: "gold-14k", gemstone: "none", priceUSD: 360, stock: 12 },
    ],
    rating: 4.9,
    reviewCount: 318,
    tags: ["bestseller"],
    relatedIds: ["n002", "n004", "n008", "n012"],
    publishedAt: "2024-05-18",
  }),
  make({
    id: "n002",
    slug: "soraya-sapphire-pendant-n002",
    name: "Soraya Sapphire",
    category: "necklaces",
    shortDescription: "Solitaire blue sapphire on a box chain in 18k white gold.",
    description:
      "A single 1.2ct blue sapphire on a 1.1mm box chain, set low and bezel-finished so the stone lays flat against the skin.",
    materialsAndCare:
      "Recycled 18k white gold and natural blue sapphire, heat-treated. Store away from harder stones; clean with warm soapy water.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [6, 7, 21],
    imgAlts: [
      "Soraya blue sapphire pendant on box chain",
      "Soraya necklace on stone surface",
      "Macro of bezel-set sapphire",
    ],
    v: [
      { size: "16\"", material: "white-gold", gemstone: "sapphire", priceUSD: 1420, stock: 3 },
      { size: "18\"", material: "white-gold", gemstone: "sapphire", priceUSD: 1460, stock: 2 },
    ],
    rating: 4.8,
    reviewCount: 64,
    tags: ["limited"],
    relatedIds: ["n005", "n009", "n011", "n013"],
    publishedAt: "2025-08-14",
  }),
  make({
    id: "n003",
    slug: "lune-crescent-n003",
    name: "Lune Crescent",
    category: "necklaces",
    shortDescription: "Brushed crescent pendant with a tiny diamond on a fine cable chain.",
    description:
      "Lune matches the earring at a smaller scale. The crescent is brushed, the tiny round diamond is flush-set at the tip, and the chain is intentionally light.",
    materialsAndCare:
      "Recycled 14k yellow gold and VS-clarity lab-grown diamond. Wipe gently with a dry cloth after wear.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [21, 6, 5],
    imgAlts: [
      "Lune crescent pendant necklace with diamond",
      "Lune necklace on warm neutral cloth",
      "Detail of flush-set diamond tip",
    ],
    v: [
      { size: "16\"", material: "gold-14k", gemstone: "diamond", priceUSD: 340, stock: 14 },
      { size: "18\"", material: "gold-14k", gemstone: "diamond", priceUSD: 360, stock: 11 },
      { size: "20\"", material: "gold-14k", gemstone: "diamond", priceUSD: 380, stock: 7 },
    ],
    rating: 4.7,
    reviewCount: 187,
    tags: ["bestseller", "handcrafted"],
    relatedIds: ["n001", "n006", "n010", "n014"],
    publishedAt: "2024-09-29",
  }),
  make({
    id: "n004",
    slug: "meridian-bar-n004",
    name: "Meridian Bar",
    category: "necklaces",
    shortDescription: "Horizontal bar pendant in brushed gold, engravable on the reverse.",
    description:
      "Meridian is a pendant with room for a detail. The horizontal bar can be engraved with a short word or date on the back, letter-pressed by hand.",
    materialsAndCare:
      "Recycled 14k yellow gold with brushed finish. Remove before bathing to preserve the satin texture; polish gently with a soft cloth.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [17, 5, 6],
    imgAlts: [
      "Meridian horizontal bar pendant necklace",
      "Meridian bar necklace laid flat",
      "Close view of bar ready for engraving",
    ],
    v: [
      { size: "16\"", material: "gold-14k", gemstone: "none", priceUSD: 260, stock: 15 },
      { size: "18\"", material: "gold-14k", gemstone: "none", priceUSD: 285, stock: 11 },
    ],
    rating: 4.6,
    reviewCount: 112,
    tags: ["handcrafted"],
    relatedIds: ["n001", "n007", "n012", "n015"],
    publishedAt: "2024-11-14",
  }),
  make({
    id: "n005",
    slug: "orchidee-lariat-n005",
    name: "Orchidée Lariat",
    category: "necklaces",
    shortDescription: "Adjustable lariat ending in two graduated pink sapphire drops.",
    description:
      "Orchidée pulls through itself to set length. Two small pink sapphires finish the drop, one slightly lower than the other, giving the neckline an intentional asymmetry.",
    materialsAndCare:
      "Recycled 18k rose gold and natural pink sapphires. Store flat and uncoiled; clean with warm soapy water and a soft brush.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [7, 21, 5],
    imgAlts: [
      "Orchidée pink sapphire lariat necklace",
      "Orchidée lariat draped on linen",
      "Two graduated pink sapphires at drop end",
    ],
    v: [
      { size: "22\"", material: "rose-gold", gemstone: "sapphire", priceUSD: 785, compareAtUSD: 920, stock: 5 },
    ],
    rating: 4.7,
    reviewCount: 43,
    tags: ["sale", "new"],
    relatedIds: ["n002", "n008", "n011", "n013"],
    publishedAt: "2026-01-05",
  }),
  make({
    id: "n006",
    slug: "kivu-paperclip-n006",
    name: "Kivu Paperclip",
    category: "necklaces",
    shortDescription: "Oversized paperclip-link chain in solid 14k gold, 4.5mm wide.",
    description:
      "Kivu thickens the everyday. The links are soldered individually, not machine-chained, so the surface catches light in a slightly irregular pattern.",
    materialsAndCare:
      "Recycled 14k yellow gold, soldered link by link. Polish lightly to maintain brightness; safe for daily wear.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [5, 6, 17],
    imgAlts: [
      "Kivu paperclip-link chain necklace",
      "Kivu chain coiled on stone",
      "Close view of soldered link",
    ],
    v: [
      { size: "18\"", material: "gold-14k", gemstone: "none", priceUSD: 680, stock: 9 },
      { size: "20\"", material: "gold-14k", gemstone: "none", priceUSD: 740, stock: 6 },
      { size: "22\"", material: "gold-14k", gemstone: "none", priceUSD: 795, stock: 4 },
    ],
    rating: 4.8,
    reviewCount: 134,
    tags: ["bestseller", "handcrafted"],
    relatedIds: ["n001", "n003", "n010", "n015"],
    publishedAt: "2024-10-07",
  }),
  make({
    id: "n007",
    slug: "antares-diamond-station-n007",
    name: "Antares Station",
    category: "necklaces",
    shortDescription: "Diamond station necklace with five bezel-set stones along a cable chain.",
    description:
      "Five small diamonds set in bezels along a fine cable chain at even intervals. The result is a line of tiny points of light that moves with you.",
    materialsAndCare:
      "Recycled 18k white gold with VS-clarity lab-grown diamonds. Clean with a soft brush and warm soapy water; inspect bezels annually.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [6, 17, 21],
    imgAlts: [
      "Antares diamond station necklace",
      "Antares station chain laid flat",
      "Close detail of bezel-set diamond",
    ],
    v: [
      { size: "16\"", material: "white-gold", gemstone: "diamond", priceUSD: 920, compareAtUSD: 1100, stock: 4 },
      { size: "18\"", material: "white-gold", gemstone: "diamond", priceUSD: 985, compareAtUSD: 1175, stock: 3 },
    ],
    rating: 4.8,
    reviewCount: 76,
    tags: ["sale"],
    relatedIds: ["n002", "n005", "n011", "n013"],
    publishedAt: "2025-06-20",
  }),
  make({
    id: "n008",
    slug: "muguet-pearl-strand-n008",
    name: "Muguet Pearl Strand",
    category: "necklaces",
    shortDescription: "Knotted strand of AAA freshwater pearls with a hidden gold clasp.",
    description:
      "Pearls knotted by hand on silk, clasp tucked into the strand so it reads continuous. A piece built to be the only thing you need to add.",
    materialsAndCare:
      "AAA freshwater pearls knotted on silk, with recycled 14k gold clasp. Never submerge; wipe with a barely damp cloth after wear.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [11, 4, 0],
    imgAlts: [
      "Muguet knotted freshwater pearl strand",
      "Muguet pearls on ecru paper",
      "Detail of hidden gold clasp",
    ],
    v: [
      { size: "18\"", material: "gold-14k", gemstone: "pearl", priceUSD: 520, stock: 0 },
      { size: "20\"", material: "gold-14k", gemstone: "pearl", priceUSD: 570, stock: 0 },
    ],
    rating: 4.9,
    reviewCount: 98,
    tags: ["handcrafted"],
    relatedIds: ["n001", "n003", "n012", "n014"],
    publishedAt: "2024-08-05",
  }),
  make({
    id: "n009",
    slug: "ravello-tennis-n009",
    name: "Ravello Tennis",
    category: "necklaces",
    shortDescription: "Full-tennis necklace in 18k white gold set with round brilliant diamonds.",
    description:
      "A full round of diamonds, each in a shared four-prong basket. Designed with a double-safety clasp so it can be worn with confidence.",
    materialsAndCare:
      "Recycled 18k white gold with SI1-clarity diamonds. Clean with professional ultrasonic service every six months; not for swimming.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [6, 21, 17],
    imgAlts: [
      "Ravello tennis diamond necklace",
      "Ravello tennis necklace draped",
      "Close view of shared four-prong setting",
    ],
    v: [
      { size: "16\"", material: "white-gold", gemstone: "diamond", priceUSD: 1750, stock: 2 },
    ],
    rating: 5.0,
    reviewCount: 22,
    tags: ["limited"],
    relatedIds: ["n002", "n007", "n011", "n013"],
    publishedAt: "2025-12-01",
  }),
  make({
    id: "n010",
    slug: "sol-rays-collar-n010",
    name: "Sol Rays Collar",
    category: "necklaces",
    shortDescription: "Sculpted flat collar with radiating sunburst texture.",
    description:
      "Sol Rays is a flat collar cast in one piece, then hand-finished with a radiating sunburst texture. It sits high on the neck and drops slightly in front.",
    materialsAndCare:
      "Recycled 18k yellow gold. Avoid chemical cleaners; a dry jeweler's cloth restores the texture between polishes.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [17, 5, 6],
    imgAlts: [
      "Sol Rays sculpted collar necklace",
      "Sol Rays collar on linen",
      "Close view of radiating sunburst texture",
    ],
    v: [
      { size: "16\"", material: "gold-18k", gemstone: "none", priceUSD: 1250, stock: 3 },
    ],
    rating: 4.6,
    reviewCount: 31,
    tags: ["limited", "handcrafted"],
    relatedIds: ["n003", "n006", "n012", "n015"],
    publishedAt: "2025-02-19",
  }),
  make({
    id: "n011",
    slug: "lila-emerald-solitaire-n011",
    name: "Lila Emerald",
    category: "necklaces",
    shortDescription: "Emerald solitaire pendant with a fine bezel and a 1mm box chain.",
    description:
      "One small emerald, bezel-set and balanced on a 1mm box chain. Lila is the piece that sits under a collarless shirt without announcing itself.",
    materialsAndCare:
      "Recycled 18k yellow gold and natural emerald. Emeralds are softer than diamonds; remove before activity and wipe clean after wear.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [21, 6, 17],
    imgAlts: [
      "Lila emerald solitaire pendant necklace",
      "Lila emerald necklace on paper",
      "Close detail of bezel-set emerald",
    ],
    v: [
      { size: "16\"", material: "gold-18k", gemstone: "emerald", priceUSD: 640, stock: 6 },
      { size: "18\"", material: "gold-18k", gemstone: "emerald", priceUSD: 680, stock: 4 },
    ],
    rating: 4.7,
    reviewCount: 58,
    tags: ["handcrafted"],
    relatedIds: ["n002", "n005", "n007", "n013"],
    publishedAt: "2024-12-22",
  }),
  make({
    id: "n012",
    slug: "nova-rolo-n012",
    name: "Nova Rolo",
    category: "necklaces",
    shortDescription: "Medium-weight rolo chain in silver with a secure toggle closure.",
    description:
      "A step up from the featherweight base chains. Nova uses rolo links at a heavier gauge and closes with a toggle, so the bar becomes a decorative focal point.",
    materialsAndCare:
      "Sterling silver 925 with a light rhodium plating to resist tarnish. Polish with the included cloth; store in an airtight pouch when not in use.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [5, 17, 6],
    imgAlts: [
      "Nova medium-weight rolo chain in silver",
      "Nova chain with toggle closure on linen",
      "Close view of decorative toggle bar",
    ],
    v: [
      { size: "18\"", material: "silver-925", gemstone: "none", priceUSD: 125, compareAtUSD: 165, stock: 20 },
      { size: "20\"", material: "silver-925", gemstone: "none", priceUSD: 140, compareAtUSD: 180, stock: 14 },
    ],
    rating: 4.5,
    reviewCount: 211,
    tags: ["sale", "bestseller"],
    relatedIds: ["n001", "n004", "n006", "n015"],
    publishedAt: "2024-07-11",
  }),
  make({
    id: "n013",
    slug: "jasmine-petal-locket-n013",
    name: "Jasmine Petal Locket",
    category: "necklaces",
    shortDescription: "Round locket cast with a five-petal relief, fits one small photo.",
    description:
      "A modern take on an old form. Jasmine's round locket is cast with a quiet relief of the petal mark; the interior is smooth, sized for one small photograph.",
    materialsAndCare:
      "Recycled 14k yellow gold, cast and hand-finished. Polish gently; do not immerse. Repolish free for life at the atelier.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [17, 5, 21],
    imgAlts: [
      "Jasmine petal locket necklace",
      "Locket open to show interior space",
      "Close view of five-petal relief",
    ],
    v: [
      { size: "18\"", material: "gold-14k", gemstone: "none", priceUSD: 485, stock: 8 },
      { size: "20\"", material: "gold-14k", gemstone: "none", priceUSD: 520, stock: 5 },
    ],
    rating: 4.8,
    reviewCount: 89,
    tags: ["handcrafted"],
    relatedIds: ["n003", "n010", "n011", "n014"],
    publishedAt: "2025-05-27",
  }),
  make({
    id: "n014",
    slug: "aurora-layered-set-n014",
    name: "Aurora Layered Set",
    category: "necklaces",
    shortDescription: "Two chains built to sit together: 16\" box and 18\" cable.",
    description:
      "Two chains sold as a set. The 16\" box sits at the neck; the 18\" cable falls slightly below. Clasps are offset so they don't tangle under a collar.",
    materialsAndCare:
      "Recycled 14k yellow gold on both chains. Store with the clasps fastened to prevent tangling; wipe clean as needed.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [5, 6, 17],
    imgAlts: [
      "Aurora two-chain layered necklace set",
      "Aurora set on warm neutral cloth",
      "Close view of offset clasp arrangement",
    ],
    v: [
      { material: "gold-14k", gemstone: "none", priceUSD: 680, stock: 7 },
      { material: "rose-gold", gemstone: "none", priceUSD: 680, stock: 4 },
    ],
    rating: 4.7,
    reviewCount: 71,
    tags: ["new"],
    relatedIds: ["n001", "n003", "n006", "n012"],
    publishedAt: "2026-02-28",
  }),
  make({
    id: "n015",
    slug: "cushion-pavé-pendant-n015",
    name: "Cushion Pavé",
    category: "necklaces",
    shortDescription: "Cushion-shaped pavé diamond pendant on a fine box chain.",
    description:
      "A cushion outline filled with micro-pavé. The pendant is small in hand, bright against the skin, and reads different at every angle.",
    materialsAndCare:
      "Recycled 18k white gold with VS-clarity diamonds in micro-pavé. Clean with a soft brush and warm soapy water; avoid ultrasonic cleaning.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [21, 17, 6],
    imgAlts: [
      "Cushion pavé diamond pendant necklace",
      "Cushion pendant on linen",
      "Close view of micro-pavé fill",
    ],
    v: [
      { size: "16\"", material: "white-gold", gemstone: "diamond", priceUSD: 1180, stock: 4 },
      { size: "18\"", material: "white-gold", gemstone: "diamond", priceUSD: 1240, stock: 2 },
    ],
    rating: 4.9,
    reviewCount: 48,
    tags: ["limited", "handcrafted"],
    relatedIds: ["n002", "n007", "n009", "n013"],
    publishedAt: "2025-09-18",
  }),
];

// ============================================================================
// RINGS (15)
// ============================================================================

const RINGS: Product[] = [
  make({
    id: "r001",
    slug: "solitaire-sol-r001",
    name: "Solitaire Sol",
    category: "rings",
    shortDescription: "Six-prong round brilliant diamond solitaire on a tapered band.",
    description:
      "The classic, executed carefully. A 0.75ct round brilliant in a low six-prong basket on a tapered band that reads slim on the finger.",
    materialsAndCare:
      "Recycled 18k white gold with G-H color, SI1-clarity diamond. Have prongs checked annually; avoid knocking against hard surfaces.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [3, 10, 15],
    imgAlts: [
      "Solitaire Sol round brilliant diamond ring",
      "Sol solitaire in a paper-lined tray",
      "Side profile of tapered band",
    ],
    v: [
      { size: "5", material: "white-gold", gemstone: "diamond", priceUSD: 1650, stock: 3 },
      { size: "6", material: "white-gold", gemstone: "diamond", priceUSD: 1650, stock: 4 },
      { size: "7", material: "white-gold", gemstone: "diamond", priceUSD: 1650, stock: 2 },
      { size: "8", material: "white-gold", gemstone: "diamond", priceUSD: 1650, stock: 1 },
    ],
    rating: 4.9,
    reviewCount: 176,
    tags: ["bestseller"],
    relatedIds: ["r003", "r007", "r009", "r014"],
    publishedAt: "2024-06-04",
  }),
  make({
    id: "r002",
    slug: "eternity-band-r002",
    name: "Eternity Band",
    category: "rings",
    shortDescription: "Full-round channel-set diamond eternity band, 2mm wide.",
    description:
      "Round brilliants set channel all the way around. The band is slim at 2mm so it layers cleanly with a solitaire or stacks on its own.",
    materialsAndCare:
      "Recycled 18k white gold, channel-set diamonds. Clean with soft brush and warm soapy water; professional sizing available.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [10, 19, 3],
    imgAlts: [
      "Eternity diamond band in 18k white gold",
      "Eternity band stacked with other rings",
      "Close view of channel-set diamonds",
    ],
    v: [
      { size: "5", material: "white-gold", gemstone: "diamond", priceUSD: 1380, stock: 2 },
      { size: "6", material: "white-gold", gemstone: "diamond", priceUSD: 1380, stock: 3 },
      { size: "7", material: "white-gold", gemstone: "diamond", priceUSD: 1380, stock: 2 },
    ],
    rating: 4.8,
    reviewCount: 102,
    tags: ["bestseller"],
    relatedIds: ["r001", "r005", "r008", "r014"],
    publishedAt: "2024-09-16",
  }),
  make({
    id: "r003",
    slug: "cushion-halo-r003",
    name: "Cushion Halo",
    category: "rings",
    shortDescription: "Cushion-cut center diamond framed by a halo of round pavé.",
    description:
      "A cushion cut center, 1.2ct, surrounded by a close halo of round pavé diamonds. The setting is kept low so it slides under gloves and sweaters.",
    materialsAndCare:
      "Recycled 18k white gold with G-color, VS2 cushion-cut diamond and pavé halo. Annual professional cleaning recommended.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [15, 3, 10],
    imgAlts: [
      "Cushion halo diamond engagement ring",
      "Cushion halo ring on stone surface",
      "Close profile of halo setting",
    ],
    v: [
      { size: "5", material: "white-gold", gemstone: "diamond", priceUSD: 1800, stock: 2 },
      { size: "6", material: "white-gold", gemstone: "diamond", priceUSD: 1800, stock: 2 },
      { size: "7", material: "white-gold", gemstone: "diamond", priceUSD: 1800, stock: 1 },
    ],
    rating: 4.9,
    reviewCount: 58,
    tags: ["limited"],
    relatedIds: ["r001", "r007", "r009", "r013"],
    publishedAt: "2025-03-25",
  }),
  make({
    id: "r004",
    slug: "bezel-signet-r004",
    name: "Bezel Signet",
    category: "rings",
    shortDescription: "Oval bezel signet ring with a polished, unengraved face.",
    description:
      "Signet in its simplest form. The oval bezel is left unengraved so it can be engraved later or worn as-is; the shank is a comfortable 2.2mm.",
    materialsAndCare:
      "Recycled 14k yellow gold, solid cast. Polish lightly; engraving service available at the atelier, sold separately.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [10, 19, 3],
    imgAlts: [
      "Bezel signet ring with polished oval face",
      "Signet ring on warm neutral cloth",
      "Close view of oval face and shoulder",
    ],
    v: [
      { size: "5", material: "gold-14k", gemstone: "none", priceUSD: 540, stock: 7 },
      { size: "6", material: "gold-14k", gemstone: "none", priceUSD: 540, stock: 8 },
      { size: "7", material: "gold-14k", gemstone: "none", priceUSD: 540, stock: 5 },
      { size: "8", material: "gold-14k", gemstone: "none", priceUSD: 540, stock: 4 },
    ],
    rating: 4.7,
    reviewCount: 144,
    tags: ["handcrafted"],
    relatedIds: ["r006", "r010", "r012", "r015"],
    publishedAt: "2024-10-28",
  }),
  make({
    id: "r005",
    slug: "pavé-stacker-r005",
    name: "Pavé Stacker",
    category: "rings",
    shortDescription: "Half-round pavé band, 1.5mm wide, built to stack.",
    description:
      "The stacking band. Half-round profile, 1.5mm wide, with pavé across the top face only so the inside stays comfortable against the finger.",
    materialsAndCare:
      "Recycled 14k white gold with VS2-clarity lab-grown diamonds. Clean with a soft brush and dish soap; inspect settings every six months.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [19, 10, 3],
    imgAlts: [
      "Pavé stacker band in 14k white gold",
      "Pavé stacker stacked with other rings",
      "Close view of pavé across the band top",
    ],
    v: [
      { size: "5", material: "white-gold", gemstone: "diamond", priceUSD: 720, compareAtUSD: 850, stock: 6 },
      { size: "6", material: "white-gold", gemstone: "diamond", priceUSD: 720, compareAtUSD: 850, stock: 8 },
      { size: "7", material: "white-gold", gemstone: "diamond", priceUSD: 720, compareAtUSD: 850, stock: 4 },
      { size: "8", material: "white-gold", gemstone: "diamond", priceUSD: 720, compareAtUSD: 850, stock: 2 },
    ],
    rating: 4.8,
    reviewCount: 192,
    tags: ["sale", "bestseller"],
    relatedIds: ["r002", "r008", "r011", "r014"],
    publishedAt: "2024-11-25",
  }),
  make({
    id: "r006",
    slug: "kivu-dome-r006",
    name: "Kivu Dome",
    category: "rings",
    shortDescription: "Smooth dome ring in solid 18k gold, sized thick at the top.",
    description:
      "A substantial dome that tapers into a comfortable shank. The top is polished smooth; the shoulders are softened by hand for a perfect fit on any finger.",
    materialsAndCare:
      "Recycled 18k yellow gold, solid cast then hand-finished. Restore polish with a jeweler's cloth; professional repolish free for life.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [3, 10, 19],
    imgAlts: [
      "Kivu smooth dome ring in 18k gold",
      "Kivu dome ring in hand",
      "Side view of tapered shank",
    ],
    v: [
      { size: "5", material: "gold-18k", gemstone: "none", priceUSD: 680, stock: 5 },
      { size: "6", material: "gold-18k", gemstone: "none", priceUSD: 680, stock: 7 },
      { size: "7", material: "gold-18k", gemstone: "none", priceUSD: 680, stock: 4 },
      { size: "8", material: "gold-18k", gemstone: "none", priceUSD: 680, stock: 3 },
    ],
    rating: 4.6,
    reviewCount: 88,
    tags: ["handcrafted"],
    relatedIds: ["r004", "r010", "r012", "r015"],
    publishedAt: "2025-01-07",
  }),
  make({
    id: "r007",
    slug: "emerald-three-stone-r007",
    name: "Emerald Three-Stone",
    category: "rings",
    shortDescription: "Emerald center flanked by two tapered baguette diamonds.",
    description:
      "A classical three-stone, worked carefully. An emerald-cut emerald sits between two tapered baguette diamonds in a low, hand-finished platinum setting.",
    materialsAndCare:
      "Platinum with natural emerald (minor oil treatment) and VS1-clarity baguette diamonds. Avoid ultrasonic cleaning; professional care only.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [15, 19, 3],
    imgAlts: [
      "Emerald three-stone ring with baguette diamonds",
      "Emerald three-stone on stone surface",
      "Close profile of setting",
    ],
    v: [
      { size: "5", material: "platinum", gemstone: "emerald", priceUSD: 1720, stock: 1 },
      { size: "6", material: "platinum", gemstone: "emerald", priceUSD: 1720, stock: 2 },
      { size: "7", material: "platinum", gemstone: "emerald", priceUSD: 1720, stock: 1 },
    ],
    rating: 5.0,
    reviewCount: 19,
    tags: ["limited", "handcrafted"],
    relatedIds: ["r001", "r003", "r009", "r013"],
    publishedAt: "2025-11-14",
  }),
  make({
    id: "r008",
    slug: "rose-band-r008",
    name: "Rose Band",
    category: "rings",
    shortDescription: "Plain 2.5mm rounded-profile band in 14k rose gold.",
    description:
      "A plain band with a rounded outside and a flat inside for comfort. Good on its own, designed to sit flush with a Solitaire Sol.",
    materialsAndCare:
      "Recycled 14k rose gold. Polish lightly to maintain sheen; avoid exposure to lotions and perfume.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [19, 3, 10],
    imgAlts: [
      "Rose Band smooth 14k rose gold ring",
      "Rose Band paired with solitaire",
      "Rounded profile of rose gold band",
    ],
    v: [
      { size: "4", material: "rose-gold", gemstone: "none", priceUSD: 340, stock: 10 },
      { size: "5", material: "rose-gold", gemstone: "none", priceUSD: 340, stock: 12 },
      { size: "6", material: "rose-gold", gemstone: "none", priceUSD: 340, stock: 14 },
      { size: "7", material: "rose-gold", gemstone: "none", priceUSD: 340, stock: 9 },
      { size: "8", material: "rose-gold", gemstone: "none", priceUSD: 340, stock: 7 },
    ],
    rating: 4.7,
    reviewCount: 233,
    tags: ["bestseller"],
    relatedIds: ["r002", "r005", "r011", "r014"],
    publishedAt: "2024-07-22",
  }),
  make({
    id: "r009",
    slug: "sapphire-solitaire-r009",
    name: "Sapphire Solitaire",
    category: "rings",
    shortDescription: "Oval sapphire in a six-prong setting on a tapered yellow gold band.",
    description:
      "A 1.6ct oval blue sapphire in a low six-prong basket. The yellow gold band warms the stone; the shoulders taper to keep the profile slim.",
    materialsAndCare:
      "Recycled 18k yellow gold and natural blue sapphire, heat-treated. Clean with warm soapy water; store in the provided pouch.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [3, 15, 19],
    imgAlts: [
      "Sapphire solitaire ring in 18k yellow gold",
      "Sapphire solitaire on warm linen",
      "Close view of oval sapphire in six-prong basket",
    ],
    v: [
      { size: "5", material: "gold-18k", gemstone: "sapphire", priceUSD: 1450, stock: 2 },
      { size: "6", material: "gold-18k", gemstone: "sapphire", priceUSD: 1450, stock: 3 },
      { size: "7", material: "gold-18k", gemstone: "sapphire", priceUSD: 1450, stock: 2 },
    ],
    rating: 4.8,
    reviewCount: 67,
    tags: ["handcrafted"],
    relatedIds: ["r001", "r003", "r007", "r013"],
    publishedAt: "2025-04-30",
  }),
  make({
    id: "r010",
    slug: "meridian-rectangle-r010",
    name: "Meridian Rectangle",
    category: "rings",
    shortDescription: "Flat rectangular signet ring, engravable on the face.",
    description:
      "A rectangular variant of the classic signet. The face is flat and wide enough for three initials in the atelier's house font; the shank is a comfortable 2.8mm.",
    materialsAndCare:
      "Recycled 14k yellow gold, solid cast. Clean with a jeweler's cloth; engraving service available at checkout.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [10, 19, 15],
    imgAlts: [
      "Meridian rectangular signet ring",
      "Meridian signet on neutral cloth",
      "Close view of rectangular flat face",
    ],
    v: [
      { size: "5", material: "gold-14k", gemstone: "none", priceUSD: 580, stock: 6 },
      { size: "6", material: "gold-14k", gemstone: "none", priceUSD: 580, stock: 8 },
      { size: "7", material: "gold-14k", gemstone: "none", priceUSD: 580, stock: 5 },
      { size: "8", material: "gold-14k", gemstone: "none", priceUSD: 580, stock: 3 },
    ],
    rating: 4.6,
    reviewCount: 95,
    tags: ["handcrafted"],
    relatedIds: ["r004", "r006", "r012", "r015"],
    publishedAt: "2024-12-03",
  }),
  make({
    id: "r011",
    slug: "twist-band-r011",
    name: "Twist Band",
    category: "rings",
    shortDescription: "Twisted two-strand band in alternating yellow and white gold.",
    description:
      "Two strands twisted together before being polished as a single form. Yellow and white gold intersect along the band, giving the surface a subtle movement.",
    materialsAndCare:
      "Recycled 18k yellow gold and 18k white gold, twisted by hand. Polish as a single piece; professional refinishing available.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [19, 10, 3],
    imgAlts: [
      "Twist band in alternating yellow and white gold",
      "Twist band side profile",
      "Close view of twisted strands",
    ],
    v: [
      { size: "5", material: "gold-18k", gemstone: "none", priceUSD: 620, compareAtUSD: 720, stock: 4 },
      { size: "6", material: "gold-18k", gemstone: "none", priceUSD: 620, compareAtUSD: 720, stock: 5 },
      { size: "7", material: "gold-18k", gemstone: "none", priceUSD: 620, compareAtUSD: 720, stock: 3 },
    ],
    rating: 4.5,
    reviewCount: 47,
    tags: ["sale"],
    relatedIds: ["r005", "r008", "r014", "r015"],
    publishedAt: "2025-02-15",
  }),
  make({
    id: "r012",
    slug: "amethyst-cushion-r012",
    name: "Amethyst Cushion",
    category: "rings",
    shortDescription: "Large cushion-cut amethyst in a bezel setting with a wide polished band.",
    description:
      "A single 4ct cushion amethyst, bezel-set with a wide 3.5mm band to balance the scale of the stone. Reads like a statement without asking for one.",
    materialsAndCare:
      "Recycled 14k yellow gold and natural amethyst. Wipe clean; keep out of prolonged direct sunlight, which can fade amethyst over years.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [15, 3, 10],
    imgAlts: [
      "Amethyst cushion cocktail ring",
      "Amethyst ring on warm linen",
      "Close view of bezel-set cushion stone",
    ],
    v: [
      { size: "6", material: "gold-14k", gemstone: "amethyst", priceUSD: 480, stock: 4 },
      { size: "7", material: "gold-14k", gemstone: "amethyst", priceUSD: 480, stock: 3 },
      { size: "8", material: "gold-14k", gemstone: "amethyst", priceUSD: 480, stock: 2 },
    ],
    rating: 4.4,
    reviewCount: 62,
    tags: ["handcrafted"],
    relatedIds: ["r007", "r009", "r013", "r015"],
    publishedAt: "2025-08-09",
  }),
  make({
    id: "r013",
    slug: "ruby-east-west-r013",
    name: "Ruby East-West",
    category: "rings",
    shortDescription: "Oval ruby set horizontally in a four-prong basket.",
    description:
      "A ruby set along the finger rather than across it. The east-west orientation makes the stone look bigger on the hand and easier to layer with bands.",
    materialsAndCare:
      "Recycled 18k yellow gold and natural ruby, heat-treated. Remove before sports; annual professional setting check recommended.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [15, 10, 3],
    imgAlts: [
      "Ruby east-west oval ring",
      "Ruby ring on stone surface",
      "Close view of four-prong horizontal setting",
    ],
    v: [
      { size: "5", material: "gold-18k", gemstone: "ruby", priceUSD: 1220, stock: 2 },
      { size: "6", material: "gold-18k", gemstone: "ruby", priceUSD: 1220, stock: 2 },
      { size: "7", material: "gold-18k", gemstone: "ruby", priceUSD: 1220, stock: 1 },
    ],
    rating: 4.9,
    reviewCount: 28,
    tags: ["limited"],
    relatedIds: ["r003", "r007", "r009", "r012"],
    publishedAt: "2025-10-22",
  }),
  make({
    id: "r014",
    slug: "classic-wedding-band-r014",
    name: "Classic Wedding Band",
    category: "rings",
    shortDescription: "Plain 3mm comfort-fit wedding band in 18k yellow gold.",
    description:
      "The band many couples come back for a second time. 3mm wide, comfort-fit on the inside, matte or polished finish available.",
    materialsAndCare:
      "Recycled 18k yellow gold, comfort-fit interior. Safe for daily wear; have the band inspected annually for wear marks.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [19, 3, 10],
    imgAlts: [
      "Classic 3mm yellow gold wedding band",
      "Wedding band on warm linen",
      "Close view of comfort-fit interior",
    ],
    v: [
      { size: "5", material: "gold-18k", gemstone: "none", priceUSD: 590, stock: 14 },
      { size: "6", material: "gold-18k", gemstone: "none", priceUSD: 590, stock: 18 },
      { size: "7", material: "gold-18k", gemstone: "none", priceUSD: 590, stock: 15 },
      { size: "8", material: "gold-18k", gemstone: "none", priceUSD: 590, stock: 12 },
      { size: "9", material: "gold-18k", gemstone: "none", priceUSD: 590, stock: 8 },
    ],
    rating: 4.9,
    reviewCount: 264,
    tags: ["bestseller"],
    relatedIds: ["r001", "r002", "r005", "r008"],
    publishedAt: "2024-05-02",
  }),
  make({
    id: "r015",
    slug: "topaz-stacker-r015",
    name: "Topaz Stacker",
    category: "rings",
    shortDescription: "Slim 1.5mm band set with a single small blue topaz.",
    description:
      "A stacker with a single stone. The topaz sits in a tiny bezel barely wider than the band, so the ring reads slim even with the color.",
    materialsAndCare:
      "Recycled 14k yellow gold with natural blue topaz. Wipe clean; avoid ultrasonic cleaning which can dislodge bezel-set stones.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [10, 19, 15],
    imgAlts: [
      "Topaz stacker ring in 14k yellow gold",
      "Topaz stacker paired with other bands",
      "Close view of bezel-set blue topaz",
    ],
    v: [
      { size: "5", material: "gold-14k", gemstone: "topaz", priceUSD: 280, compareAtUSD: 325, stock: 9 },
      { size: "6", material: "gold-14k", gemstone: "topaz", priceUSD: 280, compareAtUSD: 325, stock: 11 },
      { size: "7", material: "gold-14k", gemstone: "topaz", priceUSD: 280, compareAtUSD: 325, stock: 6 },
    ],
    rating: 4.6,
    reviewCount: 118,
    tags: ["sale", "new"],
    relatedIds: ["r005", "r008", "r011", "r012"],
    publishedAt: "2026-03-14",
  }),
];

// ============================================================================
// BRACELETS (12)
// ============================================================================

const BRACELETS: Product[] = [
  make({
    id: "b001",
    slug: "mara-cuff-b001",
    name: "Mara Cuff",
    category: "bracelets",
    shortDescription: "Rounded open cuff in solid 14k gold with softened ends.",
    description:
      "A cuff you put on in the morning and forget about. The opening is wide enough to slip on, narrow enough to stay put; ends are hand-softened.",
    materialsAndCare:
      "Recycled 14k yellow gold, solid cast. Do not bend repeatedly to adjust fit; have it resized at the atelier instead.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [2, 22, 20],
    imgAlts: [
      "Mara rounded open cuff in 14k gold",
      "Mara cuff worn on the wrist",
      "Close view of hand-softened ends",
    ],
    v: [
      { size: "S", material: "gold-14k", gemstone: "none", priceUSD: 720, stock: 6 },
      { size: "M", material: "gold-14k", gemstone: "none", priceUSD: 720, stock: 9 },
      { size: "L", material: "gold-14k", gemstone: "none", priceUSD: 720, stock: 4 },
    ],
    rating: 4.8,
    reviewCount: 134,
    tags: ["bestseller", "handcrafted"],
    relatedIds: ["b003", "b005", "b009", "b012"],
    publishedAt: "2024-08-22",
  }),
  make({
    id: "b002",
    slug: "tennis-ravello-b002",
    name: "Tennis Ravello",
    category: "bracelets",
    shortDescription: "Classic diamond tennis bracelet with a safety figure-8 clasp.",
    description:
      "A full-tennis bracelet with shared four-prong baskets, finished with a figure-8 safety on top of the lobster clasp. Built to be worn every day.",
    materialsAndCare:
      "Recycled 18k white gold with SI1-clarity diamonds. Check clasp and prongs every six months; professional ultrasonic cleaning safe.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [22, 2, 20],
    imgAlts: [
      "Tennis Ravello diamond bracelet",
      "Tennis bracelet laid flat on stone",
      "Close view of shared four-prong setting",
    ],
    v: [
      { size: "6.5\"", material: "white-gold", gemstone: "diamond", priceUSD: 1650, stock: 2 },
      { size: "7\"", material: "white-gold", gemstone: "diamond", priceUSD: 1650, stock: 2 },
      { size: "7.5\"", material: "white-gold", gemstone: "diamond", priceUSD: 1650, stock: 1 },
    ],
    rating: 4.9,
    reviewCount: 54,
    tags: ["limited"],
    relatedIds: ["b004", "b006", "b008", "b010"],
    publishedAt: "2025-07-05",
  }),
  make({
    id: "b003",
    slug: "kivu-paperclip-b003",
    name: "Kivu Paperclip",
    category: "bracelets",
    shortDescription: "Paperclip-link bracelet in solid 14k gold, matches the necklace.",
    description:
      "Bracelet mate to the Kivu necklace. Same soldered links at the same gauge; the clasp is hidden on the underside when fastened.",
    materialsAndCare:
      "Recycled 14k yellow gold, link-soldered. Polish gently; safe for daily wear.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [2, 20, 22],
    imgAlts: [
      "Kivu paperclip chain bracelet",
      "Kivu bracelet on warm neutral surface",
      "Close view of soldered link detail",
    ],
    v: [
      { size: "6.5\"", material: "gold-14k", gemstone: "none", priceUSD: 520, stock: 10 },
      { size: "7\"", material: "gold-14k", gemstone: "none", priceUSD: 560, stock: 12 },
      { size: "7.5\"", material: "gold-14k", gemstone: "none", priceUSD: 595, stock: 7 },
    ],
    rating: 4.7,
    reviewCount: 178,
    tags: ["bestseller", "handcrafted"],
    relatedIds: ["b001", "b005", "b007", "b012"],
    publishedAt: "2024-10-14",
  }),
  make({
    id: "b004",
    slug: "antares-bangle-b004",
    name: "Antares Bangle",
    category: "bracelets",
    shortDescription: "Closed bangle with a single row of bezel-set diamonds on top.",
    description:
      "A bangle worn as a permanent wrist piece. Diamonds are bezel-set into the top face, the inside stays smooth and comfortable against the skin.",
    materialsAndCare:
      "Recycled 18k white gold, solid bangle with bezel-set diamonds. Safe for daily wear; clean with a soft brush and warm soapy water.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [22, 20, 2],
    imgAlts: [
      "Antares closed diamond bangle",
      "Antares bangle on wrist",
      "Close detail of bezel-set top row",
    ],
    v: [
      { size: "S", material: "white-gold", gemstone: "diamond", priceUSD: 1180, compareAtUSD: 1380, stock: 3 },
      { size: "M", material: "white-gold", gemstone: "diamond", priceUSD: 1180, compareAtUSD: 1380, stock: 4 },
      { size: "L", material: "white-gold", gemstone: "diamond", priceUSD: 1180, compareAtUSD: 1380, stock: 2 },
    ],
    rating: 4.8,
    reviewCount: 39,
    tags: ["sale", "limited"],
    relatedIds: ["b002", "b006", "b008", "b011"],
    publishedAt: "2025-05-10",
  }),
  make({
    id: "b005",
    slug: "cassia-chain-b005",
    name: "Cassia Chain",
    category: "bracelets",
    shortDescription: "Fine rolo chain bracelet, adjustable between 6.5\" and 7.5\".",
    description:
      "A featherweight rolo chain for the wrist. Adjustable between 6.5\" and 7.5\" via a small slide on the clasp, so fit is precise without a resize.",
    materialsAndCare:
      "Recycled 14k yellow gold, adjustable rolo chain. Do not sleep in the bracelet; wipe with a soft cloth after wear.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [20, 2, 22],
    imgAlts: [
      "Cassia fine rolo chain bracelet",
      "Cassia bracelet coiled on linen",
      "Close view of adjustable clasp",
    ],
    v: [
      { material: "gold-14k", gemstone: "none", priceUSD: 280, stock: 22 },
      { material: "rose-gold", gemstone: "none", priceUSD: 280, stock: 15 },
      { material: "white-gold", gemstone: "none", priceUSD: 305, stock: 9 },
    ],
    rating: 4.7,
    reviewCount: 298,
    tags: ["bestseller"],
    relatedIds: ["b001", "b003", "b009", "b012"],
    publishedAt: "2024-06-18",
  }),
  make({
    id: "b006",
    slug: "soraya-line-b006",
    name: "Soraya Line",
    category: "bracelets",
    shortDescription: "Alternating sapphire and diamond line bracelet.",
    description:
      "Blue sapphires and white diamonds alternating in a full line. The stones are set in shared four-prong baskets so the bracelet lies smooth and flat on the wrist.",
    materialsAndCare:
      "Recycled 18k white gold, natural sapphires and diamonds. Annual professional inspection recommended.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [22, 2, 20],
    imgAlts: [
      "Soraya sapphire and diamond line bracelet",
      "Soraya line bracelet on warm surface",
      "Close detail of alternating stones",
    ],
    v: [
      { size: "6.5\"", material: "white-gold", gemstone: "sapphire", priceUSD: 1720, stock: 1 },
      { size: "7\"", material: "white-gold", gemstone: "sapphire", priceUSD: 1720, stock: 2 },
    ],
    rating: 4.9,
    reviewCount: 26,
    tags: ["limited"],
    relatedIds: ["b002", "b004", "b008", "b011"],
    publishedAt: "2025-11-08",
  }),
  make({
    id: "b007",
    slug: "lune-pearl-strand-b007",
    name: "Lune Pearl Strand",
    category: "bracelets",
    shortDescription: "Knotted freshwater pearl strand bracelet with a small gold clasp.",
    description:
      "A bracelet to pair with the Muguet necklace or wear alone. Pearls are hand-knotted on silk; the clasp is a tiny gold lobster designed to sit flush.",
    materialsAndCare:
      "AAA freshwater pearls knotted on silk, recycled 14k gold clasp. Never submerge in water; wipe with a barely damp cloth.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [20, 22, 2],
    imgAlts: [
      "Lune knotted freshwater pearl bracelet",
      "Lune pearl bracelet on stone",
      "Close view of small gold clasp",
    ],
    v: [
      { size: "6.5\"", material: "gold-14k", gemstone: "pearl", priceUSD: 310, stock: 7 },
      { size: "7\"", material: "gold-14k", gemstone: "pearl", priceUSD: 340, stock: 5 },
    ],
    rating: 4.6,
    reviewCount: 63,
    tags: ["handcrafted"],
    relatedIds: ["b003", "b005", "b009", "b010"],
    publishedAt: "2025-02-03",
  }),
  make({
    id: "b008",
    slug: "meridian-id-b008",
    name: "Meridian ID",
    category: "bracelets",
    shortDescription: "Flat ID-bar bracelet with engravable face and cable-link chain.",
    description:
      "Meridian brings the ID-bracelet silhouette into a softer language. The flat bar is engravable; the cable chain is light enough to layer with a watch.",
    materialsAndCare:
      "Recycled 14k yellow gold, solid bar and cable chain. Polish with a jeweler's cloth; engraving is free with purchase.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [20, 2, 22],
    imgAlts: [
      "Meridian engravable ID bracelet",
      "Meridian ID bracelet on wrist",
      "Close view of bar ready for engraving",
    ],
    v: [
      { size: "7\"", material: "gold-14k", gemstone: "none", priceUSD: 480, stock: 8 },
      { size: "7.5\"", material: "gold-14k", gemstone: "none", priceUSD: 510, stock: 5 },
    ],
    rating: 4.5,
    reviewCount: 91,
    tags: ["handcrafted"],
    relatedIds: ["b001", "b003", "b011", "b012"],
    publishedAt: "2024-12-18",
  }),
  make({
    id: "b009",
    slug: "dahlia-charm-b009",
    name: "Dahlia Charm",
    category: "bracelets",
    shortDescription: "Charm bracelet with a single flower charm in yellow gold.",
    description:
      "A charm bracelet built around a single idea, not a collection. The flower charm hangs from a fine anchor chain; additional charms can be added at any time.",
    materialsAndCare:
      "Recycled 14k yellow gold, hand-finished flower charm. Safe for daily wear; polish charms separately for best result.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [2, 20, 22],
    imgAlts: [
      "Dahlia single-charm bracelet",
      "Dahlia bracelet on linen",
      "Close view of flower charm detail",
    ],
    v: [
      { size: "6.5\"", material: "gold-14k", gemstone: "none", priceUSD: 360, compareAtUSD: 420, stock: 9 },
      { size: "7\"", material: "gold-14k", gemstone: "none", priceUSD: 385, compareAtUSD: 450, stock: 12 },
    ],
    rating: 4.7,
    reviewCount: 145,
    tags: ["sale", "new"],
    relatedIds: ["b001", "b005", "b007", "b010"],
    publishedAt: "2026-01-28",
  }),
  make({
    id: "b010",
    slug: "emerald-line-b010",
    name: "Emerald Line",
    category: "bracelets",
    shortDescription: "Line bracelet with round emeralds in shared four-prong baskets.",
    description:
      "A full line of small round emeralds in shared four-prong baskets, set in yellow gold. The warm metal brings out the green.",
    materialsAndCare:
      "Recycled 18k yellow gold and natural emeralds, minor oil treatment. Do not clean ultrasonically; wipe dry after wear.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [22, 20, 2],
    imgAlts: [
      "Emerald line bracelet in 18k yellow gold",
      "Emerald line bracelet on stone",
      "Close view of round emeralds in shared baskets",
    ],
    v: [
      { size: "6.5\"", material: "gold-18k", gemstone: "emerald", priceUSD: 1420, stock: 2 },
      { size: "7\"", material: "gold-18k", gemstone: "emerald", priceUSD: 1420, stock: 3 },
    ],
    rating: 4.8,
    reviewCount: 34,
    tags: ["limited"],
    relatedIds: ["b002", "b004", "b006", "b011"],
    publishedAt: "2025-09-01",
  }),
  make({
    id: "b011",
    slug: "aurora-cuff-b011",
    name: "Aurora Cuff",
    category: "bracelets",
    shortDescription: "Wide open cuff in hammered silver with a satin interior.",
    description:
      "The wider, more sculptural sister of Mara. Hammered by hand on the outside, satin-finished inside; the opening sits at the side of the wrist.",
    materialsAndCare:
      "Sterling silver 925 with hammered exterior. Polish to restore sheen; re-hammering and refinishing offered at the atelier.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [20, 22, 2],
    imgAlts: [
      "Aurora wide hammered silver cuff",
      "Aurora cuff side profile",
      "Close view of hammered exterior texture",
    ],
    v: [
      { size: "S", material: "silver-925", gemstone: "none", priceUSD: 195, stock: 0 },
      { size: "M", material: "silver-925", gemstone: "none", priceUSD: 195, stock: 0 },
      { size: "L", material: "silver-925", gemstone: "none", priceUSD: 195, stock: 0 },
    ],
    rating: 4.4,
    reviewCount: 52,
    tags: ["handcrafted"],
    relatedIds: ["b001", "b004", "b008", "b012"],
    publishedAt: "2024-11-09",
  }),
  make({
    id: "b012",
    slug: "nova-rolo-b012",
    name: "Nova Rolo",
    category: "bracelets",
    shortDescription: "Medium rolo chain bracelet with a polished toggle closure.",
    description:
      "Matches the Nova necklace. A step up in weight from the Cassia, with a polished toggle that becomes the decorative detail.",
    materialsAndCare:
      "Sterling silver 925 with rhodium flash. Polish with included cloth; store in an airtight pouch to slow tarnish.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [20, 22, 2],
    imgAlts: [
      "Nova medium rolo chain bracelet",
      "Nova bracelet laid flat on linen",
      "Close view of polished toggle closure",
    ],
    v: [
      { size: "7\"", material: "silver-925", gemstone: "none", priceUSD: 95, compareAtUSD: 125, stock: 24 },
      { size: "7.5\"", material: "silver-925", gemstone: "none", priceUSD: 105, compareAtUSD: 135, stock: 18 },
    ],
    rating: 4.4,
    reviewCount: 187,
    tags: ["sale"],
    relatedIds: ["b003", "b005", "b008", "b009"],
    publishedAt: "2024-07-26",
  }),
];

// ============================================================================
// ANKLETS (10)
// ============================================================================

const ANKLETS: Product[] = [
  make({
    id: "a001",
    slug: "lune-anklet-a001",
    name: "Lune Anklet",
    category: "anklets",
    shortDescription: "Fine curb-chain anklet in 14k gold with a crescent charm.",
    description:
      "A thin curb chain with a small crescent charm that rests at the side of the ankle. Adjustable between 9\" and 10\" via a tiny slide clasp.",
    materialsAndCare:
      "Recycled 14k yellow gold curb chain with crescent charm. Wipe clean; avoid salt water to preserve the finish.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [7, 14, 1],
    imgAlts: [
      "Lune crescent charm anklet in 14k gold",
      "Lune anklet laid flat on linen",
      "Close view of crescent charm detail",
    ],
    v: [
      { material: "gold-14k", gemstone: "none", priceUSD: 225, stock: 16 },
      { material: "rose-gold", gemstone: "none", priceUSD: 225, stock: 11 },
    ],
    rating: 4.7,
    reviewCount: 142,
    tags: ["bestseller"],
    relatedIds: ["a002", "a005", "a007", "a010"],
    publishedAt: "2024-09-12",
  }),
  make({
    id: "a002",
    slug: "kivu-paperclip-a002",
    name: "Kivu Paperclip",
    category: "anklets",
    shortDescription: "Paperclip-link anklet in solid 14k gold, built to match the set.",
    description:
      "The anklet in the Kivu family. Same soldered paperclip links at a slightly lighter gauge for the ankle, with the same hidden clasp.",
    materialsAndCare:
      "Recycled 14k yellow gold, link-soldered. Safe for daily wear; avoid chlorine and salt water.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [7, 1, 14],
    imgAlts: [
      "Kivu paperclip-link anklet in 14k gold",
      "Kivu anklet on stone surface",
      "Close view of soldered link",
    ],
    v: [
      { size: "9\"", material: "gold-14k", gemstone: "none", priceUSD: 385, stock: 9 },
      { size: "10\"", material: "gold-14k", gemstone: "none", priceUSD: 420, stock: 6 },
    ],
    rating: 4.6,
    reviewCount: 78,
    tags: ["handcrafted"],
    relatedIds: ["a001", "a004", "a007", "a009"],
    publishedAt: "2024-10-30",
  }),
  make({
    id: "a003",
    slug: "soraya-sapphire-drop-a003",
    name: "Soraya Sapphire",
    category: "anklets",
    shortDescription: "Fine anklet with a single sapphire drop at the side.",
    description:
      "A sapphire anklet, quiet in hand, bright on the skin. The stone sits along the ankle rather than at the front, which keeps it visible without competing with shoes.",
    materialsAndCare:
      "Recycled 14k yellow gold and natural blue sapphire. Remove before swimming; wipe clean after wear.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [14, 7, 1],
    imgAlts: [
      "Soraya sapphire drop anklet",
      "Soraya anklet on warm neutral cloth",
      "Close view of side-set sapphire",
    ],
    v: [
      { material: "gold-14k", gemstone: "sapphire", priceUSD: 320, compareAtUSD: 385, stock: 6 },
    ],
    rating: 4.8,
    reviewCount: 47,
    tags: ["sale", "new"],
    relatedIds: ["a001", "a006", "a008", "a010"],
    publishedAt: "2026-02-08",
  }),
  make({
    id: "a004",
    slug: "cassia-chain-a004",
    name: "Cassia Chain",
    category: "anklets",
    shortDescription: "Featherweight rolo-chain anklet, adjustable clasp.",
    description:
      "The lightest anklet we make. A fine rolo chain with an adjustable clasp, sized to sit just above the ankle bone or lower at the joint.",
    materialsAndCare:
      "Recycled 14k yellow gold, adjustable rolo chain. Do not sleep or swim in the anklet.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [7, 14, 1],
    imgAlts: [
      "Cassia fine rolo chain anklet",
      "Cassia anklet coiled on linen",
      "Close view of adjustable clasp",
    ],
    v: [
      { material: "gold-14k", gemstone: "none", priceUSD: 185, stock: 22 },
      { material: "rose-gold", gemstone: "none", priceUSD: 185, stock: 13 },
      { material: "silver-925", gemstone: "none", priceUSD: 75, stock: 18 },
    ],
    rating: 4.6,
    reviewCount: 231,
    tags: ["bestseller"],
    relatedIds: ["a001", "a002", "a005", "a007"],
    publishedAt: "2024-07-04",
  }),
  make({
    id: "a005",
    slug: "nova-figaro-a005",
    name: "Nova Figaro",
    category: "anklets",
    shortDescription: "Figaro-link anklet in silver with a polished lobster clasp.",
    description:
      "A silver figaro anklet with the alternating three-one link pattern, closed with a small polished lobster clasp.",
    materialsAndCare:
      "Sterling silver 925 with rhodium flash. Polish with included cloth; store in airtight pouch to resist tarnish.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [14, 1, 7],
    imgAlts: [
      "Nova figaro-link silver anklet",
      "Nova anklet on stone surface",
      "Close view of alternating figaro links",
    ],
    v: [
      { size: "9\"", material: "silver-925", gemstone: "none", priceUSD: 85, stock: 24 },
      { size: "10\"", material: "silver-925", gemstone: "none", priceUSD: 95, stock: 16 },
    ],
    rating: 4.3,
    reviewCount: 156,
    tags: ["bestseller"],
    relatedIds: ["a002", "a004", "a009", "a010"],
    publishedAt: "2024-08-30",
  }),
  make({
    id: "a006",
    slug: "muguet-pearl-a006",
    name: "Muguet Pearl",
    category: "anklets",
    shortDescription: "Freshwater pearl anklet with small gold spacers between pearls.",
    description:
      "Small rice pearls separated by tiny gold spacers. The spacing keeps pearls from knocking together and gives the anklet rhythm.",
    materialsAndCare:
      "AAA freshwater pearls on silk with recycled 14k gold spacers. Never submerge; wipe with a barely damp cloth.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [11, 14, 7],
    imgAlts: [
      "Muguet freshwater pearl anklet",
      "Muguet pearl anklet on linen",
      "Close view of gold spacers between pearls",
    ],
    v: [
      { size: "9\"", material: "gold-14k", gemstone: "pearl", priceUSD: 265, stock: 0 },
      { size: "10\"", material: "gold-14k", gemstone: "pearl", priceUSD: 290, stock: 0 },
    ],
    rating: 4.7,
    reviewCount: 68,
    tags: ["handcrafted"],
    relatedIds: ["a001", "a003", "a008", "a010"],
    publishedAt: "2025-05-20",
  }),
  make({
    id: "a007",
    slug: "antares-anklet-a007",
    name: "Antares Station",
    category: "anklets",
    shortDescription: "Diamond-station anklet with three bezel-set stones spaced along.",
    description:
      "Three small bezel-set diamonds along a fine cable chain. Reads like a delicate bracelet transposed to the ankle.",
    materialsAndCare:
      "Recycled 18k white gold with VS-clarity lab-grown diamonds. Avoid impact at the ankle; inspect settings annually.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [1, 14, 7],
    imgAlts: [
      "Antares diamond station anklet",
      "Antares anklet laid flat on linen",
      "Close detail of bezel-set diamonds",
    ],
    v: [
      { size: "9\"", material: "white-gold", gemstone: "diamond", priceUSD: 520, compareAtUSD: 620, stock: 5 },
      { size: "10\"", material: "white-gold", gemstone: "diamond", priceUSD: 560, compareAtUSD: 660, stock: 3 },
    ],
    rating: 4.8,
    reviewCount: 41,
    tags: ["sale", "new"],
    relatedIds: ["a003", "a006", "a008", "a010"],
    publishedAt: "2026-03-20",
  }),
  make({
    id: "a008",
    slug: "emerald-point-a008",
    name: "Emerald Point",
    category: "anklets",
    shortDescription: "Single small emerald on a fine yellow gold chain.",
    description:
      "One small emerald in a tiny bezel, at the side of the ankle. A quiet piece that pairs well with a strappy sandal.",
    materialsAndCare:
      "Recycled 14k yellow gold and natural emerald. Avoid ultrasonic cleaning; wipe clean after wear.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [14, 7, 1],
    imgAlts: [
      "Emerald point anklet in 14k gold",
      "Emerald anklet on neutral surface",
      "Close view of bezel-set emerald",
    ],
    v: [
      { material: "gold-14k", gemstone: "emerald", priceUSD: 285, stock: 7 },
      { material: "rose-gold", gemstone: "emerald", priceUSD: 285, stock: 5 },
    ],
    rating: 4.5,
    reviewCount: 52,
    tags: ["handcrafted"],
    relatedIds: ["a003", "a006", "a009", "a010"],
    publishedAt: "2025-07-28",
  }),
  make({
    id: "a009",
    slug: "meridian-bar-a009",
    name: "Meridian Bar",
    category: "anklets",
    shortDescription: "Horizontal bar anklet, engravable on the face.",
    description:
      "The bar anklet. Horizontal bar with room for initials or a date, suspended from a fine cable chain that meets at the side of the ankle.",
    materialsAndCare:
      "Recycled 14k yellow gold with fine cable chain. Engraving free with purchase; polish gently with a dry cloth.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [1, 7, 14],
    imgAlts: [
      "Meridian engravable bar anklet",
      "Meridian bar anklet on linen",
      "Close view of bar ready for engraving",
    ],
    v: [
      { size: "9\"", material: "gold-14k", gemstone: "none", priceUSD: 210, stock: 12 },
      { size: "10\"", material: "gold-14k", gemstone: "none", priceUSD: 230, stock: 8 },
    ],
    rating: 4.6,
    reviewCount: 89,
    tags: ["handcrafted"],
    relatedIds: ["a002", "a004", "a007", "a010"],
    publishedAt: "2024-11-20",
  }),
  make({
    id: "a010",
    slug: "orchidee-sapphire-a010",
    name: "Orchidée Pink",
    category: "anklets",
    shortDescription: "Pink sapphire accent on a fine rose gold anklet chain.",
    description:
      "Pink sapphire in a tiny bezel, rose gold chain. A warm, quiet anklet that pairs with the Orchidée earring and lariat.",
    materialsAndCare:
      "Recycled 14k rose gold and natural pink sapphire. Wipe clean; avoid lotions and perfumes.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [7, 14, 1],
    imgAlts: [
      "Orchidée pink sapphire anklet in rose gold",
      "Orchidée anklet on warm neutral cloth",
      "Close view of bezel-set pink sapphire",
    ],
    v: [
      { size: "9\"", material: "rose-gold", gemstone: "sapphire", priceUSD: 340, stock: 6 },
      { size: "10\"", material: "rose-gold", gemstone: "sapphire", priceUSD: 365, stock: 4 },
    ],
    rating: 4.7,
    reviewCount: 58,
    tags: ["new", "handcrafted"],
    relatedIds: ["a001", "a003", "a006", "a008"],
    publishedAt: "2026-04-02",
  }),
];

// ============================================================================
// PENDANTS (10)
// ============================================================================

const PENDANTS: Product[] = [
  make({
    id: "p001",
    slug: "lune-crescent-p001",
    name: "Lune Crescent",
    category: "pendants",
    shortDescription: "Brushed crescent pendant with a flush-set diamond, sold without chain.",
    description:
      "The Lune crescent sold as a standalone pendant. Fits a 1.1mm box or cable chain; the bail is designed to sit open but discreet on the chain.",
    materialsAndCare:
      "Recycled 14k yellow gold and VS-clarity lab-grown diamond. Wipe gently with a dry cloth.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [21, 6, 17],
    imgAlts: [
      "Lune crescent pendant without chain",
      "Lune pendant on linen",
      "Close detail of flush-set diamond",
    ],
    v: [
      { material: "gold-14k", gemstone: "diamond", priceUSD: 245, stock: 12 },
      { material: "white-gold", gemstone: "diamond", priceUSD: 265, stock: 8 },
      { material: "rose-gold", gemstone: "diamond", priceUSD: 245, stock: 9 },
    ],
    rating: 4.8,
    reviewCount: 164,
    tags: ["bestseller"],
    relatedIds: ["p002", "p004", "p007", "p010"],
    publishedAt: "2024-10-01",
  }),
  make({
    id: "p002",
    slug: "soraya-sapphire-p002",
    name: "Soraya Sapphire",
    category: "pendants",
    shortDescription: "Bezel-set oval sapphire pendant, 1.2ct, without chain.",
    description:
      "A single oval sapphire bezel-set in white gold, sold without chain so it can be paired with an existing piece or purchased with a Cassia Chain.",
    materialsAndCare:
      "Recycled 18k white gold and natural blue sapphire, heat-treated. Clean with warm soapy water.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [6, 21, 17],
    imgAlts: [
      "Soraya bezel-set oval sapphire pendant",
      "Soraya pendant on stone tray",
      "Close detail of bezel-set sapphire",
    ],
    v: [
      { material: "white-gold", gemstone: "sapphire", priceUSD: 1180, stock: 3 },
    ],
    rating: 4.8,
    reviewCount: 37,
    tags: ["limited"],
    relatedIds: ["p003", "p005", "p008", "p009"],
    publishedAt: "2025-08-16",
  }),
  make({
    id: "p003",
    slug: "jasmine-petal-p003",
    name: "Jasmine Petal",
    category: "pendants",
    shortDescription: "Five-petal pendant with a soft satin finish, cast from a wax original.",
    description:
      "The Jasmine earring scaled up as a pendant. Cast from a wax carved in-house, hand-finished with a soft satin texture so the flower holds the light.",
    materialsAndCare:
      "Recycled 14k yellow gold with hand-finished satin texture. Polish gently; professional re-texturing available.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [17, 21, 6],
    imgAlts: [
      "Jasmine five-petal satin gold pendant",
      "Jasmine pendant on warm neutral surface",
      "Close view of satin-finished petal texture",
    ],
    v: [
      { material: "gold-14k", gemstone: "none", priceUSD: 285, stock: 14 },
      { material: "rose-gold", gemstone: "none", priceUSD: 285, stock: 9 },
    ],
    rating: 4.7,
    reviewCount: 121,
    tags: ["handcrafted"],
    relatedIds: ["p001", "p006", "p009", "p010"],
    publishedAt: "2024-11-28",
  }),
  make({
    id: "p004",
    slug: "meridian-bar-p004",
    name: "Meridian Bar",
    category: "pendants",
    shortDescription: "Horizontal bar pendant, sold without chain, engravable.",
    description:
      "The Meridian Bar sold alone. Engravable on the back; pairs with any 1.1mm chain in the collection.",
    materialsAndCare:
      "Recycled 14k yellow gold. Engraving free with purchase; polish gently with a dry cloth.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [17, 6, 21],
    imgAlts: [
      "Meridian engravable bar pendant",
      "Meridian pendant on linen",
      "Close view of bar ready for engraving",
    ],
    v: [
      { material: "gold-14k", gemstone: "none", priceUSD: 210, stock: 16 },
      { material: "rose-gold", gemstone: "none", priceUSD: 210, stock: 10 },
      { material: "white-gold", gemstone: "none", priceUSD: 230, stock: 7 },
    ],
    rating: 4.6,
    reviewCount: 105,
    tags: ["handcrafted"],
    relatedIds: ["p001", "p007", "p008", "p010"],
    publishedAt: "2024-12-15",
  }),
  make({
    id: "p005",
    slug: "emerald-cushion-p005",
    name: "Emerald Cushion",
    category: "pendants",
    shortDescription: "Cushion-cut emerald pendant in a low bezel with milgrain edge.",
    description:
      "A 1.5ct cushion emerald bezel-set in yellow gold with a milgrain edge cut by hand. Reads like a small heirloom.",
    materialsAndCare:
      "Recycled 18k yellow gold and natural emerald, minor oil treatment. Avoid ultrasonic cleaning; wipe dry after wear.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [21, 17, 6],
    imgAlts: [
      "Emerald cushion pendant with milgrain edge",
      "Emerald pendant on stone surface",
      "Close view of milgrain bezel",
    ],
    v: [
      { material: "gold-18k", gemstone: "emerald", priceUSD: 1280, stock: 2 },
      { material: "white-gold", gemstone: "emerald", priceUSD: 1340, stock: 1 },
    ],
    rating: 4.9,
    reviewCount: 24,
    tags: ["limited", "handcrafted"],
    relatedIds: ["p002", "p008", "p009", "p010"],
    publishedAt: "2025-10-05",
  }),
  make({
    id: "p006",
    slug: "nova-disc-p006",
    name: "Nova Disc",
    category: "pendants",
    shortDescription: "Flat round disc pendant with a hand-hammered face.",
    description:
      "A flat disc, 18mm across, hand-hammered on the front. The hammering catches light at every angle so the disc never reads static.",
    materialsAndCare:
      "Recycled 14k yellow gold, hand-hammered face. Polish with jeweler's cloth; re-hammering available at the atelier.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [17, 21, 6],
    imgAlts: [
      "Nova hand-hammered disc pendant",
      "Nova disc on warm linen",
      "Close view of hammered face",
    ],
    v: [
      { material: "gold-14k", gemstone: "none", priceUSD: 245, compareAtUSD: 295, stock: 15 },
      { material: "silver-925", gemstone: "none", priceUSD: 85, compareAtUSD: 105, stock: 22 },
    ],
    rating: 4.5,
    reviewCount: 198,
    tags: ["sale", "bestseller", "handcrafted"],
    relatedIds: ["p003", "p004", "p007", "p010"],
    publishedAt: "2024-09-20",
  }),
  make({
    id: "p007",
    slug: "kivu-key-p007",
    name: "Kivu Key",
    category: "pendants",
    shortDescription: "Small modern key pendant on a round bail.",
    description:
      "A contemporary take on the keepsake key. The bow is a perfect circle, the shank is slim, and the scale is small enough to sit at the collarbone.",
    materialsAndCare:
      "Recycled 14k yellow gold, solid cast. Polish gently; safe for daily wear.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [6, 17, 21],
    imgAlts: [
      "Kivu modern key pendant in 14k gold",
      "Kivu key pendant on stone",
      "Close view of key detail",
    ],
    v: [
      { material: "gold-14k", gemstone: "none", priceUSD: 320, stock: 8 },
      { material: "rose-gold", gemstone: "none", priceUSD: 320, stock: 6 },
    ],
    rating: 4.7,
    reviewCount: 76,
    tags: ["handcrafted"],
    relatedIds: ["p001", "p004", "p008", "p009"],
    publishedAt: "2025-03-18",
  }),
  make({
    id: "p008",
    slug: "ruby-tear-p008",
    name: "Ruby Tear",
    category: "pendants",
    shortDescription: "Pear-cut ruby in a three-prong tear-shaped setting.",
    description:
      "A pear-cut ruby suspended from a small three-prong setting, with the bail orienting the stone point-up. The red is deep, slightly warm in yellow gold.",
    materialsAndCare:
      "Recycled 18k yellow gold and natural ruby, heat-treated. Clean with warm soapy water; store in the provided pouch.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [21, 6, 17],
    imgAlts: [
      "Ruby pear-cut tear pendant in yellow gold",
      "Ruby pendant on linen",
      "Close view of three-prong setting",
    ],
    v: [
      { material: "gold-18k", gemstone: "ruby", priceUSD: 890, stock: 3 },
    ],
    rating: 4.8,
    reviewCount: 29,
    tags: ["limited"],
    relatedIds: ["p002", "p005", "p009", "p010"],
    publishedAt: "2025-06-08",
  }),
  make({
    id: "p009",
    slug: "lila-initial-p009",
    name: "Lila Initial",
    category: "pendants",
    shortDescription: "Single-letter initial pendant in the atelier's house font.",
    description:
      "A letter, cast by hand in a font drawn in-house. Each pendant is a single letter; the scale is small, intended to stack with other pendants on the same chain.",
    materialsAndCare:
      "Recycled 14k yellow gold, cast from the atelier's house font. Polish lightly; safe for daily wear.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [17, 21, 6],
    imgAlts: [
      "Lila single-letter initial pendant",
      "Lila initial pendant on warm cloth",
      "Close view of cast letter detail",
    ],
    v: [
      { material: "gold-14k", gemstone: "none", priceUSD: 185, stock: 26 },
      { material: "rose-gold", gemstone: "none", priceUSD: 185, stock: 17 },
      { material: "white-gold", gemstone: "none", priceUSD: 195, stock: 11 },
    ],
    rating: 4.8,
    reviewCount: 284,
    tags: ["new", "bestseller", "handcrafted"],
    relatedIds: ["p001", "p003", "p004", "p007"],
    publishedAt: "2026-02-12",
  }),
  make({
    id: "p010",
    slug: "aurora-half-moon-p010",
    name: "Aurora Half-Moon",
    category: "pendants",
    shortDescription: "Pavé half-moon pendant with graduated diamonds.",
    description:
      "A half-moon filled with graduated pavé. The smallest diamonds meet at the tip of the crescent; the largest sit in the middle of the arc.",
    materialsAndCare:
      "Recycled 18k white gold with VS-clarity lab-grown diamonds. Clean with a soft brush; professional ultrasonic service safe.",
    shippingAndReturns: SHIP_COPY,
    imgIdxs: [21, 17, 6],
    imgAlts: [
      "Aurora graduated pavé half-moon pendant",
      "Aurora half-moon pendant on stone",
      "Close view of graduated pavé",
    ],
    v: [
      { material: "white-gold", gemstone: "diamond", priceUSD: 680, compareAtUSD: 820, stock: 5 },
      { material: "gold-18k", gemstone: "diamond", priceUSD: 680, compareAtUSD: 820, stock: 3 },
    ],
    rating: 4.7,
    reviewCount: 62,
    tags: ["sale", "handcrafted"],
    relatedIds: ["p001", "p005", "p006", "p009"],
    publishedAt: "2025-12-11",
  }),
];

// ============================================================================
// CATALOG ASSEMBLY + EXPORTS
// ============================================================================

export const PRODUCTS: Product[] = [
  ...EARRINGS,
  ...NECKLACES,
  ...RINGS,
  ...BRACELETS,
  ...ANKLETS,
  ...PENDANTS,
];

export const PRODUCT_MAP: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((p) => [p.slug, p]),
);

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCT_MAP[slug];
}

export function getProductsByCategory(category: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const related = product.relatedIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);
  if (related.length >= limit) return related.slice(0, limit);
  const fallback = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id && !related.includes(p),
  );
  return [...related, ...fallback].slice(0, limit);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return PRODUCTS.filter((p) => p.tags.includes("bestseller") || p.tags.includes("limited"))
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function getBestsellers(limit = 8): Product[] {
  return PRODUCTS.filter((p) => p.tags.includes("bestseller"))
    .slice()
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
}

export function getNewArrivals(limit = 6): Product[] {
  return PRODUCTS.filter((p) => p.tags.includes("new"))
    .slice()
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, limit);
}

export function getOnSale(limit = 6): Product[] {
  return PRODUCTS.filter((p) => p.tags.includes("sale"))
    .slice()
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
}
