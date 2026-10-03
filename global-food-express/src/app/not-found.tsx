import Link from "next/link";
import { STORES } from "@/config/locations";

export default function NotFound() {
  return (
    <section className="glow-bg flex min-h-[80svh] items-end pt-[calc(var(--nav-h)+3rem)] pb-24">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 max-w-[14ch] text-[length:var(--step-6)]">That aisle is <em className="accent">empty.</em></h1>
        <p className="mt-6 max-w-[48ch] text-[length:var(--step-1)] text-cream-2">The page moved or never existed. The stores are exactly where they have always been.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">Back home</Link>
          <Link href="/products" className="btn btn-ghost">Walk the aisles</Link>
          <a href={`tel:${STORES[0].phoneE164}`} className="btn btn-ghost">Call Rosenberg</a>
        </div>
      </div>
    </section>
  );
}
