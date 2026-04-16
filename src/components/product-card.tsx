"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/lib/data";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Bookmark } from "lucide-react";
import { useCartStore } from "@/lib/store";

export function ProductCard({ product, index = 0 }: { product: Product, index?: number }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { wishlistItems, toggleWishlist } = useCartStore();
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  // We ensure there are multiple images for prototyping tracking
  const srcs = product.srcs && product.srcs.length > 1 ? product.srcs : [product.src, product.src, product.src];

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    setImgIndex((prev) => (prev + 1) % srcs.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((prev) => (prev - 1 + srcs.length) % srcs.length);
  };

  return (
    <div className="group flex flex-col relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="relative w-full aspect-[4/5] bg-[#f8f8f8] rounded-[24px] mb-3 overflow-hidden flex items-center justify-center p-0 border border-black/5 group-hover:shadow-md transition-shadow duration-500"
      >
        {/* Heart / Bookmark Icon mapped to global store */}
        <button 
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          className="absolute top-4 right-4 z-20 text-black hover:scale-110 transition-transform"
        >
          <Bookmark size={20} strokeWidth={1.5} className={isWishlisted ? "fill-black" : ""} />
        </button>

        {/* Dynamic Hover Arrows */}
        {isHovered && srcs.length > 1 && (
          <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between z-30">
             <button onClick={handlePrev} className="bg-white/80 p-2.5 rounded-full shadow-sm hover:bg-white text-black transition-colors backdrop-blur-sm hover:scale-105">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
             </button>
             <button onClick={handleNext} className="bg-white/80 p-2.5 rounded-full shadow-sm hover:bg-white text-black transition-colors backdrop-blur-sm hover:scale-105">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
             </button>
          </div>
        )}
        
        {/* Link wraps the image so clicking the image goes to PDP, but buttons block propagation */}
        <Link href={`/product/${product.id}`} className="relative w-full h-full mix-blend-multiply drop-shadow-2xl flex items-center justify-center pt-[15%]">
          <Image 
            src={srcs[imgIndex]}
            alt={product.title}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-[1.03] scale-[1.3]"
          />
        </Link>

        {/* Dynamic Image Indicators */}
        {srcs.length > 1 && (
          <div className="absolute bottom-5 flex gap-1.5 z-20 pointer-events-none">
            {srcs.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === imgIndex ? 'bg-black w-3' : 'bg-black/20 w-1.5'}`} />
            ))}
          </div>
        )}
      </motion.div>
      
      {/* Product Details */}
      <Link href={`/product/${product.id}`} className="flex justify-between items-end px-2 z-10">
        <div>
          <h4 className="text-xs font-bold tracking-wide mb-1 truncate max-w-[200px] hover:underline cursor-pointer">{product.title}</h4>
          <p className="text-[10px] font-medium tracking-widest text-black/60">{product.price}</p>
        </div>
        <span className="text-sm font-light text-black/40">+</span>
      </Link>
    </div>
  );
}
