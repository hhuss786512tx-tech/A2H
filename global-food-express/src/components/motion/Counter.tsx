"use client";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/** Number ticker that counts up when scrolled into view. Renders the final value for SSR/no-JS. */
export default function Counter({ value, suffix = "", prefix = "", className = "" }: { value: number; suffix?: string; prefix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / 1600);
        const eased = 1 - Math.pow(2, -10 * p);
        el.textContent = `${prefix}${Math.round(eased * value).toLocaleString()}${suffix}`;
        if (p < 1) raf = requestAnimationFrame(tick);
        else el.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
      };
      raf = requestAnimationFrame(tick);
    }, { rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, suffix, prefix]);
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
