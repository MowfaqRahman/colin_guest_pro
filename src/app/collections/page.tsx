import { getCollection } from "@/lib/shopify";
import { CollectionsHubClient } from "@/components/collections-hub-client";
import Image from "next/image";

export default async function CollectionsHub() {
  // Fetch collection details for images
  const hoodieCollection = await getCollection("hoodie");
  const jeansCollection = await getCollection("jeans");

  return (
    <main className="min-h-screen bg-white text-black font-sans relative overflow-x-hidden">
      {/* Editorial Hero - Static Server Content */}
      <section className="relative w-full h-screen overflow-hidden flex flex-row pt-[80px] bg-white">
        {/* Left Column: Typography */}
        <div className="w-[30%] h-full flex flex-col justify-center px-[6%] z-20">
          <h2 className="text-[70px] font-serif leading-[0.9] italic mb-8 text-black tracking-tight">Style,<br />Redefined</h2>
          <div className="space-y-10">
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-black/60 leading-relaxed font-sans pr-4">
              Uncomplicated, Essential Pieces<br />You'll Reach For Again And Again.
            </p>
            <button className="w-fit px-12 py-4 border border-black text-black text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-black hover:text-white transition-all duration-300">
              Explore Collection
            </button>
          </div>
        </div>

        {/* Right Column: Photography */}
        <div className="w-[70%] h-full relative p-12">
          <Image
            src="/collections_hero.jpg"
            alt="Editorial Collections Hero"
            fill
            className="object-contain object-center"
            priority
            unoptimized={true}
          />
        </div>
      </section>

      {/* Interactive Categories Grid - Client Component for Motion */}
      <CollectionsHubClient 
        hoodieImage={hoodieCollection?.image?.url} 
        jeansImage={jeansCollection?.image?.url}
      />
    </main>
  );
}
