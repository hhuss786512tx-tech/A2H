import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, categoryImage } from "@/config/products";
import PageHeader from "@/components/sections/PageHeader";
import Reveal from "@/components/motion/Reveal";
import JsonLd from "@/components/ui/JsonLd";
import { itemListSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { ArrowUpRight } from "@/components/ui/Icons";

export const metadata: Metadata = pageMetadata({
  title: "Aisles: Produce, Spices, Halal Meat | Global Food Express",
  description:
    "Every aisle at Global Food Express: desi produce, spices and masalas, zabiha halal meat, frozen, basmati, snacks and sweets. Rosenberg and Sugar Land, TX.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={itemListSchema("Aisles at Global Food Express", CATEGORIES.map((c) => ({ name: c.name, url: `/products/${c.slug}` })))} />
      <PageHeader
        eyebrow="Aisles"
        crumbs={[{ name: "Aisles", href: "/products" }]}
        lines={["Six aisles.", <span key="a">One <em className="accent">standard.</em></span>]}
        intro="Both stores carry the full range below. Each aisle page lists what we stock, the brands we carry and the questions we get asked at the counter."
      />
      <Reveal className="container pb-24">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => {
            const img = categoryImage(c);
            const tall = i === 0 || i === 3;
            return (
              <li key={c.slug} className={`fade-up ${tall ? "lg:row-span-2" : ""}`}>
                <Link href={`/products/${c.slug}`} className="img-reveal group block h-full" data-cursor="view">
                  <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className={`w-full object-cover ${tall ? "aspect-[4/5] lg:h-full" : "aspect-[4/3]"}`} />
                  <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-6">
                    <div>
                      <span className="font-sans text-xs tabular-nums tracking-[0.2em] text-saffron">0{i + 1}</span>
                      <h2 className="mt-1 font-display text-[length:var(--step-2)] leading-none">{c.name}</h2>
                      <p className="mt-2 max-w-[32ch] text-sm text-cream-2">{c.products.slice(0, 3).join(" · ")}</p>
                    </div>
                    <span className="icon-btn shrink-0 bg-base/60 backdrop-blur transition-transform group-hover:-translate-y-1 group-hover:rotate-45"><ArrowUpRight /></span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </>
  );
}
