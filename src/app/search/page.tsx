import { searchProducts, getAllCollections } from "@/lib/shopify";
import CategoryClient from "@/components/category-client";
import { Product } from "@/lib/data";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q: searchQuery } = await searchParams;

  if (!searchQuery) {
    return (
      <main className="min-h-screen bg-white text-black font-sans pt-32 px-8">
        <h1 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Search Results</h1>
        <div className="w-full py-32 flex flex-col items-center justify-center border border-dashed border-black/10 rounded-lg mt-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Please enter a search query</p>
        </div>
      </main>
    );
  }

  const [shopifyProducts, allCollections] = await Promise.all([
    searchProducts(searchQuery),
    getAllCollections()
  ]);

  const collections = allCollections.filter(c => c.title.toLowerCase() !== 'landing page');

  const displayProducts: Product[] = shopifyProducts.map((p: any) => ({
    id: p.id,
    src: p.images[0]?.url || "/placeholder.jpg",
    secondarySrc: p.images[1]?.url,
    srcs: p.images.map((img: any) => img.url),
    title: p.title,
    price: `${p.priceRange.minVariantPrice.currencyCode === 'INR' ? 'RS. ' : '$'}${parseFloat(p.priceRange.minVariantPrice.amount).toLocaleString()}`,
    desc: p.description,
    category: p.productType || "Result"
  }));

  const formattedCategory = `SEARCH RESULTS FOR "${searchQuery.toUpperCase()}"`;

  return (
    <main className="min-h-screen bg-white text-black font-sans relative">
      <CategoryClient 
        category="search"
        formattedCategory={formattedCategory}
        displayProducts={displayProducts}
        collections={collections}
      />
    </main>
  );
}
