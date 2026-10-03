"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Wordmark + counter, then a saffron curtain wipes up into the hero.
 * Pure CSS keyframes + one rAF counter: no motion library needed, so it never
 * delays first paint. Runs once per session, 1.6s total, skippable.
 */
export default function Preloader() {
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const counter = useRef<HTMLSpanElement>(null);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem("gfe_loaded", "1");
    } catch {}
    document.documentElement.classList.remove("lenis-stopped");
    window.dispatchEvent(new Event("gfe:ready"));
    setDone(true);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem("gfe_loaded") === "1";
    } catch {}
    if (seen) return;
    setShow(true);
    document.documentElement.classList.add("lenis-stopped");
  }, []);

  useEffect(() => {
    if (!show) return;
    const t0 = performance.now() + 100;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - t0) / 900));
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      if (counter.current) counter.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const skip = () => finish();
    window.addEventListener("keydown", skip, { once: true });
    const safety = window.setTimeout(finish, 2600);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", skip);
      clearTimeout(safety);
    };
  }, [show, finish]);

  if (!show || done) return null;
  return (
    <div className="preloader" role="status" aria-label="Loading Global Food Express" onClick={finish}>
      <div className="preloader-mark text-center">
        <div className="display text-[length:var(--step-4)] leading-none">
          Global Food <em className="accent">Express</em>
        </div>
        <div className="mt-6 font-sans text-xs tracking-[0.3em] uppercase text-cream-3">
          Rosenberg · Sugar Land · <span ref={counter} className="tabular-nums text-saffron">000</span>
        </div>
        <button type="button" className="mt-8 text-xs text-cream-3 link-underline" onClick={finish}>
          Skip
        </button>
      </div>
      <div className="preloader-curtain" onAnimationEnd={finish} />
    </div>
  );
}
