import type { Metadata } from "next";
import { POSTS } from "@/content/blog";
import PageHeader from "@/components/sections/PageHeader";
import { PostCard } from "@/components/sections/BlogTeaser";
import Reveal from "@/components/motion/Reveal";
import JsonLd from "@/components/ui/JsonLd";
import { itemListSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Journal: Halal, Spice & Pantry Guides | Global Food Express",
  description:
    "Guides from a Fort Bend halal grocer: what zabiha means, a beginner's masala pantry, picking basmati, Mediterranean staples, Eid shopping and meat cuts.",
  path: "/blog",
});

export default function BlogPage() {
  const [first, ...rest] = POSTS;
  return (
    <>
      <JsonLd data={itemListSchema("Global Food Express Journal", POSTS.map((p) => ({ name: p.h1, url: `/blog/${p.slug}` })))} />
      <PageHeader
        eyebrow="Journal"
        crumbs={[{ name: "Journal", href: "/blog" }]}
        lines={["Guides from", <span key="c">the <em className="accent">counter</em></span>]}
        intro="Written by people who stock the shelves and cut the meat. No recipes-for-the-sake-of-it; the questions we actually get asked, answered properly."
      />
      <Reveal className="container grid gap-12 pb-24 lg:grid-cols-2">
        <h2 className="sr-only">All articles</h2>
        <PostCard post={first} featured />
        {rest.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </Reveal>
    </>
  );
}
