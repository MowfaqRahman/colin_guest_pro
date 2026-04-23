"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, Bookmark, User, Loader2 } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/store";

export default function SignupPage() {
  const router = useRouter();
  const { items, signup, isSyncing } = useCartStore();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = await signup(formData);
    if (result.success) {
      router.push("/");
    } else {
      setError(result.error || "Failed to create account. Please try again.");
    }
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

      {/* Signup Form Block */}
      <div className="w-full max-w-[1200px] mx-auto px-8 pt-24 pb-24 flex flex-col md:flex-row justify-between gap-24">
         
         <div className="flex-1 w-full max-w-[550px]">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Create Account</h1>
            <p className="text-sm text-black/50 font-medium mb-10 tracking-wide">Register to manage your orders and access exclusive features.</p>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm mb-6 font-medium">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSignup} className="flex flex-col gap-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      required 
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John" 
                      className="w-full border border-black/20 rounded py-3 px-4 text-sm outline-none focus:border-black transition-colors bg-[#f9f9fa] focus:bg-white" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      required 
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe" 
                      className="w-full border border-black/20 rounded py-3 px-4 text-sm outline-none focus:border-black transition-colors bg-[#f9f9fa] focus:bg-white" 
                    />
                  </div>
               </div>

               <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com" 
                    className="w-full border border-black/20 rounded py-3 px-4 text-sm outline-none focus:border-black transition-colors bg-[#f9f9fa] focus:bg-white" 
                  />
               </div>
               
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest">Password</label>
                  <input 
                    type="password" 
                    name="password"
                    required 
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••" 
                    className="w-full border border-black/20 rounded py-3 px-4 text-sm outline-none focus:border-black transition-colors bg-[#f9f9fa] focus:bg-white" 
                  />
                  <p className="text-[10px] text-black/40 font-medium">Must be at least 8 characters long.</p>
               </div>

               <button 
                type="submit" 
                disabled={isSyncing}
                className="w-full bg-black text-white font-bold py-4 rounded hover:bg-black/80 transition-colors mt-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300 flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
               >
                  {isSyncing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
               </button>

               <p className="text-center text-xs text-black/50 font-medium mt-4">
                  By creating an account, you agree to our <span className="text-black underline cursor-pointer">Terms & Conditions</span> and <span className="text-black underline cursor-pointer">Privacy Policy</span>.
               </p>
            </form>
         </div>

         {/* Right Div: Login Prompt */}
         <div className="flex-1 w-full max-w-[400px] pt-4 border-t md:border-t-0 md:border-l border-black/5 md:pl-24 flex flex-col justify-center">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Already have an account?</h2>
            <p className="text-sm text-black/60 font-medium tracking-wide mb-8 leading-relaxed">
               Log in to access your saved items, view order history, and manage your account settings.
            </p>
            <Link 
              href="/login"
              className="w-[200px] border border-black text-black font-bold py-3 rounded hover:bg-black/5 transition-colors text-center text-sm"
            >
               Sign In
            </Link>
         </div>
         
      </div>
    </main>
  );
}
