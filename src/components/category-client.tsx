"use client";

import { useState } from "react";
import { SlidersHorizontal, Flashlight } from "lucide-react";
import { ProductCard } from "./product-card";
import { Product } from "@/lib/data";
import Link from "next/link";
import { motion } from "framer-motion";

interface CategoryClientProps {
  category: string;
  formattedCategory: string;
  displayProducts: Product[];
}

export default function CategoryClient({ category, formattedCategory, displayProducts }: CategoryClientProps) {
  const [isDense, setIsDense] = useState(false);

  const categories = [
    { name: 'View all', id: 'all' },
    { name: 'Hoodies', id: 'hoodies' },
    { name: 'Jeans', id: 'jeans' }
  ];

  return (
    <div className="pt-20 px-8 max-w-[1800px] mx-auto pb-24 transition-all duration-700">
      
      {/* Top Header Row */}
      <div className="flex flex-col gap-6 mb-10">
         <div className="flex justify-between items-center">
            <h1 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">{formattedCategory}</h1>
            
            <div className="flex items-center gap-4">
              {/* Custom Horizontal Torch Toggle */}
              <button 
                onClick={() => setIsDense(!isDense)}
                className={`transition-all duration-500 opacity-40 hover:opacity-100 ${isDense ? 'opacity-100' : ''}`}
                title="Toggle Dense View (Torch)"
              >
                <div className="relative">
                  <svg width="28" height="14" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${isDense ? "text-black" : "text-black/60"} -scale-x-100 relative z-10`}>
                    <rect x="2" y="4" width="12" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M14 3.5V8.5L20 10V2L14 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    {isDense && <circle cx="20" cy="6" r="1" fill="currentColor" />}
                  </svg>
                  
                  {/* Subtle Light Beam Effect */}
                  {isDense && (
                    <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 bg-yellow-400/40 rounded-full blur-xl pointer-events-none z-0 scale-x-150 animate-pulse" />
                  )}
                </div>
              </button>

              <button className="flex items-center gap-2 border border-black/5 rounded-full px-5 py-2.5 text-[9px] font-bold uppercase tracking-widest hover:border-black/20 transition-all bg-white shadow-sm">
                <SlidersHorizontal size={12} /> Advance Filters
              </button>
            </div>
         </div>

         {/* Editorial Category Toggles */}
         <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar relative">
            {categories.map((cat) => {
              const isActive = category.toLowerCase() === cat.id;
              return (
                <Link 
                  key={cat.id}
                  href={`/collections/${cat.id}`}
                  className="relative group px-6 py-1.5"
                >
                  {/* Liquid Bubble Background */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-black/5 backdrop-blur-xl rounded-full border border-black/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_4px_12px_rgba(0,0,0,0.05)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className={`relative z-10 text-[9px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                    isActive ? 'text-black' : 'text-black/30 group-hover:text-black'
                  }`}>
                    {cat.name}
                  </span>
                </Link>
              );
            })}
         </div>
      </div>

      {/* Grid with Dynamic Density */}
      <section>
        <div className={`grid gap-2 transition-all duration-700 ease-in-out ${
          isDense 
            ? 'grid-cols-3 md:grid-cols-6 lg:grid-cols-10' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        }`}>
          {displayProducts.map((product, i) => (
            <div key={product.id} className={`transition-all duration-700 ${isDense ? 'scale-[0.98]' : 'scale-100'}`}>
               <ProductCard product={product} index={i} isDense={isDense} />
            </div>
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
  );
}
