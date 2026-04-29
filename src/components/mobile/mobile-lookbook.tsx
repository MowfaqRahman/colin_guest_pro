"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data";

interface MobileLookbookProps {
  products: Product[];
}

export default function MobileLookbook({ products }: MobileLookbookProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // We'll use a higher number of items to make the scroll feel long
  const repeatedProducts = [...products, ...products, ...products];

  const { scrollXProgress } = useScroll({
    container: scrollRef,
  });

  // Premium spring settings: highly responsive yet buttery smooth
  const smoothProgress = useSpring(scrollXProgress, {
    stiffness: 200, // Increased for a more "connected" feel
    damping: 30,    // Balanced for a high-end weighted feel
    mass: 0.5,      // Lower mass for faster response
    restDelta: 0.0001
  });

  // Initial scroll to the middle set of products for an "infinite" feel
  useEffect(() => {
    if (scrollRef.current && products.length > 0) {
      const startOfSecondSet = products.length * window.innerWidth;
      scrollRef.current.scrollLeft = startOfSecondSet;
    }
  }, [products.length]);

  return (
    <div className="fixed inset-0 bg-[#f9f9fa] flex flex-col overflow-hidden font-sans select-none">
      {/* Header */}
      <header className="h-[64px] flex items-center justify-between px-6 shrink-0 bg-[#f9f9fa] border-b border-black/[0.03] z-50">
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

      {/* Main Container */}
      <div className="flex-1 relative overflow-hidden">
        {/* 1. The Animated Content Layer (Behind the scrollable layer) */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col">
          {/* Top: Animated Images */}
          <div className="h-[65%] relative flex items-center justify-center overflow-hidden">
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

          {/* Bottom: Animated Text */}
          <div className="h-[35%] bg-white relative flex items-center justify-center overflow-hidden">
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
                {/* Upper part for swiping only */}
                <div className="h-[65%] w-full" />

                {/* Lower part contains the actual clickable Link */}
                <Link 
                  href={`/product/${encodeURIComponent(product.id)}`}
                  className="h-[35%] w-full flex items-center justify-center active:bg-black/[0.02] transition-colors"
                >
                  {/* The actual text is rendered in the layer below, this is just the hit area */}
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
        }
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
      `}</style>
    </div>
  );
}

function HeroModel({ product, index, total, progress }: { product: Product, index: number, total: number, progress: any }) {
  const activeIndex = useTransform(progress, [0, 1], [0, total - 1]);
  const relativeIndex = useTransform(activeIndex, (v) => index - v);

  const scale = useTransform(
    relativeIndex,
    [-2, -1, 0, 1, 2],
    [0.5, 0.85, 1.15, 0.85, 0.5]
  );

  const opacity = useTransform(
    relativeIndex,
    [-2.5, -2, -1, 0, 1, 2, 2.5],
    [0, 0.2, 0.5, 1, 0.5, 0.2, 0]
  );

  const x = useTransform(
    relativeIndex,
    [-2, -1, 0, 1, 2],
    ["-130%", "-70%", "0%", "70%", "130%"]
  );

  const filter = useTransform(
    relativeIndex,
    [-1, 0, 1],
    ["grayscale(30%) blur(1px)", "grayscale(0%) blur(0px)", "grayscale(30%) blur(1px)"]
  );

  const zIndex = useTransform(relativeIndex, (v) => Math.round(100 - Math.abs(v) * 20));

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
      className="w-[75vw] h-full flex items-center justify-center pointer-events-none"
    >
      <div className="relative w-full h-[85%] drop-shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
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

function HeroText({ product, index, total, progress }: { product: Product, index: number, total: number, progress: any }) {
  const activeIndex = useTransform(progress, [0, 1], [0, total - 1]);
  const relativeIndex = useTransform(activeIndex, (v) => index - v);

  // Fade and slight slide for the text
  const opacity = useTransform(
    relativeIndex,
    [-0.8, -0.4, 0, 0.4, 0.8],
    [0, 1, 1, 1, 0]
  );

  const x = useTransform(
    relativeIndex,
    [-1, 0, 1],
    ["-100%", "0%", "100%"]
  );

  // Subtle y-parallax
  const y = useTransform(
    relativeIndex,
    [-1, 0, 1],
    [10, 0, 10]
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
        padding: "0 40px",
        paddingTop: "24px"
      }}
      className="pointer-events-none"
    >
      <h2 className="text-[13px] font-bold uppercase tracking-[0.25em] text-black mb-2 text-center leading-tight">
        {product.title}
      </h2>
      <p className="text-[10px] font-medium text-[#8E8E8E] text-center leading-[1.6] mb-3 max-w-[260px] line-clamp-2">
        {product.desc}
      </p>
      <div className="text-[14px] font-bold tracking-[0.2em] text-black uppercase">
        {product.price}
      </div>
    </motion.div>
  );
}
