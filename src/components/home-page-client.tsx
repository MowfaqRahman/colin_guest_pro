"use client";

import { useState, useEffect } from "react";
import LookbookClient from "@/components/lookbook-client";
import MobileLookbook from "@/components/mobile/mobile-lookbook";
import { Product } from "@/lib/data";

interface HomePageClientProps {
  products: Product[];
}

export default function HomePageClient({ products }: HomePageClientProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) {
    return <div className="h-screen bg-[#f9f9fa]" />;
  }

  return isMobile ? (
    <MobileLookbook products={products} />
  ) : (
    <LookbookClient products={products} />
  );
}
