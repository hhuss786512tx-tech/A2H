"use client";
import { useEffect } from "react";
import { loadMotion, prefersReducedMotion } from "@/lib/motion";

/** Lenis smooth scroll feeding GSAP ScrollTrigger. Loaded after first paint. No-op under reduced motion. */
export default function SmoothScroll() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    if (prefersReducedMotion()) {
      document.documentElement.classList.add("rm");
      return;
    }
    let alive = true;
    let cleanup = () => {};
    const start = async () => {
      const [{ gsap, ScrollTrigger }, { default: Lenis }] = await Promise.all([loadMotion(), import("lenis")]);
      if (!alive) return;
      const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!a) return;
        const id = a.getAttribute("href")!.slice(1);
        const el = id && document.getElementById(id);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el, { offset: -72 });
        }
      };
      document.addEventListener("click", onClick);
      (window as Window & { __lenis?: unknown }).__lenis = lenis;
      ScrollTrigger.refresh();
      cleanup = () => {
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    };
    const hasIdle = typeof window.requestIdleCallback === "function";
    const id = hasIdle ? window.requestIdleCallback(() => start(), { timeout: 1500 }) : window.setTimeout(() => start(), 400);
    return () => {
      alive = false;
      if (hasIdle) window.cancelIdleCallback(id);
      else clearTimeout(id);
      cleanup();
    };
  }, []);
  return null;
}
