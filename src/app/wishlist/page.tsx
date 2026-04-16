"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, Bookmark, Clock, ArrowRight, User } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { ProductCard } from "@/components/product-card";
import { useRouter } from "next/navigation";

export default function WishlistDashboard() {
  const router = useRouter();
  const { wishlistItems, items, openCart, isLoggedIn, simulateLogin, toggleWishlist } = useCartStore();

  const parsePrice = (priceStr: string) => parseInt(priceStr.replace(/[^0-9]/g, ''));
  const totalValue = wishlistItems.reduce((sum, item) => sum + parsePrice(item.price), 0);
  const formattedTotal = "Rs. " + totalValue.toLocaleString();

  return (
    <main className="min-h-screen bg-[#f3f4f6] text-black font-sans relative pb-24">
      {/* Navigation Layer */}
      <nav className="w-full bg-white border-b border-black/5 z-50">
        <div className="flex items-center justify-between px-8 py-6">
          <Link href="/" className="text-xl font-bold tracking-widest uppercase">COLIN GUEST</Link>
          <div className="hidden md:flex gap-12 text-[10px] tracking-[0.2em] uppercase font-bold">
            <button className="hover:text-black/60 transition-colors">Runway</button>
            <Link href="/" className="hover:text-black/60 transition-colors">The Lookbook</Link>
            <Link href="/collections" className="hover:text-black/60 transition-colors">Collections</Link>
          </div>
          <div className="flex items-center gap-6 text-xs font-semibold tracking-widest uppercase mb-1">
            <Search size={18} />
            <Link href="/login" className="cursor-pointer hover:scale-110 transition-transform block">
              <User size={18} strokeWidth={1.5} />
            </Link>
            <Link href="/wishlist">
              <Bookmark size={18} strokeWidth={1.5} />
            </Link>
            <div className="flex items-center gap-2 cursor-pointer hover:text-black/60 transition-colors" onClick={openCart}>
              <ShoppingBag size={18} />
              <span>Cart ({items.length})</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Body Dashboard Logic */}
      
      {/* CONDITION 2: Guest + Has Items (Displays the slim top banner mapped to image_14) */}
      {!isLoggedIn && wishlistItems.length > 0 && (
        <div className="w-full border-b border-black/10 flex justify-between items-center py-6 px-12 bg-white">
          <div>
            <h4 className="font-extrabold text-sm tracking-tight mb-1">Don't lose your Lists!</h4>
            <p className="text-[11px] text-black/50 font-medium tracking-wide">Login to save your favorites and access them whenever, wherever!</p>
          </div>
          <Link href="/login"
            className="flex items-center gap-2 bg-[#d7d7d7] text-black px-6 py-3 rounded-full text-[11px] font-bold tracking-wide hover:bg-[#c0c0c0] transition-colors"
          >
            Login to Save <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* Grid rendering (Visible for Condition 2 & Condition 3) */}
      {wishlistItems.length > 0 && (
         <div className="max-w-[1500px] mx-auto px-8 pt-12 pb-24">
            {/* The Swym styling in image_14 features gigantic grid mapping instead of small squares */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
               {wishlistItems.map((product) => (
                 <div key={product.id} className="group relative">
                    {/* The Product Image Container bounds completely without border rounding in the specific swym view, but let's keep it clean */}
                    <div className="w-full aspect-[4/5] bg-gradient-to-tr from-[#ececec] to-white rounded-2xl overflow-hidden relative mb-4 shadow-sm border border-black/5 cursor-pointer">
                      {/* Enormous Blue Bookmark Icon overlaid top-right based directly on image_14 */}
                      <div onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }} className="absolute top-4 right-6 z-20 hover:scale-110 transition-transform cursor-pointer">
                        <Bookmark size={36} className="fill-[#3272e6] text-[#3272e6] stroke-none" />
                      </div>
                      <Image src={product.src} alt={product.title} fill className="object-contain p-6 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    
                    {/* Footnote text */}
                    <div className="flex justify-between items-start px-2">
                       <h4 className="text-[12px] font-bold text-black tracking-tight">{product.title}</h4>
                       <div className="text-[9px] text-black/40 font-bold uppercase tracking-widest text-right">
                         Selected Size <span className="text-black ml-1">XS</span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      )}

      {/* CONDITION 1: Guest + Empty Wishlist (Displays the huge splash screen from image_13) */}
      {!isLoggedIn && wishlistItems.length === 0 && (
        <div className="max-w-[1400px] mx-auto px-8 pt-24 flex flex-col items-center">
          <div className="text-center w-full max-w-[500px] mb-12">
             <h3 className="text-sm font-bold tracking-tight mb-2">Save things as you browse</h3>
             <p className="text-[11px] text-black/60 mb-6 font-medium">Tap ♡ on any product. It lands here so you don't lose it.</p>
             
             <div className="bg-[#fcf3e8] border border-[#f5dab1] rounded-[8px] px-6 py-4 flex items-center justify-center gap-3 mb-8 shadow-sm">
               <Clock size={16} className="text-[#d98c36]" strokeWidth={2.5} />
               <span className="text-[11px] font-medium text-[#c47116]">Saves stay through this session. <strong className="font-extrabold text-[#7a4103]">Log in to keep them permanently.</strong></span>
             </div>

             <div className="flex flex-col gap-3">
               <Link href="/login" className="w-full text-center border border-black rounded-[8px] py-4 text-sm font-bold shadow-sm hover:bg-black/5 transition-colors block">
                 Log in to save permanently →
               </Link>
               <button onClick={() => router.back()} className="w-full bg-[#ebebeb] text-black rounded-[8px] py-4 text-sm font-semibold hover:bg-black/10 transition-colors cursor-pointer">
                 Keep browsing first
               </button>
             </div>
             
             <p className="text-[11px] font-medium text-black/40 mt-6 tracking-wide">
               No account? <a href="#" className="font-bold text-black underline underline-offset-2 hover:text-black/60 transition-colors">Sign up — it takes a minute</a>
             </p>
          </div>
        </div>
      )}

      {/* Fixed Sticky Footer dynamically pulling math from the store */}
      <div className="fixed bottom-0 w-full bg-white border-t border-black/5 shadow-[0_-5px_20px_rgba(0,0,0,0.02)] z-50 flex items-center justify-between px-6 py-4 text-[10px] font-bold tracking-widest leading-none">
         
         {/* Left Side Tally Stats */}
         <div className="flex items-center gap-4">
           <span className="uppercase text-[11px]">Wishlist</span>
           <div className="bg-[#f4f4f4] px-4 py-2.5 rounded-full text-black/80 flex items-center gap-2 border border-black/5">
             <span className="text-black/40">Product count :</span> <span>{wishlistItems.length}</span>
           </div>
           <div className="bg-[#f4f4f4] px-4 py-2.5 rounded-full text-black/80 flex items-center gap-2 border border-black/5">
             <span className="text-black/40">In stock :</span> <span>{wishlistItems.length}</span>
           </div>
         </div>

         {/* Right Side Action Tally */}
         <div className="flex items-center gap-4">
           <div className="bg-[#f4f4f4] px-4 py-2.5 rounded-full text-black/80 flex items-center gap-2 border border-black/5">
             <span className="text-black/40">Selected count :</span> <span>0</span>
           </div>
           <div className="bg-[#f4f4f4] px-4 py-2.5 rounded-full text-black/80 flex items-center gap-2 border border-black/5">
             <span className="text-black/40">Total Value :</span> <span>{formattedTotal}</span>
           </div>
           
           <button className="bg-[#1f1f1f] text-white px-8 py-3 rounded-full hover:bg-black transition-colors shadow-lg">
             Proceed to Checkout
           </button>
         </div>

      </div>
    </main>
  );
}
