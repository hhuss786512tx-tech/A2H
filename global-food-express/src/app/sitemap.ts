import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { CATEGORIES } from "@/config/products";
import { STORES } from "@/config/locations";
import { POSTS } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly", lastModified: Date = now) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });
  return [
    entry("/", 1, "weekly"),
    entry("/products", 0.9),
    ...CATEGORIES.map((c) => entry(`/products/${c.slug}`, 0.8)),
    entry("/halal", 0.9),
    entry("/locations", 0.9, "weekly"),
    ...STORES.map((s) => entry(`/locations/${s.slug}`, 0.9, "weekly")),
    entry("/weekly-specials", 0.8, "weekly"),
    entry("/whatsapp", 0.6),
    entry("/about", 0.6),
    entry("/contact", 0.7),
    entry("/blog", 0.7, "weekly"),
    ...POSTS.map((p) => entry(`/blog/${p.slug}`, 0.6, "monthly", new Date(p.datePublished))),
    entry("/privacy", 0.2, "yearly"),
    entry("/terms", 0.2, "yearly"),
  ];
}
