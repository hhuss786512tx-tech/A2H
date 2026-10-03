import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { CATEGORIES, getCategory } from "@/config/products";
export const alt = "Global Food Express aisle";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}
export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = getCategory(category);
  return renderOg({ title: c?.h1 ?? "Aisles", kicker: "Global Food Express · Aisles" });
}
