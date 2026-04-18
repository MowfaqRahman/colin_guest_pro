"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, Bookmark, User } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function CollectionsHub() {
  const { items, openCart, wishlistItems } = useCartStore();

  return (
    <main className="min-h-screen bg-white text-black font-sans relative overflow-x-hidden">
      {/* Editorial Navigation - Clean, solid visibility like the reference */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-black/5">
        <div className="flex items-center justify-between px-8 py-5 text-black">
          <Link href="/" className="text-xl font-bold tracking-widest uppercase">COLIN GUEST</Link>

          <div className="hidden md:flex gap-12 text-[10px] tracking-[0.2em] uppercase font-bold">
            <Link href="/collections" className="hover:opacity-60 transition-opacity">All Products</Link>
            <Link href="/collections/women" className="hover:opacity-60 transition-opacity">Women</Link>
            <Link href="/collections/men" className="hover:opacity-60 transition-opacity">Men</Link>
            <Link href="/collections/accessories" className="hover:opacity-60 transition-opacity">Accessories</Link>
          </div>

          <div className="flex items-center gap-6">
            <Search size={18} className="cursor-pointer hover:opacity-60 transition-opacity" />
            <Link href="/wishlist">
              <Bookmark size={18} className={`cursor-pointer hover:opacity-60 transition-opacity ${wishlistItems.length > 0 ? 'fill-black' : ''}`} />
            </Link>
            <Link href="/login">
              <User size={18} className="cursor-pointer hover:opacity-100 transition-opacity text-black/40 hover:text-black" />
            </Link>
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-60 transition-opacity" onClick={openCart}>
              <ShoppingBag size={18} />
              <span className="text-[10px] font-bold">({items.length})</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Strict Editorial Split Layout (Offset for Header - Final Typography Refined) */}
      <section className="relative w-full h-screen bg-white overflow-hidden flex flex-row pt-[80px]">

        {/* Left Column: Dedicated Typography Zone (30% Width) */}
        <div className="w-[30%] h-full flex flex-col justify-center px-[6%] z-20 bg-white">
          <h2 className="text-[70px] font-serif leading-[0.9] italic mb-8 text-black tracking-tight">Style,<br />Redefined</h2>
          <div className="space-y-10">
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-black/60 leading-relaxed font-sans pr-4">
              Uncomplicated, Essential Pieces<br />You'll Reach For Again And Again.
            </p>
            <button className="w-fit px-12 py-4 border border-black text-black text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-black hover:text-white transition-all duration-300">
              Explore Collection
            </button>
          </div>
        </div>

        {/* Right Column: High-Fidelity Photography (70% Width - Padded for zero crop) */}
        <div className="w-[70%] h-full relative p-12">
          <Image
            src="/collections_hero.jpg"
            alt="Editorial Collections Hero"
            fill
            className="object-contain object-center"
            priority
            unoptimized={true}
          />
        </div>
      </section>

      {/* Categories Grid (Shifted below Hero) */}
      <div className="py-24 px-8 max-w-[1800px] mx-auto">
        <h3 className="text-xs font-bold tracking-[0.3em] uppercase mb-12 opacity-40">Browse Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/collections/hoodies" className="group">
            <div className="relative w-full aspect-[4/5] bg-[#f8f8f8] overflow-hidden">
              <Image src="/1_trans.png" alt="Hoodies" fill className="object-contain p-16 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="mt-6 flex items-center font-bold text-xs tracking-widest uppercase">
              Hoodies <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>

          <Link href="/collections/jeans" className="group">
            <div className="relative w-full aspect-[4/5] bg-[#f8f8f8] overflow-hidden">
              <Image src="/8_trans.png" alt="Jeans" fill className="object-contain p-16 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="mt-6 flex items-center font-bold text-xs tracking-widest uppercase">
              Jeans <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>

          <Link href="/collections/accessories" className="group">
            <div className="relative w-full aspect-[4/5] bg-[#f8f8f8] overflow-hidden">
              <Image src="/3_trans.png" alt="Accessories" fill className="object-contain p-16 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="mt-6 flex items-center font-bold text-xs tracking-widest uppercase">
              Accessories <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
