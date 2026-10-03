import Image from "next/image";
import Link from "next/link";
import { POSTS } from "@/content/blog";
import { IMAGES } from "@/config/images";
import Reveal from "@/components/motion/Reveal";
import { Lines } from "@/components/motion/Lines";
import { ArrowUpRight } from "@/components/ui/Icons";

export function PostCard({ post, featured = false }: { post: (typeof POSTS)[number]; featured?: boolean }) {
  const img = IMAGES[post.image];
  return (
    <article className={`group fade-up ${featured ? "lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-10" : ""}`}>
      <Link href={`/blog/${post.slug}`} className="img-reveal block" data-cursor="view" tabIndex={-1} aria-hidden="true">
        <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes={featured ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 33vw, 100vw"} className="aspect-[16/10] w-full object-cover" />
      </Link>
      <div className={featured ? "mt-5 lg:mt-0 lg:self-center" : "mt-5"}>
        <p className="text-xs uppercase tracking-[0.18em] text-saffron">{post.tags.join(" · ")} · {post.readMinutes} min</p>
        <h3 className={`mt-3 font-display leading-tight ${featured ? "text-[length:var(--step-3)]" : "text-[length:var(--step-2)]"}`}>
          <Link href={`/blog/${post.slug}`} className="transition-colors group-hover:text-saffron">{post.h1}</Link>
        </h3>
        <p className="mt-3 max-w-[48ch] text-cream-2">{post.description}</p>
        <Link href={`/blog/${post.slug}`} className="link-underline mt-4 inline-flex items-center gap-1 text-sm text-cream">
          Read <ArrowUpRight width={16} height={16} />
        </Link>
      </div>
    </article>
  );
}

export default function BlogTeaser() {
  const posts = POSTS.slice(0, 3);
  return (
    <section className="section-tight" aria-labelledby="journal-title">
      <div className="container">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow fade-up">Journal</p>
            <h2 id="journal-title" className="mt-4 text-[length:var(--step-4)]">
              <Lines lines={["Guides from", <span key="c">the <em className="accent">counter</em></span>]} />
            </h2>
          </div>
          <Link href="/blog" className="fade-up link-underline text-cream">All articles</Link>
        </Reveal>
        <Reveal className="mt-12 grid gap-10 md:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
