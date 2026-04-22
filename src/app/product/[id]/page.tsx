import { models, Product } from "@/lib/data";
import { getProductById, getProductRecommendations } from "@/lib/shopify";
import ProductClient from "@/components/product-client";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  let product: Product | undefined;
  let suggestedProducts: Product[] = models.slice(-4);

  // Try to find in mock data first (if it's a number)
  const mockId = parseInt(id);
  if (!isNaN(mockId)) {
    product = models.find((m) => m.id === mockId);
  }

  // If not found in mock data, try Shopify (if ID looks like a Shopify ID or mock failed)
  if (!product) {
    try {
      const shopifyProduct = await getProductById(decodeURIComponent(id));
      
      if (shopifyProduct) {
        product = {
          id: shopifyProduct.id,
          src: shopifyProduct.images.edges[0]?.node.url || "/placeholder.jpg",
          srcs: shopifyProduct.images.edges.map((e: any) => e.node.url),
          title: shopifyProduct.title,
          price: `${shopifyProduct.priceRange.minVariantPrice.currencyCode === 'INR' ? 'RS. ' : '$'}${parseFloat(shopifyProduct.priceRange.minVariantPrice.amount).toLocaleString()}`,
          desc: shopifyProduct.description,
          descriptionHtml: shopifyProduct.descriptionHtml,
          category: shopifyProduct.productType || "Collection",
          details: shopifyProduct.details?.value,
          sizeGuide: shopifyProduct.sizeGuide?.value,
          washcare: shopifyProduct.washcare?.value,
          shipping: shopifyProduct.shipping?.value,
          variants: shopifyProduct.variants?.edges.map((e: any) => ({
            id: e.node.id,
            title: e.node.title,
            availableForSale: e.node.availableForSale
          }))
        };

        // Fetch related products from Shopify
        const recommendations = await getProductRecommendations(shopifyProduct.id);
        if (recommendations && recommendations.length > 0) {
          suggestedProducts = recommendations.map((p: any) => ({
            id: p.id,
            src: p.images.edges[0]?.node.url || "/placeholder.jpg",
            srcs: p.images.edges.map((e: any) => e.node.url),
            title: p.title,
            price: `${p.priceRange.minVariantPrice.currencyCode === 'INR' ? 'RS. ' : '$'}${parseFloat(p.priceRange.minVariantPrice.amount).toLocaleString()}`,
            desc: p.description,
            category: p.productType || "Collection"
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching Shopify product:", error);
    }
  }

  if (!product) {
    notFound();
  }

  return <ProductClient product={product} suggestedProducts={suggestedProducts} />;
}

