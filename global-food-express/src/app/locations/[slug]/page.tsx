import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STORES, getStore, formatAddress, directionsUrl, whatsappUrl } from "@/config/locations";
import { IMAGES } from "@/config/images";
import { LOCATION_COPY } from "@/content/locations";
import { CATEGORIES } from "@/config/products";
import PageHeader from "@/components/sections/PageHeader";
import OpenNow from "@/components/sections/OpenNow";
import MapEmbed from "@/components/sections/MapEmbed";
import StoreMemory from "@/components/sections/StoreMemory";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/motion/Reveal";
import TrackedLink from "@/components/ui/TrackedLink";
import { storeSchema } from "@/lib/schema";
import { hoursRows } from "@/lib/hours";
import { renderLite } from "@/lib/lite-md";
import { pageMetadata } from "@/lib/seo";
import { PhoneIcon, PinIcon, ChatIcon } from "@/components/ui/Icons";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return STORES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const s = getStore((await params).slug);
  if (!s) return {};
  const c = LOCATION_COPY[s.id];
  return pageMetadata({ title: c.title, description: c.description, path: `/locations/${s.slug}` });
}

export default async function StorePage({ params }: { params: Params }) {
  const s = getStore((await params).slug);
  if (!s) notFound();
  const c = LOCATION_COPY[s.id];
  const img = s.id === "rosenberg" ? IMAGES.storefrontRosenberg : IMAGES.storefrontSugarLand;
  const rows = hoursRows(s.hours);
  const other = STORES.find((o) => o.id !== s.id)!;
  return (
    <>
      <JsonLd data={storeSchema(s)} />
      <StoreMemory id={s.id} />
      <PageHeader
        eyebrow={`${s.address.city} · ${s.address.zip}`}
        crumbs={[{ name: "Locations", href: "/locations" }, { name: s.address.city, href: `/locations/${s.slug}` }]}
        lines={[c.h1[0], <span key="c">{c.h1[1].replace(", Texas", ",")} <em className="accent">Texas</em></span>]}
        intro={c.intro}
      >
        <div className="fade-up mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <OpenNow hours={s.hours} />
          <address className="not-italic text-cream-2">{formatAddress(s) as string}</address>
        </div>
        <ul className="fade-up mt-6 flex flex-wrap gap-3">
          <li>
            <TrackedLink event="phone_click" store={s.id} href={`tel:${s.phoneE164}`} data-cursor="call" className="btn btn-primary"><PhoneIcon width={16} height={16} /> {s.phone}</TrackedLink>
          </li>
          <li>
            <TrackedLink event="directions_click" store={s.id} href={directionsUrl(s)} target="_blank" rel="noopener" data-cursor="directions" className="btn btn-ghost"><PinIcon width={16} height={16} /> Directions</TrackedLink>
          </li>
          <li>
            <TrackedLink event="whatsapp_click" store={s.id} href={whatsappUrl(s)} target="_blank" rel="noopener" data-cursor="whatsapp" className="btn btn-ghost"><ChatIcon width={16} height={16} /> WhatsApp group</TrackedLink>
          </li>
        </ul>
      </PageHeader>

      <Reveal className="container grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="clip-reveal img-reveal" data-cursor="view">
          <Image src={img.src} alt={img.alt} width={img.width} height={img.height} priority sizes="(min-width:1024px) 58vw, 100vw" className="aspect-[3/2] w-full object-cover" />
        </div>
        <div className="surface-elevated fade-up rounded-[var(--radius)] border border-line p-6 md:p-8">
          <h2 className="font-display text-[length:var(--step-2)]">Hours</h2>
          {rows ? (
            <dl className="table-rows mt-4">
              {rows.map((r) => (
                <div key={r.days} className="flex justify-between gap-4 py-2 text-cream-2">
                  <dt>{r.days}</dt>
                  <dd className="text-cream">{r.time}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-3 text-cream-2">Hours are being confirmed. Call {s.phone} and we will tell you today&rsquo;s hours.</p>
          )}
          <h2 className="mt-8 font-display text-[length:var(--step-2)]">Parking</h2>
          <p className="mt-3 text-cream-2">{s.parking}</p>
          <h2 className="mt-8 font-display text-[length:var(--step-2)]">Known for</h2>
          <ul className="mt-3 grid gap-2 text-cream-2">
            {s.knownFor.map((k) => (
              <li key={k} className="flex gap-3"><span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" aria-hidden="true" />{k}</li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className="container section-tight grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose fade-up">{renderLite(c.body)}</div>
        <aside className="fade-up space-y-10">
          <div>
            <p className="eyebrow">Map</p>
            <MapEmbed store={s} className="mt-4" />
          </div>
          <div>
            <p className="eyebrow">Neighborhoods we serve</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.neighborhoods.map((n) => (
                <li key={n} className="rounded-full border border-line px-3 py-1 text-sm text-cream-2">{n}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Aisles</p>
            <ul className="mt-4 grid gap-2 text-cream-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}><Link href={`/products/${cat.slug}`} className="link-underline hover:text-cream">{cat.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Other store</p>
            <p className="mt-3 text-cream-2">{formatAddress(other) as string}</p>
            <Link href={`/locations/${other.slug}`} className="link-underline mt-2 inline-block text-cream">{other.shortName} store page</Link>
          </div>
        </aside>
      </Reveal>
      <FAQ items={c.faqs} title={`${s.address.city} store questions`} />
    </>
  );
}
