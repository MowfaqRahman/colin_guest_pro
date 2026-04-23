"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, Bookmark, User, ChevronDown } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { motion } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const { items, openCart, wishlistItems, isLoggedIn, user, logout } = useCartStore();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "The Lookbook", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
  ];

  const isAboutPage = pathname === "/about";
  const isCollectionsPage = pathname === "/collections";

  // Liquid Logic: Transparent at top, frosted on scroll
  const getNavStyles = () => {
    if (isAboutPage) return "bg-transparent border-none";
    if (isCollectionsPage) {
      return scrolled 
        ? "bg-white/40 backdrop-blur-2xl shadow-sm" 
        : "bg-transparent border-none";
    }
    return "bg-[#f9f9fa]/90 backdrop-blur-md border-b border-black/5";
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${getNavStyles()}`}>
      <div className={`grid grid-cols-3 items-center px-8 h-[72px] ${isAboutPage ? "text-white" : "text-black"}`}>
        {/* LEFT: Branding */}
        <div className="flex justify-start">
          <Link href="/" className={`relative h-[72px] w-64 transition-opacity flex items-center overflow-hidden ml-[-24px] ${isAboutPage ? "invert brightness-200" : "hover:opacity-60"}`}>
            <Image 
              src="/logo_cg.png" 
              alt="COLIN GUEST" 
              fill 
              className="object-cover" 
              priority
            />
          </Link>
        </div>

        {/* CENTER: Editorial Navigation */}
        <div className="hidden md:flex justify-center gap-12 text-[10px] tracking-[0.2em] uppercase font-bold">
          {navLinks.map((link) => {
            const isActive = link.href === "/" 
              ? pathname === "/" 
              : pathname.startsWith(link.href);
            
            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={`relative py-1 transition-colors ${
                  isAboutPage 
                    ? isActive ? 'text-white' : 'text-white/50 hover:text-white'
                    : isActive ? 'text-black' : 'text-black/40 hover:text-black'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="nav-underline"
                    className={`absolute bottom-0 left-0 right-0 h-[1px] ${isAboutPage ? "bg-white" : "bg-black"}`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* RIGHT: Constant Icons Cluster */}
        <div className={`flex items-center justify-end gap-6 text-xs font-semibold tracking-widest uppercase ${isAboutPage ? "text-white" : "text-black"}`}>
          <Search size={18} className={`cursor-pointer transition-colors ${isAboutPage ? "text-white/50 hover:text-white" : "text-black/40 hover:text-black"}`} />
          
          {isLoggedIn ? (
            <div className="relative">
              <button 
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className={`flex items-center gap-1 transition-colors ${isAboutPage ? "text-white/50 hover:text-white" : "text-black/40 hover:text-black"}`}
              >
                <User size={18} strokeWidth={1.5} className={isAboutPage ? "fill-white" : "fill-black"} />
                <ChevronDown size={12} className={`transition-transform duration-300 ${isAccountOpen ? "rotate-180" : ""}`} />
              </button>

              {isAccountOpen && (
                <>
                  {/* Backdrop for closing */}
                  <div className="fixed inset-0 z-[-1]" onClick={() => setIsAccountOpen(false)} />
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`absolute right-0 mt-4 w-48 py-2 rounded-lg shadow-2xl border backdrop-blur-xl z-[100] ${
                      isAboutPage 
                      ? "bg-black/80 border-white/10 text-white" 
                      : "bg-white/80 border-black/5 text-black"
                    }`}
                  >
                    <div className="px-4 py-2 border-b border-white/10 mb-1">
                      <p className="text-[9px] font-bold uppercase tracking-widest opacity-50">Account</p>
                    </div>
                    <Link href="/profile" className="block px-4 py-2.5 text-[11px] font-bold hover:bg-black/5 transition-colors tracking-widest uppercase">Profile</Link>
                    <Link href="/orders" className="block px-4 py-2.5 text-[11px] font-bold hover:bg-black/5 transition-colors tracking-widest uppercase">Orders</Link>
                    <div className="h-[1px] bg-black/5 my-1" />
                    <button 
                      onClick={() => {
                        logout();
                        setIsAccountOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-[11px] font-bold hover:bg-red-50 hover:text-red-600 transition-colors tracking-widest uppercase"
                    >
                      Logout
                    </button>
                  </motion.div>
                </>
              )}
            </div>
          ) : (
            <Link href="/login" className={`cursor-pointer block transition-colors ${isAboutPage ? "text-white/50 hover:text-white" : "text-black/40 hover:text-black"}`}>
              <User size={18} strokeWidth={1.5} />
            </Link>
          )}

          <Link href="/wishlist" className={`cursor-pointer block relative transition-colors ${isAboutPage ? "text-white/50 hover:text-white" : "text-black/40 hover:text-black"}`}>
            <Bookmark size={18} strokeWidth={1.5} />
            {wishlistItems.length > 0 && (
              <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${isAboutPage ? "bg-white" : "bg-black"}`} />
            )}
          </Link>

          <div 
            className={`flex items-center gap-2 cursor-pointer transition-colors ${isAboutPage ? "text-white/50 hover:text-white" : "text-black/40 hover:text-black"}`} 
            onClick={openCart}
          >
            <ShoppingBag size={18} />
            <span className="text-[10px] font-bold">({items.length})</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
