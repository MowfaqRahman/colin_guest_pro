"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { models } from "@/lib/data";
import { Search, ShoppingBag, Bookmark, User } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { useCartStore } from "@/lib/store";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);
  const product = models.find((m) => m.id === productId);

  const [selectedSize, setSelectedSize] = useState<string | null>("XS");
  const [activeTab, setActiveTab] = useState<string>("Details & Description");

  const { items, openCart, addToCart, wishlistItems, toggleWishlist } = useCartStore();
  const isWishlisted = product ? wishlistItems.some(item => item.id === product.id) : false;

  if (!product) return <div className="min-h-screen flex items-center justify-center font-bold">Product Not Found</div>;

  // We need multiple images for the middle column scroll gallery!
  // If we only have 1 image, duplicate it twice so the scrolling feature still functions visually.
  const displayImages = product.srcs && product.srcs.length > 1 ? product.srcs : [product.src, product.src, product.src];

  return (
    <main className="bg-[#fcfcfc] text-black font-sans relative">
      <nav className="fixed top-0 w-full z-50 bg-[#fcfcfc]">
        <div className="flex items-center justify-between px-8 py-6">
          <Link href="/" className="text-xl font-bold tracking-widest uppercase">COLIN GUEST</Link>
          <div className="hidden md:flex gap-12 text-[10px] tracking-[0.2em] uppercase font-bold">
            <button className="hover:text-black/60 transition-colors">Runway</button>
            <Link href="/" className="hover:text-black/60 transition-colors">The Lookbook</Link>
            <Link href="/collections" className="text-black border-b border-black pb-1">Collections</Link>
          </div>
          <div className="flex items-center gap-6 text-xs font-semibold tracking-widest uppercase mb-1">
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

      {/* 3-Column PDP Grid perfectly equal sizes matching Bluorng */}
      <div className="flex w-full min-h-screen pt-[80px] px-4 gap-4">
        
        {/* Leftmost Column: Static Anchor */}
        <div className="flex-1 sticky top-[80px] h-[calc(100vh-80px)] pb-4 shrink-0 flex items-center justify-center">
          <div className="relative w-full h-full bg-[#f4f4f4] rounded-2xl overflow-hidden flex items-center justify-center border border-black/5 shadow-sm">
            <Image 
              src={displayImages[0]}
              alt={product.title}
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Middle Column: Scrollable Gallery */}
        <div className="flex-1 flex flex-col gap-4 pb-[20vh]">
          {displayImages.map((src, i) => (
             <div key={i} className="relative w-full aspect-[4/5] bg-[#f4f4f4] border border-black/5 rounded-2xl overflow-hidden shadow-sm">
                 <Image src={src} alt={`Gallery ${i}`} fill className="object-contain mix-blend-multiply" priority={i === 0} />
             </div>
          ))}
        </div>

        {/* Rightmost Column: Sticky Checkout Panel */}
        <div className="flex-1 sticky top-[80px] h-[calc(100vh-80px)] pb-4 shrink-0 overflow-y-auto hide-scrollbar">
           <div className="bg-[#fcfcfc] rounded-2xl p-6 min-h-full flex flex-col border border-black/5 shadow-sm">
              
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl font-bold tracking-tight">{product.title}</h1>
                <button onClick={() => toggleWishlist(product)} className="text-black/40 hover:text-black transition-colors">
                  <Bookmark size={20} className={isWishlisted ? "fill-black text-black" : ""} />
                </button>
              </div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-xs font-semibold text-black/60">{product.price}</p>
                <div className="bg-black/10 px-3 py-1.5 rounded text-[8px] font-extrabold cursor-pointer hover:bg-black/20 uppercase tracking-widest text-black/70">Size Guide</div>
              </div>
              
              <div className="grid grid-cols-4 lg:grid-cols-5 gap-2 mb-6">
                {['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map(size => {
                  // Simulating out-of-stock inventory logic
                  const isOutOfStock = ['XXXS', 'XXS', 'M', 'XL', 'XXL', 'XXXL'].includes(size);
                  return (
                    <button 
                      key={size} 
                      onClick={() => !isOutOfStock && setSelectedSize(size)}
                      className={`py-2 text-[9px] rounded-full font-bold transition-all duration-300 ${
                        selectedSize === size 
                          ? 'border border-black bg-black text-white' 
                          : isOutOfStock
                            ? 'bg-[rgba(0,0,0,0.05)] text-black/30 pointer-events-none line-through decoration-black/30'
                            : 'border border-black/10 bg-white hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3 mb-6">
                <button 
                  onClick={() => addToCart(product, selectedSize || 'M')}
                  className="flex-1 border border-black/10 bg-white text-black py-3 rounded-full text-[9px] font-extrabold uppercase hover:border-black transition-colors shadow-sm tracking-[0.1em]"
                >
                  ADD TO BAG
                </button>
                <button 
                  onClick={() => { addToCart(product, selectedSize || 'M'); setTimeout(openCart, 100); }}
                  className="flex-1 bg-black border border-black text-white py-3 rounded-full text-[9px] font-extrabold uppercase hover:bg-black/80 transition-colors shadow-sm tracking-[0.1em]"
                >
                  BUY NOW
                </button>
              </div>

              {/* Exact UI Tabs from Bluorng Reference */}
              <div className="mt-0 bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm flex-1">
                <div className="flex">
                  {['Details & Description', 'Washcare', 'Shipping'].map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-4 text-[9px] font-extrabold uppercase tracking-widest transition-colors ${activeTab === tab ? 'border-b-2 border-black text-black' : 'border-b-2 border-transparent text-black/40 hover:text-black bg-[#fafafa]'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                
                <div className="p-5 text-[10px] font-medium text-black/50 leading-relaxed">
                  {activeTab === 'Details & Description' && (
                    <div className="space-y-4">
                      <div>
                        <strong className="text-black block mb-1 font-bold">Details</strong>
                        100% premium quality. Weight - 250 gsm. Screen print.
                      </div>
                      <div>
                        <strong className="text-black block mb-1 font-bold">Description</strong>
                        Strong, clean, and easy to style. The {product.title.toLowerCase()} is designed for everyday luxury with a bold edge. {product.desc}
                      </div>
                    </div>
                  )}
                  {activeTab === 'Washcare' && (
                    <div className="space-y-4">
                      Dry clean only. Avoid abrasive surfaces. Machine wash cold inside out if necessary. Hang dry to preserve perfectly tailored structural integrity. Do not bleach.
                    </div>
                  )}
                  {activeTab === 'Shipping' && (
                    <div className="space-y-4">
                      Complimentary express shipping on all orders. Dispatch within 24 hours. Returns guaranteed within 30 days of standard receipt. Items must be in pristine condition.
                    </div>
                  )}
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Cross-Sell Component (You May Also Like) seamlessly placed below the scrolling container */}
      <section className="bg-[#fcfcfc] w-full pt-12 pb-24 px-12 border-t border-black/5 z-20 relative">
        <h2 className="text-xl font-bold tracking-tight mb-8">You may also like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
           {models.slice(-4).map((suggested, i) => (
             <ProductCard key={suggested.id} product={suggested} index={i} />
           ))}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
}
