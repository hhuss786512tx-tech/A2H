import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost } from "@/content/blog";
import { IMAGES } from "@/config/images";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/motion/Reveal";
import { Lines } from "@/components/motion/Lines";
import { PostCard } from "@/components/sections/BlogTeaser";
import { articleSchema } from "@/lib/schema";
import { renderLite } from "@/lib/lite-md";
import { pageMetadata } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.title, description: p.description, path: `/blog/${p.slug}`, type: "article" });
}

export default async function PostPage({ params }: { params: Params }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const img = IMAGES[p.image];
  const more = POSTS.filter((o) => o.slug !== p.slug).slice(0, 2);
  const date = new Date(`${p.datePublished}T12:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return (
    <article>
      <JsonLd data={articleSchema({ title: p.title, description: p.description, slug: p.slug, datePublished: p.datePublished, image: img.src })} />
      <header className="glow-bg pt-[calc(var(--nav-h)+3rem)] pb-10">
        <Reveal className="container">
          <Breadcrumbs items={[{ name: "Journal", href: "/blog" }, { name: p.h1, href: `/blog/${p.slug}` }]} className="fade-up" />
          <p className="eyebrow mt-8 fade-up">{p.tags.join(" · ")} · {p.readMinutes} min read</p>
          <h1 className="mt-4 max-w-[20ch] text-[length:var(--step-5)]"><Lines lines={[p.h1]} /></h1>
          <p className="fade-up mt-6 max-w-[60ch] text-[length:var(--step-1)] leading-[1.5] text-cream-2">{p.description}</p>
          <p className="fade-up mt-4 text-sm text-cream-3">
            By the Global Food Express team · <time dateTime={p.datePublished}>{date}</time>
          </p>
        </Reveal>
      </header>
      <Reveal className="container">
        <div className="clip-reveal img-reveal">
          <Image src={img.src} alt={img.alt} width={img.width} height={img.height} priority sizes="100vw" className="aspect-[16/8] w-full object-cover" />
        </div>
      </Reveal>
      <div className="container section-tight grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose">{renderLite(p.body)}</div>
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div className="surface-elevated rounded-[var(--radius)] border border-line p-6">
            <p className="eyebrow">Shop it</p>
            <ul className="mt-4 grid gap-2 text-cream-2">
              <li><Link href="/products/halal-meat" className="link-underline hover:text-cream">Zabiha halal meat</Link></li>
              <li><Link href="/products/spices-masalas" className="link-underline hover:text-cream">Spices and masalas</Link></li>
              <li><Link href="/products/rice-pantry" className="link-underline hover:text-cream">Rice and pantry</Link></li>
              <li><Link href="/locations" className="link-underline hover:text-cream">Find a store</Link></li>
            </ul>
          </div>
        </aside>
      </div>
      <section className="container pb-24" aria-labelledby="more-title">
        <h2 id="more-title" className="eyebrow">More from the journal</h2>
        <Reveal className="mt-8 grid gap-10 md:grid-cols-2">
          {more.map((m) => (
            <PostCard key={m.slug} post={m} />
          ))}
        </Reveal>
      </section>
    </article>
  );
}
