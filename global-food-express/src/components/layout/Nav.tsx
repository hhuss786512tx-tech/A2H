"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/config/site";
import { STORES } from "@/config/locations";
import Wordmark from "@/components/ui/Wordmark";
import MenuOverlay from "./MenuOverlay";
import { PhoneIcon } from "@/components/ui/Icons";
import { track } from "@/lib/analytics";

/** Sticky nav: hides on scroll down, returns on scroll up, blurs once scrolled. */
export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > last.current && y > 160 && !open);
        last.current = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const primary = STORES[0];
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 [transition-timing-function:var(--ease-out)] ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className={`transition-[background-color,backdrop-filter,border-color] duration-500 border-b ${scrolled || open ? "glass border-line" : "border-transparent"}`}>
          <div className="container flex h-[var(--nav-h)] items-center justify-between gap-6">
            <Wordmark className="text-[0.95rem] sm:text-[1.05rem] md:text-[1.2rem]" />
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-7 text-sm font-medium text-cream-2">
                {SITE.nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="link-underline hover:text-cream" aria-current={pathname === n.href ? "page" : undefined}>
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <a
                  href={`tel:${primary.phoneE164}`}
                  data-cursor="call"
                  onClick={() => track("phone_click", { store: primary.id, placement: "nav" })}
                  className="btn btn-ghost !min-h-[2.6rem] !py-2 !px-4 text-sm"
                >
                  <PhoneIcon width={16} height={16} /> {primary.phone}
                </a>
              </div>
              <button
                type="button"
                className="icon-btn group relative"
                aria-expanded={open}
                aria-controls="site-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
              >
                <span className={`absolute h-px w-5 bg-current transition-transform duration-500 [transition-timing-function:var(--ease-out)] ${open ? "rotate-45" : "-translate-y-[3.5px]"}`} />
                <span className={`absolute h-px w-5 bg-current transition-transform duration-500 [transition-timing-function:var(--ease-out)] ${open ? "-rotate-45" : "translate-y-[3.5px]"}`} />
              </button>
            </div>
          </div>
        </div>
      </header>
      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
