"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data";

interface MobileLookbookProps {
  products: Product[];
}

export default function MobileLookbook({ products }: MobileLookbookProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Use 3 sets for true infinite-feeling scroll
  const repeatedProducts = [...products, ...products, ...products];

  const { scrollXProgress } = useScroll({
    container: scrollRef,
  });

  const smoothProgress = useSpring(scrollXProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.6,
    restDelta: 0.0001
  });

  useEffect(() => {
    setIsMounted(true);
    if (scrollRef.current && products.length > 0) {
      // Start at the beginning of the second set
      const itemWidth = window.innerWidth;
      scrollRef.current.scrollLeft = products.length * itemWidth;
    }
  }, [products.length]);

  if (!isMounted) return <div className="fixed inset-0 bg-[#f9f9fa]" />;

  return (
    <div className="fixed inset-0 bg-[#f9f9fa] flex flex-col overflow-hidden font-sans select-none safe-bottom">
      {/* Header */}
      <header className="h-[64px] flex items-center justify-between px-6 shrink-0 bg-[#f9f9fa] border-b border-black/[0.04] z-50 pt-[env(safe-area-inset-top)] box-content">
        <div className="w-10 flex items-center justify-start">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
            <path d="M4 8h16M4 16h16" />
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background "N" Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none z-0">
          <span className="text-[40vh] font-serif font-light">N</span>
        </div>

        {/* 1. The Animated Content Layer */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col">
          {/* Top: Animated Images */}
          <div className="h-[62%] relative flex items-center justify-center overflow-hidden">
            {repeatedProducts.map((product, index) => (
              <HeroModel
                key={`hero-${index}`}
                product={product}
                index={index}
                total={repeatedProducts.length}
                progress={smoothProgress}
                baseCount={products.length}
              />
            ))}
          </div>

          {/* Bottom: Animated Text */}
          <div className="h-[38%] bg-white relative flex flex-col items-center justify-start overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
            {repeatedProducts.map((product, index) => (
              <HeroText
                key={`text-${index}`}
                product={product}
                index={index}
                total={repeatedProducts.length}
                progress={smoothProgress}
              />
            ))}
          </div>
        </div>

        {/* 2. The Scrollable Gesture & Link Layer (On top) */}
        <div
          ref={scrollRef}
          className="absolute inset-0 overflow-x-auto snap-x snap-mandatory hide-scrollbar z-30"
        >
          <div className="flex h-full" style={{ width: `${repeatedProducts.length * 100}vw` }}>
            {repeatedProducts.map((product, index) => (
              <div
                key={`scroll-item-${index}`}
                className="w-screen h-full flex flex-col snap-center snap-always flex-shrink-0"
              >
                <div className="h-[62%] w-full" />
                <Link 
                  href={`/product/${encodeURIComponent(product.id)}`}
                  className="h-[38%] w-full"
                >
                  <span className="sr-only">View {product.title}</span>
                </Link>
              </div>
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
          background-color: #f9f9fa;
        }
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        .safe-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
}

function HeroModel({ 
  product, 
  index, 
  total, 
  progress, 
  baseCount 
}: { 
  product: Product, 
  index: number, 
  total: number, 
  progress: any,
  baseCount: number
}) {
  const activeIndex = useTransform(progress, [0, 1], [0, total - 1]);
  const relativeIndex = useTransform(activeIndex, (v) => index - v);

  const scale = useTransform(
    relativeIndex,
    [-2, -1, 0, 1, 2],
    [0.5, 0.85, 1.15, 0.85, 0.5]
  );

  const opacity = useTransform(
    relativeIndex,
    [-2.2, -1, 0, 1, 2.2],
    [0, 0.45, 1, 0.45, 0]
  );

  const x = useTransform(
    relativeIndex,
    [-2, -1, 0, 1, 2],
    ["-140%", "-72%", "0%", "72%", "140%"]
  );

  const filter = useTransform(
    relativeIndex,
    [-1, 0, 1],
    ["grayscale(20%) blur(1.5px)", "grayscale(0%) blur(0px)", "grayscale(20%) blur(1.5px)"]
  );

  const zIndex = useTransform(relativeIndex, (v) => Math.round(100 - Math.abs(v) * 20));

  // Priority for middle set (the starting set)
  const isPriority = index >= baseCount && index < baseCount + 3;

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
      className="w-[78vw] h-full flex items-center justify-center pointer-events-none"
    >
      <div className="relative w-full h-[90%] drop-shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
        <Image
          src={product.src}
          alt={product.title}
          fill
          className="object-contain"
          priority={isPriority}
          sizes="78vw"
        />
      </div>
    </motion.div>
  );
}

function HeroText({ product, index, total, progress }: { product: Product, index: number, total: number, progress: any }) {
  const activeIndex = useTransform(progress, [0, 1], [0, total - 1]);
  const relativeIndex = useTransform(activeIndex, (v) => index - v);

  const opacity = useTransform(
    relativeIndex,
    [-0.7, -0.4, 0, 0.4, 0.7],
    [0, 1, 1, 1, 0]
  );

  const x = useTransform(
    relativeIndex,
    [-1, 0, 1],
    ["-100%", "0%", "100%"]
  );

  const y = useTransform(
    relativeIndex,
    [-1, 0, 1],
    [15, 0, 15]
  );

  return (
    <motion.div
      style={{
        opacity,
        x,
        y,
        position: "absolute",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "0 32px",
        paddingTop: "32px"
      }}
      className="pointer-events-none"
    >
      <h2 className="text-[14px] font-bold uppercase tracking-[0.3em] text-black mb-2 text-center leading-tight">
        {product.title}
      </h2>
      <p className="text-[11px] font-medium text-[#8E8E8E] text-center leading-[1.7] mb-4 max-w-[280px] line-clamp-2">
        {product.desc}
      </p>
      <div className="text-[16px] font-bold tracking-[0.1em] text-black uppercase mb-6">
        {product.price}
      </div>
      
      {/* Shop The Look Button */}
      <div className="mt-auto pb-8">
        <div className="border border-black px-10 py-3 text-[10px] font-bold tracking-[0.25em] uppercase hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-3 active:scale-95">
          Shop The Look
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
