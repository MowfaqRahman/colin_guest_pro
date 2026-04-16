export type Product = {
  id: number;
  src: string;
  srcs?: string[];
  title: string;
  price: string;
  desc: string;
  category: string;
};

export const models: Product[] = [
  { id: 1, src: "/1_trans.png", srcs: ["/1_trans.png", "/1_side_trans.png", "/1_back_trans.png"], title: "Avant-Garde Spring", price: "$1,295", desc: "Sleek minimalist dress featuring an asymmetrical cut. Perfect for high-fashion spring edits.", category: "Ready To Wear" },
  { id: 2, src: "/2_trans.png", title: "Urban Silhouette", price: "$895", desc: "Utility-inspired avant-garde streetwear. Heavy-duty straps and oversized pockets.", category: "Outerwear" },
  { id: 3, src: "/3_trans.png", title: "Minimalist Edit", price: "$1,050", desc: "Sharp, oversized tailored suit with broad shoulders and a crisp white undershirt.", category: "Ready To Wear" },
  { id: 4, src: "/4_trans.png", title: "Evening Collection", price: "$2,100", desc: "A dramatically long velvet evening dress with a deep slit and elegant styling.", category: "Ready To Wear" },
  { id: 5, src: "/5_trans.png", title: "Crimson Flow", price: "$1,850", desc: "A sweeping crimson red dress optimized for profound studio silhouettes and dramatic movement.", category: "Ready To Wear" },
  { id: 6, src: "/6_trans.png", title: "Textured Wool", price: "$1,450", desc: "Heavy oversized textured wool coat paired with wide-leg trousers for a bold structural statement.", category: "Outerwear" },
  { id: 7, src: "/7_trans.png", title: "Metallic Orbit", price: "$2,600", desc: "Striking metallic silver outfit constructed for futuristic, sharp aesthetics and deep reflections.", category: "Outerwear" },
  { id: 8, src: "/8_trans.png", title: "Noir Leather", price: "$3,100", desc: "Sleek tailored black leather trench coat. The pinnacle of moody, intense evening wear.", category: "Outerwear" },
];
