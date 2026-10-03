import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import AisleTour from "@/components/sections/AisleTour";
import HalalSection from "@/components/sections/HalalSection";
import StoresSection from "@/components/sections/StoresSection";
import SpecialsTeaser from "@/components/sections/SpecialsTeaser";
import BlogTeaser from "@/components/sections/BlogTeaser";
import Preloader from "@/components/motion/Preloader";
import Marquee from "@/components/motion/Marquee";
import JsonLd from "@/components/ui/JsonLd";
import { MARQUEE_ITEMS } from "@/config/products";
import { STORES } from "@/config/locations";
import { storeSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Halal Grocery in Rosenberg & Sugar Land TX | Global Food",
  description:
    "Indo-Pak and Mediterranean grocery with 100% zabiha halal meat, desi produce, spices and basmati. Two Fort Bend County stores: Rosenberg and Sugar Land.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={STORES.map(storeSchema)} />
      <Preloader />
      <Hero />
      <div className="border-y border-line py-4 font-display text-[length:var(--step-2)] text-cream-2">
        <Marquee items={MARQUEE_ITEMS} speed={45} />
      </div>
      <AisleTour />
      <HalalSection />
      <StoresSection />
      <SpecialsTeaser />
      <BlogTeaser />
    </>
  );
}
