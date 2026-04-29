"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data";

interface MobileLookbookProps {
  products: Product[];
}

export default function MobileLookbook({ products }: MobileLookbookProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // We'll use a higher number of items to make the scroll feel infinite or at least long enough
  const repeatedProducts = [...products, ...products, ...products];

  const { scrollXProgress } = useScroll({
    container: scrollRef,
  });

  // Smooth out the scroll progress for animations
  const smoothProgress = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed inset-0 bg-[#f9f9fa] flex flex-col overflow-hidden font-sans select-none">
      {/* Header */}
      <header className="h-[64px] flex items-center justify-between px-6 shrink-0 bg-[#f9f9fa] border-b border-black/[0.03]">
        <div className="w-10 flex items-center justify-start">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </div>

        <div className="relative h-5 w-28">
          <Image
            src="/logo_cg.png"
            alt="COLIN GUEST"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="flex items-center gap-5 w-20 justify-end">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
      </header>

      {/* Main Container - Refactored for global scroll */}
      <div className="flex-1 relative overflow-hidden">
        {/* 1. The Scrollable Layer (Captures touch/scroll anywhere) */}
        <div
          ref={scrollRef}
          className="absolute inset-0 overflow-x-auto snap-x snap-mandatory hide-scrollbar z-20"
        >
          <div className="flex h-full" style={{ width: `${repeatedProducts.length * 100}vw` }}>
            {repeatedProducts.map((product, index) => (
              <div
                key={`scroll-item-${index}`}
                className="w-screen h-full flex flex-col snap-center flex-shrink-0"
              >
                {/* Top Spacer: Transparent touch area for images */}
                <div className="h-[65%] w-full" />

                {/* Bottom Content: Visible product details */}
                <div className="h-[35%] w-full bg-white flex flex-col items-center justify-start px-10 pt-2">
                  <Link 
                    href={`/product/${encodeURIComponent(product.id)}`}
                    className="flex flex-col items-center active:opacity-70 transition-opacity"
                  >
                    <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-black mb-2 text-center leading-tight">
                      {product.title}
                    </h2>
                    <p className="text-[10px] font-medium text-[#8E8E8E] text-center leading-[1.5] mb-2 max-w-[240px] line-clamp-2">
                      {product.desc}
                    </p>
                    <div className="text-[14px] font-bold tracking-widest text-black uppercase">
                      {product.price}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. The Animated Images Layer (Behind the scrollable layer) */}
        <div className="absolute top-0 left-0 w-full h-[65%] z-10 pointer-events-none flex items-center justify-center overflow-hidden bg-[#f9f9fa]">
          <div className="relative w-full h-full flex items-center justify-center">
            {repeatedProducts.map((product, index) => (
              <HeroModel
                key={`hero-${index}`}
                product={product}
                index={index}
                total={repeatedProducts.length}
                progress={smoothProgress}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
      `}</style>
    </div>
  );
}

function HeroModel({ product, index, total, progress }: { product: Product, index: number, total: number, progress: any }) {
  // We need to map the scroll progress (0-1) to the current active index
  const activeIndex = useTransform(progress, [0, 1], [0, total - 1]);
  const relativeIndex = useTransform(activeIndex, (v) => index - v);

  // Scaling: 1.2x at center (0), scales down to 0.7 at ±1, and 0.4 at ±2
  const scale = useTransform(
    relativeIndex,
    [-2, -1, 0, 1, 2],
    [0.5, 0.9, 1.2, 0.9, 0.5]
  );

  const opacity = useTransform(
    relativeIndex,
    [-2.5, -2, -1, 0, 1, 2, 2.5],
    [0, 0.3, 0.6, 1, 0.6, 0.3, 0]
  );

  // x-offsets to keep them spaced out so only half of side models are visible
  const x = useTransform(
    relativeIndex,
    [-2, -1, 0, 1, 2],
    ["-120%", "-65%", "0%", "65%", "120%"]
  );

  const filter = useTransform(
    relativeIndex,
    [-1, 0, 1],
    ["grayscale(40%) blur(1px)", "grayscale(0%) blur(0px)", "grayscale(40%) blur(1px)"]
  );

  const zIndex = useTransform(relativeIndex, (v) => {
    const distance = Math.abs(v);
    return Math.round(100 - distance * 20);
  });

  return (
    <motion.div
      style={{
        scale,
        opacity,
        x,
        zIndex,
        filter,
        position: "absolute",
        transformOrigin: "center center",
      }}
      className="w-[70vw] h-full flex items-center justify-center pointer-events-none"
    >
      <div className="relative w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        <Image
          src={product.src}
          alt={product.title}
          fill
          className="object-contain"
          priority={index < 5}
        />
      </div>
    </motion.div>
  );
}
