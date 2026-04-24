import { getCollectionProducts, getAllProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/product-card";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/data";

import CategoryClient from "@/components/category-client";

export default async function CategoryGrid({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  
  // Map display category to Shopify handle
  let shopifyProducts = [];
  
  if (category.toLowerCase() === 'all') {
    shopifyProducts = await getAllProducts();
  } else {
    let shopifyHandle = category;
    if (category.toLowerCase() === 'hoodies') shopifyHandle = 'hoodie';
    if (category.toLowerCase() === 'jeans') shopifyHandle = 'jeans';
    shopifyProducts = await getCollectionProducts(shopifyHandle);
  }
  
  // Map Shopify products to our Product type
  const displayProducts: Product[] = shopifyProducts.map((p: any) => ({
    id: p.id,
    src: p.images.edges[0]?.node.url || "/placeholder.jpg",
    secondarySrc: p.images.edges[1]?.node.url,
    srcs: p.images.edges.map((e: any) => e.node.url),
    title: p.title,
    price: `${p.priceRange.minVariantPrice.currencyCode === 'INR' ? 'RS. ' : '$'}${parseFloat(p.priceRange.minVariantPrice.amount).toLocaleString()}`,
    desc: p.description,
    category: p.productType || category.charAt(0).toUpperCase() + category.slice(1)
  }));

  const formattedCategory = category.toLowerCase() === 'all' ? 'ALL PRODUCTS' : category.split('-').join(' ');

  return (
    <main className="min-h-screen bg-white text-black font-sans relative">
      <CategoryClient 
        category={category}
        formattedCategory={formattedCategory}
        displayProducts={displayProducts}
      />
    </main>
  );
}
