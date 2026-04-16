"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, Bookmark, User } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { items, simulateLogin } = useCartStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    simulateLogin(); // Toggles global auth state instantly!
    router.push("/wishlist"); // Bounces physically back to wishlist to see Phase 7 scaling!
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans relative">
      {/* Navigation Layer */}
      <nav className="w-full bg-white border-b border-black/5 z-50">
        <div className="flex items-center justify-between px-8 py-6">
          <Link href="/" className="text-xl font-bold tracking-widest uppercase">COLIN GUEST</Link>
          <div className="hidden md:flex gap-12 text-[10px] tracking-[0.2em] uppercase font-bold">
            <button className="hover:text-black/60 transition-colors">Runway</button>
            <Link href="/" className="hover:text-black/60 transition-colors">The Lookbook</Link>
            <Link href="/collections" className="hover:text-black/60 transition-colors">Collections</Link>
          </div>
          <div className="flex items-center gap-6 text-xs font-semibold tracking-widest uppercase mb-1">
            <Search size={18} />
            <Link href="/login" className="cursor-pointer hover:scale-110 transition-transform block">
              <User size={18} strokeWidth={1.5} className="fill-black" />
            </Link>
            <Link href="/wishlist" className="cursor-pointer hover:scale-110 transition-transform block">
              <Bookmark size={18} strokeWidth={1.5} />
            </Link>
            <div className="flex items-center gap-2 cursor-pointer hover:text-black/60 transition-colors">
              <ShoppingBag size={18} />
              <span>Cart ({items.length})</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Structured Login Dual-Block Mockup */}
      <div className="w-full max-w-[1200px] mx-auto px-8 pt-32 pb-24 flex flex-col md:flex-row justify-between gap-24">
         
         {/* Left Div: Login Form */}
         <div className="flex-1 w-full max-w-[480px]">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Login</h1>
            <p className="text-sm text-black/50 font-medium mb-10 tracking-wide">Enter your personal details to access your account dashboard.</p>
            
            <form onSubmit={handleLogin} className="flex flex-col gap-6">
               <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest">Email Address</label>
                  <input type="email" required placeholder="name@example.com" className="w-full border border-black/20 rounded py-3 px-4 text-sm outline-none focus:border-black transition-colors bg-[#f9f9fa] focus:bg-white" />
               </div>
               
               <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest flex justify-between">
                     <span>Password</span>
                     <span className="text-black/40 hover:text-black transition-colors cursor-pointer capitalize font-semibold tracking-normal">Forgot Password?</span>
                  </label>
                  <input type="password" required placeholder="••••••••" className="w-full border border-black/20 rounded py-3 px-4 text-sm outline-none focus:border-black transition-colors bg-[#f9f9fa] focus:bg-white" />
               </div>

               <button type="submit" className="w-full bg-black text-white font-bold py-4 rounded hover:bg-black/80 transition-colors mt-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300">
                  Sign In
               </button>
            </form>
         </div>

         {/* Right Div: Create Account Prompt */}
         <div className="flex-1 w-full max-w-[480px] pt-4 border-t md:border-t-0 md:border-l border-black/5 md:pl-24 flex flex-col justify-center">
            <h2 className="text-2xl font-bold tracking-tight mb-4">New to COLIN GUEST?</h2>
            <p className="text-sm text-black/60 font-medium tracking-wide mb-8 leading-relaxed">
               Create an account to speed up your checkout, register warranties, save multiple shipping addresses, and sync your Wishlist globally.
            </p>
            <button className="w-[200px] border border-black text-black font-bold py-3 rounded hover:bg-black/5 transition-colors">
               Create Account
            </button>
         </div>
         
      </div>
    </main>
  );
}
