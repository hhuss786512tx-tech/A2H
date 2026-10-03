"use client";
import { useRef, type ReactNode } from "react";
import { isFinePointer, useMotion } from "@/lib/motion";

/** 3D tilt with a glare highlight following the pointer. Pointer devices only. */
export default function TiltCard({ children, className = "", max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useMotion(
    ({ gsap }) => {
      const el = ref.current;
      if (!el) return;
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "expo.out" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "expo.out" });
      gsap.set(el, { transformPerspective: 1000, transformStyle: "preserve-3d" });
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry((px - 0.5) * max * 2);
        rx((0.5 - py) * max * 2);
        el.style.setProperty("--gx", `${px * 100}%`);
        el.style.setProperty("--gy", `${py * 100}%`);
      };
      const onLeave = () => {
        rx(0);
        ry(0);
      };
      el.addEventListener("pointermove", onMove, { passive: true });
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    [max],
    isFinePointer(),
  );
  return (
    <div ref={ref} className={`tilt relative will-change-transform ${className}`}>
      {children}
      <span className="glare" aria-hidden="true" />
    </div>
  );
}
