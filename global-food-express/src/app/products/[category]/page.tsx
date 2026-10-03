import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategory, categoryImage } from "@/config/products";
import { STORES } from "@/config/locations";
import PageHeader from "@/components/sections/PageHeader";
import FAQ from "@/components/ui/FAQ";
import Reveal from "@/components/motion/Reveal";
import { pageMetadata } from "@/lib/seo";
import { ArrowIcon } from "@/components/ui/Icons";

type Params = Promise<{ category: string }>;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const c = getCategory((await params).category);
  if (!c) return {};
  return pageMetadata({ title: c.title, description: c.description, path: `/products/${c.slug}` });
}

export default async function CategoryPage({ params }: { params: Params }) {
  const c = getCategory((await params).category);
  if (!c) notFound();
  const img = categoryImage(c);
  const others = CATEGORIES.filter((o) => o.slug !== c.slug);
  const isMeat = c.slug === "halal-meat";
  const h1Lines = c.h1.split(", ");
  return (
    <>
      <PageHeader
        eyebrow={`Aisle · ${c.short}`}
        crumbs={[{ name: "Aisles", href: "/products" }, { name: c.name, href: `/products/${c.slug}` }]}
        lines={h1Lines.length > 1 ? h1Lines.map((l, i) => (i < h1Lines.length - 1 ? `${l},` : l)) : [c.h1]}
        intro={c.intro[0]}
      />
      <Reveal className="container grid gap-12 pb-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="clip-reveal img-reveal" data-cursor="view">
          <Image src={img.src} alt={img.alt} width={img.width} height={img.height} priority sizes="(min-width:1024px) 50vw, 100vw" className="aspect-[4/5] w-full object-cover" />
        </div>
        <div className="lg:pt-6">
          {c.intro.slice(1).map((p) => (
            <p key={p} className="fade-up text-[length:var(--step-1)] leading-[1.55] text-cream-2">{p}</p>
          ))}
          <h2 className="fade-up mt-10 text-[length:var(--step-2)]">What we stock</h2>
          <ul className="fade-up table-rows mt-4 border-y border-line">
            {c.products.map((p) => (
              <li key={p} className="flex items-center justify-between gap-4 py-3 text-cream-2">
                <span>{p}</span>
                <span className="text-xs uppercase tracking-[0.16em] text-cream-3">both stores</span>
              </li>
            ))}
          </ul>
          {isMeat && (
            <div className="fade-up surface-elevated mt-8 rounded-[var(--radius)] border border-line p-6">
              <p className="font-display text-[length:var(--step-1)]">Need a specific cut for the weekend?</p>
              <p className="mt-2 text-cream-2">Send a pre-order and we will have it trimmed and bagged for pickup at either store.</p>
              <Link href="/contact#preorder" className="btn btn-primary mt-4">Pre-order a cut <ArrowIcon width={18} height={18} /></Link>
            </div>
          )}
          <div className="fade-up mt-8 flex flex-wrap gap-3 text-sm">
            {STORES.map((s) => (
              <Link key={s.id} href={`/locations/${s.slug}`} className="btn btn-ghost !min-h-[2.6rem] !py-2 text-sm">{s.shortName} store</Link>
            ))}
          </div>
        </div>
      </Reveal>
      <FAQ items={c.faqs} title={`About the ${c.short.toLowerCase()} aisle`} />
      <Reveal className="container pb-24">
        <p className="eyebrow fade-up">Other aisles</p>
        <ul className="fade-up mt-4 flex flex-wrap gap-x-8 gap-y-3 font-display text-[length:var(--step-2)]">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/products/${o.slug}`} className="link-underline text-cream-2 hover:text-cream">{o.name}</Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </>
  );
}
