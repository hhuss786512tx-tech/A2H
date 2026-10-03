"use client";
import { useRef, type ReactNode } from "react";
import { isFinePointer, useMotion } from "@/lib/motion";

/** Pulls the child toward the pointer within `radius` px. Pointer devices only. */
export default function Magnetic({ children, radius = 90, strength = 0.35, className }: { children: ReactNode; radius?: number; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useMotion(
    ({ gsap }) => {
      const el = ref.current;
      if (!el) return;
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "expo.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "expo.out" });
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        if (Math.hypot(dx, dy) < radius + Math.max(r.width, r.height) / 2) {
          xTo(dx * strength);
          yTo(dy * strength);
        } else {
          xTo(0);
          yTo(0);
        }
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    },
    [radius, strength],
    isFinePointer(),
  );
  return (
    <div ref={ref} className={`inline-block will-change-transform ${className ?? ""}`}>
      {children}
    </div>
  );
}
