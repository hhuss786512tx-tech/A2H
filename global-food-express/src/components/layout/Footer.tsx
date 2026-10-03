import Link from "next/link";
import { SITE } from "@/config/site";
import { STORES, formatAddress, directionsUrl } from "@/config/locations";
import { CATEGORIES, MARQUEE_ITEMS } from "@/config/products";
import { hoursRows } from "@/lib/hours";
import Marquee from "@/components/motion/Marquee";

const SOCIAL_LABELS: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  yelp: "Yelp",
  googleBusinessProfile: "Google",
};

export default function Footer() {
  const socials = Object.entries(SITE.social).filter(([, v]) => v) as [string, string][];
  return (
    <footer className="relative mt-24 border-t border-line pb-28 md:pb-12" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Site footer</h2>
      <div className="border-b border-line py-5 font-display text-[length:var(--step-2)] text-cream-2/80">
        <Marquee items={MARQUEE_ITEMS} speed={60} />
      </div>
      <div className="container grid gap-12 pt-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-[length:var(--step-3)] leading-[1.05] tracking-[-0.03em]">
            Indo-Pak and Mediterranean grocery.<br />
            <em className="accent">100% zabiha halal.</em>
          </p>
          <p className="mt-6 max-w-[38ch] text-cream-2">
            Two stores in Fort Bend County serving Rosenberg, Richmond, Sugar Land, Missouri City, Stafford and the west side of Houston.
          </p>
          {SITE.email && (
            <a href={`mailto:${SITE.email}`} className="link-underline mt-4 inline-block text-cream">{SITE.email}</a>
          )}
          {socials.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-4 text-sm">
              {socials.map(([k, v]) => (
                <li key={k}>
                  <a href={v} rel="me noopener" target="_blank" className="link-underline text-cream-2 hover:text-cream">{SOCIAL_LABELS[k] ?? k}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
        {STORES.map((s) => {
          const rows = hoursRows(s.hours);
          return (
            <div key={s.id}>
              <p className="eyebrow">{s.shortName}</p>
              <address className="mt-4 not-italic text-cream-2">
                {(formatAddress(s, false) as string[]).map((l) => (
                  <span className="block" key={l}>{l}</span>
                ))}
              </address>
              <a href={`tel:${s.phoneE164}`} className="link-underline mt-2 inline-block text-cream">{s.phone}</a>
              <div className="mt-4 text-sm text-cream-3">
                {rows ? (
                  <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
                    {rows.map((r) => (
                      <div key={r.days} className="contents">
                        <dt>{r.days}</dt>
                        <dd className="text-cream-2">{r.time}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p>Hours: call the store to confirm.</p>
                )}
              </div>
              <div className="mt-4 flex gap-4 text-sm">
                <Link href={`/locations/${s.slug}`} className="link-underline text-cream">Store page</Link>
                <a href={directionsUrl(s)} target="_blank" rel="noopener" className="link-underline text-cream">Directions</a>
              </div>
            </div>
          );
        })}
        <nav aria-label="Footer">
          <p className="eyebrow">Sitemap</p>
          <ul className="mt-4 grid gap-2 text-sm text-cream-2">
            {[...SITE.nav, { href: "/whatsapp", label: "WhatsApp" }].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="link-underline hover:text-cream">{n.label}</Link>
              </li>
            ))}
          </ul>
          <p className="eyebrow mt-8">Aisles</p>
          <ul className="mt-4 grid gap-2 text-sm text-cream-2">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/products/${c.slug}`} className="link-underline hover:text-cream">{c.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container mt-16 overflow-hidden border-t border-line pt-10">
        <svg aria-hidden="true" viewBox="0 0 1000 150" className="block w-full select-none" focusable="false">
          <text x="0" y="128" className="font-display" fontSize="152" letterSpacing="-7" fill="currentColor" fillOpacity="0.07">
            Global Food Express
          </text>
        </svg>
        <div className="mt-6 flex flex-col gap-3 text-xs text-cream-3 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.legalName}. Rosenberg and Sugar Land, Texas.</p>
          <ul className="flex gap-5">
            <li><Link href="/privacy" className="link-underline">Privacy</Link></li>
            <li><Link href="/terms" className="link-underline">Terms</Link></li>
            <li><a href="/sitemap.xml" className="link-underline">Sitemap</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
