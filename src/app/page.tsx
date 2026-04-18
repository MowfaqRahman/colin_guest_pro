"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, Bookmark, User } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { models } from "@/lib/data";

export default function Home() {
  const containerRef = useRef(null);
  const { items, openCart, wishlistItems } = useCartStore();

  // Track the scroll of the whole page, seamlessly tying the giant models to the right sidebar
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  // Create a looped set for infinite scrolling feel
  const loopedModels = [...models, ...models, ...models];

  return (
    <main ref={containerRef} className="bg-[#f9f9fa] text-black font-sans relative h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <nav className="fixed top-0 w-full z-50 bg-[#f9f9fa]/90 backdrop-blur-md border-b border-black/5">
        <div className="flex items-center justify-between px-8 py-6">
          <h1 className="text-xl font-bold tracking-widest uppercase">COLIN GUEST</h1>
          <div className="hidden md:flex gap-12 text-[10px] tracking-[0.2em] uppercase font-bold">
            <button className="hover:text-black/60 transition-colors">Runway</button>
            <button className="text-black border-b border-black pb-1">The Lookbook</button>
            <Link href="/collections" className="hover:text-black/60 transition-colors">Collections</Link>
          </div>
          <div className="flex items-center gap-6 text-xs font-semibold tracking-widest uppercase">
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

      <div className="flex w-full pt-20 relative">
        {/* LEFT/CENTER: Sticky 3D Carousel (Expanded to fill the whole left space without text!) */}
        <div className="w-[75%] sticky top-20 h-[calc(100vh-5rem)] flex items-center justify-center z-10 perspective-[1200px] overflow-hidden">
          


          <div className="relative w-full h-[85%] flex items-center justify-center">
             {loopedModels.map((model, index) => (
                <ScrollModel 
                  key={`${model.id}-${index}`}
                  model={model}
                  index={index}
                  total={loopedModels.length}
                  progress={scrollYProgress}
                />
             ))}
          </div>
        </div>

        {/* RIGHT: Synchronized Scrollable Column. Each card matches a giant model! */}
        <div className="w-[25%] bg-white border-l border-black/5 relative z-30 shadow-[-10px_0_30px_rgba(0,0,0,0.03)]">
           <div className="flex flex-col">
              {loopedModels.map((listModel, index) => (
                <div key={`sidebar-${listModel.id}-${index}`} className="min-h-screen p-6 border-b border-black/5 flex flex-col justify-center items-center group snap-start snap-always">
                  <div className="relative w-[75%] aspect-[3/4] mb-8 overflow-hidden rounded-sm bg-[#fafafa] flex items-center justify-center pt-8">
                    <div className="relative w-[90%] h-[90%]">
                        <Image 
                        src={listModel.src}
                        alt={listModel.title}
                        fill
                        className="object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                  </div>
                  <div className="w-full text-center flex flex-col items-center">
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-3">{listModel.title}</h4>
                    <p className="text-[11px] font-medium text-black/50 leading-relaxed mb-4 px-4 max-w-[90%]">{listModel.desc}</p>
                    <p className="text-sm font-semibold tracking-wider mb-6">{listModel.price}</p>
                    
                    <Link href={`/product/${listModel.id}`}>
                      <button className="px-10 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black/80 transition-colors rounded-sm">
                        Shop The Look
                      </button>
                    </Link>
                  </div>
               </div>
             ))}
             {/* Small padding block so the very last model can be fully scrolled into view beautifully */}
             <div className="h-[30vh] bg-white"></div>
           </div>
        </div>

      </div>
    </main>
  );
}

function ScrollModel({ model, index, total, progress }: any) {
  // Matches the timeline directly to the vertical scrolling items 
  const activeFloat = useTransform(progress, [0, 1], [0, total - 0.7]);
  
  const relativePosRaw = useTransform(activeFloat, v => index - v);
  // We allow a wider range to see the incoming models
  const relativePos = useTransform(relativePosRaw, v => Math.max(-1.5, Math.min(v, 4)));

  // X offset: 
  // v = 0 (Main): x = 180 (Right biased)
  // v = 1 (Next): x = -120 (Tighter left queue)
  // v = 2 (Second in queue): x = -320 (Tense cluster)
  // v = -1 (Passed): x = 600 (Exits far right)
  const x = useTransform(relativePos, [-1, 0, 1, 2, 3], [600, 180, -120, -320, -480], { clamp: true });
  
  // Scaling: 1.0 at center, distinct descending steps for the two queue models
  const scale = useTransform(relativePos, [-1, 0, 1, 2, 3], [1.1, 1.0, 0.72, 0.52, 0.35], { clamp: true });
  
  // Opacity & Blur: Clearer visibility for the two models in the queue
  const opacity = useTransform(relativePos, [-1, -0.5, 0, 1, 2, 3], [0, 0.8, 1, 0.75, 0.35, 0], { clamp: true });
  const blurVal = useTransform(relativePos, [-1, 0, 1, 2, 3], [0, 0, 3, 8, 15], { clamp: true });
  const filter = useMotionTemplate`blur(${blurVal}px)`;
  
  // Dynamic Z-Index based on proximity to the active front (v=0)
  // The closer relativePos is to 0, the higher the Z-index
  const zIndex = useTransform(relativePos, v => Math.round(100 - Math.abs(v) * 20));
  
  return (
    <motion.div 
      style={{ x, scale, opacity, filter, zIndex }}
      className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center pointer-events-none"
    >
      <div className="relative w-full h-[85vh] max-w-[80vw]">
        <Image src={model.src} alt={model.title} fill className="object-contain" priority={index < 3} />
      </div>
    </motion.div>
  );
}
