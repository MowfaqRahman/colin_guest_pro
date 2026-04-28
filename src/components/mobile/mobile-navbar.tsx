"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { Search, ShoppingBag, Menu, X, User, Home, Bookmark, Compass } from "lucide-react";

import { useCartStore } from "@/lib/store";
import { usePathname } from "next/navigation";

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { openCart, items, isLoggedIn, wishlistItems, openWishlist } = useCartStore();
  const pathname = usePathname();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* 1. TOP ICONS: Menu (Left), Logo (Center), Wishlist + Cart (Right) */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm h-[75px]">
        <div className="flex items-center justify-between px-5 h-full text-black relative">



          {/* Left: Hamburger Menu */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-1 pointer-events-auto transition-transform active:scale-95"
            aria-label="Open Menu"
          >
            <Menu className="w-7 h-7" strokeWidth={1.5} />
          </button>

          {/* Center: Logo Image */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto h-[50px] w-[100px]"
          >
            <Image
              src="/logo_cg.png"
              alt="COLIN GUEST"
              fill
              className="object-contain object-center scale-[4.0] pointer-events-none"
              priority
            />
          </Link>





          {/* Right: Wishlist & Cart */}
          <div className="flex items-center gap-4 pointer-events-auto">
            <button
              onClick={openWishlist}
              className="relative transition-transform active:scale-95"
              aria-label="Wishlist"
            >
              <Bookmark className="w-6 h-6" strokeWidth={1.5} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black">
                  {wishlistItems.length}
                </span>
              )}
            </button>
            <button
              onClick={openCart}
              className="relative transition-transform active:scale-95"
              aria-label="Cart"
            >
              <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>


      {/* 2. BOTTOM FLOATING NAV AREA (Pill) */}
      <div className="fixed bottom-6 left-0 right-0 z-40 px-6 flex items-end justify-center pointer-events-none">
        {/* Glass Pill */}
        <div className="pointer-events-auto flex items-center justify-between px-8 py-4 bg-white/20 backdrop-blur-lg backdrop-saturate-150 border border-white/20 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-full max-w-[280px] transition-all">
          <Link href="/" className="text-black hover:opacity-70 transition-opacity">
            <Home className="w-6 h-6" strokeWidth={1.5} />
          </Link>

          <Link href="/collections/all" className="text-black hover:opacity-70 transition-opacity">
            <Compass className="w-6 h-6" strokeWidth={1.5} />
          </Link>

          <button className="text-black hover:opacity-70 transition-opacity">
            <Search className="w-6 h-6" strokeWidth={1.5} />
          </button>

          <Link href={isLoggedIn ? "/profile" : "/login"} className="text-black hover:opacity-70 transition-opacity">
            <User className="w-6 h-6" strokeWidth={1.5} />
          </Link>
        </div>

      </div>


      {/* 3. FULL SCREEN MENU DRAWER */}
      <div
        className={`fixed inset-0 z-[60] bg-white transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0 flex flex-col" : "-translate-x-full hidden"
        }`}
      >
        <div className="flex flex-col h-full relative">
          {/* Close Button Top Right */}
          <div className="absolute top-6 right-6 z-10">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-black transition-transform active:scale-95 bg-gray-100 rounded-full"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* Menu Links */}
          <nav className="flex-1 px-8 pt-32 pb-10 overflow-y-auto flex flex-col gap-10">
            <Link href="/collections/all" className="block text-4xl font-black uppercase tracking-tight text-black">
              Shop All
            </Link>
            <Link href="/collections/new" className="block text-4xl font-black uppercase tracking-tight text-black">
              New Arrivals
            </Link>
            <Link href="/collections/tops" className="block text-4xl font-black uppercase tracking-tight text-black">
              Tops
            </Link>
            <Link href="/collections/bottoms" className="block text-4xl font-black uppercase tracking-tight text-black">
              Bottoms
            </Link>
            <Link href="/about" className="block text-4xl font-black uppercase tracking-tight text-black">
              About
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}


