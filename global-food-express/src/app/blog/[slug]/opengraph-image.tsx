import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { POSTS, getPost } from "@/content/blog";
export const alt = "Global Food Express journal";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  return renderOg({ title: p?.h1 ?? "Journal", kicker: "Global Food Express · Journal" });
}
