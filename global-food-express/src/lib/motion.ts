"use client";
import { useEffect, type DependencyList } from "react";
import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

export type Motion = { gsap: typeof GsapType; ScrollTrigger: typeof ScrollTriggerType };

let pending: Promise<Motion> | null = null;

/**
 * Lazily loads GSAP + ScrollTrigger (one shared chunk) so the motion library
 * never sits in the critical path of first paint. Entrance reveals are CSS.
 */
export function loadMotion(): Promise<Motion> {
  if (!pending) {
    pending = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, st]) => {
      g.gsap.registerPlugin(st.ScrollTrigger);
      g.gsap.defaults({ ease: "expo.out", duration: 0.9 });
      return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger };
    });
  }
  return pending;
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Cheap heuristic: skip WebGL on touch, reduced motion, data saver or weak CPUs. */
export function canRunWebGL() {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion() || !isFinePointer()) return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData) return false;
  if ((nav.hardwareConcurrency ?? 8) < 4) return false;
  if ((nav.deviceMemory ?? 8) < 4) return false;
  return true;
}

/**
 * Runs `setup` once GSAP is available. `setup` returns a cleanup. Skipped under
 * reduced motion, and optionally when `when` is false (e.g. touch devices).
 */
export function useMotion(setup: (m: Motion) => void | (() => void), deps: DependencyList = [], when = true) {
  useEffect(() => {
    if (!when || prefersReducedMotion()) return;
    let alive = true;
    let cleanup: void | (() => void);
    loadMotion().then((m) => {
      if (!alive) return;
      cleanup = setup(m);
    });
    return () => {
      alive = false;
      if (typeof cleanup === "function") cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export const EASE = "cubic-bezier(.22,1,.36,1)";
