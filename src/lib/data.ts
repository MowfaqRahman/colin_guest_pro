export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
};

export type Product = {
  id: string | number;
  src: string;
  secondarySrc?: string;
  srcs?: string[];
  title: string;
  price: string;
  desc: string;
  descriptionHtml?: string;
  category: string;
  details?: string;
  sizeGuide?: string;
  washcare?: string;
  shipping?: string;
  variants?: ProductVariant[];
};

export type Collection = {
  id: string;
  title: string;
  handle: string;
  image?: {
    url: string;
    altText?: string;
  };
};

export const models: Product[] = [
  { id: 1, src: "/black_acid_wash_hoodies.jpg", title: "Acid Wash Heavyweight", price: "$850", desc: "Premium heavyweight cotton with a deep acid wash finish for a vintage editorial silhouette.", category: "Hoodies" },
  { id: 2, src: "/black_faded_jean.jpg", title: "Faded Utility Denim", price: "$720", desc: "Relaxed fit luxury denim with custom distressing and a faded noir wash.", category: "Jeans" },
  { id: 3, src: "/blacks_set.jpg", title: "Monochrome Noir Set", price: "$1,450", desc: "A complete monochrome silhouette featuring coordinated textures for a deep, layered aesthetic.", category: "Outfits" },
  { id: 4, src: "/grey_hoodie_washed_jean.jpg", title: "Studio Grey Look", price: "$980", desc: "The signature studio grey hoodie paired with our heritage washed indigo denim.", category: "Hoodies" },
  { id: 5, src: "/printed_shirt_and_jeans.jpg", title: "Printed Editorial Duo", price: "$1,100", desc: "Bold printed graphics on luxury textiles, paired with architectural denim lines.", category: "Sets" },
  { id: 6, src: "/6_trans.png", title: "Textured Wool", price: "$1,450", desc: "Heavy oversized textured wool coat paired with wide-leg trousers for a bold structural statement.", category: "Jeans" },
  { id: 7, src: "/7_trans.png", title: "Metallic Orbit", price: "$2,600", desc: "Striking metallic silver outfit constructed for futuristic, sharp aesthetics and deep reflections.", category: "Jeans" },
  { id: 8, src: "/8_trans.png", title: "Noir Leather", price: "$3,100", desc: "Sleek tailored black leather trench coat. The pinnacle of moody, intense evening wear.", category: "Jeans" },
];
