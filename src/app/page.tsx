import { getCollectionProducts } from "@/lib/shopify";
import { models, Product } from "@/lib/data";
import LookbookClient from "@/components/lookbook-client";

export default async function Home() {
  const shopifyProducts = await getCollectionProducts("Landing Page");
  
  // Map Shopify products to our Product type
  const mappedProducts: Product[] = shopifyProducts.map((p: any) => ({
    id: p.id,
    src: p.images.edges[0]?.node.url || "/placeholder.jpg",
    title: p.title,
    price: `${p.priceRange.minVariantPrice.currencyCode === 'INR' ? 'RS. ' : '$'}${parseFloat(p.priceRange.minVariantPrice.amount).toLocaleString()}`,
    desc: p.description,
    category: p.productType || "Collection"
  }));

  // Fallback to mock data if no products found in Shopify
  const displayProducts = mappedProducts.length > 0 ? mappedProducts : models;

  return <LookbookClient products={displayProducts} />;
}

