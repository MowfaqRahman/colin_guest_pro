"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, Bookmark, User } from "lucide-react";
import { useCartStore } from "@/lib/store";

import { motion } from "framer-motion";

export default function CollectionsHub() {
  const { items, openCart, wishlistItems } = useCartStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans relative overflow-x-hidden">
      {/* Editorial Navigation - Clean, solid visibility like the reference */}


      {/* Strict Editorial Split Layout (Offset for Header - Final Typography Refined) */}
      <section className="relative w-full h-screen overflow-hidden flex flex-row pt-[80px] bg-white">

        {/* Left Column: Dedicated Typography Zone (30% Width) */}
        <div className="w-[30%] h-full flex flex-col justify-center px-[6%] z-20">
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
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <Link href="/collections/all" className="group">
              <div className="relative w-full aspect-[4/5] bg-[#f8f8f8] overflow-hidden">
                <Image src="/3_trans.png" alt="All Products" fill className="object-contain p-16 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="mt-6 flex items-center font-bold text-xs tracking-widest uppercase">
                All Products <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/collections/hoodies" className="group">
              <div className="relative w-full aspect-[4/5] bg-[#f8f8f8] overflow-hidden">
                <Image src="/1_trans.png" alt="Hoodies" fill className="object-contain p-16 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="mt-6 flex items-center font-bold text-xs tracking-widest uppercase">
                Hoodies <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/collections/jeans" className="group">
              <div className="relative w-full aspect-[4/5] bg-[#f8f8f8] overflow-hidden">
                <Image src="/8_trans.png" alt="Jeans" fill className="object-contain p-16 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="mt-6 flex items-center font-bold text-xs tracking-widest uppercase">
                Jeans <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
