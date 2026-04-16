"use client";

import { use } from "react";
import Link from "next/link";
import { models } from "@/lib/data";
import { Search, ShoppingBag, SlidersHorizontal, Bookmark, User } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { useCartStore } from "@/lib/store";

export default function CategoryGrid({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const formattedCategory = resolvedParams.category.split('-').join(' ');
  const { items, openCart, wishlistItems } = useCartStore();

  // Filter if it matches, else show all (for prototyping)
  const filteredModels = models.filter(m => m.category.toLowerCase() === formattedCategory.toLowerCase());
  const displayModels = filteredModels.length > 0 ? filteredModels : models;

  return (
    <main className="min-h-screen bg-white text-black font-sans relative">
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="flex items-center justify-between px-8 py-6">
          <Link href="/" className="text-xl font-bold tracking-widest uppercase">COLIN GUEST</Link>
          <div className="hidden md:flex gap-12 text-[10px] tracking-[0.2em] uppercase font-bold">
            <button className="hover:text-black/60 transition-colors">Runway</button>
            <Link href="/" className="hover:text-black/60 transition-colors">The Lookbook</Link>
            <Link href="/collections" className="text-black border-b border-black pb-1">Collections</Link>
          </div>
          <div className="flex items-center gap-6 text-xs font-semibold tracking-widest uppercase">
            <Search size={18} />
            <Link href="/login" className="cursor-pointer hover:scale-110 transition-transform block">
              <User size={18} strokeWidth={1.5} />
            </Link>
            <Link href="/wishlist" className="cursor-pointer hover:scale-110 transition-transform block">
              <Bookmark size={18} strokeWidth={1.5} />
            </Link>
            <div className="flex items-center gap-2 cursor-pointer hover:text-black/60 transition-colors" onClick={openCart}>
              <ShoppingBag size={18} />
              <span>Cart ({items.length})</span>
            </div>
          </div>
        </div>
      </nav>

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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {displayModels.map((product, i) => (
              <ProductCard product={product} index={i} key={product.id} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
