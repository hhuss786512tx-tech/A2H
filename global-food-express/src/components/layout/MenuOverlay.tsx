"use client";
import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { SITE } from "@/config/site";
import { STORES, formatAddress } from "@/config/locations";

const idx = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;

/** Full-screen menu: CSS clip-path wipe + staggered links, focus trap, Escape to close. */
export default function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) {
      const t = setTimeout(() => (ref.current?.querySelector("a") as HTMLElement | null)?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("a[href], button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div id="site-menu" ref={ref} className="menu fixed inset-0 z-40 surface-floating glow-bg overflow-y-auto" data-open={open ? "true" : "false"} aria-hidden={!open} inert={!open}>
      <div className="container flex min-h-dvh flex-col justify-between pt-[calc(var(--nav-h)+2rem)] pb-28 md:pb-12">
        <nav aria-label="Menu">
          <ul className="flex flex-col gap-1">
            {[{ href: "/", label: "Home" }, ...SITE.nav].map((n, i) => (
              <li key={n.href} className="overflow-hidden">
                <Link
                  href={n.href}
                  onClick={onClose}
                  style={idx(i)}
                  className="menu-link group flex items-baseline gap-4 py-1 font-display text-[length:var(--step-4)] leading-[1.05] tracking-[-0.03em] text-cream transition-colors hover:text-saffron focus-visible:text-saffron"
                >
                  <span className="font-sans text-xs tabular-nums text-cream-3 transition-colors group-hover:text-saffron">0{i + 1}</span>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-12 grid gap-8 border-t border-line pt-8 text-sm md:grid-cols-3">
          {STORES.map((s, i) => (
            <div key={s.id} className="menu-meta" style={idx(i)}>
              <p className="eyebrow">{s.shortName}</p>
              <address className="mt-3 not-italic text-cream-2">
                {(formatAddress(s, false) as string[]).map((l) => (
                  <span className="block" key={l}>{l}</span>
                ))}
                <a href={`tel:${s.phoneE164}`} className="link-underline mt-2 inline-block text-cream">{s.phone}</a>
              </address>
            </div>
          ))}
          <div className="menu-meta" style={idx(2)}>
            <p className="eyebrow">Community</p>
            <p className="mt-3 text-cream-2">Weekly specials, new arrivals and Eid notices go out on WhatsApp first.</p>
            <Link href="/whatsapp" onClick={onClose} className="link-underline mt-2 inline-block text-cream">Join the WhatsApp group</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
