"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CollectionsHubClientProps {
  hoodieImage?: string;
  jeansImage?: string;
  allImage?: string;
}

export function CollectionsHubClient({ hoodieImage, jeansImage, allImage }: CollectionsHubClientProps) {
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
        ease: "easeOut"
      } as any
    }
  };

  return (
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
              <Image 
                src={allImage || "/3_trans.png"} 
                alt="All Products" 
                fill 
                className="object-contain p-16 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div className="mt-6 flex items-center font-bold text-xs tracking-widest uppercase">
              All Products <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link href="/collections/hoodies" className="group">
            <div className="relative w-full aspect-[4/5] bg-[#f8f8f8] overflow-hidden">
              <Image 
                src={hoodieImage || "/1_trans.png"} 
                alt="Hoodies" 
                fill 
                className="object-contain p-16 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div className="mt-6 flex items-center font-bold text-xs tracking-widest uppercase">
              Hoodies <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link href="/collections/jeans" className="group">
            <div className="relative w-full aspect-[4/5] bg-[#f8f8f8] overflow-hidden">
              <Image 
                src={jeansImage || "/8_trans.png"} 
                alt="Jeans" 
                fill 
                className="object-contain p-16 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div className="mt-6 flex items-center font-bold text-xs tracking-widest uppercase">
              Jeans <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
