import { getCollectionProducts, getAllProducts } from "@/lib/shopify";
import { Product } from "@/lib/data";
import LookbookClient from "@/components/lookbook-client";

export default async function Home() {
  let shopifyProducts = await getCollectionProducts("Landing Page");
  
  // If "Landing Page" collection is empty or missing, fetch all products as fallback
  if (shopifyProducts.length === 0) {
    console.log("No specific 'Landing Page' collection found. Falling back to all products.");
    shopifyProducts = await getAllProducts();
  }
  
  // Map Shopify products to our Product type
  const displayProducts: Product[] = shopifyProducts.map((p: any) => ({
    id: p.id,
    src: p.images.edges[0]?.node.url || "/placeholder.jpg",
    title: p.title,
    price: `${p.priceRange.minVariantPrice.currencyCode === 'INR' ? 'RS. ' : '$'}${parseFloat(p.priceRange.minVariantPrice.amount).toLocaleString()}`,
    desc: p.teaser?.value || p.description,
    category: p.productType || "Collection"
  }));

  return <LookbookClient products={displayProducts} />;
}

