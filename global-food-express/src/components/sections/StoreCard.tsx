import Image from "next/image";
import Link from "next/link";
import { directionsUrl, formatAddress, whatsappUrl, type Store } from "@/config/locations";
import { IMAGES } from "@/config/images";
import OpenNow from "./OpenNow";
import TiltCard from "@/components/motion/TiltCard";
import TrackedLink from "@/components/ui/TrackedLink";
import { PhoneIcon, PinIcon, ChatIcon, ArrowUpRight } from "@/components/ui/Icons";

export default function StoreCard({ store, priority = false }: { store: Store; priority?: boolean }) {
  const img = store.id === "rosenberg" ? IMAGES.storefrontRosenberg : IMAGES.storefrontSugarLand;
  return (
    <TiltCard className="surface-elevated group h-full overflow-hidden rounded-[var(--radius)] border border-line">
      <div className="img-reveal !rounded-none" data-cursor="view">
        <Link href={`/locations/${store.slug}`} className="block" title={`${store.name} store page`}>
          <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1024px) 44vw, 100vw" priority={priority} className="aspect-[3/2] w-full object-cover" />
        </Link>
        <div className="absolute left-5 top-5 z-10">
          <span className="rounded-full bg-base/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cream backdrop-blur">
            {store.shortName}
          </span>
        </div>
      </div>
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-[length:var(--step-2)] leading-tight">{store.address.city}, {store.address.state}</h3>
            <address className="mt-2 not-italic text-cream-2">{formatAddress(store) as string}</address>
          </div>
          <OpenNow hours={store.hours} className="mt-1" />
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          <li>
            <TrackedLink event="phone_click" store={store.id} href={`tel:${store.phoneE164}`} data-cursor="call" className="btn btn-primary w-full !px-3 text-sm">
              <PhoneIcon width={16} height={16} /> Call
            </TrackedLink>
          </li>
          <li>
            <TrackedLink event="directions_click" store={store.id} href={directionsUrl(store)} target="_blank" rel="noopener" data-cursor="directions" className="btn btn-ghost w-full !px-3 text-sm">
              <PinIcon width={16} height={16} /> Directions
            </TrackedLink>
          </li>
          <li>
            <TrackedLink event="whatsapp_click" store={store.id} href={whatsappUrl(store)} target="_blank" rel="noopener" data-cursor="whatsapp" className="btn btn-ghost w-full !px-3 text-sm">
              <ChatIcon width={16} height={16} /> WhatsApp
            </TrackedLink>
          </li>
        </ul>
        <div className="mt-6 flex items-center justify-between border-t border-line pt-5 text-sm">
          <span className="text-cream-3">{store.phone}</span>
          <Link href={`/locations/${store.slug}`} className="link-underline inline-flex items-center gap-1 text-cream">
            Store details <ArrowUpRight width={16} height={16} />
          </Link>
        </div>
      </div>
    </TiltCard>
  );
}
