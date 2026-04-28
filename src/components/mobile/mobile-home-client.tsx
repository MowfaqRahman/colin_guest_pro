"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data";

interface MobileHomeClientProps {
  products: Product[];
}

export function MobileHomeClient({ products }: MobileHomeClientProps) {
  if (!products || products.length === 0) return null;

  const heroProduct = products[0];
  const carouselProducts = products.slice(1, 10); // Show next 9 products in carousel

  return (
    <main className="min-h-screen bg-[#f4f4f4] font-sans w-full overflow-x-hidden">


      
      {/* Hero Section - Full Screen Overlapping Header */}
      <section className="relative w-full h-[85dvh] bg-[#f9f9fa]">

        <Link href={`/product/${encodeURIComponent(heroProduct.id)}`} className="block w-full h-full relative">
          <Image
            src={heroProduct.src}
            alt={heroProduct.title}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Subtle gradient for text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center justify-end px-4">
            <h1 className="text-white text-2xl font-black uppercase tracking-[0.15em] mb-4 text-center">
              {heroProduct.title}
            </h1>
            <button className="bg-white/90 backdrop-blur-sm text-black px-10 py-3 rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-colors">
              Shop Now
            </button>
          </div>
        </Link>
      </section>


      {/* Bluorng-Style 2-Column Product Grid */}
      <section className="pt-6 pb-20 bg-[#f4f4f4] w-full px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-bold text-black">Latest drop</h2>
          <Link 
            href="/collections/all" 
            className="text-[11px] font-medium text-black bg-white px-3 py-1.5 rounded-full shadow-sm"
          >
            Discover more
          </Link>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {carouselProducts.map((product) => (
            <div key={`mobile-grid-${product.id}`} className="flex flex-col group relative">
              
              {/* Product Image Container */}
              <Link href={`/product/${encodeURIComponent(product.id)}`} className="w-full">
                <div className="relative aspect-[2/3] w-full bg-white overflow-hidden rounded-[14px] mb-2">
                  <Image



                    src={product.src}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="50vw"
                  />
                  
                  {/* Bookmark Icon (Top Right) */}
                  <button className="absolute top-3 right-3 z-10 text-white hover:opacity-70 transition-opacity">
                    <svg width="20" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                  </button>

                  {/* Pagination Dots (Bottom Center) */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                  </div>
                </div>
              </Link>

              {/* Product Details (Title, +, Price) */}
              <div className="flex flex-col px-1">
                <div className="flex justify-between items-start w-full">
                  <Link href={`/product/${encodeURIComponent(product.id)}`} className="w-full pr-2">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-black/90 leading-snug">
                    {product.title}
                  </h3>
                </Link>
                <button className="text-gray-500 hover:text-black mt-[-2px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
              <p className="text-[10px] font-medium tracking-wider text-gray-500 mt-1">
                {product.price}
              </p>

              </div>

            </div>
          ))}
        </div>
      </section>





      {/* Secondary Banner - Padding bottom to clear the floating glass nav */}
      <section className="relative w-full aspect-[4/5] bg-black pb-32">

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center">
          <h2 className="text-3xl font-black uppercase tracking-widest mb-4">Architectural<br/>Integrity</h2>
          <p className="text-sm text-gray-300 mb-8 max-w-sm mx-auto leading-relaxed">
            Discover the exclusive world of Colin Guest, where heritage meets haute couture. Explore timeless elegance and modern craftsmanship in every stitch.
          </p>
          <Link href="/about">
            <button className="border border-white text-white px-8 py-3 rounded-none text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors">
              Discover The Brand
            </button>
          </Link>
        </div>
      </section>

      {/* Global Mobile Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </main>

  );
}
