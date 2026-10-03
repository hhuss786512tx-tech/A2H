import type { Metadata } from "next";
import { SITE } from "@/config/site";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
}

/** Builds metadata with canonical, OG and Twitter. OG image is per-route via opengraph-image.tsx. */
export function pageMetadata({ title, description, path, type = "website", noindex }: PageMeta): Metadata {
  if (process.env.NODE_ENV !== "production") {
    if (title.length > 60) console.warn(`[seo] title > 60 chars (${title.length}): ${title}`);
    if (description.length > 155) console.warn(`[seo] description > 155 chars (${description.length}): ${path}`);
  }
  const url = `${SITE.url}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE.name, locale: SITE.locale, type },
    twitter: { card: "summary_large_image", title, description },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
