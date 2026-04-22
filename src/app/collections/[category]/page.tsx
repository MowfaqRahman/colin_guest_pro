import { getCollectionProducts, getAllProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/product-card";
import { SlidersHorizontal } from "lucide-react";
import { Product } from "@/lib/data";

export default async function CategoryGrid({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  
  // Map display category to Shopify handle
  // User specifically mentioned "jeans" and "hoodie" collections
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
    title: p.title,
    price: `${p.priceRange.minVariantPrice.currencyCode === 'INR' ? 'RS. ' : '$'}${parseFloat(p.priceRange.minVariantPrice.amount).toLocaleString()}`,
    desc: p.description,
    category: p.productType || category.charAt(0).toUpperCase() + category.slice(1)
  }));

  const formattedCategory = category.split('-').join(' ');

  return (
    <main className="min-h-screen bg-white text-black font-sans relative">
      <div className="pt-32 px-8 max-w-[1800px] mx-auto pb-24">
        
        {/* Top Header Row */}
        <div className="flex justify-between items-center mb-12">
           <h1 className="text-sm font-bold uppercase tracking-widest capitalize">{formattedCategory}</h1>
           <button className="flex items-center gap-3 border border-black/10 rounded-full px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:border-black transition">
             <SlidersHorizontal size={14} /> Advance Filters
           </button>
        </div>

        {/* Dense Grid with Interactive Cards */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {displayProducts.map((product, i) => (
              <ProductCard product={product} index={i} key={product.id} />
            ))}
          </div>
          {displayProducts.length === 0 && (
            <div className="w-full py-32 flex flex-col items-center justify-center border border-dashed border-black/10 rounded-lg">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">No products found in this collection</p>
              <p className="text-[9px] uppercase tracking-[0.1em] opacity-20 mt-2">Check back later or explore other categories</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
