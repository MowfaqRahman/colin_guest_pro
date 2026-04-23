"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, Bookmark, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store";
import { Loader2 } from "lucide-react";
import { signIn as socialSignIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const { items, login, recoverPassword, isSyncing } = useCartStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [view, setView] = useState<'login' | 'forgot-password'>('login');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    const result = await login(email, password);
    if (result.success) {
      router.push("/");
    } else {
      setError(result.error || "Login failed. Please check your credentials.");
    }
  };

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    const result = await recoverPassword(email);
    if (result.success) {
      setMessage("If an account exists with that email, you will receive a password reset link.");
      setView('login');
    } else {
      setError(result.error || "Failed to send recovery email.");
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

      {/* Structured Login Dual-Block Mockup */}
      <div className="w-full max-w-[1200px] mx-auto px-8 pt-32 pb-24 flex flex-col md:flex-row justify-between gap-24">
         
         {/* Left Div: Login Form */}
         <div className="flex-1 w-full max-w-[480px]">
            {view === 'login' ? (
              <>
                <h1 className="text-4xl font-extrabold tracking-tight mb-2">Login</h1>
                <p className="text-sm text-black/50 font-medium mb-10 tracking-wide">Enter your personal details to access your account dashboard.</p>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm mb-6 font-medium">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded text-sm mb-6 font-medium">
                    {message}
                  </div>
                )}
                
                <form onSubmit={handleLogin} className="flex flex-col gap-6">
                   <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com" 
                        className="w-full border border-black/20 rounded py-3 px-4 text-sm outline-none focus:border-black transition-colors bg-[#f9f9fa] focus:bg-white" 
                      />
                   </div>
                   
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest flex justify-between">
                         <span>Password</span>
                         <span 
                          onClick={() => {
                            setView('forgot-password');
                            setError(null);
                            setMessage(null);
                          }}
                          className="text-black/40 hover:text-black transition-colors cursor-pointer capitalize font-semibold tracking-normal"
                        >
                          Forgot Password?
                        </span>
                      </label>
                      <input 
                        type="password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••" 
                        className="w-full border border-black/20 rounded py-3 px-4 text-sm outline-none focus:border-black transition-colors bg-[#f9f9fa] focus:bg-white" 
                      />
                   </div>

                   <button 
                    type="submit" 
                    disabled={isSyncing}
                    className="w-full bg-black text-white font-bold py-4 rounded hover:bg-black/80 transition-colors mt-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300 flex items-center justify-center gap-2"
                   >
                      {isSyncing ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Connecting Account...
                        </>
                      ) : (
                        "Sign In"
                      )}
                   </button>

                   <div className="flex items-center gap-4 my-2">
                     <div className="h-[1px] bg-black/10 flex-1"></div>
                     <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">or</span>
                     <div className="h-[1px] bg-black/10 flex-1"></div>
                   </div>

                   <button 
                    type="button"
                    onClick={() => {
                      useCartStore.setState({ hasLoggedOut: false });
                      socialSignIn('google', { callbackUrl: '/' });
                    }}
                    className="w-full border border-black/10 bg-white text-black font-bold py-4 rounded hover:bg-black/5 transition-all flex items-center justify-center gap-3 group"
                   >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.51 6.16-4.51z" fill="#EA4335"/>
                      </svg>
                      Sign In with Google
                   </button>
                </form>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-extrabold tracking-tight mb-2">Recover Password</h1>
                <p className="text-sm text-black/50 font-medium mb-10 tracking-wide">Enter your email and we'll send you a link to reset your password.</p>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm mb-6 font-medium">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleRecover} className="flex flex-col gap-6">
                   <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com" 
                        className="w-full border border-black/20 rounded py-3 px-4 text-sm outline-none focus:border-black transition-colors bg-[#f9f9fa] focus:bg-white" 
                      />
                   </div>

                   <div className="flex flex-col gap-4">
                     <button 
                      type="submit" 
                      disabled={isSyncing}
                      className="w-full bg-black text-white font-bold py-4 rounded hover:bg-black/80 transition-colors mt-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300 flex items-center justify-center gap-2"
                     >
                        {isSyncing ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Sending Reset Link...
                          </>
                        ) : (
                          "Send Recovery Email"
                        )}
                     </button>
                     <button 
                      type="button"
                      onClick={() => {
                        setView('login');
                        setError(null);
                        setMessage(null);
                      }}
                      className="w-full text-black/60 hover:text-black transition-colors font-semibold text-sm"
                     >
                        Back to Login
                     </button>
                   </div>
                </form>
              </>
            )}
         </div>

         {/* Right Div: Create Account Prompt */}
         <div className="flex-1 w-full max-w-[480px] pt-4 border-t md:border-t-0 md:border-l border-black/5 md:pl-24 flex flex-col justify-center">
            <h2 className="text-2xl font-bold tracking-tight mb-4">New to COLIN GUEST?</h2>
            <p className="text-sm text-black/60 font-medium tracking-wide mb-8 leading-relaxed">
               Create an account to speed up your checkout, register warranties, save multiple shipping addresses, and sync your Wishlist globally.
            </p>
            <Link 
              href="/signup"
              className="w-[200px] border border-black text-black font-bold py-3 rounded hover:bg-black/5 transition-colors text-center text-sm"
            >
               Create Account
            </Link>
         </div>
         
      </div>
    </main>
  );
}
