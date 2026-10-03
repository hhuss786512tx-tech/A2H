import { SITE, AREAS_SERVED } from "@/config/site";
import { STORES, type Store, directionsUrl } from "@/config/locations";
import { openingHoursSpecification } from "@/lib/hours";
import type { FAQ } from "@/config/products";

const abs = (path: string) => (path.startsWith("http") ? path : `${SITE.url}${path}`);

const sameAs = () => Object.values(SITE.social).filter((v): v is string => Boolean(v));

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: abs("/icon.svg"),
    ...(SITE.email ? { email: SITE.email } : {}),
    ...(SITE.foundingYear ? { foundingDate: String(SITE.foundingYear) } : {}),
    sameAs: sameAs(),
    location: STORES.map((s) => ({ "@id": `${SITE.url}/locations/${s.slug}#store` })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en-US",
  };
}

export function storeSchema(s: Store) {
  const hours = openingHoursSpecification(s.hours);
  return {
    "@context": "https://schema.org",
    "@type": "GroceryStore",
    "@id": `${SITE.url}/locations/${s.slug}#store`,
    name: s.name,
    url: `${SITE.url}/locations/${s.slug}`,
    image: abs(s.id === "rosenberg" ? "/images/store-rosenberg.jpg" : "/images/store-sugar-land.jpg"),
    telephone: s.phoneE164,
    ...(SITE.email ? { email: SITE.email } : {}),
    priceRange: SITE.priceRange,
    currenciesAccepted: "USD",
    address: {
      "@type": "PostalAddress",
      streetAddress: [s.address.street, s.address.suite].filter(Boolean).join(", "),
      addressLocality: s.address.city,
      addressRegion: s.address.state,
      postalCode: s.address.zip,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: s.geo.lat, longitude: s.geo.lng },
    hasMap: directionsUrl(s),
    areaServed: AREAS_SERVED.map((a) => ({ "@type": "City", name: a })),
    ...(hours.length ? { openingHoursSpecification: hours } : {}),
    sameAs: sameAs(),
    parentOrganization: { "@id": `${SITE.url}/#organization` },
    keywords: "halal grocery, zabiha halal meat, Indian grocery, Pakistani grocery, Mediterranean grocery",
    servesCuisine: ["Indian", "Pakistani", "Mediterranean"],
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.href),
    })),
  };
}

export function faqSchema(faqs: FAQ[]) {
  // Never emit FAQ answers that still carry TODO markers.
  const clean = faqs.filter((f) => !/TODO_CLIENT/.test(f.a));
  if (!clean.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: clean.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(a: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    image: abs(a.image),
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    mainEntityOfPage: `${SITE.url}/blog/${a.slug}`,
    author: { "@type": "Organization", name: SITE.name, "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}

export function itemListSchema(name: string, items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: abs(it.url),
    })),
  };
}
