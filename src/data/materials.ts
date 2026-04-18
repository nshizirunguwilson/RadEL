import type { Material, Gemstone } from "@/types/product";

export const MATERIAL_LABEL: Record<Material, string> = {
  "gold-18k": "18k Gold",
  "gold-14k": "14k Gold",
  "rose-gold": "Rose Gold",
  "white-gold": "White Gold",
  "silver-925": "Sterling Silver",
  platinum: "Platinum",
};

export const MATERIAL_LABEL_FR: Record<Material, string> = {
  "gold-18k": "Or 18 carats",
  "gold-14k": "Or 14 carats",
  "rose-gold": "Or rose",
  "white-gold": "Or blanc",
  "silver-925": "Argent sterling",
  platinum: "Platine",
};

export const GEMSTONE_LABEL: Record<Gemstone, string> = {
  none: "No stone",
  diamond: "Diamond",
  sapphire: "Sapphire",
  emerald: "Emerald",
  ruby: "Ruby",
  pearl: "Pearl",
  topaz: "Topaz",
  amethyst: "Amethyst",
  citrine: "Citrine",
};

export const GEMSTONE_LABEL_FR: Record<Gemstone, string> = {
  none: "Sans pierre",
  diamond: "Diamant",
  sapphire: "Saphir",
  emerald: "Émeraude",
  ruby: "Rubis",
  pearl: "Perle",
  topaz: "Topaze",
  amethyst: "Améthyste",
  citrine: "Citrine",
};

export const MATERIAL_ORDER: Material[] = [
  "gold-18k",
  "gold-14k",
  "rose-gold",
  "white-gold",
  "silver-925",
  "platinum",
];

export const GEMSTONE_ORDER: Gemstone[] = [
  "diamond",
  "sapphire",
  "emerald",
  "ruby",
  "pearl",
  "topaz",
  "amethyst",
  "citrine",
  "none",
];
